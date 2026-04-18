import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleOutline, ArrowBack } from "@mui/icons-material";

function ParticipateExpo() {
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001";

  // Fallback data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedCompany = JSON.parse(localStorage.getItem("company"));

  const expoId = location.state?.expoId;
  const userId = location.state?.userId || storedUser?._id;
  const companyId = location.state?.companyId || storedCompany?._id;

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);

  // Error view if data is missing
  if (!expoId || !userId || !companyId) {
    return (
      <Box sx={{ 
        background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" 
      }}>
        <Paper sx={{ p: 4, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center", color: "white" }}>
          <Alert severity="error" variant="filled" sx={{ mb: 2 }}>
            Invalid access. Missing participation details.
          </Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            sx={{ mt: 2, background: "#FFD166", color: "#0D1B2A", fontWeight: 800 }}
            onClick={() => navigate("/events")}
          >
            Go Back to Events
          </Button>
        </Paper>
      </Box>
    );
  }

  const handleParticipate = async () => {
    setLoading(true);
    setAlert({ success: true, message: "" });

    try {
      const res = await axios.post(`${BASE_URL}/participation`, {
        exhibitorId: userId,
        companyId,
        expoId,
      });

      if (res.data.success) {
        navigate("/events", {
          state: { successMessage: "Participation confirmed successfully!" },
        });
      } else {
        setAlert({
          success: false,
          message: res.data.message || "Participation failed. Try again.",
        });
      }
    } catch (err) {
      setAlert({
        success: false,
        message: err.response?.data?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 2
    }}>
      <Snackbar 
        open={!!alert.message} 
        autoHideDuration={4000} 
        onClose={() => setAlert({ ...alert, message: "" })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert.success ? "success" : "error"} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="sm">
        <Paper sx={{ 
          p: { xs: 4, md: 6 }, 
          background: "rgba(255, 255, 255, 0.05)", 
          backdropFilter: "blur(15px)", 
          borderRadius: 6,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          textAlign: "center",
          color: "white"
        }}>
          <CheckCircleOutline sx={{ fontSize: 60, color: "#4CC9F0", mb: 2 }} />
          
          <Typography variant="h4" fontWeight={900} gutterBottom sx={{ 
            background: "linear-gradient(90deg, #4CC9F0, #4895EF)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent" 
          }}>
            Confirm Participation
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, fontSize: "1.1rem" }}>
            Do you want to confirm your company's participation in this expo? 
            This action will notify the organizers.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleParticipate}
              disabled={loading}
              sx={{ 
                background: "#4CC9F0", 
                color: "#0D1B2A", 
                fontWeight: 800, 
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": { background: "#4895EF", transform: "translateY(-2px)" },
                "&:disabled": { background: "rgba(76, 201, 240, 0.3)" }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm & Apply"}
            </Button>

            {/* UPDATED: Transparent Yellow Button */}
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ArrowBack />}
              onClick={() => navigate("/events")}
              sx={{ 
                color: "#FFD166", 
                borderColor: "rgba(255, 209, 102, 0.4)", 
                fontWeight: 600,
                py: 1.2,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": { 
                  borderColor: "#FFD166", 
                  background: "rgba(255, 209, 102, 0.1)", // Halka transparent yellow background
                  boxShadow: "0 0 10px rgba(255, 209, 102, 0.2)"
                }
              }}
            >
              Go Back to Events
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ParticipateExpo;