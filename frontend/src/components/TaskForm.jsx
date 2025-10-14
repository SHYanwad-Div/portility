import React, { useState } from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";

export default function TaskForm({ addTask }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = title.trim();
    const d = description.trim();
    if (!t || !d) {
      alert("Please fill in both fields.");
      return;
    }
    addTask({ title: t, description: d });
    setTitle("");
    setDescription("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        variant={isDark ? "filled" : "outlined"}
      />
      <TextField
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        multiline
        rows={3}
        variant={isDark ? "filled" : "outlined"}
      />
      <Button type="submit" variant="contained">Add Task</Button>
    </Box>
  );
}
