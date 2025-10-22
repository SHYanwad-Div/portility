// src/api.js
const API_BASE = "http://127.0.0.1:5000/api/v1";
const API_TOKEN = "dev-token"; // dev only — load from config in prod

function headers(withAuth = false) {
  const h = { "Content-Type": "application/json" };
  if (withAuth && API_TOKEN) h["Authorization"] = `Bearer ${API_TOKEN}`;
  return h;
}

// helper to parse JSON safely
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// GET all tasks
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

// POST create new task (requires token)
export async function addTask(task) {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify(task),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data?.task || null;
  } catch (err) {
    console.error("addTask error:", err);
    return null;
  }
}

// PUT update task (requires token)
export async function updateTask(id, payload) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify(payload),
    });
    const result = await safeJson(res);
    if (!res.ok) throw new Error(result?.error || `HTTP ${res.status}`);
    return result?.task || null;
  } catch (err) {
    console.error("updateTask error:", err);
    return null;
  }
}

// DELETE task (requires token)
export async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
      headers: headers(true),
    });
    const result = await safeJson(res);
    if (!res.ok) throw new Error(result?.error || `HTTP ${res.status}`);
    return result?.ok ?? true;
  } catch (err) {
    console.error("deleteTask error:", err);
    return false;
  }
}

// Ping backend health
export async function pingBackend() {
  try {
    // ping endpoint is at /api/ping (root of server)
    const baseRoot = API_BASE.replace("/api/v1", "");
    const res = await fetch(`${baseRoot}/api/ping`);
    const data = await safeJson(res);
    return data?.ok ? "Backend reachable" : "Ping failed";
  } catch {
    return "Backend not reachable";
  }
}
