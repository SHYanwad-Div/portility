# backend/init_db.py
"""Initialize DB & seed sample data (run as a module: python -m backend.init_db)"""
from .app import app
from .db import db
from .models import Task

with app.app_context():
    db.create_all()
    if Task.query.count() == 0:
        t = Task(title="Learn SQL", description="Set up SQLite", status="pending")
        db.session.add(t)
        db.session.commit()
        print("Seeded 1 task")
    else:
        print("Already seeded")
