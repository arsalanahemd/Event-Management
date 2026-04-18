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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Theme Constants
const NEON_CYAN = "#4CC9F0";

function EditExpo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    theme: "",
    speaker: "",
    startTime: "",
    endTime: "",
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expoRes = await axios.get(`http://localhost:3001/expo/${id}`);
        if (expoRes.data.success) {
          const expo = expoRes.data.expo;
          setFormData({
            title: expo.title,
            date: expo.date.slice(0, 10),
            venue: expo.venue?._id || "",
            description: expo.description || "",
            theme: expo.theme || "",
            speaker: expo.speaker?._id || "",
            startTime: expo.startTime || "",
            endTime: expo.endTime || "",
          });
          setCurrentImage(expo.image || "");
        }

        const venueRes = await axios.get("http://localhost:3001/venue");
        if (venueRes.data.success) setVenues(venueRes.data.venues);

        const speakerRes = await axios.get("http://localhost:3001/speaker");
        if (speakerRes.data.success) setSpeakers(speakerRes.data.speakers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.venue) {
      setAlert({ success: false, message: "Title, date, and venue are required" });
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("image", image);

      const res = await axios.put(`http://localhost:3001/expo/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Expo updated successfully!" });
        setTimeout(() => navigate("/showExpo"), 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

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
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 4,
            background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Edit Expo Details
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
              <Box sx={{ mt: 1 }}>
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
                  {currentImage ? "Change Image" : "Upload Image"}
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
                <Typography
                  variant="caption"
                  sx={{ color: "#94A3B8", ml: 2, display: "block", mt: 1 }}
                >
                  {image
                    ? `New: ${image.name}`
                    : currentImage
                    ? `Current: ${currentImage}`
                    : "No file chosen"}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 4,
              background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              fontWeight: "800",
              borderRadius: "12px",
              px: 4,
              py: 1.8,
              boxShadow: "0 8px 20px rgba(76, 201, 240, 0.3)",
              textTransform: "none",
              transition: "0.3s ease",
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 25px rgba(76, 201, 240, 0.4)",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Update Expo"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EditExpo;
