import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AddTaskPage() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const navigate = useNavigate();

  const addTask = (task) => {
    setTasks([...tasks, task]);
    // redirect back to home after add
    navigate("/");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Add Task</Typography>
      <TaskForm addTask={addTask} />
    </Box>
  );
}
