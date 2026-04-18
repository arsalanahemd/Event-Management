import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  Stack,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Business, AddPhotoAlternate } from "@mui/icons-material";

function AddCompany() {
  const [formData, setFormData] = useState({
    companyName: "",
    productsOrServices: "",
    companyEmail: "",
    contactNumber: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const exhibitor = JSON.parse(localStorage.getItem("user"));
      if (!exhibitor || !exhibitor._id) {
        setError("Please login as an exhibitor first!");
        return;
      }

      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) formPayload.append(key, formData[key]);
      });
      formPayload.append("exhibitorId", exhibitor._id);

      const res = await axios.post("http://localhost:3001/company", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage("✅ Company added successfully!");
        setFormData({
          companyName: "",
          productsOrServices: "",
          companyEmail: "",
          contactNumber: "",
          description: "",
          image: null,
        });
        setTimeout(() => {
          navigate("/showCompany");
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  // Common TextField Styling
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
      "&:hover fieldset": { borderColor: "#4CC9F0" },
      "&.Mui-focused fieldset": { borderColor: "#4CC9F0" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#4CC9F0" },
    mb: 2,
  };

  return (
    <Box sx={{ 
      background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      py: 8
    }}>
      <Container maxWidth="sm">
        <Paper sx={{ 
          p: { xs: 3, md: 5 }, 
          background: "rgba(255, 255, 255, 0.05)", 
          backdropFilter: "blur(15px)", 
          borderRadius: 6,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          color: "white"
        }}>
          
          <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: "50%", 
              background: "rgba(76, 201, 240, 0.1)", 
              border: "1px solid #4CC9F0" 
            }}>
              <Business sx={{ fontSize: 40, color: "#4CC9F0" }} />
            </Box>
            <Typography variant="h4" fontWeight={900} sx={{ 
              background: "linear-gradient(90deg, #4CC9F0, #4895EF)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent" 
            }}>
              Add Your Company
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Register your business for upcoming expos
            </Typography>
          </Stack>

          {error && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>{message}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              sx={textFieldStyle}
              required
            />

            <TextField
              fullWidth
              label="Products or Services"
              name="productsOrServices"
              value={formData.productsOrServices}
              onChange={handleChange}
              sx={textFieldStyle}
              required
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Company Email"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={handleChange}
                sx={textFieldStyle}
                required
              />
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Stack>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              sx={textFieldStyle}
              multiline
              rows={3}
            />

            {/* Styled File Upload */}
            <Box sx={{ 
              mt: 1, 
              p: 2, 
              border: "1px dashed rgba(255,255,255,0.2)", 
              borderRadius: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { borderColor: "#4CC9F0", bgcolor: "rgba(255,255,255,0.02)" }
            }}>
              <Button
                variant="text"
                component="label"
                startIcon={<AddPhotoAlternate />}
                sx={{ color: "#4CC9F0", fontWeight: 700 }}
              >
                {formData.image ? "Change Logo" : "Upload Company Logo"}
                <input type="file" hidden accept="image/*" onChange={handleChange} />
              </Button>
              {formData.image && (
                <Typography variant="caption" sx={{ display: "block", color: "#FFD166", mt: 1 }}>
                  Selected: {formData.image.name}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
                color: "#0D1B2A",
                fontWeight: 800,
                fontSize: "1rem",
                borderRadius: 2,
                boxShadow: "0 10px 20px rgba(76, 201, 240, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": { 
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 25px rgba(76, 201, 240, 0.4)",
                  background: "#4CC9F0"
                }
              }}
            >
              Register Company
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddCompany;