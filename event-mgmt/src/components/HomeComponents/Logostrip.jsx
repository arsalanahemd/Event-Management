import React from "react";
import { Box, Typography } from "@mui/material";

const logos = [
  "LogoIpsum",
  "LogoIpsum",
  "LogoIpsum",
  "LogoIpsum",
  "LogoIpsum",
  "LogoIpsum",
];

export default function LogoStrip() {
  return (
    <Box
      sx={{
        background: "#1a1a1a",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        py: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          animation: "scrollLogos 18s linear infinite",
          width: "max-content",
          "@keyframes scrollLogos": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <Typography
            key={i}
            sx={{
              color: "rgba(255,255,255,0.35)",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '"◆"',
                fontSize: "0.5rem",
                color: "#F5C518",
              },
            }}
          >
            {logo}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}