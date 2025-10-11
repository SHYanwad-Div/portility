import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddTaskPage from "./pages/AddTaskPage";
import About from "./pages/About";

export default function App() {
  // theme mode persisted to localStorage
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("themeMode") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#00bcd4" },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
        >
        <NavBar mode={mode} setMode={setMode} />
        <Box component="main" sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
