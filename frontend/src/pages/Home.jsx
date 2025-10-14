// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Box, Grid, TextField, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskCard from "../components/TaskCard";
import TopHero from "../components/TopHero";

export default function Home({ tasks = [] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
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

      <Box className="search-box" sx={{ alignItems: "center" }}>
        <TextField
          placeholder="Search tasks or projects..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          fullWidth
          variant={isDark ? "filled" : "outlined"}
          InputProps={{
            sx: {
              background: isDark ? "rgba(255,255,255,0.02)" : "#fff",
              color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.95)",
              borderRadius: 1,
              "& .MuiInputBase-input": {
                color: isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.12)",
              },
            },
          }}
        />
        <IconButton sx={{ bgcolor: isDark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.06)" }}>
          <SearchIcon sx={{ color: isDark ? "#dffeff" : "var(--accent-cyan)" }} />
        </IconButton>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3} className="center-grid" justifyContent="center">
          {filtered.map((task, i) => (
            <Grid item key={i} xs={12} sm={10} md={6} lg={4}>
              <TaskCard title={task.title} description={task.description} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
