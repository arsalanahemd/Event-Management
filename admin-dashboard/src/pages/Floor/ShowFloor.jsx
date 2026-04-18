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
const NEON_PINK = "#F72585";
const LIGHT_CYAN = "#A2EDFF";

function ShowFloors() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    floor: "",
    boothName: "",
    boothSize: "",
    status: "Available",
  });

  const fetchFloors = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/floors");
      setFloors(res.data.floors || []);
    } catch (err) {
      setError("Failed to fetch floors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFloors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this floor?")) return;
    try {
      await axios.delete(`http://localhost:3001/floors/${id}`);
      setFloors((prev) => prev.filter((floor) => floor._id !== id));
      setSuccessMsg("Floor deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete floor");
    }
  };

  const handleEditOpen = (floor) => {
    setEditData(floor);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const { _id, floor, boothName, boothSize, status } = editData;
    try {
      const res = await axios.put(`http://localhost:3001/floors/${_id}`, {
        floor,
        boothName,
        boothSize,
        status,
      });
      if (res.data.success) {
        setSuccessMsg("Floor updated successfully!");
        setFloors((prev) => prev.map((item) => (item._id === _id ? res.data.floor : item)));
        handleEditClose();
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err) {
      setError("Error updating floor");
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
        <Typography mt={2} sx={{ color: "#94A3B8" }}>
          Loading Floors Database...
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
          Floor Management
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
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
                {["Floor", "Booth Name", "Booth Size", "Status", "Actions"].map((heading) => (
                  <TableCell
                    key={heading}
                    align={heading === "Actions" ? "center" : "left"}
                    sx={{
                      color: `${LIGHT_CYAN} !important`,
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
              {floors.map((floor) => (
                <TableRow
                  key={floor._id}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                    transition: "all 0.3s",
                    "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                  }}
                >
                  <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>{floor.floor}</TableCell>
                  <TableCell sx={{ color: "#94A3B8" }}>{floor.boothName}</TableCell>
                  <TableCell sx={{ color: "#94A3B8" }}>{floor.boothSize}</TableCell>
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
                          floor.status === "Booked"
                            ? "rgba(247, 37, 133, 0.1)"
                            : "rgba(76, 201, 240, 0.1)",
                        color: floor.status === "Booked" ? NEON_PINK : NEON_CYAN,
                        border: `1px solid ${floor.status === "Booked" ? NEON_PINK : NEON_CYAN}44`,
                      }}
                    >
                      {floor.status.toUpperCase()}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditOpen(floor)}
                      sx={{
                        mr: 1,
                        borderRadius: "8px",
                        color: "#FFD700",
                        borderColor: "rgba(255, 215, 0, 0.4)",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",

                        "&:hover": {
                          borderColor: "#FFD700",
                          backgroundColor: "rgba(255, 215, 0, 0.15)",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDelete(floor._id)}
                      sx={{
                        borderRadius: "8px",
                        color: "#FF4D4D",
                        borderColor: "rgba(255, 77, 77, 0.4)",
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

      {/*  Edit */}
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
            color: NEON_CYAN,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Edit Floor Details
        </DialogTitle>

        <DialogContent>
          {["floor", "boothName", "boothSize"].map((field) => (
    <TextField
  key={field}
  margin="dense"
  label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
  name={field}
  fullWidth
  variant="outlined" 
  value={editData[field]}
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
        boxShadow: "0 0 10px rgba(76, 201, 240, 0.2)",
      },
    },
    "& .MuiInputBase-input": {
      padding: "16px",
      fontWeight: "500",
      fontFamily: "'Poppins', sans-serif",
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
              "&:hover": {
                background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                transform: "translateY(-2px)",
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

export default ShowFloors;
