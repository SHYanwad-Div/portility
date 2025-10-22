# Portility 🚀

A developer portfolio app built with **React + Vite + Material UI** (frontend) and **Flask** (backend).

---

## Week 2 — Day 1
**Goal:** Scaffold app, setup folder structure, and create homepage with MUI AppBar + Typography.

### ✅ Tasks Completed
- Created React + Vite frontend.  
- Installed Material UI.  
- Added NavBar (AppBar) and Home page (Box + Typography).  

---
## Run Frontend
```bash
cd frontend
npm install
npm run dev

## Run Backend
.\venv\Scripts\activate
pip install flask flask-cors
python app.py

## Week 2 — Day 2
**Goal:** Create reusable components and pass data via props.

### ✅ Tasks Completed
- Created `TaskCard` component using MUI Paper + Typography.  
- Rendered a list of dummy tasks in Home via props.  
- Demonstrated parent → child data flow in React.  

### Run Frontend
```bash
cd frontend
npm run dev

## Week 2 — Day 3
**Goal:** Manage state with hooks, create controlled forms with MUI, and validate inputs.

### ✅ Tasks Completed
- Added `TaskForm` component with MUI TextFields and Button.  
- Managed task list state with `useState`.  
- Logged task updates using `useEffect`.  
- Validated required fields on form submission.  
- Dynamically rendered tasks using TaskCard component.

### Run Frontend
```bash
cd frontend
npm run dev
# Week 2 — Day 4 (Oct 3, 2025)

**Goal:** Implement routing, persist state, and polish UI

**Tasks Completed:**
- Added **React Router v6** for pages: Home (`/`), Add Task (`/add`), About (`/about`)
- Updated **NavBar** for navigation using MUI `Button` + `NavLink`
- Persisted tasks and theme mode using **localStorage** (`useLocalStorage` hook)
- Layout polished using **MUI Box** and flex (`minHeight: 100vh`, responsive padding)

**Notes:**
- Routing allows navigation without full page reload
- State changes automatically update `localStorage`
- Layout is now full-screen, responsive, and ready for UI polish
## week 2 day 5 (oct 4,2025)
**Goal:**Polish and refine the SPA built with React + Vite + Material UI by adding visual enhancements, search, and theme toggle.

### Completed Features
- **Search / Filter UI:** Allows users to search tasks or projects dynamically.
- **Light / Dark Theme Toggle:** Implemented using MUI Theme Provider + localStorage persistence.
- **Header & Footer:** Added custom Silkscreen font for unique branding.
- **Hero Section:** Added `TopHero` component with aesthetic typography and accent colors.
- **Task Cards:** Improved readability and visibility in both themes.
- **Responsive Layout:** Centered card grid with consistent padding and spacing.

### Tools & Technologies
- React + Vite  
- Material UI  
- Custom Typography (Silkscreen Font)  
- LocalStorage Persistence  
- JavaScript ES6  

### How to Run
```bash
cd frontend
npm install
npm run dev
## week 3 day 1(oct 6,2025)
backend run:
python.py--- http://127.0.0.1:5000
open terminal & run:
##Check ping:
curl http://127.0.0.1:5000/api/ping
# -> {"ok":true,"msg":"pong"}
##Get tasks (initially empty or sample):
curl http://127.0.0.1:5000/api/tasks
##Add a task:
curl -X POST http://127.0.0.1:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Interview Practice","description":"Prepare endpoints and CRUD"}'
##Confirm it’s stored:
curl http://127.0.0.1:5000/api/tasks
# Week 3 Day 2 — Flask API (PUT & DELETE)

### 📅 Date: Oct 8, 2025  
### 🎯 Goal:
Implement and test **PUT** & **DELETE** endpoints in Flask for task updates and deletions.

---

## 🔧 Features
- `PUT /api/tasks/<id>` → Update a task by ID  
- `DELETE /api/tasks/<id>` → Delete a task by ID  
- Handles invalid IDs and returns proper error codes  
- Optional query filter: `/api/tasks?completed=true`

---

## 🧪 Test Commands
```bash
GET    http://127.0.0.1:5000/api/tasks
POST   http://127.0.0.1:5000/api/tasks
PUT    http://127.0.0.1:5000/api/tasks/1
DELETE http://127.0.0.1:5000/api/tasks/1
# Week 3 Day 3 — Error Handling, Validation & CORS (Portility API)

**Goal:** Improve the Flask backend with robust error handling, validation, and CORS support.

### ✅ Completed Tasks
- Added error handlers for `404`, `400`, and `500`.
- Validated incoming JSON and non-empty `title` fields.
- Enabled **CORS** using `Flask-CORS` to allow frontend requests.
- Tested all endpoints (`GET`, `POST`, `PUT`, `DELETE`) in **Postman** and frontend.
- Implemented safe error responses with proper HTTP status codes.

### 🧪 Tools Used
- Flask + Flask-CORS  
- Postman (for endpoint testing)  
- React frontend (fetch API calls)

### 🚀 Run Locally
```bash
# backend
cd backend
venv\Scripts\activate
python app.py

# frontend
cd frontend
npm run dev
# Week 3 Day 4 — Docs & Versioning

**Goal:** Add OpenAPI docs and version the API.

**What I did**
- Moved routes under `/api/v1` using Flask Blueprints.
- Added `backend/static/openapi.yaml` (OpenAPI 3.0).
- Served Swagger UI at `/docs` using `flask-swagger-ui`.
- Tested locally and demonstrated running with Gunicorn.

**How to run**
1. Start Flask (dev): `python app.py`  
2. Open docs: `http://127.0.0.1:5000/docs`  
3. For multi-worker: `gunicorn -w 4 -b 0.0.0.0:8000 app:app`
# Week 3 Day 5 — Reflection & Bonus

## Overview
This day focuses on API reflection, authentication, logging, and testing.

## What Was Done
- Added request logging with `logging` module.
- Added simple Bearer Token authentication decorator.
- Created basic unit tests using `pytest`.
- Wrote reflections on:
  - HTTP request–response cycle.
  - Security best practices.
  - Production error monitoring.

## Test Commands
```bash
pytest -v
curl -H "Authorization: Bearer supersecret123" http://127.0.0.1:5000/api/tasks
# Week 4 Day 1 — SQL Basics & Schema Design

### 🎯 Objective
Design and create the SQL schema for storing tasks in a relational database.

### 🧱 Table: `tasks`
| Column | Type | Description |
|---------|------|--------------|
| id | INTEGER PRIMARY KEY | Task ID |
| title | TEXT | Title of task |
| description | TEXT | Task details |
| status | TEXT | Pending, done, etc. |
| due_date | TEXT | YYYY-MM-DD |
| created_at | DATETIME | Created timestamp |
| updated_at | DATETIME | Last update |

### 📘 Key Learnings
- Normalization avoids redundancy.
- Use appropriate SQL types (`INTEGER`, `TEXT`, `DATE`).
- Plan ahead for scalability — user & tags relations can be added later.

### 🧩 Next
Connect Flask backend to SQLite (Week 4 Day 2).
