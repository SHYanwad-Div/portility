import React from "react";
import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>About Portility</Typography>
      <Typography>
        Portility — a portfolio SPA built with React, Vite and MUI. This demo shows routing,
        theme toggle, and local persistence.
      </Typography>
    </Box>
  );
}
