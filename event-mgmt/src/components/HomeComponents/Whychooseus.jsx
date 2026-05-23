import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";

const features = [
  {
    icon: <EventIcon sx={{ fontSize: 40 }} />,
    title: "Professional Management",
    desc: "Experienced team ensuring every event runs flawlessly.",
    color: "#F5C518",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    title: "Personalized Planning",
    desc: "Every event tailored to reflect your unique style and goals.",
    color: "#f472b6",
  },
  {
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    title: "Trusted Network",
    desc: "Strong vendor relationships for reliable, high-quality services.",
    color: "#60a5fa",
  },
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    title: "Top Rated",
    desc: "Hundreds of satisfied clients trust us for their biggest days.",
    color: "#34d399",
  },
];

export default function WhyChooseUs() {
  return (
    <Box sx={{ background: "#f8f7f2", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 7 }}>
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
            Why Us
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              color: "#111",
              lineHeight: 1.1,
              fontFamily: "'Oswald', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Why EventSphere{" "}
            <Box component="span" sx={{ color: "#F5C518", fontStyle: "italic" }}>
              Stands Out
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 3,
                  p: 3.5,
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                    borderColor: feature.color,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "12px",
                    background: `${feature.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#111",
                    fontSize: "1rem",
                    mb: 1,
                    fontFamily: "'Oswald', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.7 }}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}