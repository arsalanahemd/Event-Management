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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setAlert({ success: false, message: "Please fill all fields." });
      return;
    }
    setLoading(true);

    if (email === "admin@gmail.com" && password === "admin") {
      const adminUser = {
        _id: "admin-001",
        name: "Default Admin",
        email,
        role: "admin",
      };
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      setAlert({
        success: true,
        message: `Admin login successful. Welcome ${adminUser.name}`,
      });
      setTimeout(() => {
        const encodedName = encodeURIComponent(adminUser.name);
        const encodedId = encodeURIComponent(adminUser._id);
        window.location.href = `http://localhost:3000/carpatin-dashboard-free?name=${encodedName}&id=${encodedId}`;
      }, 800);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      const { success, message, user } = res.data;
      if (!success || !user) {
        setAlert({ success: false, message: message || "Invalid credentials" });
        setLoading(false);
        return;
      }
      if (user.role === "admin") {
        localStorage.setItem("adminUser", JSON.stringify(user));
        localStorage.removeItem("user");
        setAlert({
          success: true,
          message: `Admin login successful. Welcome ${user.name}`,
        });
        setTimeout(() => {
          const encodedName = encodeURIComponent(user.name);
          const encodedId = encodeURIComponent(user._id);
          window.location.href = `http://localhost:3000/?name=${encodedName}&id=${encodedId}`;
        }, 800);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("adminUser");
        setAlert({
          success: true,
          message: `Login successful. Welcome ${user.name}`,
        });
        setTimeout(() => navigate("/"), 800);
      }
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F1FAFF",
      }}
    >
      {/* Top Header Section */}
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
            fontSize: { xs: "2.5rem", md: "4rem" },
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, maxWidth: 600, mx: "auto", opacity: 0.9 }}
        >
          Login to explore amazing events, exhibitors, and experiences.
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ py: 5 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={9} lg={9}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
                  p: { xs: 4, md: 10 },
                  background: "#fff",
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0 auto",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={900}
                  mb={5}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    background:
                      "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                  }}
                >
                  Login
                </Typography>

                {alert.message && (
                  <Box
                    sx={{
                      mb: 4,
                      p: 2.5,
                      borderRadius: 3,
                      backgroundColor: alert.success
                        ? "rgba(76,201,240,0.12)"
                        : "rgba(255,77,77,0.12)",
                      color: alert.success ? "#4895EF" : "#F44336",
                      fontWeight: 700,
                      textAlign: "center",
                      border: alert.success
                        ? "1px solid #4CC9F0"
                        : "1px solid #F44336",
                    }}
                  >
                    {alert.message}
                  </Box>
                )}

                <Stack spacing={4} component="form" onSubmit={handleSubmit}>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": { fontSize: "1.2rem", py: 2.5 },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ddd",
                          borderRadius: "15px",
                        },
                        "&:hover fieldset": { borderColor: "#4895EF" },
                      },
                    }}
                  />

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
                      "& .MuiInputBase-input": { fontSize: "1.2rem", py: 2.5 },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ddd",
                          borderRadius: "15px",
                        },
                        "&:hover fieldset": { borderColor: "#4895EF" },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 2.5,
                      fontSize: 20,
                      fontWeight: 800,
                      borderRadius: "18px",
                      background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                      boxShadow: "0 12px 30px rgba(76, 201, 240, 0.3)",
                      transition: "all 0.4s ease",
                      textTransform: "none",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 18px 45px rgba(76, 201, 240, 0.5)",
                        background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Login to Account"}
                  </Button>

                  <Typography textAlign="center" fontSize={18} color="#555">
                    Don’t have an account?{" "}
                    <Link
                      to="/signup"
                      style={{
                        color: "#4895EF",
                        fontWeight: "800",
                        textDecoration: "none",
                      }}
                    >
                      Sign Up Now
                    </Link>
                  </Typography>
                </Stack>
              </Card>
            </Grid>

            {/* Side Info Cards */}
            <Grid item xs={12} md={5} lg={5}>
              <Stack spacing={3}>
                {[
                  {
                    title: "Secure Access",
                    desc: "Your data is protected with high-level encryption and secure protocols.",
                    color: "#4CC9F0",
                  },
                  {
                    title: "Instant Updates",
                    desc: "Get real-time event alerts and stay ahead with instant notifications.",
                    color: "#4895EF",
                  },
                  {
                    title: "Global Network",
                    desc: "Connect with world-class experts and expand your professional reach.",
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
                      background: "#1B263B",
                      color: "#fff",
                      width: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02) translateX(10px)",
                        background: "#273746",
                        boxShadow: `0 20px 40px ${card.color}40`,
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

      {/* Bottom CTA Banner (Gap fixed here) */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          color: "white",
          py: 10,
          textAlign: "center",
          mt: 8,
          mb: 10, // ✅ Gap between Banner and Footer
          mx: { xs: 2, md: 6 },
          borderRadius: 8,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              mb: 2,
            }}
          >
            Stay Connected
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 4 }}
          >
            Join thousands of users and start your journey today.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Login;
