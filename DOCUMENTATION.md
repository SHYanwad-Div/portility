# 📌 DOCUMENTATION.md (Simple)

```markdown
# Portility — Week 2 Day 1

**Date:** Sept 29, 2025  
**Goal:** Setup React + Vite, folder structure, and first component.

### ✅ Tasks Completed
- Scaffolded frontend with React + Vite.  
- Installed Material UI.  
- Created folder structure: components (NavBar), pages (Home).  
- Implemented NavBar (AppBar + Toolbar).  
- Implemented Home page using Box + Typography.  

### ❓ Reflection
1. **Vite produces:** src/, index.html, vite.config.js. Dev: fast hot reload. Build: optimized dist/.  
2. **Hot reload/bundling:** Updates browser instantly; combines files for production.  
3. **React structure:** Parent → Child; props passed down; re-render happens on prop/state change.  

### Commit
feat: week2 day1 - scaffold React app with MUI, NavBar + Home
# 📌 DOCUMENTATION.md (Day 2 Entry)

```markdown
# Portility — Week 2 Day 2

**Date:** Sept 30, 2025  
**Goal:** React Components & Props — render dynamic data via reusable components.

### ✅ Tasks Completed
- Created `TaskCard` component (title + description).  
- Updated Home page to render a list of dummy tasks.  
- Used props to pass data from Home (parent) to TaskCard (child).  

### ❓ Reflection
1. **Props:** Data flows from parent → child; changing props triggers re-render.  
2. **Virtual DOM:** Optimizes rendering by updating only changed parts of UI.  
3. **Avoid unnecessary re-renders:** Use `React.memo` or stable references for props.  

### Commit
feat: week2 day2 - added TaskCard component and rendered dummy tasks
# 📌 DOCUMENTATION.md (Day 3 Entry)

```markdown
# Portility — Week 2 Day 3

**Date:** Oct 1, 2025  
**Goal:** State & Hooks (useState, useEffect), Forms + MUI

### ✅ Tasks Completed
- Created `TaskForm` component (controlled inputs).  
- Managed tasks using `useState`.  
- Used `useEffect` to log state changes.  
- Added form validation for required fields.  
- Updated Home page to render new tasks dynamically.

### ❓ Reflection
1. **Data flow:** User types → state updates → component re-renders → effect runs.  
2. **useEffect:** Runs after render; dependencies control execution; cleanup prevents memory leaks.  
3. **Controlled vs uncontrolled:** Controlled inputs tied to React state.  
4. **Event handling:** `onChange` updates state; `onSubmit` prevents default refresh.  
5. **MUI:** TextField and Button provide theming, styling, and validation helpers.

### Commit
feat: week2 day3 - added TaskForm with state, useEffect, and validation

Copy code
# Portility — Week 2 Day 4

**Date:** Oct 3, 2025  
**Goal:** Add routing (Home/Add Task/About), navigation, save tasks to localStorage, theme toggle.

### ✅ Tasks Completed
- Added `react-router-dom` and routes for `/`, `/add`, `/about`.  
- NavBar updated with icons + theme toggle.  
- Tasks persisted to `localStorage` via `useLocalStorage` hook.  
- Add Task page saves tasks and redirects to Home.

### Commit
feat: week2 day4 - add routing, localStorage, NavBar icons & theme toggle
### 📘 **DOCUMENTATION.md — Week 2 Day 5**
```markdown
# Week 2 Day 5 — Reflection & Bonus Documentation

### Objective
Refine UI/UX, ensure responsive design, and finalize all core SPA features built in previous days.

---

### 

---

### Reflection / Learning Notes
- Understood how **MUI Theme Provider** dynamically changes palette modes.
- Practiced applying **Google Fonts** for cohesive design.
- Learned that consistent color contrast improves accessibility.
- Identified how component structure (NavBar → Routes → Footer) ensures clean layout.
- Gained comfort with MUI sx props for quick design tweaks.

---
Enhancements Implemented
| Feature | Description |
|----------|--------------|
| **Search Bar** | Added keyword search to filter task cards instantly. |
| **Theme Toggle** | Implemented dark/light modes stored in localStorage. |
| **Header & Footer** | Both styled with the Silkscreen font and accent colors. |
| **Hero Section** | Introduced brand title “Portility” with hover glow effect. |
| **Responsive Grid** | Centered cards, improved spacing for all screen sizes. |
| **Color Tuning** | Enhanced contrast for readability in both themes. |
# Week 3 Day 2 — PUT & DELETE Endpoints

### 🔹 PUT /api/tasks/<id>
Updates a task using JSON data from the client.  
Returns updated task or 404 if not found.

### 🔹 DELETE /api/tasks/<id>
Removes a task by ID.  
Returns success message or 404 if task doesn’t exist.

---

### ⚙️ Status Codes
- 200 → Success  
- 400 → Invalid JSON / Missing fields  
- 404 → Task not found  

---

### 🧠 Key Notes
- **Path parameter:** `/api/tasks/1` → identifies a specific resource  
- **Query parameter:** `/api/tasks?completed=true` → filters results  
- Tested via **Postman** and **curl**

---

---

## 📘 **DOCUMENTATION.md (Week 3 Day 3)**

```markdown
# Documentation — Week 3 Day 3: Error Handling, Validation & CORS

## 🔍 Overview
This update focused on improving API reliability and integration with React frontend.

## 🧱 Features Added
1. **Error Handling**
   - Custom handlers for:
     - `400 Bad Request`
     - `404 Not Found`
     - `500 Internal Server Error`
   - Ensures user-friendly and consistent error responses.

2. **Input Validation**
   - Checks for required fields (like `title`).
   - Rejects invalid or malformed JSON requests.
   - Returns descriptive messages with proper status codes.

3. **CORS Configuration**
   - Added `Flask-CORS`:
     ```python
     from flask_cors import CORS
     CORS(app)
     ```
   - Allows frontend (React running on Vite port 5173) to access Flask API (port 5000).

4. **Testing**
   - Verified all flows via **Postman** and browser console.
   - Tested failure cases:
     - Missing JSON body → 400
     - Invalid ID → 404
     - Server crash simulation → 500

## 🧩 Status Codes Used
| Code | Meaning | When Returned |
|------|----------|---------------|
| 200 | OK | Successful request |
| 201 | Created | Task created |
| 400 | Bad Request | Invalid input / JSON |
| 404 | Not Found | Task ID invalid |
| 500 | Internal Server Error | Unhandled server error |

## ⚙️ Frontend Integration
React → Fetch API → Flask  
Each request handles `ok` and `error` in JSON response:
```js
const res = await fetch("/api/tasks");
const data = await res.json();
if (!data.ok) alert(data.error);
# Week 3 Day 4 Documentation

## Versioning Overview
- Added `/api/v1/` prefix to all routes.
- Ensures backward compatibility when new versions are introduced.

## API Test URLs
- GET → `http://127.0.0.1:5000/api/v1/tasks`
- POST → `http://127.0.0.1:5000/api/v1/tasks`
- PUT → `http://127.0.0.1:5000/api/v1/tasks/<id>`
- DELETE → `http://127.0.0.1:5000/api/v1/tasks/<id>`

## Learning Points
1. **OpenAPI/Swagger** helps generate interactive API docs.
2. Versioning helps avoid breaking existing clients.
3. Cloud deployments use environment variables for URLs & API keys.
# Week 3 Day 5 Documentation

### Key Additions
1. **Logging:** Implemented Flask `logging` for requests and errors.
2. **Authentication:** Basic Bearer Token auth for protected routes.
3. **Testing:** Added unit test using `pytest` for `/api/ping`.
4. **Security:** Input validation, HTTPS, secret management discussed.
5. **Monitoring:** Introduced error logging, health check, and alerting.

### Reflection
- Flask handles requests via WSGI pipeline → executes view function → returns JSON response.
- All inputs validated and logged.
- Errors logged to both console and file for easier debugging.