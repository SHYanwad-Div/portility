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
def get_task(task_id):
    with _lock:
        tasks = _read_file()
        for t in tasks:
            if int(t.get("id")) == int(task_id):
                return t
        return None

def update_task(task_id, new_data):
    with _lock:
        tasks = _read_file()
        updated = None
        for i, t in enumerate(tasks):
            if int(t.get("id")) == int(task_id):
                # update only provided fields (merge)
                tasks[i] = {**t, **new_data, "id": t.get("id")}
                updated = tasks[i]
                break
        if updated is not None:
            _write_file(tasks)
        return updated

def delete_task(task_id):
    with _lock:
        tasks = _read_file()
        for i, t in enumerate(tasks):
            if int(t.get("id")) == int(task_id):
                removed = tasks.pop(i)
                _write_file(tasks)
                return removed
        return None