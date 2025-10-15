// src/api.js  (fetch-based, no extra deps)
const API_BASE = "http://127.0.0.1:5000/api";

export async function getTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.tasks || [];
  } catch (err) {
    console.error("getTasks error:", err);
    return [];
  }
}

export async function addTask(task) {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("addTask server error:", data);
      return null;
    }
    return data.task;
  } catch (err) {
    console.error("addTask error:", err);
    return null;
  }
}
// ✅ PUT update task
export async function updateTask(id, data) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || `HTTP ${res.status}`);
    return result.task;
  } catch (err) {
    console.error("updateTask error:", err);
    return null;
  }
}

// ✅ DELETE task
export async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || `HTTP ${res.status}`);
    return result.ok;
  } catch (err) {
    console.error("deleteTask error:", err);
    return false;
  }
}
