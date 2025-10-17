# backend/app.py
import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

# create app
app = Flask(__name__, static_folder="static")

# CORS: allow from environment OR allow all in dev
cors_origins = os.getenv("CORS_ORIGINS")  # e.g. "http://localhost:5173"
if cors_origins:
    # allow specific origins (comma separated)
    origins = [o.strip() for o in cors_origins.split(",")]
    CORS(app, origins=origins)
else:
    # dev: allow all
    CORS(app)

# register blueprints (tasks blueprint should be defined in backend/tasks/routes.py)
# tasks.routes should define: bp = Blueprint(..., url_prefix="/api/v1/tasks")
try:
    from tasks.routes import bp as tasks_bp
    app.register_blueprint(tasks_bp)
except Exception as e:
    # If blueprint import fails, log to console - helpful during setup
    app.logger.warning("Could not import tasks blueprint: %s", e)

# Ping / health
@app.get("/api/ping")
def ping():
    return jsonify({"ok": True, "msg": "pong"})

# Serve OpenAPI YAML (ensure file exists at backend/static/openapi.yaml)
@app.get("/openapi.yaml")
def serve_openapi():
    # Flask static_folder is backend/static so send_from_directory works
    try:
        return send_from_directory(app.static_folder, "openapi.yaml")
    except Exception:
        return jsonify({"ok": False, "error": "openapi.yaml not found"}), 404

# Swagger UI setup: served at /docs
SWAGGER_URL = "/docs"
API_URL = "/openapi.yaml"  # relative to this app
swaggerui_bp = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={"app_name": "Portility API (v1)"},
)
app.register_blueprint(swaggerui_bp, url_prefix=SWAGGER_URL)

# Generic error handlers (return JSON)
@app.errorhandler(400)
def bad_request_error(error):
    app.logger.debug("400 error: %s", error)
    return jsonify({"ok": False, "error": "Bad request"}), 400

@app.errorhandler(404)
def not_found_error(error):
    app.logger.debug("404 error: %s", error)
    return jsonify({"ok": False, "error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(error):
    # Log the exception details
    app.logger.exception("Internal server error: %s", error)
    return jsonify({"ok": False, "error": "Internal Server Error"}), 500

# Optional: simple root redirect /info
@app.get("/")
def root_info():
    return jsonify({
        "ok": True,
        "msg": "Portility backend running",
        "docs": "/docs",
        "api_base": "/api/v1"
    })

if __name__ == "__main__":
    # configuration from environment
    debug = os.getenv("FLASK_DEBUG", "1") == "1"
    port = int(os.getenv("PORT", 5000))
    # run dev server (use gunicorn for production)
    app.run(host="0.0.0.0", port=port, debug=debug)
