// frontend/src/components/Footer.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      className="app-footer"
      sx={{
        mt: 4,
        py: 2,
        borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
        bgcolor: isDark ? "transparent" : "transparent",
      }}
    >
      <Typography
        variant="body2"
        className="silkscreen"
        sx={{
          fontFamily: "Silkscreen, Inter, Roboto, sans-serif",
          color: isDark ? "#7beeff" : "#00383f", // stronger color in light mode
          letterSpacing: "0.5px",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Portility — Built with ❤️ using React + MUI
      </Typography>
    </Box>
  );
}
