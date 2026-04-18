import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  Avatar,
  Stack,
  Alert,
  Button,
  Container,
  Chip,
  Divider,
} from "@mui/material";
import axios from "axios";
import {
  Business,
  EventAvailable,
  LocationOn,
  AccessTime,
  CancelScheduleSend,
} from "@mui/icons-material";

function YourParticipation() {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({ success: true, message: "" });

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;

    if (!userId) {
      setAlertData({
        success: false,
        message: "Please log in to view your participations.",
      });
      setLoading(false);
      return;
    }

    fetchParticipations(userId);
  }, []);

  const fetchParticipations = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/participation/by-exhibitor/${userId}`
      );

      if (res.data.success && res.data.records.length > 0) {
        setParticipations(res.data.records);
      } else {
        setAlertData({
          success: false,
          message: "You have not registered for any expos.",
        });
      }
    } catch (err) {
      console.error("Error fetching participations:", err);
      setAlertData({
        success: false,
        message: "Failed to fetch participations.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (participationId) => {
    if (!window.confirm("Are you sure you want to cancel this participation?"))
      return;

    try {
      const res = await axios.delete(
        `${BASE_URL}/participation/${participationId}`
      );
      if (res.data.success) {
        setParticipations((prev) =>
          prev.filter((p) => p._id !== participationId)
        );
        setAlertData({
          success: true,
          message: "Participation cancelled successfully!",
        });
      }
    } catch (err) {
      console.error("Cancel failed:", err);
      setAlertData({
        success: false,
        message: "Failed to cancel participation.",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Time TBA";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          color: "#4CC9F0",
          bg: "rgba(76, 201, 240, 0.1)",
          shadow: "0 0 15px rgba(76, 201, 240, 0.3)",
        };
      case "pending":
        return {
          color: "#FFD166",
          bg: "rgba(255, 209, 102, 0.1)",
          shadow: "0 0 15px rgba(255, 209, 102, 0.3)",
        };
      case "rejected":
      default:
        return {
          color: "#ff4d4d",
          bg: "rgba(255, 77, 77, 0.1)",
          shadow: "0 0 15px rgba(255, 77, 77, 0.3)",
        };
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          background: "#0D1B2A",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#4CC9F0" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
        minHeight: "100vh",
        pb: 10,
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          py: 6,
          textAlign: "center",
          color: "white",
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            background: "linear-gradient(90deg, #4CC9F0, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Participations
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.7, mt: 1 }}>
          Manage your expo registrations and bookings
        </Typography>
      </Box>

      <Container maxWidth="lg">
        {alertData.message && (
          <Alert
            severity={alertData.success ? "success" : "info"}
            variant="filled"
            sx={{ mb: 4, borderRadius: 2 }}
          >
            {alertData.message}
          </Alert>
        )}

        <Grid container spacing={4}>
          {participations.map((p) => {
            const company = p.companyId || {};
            const expo =
              p.expoId && typeof p.expoId === "object"
                ? p.expoId
                : { title: "Loading Details..." };
            const floor = p.floor || {};
            const statusStyle = getStatusStyle(p.status);

            return (
              <Grid item xs={12} md={6} key={p._id}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "24px",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    color: "white",
                    position: "relative",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      borderColor: statusStyle.color,
                      boxShadow: statusStyle.shadow,
                      background: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Stack
                      direction="row"
                      spacing={3}
                      alignItems="center"
                      mb={3}
                    >
                      <Avatar
                        src={
                          company.image
                            ? `${BASE_URL}/uploads/${company.image}`
                            : ""
                        }
                        sx={{
                          width: 80,
                          height: 80,
                          border: `3px solid ${statusStyle.color}`,
                          bgcolor: "#1B263B",
                          boxShadow: `0 0 10px ${statusStyle.color}`,
                          transition: "0.3s ease",
                          "&:hover": { transform: "rotate(5deg)" },
                        }}
                      >
                        {!company.image && <Business sx={{ fontSize: 40 }} />}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{ letterSpacing: 0.5 }}
                        >
                          {company.companyName || "N/A"}
                        </Typography>
                        <Chip
                          label={p.status?.toUpperCase()}
                          size="small"
                          sx={{
                            mt: 1,
                            fontWeight: 900,
                            color: statusStyle.color,
                            bgcolor: statusStyle.bg,
                            border: `1px solid ${statusStyle.color}`,
                            fontSize: "0.65rem",
                            letterSpacing: 1,
                            px: 1,
                          }}
                        />
                      </Box>
                    </Stack>

                    <Divider
                      sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2 }}
                    />

                    <Stack spacing={2}>
                      <Typography
                        variant="subtitle1"
                        color="#4CC9F0"
                        fontWeight={800}
                        display="flex"
                        alignItems="center"
                      >
                        <EventAvailable sx={{ mr: 1.5, fontSize: 22 }} />
                        {expo.title}
                      </Typography>

                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            opacity: 0.8,
                            mb: 1,
                          }}
                        >
                          <LocationOn
                            sx={{ mr: 1.5, fontSize: 18, color: "#FFD166" }}
                          />
                          {expo.venue?.venueName || "TBA"}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            opacity: 0.8,
                          }}
                        >
                          <AccessTime
                            sx={{ mr: 1.5, fontSize: 18, color: "#4CC9F0" }}
                          />
                          {formatDate(expo.date)} | {formatTime(expo.startTime)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          mt: 1,
                          p: 2,
                          borderRadius: "15px",
                          bgcolor: "rgba(0,0,0,0.2)",
                          border: "1px dashed rgba(255,255,255,0.15)",
                          transition: "0.3s",
                          "&:hover": { bgcolor: "rgba(0,0,0,0.3)" },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#FFD166",
                            display: "block",
                            mb: 0.5,
                            fontWeight: 700,
                            letterSpacing: 1,
                          }}
                        >
                          BOOTH ALLOCATION
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: "white" }}
                        >
                          {floor.floor
                            ? `Floor: ${floor.floor} - Booth: ${floor.boothName}`
                            : "Allocation in progress..."}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box mt={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CancelScheduleSend />}
                        onClick={() => handleCancel(p._id)}
                        sx={{
                          color: "#ff4d4d",
                          borderColor: "rgba(255, 77, 77, 0.3)",
                          fontWeight: 800,
                          textTransform: "none",
                          borderRadius: "12px",
                          py: 1.2,
                          transition: "0.3s",
                          "&:hover": {
                            borderColor: "#ff4d4d",
                            bgcolor: "rgba(255, 77, 77, 0.1)",
                            boxShadow: "0 4px 15px rgba(255, 77, 77, 0.2)",
                          },
                        }}
                      >
                        Cancel Participation
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default YourParticipation;
