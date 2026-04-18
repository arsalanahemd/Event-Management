import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Theme Constants
const NEON_CYAN = "#4CC9F0";

function AddExpo() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    theme: "",
    startTime: "",
    endTime: "",
    speaker: "",
  });

  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueRes = await axios.get("http://localhost:3001/venue");
        if (venueRes.data.success) setVenues(venueRes.data.venues);

        const speakerRes = await axios.get("http://localhost:3001/speaker");
        if (speakerRes.data.success) setSpeakers(speakerRes.data.speakers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, date, venue, startTime } = formData;

    if (!title || !date || !venue || !startTime) {
      setAlert({ success: false, message: "Required fields: Title, Date, Venue, Start Time" });
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("image", image);

      const res = await axios.post("http://localhost:3001/expo/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Expo created successfully!" });
        setTimeout(() => navigate("/showExpo"), 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      setAlert({ success: false, message: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  // Reusable Input Style
  const inputStyle = {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      borderRadius: "12px",
      "&:before, &:after": { display: "none" },
      border: "1px solid rgba(76, 201, 240, 0.2)",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
      "&.Mui-focused": {
        border: `2px solid ${NEON_CYAN}`,
        boxShadow: `0 0 15px ${NEON_CYAN}44`,
      },
    },
    "& .MuiInputLabel-root": { color: "#94A3B8" },
    "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
    "& .MuiSelect-icon": { color: NEON_CYAN },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: { xs: 3, md: 5 },
          borderRadius: "30px",
          background: "rgba(13, 27, 42, 0.9)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontFamily: "'Poppins', sans-serif",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 4,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 4px 8px rgba(76, 201, 240, 0.3))",
          }}
        >
          Create New Expo
        </Typography>

        {alert.message && (
          <Alert
            severity={alert.success ? "success" : "error"}
            sx={{ mb: 3, borderRadius: "12px" }}
          >
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Expo Title"
                name="title"
                variant="filled"
                value={formData.title}
                onChange={handleChange}
                required
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                variant="filled"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
                required
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Theme"
                name="theme"
                variant="filled"
                value={formData.theme}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                type="time"
                variant="filled"
                value={formData.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                type="time"
                variant="filled"
                value={formData.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Venue"
                name="venue"
                variant="filled"
                value={formData.venue}
                onChange={handleChange}
                required
                sx={inputStyle}
              >
                {venues.map((v) => (
                  <MenuItem key={v._id} value={v._id}>
                    {v.venueName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Speaker"
                name="speaker"
                variant="filled"
                value={formData.speaker}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value="">-- None --</MenuItem>
                {speakers.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                name="description"
                variant="filled"
                value={formData.description}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: NEON_CYAN,
                    borderColor: NEON_CYAN,
                    borderRadius: "10px",
                    "&:hover": { borderColor: "#fff", color: "#fff" },
                  }}
                >
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
                <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                  {image ? image.name : "No file chosen"}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 2,
              fontSize: 18,
              fontWeight: 800,
              borderRadius: "18px",
              textTransform: "none",
              background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
              boxShadow: "0 12px 30px rgba(76, 201, 240, 0.3)",
              transition: "all 0.4s ease",
              mt: 4,
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 45px rgba(76, 201, 240, 0.5)",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#fff" }} />
                <Typography variant="body1" fontWeight={800}>
                  Launching...
                </Typography>
              </Box>
            ) : (
              "Launch Expo"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default AddExpo;
