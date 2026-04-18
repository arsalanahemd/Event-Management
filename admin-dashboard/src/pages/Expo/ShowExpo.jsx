import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Theme Constants
const NEON_CYAN = "#4CC9F0";
const NEON_PINK = "#F72585";

function ShowExpos() {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ success: true, message: "" });
  const navigate = useNavigate();

  const fetchExpos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/expo");
      if (res.data.success) setExpos(res.data.expos);
    } catch (err) {
      setAlert({ success: false, message: "Failed to load expos" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expo?")) return;
    try {
      const res = await axios.delete(`http://localhost:3001/expo/delete/${id}`);
      if (res.data.success) {
        setAlert({ success: true, message: "Expo deleted successfully" });
        setExpos(expos.filter((e) => e._id !== id));
        setTimeout(() => setAlert({ success: true, message: "" }), 3000);
      }
    } catch (err) {
      setAlert({ success: false, message: "Failed to delete expo" });
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    try {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D1B2A",
        }}
      >
        <CircularProgress sx={{ color: NEON_CYAN }} />
        <Typography mt={2} sx={{ color: "#94A3B8", fontWeight: 600 }}>
          Fetching Live Expos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
        p: { xs: 2, md: 5 },
        pb: 10,
      }}
    >
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "3px",
            mb: 4,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 4px 10px rgba(76, 201, 240, 0.2))",
          }}
        >
          Live Expo Events
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>
          Discover and manage upcoming industry showcases
        </Typography>
      </Box>

      {alert.message && (
        <Alert
          severity={alert.success ? "success" : "error"}
          variant="filled"
          sx={{ mb: 4, borderRadius: "12px", maxWidth: "600px", mx: "auto" }}
        >
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={4}>
        {expos.map((expo) => (
          <Grid item xs={12} sm={6} lg={4} key={expo._id}>
            <Card
              sx={{
                height: "100%",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(15px)",
                borderRadius: "30px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "white",
                transition: "all 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "rgba(76, 201, 240, 0.5)",
                  boxShadow: `0 10px 20px rgba(0, 0, 0, 0.4)`,
                },
              }}
            >
              {/*   Image Section  */}
              <Box sx={{ position: "relative", height: "450px", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="450"
                  image={
                    expo.image
                      ? `http://localhost:3001/uploads/${expo.image}`
                      : "https://via.placeholder.com/400x320?text=No+Image"
                  }
                  alt={expo.title}
                  sx={{
                    transition: "0.6s ease",
                    objectFit: "cover",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
                <Chip
                  label={expo.theme || "General"}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                    color: "#0D1B2A",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.65rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                />
              </Box>

              {/* CardContent */}
              <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.1 }}>
                  {expo.title}
                </Typography>

                <Stack spacing={0.8}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: NEON_CYAN }} />
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      {expo.date ? new Date(expo.date).toDateString() : "Date TBD"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: NEON_PINK }} />
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      {formatTime(expo.startTime)} — {formatTime(expo.endTime)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: "#4895EF" }} />
                    <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600 }}>
                      {expo.venue?.venueName}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.05)" }} />

                <Box
                  sx={{
                    p: 1.2,
                    borderRadius: "12px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: NEON_CYAN, fontWeight: 900, fontSize: "0.6rem", display: "block" }}
                  >
                    FEATURED SPEAKER
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontWeight: 500, fontSize: "0.85rem" }}
                  >
                    {expo.speaker?.name || "No Speaker Assigned"}
                  </Typography>
                </Box>
              </CardContent>

              {/* Compact Buttons */}
              <Box sx={{ px: 3, pb: 2, display: "flex", gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/editExpo/${expo._id}`)}
                  sx={{
                    borderRadius: "10px",
                    color: NEON_CYAN,
                    borderColor: "rgba(76, 201, 240, 0.3)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    py: 0.8,
                    "&:hover": { borderColor: NEON_CYAN, background: "rgba(76, 201, 240, 0.05)" },
                  }}
                >
                  Update
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => handleDelete(expo._id)}
                  sx={{
                    borderRadius: "10px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    py: 0.8,
                    "&:hover": { background: "rgba(247, 37, 133, 0.05)" },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ShowExpos;
