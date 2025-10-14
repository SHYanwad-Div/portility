# backend/tasks_store.py
# tiny file-backed store for demo (not for production)
import json
import os
from threading import Lock

DATA_FILE = os.path.join(os.path.dirname(__file__), "tasks.json")
_lock = Lock()

def _read_file():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def _write_file(tasks):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=2, ensure_ascii=False)

def get_tasks():
    with _lock:
        return _read_file()

def add_task(task):
    """
    task: dict with at least 'title' and 'description'
    returns the new task (with id)
    """
    with _lock:
        tasks = _read_file()
        # simple incremental id
        next_id = (max((t.get("id", 0) for t in tasks), default=0) + 1) if tasks else 1
        task_with_id = {"id": next_id, **task}
        tasks.append(task_with_id)
        _write_file(tasks)
        return task_with_id
