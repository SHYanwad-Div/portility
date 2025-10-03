import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function TaskCard({ title, description }) {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Paper>
  );
}
