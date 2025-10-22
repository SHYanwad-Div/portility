import os
import logging
from functools import wraps
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.exceptions import HTTPException
from dotenv import load_dotenv
import traceback
import uuid

# --- Load environment variables ---
load_dotenv()

# --- Create Flask app ---
app = Flask(__name__, static_folder="static")

# --- Database (SQLAlchemy) ---
from .db import db

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///portility.db")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# initialize db
db.init_app(app)

# --- App Config ---
API_TOKEN = os.getenv("API_TOKEN", "dev-token")
CORS_ORIGINS = os.getenv("CORS_ORIGINS")
LOG_FILE = os.getenv("LOG_FILE", "app.log")
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"

# --- Logging Setup ---
app.logger.setLevel(logging.INFO)

formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")

# Console
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
app.logger.addHandler(console_handler)

# File Logging
try:
    file_handler = logging.FileHandler(LOG_FILE)
    file_handler.setFormatter(formatter)
    app.logger.addHandler(file_handler)
except Exception as e:
    app.logger.warning("Could not set up file logging: %s", e)

# --- CORS Setup ---
if CORS_ORIGINS:
    origins = [o.strip() for o in CORS_ORIGINS.split(",")]
    CORS(app, origins=origins)
else:
    CORS(app)  # allow all (dev)

# --- Token Auth Decorator ---
def require_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if token != API_TOKEN:
            app.logger.warning("Unauthorized access from %s", request.remote_addr)
            return jsonify({"ok": False, "error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

# --- Register Blueprints ---
try:
    from .tasks.routes import bp as tasks_bp
    app.register_blueprint(tasks_bp)
    app.logger.info("Registered tasks blueprint at /api/v1/tasks")
except Exception as e:
    app.logger.warning("Could not import/register tasks blueprint: %s", e)

# --- Health Check ---
@app.get("/api/ping")
def ping():
    return jsonify({"ok": True, "msg": "pong"})

# --- Serve OpenAPI YAML (for Swagger UI) ---
@app.get("/openapi.yaml")
def serve_openapi():
    try:
        return send_from_directory(app.static_folder, "openapi.yaml")
    except Exception:
        return jsonify({"ok": False, "error": "openapi.yaml not found"}), 404

# --- Swagger UI ---
SWAGGER_URL = "/docs"
API_URL = "/openapi.yaml"
swaggerui_bp = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "Portility API (v1)"}
)
app.register_blueprint(swaggerui_bp, url_prefix=SWAGGER_URL)

# --- Request Logging ---
@app.before_request
def log_request():
    app.logger.info("%s %s - from %s", request.method, request.path, request.remote_addr)

# --- Error Handling ---
@app.errorhandler(HTTPException)
def handle_http_exception(e):
    return jsonify({"ok": False, "error": e.description}), e.code

# Default error handler
@app.errorhandler(Exception)
def handle_exception(e):
    error_id = uuid.uuid4().hex[:8]
    app.logger.exception("Error %s: %s", error_id, e)

    if FLASK_DEBUG:
        # Development mode – show traceback for debugging
        return jsonify({
            "ok": False,
            "error": str(e),
            "trace": traceback.format_exc(),
            "error_id": error_id,
        }), 500
    else:
        # Production mode – hide traceback from users
        return jsonify({
            "ok": False,
            "error": "Internal Server Error",
            "error_id": error_id
        }), 500

# --- Root Info ---
@app.get("/")
def root_info():
    return jsonify({
        "ok": True,
        "msg": "Portility backend running",
        "docs": "/docs",
        "api_base": "/api/v1"
    })

# --- Initialize DB on Startup ---
with app.app_context():
    from .models import Task  # ensure models are loaded
    db.create_all()

# --- Run App ---
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=FLASK_DEBUG)
