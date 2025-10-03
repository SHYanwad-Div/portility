import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill in both fields!");
      return;
    }
    addTask({ title, description });
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
      />
      <TextField
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">Add Task</Button>
    </Box>
  );
}
