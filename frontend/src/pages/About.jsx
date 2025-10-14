import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        className="silkscreen"
        sx={{ color: isDark ? "#dffeff" : "rgba(0,40,50,0.95)" }}
      >
        About Portility
      </Typography>

      <Typography sx={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}>
        Portility — a portfolio SPA built with React, Vite and MUI. This demo shows routing,
        theme toggle, and local persistence.
      </Typography>
    </Box>
  );
}
