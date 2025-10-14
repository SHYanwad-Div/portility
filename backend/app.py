# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from tasks_store import get_tasks, add_task

app = Flask(__name__)
CORS(app)  # allow all origins for development only

@app.get("/api/ping")
def ping():
    return jsonify({"ok": True, "msg": "pong"})

@app.get("/api/tasks")
def api_get_tasks():
    tasks = get_tasks()
    return jsonify({"ok": True, "tasks": tasks})

@app.post("/api/tasks")
def api_post_task():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    description = data.get("description", "").strip()

    if not title:
        return jsonify({"ok": False, "error": "title is required"}), 400
    if not description:
        return jsonify({"ok": False, "error": "description is required"}), 400

    new_task = add_task({"title": title, "description": description})
    return jsonify({"ok": True, "task": new_task}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
