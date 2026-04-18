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
} from "@mui/material";
import axios from "axios";

// Theme Constants
const NEON_CYAN = "#4CC9F0";
const NEON_AMBER = "#FFD166";

function UsersRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/api/ratings");
      const sortedRatings = res.data.ratings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRatings(sortedRatings);
    } catch (err) {
      setError("Failed to fetch ratings");
    } finally {
      setLoading(false);
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
          Loading Ratings...
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
          Users Ratings
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}

        {ratings.length === 0 ? (
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
              No Ratings Found
            </Typography>
            <Typography sx={{ color: "rgba(148, 163, 184, 0.6)", mt: 1 }}>
              Looks like there are no ratings submitted yet.
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
                  {["User Name", "Email", "Rating", "Message", "Submitted At"].map((heading) => (
                    <TableCell
                      key={heading}
                      align={heading === "Rating" ? "center" : "left"}
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
                {ratings.map((rating) => (
                  <TableRow
                    key={rating._id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.03)" },
                      transition: "all 0.3s",
                      "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                    }}
                  >
                    <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
                      {rating.fullName || rating.userId?.name || "—"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>
                      {rating.email || rating.userId?.email || "—"}
                    </TableCell>
                    <TableCell sx={{ color: NEON_AMBER, fontWeight: "bold", textAlign: "center" }}>
                      {"⭐".repeat(rating.rating)}{" "}
                      {rating.rating < 5 ? "☆".repeat(5 - rating.rating) : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#94A3B8",
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {rating.message}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontSize: "0.8rem" }}>
                      {new Date(rating.createdAt).toLocaleString()}
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

export default UsersRatings;
