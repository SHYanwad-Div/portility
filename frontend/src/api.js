// frontend/src/api.js
const API_BASE = "http://127.0.0.1:5000/api/v1/tasks/";
const API_TOKEN = "dev-token";

function headers(withAuth = false) {
  const h = { "Content-Type": "application/json" };
  if (withAuth && API_TOKEN) h["Authorization"] = `Bearer ${API_TOKEN}`;
  return h;
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}

export async function getTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    console.log("getTasks: raw response", res.status, res.ok);
    const data = await safeJson(res);
    console.log("getTasks: parsed data", data);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data?.tasks || [];
  } catch (err) {
    console.error("getTasks error:", err);
    return [];
  }
}

export async function addTask(task) {
  try {
    console.log("addTask: sending", task);
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify(task),
    });
    console.log("addTask: raw response", res.status, res.ok);
    const data = await safeJson(res);
    console.log("addTask: parsed data", data);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data?.task || null;
  } catch (err) {
    console.error("addTask error:", err);
    return null;
  }
}

export async function updateTask(id, payload) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify(payload),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data?.task || null;
  } catch (err) {
    console.error("updateTask error:", err);
    return null;
  }
}

export async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
      headers: headers(true),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data?.ok ?? true;
  } catch (err) {
    console.error("deleteTask error:", err);
    return false;
  }
}
