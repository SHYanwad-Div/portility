# Portility Backend (Week 3 Day 1)

## Run locally
python -m venv venv
# windows
venv\Scripts\activate
# mac/linux
source venv/bin/activate

pip install -r requirements.txt
python app.py

API:
GET  /api/ping
GET  /api/tasks
POST /api/tasks  { "title": "...", "description": "..." }
