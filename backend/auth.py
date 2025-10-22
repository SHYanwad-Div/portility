# backend/auth.py
import os
from functools import wraps
from flask import request, current_app

API_TOKEN = os.getenv("API_TOKEN", "dev-token")

def require_token(f):
    """Decorator to require Authorization: Bearer <token>"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if token != API_TOKEN:
            # prefer current_app.logger here to avoid importing app
            try:
                current_app.logger.warning("Unauthorized access attempt from %s", request.remote_addr)
            except Exception:
                # fallback if current_app not available for some reason
                pass
            return {"ok": False, "error": "Unauthorized"}, 401
        return f(*args, **kwargs)
    return decorated
