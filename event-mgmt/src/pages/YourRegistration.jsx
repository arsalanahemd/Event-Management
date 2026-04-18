import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Container,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

function YourRegistration() {
  const [loading, setLoading] = useState(true);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ success: true, message: "" });

  const detectUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      return storedUser._id || storedUser.id; 
    }
    setUser(null);
    return null;
  };

  const fetchUserRegistrations = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3001/register/user?userId=${userId}`
      );
      if (res.data.success) {
        setUserRegistrations(res.data.registrations || []);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setAlert({ success: false, message: "Failed to fetch registrations" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (regId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/register/${regId}`);
      setAlert({
        success: true,
        message: "Registration cancelled successfully!",
      });
      // Refresh the list
      if (user) fetchUserRegistrations(user._id || user.id);
    } catch (err) {
      setAlert({ success: false, message: "Failed to cancel registration" });
    }
  };

  useEffect(() => {
    const userId = detectUser();
    if (userId) {
      fetchUserRegistrations(userId);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        pb: 10,
        color: "white",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          py: 8,
          textAlign: "center",
          mb: 8,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={900}
          sx={{
            mb: 2,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            textTransform: "uppercase",
          }}
        >
          My Registrations
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>
          Track your booked events and participation status
        </Typography>
      </Box>

      <Container maxWidth="xl">
        {alert.message && (
          <Alert
            severity={alert.success ? "success" : "error"}
            sx={{
              mb: 4,
              borderRadius: "10px",
              fontWeight: 600,
              maxWidth: "800px",
              mx: "auto",
            }}
            onClose={() => setAlert({ ...alert, message: "" })}
          >
            {alert.message}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress color="info" />
          </Box>
        ) : !user ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h5">
              Please login as an attendee to view registrations.
            </Typography>
          </Box>
        ) : userRegistrations.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10, opacity: 0.5 }}>
            <Typography variant="h5">
              You have not registered for any expos yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {userRegistrations.map((reg) => {
              const expo = reg.expoId;
              if (!expo) return null;

              const statusColor =
                reg.status === "approved"
                  ? "#4CC9F0"
                  : reg.status === "pending"
                  ? "#FF9F1C"
                  : "#EF233C";

              return (
                <Grid
                  item
                  xs={12}
                  md={10}
                  key={reg._id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      maxWidth: "950px",
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      position: "relative",
                      overflow: "hidden",
                      transition: "0.4s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        border: `1px solid ${statusColor}`,
                      },
                    }}
                  >
                    <Chip
                      label={reg.status}
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        zIndex: 2,
                        backgroundColor: statusColor,
                        color: "#0D1B2A",
                        fontWeight: 800,
                      }}
                    />

                    <CardMedia
                      component="img"
                      height="320"
                      image={`http://localhost:3001/uploads/${expo.image}`}
                      alt={expo.title}
                      sx={{ objectFit: "cover" }}
                    />

                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h5"
                        fontWeight={800}
                        color="#4CC9F0"
                        gutterBottom
                      >
                        {expo.title}
                      </Typography>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ sm: 4, md: 6 }}
                        sx={{ mt: 2, opacity: 0.9 }}
                      >
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <CalendarMonthIcon
                            sx={{ fontSize: "1.2rem", color: "#F72585" }}
                          />
                          <Typography variant="body1">
                            {expo.date ? expo.date.split("T")[0] : "N/A"}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <AccessTimeIcon
                            sx={{ fontSize: "1.2rem", color: "#4895EF" }}
                          />
                          <Typography variant="body1">
                            {expo.startTime || "N/A"}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <LocationOnIcon
                            sx={{ fontSize: "1.2rem", color: "#FFD166" }}
                          />
                          <Typography variant="body1">
                            {expo.venue?.venueName || "TBA"}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider
                        sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}
                      />

                      <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
                        Speaker: <b>{expo.speaker?.name || "Expert Speaker"}</b>
                      </Typography>

                      {reg.status === "pending" && (
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<DeleteForeverIcon />}
                          onClick={() => handleCancel(reg._id)}
                          sx={{
                            background: "rgba(239, 35, 60, 0.12)",
                            color: "#ff5d73",
                            border: "1px solid rgba(239, 35, 60, 0.3)",
                            borderRadius: "12px",
                            fontWeight: 800,
                            py: 1.5,
                            "&:hover": {
                              background: "rgba(239, 35, 60, 0.4)",
                              color: "#fff",
                            },
                          }}
                        >
                          Cancel Registration
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default YourRegistration;
