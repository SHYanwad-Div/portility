// src/pages/Home.jsx
import React, { useMemo, useEffect, useState } from "react";
import { Box, Grid, TextField, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskCard from "../components/TaskCard";
import TopHero from "../components/TopHero";
import { getTasks, updateTask, deleteTask } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home({ tasks = [], setTasks, loading = false }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // If parent didn't load tasks (defensive), load them here once
  useEffect(() => {
    let mounted = true;
    (async () => {
      if ((!tasks || tasks.length === 0) && typeof setTasks === "function") {
        const data = await getTasks();
        if (mounted) setTasks(Array.isArray(data) ? data : []);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const filtered = useMemo(() => {
    const term = (q || "").trim().toLowerCase();
    if (!term) return tasks || [];
    return (tasks || []).filter(
      (t) =>
        (t.title && t.title.toLowerCase().includes(term)) ||
        (t.description && t.description.toLowerCase().includes(term))
    );
  }, [q, tasks]);

  // Toggle completed state
  async function handleToggleComplete(task) {
    try {
      const payload = { completed: !task.completed };
      const updated = await updateTask(task.id, payload);
      if (updated) {
        // update state using setTasks from parent
        if (typeof setTasks === "function") {
          setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        }
      } else {
        alert("Failed to update task.");
      }
    } catch (err) {
      console.error("toggle error", err);
      alert("Error updating task");
    }
  }

  // Delete task
  async function handleDelete(taskId) {
    if (!window.confirm("Delete this task?")) return;
    try {
      const ok = await deleteTask(taskId);
      if (ok) {
        if (typeof setTasks === "function") {
          setTasks((prev) => prev.filter((t) => t.id !== taskId));
        }
      } else {
        alert("Failed to delete task.");
      }
    } catch (err) {
      console.error("delete error", err);
      alert("Error deleting task");
    }
  }

  // Edit -> navigate to edit route (AddTaskPage handles edit when route /edit/:id exists)
  function handleEdit(task) {
    navigate(`/edit/${task.id}`);
  }

  return (
    <Box className="app-main" sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
      <TopHero subtitle="Tasks & Projects — quick access" />

      {/* SEARCH */}
      <Box
        className="search-box"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          mb: 3,
          width: "100%",
          maxWidth: 900,
          mx: "auto",
        }}
      >
        <TextField
          placeholder="Search tasks or projects..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: {
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
            },
          }}
        />
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        {loading ? (
          <Typography>Loading tasks…</Typography>
        ) : filtered.length === 0 ? (
          <Typography>No tasks found.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {filtered.map((task) => (
              <Grid item key={task.id ?? task.title} xs={12} sm={10} md={6} lg={4}>
                <TaskCard
                  task={task}
                  onToggle={() => handleToggleComplete(task)}
                  onDelete={() => handleDelete(task.id)}
                  onEdit={() => handleEdit(task)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
