# backend/app.py
import os
import logging
from functools import wraps
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.exceptions import HTTPException
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Flask App Setup ---
app = Flask(__name__, static_folder="static")

# --- Configuration ---
API_TOKEN = os.getenv("API_TOKEN", "dev-token")
CORS_ORIGINS = os.getenv("CORS_ORIGINS")  # e.g. "http://localhost:5173"
LOG_FILE = os.getenv("LOG_FILE", "app.log")

# --- Logging Setup ---
handler_console = logging.StreamHandler()
handler_console.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
app.logger.setLevel(logging.INFO)
app.logger.addHandler(handler_console)

try:
    file_handler = logging.FileHandler(LOG_FILE)
    file_handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    app.logger.addHandler(file_handler)
except Exception as e:
    app.logger.warning("Could not set file handler for logging: %s", e)

# --- Token Auth Decorator ---
def require_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if token != API_TOKEN:
            app.logger.warning("Unauthorized access attempt from %s", request.remote_addr)
            return jsonify({"ok": False, "error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

# --- CORS Setup ---
if CORS_ORIGINS:
    origins = [o.strip() for o in CORS_ORIGINS.split(",")]
    CORS(app, origins=origins)
else:
    CORS(app)  # allow all in dev

# --- Register Blueprints ---
try:
    from tasks.routes import bp as tasks_bp
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

# --- Swagger UI Setup ---
SWAGGER_URL = "/docs"
API_URL = "/openapi.yaml"
swaggerui_bp = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "Portility API (v1)"}
)
app.register_blueprint(swaggerui_bp, url_prefix=SWAGGER_URL)

# --- Error Handlers ---
@app.errorhandler(HTTPException)
def handle_http_exception(e):
    app.logger.debug("HTTP exception: %s", e)
    return jsonify({"ok": False, "error": e.description}), e.code

@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.exception("Unhandled exception: %s", e)
    return jsonify({"ok": False, "error": "Internal Server Error"}), 500

# --- Request Logging ---
@app.before_request
def log_request():
    app.logger.info("%s %s - from %s", request.method, request.path, request.remote_addr)

# --- Root Info ---
@app.get("/")
def root_info():
    return jsonify({
        "ok": True,
        "msg": "Portility backend running",
        "docs": "/docs",
        "api_base": "/api/v1"
    })

# --- Main Entry ---
if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "1") == "1"
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=debug)
