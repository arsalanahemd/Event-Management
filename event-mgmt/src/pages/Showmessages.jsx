import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  IconButton,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ShowMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:3001/contact/user?userId=${userId}`
      );
      setMessages(res.data.contacts || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/contact/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#4CC9F0" }} />
        <Typography mt={2} color="white" variant="h6">
          Loading your messages...
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
        pb: 10,
      }}
    >
      {/* Hero Header Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #0D1B2A, #1B263B)",
          py: { xs: 10, md: 15 },
          textAlign: "center",
          color: "white",
          mb: 8,
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight={900}
            sx={{
              fontSize: { xs: "2.8rem", md: "4.5rem" },
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Message Inbox
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              opacity: 0.8,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
              color: "#E0E1DD",
            }}
          >
            Manage all your incoming communications and stay connected with your
            users through our streamlined dashboard.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {messages.length === 0 ? (
          <Box textAlign="center" sx={{ mt: 10 }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                variant: "h5",
                fontWeight: 300,
              }}
            >
              No messages found for this account.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {messages.map((msg) => (
              <Grid item xs={12} key={msg._id}>
                <Card
                  sx={{
                    borderRadius: 5,
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "white",
                    p: { xs: 1, md: 3 },
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      background: "rgba(255, 255, 255, 0.07)",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                      borderColor: "rgba(76, 201, 240, 0.5)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          fontWeight={800}
                          sx={{ color: "#4CC9F0", mb: 0.5 }}
                        >
                          {msg.fullName}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#4895EF",
                            fontWeight: 600,
                            letterSpacing: 0.5,
                          }}
                        >
                          Subject: {msg.subject}
                        </Typography>
                      </Box>

                      <IconButton
                        onClick={() => handleDelete(msg._id)}
                        sx={{
                          bgcolor: "rgba(255, 69, 58, 0.1)",
                          color: "#FF453A",
                          border: "1px solid rgba(255, 69, 58, 0.2)",
                          p: 1.5,
                          "&:hover": {
                            bgcolor: "rgba(255, 69, 58, 0.3)",
                            color: "#FF6961",
                            boxShadow: "0 0 20px rgba(255, 69, 58, 0.3)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.9)",
                        mb: 4,
                        fontWeight: 400,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        p: 4,
                        borderRadius: 4,
                        borderLeft: "4px solid #F72585",
                        fontStyle: "italic",
                      }}
                    >
                      "{msg.message}"
                    </Typography>

                    <Grid container spacing={2} sx={{ opacity: 0.8 }}>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{ color: "#4CC9F0" }}
                        >
                          📞 {msg.phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          📅 {new Date(msg.sendAt).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        sx={{ textAlign: { sm: "right" } }}
                      >
                        <Typography
                          variant="button"
                          sx={{
                            color: "#4CC9F0",
                            bgcolor: "rgba(76, 201, 240, 0.1)",
                            border: "1px solid rgba(76, 201, 240, 0.4)",
                            px: 3,
                            py: 0.8,
                            borderRadius: "50px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            letterSpacing: "1px",
                          }}
                        >
                          STATUS: {msg.status}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ShowMessages;
