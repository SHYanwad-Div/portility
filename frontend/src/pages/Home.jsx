import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState([
    { title: "Task 1", description: "This is the first task" },
    { title: "Task 2", description: "This is the second task" },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Example useEffect: log tasks on change
  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Portility 🚀
      </Typography>

      <TaskForm addTask={addTask} />

      {tasks.map((task, index) => (
        <TaskCard key={index} title={task.title} description={task.description} />
      ))}
    </Box>
  );
}
