import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ContactBanner() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#111", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="md">
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
            border: "1px solid rgba(245,197,24,0.2)",
            borderRadius: 4,
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 8 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative background element */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(245,197,24,0.06)",
              border: "1px solid rgba(245,197,24,0.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(245,197,24,0.04)",
              border: "1px solid rgba(245,197,24,0.08)",
            }}
          />

          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#F5C518",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Reserve Your Spot
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              fontFamily: "'Oswald', sans-serif",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Join the Next Big{" "}
            <Box component="span" sx={{ color: "#F5C518" }}>
              Event Experience
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.55)",
              fontSize: { xs: "0.9rem", md: "1rem" },
              mb: 5,
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Turn your vision into reality — reserve your spot and craft an
            unforgettable event!
          </Typography>
          <Button
            size="large"
            sx={{
              px: 5,
              py: 1.6,
              fontSize: "0.85rem",
              fontWeight: 800,
              borderRadius: "6px",
              background: "#F5C518",
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              "&:hover": {
                background: "#e6b800",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(245,197,24,0.3)",
              },
              transition: "all 0.3s",
            }}
            onClick={() => navigate("/contact")}
          >
            Book Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}