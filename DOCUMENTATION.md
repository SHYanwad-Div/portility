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
