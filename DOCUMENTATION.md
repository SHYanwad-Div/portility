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