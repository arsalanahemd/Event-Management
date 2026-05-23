import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AchievementBanner() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#111", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: { md: 360 },
          }}
        >
          {/* Left: Text content */}
          <Box
            sx={{
              flex: 1,
              background: "#1a1a1a",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#F5C518",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Join Us
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                fontFamily: "'Oswald', sans-serif",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Let's Join the{" "}
              <Box
                component="span"
                sx={{ color: "#F5C518", fontStyle: "italic" }}
              >
                Tech Achievement
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                mb: 4,
                maxWidth: 400,
              }}
            >
              Be part of the biggest tech gathering of the year. Network with
              innovators, learn from experts, and shape the future together.
            </Typography>
            <Box>
              <Button
                size="large"
                onClick={() => navigate("/contact")}
                sx={{
                  px: 4,
                  py: 1.4,
                  fontSize: "0.82rem",
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
              >
                Register Now
              </Button>
            </Box>
          </Box>

          {/* Right: Image / visual */}
          <Box
            sx={{
              flex: 1,
              minHeight: { xs: 240, md: "auto" },
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #0f2027 50%, #203a43 100%)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Decorative circles */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                right: "10%",
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: "2px solid rgba(245,197,24,0.2)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "15%",
                left: "5%",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(245,197,24,0.07)",
                border: "1px solid rgba(245,197,24,0.15)",
              }}
            />
            {/* Big yellow circle avatar placeholder */}
            <Box
              sx={{
                width: { xs: 120, md: 180 },
                height: { xs: 120, md: 180 },
                borderRadius: "50%",
                background: "rgba(245,197,24,0.15)",
                border: "3px solid rgba(245,197,24,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              🚀
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}