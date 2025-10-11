import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

export default function NavBar({ mode, setMode }) {
  const navigate = useNavigate();
  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));

  const LINK_STYLE = {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Portility
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
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
