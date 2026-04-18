import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";

// Theme Constants
const NEON_CYAN = "#4CC9F0";
const NEON_AMBER = "#FFD166";
const LIGHT_CYAN = "#A2EDFF";

function UsersMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/contact");
      const sortedMessages = res.data.contacts.sort(
        (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
      );
      setMessages(sortedMessages);
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages =
    filter === "all" ? messages : messages.filter((msg) => msg.userId?.role === filter);

  const toggleSeenStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "seen" ? "unseen" : "seen";
      await axios.patch(`http://localhost:3001/contact/${id}/status`, {
        status: newStatus,
      });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
      );
      setSuccessMsg(`Message marked as ${newStatus}`);
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: NEON_CYAN }} />
        <Typography mt={2} sx={{ color: "#94A3B8", fontFamily: "'Poppins', sans-serif" }}>
          Loading Inbox...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
        py: 6,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "3px",
            mb: 4,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #FFD166)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 4px 10px rgba(76, 201, 240, 0.2))",
          }}
        >
          Users Messages
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ButtonGroup
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(76, 201, 240, 0.3)",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            {["all", "attendee", "exhibitor"].map((role) => (
              <Button
                key={role}
                onClick={() => setFilter(role)}
                sx={{
                  px: 3,
                  py: 1.2,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  color: filter === role ? NEON_CYAN : "#94A3B8",
                  backgroundColor: filter === role ? "rgba(76, 201, 240, 0.15)" : "transparent",
                  border: "none !important",
                  "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.1)", color: "#fff" },
                }}
              >
                {role}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
            {successMsg}
          </Alert>
        )}

        {filteredMessages.length === 0 ? (
          <Box
            sx={{
              mt: 5,
              textAlign: "center",
              p: 8,
              borderRadius: "20px",
              background: "rgba(13, 27, 42, 0.5)",
              border: "2px dashed rgba(255, 209, 102, 0.2)",
              backdropFilter: "blur(5px)",
            }}
          >
            <Typography variant="h5" sx={{ color: NEON_AMBER, fontWeight: "bold", opacity: 0.7 }}>
              No Messages Found
            </Typography>
            <Typography sx={{ color: "rgba(148, 163, 184, 0.6)", mt: 1 }}>
              Looks like there's nothing in the {filter} folder yet.
            </Typography>
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "20px",
              background: "rgba(13, 27, 42, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
                  {["User Name", "Email", "Phone", "Subject", "Message", "Sent At", "Status"].map(
                    (heading) => (
                      <TableCell
                        key={heading}
                        align={heading === "Status" ? "center" : "left"}
                        sx={{
                          color: "#A2EDFF !important",
                          fontWeight: "900",
                          fontSize: "1.1rem",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
                          padding: "24px",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {heading}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredMessages.map((msg) => (
                  <TableRow
                    key={msg._id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.03)" },
                      transition: "all 0.3s",
                      "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                    }}
                  >
                    <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
                      {msg.fullName || msg.userId?.name || "—"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>
                      {msg.email || msg.userId?.email || "—"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>{msg.phone}</TableCell>
                    <TableCell sx={{ color: "#F1F5F9" }}>{msg.subject}</TableCell>
                    <TableCell
                      sx={{
                        color: "#94A3B8",
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {msg.message}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontSize: "0.8rem" }}>
                      {new Date(msg.sendAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => toggleSeenStatus(msg._id, msg.status)}
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "bold",
                          textTransform: "none",
                          px: 2,
                          borderColor:
                            msg.status === "seen" ? NEON_CYAN : "rgba(255, 209, 102, 0.4)",
                          color: msg.status === "seen" ? NEON_CYAN : NEON_AMBER,
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor:
                              msg.status === "seen"
                                ? "rgba(76, 201, 240, 0.1)"
                                : "rgba(255, 209, 102, 0.1)",
                            borderColor: msg.status === "seen" ? NEON_CYAN : NEON_AMBER,
                            transform: "scale(1.05)",
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        {msg.status === "seen" ? "Seen" : "Unseen"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default UsersMessages;
