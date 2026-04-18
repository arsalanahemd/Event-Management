import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function ChangePass() {
  const [searchParams] = useSearchParams();
  const userIdFromURL = searchParams.get("id");

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
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
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("adminUser"));

    const userId = userIdFromURL || storedUser?._id || storedUser?.id;
    if (!userId) {
      setAlert({ success: false, message: "User ID not found!" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:3001/updateUser/${userId}`,
        {
          currentPassword,
          newPassword: password,
        }
      );

      if (res.data.success) {
        setAlert({ success: true, message: "Password updated successfully!" });
        window.dispatchEvent(new Event("userUpdated"));
        setTimeout(() => navigate("/"), 500);
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

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F1FAFF", pb: 12 }}>
      {" "}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          py: { xs: 6, md: 10 },
          textAlign: "center",
          color: "white",
          mb: 6,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Change Your Password
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, maxWidth: 600, mx: "auto" }}
        >
          Keep your account secure by updating your password regularly.
        </Typography>
      </Box>
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Form */}
          <Grid item xs={12} md={8} lg={8}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                p: { xs: 4, md: 8 },
                background: "#fff",
                width: "100%",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h3"
                fontWeight={800}
                mb={4}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  background:
                    "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                }}
              >
                Update Password
              </Typography>

              {alert.message && (
                <Box
                  sx={{
                    mb: 4,
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: alert.success
                      ? "rgba(76,201,240,0.15)"
                      : "rgba(255,77,77,0.15)",
                    color: alert.success ? "#4CC9F0" : "#F44336",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {alert.message}
                </Box>
              )}

              <Stack spacing={3} component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type={show.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "& fieldset": { borderColor: "#ddd" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleShow("current")}
                          edge="end"
                        >
                          {show.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="New Password"
                  name="password"
                  type={show.new ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "& fieldset": { borderColor: "#ddd" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleShow("new")}
                          edge="end"
                        >
                          {show.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={show.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "& fieldset": { borderColor: "#ddd" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleShow("confirm")}
                          edge="end"
                        >
                          {show.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 2,
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: "15px",
                    background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                    boxShadow: "0 10px 30px rgba(72, 149, 239, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Confirm Update"}
                </Button>
              </Stack>
            </Card>
          </Grid>

          {/*Promo Cards */}
          <Grid item xs={12} md={4} lg={4}>
            <Stack spacing={3}>
              {[
                {
                  title: "Secure Your Account",
                  desc: "Protect your personal information by updating your password regularly.",
                  color: "#4CC9F0",
                },
                {
                  title: "Easy Management",
                  desc: "Experience a seamless process. Update your credentials quickly.",
                  color: "#4895EF",
                },
                {
                  title: "24/7 Support",
                  desc: "Our dedicated security team is available round the clock.",
                  color: "#F72585",
                },
              ].map((card, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 4,
                    p: 4,
                    borderLeft: `10px solid ${card.color}`,
                    background: "linear-gradient(135deg, #1B263B, #273746)",
                    color: "#E0E1DD",
                    transition: "all 0.4s ease",
                    "&:hover": { transform: "translateX(12px)" },
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{ mb: 1.5, color: card.color }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.85 }}>
                    {card.desc}
                  </Typography>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      {/* --- CTA BANNER*/}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          color: "white",
          py: 10,
          textAlign: "center",
          mt: 8,
          mb: 12,
          mx: { xs: 2, md: 6 },
          borderRadius: 5,
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              mb: 1,
            }}
          >
            Keep Your Account Safe
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
            Updating your password helps protect your account and personal data.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default ChangePass;
