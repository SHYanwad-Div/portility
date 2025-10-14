import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function TopHero({ subtitle = "Your developer tasks & projects" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="hero" sx={{ mb: 2 }}>
      <Box className="hero-inner">
        <Box>
          <Typography
            className="silkscreen"
            sx={{
              color: isDark ? "rgba(223,255,255,0.95)" : "rgba(0,55,55,0.95)",
              fontSize: { xs: "1.6rem", md: "2rem" },
              "&:hover": {
                textShadow: isDark
                  ? "0 0 10px rgba(0,230,246,0.8)"
                  : "0 0 8px rgba(0,188,212,0.6)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Portility
          </Typography>

          <Typography
            className="hero-sub"
            sx={{
              color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
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
              border: `2px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.9)",
              color: isDark ? "var(--accent-cyan-2)" : "var(--accent-cyan)",
              fontWeight: 700,
              boxShadow: isDark ? "0 6px 18px rgba(0,0,0,0.5)" : "0 4px 10px rgba(0,0,0,0.06)",
            }}
          >
            P
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
