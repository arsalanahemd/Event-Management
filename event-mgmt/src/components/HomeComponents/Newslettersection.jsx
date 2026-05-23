import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Box
      sx={{
        background: "#f8f7f2",
        borderTop: "1px solid #eee",
        py: { xs: 7, md: 9 },
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center" }}>
          {/* Icon */}
          <Box sx={{ fontSize: "2.5rem", mb: 2 }}>📰</Box>

          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#F5C518",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Newsletter
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              fontWeight: 900,
              color: "#111",
              lineHeight: 1.15,
              fontFamily: "'Oswald', sans-serif",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Never Miss a{" "}
            <Box
              component="span"
              sx={{ color: "#F5C518", fontStyle: "italic" }}
            >
              Single News
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "#777",
              fontSize: "0.9rem",
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            Subscribe to our newsletter and get the latest event updates,
            speaker announcements, and exclusive offers delivered to your inbox.
          </Typography>

          {submitted ? (
            <Box
              sx={{
                background: "#111",
                borderRadius: "8px",
                py: 2,
                px: 3,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ color: "#F5C518", fontWeight: 700, fontSize: "0.9rem" }}>
                ✓ You're subscribed! Thank you.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                maxWidth: 480,
                mx: "auto",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    background: "#fff",
                    fontSize: "0.88rem",
                    "& fieldset": { borderColor: "#ddd" },
                    "&:hover fieldset": { borderColor: "#F5C518" },
                    "&.Mui-focused fieldset": { borderColor: "#F5C518" },
                  },
                }}
              />
              <Button
                onClick={handleSubscribe}
                sx={{
                  px: { xs: 3, sm: 3.5 },
                  py: 1.5,
                  fontWeight: 800,
                  borderRadius: "6px",
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  background: "#111",
                  color: "#F5C518",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    background: "#F5C518",
                    color: "#111",
                  },
                  transition: "all 0.25s",
                }}
              >
                Subscribe
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}