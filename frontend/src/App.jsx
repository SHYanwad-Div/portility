// frontend/src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
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
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const t = await getTasks();
      console.log("App.load tasks:", t);
      if (!mounted) return;
      setTasks(Array.isArray(t) ? t : []);
    }
    load();
    return () => (mounted = false);
  }, []);

  const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode,
        primary: { main: "#00bcd4" },
        background: {
          default: mode === "dark" ? "#0f2730" : "#f6f8fa", // lighter navy for dark
          paper: mode === "dark" ? "#071822" : "#fff",
        },
        text: {
          primary: mode === "dark" ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.9)",
          secondary: mode === "dark" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
        },
      },
      typography: {
        button: { textTransform: "none", fontFamily: "Silkscreen, Inter, Roboto, sans-serif" },
        h6: { fontFamily: "Silkscreen, Inter, Roboto, sans-serif" },
      },
    }),
  [mode]
);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavBar mode={mode} setMode={setMode} />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Home tasks={tasks} />} />
            <Route path="/add" element={<AddTaskPage setTasks={setTasks} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
