import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Avatar,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";
import SearchOffIcon from "@mui/icons-material/SearchOff";

// Theme Constants
const NEON_CYAN = "#4CC9F0";

function ShowExhiReg() {
  const [registrations, setRegistrations] = useState([]);
  const [floors, setFloors] = useState([]);
  const [expos, setExpos] = useState([]);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const [exposRes, floorsRes] = await Promise.all([
          axios.get("http://localhost:3001/expo"),
          axios.get("http://localhost:3001/floors"),
        ]);

        const exposData = exposRes.data.expos || [];
        setExpos(exposData);
        setFloors(floorsRes.data.floors || []);

        if (exposData.length > 0) {
          setSelectedExpo(exposData[0]._id);
          fetchRegistrations(exposData[0]._id);
        }
      } catch (err) {
        console.error("Error fetching expos/floors:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const fetchRegistrations = async (expoId) => {
    if (!expoId) return setRegistrations([]);
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/participation/by-expo/${expoId}`);
      setRegistrations(res.data.records || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const updateField = async (id, field, value) => {
    try {
      await axios.put(`http://localhost:3001/participation/${id}`, { [field]: value });
      setSuccessMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`);
      fetchRegistrations(selectedExpo);
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error("Error updating registration:", err);
    }
  };

  const assignedFloors = registrations.filter((r) => r.floor).map((r) => r.floor._id);

  if (loading && expos.length === 0) {
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
          Loading Exhibitor Data...
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
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
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
          Exhibitor Registrations
        </Typography>

        {/* Expo Selection Buttons */}
        <Stack direction="row" spacing={1} mb={4} justifyContent="center" flexWrap="wrap">
          {expos.map((expo) => (
            <Button
              key={expo._id}
              onClick={() => {
                setSelectedExpo(expo._id);
                fetchRegistrations(expo._id);
              }}
              sx={{
                borderRadius: "10px",
                px: 3,
                mb: 1,
                fontWeight: "bold",
                color: selectedExpo === expo._id ? "#fff" : "#94A3B8",
                background:
                  selectedExpo === expo._id
                    ? "linear-gradient(45deg, #4895EF, #4CC9F0)"
                    : "rgba(255,255,255,0.05)",
                border: selectedExpo === expo._id ? "none" : "1px solid rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(76, 201, 240, 0.15)" },
              }}
            >
              {expo.title}
            </Button>
          ))}
        </Stack>

        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
            {successMsg}
          </Alert>
        )}

        {registrations.length === 0 && !loading ? (
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              p: 5,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px dashed rgba(76, 201, 240, 0.3)",
            }}
          >
            <SearchOffIcon sx={{ fontSize: 80, color: "rgba(76, 201, 240, 0.2)", mb: 2 }} />
            <Typography variant="h5" sx={{ color: "#94A3B8", fontWeight: 600 }}>
              No Registrations Found
            </Typography>
            <Typography sx={{ color: "rgba(148, 163, 184, 0.6)" }}>
              There are no exhibitors registered for the selected expo yet.
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
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
                  {[
                    "Image",
                    "Exhibitor",
                    "Company",
                    "Products",
                    "Email",
                    "Contact",
                    "Floor",
                    "Status",
                  ].map((heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        color: "#A2EDFF !important",
                        fontWeight: "900",
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        borderBottom: "3px solid rgba(76, 201, 240, 0.3)",
                        padding: "20px",
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {registrations.map((reg) => (
                  <TableRow
                    key={reg._id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
                      transition: "all 0.3s",
                      "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                    }}
                  >
                    <TableCell>
                      <Avatar
                        src={
                          reg.companyId?.image
                            ? `http://localhost:3001/uploads/${reg.companyId.image}`
                            : ""
                        }
                        sx={{ width: 45, height: 45, border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        {!reg.companyId?.image && reg.companyId?.companyName?.charAt(0)}
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
                      {reg.exhibitorId?.name || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>
                      {reg.companyId?.companyName || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                      {reg.companyId?.productsOrServices || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>
                      {reg.companyId?.companyEmail || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#94A3B8" }}>
                      {reg.companyId?.contactNumber || "N/A"}
                    </TableCell>

                    <TableCell>
                      <Select
                        value={reg.floor?._id || ""}
                        size="small"
                        onChange={(e) => updateField(reg._id, "floor", e.target.value)}
                        sx={{
                          color: "#fff",
                          width: "140px",
                          bgcolor: "rgba(255,255,255,0.05)",
                          borderRadius: "8px",
                          fontSize: "0.8rem",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(76, 201, 240, 0.2)",
                          },
                          "& .MuiSvgIcon-root": { color: NEON_CYAN },
                        }}
                      >
                        <MenuItem value="">Not Assigned</MenuItem>
                        {floors.map(
                          (floor) =>
                            (!assignedFloors.includes(floor._id) ||
                              reg.floor?._id === floor._id) && (
                              <MenuItem key={floor._id} value={floor._id}>
                                {floor.floor} - {floor.boothName}
                              </MenuItem>
                            )
                        )}
                      </Select>
                    </TableCell>

                    <TableCell>
                     <Select
  value={reg.status || "Pending"}
  size="small"
  onChange={(e) => updateField(reg._id, "status", e.target.value)}
  // Dropdown list (Menu) ki styling ke liye
  MenuProps={{
    PaperProps: {
      sx: {
        bgcolor: "#0D1B2A", // Dark Navy background
        border: "1px solid rgba(76, 201, 240, 0.3)",
        borderRadius: "12px",
        mt: 1,
        "& .MuiMenuItem-root": {
          fontSize: "0.85rem",
          fontWeight: "600",
          color: "#94A3B8",
          transition: "0.2s",
          "&:hover": {
            bgcolor: "rgba(76, 201, 240, 0.1)",
            color: NEON_CYAN,
          },
          "&.Mui-selected": {
            bgcolor: "rgba(76, 201, 240, 0.2)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(76, 201, 240, 0.3)" },
          },
        },
      },
    },
  }}
  sx={{
    width: "135px",
    borderRadius: "10px",
    fontSize: "0.8rem",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: 
      reg.status === "Approved" ? "#00F5A0" : 
      reg.status === "Rejected" ? "#FF4D4D" : "#FFD700", // Pending ke liye Gold/Yellow
    bgcolor: "rgba(255,255,255,0.03)",
    transition: "0.3s",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(76, 201, 240, 0.5)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: NEON_CYAN,
      borderWidth: "2px",
    },
    "& .MuiSvgIcon-root": { 
      color: NEON_CYAN,
      fontSize: "1.2rem" 
    },
  }}
>
  <MenuItem value="Pending" sx={{ color: "#FFD700 !important" }}>Pending</MenuItem>
  <MenuItem value="Approved" sx={{ color: "#00F5A0 !important" }}>Approved</MenuItem>
  <MenuItem value="Rejected" sx={{ color: "#FF4D4D !important" }}>Rejected</MenuItem>
</Select>
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

export default ShowExhiReg;
