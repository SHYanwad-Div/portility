import React from "react";
import { Box, Typography } from "@mui/material";
import TaskCard from "../components/TaskCard";

export default function Home() {
  const tasks = [
    { title: "Task 1", description: "This is the first task" },
    { title: "Task 2", description: "This is the second task" },
    { title: "Task 3", description: "This is the third task" },
  ];

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Portility 🚀
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here are some tasks:
      </Typography>

      {tasks.map((task, index) => (
        <TaskCard key={index} title={task.title} description={task.description} />
      ))}
    </Box>
  );
}
