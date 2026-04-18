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

//  Theme Constants
const NEON_CYAN = "#4CC9F0";
const NEON_PINK = "#F72585";
const LIGHT_CYAN = "#A2EDFF";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/signup");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setSuccessMsg("User deleted successfully!");
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const filteredUsers = filter === "all" ? users : users.filter((user) => user.role === filter);

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
          Loading Users Database...
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
          User Management
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ButtonGroup
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(76, 201, 240, 0.3)",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            {["all", "attendee", "exhibitor"].map((role) => (
              <Button
                key={role}
                onClick={() => setFilter(role)}
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "1px",
                  backgroundColor: filter === role ? "rgba(76, 201, 240, 0.2)" : "transparent",
                  color: filter === role ? NEON_CYAN : "#94A3B8",
                  border: "none !important",
                  "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.1)", color: "#fff" },
                  transition: "all 0.3s",
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
              {filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                    transition: "all 0.3s",
                    "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                  }}
                >
                  <TableCell sx={{ color: "#F1F5F9", fontWeight: 500, paddingY: 2 }}>
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ color: "#94A3B8" }}>{user.email}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        backgroundColor:
                          user.role === "exhibitor"
                            ? "rgba(247, 37, 133, 0.1)"
                            : "rgba(76, 201, 240, 0.1)",
                        color: user.role === "exhibitor" ? NEON_PINK : NEON_CYAN,
                        border: `1px solid ${user.role === "exhibitor" ? NEON_PINK : NEON_CYAN}44`,
                      }}
                    >
                      {user.role.toUpperCase()}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        borderRadius: "8px",
                        color: "#FF4D4D",
                        borderColor: "rgba(255, 77, 77, 0.4)",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "rgba(255, 77, 77, 0.15)",
                          borderColor: "#FF4D4D",
                          transform: "translateY(-2px)",
                          boxShadow: "0px 4px 12px rgba(255, 77, 77, 0.2)",
                        },
                        transition: "all 0.2s",
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
      </Box>
    </Box>
  );
}

export default ShowUsers;
