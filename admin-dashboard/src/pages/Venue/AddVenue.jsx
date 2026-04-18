import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Theme Constants
const NEON_CYAN = "#4CC9F0";

function AddVenue() {
  const [formData, setFormData] = useState({
    venueName: "",
    venueLocation: "",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { venueName, venueLocation } = formData;

    if (!venueName || !venueLocation) {
      setAlert({ success: false, message: "Please fill all fields" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/venue", formData);

      if (res.data.success) {
        setAlert({ success: true, message: "Venue added successfully!" });
        setFormData({ venueName: "", venueLocation: "" });

        setTimeout(() => {
          navigate("/showVenue");
        }, 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 5,
          borderRadius: "30px",
          background: "rgba(13, 27, 42, 0.9)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
        }}
      >
        {/* Dashboard  Heading*/}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 4,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 4px 8px rgba(76, 201, 240, 0.3))",
          }}
        >
          Add New Venue
        </Typography>

        {alert.message && (
          <Alert
            severity={alert.success ? "success" : "error"}
            sx={{ mb: 3, borderRadius: "12px", fontWeight: "bold" }}
          >
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: "Venue Name", name: "venueName", type: "text" },
            { label: "Venue Location", name: "venueLocation", type: "text" },
          ].map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              margin="normal"
              required
              variant="filled"
              sx={{
                mb: 2,
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  borderRadius: "12px",
                  "&:before, &:after": { display: "none" },
                  border: "1px solid rgba(76, 201, 240, 0.2)",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                  "&.Mui-focused": {
                    border: `2px solid ${NEON_CYAN}`,
                    boxShadow: `0 0 15px ${NEON_CYAN}44`,
                  },
                },
                "& .MuiInputLabel-root": { color: "#94A3B8" },
                "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
              }}
            />
          ))}

          {/* Action Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 2,
              fontSize: 18,
              fontWeight: 800,
              borderRadius: "18px",
              textTransform: "none",
              background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
              boxShadow: "0 12px 30px rgba(76, 201, 240, 0.3)",
              transition: "all 0.4s ease",
              mt: 3,
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 45px rgba(76, 201, 240, 0.5)",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#fff" }} />
                <Typography variant="body1" fontWeight={800}>
                  Registering...
                </Typography>
              </Box>
            ) : (
              "Register Venue"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default AddVenue;
