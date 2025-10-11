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