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
import { getTasks } from "./api";

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "dark");
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [tasksError, setTasksError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", mode);
    } catch (e) {
      // ignore localStorage write errors (e.g. private mode)
      void e;
    }
  }, [mode]);

  // Load tasks from Flask API (with abort + error handling)
  useEffect(() => {
    const ac = new AbortController();
    setLoadingTasks(true);
    setTasksError(null);

    (async () => {
      try {
        const data = await getTasks({ signal: ac.signal });
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to fetch tasks:", err);
        setTasksError("Failed to load tasks");
        setTasks([]); // fallback
      } finally {
        setLoadingTasks(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#00bcd4" },
        },
        typography: {
          button: { textTransform: "none", fontFamily: "Silkscreen, Inter, Roboto, sans-serif" },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <NavBar mode={mode} setMode={setMode} />

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, mt: 2 }}>
          <Routes>
            {/* pass both tasks and setter so Home can update/delete locally */}
            <Route
              path="/"
              element={<Home tasks={tasks} setTasks={setTasks} loading={loadingTasks} error={tasksError} />}
            />
            {/* AddTaskPage receives setTasks to append newly created tasks */}
            <Route path="/add" element={<AddTaskPage setTasks={setTasks} />} />
            <Route path="/edit/:id" element={<AddTaskPage setTasks={setTasks} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
