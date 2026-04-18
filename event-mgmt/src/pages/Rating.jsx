import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  Button,
  Stack,
  Container,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const NEON_CYAN = "#4CC9F0";
const NEON_BLUE = "#4361EE";
const DARK_BG = "#0D1B2A";
const CARD_BG = "#1B263B";

function Rating() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [ratingData, setRatingData] = useState({
    fullName: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [alert, setAlert] = useState({ success: true, message: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setRatingData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    } else {
      setIsLoggedIn(false);
      setAlert({ success: false, message: "Please login to submit a rating." });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setAlert({ success: false, message: "Please login first." });
        return;
      }
      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;

      if (!userId) {
        setAlert({ success: false, message: "User session invalid." });
        return;
      }
      if (ratingData.rating === 0) {
        setAlert({ success: false, message: "Please select a star rating." });
        return;
      }

      const res = await axios.post("http://localhost:3001/api/ratings", {
        ...ratingData,
        userId,
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Thank you for your feedback! ⭐" });
        setRatingData((prev) => ({ ...prev, rating: 0, message: "" }));
        setTimeout(() => setAlert({ success: true, message: "" }), 3000);
      }
    } catch (error) {
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      backgroundColor: "rgba(0,0,0,0.2)",
      "& fieldset": { borderColor: "rgba(76, 201, 240, 0.2)" },
      "&:hover fieldset": { borderColor: NEON_CYAN },
      "&.Mui-focused fieldset": { borderColor: NEON_CYAN },
      "&.Mui-disabled": {
        color: "white",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
    "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
    "& .MuiInputLabel-root.Mui-disabled": { color: "rgba(255,255,255,0.7)" },
    "& .MuiOutlinedInput-input.Mui-disabled": {
      WebkitTextFillColor: "#FFFFFF",
      opacity: 1,
    },
  };

  return (
    <Box sx={{ background: DARK_BG, minHeight: "100vh", pb: 10 }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #1B263B 0%, #0D1B2A 100%)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          textAlign: "center",
          borderBottom: "1px solid rgba(76, 201, 240, 0.1)",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={900}
          sx={{
            background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_BLUE})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            mb: 2,
          }}
        >
          Rate Your Experience
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: "600px",
            mx: "auto",
            px: 2,
          }}
        >
          Your feedback fuels our innovation. Help us make EventSphere even
          better.
        </Typography>
      </Box>

      {/* FORM CONTAINER */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Card
          sx={{
            borderRadius: 4,
            backgroundColor: CARD_BG,
            backgroundImage: "none",
            border: "1px solid rgba(76, 201, 240, 0.15)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            overflow: "visible",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            {alert.message && (
              <Alert
                severity={alert.success ? "success" : "error"}
                variant="filled"
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  backgroundColor: alert.success
                    ? "rgba(6, 214, 160, 0.1)"
                    : "rgba(255, 71, 87, 0.1)",
                  color: alert.success ? "#06D6A0" : "#FF4757",
                  border: `1px solid ${
                    alert.success
                      ? "rgba(6, 214, 160, 0.3)"
                      : "rgba(255, 71, 87, 0.3)"
                  }`,
                  "& .MuiAlert-icon": {
                    color: alert.success ? "#06D6A0" : "#FF4757",
                  },
                  fontWeight: 600,
                }}
              >
                {alert.message}
              </Alert>
            )}

            <Stack spacing={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    value={ratingData.fullName}
                    fullWidth
                    disabled
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    value={ratingData.email}
                    fullWidth
                    disabled
                    sx={inputStyle}
                  />
                </Grid>
              </Grid>

              {/* STAR RATING SECTION */}
              <Box
                textAlign="center"
                sx={{
                  py: 4,
                  borderRadius: 3,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                <Typography
                  fontWeight={900}
                  mb={2}
                  sx={{
                    fontFamily: "'Syncopate', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "5px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                    background: `linear-gradient(90deg, #FFFFFF 0%, ${NEON_CYAN} 50%, #FFFFFF 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "glow 3s ease-in-out infinite alternate",
                    "@keyframes glow": {
                      from: {
                        opacity: 0.8,
                        filter: "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
                      },
                      to: {
                        opacity: 1,
                        filter: `drop-shadow(0 0 8px ${NEON_CYAN})`,
                      },
                    },
                  }}
                >
                  How would you rate us?
                </Typography>

                {/* STARS CONTAINER  */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconButton
                      key={star}
                      onClick={() =>
                        setRatingData((prev) => ({ ...prev, rating: star }))
                      }
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      sx={{
                        transition: "all 0.2s ease",
                        mx: { xs: 0.1, sm: 0.2 },
                        padding: "6px",
                        "&:hover": {
                          transform: "scale(1.2)",
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                        },
                      }}
                    >
                      <StarIcon
                        sx={{
                          fontSize: { xs: 45, md: 55 },
                          color:
                            star <= (hoverRating || ratingData.rating)
                              ? "#FFD166"
                              : "rgba(255,255,255,0.1)",
                          filter:
                            star <= (hoverRating || ratingData.rating)
                              ? "drop-shadow(0 0 15px rgba(255, 209, 102, 0.6))"
                              : "none",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </IconButton>
                  ))}
                </Box>
              </Box>

              <TextField
                label="Your Feedback"
                name="message"
                placeholder="Share your thoughts with us..."
                value={ratingData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={5}
                sx={inputStyle}
              />

              <Button
                variant="contained"
                disabled={!isLoggedIn}
                onClick={handleSubmit}
                sx={{
                  py: 2.2,
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  borderRadius: "12px",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  background: `linear-gradient(90deg, ${NEON_BLUE}, ${NEON_CYAN})`,
                  boxShadow: `0 4px 20px rgba(67, 97, 238, 0.3)`,
                  transition: "all 0.3s",
                  "&:hover": {
                    background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_BLUE})`,
                    transform: "translateY(-3px)",
                    boxShadow: `0 8px 25px rgba(76, 201, 240, 0.4)`,
                  },
                  "&.Mui-disabled": {
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                Submit Review
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Rating;
