// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Box, Grid, TextField, IconButton, useTheme, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskCard from "../components/TaskCard";
import TopHero from "../components/TopHero";

export default function Home({ tasks = [], setTasks }) {
  console.log("Home received tasks:", tasks);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = (q || "").trim().toLowerCase();
    if (!term) return tasks;
    return tasks.filter(
      (t) =>
        (t.title && t.title.toLowerCase().includes(term)) ||
        (t.description && t.description.toLowerCase().includes(term))
    );
  }, [q, tasks]);

  return (
    <Box className="app-main">
      <TopHero subtitle="Tasks & Projects — quick access" />

      <Box className="search-box" sx={{ display: "flex", gap: 1, alignItems: "center", my: 2 }}>
        <TextField
          placeholder="Search tasks or projects..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          fullWidth
          variant={isDark ? "filled" : "outlined"}
          InputProps={{
            sx: {
              background: isDark ? "rgba(255,255,255,0.02)" : "#fff",
              color: isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)",
            },
          }}
        />
        <IconButton>
          <SearchIcon sx={{ color: isDark ? "#dffeff" : "var(--accent-cyan)" }} />
        </IconButton>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3} justifyContent="center">
          {filtered && filtered.length > 0 ? (
            filtered.map((task, i) => (
              <Grid item key={task.id ?? i} xs={12} sm={10} md={6} lg={4}>
                <TaskCard title={task.title} description={task.description} task={task} setTasks={setTasks} />
              </Grid>
            ))
          ) : (
            <Box sx={{ width: "100%", mt: 6, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No tasks found
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
