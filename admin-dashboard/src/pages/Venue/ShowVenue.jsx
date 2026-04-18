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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

//  Theme Constants
const NEON_CYAN = "#4CC9F0";
const DARK_NAVY = "#0D1B2A";

function ShowVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Edit Modal States
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    venueName: "",
    venueLocation: "",
  });

  const fetchVenues = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/venue");
      setVenues(res.data.venues || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch venues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await axios.delete(`http://localhost:3001/venue/${id}`);
      setVenues((prev) => prev.filter((venue) => venue._id !== id));
      setSuccessMsg("Venue deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete venue");
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleEditOpen = (venue) => {
    setEditData(venue);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setEditData({ _id: "", venueName: "", venueLocation: "" });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const { _id, venueName, venueLocation } = editData;
    if (!venueName || !venueLocation) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3001/venue/${_id}`, {
        venueName,
        venueLocation,
      });

      if (res.data.success) {
        setSuccessMsg("Venue updated successfully!");
        setVenues((prev) => prev.map((item) => (item._id === _id ? res.data.venue : item)));
        handleEditClose();
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err) {
      setError("Error updating venue");
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
          Loading Venues...
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
          Manage Venues
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

        {venues.length === 0 ? (
          <Typography textAlign="center" sx={{ color: "#94A3B8", mt: 5 }}>
            No venues found.
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
            <Table>
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
                  {["Venue Name", "Venue Location", "Action"].map((heading) => (
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
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {venues.map((venue) => (
                  <TableRow
                    key={venue._id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                      transition: "all 0.3s",
                      "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                    }}
                  >
                    <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>
                      {venue.venueName}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>{venue.venueLocation}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditOpen(venue)}
                        sx={{
                          mr: 1,
                          borderRadius: "8px",
                          color: "#FFD700",
                          borderColor: "rgba(255, 215, 0, 0.4)",
                          fontWeight: "bold",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#FFD700",
                            backgroundColor: "rgba(255, 215, 0, 0.1)",
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDelete(venue._id)}
                        sx={{
                          borderRadius: "8px",
                          color: "#FF4D4D",
                          borderColor: "rgba(255, 77, 77, 0.4)",
                          fontWeight: "bold",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#FF4D4D",
                            backgroundColor: "rgba(255, 77, 77, 0.1)",
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

      {/*  Edit Modal */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        PaperProps={{
          sx: {
            background: "#0D1B2A",
            color: "#fff",
            borderRadius: "20px",
            border: "1px solid rgba(76, 201, 240, 0.3)",
            p: 2,
            width: "400px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#4CC9F0",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Edit Venue Information
        </DialogTitle>

        <DialogContent>
          {[
            { label: "Venue Name", name: "venueName" },
            { label: "Venue Location", name: "venueLocation" },
          ].map((field) => (
         <TextField
  key={field.name}
  margin="dense"
  label={field.label.toUpperCase()}
  name={field.name}
  fullWidth
  variant="outlined" 
  value={editData[field.name]}
  onChange={handleEditChange}
  InputLabelProps={{
    shrink: true, 
    sx: {
      color: "#4CC9F0",
      fontWeight: "900",
      letterSpacing: "1px",
      fontSize: "0.85rem",
      backgroundColor: "#0D1B2A",  
      px: 1,
      "&.Mui-focused": {
        color: "#4CC9F0",
      },
    },
  }}
  sx={{
    mb: 3,
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      borderRadius: "12px",
      backgroundColor: "rgba(255,255,255,0.03)",
      "& fieldset": {
        borderColor: "rgba(76, 201, 240, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "#4CC9F0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4CC9F0",
        borderWidth: "2px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "16px",
      fontWeight: "500",
    },
  }}
/>
          ))}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleEditClose}
            sx={{
              color: "#94A3B8",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { color: "#fff" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              fontWeight: "800",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              boxShadow: "0 8px 20px rgba(76, 201, 240, 0.3)",
              textTransform: "none",
              transition: "0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 25px rgba(76, 201, 240, 0.4)",
              },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ShowVenues;
