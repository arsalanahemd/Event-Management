import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { LocationOn, Phone, Email, AccessTime } from "@mui/icons-material";

function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState({
    success: true,
    message: "",
  });

  // Fetch name & email from session 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setContact((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    } else {
      setIsLoggedIn(false);
      setAlert({
        success: false,
        message: "Please login to send a message.",
      });
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setAlert({ success: false, message: "Please login to send a message." });
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;

      if (!userId) {
        setAlert({
          success: false,
          message: "User info missing. Please login again.",
        });
        return;
      }

      const contactData = { ...contact, userId };
      const res = await axios.post(
        "http://localhost:3001/contact",
        contactData
      );

      if (res.data.success) {
        setAlert({ success: true, message: "Message sent successfully!" });
        setContact((prev) => ({
          ...prev,
          phone: "",
          subject: "",
          message: "",
        }));
        setTimeout(() => setAlert({ success: true, message: "" }), 3000);
      } else {
        setAlert({
          success: false,
          message: res.data.message || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Box sx={{ background: "#F1FAFF", minHeight: "100vh", pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          color: "white",
          mb: 8,
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={900}
          sx={{
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.8rem", md: "4.5rem" },
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, maxWidth: 700, mx: "auto", opacity: 0.9 }}
        >
          We'd love to hear from you — let's make your next event unforgettable!
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={5} justifyContent="center">
          {/* LEFT INFO */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                color: "#1B263B",
                mb: 3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Contact Info
            </Typography>

            <Stack spacing={3}>
              {[
                {
                  icon: <LocationOn sx={{ fontSize: 32 }} />,
                  title: "Our Office",
                  text: "Suite 101, EventSphere Building in Karachi, Pakistan",
                  color: "#4CC9F0",
                },
                {
                  icon: <Phone sx={{ fontSize: 32 }} />,
                  title: "Phone",
                  text: "+92 333 1234567",
                  color: "#F72585",
                },
                {
                  icon: <Email sx={{ fontSize: 32 }} />,
                  title: "Email",
                  text: "info@eventsphere.com",
                  color: "#4895EF",
                },
                {
                  icon: <AccessTime sx={{ fontSize: 32 }} />,
                  title: "Working Hours",
                  text: "Mon - Sat: 9:00 AM - 6:00 PM",
                  color: "#FFD166",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    background: "#1B263B",
                    color: "white",
                    borderLeft: `10px solid ${item.color}`,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={3}>
                    <Box sx={{ color: item.color }}>{item.icon}</Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ color: item.color }}
                      >
                        {item.title}
                      </Typography>
                      <Typography sx={{ opacity: 0.8 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* RIGHT FORM */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 5, p: { xs: 4, md: 8 } }}>
              <CardContent>
                <Typography
                  variant="h3"
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
                  Send a Message
                </Typography>

                {alert.message && (
                  <Alert
                    severity={alert.success ? "success" : "error"}
                    sx={{ mb: 4 }}
                  >
                    {alert.message}
                  </Alert>
                )}

                <Stack spacing={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        name="fullName"
                        value={contact.fullName}
                        onChange={handleChange}
                        fullWidth
                      InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        fullWidth
                      InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Subject"
                        name="subject"
                        value={contact.subject}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Your Detailed Message"
                    name="message"
                    value={contact.message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={6}
                  />

                  <Button
                    variant="contained"
                    disabled={!isLoggedIn}
                    onClick={handleSubmit}
                    sx={{
                      py: 2.5,
                      fontSize: 18,
                      fontWeight: 800,
                      borderRadius: "15px",
                      background:
                        "linear-gradient(90deg, #4895EF, #4CC9F0)",
                    }}
                  >
                    Send Message Now
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
