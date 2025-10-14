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
        // make footer visually stronger and match the header in light mode
        borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.10)",
        background: isDark
          ? "linear-gradient(180deg, #00161d, #002b36)"
          : "linear-gradient(90deg, #00bcd4 0%, #7beeff 100%)",
        py: 2,
        px: 2,
      }}
    >
      <Typography
        variant="body2"
        className="silkscreen"
        sx={{
          color: isDark ? "#7beeff" : "#002a34", // dark text in light mode to match header
          letterSpacing: "0.5px",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Portility — Built with ❤️ using React + MUI
      </Typography>
    </Box>
  );
}
