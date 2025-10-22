# backend/tasks_store_sql.py
from .db import db
from .models import Task

def get_tasks():
    rows = Task.query.order_by(Task.created_at.desc()).all()
    return [r.to_dict() for r in rows]

def add_task(obj):
    t = Task(
        title=(obj.get("title") or "").strip(),
        description=(obj.get("description") or "").strip() or None,
        status=obj.get("status", "pending"),
        due_date=obj.get("due_date")
    )
    db.session.add(t)
    db.session.commit()
    return t.to_dict()

def get_task(task_id):
    try:
        tid = int(task_id)
    except (ValueError, TypeError):
        raise ValueError("invalid id")
    r = Task.query.get(tid)
    return r.to_dict() if r else None

def update_task(task_id, fields):
    try:
        tid = int(task_id)
    except (ValueError, TypeError):
        return None
    task = Task.query.get(tid)
    if not task:
        return None
    if "title" in fields:
        task.title = fields["title"]
    if "description" in fields:
        task.description = fields["description"]
    if "status" in fields:
        task.status = fields["status"]
    if "due_date" in fields:
        task.due_date = fields["due_date"]
    db.session.commit()
    return task.to_dict()

def delete_task(task_id):
    try:
        tid = int(task_id)
    except (ValueError, TypeError):
        return None
    task = Task.query.get(tid)
    if not task:
        return None
    db.session.delete(task)
    db.session.commit()
    return {"id": tid}
