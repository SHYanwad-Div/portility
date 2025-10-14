import React from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Box, Button
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function NavBar({ mode, setMode }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <AppBar
      position="static"
      sx={{
        background: isDark
          ? "linear-gradient(90deg, #001f24 0%, #003f4f 100%)"
          : "linear-gradient(90deg, #00bcd4 0%, #7beeff 100%)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <Toolbar>
        <Typography
  variant="h6"
  sx={{
    flexGrow: 1,
    cursor: "pointer",
    fontFamily: "Silkscreen, sans-serif",
    // Light mode: dark teal for high contrast. Dark mode: bright cyan.
    color: isDark ? "#00e6f6" : "#002a34",
    fontWeight: 700,
    letterSpacing: "0.8px",
    // subtle shadows: only a faint, tight shadow in light mode for separation,
    // and a soft neon glow in dark mode
    textShadow: isDark
      ? "0 0 8px rgba(0, 230, 246, 0.6)"
      : "0 1px 0 rgba(255,255,255,0.85)",
  }}
  onClick={() => navigate("/")}
>
  Portility
</Typography>


        <Box sx={{ display: "flex", gap: 1, fontFamily: "Silkscreen, sans-serif" }}>
          <Button color="inherit" component={NavLink} to="/" sx={{ textTransform: "none" }}>
            <HomeIcon sx={{ mr: 0.5 }} /> Home
          </Button>
          <Button color="inherit" component={NavLink} to="/add" sx={{ textTransform: "none" }}>
            <AddIcon sx={{ mr: 0.5 }} /> Add Task
          </Button>
          <Button color="inherit" component={NavLink} to="/about" sx={{ textTransform: "none" }}>
            <InfoIcon sx={{ mr: 0.5 }} /> About
          </Button>

          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
