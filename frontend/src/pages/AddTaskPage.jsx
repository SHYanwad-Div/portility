// src/pages/AddTaskPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";

export default function AddTaskPage({  setTasks }) {
  const navigate = useNavigate();

  const addTask = async (task) => {
    try {
      // send to backend
      const res = await fetch("http://127.0.0.1:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      if (res.ok && data && data.ok) {
        // append server-returned task (has id)
        setTasks((prev) => (Array.isArray(prev) ? [...prev, data.task] : [data.task]));
        navigate("/");
      } else {
        // validation or server error
        console.error("Failed to add task:", data);
        alert(data.error || "Failed to add task (server error).");
      }
    } catch (err) {
      console.error("Add task request failed:", err);
      alert("Could not reach server. Make sure backend is running.");
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
      <Typography variant="h4" className="silkscreen" gutterBottom>
        Add Task
      </Typography>
      <TaskForm addTask={addTask} />
    </Box>
  );
}
