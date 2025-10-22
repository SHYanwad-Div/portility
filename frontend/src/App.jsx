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

  useEffect(() => {
  let mounted = true;
  async function load() {
    try {
      const t = await getTasks();
      console.log("App.load tasks:", t);
      if (!mounted) return;
      setTasks(Array.isArray(t) ? t : []);
    } catch (err) {
      console.error("App load error:", err);
      if (mounted) setTasks([]);
    }
  }
  load();
  return () => { mounted = false; };
}, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, primary: { main: "#00bcd4" } },
        typography: { button: { textTransform: "none", fontFamily: "Silkscreen, Inter, Roboto, sans-serif" } },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
        <NavBar mode={mode} setMode={setMode} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, mt: 2 }}>
          <Routes>
            <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />} />
            <Route path="/add" element={<AddTaskPage setTasks={setTasks} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
