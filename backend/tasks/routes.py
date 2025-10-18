# backend/tasks/routes.py
from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequest
from tasks_store import get_tasks, add_task, get_task, update_task, delete_task
from app import require_token  # import token decorator

bp = Blueprint("tasks", __name__, url_prefix="/api/v1/tasks")

# --- GET ALL TASKS ---
@bp.get("/")
def api_get_tasks():
    all_tasks = get_tasks()
    completed_q = request.args.get("completed")
    if completed_q is not None:
        comp = completed_q.lower() in ("1", "true", "yes")
        filtered = [t for t in all_tasks if bool(t.get("completed")) == comp]
        return jsonify({"ok": True, "tasks": filtered}), 200
    return jsonify({"ok": True, "tasks": all_tasks}), 200

# --- CREATE TASK (Auth Required) ---
@bp.post("/")
@require_token
def api_post_task():
    try:
        data = request.get_json(force=True)
    except BadRequest:
        return jsonify({"ok": False, "error": "Invalid JSON"}), 400

    if not data:
        return jsonify({"ok": False, "error": "Request body required"}), 400

    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()
    completed = bool(data.get("completed", False))

    if not title:
        return jsonify({"ok": False, "error": "title is required"}), 400
    if not description:
        return jsonify({"ok": False, "error": "description is required"}), 400

    new_task = add_task({"title": title, "description": description, "completed": completed})
    return jsonify({"ok": True, "task": new_task}), 201

# --- GET SINGLE TASK ---
@bp.get("/<task_id>")
def api_get_task(task_id):
    try:
        t = get_task(task_id)
    except ValueError:
        return jsonify({"ok": False, "error": "invalid id"}), 400

    if not t:
        return jsonify({"ok": False, "error": "task not found"}), 404
    return jsonify({"ok": True, "task": t}), 200

# --- UPDATE TASK (Auth Required) ---
@bp.put("/<task_id>")
@require_token
def api_put_task(task_id):
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"ok": False, "error": "invalid json"}), 400

    update_fields = {}
    title = data.get("title")
    description = data.get("description")
    completed = data.get("completed")

    if title is not None:
        if not str(title).strip():
            return jsonify({"ok": False, "error": "title cannot be empty"}), 400
        update_fields["title"] = str(title).strip()

    if description is not None:
        if not str(description).strip():
            return jsonify({"ok": False, "error": "description cannot be empty"}), 400
        update_fields["description"] = str(description).strip()

    if completed is not None:
        update_fields["completed"] = bool(completed)

    if not update_fields:
        return jsonify({"ok": False, "error": "no fields to update"}), 400

    updated = update_task(task_id, update_fields)
    if not updated:
        return jsonify({"ok": False, "error": "task not found"}), 404

    return jsonify({"ok": True, "task": updated}), 200

# --- DELETE TASK (Auth Required) ---
@bp.delete("/<task_id>")
@require_token
def api_delete_task(task_id):
    removed = delete_task(task_id)
    if not removed:
        return jsonify({"ok": False, "error": "task not found"}), 404
    return jsonify({"ok": True, "deleted": removed}), 200
