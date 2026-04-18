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

// Theme Constants
const NEON_CYAN = "#4CC9F0";
const DARK_NAVY = "#0D1B2A";

function ShowSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    image: null,
    existingImage: "",
  });

  const fetchSpeakers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/speaker");
      setSpeakers(res.data.speakers || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch speakers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this speaker?")) return;
    try {
      await axios.delete(`http://localhost:3001/speaker/${id}`);
      setSpeakers((prev) => prev.filter((speaker) => speaker._id !== id));
      setSuccessMsg("Speaker deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete speaker");
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleEditOpen = (speaker) => {
    setEditData({
      _id: speaker._id,
      name: speaker.name,
      image: null,
      existingImage: speaker.image,
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setEditData({ _id: "", name: "", image: null, existingImage: "" });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setEditData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdate = async () => {
    const { _id, name, image } = editData;
    if (!name) {
      setError("Please provide a name.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", name);
      if (image) data.append("image", image);

      const res = await axios.put(`http://localhost:3001/speaker/${_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSuccessMsg("Speaker updated successfully!");
        setSpeakers((prev) => prev.map((item) => (item._id === _id ? res.data.speaker : item)));
        handleEditClose();
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err) {
      setError("Error updating speaker");
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
          Loading Speakers...
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
        {/*Heading */}
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
          Event Speakers
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
                {["Name", "Image", "Action"].map((heading) => (
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
              {speakers.map((speaker) => (
                <TableRow
                  key={speaker._id}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                    transition: "all 0.3s",
                    "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                  }}
                >
                  <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>{speaker.name}</TableCell>
                  <TableCell>
                    {speaker.image ? (
                      <img
                        src={`http://localhost:3001/uploads/${speaker.image}`}
                        alt={speaker.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditOpen(speaker)}
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
                    {/*Delete Button */}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDelete(speaker._id)}
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
      </Box>

      {/*   Edit Modal */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        PaperProps={{
          sx: {
            background: "#0D1B2A", // Same background as floor dialog
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
            color: NEON_CYAN,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Edit Speaker Details
        </DialogTitle>

        <DialogContent>
       <TextField
  margin="dense"
  label="SPEAKER NAME"
  name="name"
  fullWidth
  // Outlined variant use karein, ye neon theme par zyada suit karta hai
  variant="outlined" 
  value={editData.name}
  onChange={handleEditChange}
  // Label ko hamesha upar rakhne ke liye
  InputLabelProps={{
    shrink: true,
    sx: {
      color: NEON_CYAN,
      fontWeight: "900",
      letterSpacing: "1px",
      fontSize: "0.85rem",
      backgroundColor: "#0D1B2A", // Background color match karein taake border line chhup jaye
      px: 1, // Label ke side par thodi jagah
      "&.Mui-focused": {
        color: NEON_CYAN,
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
        borderColor: NEON_CYAN,
      },
      "&.Mui-focused fieldset": {
        borderColor: NEON_CYAN,
        borderWidth: "2px",
      },
    },
    // Input text ki padding sahi karne ke liye
    "& .MuiInputBase-input": {
      padding: "16px",
    },
  }}
/>

          {/* Image Upload Button */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              color: NEON_CYAN,
              borderColor: "rgba(76, 201, 240, 0.5)",
              borderRadius: "12px",
              fontWeight: "bold",
              textTransform: "none",
              borderWidth: "1px",
              "&:hover": {
                borderColor: NEON_CYAN,
                backgroundColor: "rgba(76, 201, 240, 0.05)",
                borderWidth: "1px",
              },
            }}
          >
            Upload New Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleEditClose}
            sx={{
              color: "#94A3B8",
              fontWeight: "bold",
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

export default ShowSpeaker;
