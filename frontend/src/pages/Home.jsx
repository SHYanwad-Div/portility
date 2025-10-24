// frontend/src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Box, Grid, TextField, IconButton, useTheme, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskCard from "../components/TaskCard";
import TopHero from "../components/TopHero";

export default function Home({ tasks = [] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [q, setQ] = useState("");

  console.log("Home received tasks:", tasks);

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
    <Box>
      <TopHero subtitle="Tasks & Projects — quick access" />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", my: 2 }}>
        <TextField
          placeholder="Search tasks or projects..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          fullWidth
          variant={isDark ? "filled" : "outlined"}
        />
        <IconButton><SearchIcon /></IconButton>
      </Box>

      {filtered.length === 0 ? (
        <Typography>No tasks found</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((task) => (
            <Grid item key={task.id} xs={12} sm={6} md={4}>
              <TaskCard {...task} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
