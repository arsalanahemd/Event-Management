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
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const validateForm = () => {
    const { name, email, password, role } = formData;

    if (name.trim().length < 3) {
      setAlert({
        success: false,
        message: "Name must be at least 3 characters long",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert({
        success: false,
        message: "Please enter a valid email address",
      });
      return false;
    }

    if (password.length < 6) {
      setAlert({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return false;
    }

    if (!role) {
      setAlert({ success: false, message: "Please select a role" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData);
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("storage"));
        setAlert({ success: true, message: "Signup Successful" });
        setFormData({ name: "", email: "", password: "", role: "" });
        setTimeout(() => navigate("/"), 800);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        // Fix: Full height background ensure karne ke liye flex use kiya
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#F1FAFF",
        overflowX: "hidden",
      }}
    >
      {/* Top Banner */}
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
          Join Us Today
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, maxWidth: 600, mx: "auto" }}
        >
          Create your account to explore amazing events, exhibitors, and
          experiences.
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="xl" sx={{ py: 5 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
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
                  Signup
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "#ddd" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "#ddd" },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": { borderColor: "#ddd" },
                      },
                    }}
                  />

                  <TextField
                    select
                    label="Join As"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": { borderColor: "#ddd" },
                      },
                    }}
                  >
                    <MenuItem value="attendee">Attendee (Visitor)</MenuItem>
                    <MenuItem value="exhibitor">Exhibitor (Organizer)</MenuItem>
                  </TextField>

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
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 15px 40px rgba(72, 149, 239, 0.6)",
                        background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Signup Now"}
                  </Button>

                  <Typography textAlign="center" fontSize={16} color="#666">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: "#4895EF",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Stack spacing={3}>
                {[
                  {
                    title: "Fast Event Booking",
                    desc: "Book and manage your events efficiently with our lightning-fast booking system.",
                    color: "#4CC9F0",
                  },
                  {
                    title: "Connect with Exhibitors",
                    desc: "Discover and network with top exhibitors globally to grow your professional reach.",
                    color: "#4895EF",
                  },
                  {
                    title: "24/7 Support",
                    desc: "Our dedicated team is always here to assist you with any queries or issues.",
                    color: "#F72585",
                  },
                ].map((card, index) => (
                  <Card
                    key={index}
                    sx={{
                      borderRadius: 4,
                      p: 4,
                      boxShadow: `0 15px 35px ${card.color}25`,
                      borderLeft: `10px solid ${card.color}`,
                      background: "linear-gradient(135deg, #1B263B, #273746)",
                      color: "#E0E1DD",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.03) translateX(10px)",
                        boxShadow: `0 20px 45px ${card.color}40`,
                        filter: "brightness(1.2)",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      sx={{
                        mb: 1.5,
                        color: card.color,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.85, lineHeight: 1.6 }}
                    >
                      {card.desc}
                    </Typography>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom CTA Banner (Footer) */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          color: "white",
          py: 10,
          textAlign: "center",
          mt: "auto",
          mx: { xs: 0, md: 6 },
          mb: { xs: 0, md: 6 },
          borderRadius: { xs: 0, md: 5 },
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              mb: 1,
            }}
          >
            Start Your Journey
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              mb: 4,
              letterSpacing: "1px",
            }}
          >
            Sign up now and access events, exhibitors, and experiences
            instantly.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Signup;
