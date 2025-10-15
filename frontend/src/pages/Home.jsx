// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TaskCard from "../components/TaskCard";
import TopHero from "../components/TopHero";
import { getTasks, deleteTask, updateTask } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await getTasks();
    setTasks(data || []);
    setLoading(false);
  }

  // Toggle completed state
  async function handleToggleComplete(task) {
    const payload = { completed: !(task.completed) };
    const updated = await updateTask(task.id, payload);
    if (updated) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    }
  }

  // Delete task
  async function handleDelete(taskId) {
    if (!window.confirm("Delete this task?")) return;
    const ok = await deleteTask(taskId);
    if (ok) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } else {
      alert("Failed to delete task.");
    }
  }

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
      <TopHero subtitle="Tasks from backend — edit or delete" />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" className="silkscreen">Your Tasks</Typography>
        <IconButton onClick={load} aria-label="refresh">
          <RefreshIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : tasks.length === 0 ? (
        <Typography>No tasks yet.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {tasks.map((task) => (
            <Grid item key={task.id} xs={12} sm={10} md={6} lg={4}>
              <TaskCard
                task={task}
                onToggle={() => handleToggleComplete(task)}
                onDelete={() => handleDelete(task.id)}
                // onEdit could navigate to an edit page if implemented
                onEdit={(t) => navigate(`/edit/${t.id}`)}

              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
