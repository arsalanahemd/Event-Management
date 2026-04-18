import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

// Theme Constants
const NEON_CYAN = "#4CC9F0";
const DARK_NAVY = "#0D1B2A";

function ShowAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/signup");
      const adminUsers = res.data.filter((user) => user.role === "admin");
      setAdmins(adminUsers);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setSuccessMsg("Admin deleted successfully!");
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete admin");
      setTimeout(() => setError(""), 2000);
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
        <Typography mt={2} variant="subtitle1" sx={{ color: "#94A3B8" }}>
          Loading Admins...
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
      <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
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
          Manage Administrators
        </Typography>

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

        {admins.length === 0 ? (
          <Typography textAlign="center" sx={{ color: "#94A3B8", mt: 5 }}>
            No admins found in the system.
          </Typography>
        ) : (
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
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
                  {["Name", "Email", "Role", "Action"].map((heading) => (
                    <TableCell
                      key={heading}
                      align={heading === "Action" ? "center" : "left"}
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
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {admins.map((admin) => (
                  <TableRow
                    key={admin._id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                      transition: "all 0.3s",
                      "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                    }}
                  >
                    <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>{admin.name}</TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>{admin.email}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          backgroundColor: "rgba(76, 201, 240, 0.1)",
                          color: NEON_CYAN,
                          border: `1px solid ${NEON_CYAN}44`,
                        }}
                      >
                        {admin.role.toUpperCase()}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDelete(admin._id)}
                        sx={{
                          borderRadius: "8px",
                          color: "#FF4D4D",
                          borderColor: "rgba(255, 77, 77, 0.4)",
                          backgroundColor: "transparent",
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.85rem",
                          padding: "4px 12px",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 77, 77, 0.15)",
                            borderColor: "#FF4D4D",
                            color: "#FF4D4D",
                            transform: "translateY(-1px)",
                            boxShadow: "0px 4px 12px rgba(255, 77, 77, 0.2)",
                          },
                          "&:active": {
                            transform: "translateY(0px)",
                            backgroundColor: "rgba(255, 77, 77, 0.25)",
                          },
                        }}
                      >
                        Delete
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

export default ShowAdmins;
