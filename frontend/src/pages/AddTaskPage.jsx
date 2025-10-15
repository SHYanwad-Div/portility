// src/pages/AddTaskPage.jsx
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { addTask, updateTask } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { getTasks } from "../api"; // used to pre-fill when editing (simple approach)

export default function AddTaskPage({ setTasks }) {
  const navigate = useNavigate();
  const params = useParams(); // optional: if route is /edit/:id
  const editingId = params?.id; // undefined when adding
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // If you want to support editing on /edit/:id, pre-fill fields
  useEffect(() => {
    if (!editingId) return;
    (async () => {
      const all = await getTasks();
      const t = all.find((x) => String(x.id) === String(editingId));
      if (t) {
        setTitle(t.title || "");
        setDescription(t.description || "");
      } else {
        alert("Task not found");
        navigate("/");
      }
    })();
  }, [editingId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill both fields");
      return;
    }

    if (editingId) {
      const updated = await updateTask(editingId, { title: title.trim(), description: description.trim() });
      if (updated) {
        // update list in parent (if provided) via re-fetch or setTasks
        if (setTasks) setTasks((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        navigate("/");
      } else {
        alert("Failed to update");
      }
    } else {
      const created = await addTask({ title: title.trim(), description: description.trim(), completed: false });
      if (created) {
        if (setTasks) setTasks((prev) => [...prev, created]);
        navigate("/");
      } else {
        alert("Failed to create");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 640, mx: "auto", px: 2, py: 3 }}>
      <Typography variant="h5" gutterBottom className="silkscreen">
        {editingId ? "Edit Task" : "Add Task"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          {editingId ? "Save changes" : "Add Task"}
        </Button>
      </form>
    </Box>
  );
}
