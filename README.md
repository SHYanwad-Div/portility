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
