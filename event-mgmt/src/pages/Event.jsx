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
  Container,
  Stack,
  Snackbar,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";

function ShowExpos() {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001";

  // Helper function
  const getShortDesc = (title, desc) => {
    const titles = {
      "COVID-19": "Register now to get your free COVID vaccine.",
      "Zyro Agency": "Expert digital marketing, branding, and growth services.",
      "Star Security Services":
        "Get advanced professional security and protection services.",
      "Moonlight Events":
        "Plan magical events and memorable festive celebrations.",
      PolySite: "Leading manufacturers of premium plastic bottles and jars.",
      Papyrus: "You can easily download greeting cards from Papyrus.",
    };
    return titles[title] || desc || "Experience innovation and excellence.";
  };

  const fetchExpos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/expo`);
      if (res.data.success) {
        const allExpos = res.data.expos || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentAndUpcoming = allExpos.filter((expo) => {
          const expoDate = new Date(expo.date);
          expoDate.setHours(0, 0, 0, 0);
          return expoDate >= today;
        });

        setExpos(currentAndUpcoming);
      } else {
        setAlert({ success: false, message: "No upcoming expos found." });
      }
    } catch (err) {
      setAlert({ success: false, message: "Failed to load expos." });
    } finally {
      setLoading(false);
    }
  };

  const detectUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = JSON.parse(localStorage.getItem("adminUser"));
    if (user) {
      setUserId(user._id || user.id);
      setUserType(user.role);
    } else if (admin) {
      setUserId(null);
      setUserType(admin.role);
    } else {
      setUserId(null);
      setUserType(null);
    }
  };

  const fetchUserRegistrations = async (uid) => {
    if (!uid) return;
    try {
      const res = await axios.get(`${BASE_URL}/register/user?userId=${uid}`);
      if (res.data.success) setUserRegistrations(res.data.registrations || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (expoId) => {
    if (!userType) {
      setAlert({ success: false, message: "Please Login first!" });
      return;
    }
    const role = userType.toLowerCase();
    if (role === "admin") {
      setAlert({
        success: false,
        message: "Admins cannot register. Please login as a User.",
      });
      return;
    }
    if (role === "attendee") {
      try {
        const res = await axios.post(`${BASE_URL}/register`, {
          userId,
          expoId,
          status: "pending",
        });
        if (res.data.success) {
          setAlert({ success: true, message: "Registered successfully!" });
          setUserRegistrations((prev) => [
            ...prev,
            { expoId: { _id: expoId }, status: "pending" },
          ]);
        } else {
          setAlert({
            success: false,
            message: res.data.message || "Registration failed.",
          });
        }
      } catch (err) {
        setAlert({
          success: false,
          message: "Something went wrong. Try again.",
        });
      }
    }
    if (role === "exhibitor") {
      try {
        const companyRes = await axios.get(
          `${BASE_URL}/company/by-exhibitor/${userId}`
        );
        if (!companyRes.data.success || !companyRes.data.company) {
          setAlert({
            success: false,
            message: "Please add your company profile first!",
          });
          return;
        }
        navigate(`/participateExpo/${expoId}`, {
          state: {
            expoId,
            userId,
            companyId: companyRes.data.company._id,
            fromShowExpos: true,
          },
        });
      } catch (err) {
        setAlert({ success: false, message: "API error." });
      }
    }
  };

  const getButtonProps = (expoId) => {
    if (userType?.toLowerCase() === "exhibitor") {
      return {
        label: "Participate",
        color: "linear-gradient(90deg, #4CC9F0, #4895EF)",
        disabled: false,
      };
    }
    const reg = userRegistrations.find((r) => r.expoId?._id === expoId);
    if (!reg)
      return {
        label: "Register Now",
        color: "linear-gradient(90deg, #4895EF, #4CC9F0)",
        disabled: false,
      };
    if (reg.status === "pending")
      return { label: "Pending", color: "orange", disabled: true };
    if (reg.status === "approved")
      return { label: "Confirmed ✓", color: "#4CC9F0", disabled: true };
    if (reg.status === "rejected")
      return { label: "Rejected", color: "#F72585", disabled: true };
    return {
      label: "Register",
      color: "linear-gradient(90deg, #4895EF, #4CC9F0)",
      disabled: false,
    };
  };

  useEffect(() => {
    fetchExpos();
    detectUser();
    window.addEventListener("storage", detectUser);
    return () => window.removeEventListener("storage", detectUser);
  }, []);

  useEffect(() => {
    if (userType?.toLowerCase() === "attendee" && userId)
      fetchUserRegistrations(userId);
  }, [userType, userId]);

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
        minHeight: "100vh",
        width: "100%",
        pb: 10,
      }}
    >
      <Snackbar
        open={!!alert.message}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.success ? "success" : "error"} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>

      {/* Hero Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1B263B 0%, #0D1B2A 100%)",
          py: { xs: 6, md: 8 },
          mb: 6,
          textAlign: "center",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="center">
            <ExploreIcon sx={{ fontSize: "3rem", color: "#4CC9F0" }} />
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{
                background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Upcoming Expos
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1rem",
                maxWidth: "600px",
              }}
            >
              Discover innovation and creativity in our upcoming events.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Container */}
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
        {loading ? (
          <Box textAlign="center" sx={{ py: 10 }}>
            <CircularProgress sx={{ color: "#4CC9F0" }} size={60} />
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              m: 0,
              justifyContent: "flex-start",
            }}
          >
            {expos.map((expo) => {
              const btn = getButtonProps(expo._id);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={expo._id}
                  sx={{ display: "flex", p: 1 }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        border: "1px solid #4CC9F0",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`${BASE_URL}/uploads/${expo.image}`}
                      alt={expo.title}
                      // Image height
                      sx={{ height: 300, objectFit: "cover", width: "100%" }}
                    />

                    <CardContent
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#4CC9F0",
                          mb: 0.5,
                          fontSize: "0.9rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {expo.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          mb: 1.5,
                          fontSize: "0.75rem",
                          height: "2.2rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {getShortDesc(expo.title, expo.description)}
                      </Typography>

                      <Box sx={{ mb: 1.5, mt: "auto" }}>
                        <Typography
                          sx={{ color: "rgba(255,255,255,0.8)", fontSize: 10 }}
                        >
                          📅 <b>Date:</b>{" "}
                          {expo.date ? expo.date.split("T")[0] : "N/A"}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: 10,
                            mt: 0.3,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          📍 <b>Venue:</b> {expo.venue?.venueName || "TBA"}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        disabled={btn.disabled}
                        onClick={() => handleAction(expo._id)}
                        sx={{
                          py: 1.5,
                          fontWeight: 800,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(90deg, #4895EF, #4CC9F0)",
                          color: "#0D1B2A",
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                          "&.Mui-disabled": {
                            background: "rgba(255, 255, 255, 0.12)",
                            color: "rgba(255, 255, 255, 0.3)",
                          },
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #4CC9F0, #4895EF)",
                            transform: "scale(1.02)",
                          },
                          transition: "0.3s",
                        }}
                      >
                        {btn.label}
                      </Button>
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

export default ShowExpos;
