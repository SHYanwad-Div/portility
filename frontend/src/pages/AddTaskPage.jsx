// frontend/src/pages/AddTaskPage.jsx
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { addTask } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddTaskPage({ setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setLoading(true);
    const newTask = await addTask({ title: title.trim(), description: description.trim(), completed: false });
    setLoading(false);
    if (newTask) {
      if (typeof setTasks === "function") {
        setTasks((prev) => [newTask, ...(Array.isArray(prev) ? prev : [])]);
      }
      navigate("/");
    } else {
      alert("Failed to create task — check console/network for error.");
    }
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={3} sx={{ mt: 2 }} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </Button>
    </Box>
  );
}
