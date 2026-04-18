import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Container,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
// Icons safely imported
import BusinessIcon from "@mui/icons-material/Business";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ShowCompany() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    companyName: "",
    productsOrServices: "",
    companyEmail: "",
    contactNumber: "",
    description: "",
    image: null,
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const exhibitorId = storedUser?._id || storedUser?.id;

  const fetchMyCompany = async () => {
    if (!exhibitorId) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3001/company/by-exhibitor/${exhibitorId}`
      );
      const companyData = res.data?.company || null;
      setCompany(companyData);
      if (companyData?._id) {
        localStorage.setItem("companyId", companyData._id);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch your company.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCompany();
  }, [exhibitorId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete your company?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/company/${id}`);
      setCompany(null);
      setSuccessMsg("Company deleted successfully!");
      localStorage.removeItem("companyId");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete company.");
    }
  };

  const handleEditOpen = (comp) => {
    setEditData({ ...comp, image: null });
    setOpenEdit(true);
  };

  const handleEditClose = () => setOpenEdit(false);

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setEditData((prev) => ({ ...prev, image: files[0] }));
    else setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("companyName", editData.companyName);
      formData.append("productsOrServices", editData.productsOrServices);
      formData.append("companyEmail", editData.companyEmail);
      if (editData.contactNumber)
        formData.append("contactNumber", editData.contactNumber);
      if (editData.description)
        formData.append("description", editData.description);
      if (editData.image) formData.append("image", editData.image);

      const res = await axios.put(
        `http://localhost:3001/company/${editData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setCompany(res.data.company);
        setSuccessMsg("Company updated successfully!");
        handleEditClose();
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      setError("Error updating company.");
    }
  };

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

  if (loading)
    return (
      <Box
        sx={{
          bgcolor: "#0D1B2A",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#4CC9F0" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
        minHeight: "100vh",
        pb: 10,
      }}
    >
      {/* --- HERO HEADER SECTION --- */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          py: 8,
          textAlign: "center",
          color: "white",
          mb: 6,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              background: "linear-gradient(90deg, #4CC9F0, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Company Profile
          </Typography>
          <Typography
            variant="body1"
            sx={{ opacity: 0.7, maxWidth: "600px", mx: "auto" }}
          >
            Manage your professional presence and business details for the expo
            network.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        {error && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ mb: 4, borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert
            severity="success"
            variant="filled"
            sx={{ mb: 4, borderRadius: 2 }}
          >
            {successMsg}
          </Alert>
        )}

        {!company ? (
          <Paper
            sx={{
              p: 8,
              textAlign: "center",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
              border: "2px dashed rgba(255,255,255,0.1)",
              borderRadius: 6,
            }}
          >
            <BusinessIcon
              sx={{ fontSize: 60, color: "rgba(255,255,255,0.2)", mb: 2 }}
            />
            <Typography variant="h6" color="white" sx={{ opacity: 0.6 }}>
              You haven't registered a company yet.
            </Typography>
            <Typography variant="body2" sx={{ color: "#4CC9F0", mt: 1 }}>
              Please go to 'Add Company' to get started.
            </Typography>
          </Paper>
        ) : (
          <Grid container justifyContent="center">
            <Card
              sx={{
                maxWidth: 550,
                width: "100%",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                borderRadius: 6,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
            >
              {company.image && (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    background: "rgba(255,255,255,0.02)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:3001/uploads/${company.image}`}
                    alt="Logo"
                    sx={{
                      height: 140,
                      objectFit: "contain",
                      filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.3))",
                    }}
                  />
                </Box>
              )}
              <CardContent sx={{ p: 5 }}>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  gutterBottom
                  sx={{ color: "#4CC9F0" }}
                >
                  {company.companyName}
                </Typography>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

                <Stack spacing={3}>
                  <Box display="flex" alignItems="center" gap={2.5}>
                    <Box
                      sx={{
                        bgcolor: "rgba(255, 209, 102, 0.1)",
                        p: 1,
                        borderRadius: 2,
                      }}
                    >
                      <BusinessIcon sx={{ color: "#FFD166" }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          display: "block",
                        }}
                      >
                        Services & Products
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {company.productsOrServices}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2.5}>
                    <Box
                      sx={{
                        bgcolor: "rgba(76, 201, 240, 0.1)",
                        p: 1,
                        borderRadius: 2,
                      }}
                    >
                      <MailIcon sx={{ color: "#4CC9F0" }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          display: "block",
                        }}
                      >
                        Official Email
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {company.companyEmail}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2.5}>
                    <Box
                      sx={{
                        bgcolor: "rgba(76, 201, 240, 0.1)",
                        p: 1,
                        borderRadius: 2,
                      }}
                    >
                      <PhoneIcon sx={{ color: "#4CC9F0" }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          display: "block",
                        }}
                      >
                        Contact Number
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {company.contactNumber || "N/A"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={2.5}>
                    <Box
                      sx={{
                        bgcolor: "rgba(255, 209, 102, 0.1)",
                        p: 1,
                        borderRadius: 2,
                      }}
                    >
                      <DescriptionIcon sx={{ color: "#FFD166" }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          display: "block",
                        }}
                      >
                        Business Description
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, lineHeight: 1.6 }}
                      >
                        {company.description || "No description provided."}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} mt={5}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditOpen(company)}
                    sx={{
                      bgcolor: "#4CC9F0",
                      color: "#0D1B2A",
                      fontWeight: 800,
                      py: 1.5,
                      borderRadius: 2.5,
                      "&:hover": { bgcolor: "#4895EF" },
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(company._id)}
                    sx={{
                      color: "#ff4d4d",
                      borderColor: "rgba(255, 77, 77, 0.3)",
                      fontWeight: 700,
                      borderRadius: 2.5,
                      "&:hover": {
                        borderColor: "#ff4d4d",
                        bgcolor: "rgba(255, 77, 77, 0.05)",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Container>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        PaperProps={{
          sx: {
            bgcolor: "#1B263B",
            color: "white",
            borderRadius: 5,
            minWidth: { xs: "90%", sm: "450px" },
            backgroundImage: "none",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#4CC9F0", pt: 3 }}>
          Update Business Info
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              my: 3,
              p: 2,
              border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: 3,
            }}
          >
            <Button
              variant="text"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ color: "#FFD166", fontWeight: 700 }}
            >
              Change Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleEditChange}
              />
            </Button>
            {editData.image && (
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 1, color: "#4CC9F0" }}
              >
                {editData.image.name}
              </Typography>
            )}
          </Box>
          <TextField
            label="Company Name"
            name="companyName"
            fullWidth
            value={editData.companyName}
            onChange={handleEditChange}
            sx={textFieldStyle}
          />
          <TextField
            label="Products or Services"
            name="productsOrServices"
            fullWidth
            value={editData.productsOrServices}
            onChange={handleEditChange}
            sx={textFieldStyle}
          />
          <TextField
            label="Official Email"
            name="companyEmail"
            fullWidth
            value={editData.companyEmail}
            onChange={handleEditChange}
            sx={textFieldStyle}
          />
          <TextField
            label="Contact Phone"
            name="contactNumber"
            fullWidth
            value={editData.contactNumber}
            onChange={handleEditChange}
            sx={textFieldStyle}
          />
          <TextField
            label="Business Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={editData.description}
            onChange={handleEditChange}
            sx={textFieldStyle}
          />
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0 }}>
          <Button
            onClick={handleEditClose}
            sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              bgcolor: "#4CC9F0",
              color: "#0D1B2A",
              fontWeight: 800,
              px: 4,
              borderRadius: 2,
              "&:hover": { bgcolor: "#4895EF" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ShowCompany;
