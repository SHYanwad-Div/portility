# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from tasks_store import get_tasks, add_task, get_task, update_task, delete_task

app = Flask(__name__)
CORS(app)  # dev only; restrict origins in prod

@app.get("/api/ping")
def ping():
    return jsonify({"ok": True, "msg": "pong"})

@app.get("/api/tasks")
def api_get_tasks():
    # optional filtering: /api/tasks?completed=true
    all_tasks = get_tasks()
    completed_q = request.args.get("completed")
    if completed_q is not None:
        comp = completed_q.lower() in ("1", "true", "yes")
        filtered = [t for t in all_tasks if bool(t.get("completed")) == comp]
        return jsonify({"ok": True, "tasks": filtered}), 200
    return jsonify({"ok": True, "tasks": all_tasks}), 200

@app.post("/api/tasks")
def api_post_task():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()
    completed = bool(data.get("completed", False))

    if not title:
        return jsonify({"ok": False, "error": "title is required"}), 400
    if not description:
        return jsonify({"ok": False, "error": "description is required"}), 400

    new_task = add_task({"title": title, "description": description, "completed": completed})
    return jsonify({"ok": True, "task": new_task}), 201

@app.get("/api/tasks/<task_id>")
def api_get_task(task_id):
    try:
        t = get_task(task_id)
    except ValueError:
        return jsonify({"ok": False, "error": "invalid id"}), 400

    if not t:
        return jsonify({"ok": False, "error": "task not found"}), 404
    return jsonify({"ok": True, "task": t}), 200

@app.put("/api/tasks/<task_id>")
def api_put_task(task_id):
    # parse JSON
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"ok": False, "error": "invalid json"}), 400

    # optional validation: require at least one field
    title = data.get("title")
    description = data.get("description")
    completed = data.get("completed")

    # build update dict only with allowed fields
    update_fields = {}
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

@app.delete("/api/tasks/<task_id>")
def api_delete_task(task_id):
    removed = delete_task(task_id)
    if not removed:
        return jsonify({"ok": False, "error": "task not found"}), 404
    # successful delete: 204 No Content is common
    return jsonify({"ok": True, "deleted": removed}), 200
    # or: return "", 204

if __name__ == "__main__":
    app.run(debug=True, port=5000)
