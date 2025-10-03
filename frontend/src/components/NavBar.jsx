import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Portility
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
