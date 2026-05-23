import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

// Replace images with real ones or fetch from an API
const posts = [
  { hashtag: "#InnovationTech", likes: 312, image: null, bg: "#1a1a2e" },
  { hashtag: "#BusinessConfer...", likes: 204, image: null, bg: "#2d1b00" },
  { hashtag: "#Hackathon", likes: 519, image: null, bg: "#001a2d" },
  { hashtag: "#NewDigitalMarketing", likes: 178, image: null, bg: "#1a001a" },
];

export default function SocialFeedSection() {
  return (
    <Box sx={{ background: "#111", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            mb: 5,
            gap: 2,
          }}
        >
          <Box>
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
              Social Feed
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                fontFamily: "'Oswald', sans-serif",
                textTransform: "uppercase",
              }}
            >
              More from{" "}
              <Box
                component="span"
                sx={{ color: "#F5C518", fontStyle: "italic" }}
              >
                EventSphere
              </Box>
            </Typography>
          </Box>

          <Button
            startIcon={<InstagramIcon />}
            href="https://instagram.com"
            target="_blank"
            sx={{
              px: 3,
              py: 1,
              fontWeight: 700,
              borderRadius: "6px",
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              border: "2px solid rgba(255,255,255,0.2)",
              color: "#fff",
              "&:hover": {
                background: "#F5C518",
                color: "#111",
                borderColor: "#F5C518",
              },
              transition: "all 0.25s",
            }}
          >
            Follow on Instagram
          </Button>
        </Box>

        {/* Posts Grid */}
        <Grid container spacing={2}>
          {posts.map((post, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  aspectRatio: "1",
                  cursor: "pointer",
                  background: post.bg,
                  "&:hover .overlay": { opacity: 1 },
                  "&:hover img": { transform: "scale(1.05)" },
                }}
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.hashtag}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${post.bg} 0%, #333 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InstagramIcon sx={{ fontSize: 40, color: "rgba(255,255,255,0.15)" }} />
                  </Box>
                )}

                {/* Bottom gradient + hashtag */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                    p: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#F5C518",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {post.hashtag}
                  </Typography>
                </Box>

                {/* Hover overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(245,197,24,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    ❤️ {post.likes}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}