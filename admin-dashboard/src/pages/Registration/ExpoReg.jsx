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
  MenuItem,
  Select,
  Button,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";

// ✅ Theme Constants
const NEON_CYAN = "#4CC9F0";

function ShowRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/register");
      if (res.data.success) {
        setRegistrations(res.data.registrations);
      } else {
        setError("Failed to fetch registrations");
      }
    } catch (err) {
      setError("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (regId, status) => {
    try {
      await axios.put(`http://localhost:3001/register/${regId}`, { status });
      setSuccessMsg(`Status updated to ${status}`);
      setRegistrations((prev) => prev.map((reg) => (reg._id === regId ? { ...reg, status } : reg)));
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to update status");
      setTimeout(() => setError(""), 2000);
    }
  };

  const filteredRegistrations =
    filter === "all" ? registrations : registrations.filter((reg) => reg.status === filter);

  const getStatusStyle = (status) => {
    const colors = {
      pending: { bg: "rgba(255, 183, 3, 0.1)", text: "#FFB703", border: "rgba(255, 183, 3, 0.4)" },
      approved: { bg: "rgba(0, 245, 160, 0.1)", text: "#00F5A0", border: "rgba(0, 245, 160, 0.4)" },
      rejected: {
        bg: "rgba(255, 77, 77, 0.15)",
        text: "#FF4D4D",
        border: "rgba(255, 77, 77, 0.4)",
      },
    };
    return colors[status] || colors.pending;
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
        <Typography mt={2} sx={{ color: "#94A3B8" }}>
          Fetching Registrations...
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
      <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
        {/* Dashboar Heading */}
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "3px",
            mb: 4,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 4px 10px rgba(76, 201, 240, 0.2))",
          }}
        >
          User Registrations
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ButtonGroup
            variant="outlined"
            sx={{
              border: "1px solid rgba(255,255,255,0.1)",
              p: 0.5,
              borderRadius: "18px",
              bgcolor: "rgba(255,255,255,0.03)",
            }}
          >
            {["all", "pending", "approved", "rejected"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                sx={{
                  border: "none !important",
                  borderRadius: "14px !important",
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: filter === status ? "#fff" : "#94A3B8",
                  background:
                    filter === status ? "linear-gradient(90deg, #4895EF, #4CC9F0)" : "transparent",
                  boxShadow: filter === status ? "0 4px 15px rgba(76, 201, 240, 0.3)" : "none",
                  transition: "0.4s",
                  "&:hover": {
                    bgcolor: filter === status ? "" : "rgba(76, 201, 240, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  textTransform: "capitalize",
                }}
              >
                {status}
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

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            background: "rgba(13, 27, 42, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
                {["Expo Image", "Attendee", "Expo Title", "Date", "Status", "Manage Status"].map(
                  (heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        color: "#A2EDFF !important",
                        fontWeight: "900",
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        borderBottom: "3px solid rgba(76, 201, 240, 0.3)",
                        padding: "20px",
                      }}
                    >
                      {heading}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => {
                  const statusStyle = getStatusStyle(reg.status);
                  return (
                    <TableRow
                      key={reg._id}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                        transition: "all 0.3s",
                        "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                      }}
                    >
                      <TableCell>
                        {reg.expoId?.image ? (
                          <Box
                            component="img"
                            src={`http://localhost:3001/uploads/${reg.expoId.image}`}
                            alt="expo"
                            sx={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: "10px",
                              border: `1px solid rgba(255,255,255,0.1)`,
                            }}
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
                        {reg.userId?.name || "Unknown"}
                      </TableCell>
                      <TableCell sx={{ color: "#94A3B8" }}>{reg.expoId?.title || "N/A"}</TableCell>
                      <TableCell sx={{ color: "#94A3B8" }}>
                        {reg.expoId?.date ? new Date(reg.expoId.date).toLocaleDateString() : "—"}
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            border: `1px solid ${statusStyle.border}`,
                            textTransform: "uppercase",
                          }}
                        >
                          {reg.status}
                        </Box>
                      </TableCell>

                      <TableCell>
                       <Select
  value={reg.status}
  size="small"
  onChange={(e) => handleStatusChange(reg._id, e.target.value)}
  MenuProps={{
    PaperProps: {
      sx: {
        bgcolor: "#0D1B2A", 
        border: "1px solid rgba(76, 201, 240, 0.3)",
        borderRadius: "10px",
        "& .MuiMenuItem-root": {
          color: "#fff",
          fontSize: "0.85rem",
          "&:hover": { bgcolor: "rgba(76, 201, 240, 0.1)" },
          "&.Mui-selected": { bgcolor: "rgba(76, 201, 240, 0.2)" },
        },
      },
    },
  }}
  sx={{
    height: "35px",
    width: "130px", 
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: 
      reg.status === "approved" ? "#00F5A0" : 
      reg.status === "rejected" ? "#FF4D4D" : "#FFD700",
    bgcolor: "rgba(255,255,255,0.05)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(76, 201, 240, 0.3)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": { 
      borderColor: "#4CC9F0" 
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CC9F0",
    },
    "& .MuiSvgIcon-root": { color: "#4CC9F0" },
  }}
>
  <MenuItem value="pending" sx={{ color: "#FFD700 !important" }}>Pending</MenuItem>
  <MenuItem value="approved" sx={{ color: "#00F5A0 !important" }}>Approved</MenuItem>
  <MenuItem value="rejected" sx={{ color: "#FF4D4D !important" }}>Rejected</MenuItem>
</Select>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 12 }}>
                    <Typography
                      variant="h5"
                      sx={{ color: "#94A3B8", fontWeight: 800, mb: 1, letterSpacing: "1px" }}
                    >
                      🚫 No Registrations Found
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(148, 163, 184, 0.5)" }}>
                      There are no attendees matching this status at the moment.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ShowRegistrations;
