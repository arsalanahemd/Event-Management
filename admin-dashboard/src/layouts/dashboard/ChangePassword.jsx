import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, LockReset } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

//  Theme Constants
const NEON_CYAN = "#4CC9F0";

function ChangePass() {
  const [searchParams] = useSearchParams();
  const userIdFromURL = searchParams.get("id");

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShow = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = formData;

    if (!currentPassword || !password || !confirmPassword) {
      setAlert({ success: false, message: "Please fill all fields" });
      return;
    }
    if (password.length < 6) {
      setAlert({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ success: false, message: "Passwords do not match" });
      return;
    }

    const storedUser =
      JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("adminUser"));

    const userId = userIdFromURL || storedUser?._id || storedUser?.id;
    if (!userId) {
      setAlert({ success: false, message: "User ID not found!" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(`http://localhost:3001/updateUser/${userId}`, {
        currentPassword,
        newPassword: password,
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Password updated successfully!" });
        window.dispatchEvent(new Event("userUpdated"));
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      console.error("Update Error:", error);
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // AddAdmins Style TextField Logic
  const textFieldStyle = {
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
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
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
          textAlign: "center",
        }}
      >
        {/*  Dashboard Heading */}
        <Box sx={{ mb: 4 }}>
          <LockReset
            sx={{
              fontSize: 55,
              color: NEON_CYAN,
              filter: "drop-shadow(0 0 12px rgba(76, 201, 240, 0.4))",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "2px",
              mt: 1,
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 4px 8px rgba(76, 201, 240, 0.3))",
            }}
          >
            Change Password
          </Typography>
        </Box>

        {alert.message && (
          <Alert
            severity={alert.success ? "success" : "error"}
            sx={{ mb: 3, borderRadius: "12px", fontWeight: "bold" }}
          >
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="filled"
            label="Current Password"
            name="currentPassword"
            type={show.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleChange}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleShow("current")} sx={{ color: "#94A3B8" }}>
                    {show.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            label="New Password"
            name="password"
            type={show.new ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleShow("new")} sx={{ color: "#94A3B8" }}>
                    {show.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            label="Confirm New Password"
            name="confirmPassword"
            type={show.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleShow("confirm")} sx={{ color: "#94A3B8" }}>
                    {show.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 4,
              background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              fontWeight: "800",
              borderRadius: "12px",
              px: 4,
              py: 1.8,
              boxShadow: "0 8px 20px rgba(76, 201, 240, 0.3)",
              textTransform: "none",
              transition: "0.3s ease",
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 25px rgba(76, 201, 240, 0.4)",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Update Password"}
          </Button>
        </form>

        <Button
          fullWidth
          onClick={() => navigate(-1)}
          sx={{
            mt: 2.5,
            color: "#94A3B8",
            textTransform: "none",
            fontSize: "0.85rem",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#4CC9F0",
              bgcolor: "rgba(76, 201, 240, 0.08)",
              letterSpacing: "0.5px",
            },
          }}
        >
          Cancel and Return to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}

export default ChangePass;
