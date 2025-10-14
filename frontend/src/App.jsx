// src/App.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddTaskPage from "./pages/AddTaskPage";
import About from "./pages/About";
import Footer from "./components/Footer";

export default function App() {
  // theme same as before
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("themeMode") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
  try {
    localStorage.setItem("themeMode", mode);
  } catch (error) {
    // Option A: log a lightweight warning during development
    // console.warn("Failed to persist themeMode:", error);

    // Option B: explicitly ignore the error (keeps lint happy)
    void error;
  }
}, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, primary: { main: "#00bcd4" } },
        typography: { button: { textTransform: "none", fontFamily: "Silkscreen, Inter, Roboto, sans-serif" } },
      }),
    [mode]
  );

  // --------------------------
  // Tasks state (from API)
  // --------------------------
  const [tasks, setTasks] = useState([]); // start empty, will fill from API
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    // fetch tasks on mount
    async function fetchTasks() {
      try {
        setLoadingTasks(true);
        const res = await fetch("http://127.0.0.1:5000/api/tasks");
        const data = await res.json();
        if (res.ok && data && data.ok) {
          setTasks(Array.isArray(data.tasks) ? data.tasks : []);
        } else {
          console.error("Failed to load tasks:", data);
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      } finally {
        setLoadingTasks(false);
      }
    }

    fetchTasks();
  }, []); // run once on mount

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
        <NavBar mode={mode} setMode={setMode} />

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, mt: 2 }}>
          <Routes>
            <Route path="/" element={<Home tasks={tasks} loading={loadingTasks} />} />
            <Route path="/add" element={<AddTaskPage tasks={tasks} setTasks={setTasks} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
