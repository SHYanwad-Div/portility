import React from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";

export default function TaskCard({ title, description }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        p: 3,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        transition: "transform 240ms ease, box-shadow 240ms ease",
        bgcolor: isDark ? "transparent" : "#fff",
        border: `1px solid ${isDark ? "var(--card-border-dark)" : "var(--card-border-light)"}`,
        boxShadow: isDark ? "0 10px 30px rgba(2,6,23,0.5)" : "0 6px 18px rgba(12,20,28,0.04)",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: isDark
            ? "0 20px 40px rgba(0,120,140,0.06), 0 6px 18px rgba(0,0,0,0.6)"
            : "0 18px 40px rgba(2,12,38,0.06)",
        },
      }}
    >
      <Box>
        <Typography
          className="silkscreen"
          sx={{ fontWeight: 600, color: isDark ? "#e6f7f9" : "rgba(4,20,36,0.95)" }}
          variant="h6"
        >
          {title}
        </Typography>
        <Typography sx={{ mt: 1, color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)" }} variant="body2">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}
