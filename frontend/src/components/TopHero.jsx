// frontend/src/components/TopHero.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function TopHero({ subtitle = "Your developer tasks & projects" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="hero" sx={{ mb: 2 }}>
      <Box className="hero-inner" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography
  className="silkscreen"
  sx={{
    color: isDark ? "rgba(125,255,235,0.95)" : "rgba(0,55,55,0.95)",
    fontSize: { xs: "1.8rem", md: "2.2rem" },
    fontFamily: "Silkscreen, Inter, Roboto, sans-serif",
    fontWeight: 600,
  }}
>
  Portility
</Typography>

<Typography
  className="hero-sub"
  sx={{
    color: isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
    mt: 0.5,
  }}
  variant="body2"
>
  {subtitle}
</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: `2px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)",
              color: isDark ? "var(--accent-cyan-2)" : "var(--accent-cyan)",
              fontWeight: 700,
            }}
          >
            P
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
