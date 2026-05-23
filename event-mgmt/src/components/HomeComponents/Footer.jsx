import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useNavigate } from "react-router-dom";

const footerLinks = {
  Events: ["/events", "/schedule", "/speakers", "/gallery"],
  Company: ["/about", "/contact", "/careers", "/blog"],
};

const footerLinkLabels = {
  "/events": "Events",
  "/schedule": "Schedule",
  "/speakers": "Speakers",
  "/gallery": "Gallery",
  "/about": "About Us",
  "/contact": "Contact",
  "/careers": "Careers",
  "/blog": "Blog",
};

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <Box sx={{ background: "#0d0d0d", color: "#fff" }}>
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={5}>
            {/* Brand */}
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.6rem",
                  fontFamily: "'Oswald', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  mb: 1.5,
                  color: "#fff",
                }}
              >
                Event
                <Box component="span" sx={{ color: "#F5C518" }}>
                  Sphere
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  mb: 3,
                  maxWidth: 280,
                }}
              >
                Connecting innovators, creators, and thinkers through
                unforgettable event experiences.
              </Typography>

              {/* Social Icons */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {[
                  { icon: <FacebookIcon fontSize="small" />, href: "#" },
                  { icon: <TwitterIcon fontSize="small" />, href: "#" },
                  { icon: <YouTubeIcon fontSize="small" />, href: "#" },
                ].map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      transition: "all 0.25s",
                      "&:hover": {
                        background: "#F5C518",
                        color: "#111",
                        borderColor: "#F5C518",
                      },
                    }}
                  >
                    {s.icon}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <Grid item xs={6} md={2} key={section}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#F5C518",
                    mb: 2.5,
                  }}
                >
                  {section}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  {links.map((href) => (
                    <Link
                      key={href}
                      component="button"
                      onClick={() => navigate(href)}
                      sx={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        p: 0,
                        transition: "color 0.2s",
                        "&:hover": { color: "#F5C518" },
                      }}
                    >
                      {footerLinkLabels[href]}
                    </Link>
                  ))}
                </Box>
              </Grid>
            ))}

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#F5C518",
                  mb: 2.5,
                }}
              >
                Contact
              </Typography>
              {[
                { icon: "📍", text: "123 Event Street, Karachi, PK" },
                { icon: "📧", text: "hello@eventsphere.com" },
                { icon: "📞", text: "+92 300 000 0000" },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", gap: 1.5, mb: 1.5, alignItems: "flex-start" }}
                >
                  <Typography sx={{ fontSize: "0.9rem" }}>{item.icon}</Typography>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: 1.6 }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Bottom bar */}
        <Box
          sx={{
            py: 2.5,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
            © {year} EventSphere. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <Link
                key={t}
                href="#"
                sx={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  "&:hover": { color: "#F5C518" },
                }}
              >
                {t}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}