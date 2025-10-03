import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Portility 🚀
      </Typography>
      <Typography variant="body1">
        This is your portfolio app scaffolded with React + Vite + Material UI.
      </Typography>
    </Box>
  );
}
