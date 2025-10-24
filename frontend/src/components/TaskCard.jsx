// frontend/src/components/TaskCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, IconButton, useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function TaskCard({  title = "", description = "" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  

  // Card bg + text colors responsive to theme
  const cardSx = {
    borderRadius: 2,
    p: 1,
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#fff",
    color: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.87)",
    boxShadow: isDark ? "0 6px 20px rgba(0,0,0,0.6)" : "0 6px 18px rgba(2,12,27,0.06)",
    border: isDark ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.06)",
  };

  return (
    <Card sx={cardSx} elevation={0}>
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: "inherit", // uses card text color set above
            fontFamily: "Silkscreen, Inter, Roboto, sans-serif",
          }}
        >
          {title || "Untitled"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: isDark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.6)",
            fontSize: "0.95rem",
          }}
        >
          {description || "No description"}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, pr: 1 }}>
        <IconButton size="small" aria-label="mark complete">
          <CheckCircleOutlineIcon sx={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.54)" }} />
        </IconButton>
        <IconButton size="small" aria-label="edit">
          <EditIcon sx={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.54)" }} />
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <DeleteOutlineIcon sx={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.54)" }} />
        </IconButton>
      </Box>
    </Card>
  );
}
