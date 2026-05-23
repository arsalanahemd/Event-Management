// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Grid,
//   Container,
//   Stack,
//   Divider,
//   Paper,
// } from "@mui/material";
// import axios from "axios";
// // Icons safely imported
// import BusinessIcon from "@mui/icons-material/Business";
// import MailIcon from "@mui/icons-material/Mail";
// import PhoneIcon from "@mui/icons-material/Phone";
// import DescriptionIcon from "@mui/icons-material/Description";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// function ShowCompany() {
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [openEdit, setOpenEdit] = useState(false);
//   const [editData, setEditData] = useState({
//     _id: "",
//     companyName: "",
//     productsOrServices: "",
//     companyEmail: "",
//     contactNumber: "",
//     description: "",
//     image: null,
//   });

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const exhibitorId = storedUser?._id || storedUser?.id;

//   const fetchMyCompany = async () => {
//     if (!exhibitorId) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `http://localhost:3001/company/by-exhibitor/${exhibitorId}`
//       );
//       const companyData = res.data?.company || null;
//       setCompany(companyData);
//       if (companyData?._id) {
//         localStorage.setItem("companyId", companyData._id);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch your company.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyCompany();
//   }, [exhibitorId]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete your company?"))
//       return;
//     try {
//       await axios.delete(`http://localhost:3001/company/${id}`);
//       setCompany(null);
//       setSuccessMsg("Company deleted successfully!");
//       localStorage.removeItem("companyId");
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (err) {
//       setError("Failed to delete company.");
//     }
//   };

//   const handleEditOpen = (comp) => {
//     setEditData({ ...comp, image: null });
//     setOpenEdit(true);
//   };

//   const handleEditClose = () => setOpenEdit(false);

//   const handleEditChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setEditData((prev) => ({ ...prev, image: files[0] }));
//     else setEditData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("companyName", editData.companyName);
//       formData.append("productsOrServices", editData.productsOrServices);
//       formData.append("companyEmail", editData.companyEmail);
//       if (editData.contactNumber)
//         formData.append("contactNumber", editData.contactNumber);
//       if (editData.description)
//         formData.append("description", editData.description);
//       if (editData.image) formData.append("image", editData.image);

//       const res = await axios.put(
//         `http://localhost:3001/company/${editData._id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (res.data.success) {
//         setCompany(res.data.company);
//         setSuccessMsg("Company updated successfully!");
//         handleEditClose();
//         setTimeout(() => setSuccessMsg(""), 3000);
//       }
//     } catch (err) {
//       setError("Error updating company.");
//     }
//   };

//   const textFieldStyle = {
//     "& .MuiOutlinedInput-root": {
//       color: "white",
//       "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
//       "&:hover fieldset": { borderColor: "#4CC9F0" },
//       "&.Mui-focused fieldset": { borderColor: "#4CC9F0" },
//     },
//     "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
//     "& .MuiInputLabel-root.Mui-focused": { color: "#4CC9F0" },
//     mb: 2,
//   };

//   if (loading)
//     return (
//       <Box
//         sx={{
//           bgcolor: "#0D1B2A",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CircularProgress sx={{ color: "#4CC9F0" }} />
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//         minHeight: "100vh",
//         pb: 10,
//       }}
//     >
//       {/* --- HERO HEADER SECTION --- */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           py: 8,
//           textAlign: "center",
//           color: "white",
//           mb: 6,
//           borderBottom: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <Container maxWidth="md">
//           <Typography
//             variant="h3"
//             fontWeight={900}
//             sx={{
//               background: "linear-gradient(90deg, #4CC9F0, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               mb: 2,
//             }}
//           >
//             Company Profile
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ opacity: 0.7, maxWidth: "600px", mx: "auto" }}
//           >
//             Manage your professional presence and business details for the expo
//             network.
//           </Typography>
//         </Container>
//       </Box>

//       <Container maxWidth="md">
//         {error && (
//           <Alert
//             severity="error"
//             variant="filled"
//             sx={{ mb: 4, borderRadius: 2 }}
//           >
//             {error}
//           </Alert>
//         )}
//         {successMsg && (
//           <Alert
//             severity="success"
//             variant="filled"
//             sx={{ mb: 4, borderRadius: 2 }}
//           >
//             {successMsg}
//           </Alert>
//         )}

//         {!company ? (
//           <Paper
//             sx={{
//               p: 8,
//               textAlign: "center",
//               background: "rgba(255,255,255,0.03)",
//               backdropFilter: "blur(10px)",
//               border: "2px dashed rgba(255,255,255,0.1)",
//               borderRadius: 6,
//             }}
//           >
//             <BusinessIcon
//               sx={{ fontSize: 60, color: "rgba(255,255,255,0.2)", mb: 2 }}
//             />
//             <Typography variant="h6" color="white" sx={{ opacity: 0.6 }}>
//               You haven't registered a company yet.
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#4CC9F0", mt: 1 }}>
//               Please go to 'Add Company' to get started.
//             </Typography>
//           </Paper>
//         ) : (
//           <Grid container justifyContent="center">
//             <Card
//               sx={{
//                 maxWidth: 550,
//                 width: "100%",
//                 background: "rgba(255, 255, 255, 0.05)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 6,
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 color: "white",
//                 boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
//               }}
//             >
//               {company.image && (
//                 <Box
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     background: "rgba(255,255,255,0.02)",
//                     borderBottom: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     image={`http://localhost:3001/uploads/${company.image}`}
//                     alt="Logo"
//                     sx={{
//                       height: 140,
//                       objectFit: "contain",
//                       filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.3))",
//                     }}
//                   />
//                 </Box>
//               )}
//               <CardContent sx={{ p: 5 }}>
//                 <Typography
//                   variant="h4"
//                   fontWeight={800}
//                   gutterBottom
//                   sx={{ color: "#4CC9F0" }}
//                 >
//                   {company.companyName}
//                 </Typography>

//                 <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

//                 <Stack spacing={3}>
//                   <Box display="flex" alignItems="center" gap={2.5}>
//                     <Box
//                       sx={{
//                         bgcolor: "rgba(255, 209, 102, 0.1)",
//                         p: 1,
//                         borderRadius: 2,
//                       }}
//                     >
//                       <BusinessIcon sx={{ color: "#FFD166" }} />
//                     </Box>
//                     <Box>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: "rgba(255,255,255,0.5)",
//                           display: "block",
//                         }}
//                       >
//                         Services & Products
//                       </Typography>
//                       <Typography variant="body1" fontWeight={500}>
//                         {company.productsOrServices}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Box display="flex" alignItems="center" gap={2.5}>
//                     <Box
//                       sx={{
//                         bgcolor: "rgba(76, 201, 240, 0.1)",
//                         p: 1,
//                         borderRadius: 2,
//                       }}
//                     >
//                       <MailIcon sx={{ color: "#4CC9F0" }} />
//                     </Box>
//                     <Box>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: "rgba(255,255,255,0.5)",
//                           display: "block",
//                         }}
//                       >
//                         Official Email
//                       </Typography>
//                       <Typography variant="body1" fontWeight={500}>
//                         {company.companyEmail}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Box display="flex" alignItems="center" gap={2.5}>
//                     <Box
//                       sx={{
//                         bgcolor: "rgba(76, 201, 240, 0.1)",
//                         p: 1,
//                         borderRadius: 2,
//                       }}
//                     >
//                       <PhoneIcon sx={{ color: "#4CC9F0" }} />
//                     </Box>
//                     <Box>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: "rgba(255,255,255,0.5)",
//                           display: "block",
//                         }}
//                       >
//                         Contact Number
//                       </Typography>
//                       <Typography variant="body1" fontWeight={500}>
//                         {company.contactNumber || "N/A"}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Box display="flex" alignItems="flex-start" gap={2.5}>
//                     <Box
//                       sx={{
//                         bgcolor: "rgba(255, 209, 102, 0.1)",
//                         p: 1,
//                         borderRadius: 2,
//                       }}
//                     >
//                       <DescriptionIcon sx={{ color: "#FFD166" }} />
//                     </Box>
//                     <Box>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: "rgba(255,255,255,0.5)",
//                           display: "block",
//                         }}
//                       >
//                         Business Description
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ opacity: 0.8, lineHeight: 1.6 }}
//                       >
//                         {company.description || "No description provided."}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={2} mt={5}>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     startIcon={<EditIcon />}
//                     onClick={() => handleEditOpen(company)}
//                     sx={{
//                       bgcolor: "#4CC9F0",
//                       color: "#0D1B2A",
//                       fontWeight: 800,
//                       py: 1.5,
//                       borderRadius: 2.5,
//                       "&:hover": { bgcolor: "#4895EF" },
//                     }}
//                   >
//                     Edit Profile
//                   </Button>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDelete(company._id)}
//                     sx={{
//                       color: "#ff4d4d",
//                       borderColor: "rgba(255, 77, 77, 0.3)",
//                       fontWeight: 700,
//                       borderRadius: 2.5,
//                       "&:hover": {
//                         borderColor: "#ff4d4d",
//                         bgcolor: "rgba(255, 77, 77, 0.05)",
//                       },
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         )}
//       </Container>

//       {/* Edit Dialog */}
//       <Dialog
//         open={openEdit}
//         onClose={handleEditClose}
//         PaperProps={{
//           sx: {
//             bgcolor: "#1B263B",
//             color: "white",
//             borderRadius: 5,
//             minWidth: { xs: "90%", sm: "450px" },
//             backgroundImage: "none",
//             border: "1px solid rgba(255,255,255,0.1)",
//           },
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 800, color: "#4CC9F0", pt: 3 }}>
//           Update Business Info
//         </DialogTitle>
//         <DialogContent sx={{ mt: 1 }}>
//           <Box
//             sx={{
//               textAlign: "center",
//               my: 3,
//               p: 2,
//               border: "1px dashed rgba(255,255,255,0.2)",
//               borderRadius: 3,
//             }}
//           >
//             <Button
//               variant="text"
//               component="label"
//               startIcon={<CloudUploadIcon />}
//               sx={{ color: "#FFD166", fontWeight: 700 }}
//             >
//               Change Logo
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={handleEditChange}
//               />
//             </Button>
//             {editData.image && (
//               <Typography
//                 variant="caption"
//                 display="block"
//                 sx={{ mt: 1, color: "#4CC9F0" }}
//               >
//                 {editData.image.name}
//               </Typography>
//             )}
//           </Box>
//           <TextField
//             label="Company Name"
//             name="companyName"
//             fullWidth
//             value={editData.companyName}
//             onChange={handleEditChange}
//             sx={textFieldStyle}
//           />
//           <TextField
//             label="Products or Services"
//             name="productsOrServices"
//             fullWidth
//             value={editData.productsOrServices}
//             onChange={handleEditChange}
//             sx={textFieldStyle}
//           />
//           <TextField
//             label="Official Email"
//             name="companyEmail"
//             fullWidth
//             value={editData.companyEmail}
//             onChange={handleEditChange}
//             sx={textFieldStyle}
//           />
//           <TextField
//             label="Contact Phone"
//             name="contactNumber"
//             fullWidth
//             value={editData.contactNumber}
//             onChange={handleEditChange}
//             sx={textFieldStyle}
//           />
//           <TextField
//             label="Business Description"
//             name="description"
//             fullWidth
//             multiline
//             rows={3}
//             value={editData.description}
//             onChange={handleEditChange}
//             sx={textFieldStyle}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 4, pt: 0 }}>
//           <Button
//             onClick={handleEditClose}
//             sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUpdate}
//             variant="contained"
//             sx={{
//               bgcolor: "#4CC9F0",
//               color: "#0D1B2A",
//               fontWeight: 800,
//               px: 4,
//               borderRadius: 2,
//               "&:hover": { bgcolor: "#4895EF" },
//             }}
//           >
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default ShowCompany;

// ─── ShowCompany.jsx (main page) ─────────────────────────────
//
// Folder structure:
//   ShowCompany/
//   ├── ShowCompany.jsx           ← this file (logic + layout shell)
//   ├── styles/
//   │   ├── tokens.js             ← design tokens
//   │   └── GlobalStyles.jsx      ← all CSS / animations
//   └── components/
//       ├── HeroBanner.jsx        ← top hero section
//       ├── Toast.jsx             ← success / error notification
//       ├── SkeletonCard.jsx      ← shimmer loading placeholder
//       ├── EmptyState.jsx        ← when no company exists
//       ├── InfoRow.jsx           ← single labelled detail row
//       ├── CompanyCard.jsx       ← full company detail card
//       ├── UploadZone.jsx        ← drag-drop logo upload
//       ├── EditModal.jsx         ← slide-up edit form modal
//       └── ConfirmDialog.jsx     ← delete confirmation dialog

// import React, { useEffect, useState } from "react";
// import { useNavigate }                 from "react-router-dom";
// import axios                           from "axios";

// // import GlobalStyles    from "./styles/GlobalStyles";
// import GlobalStyles from "../components/AddCompany.jsx/Globalstyles.JSX";
// // import HeroBanner      from "./components/HeroBanner";
// import HeroBanner from "../components/ShowCompany/Herobanner";
// import Toast from "../components/AddCompany.jsx/Toast";
// // import Toast           from "./components/Toast";
// // import SkeletonCard    from "./components/SkeletonCard";
// import SkeletonCard from "../components/ShowCompany/Skeletoncard";
// // import EmptyState      from "./components/EmptyState";
// import EmptyState from "../components/ShowCompany/Emptystate";
// // import CompanyCard     from "./components/CompanyCard";
// import CompanyCard from "../components/ShowCompany/Companycard";
// // import EditModal       from "./components/EditModal";
// import EditModal from "../components/ShowCompany/Editmodal";
// // import ConfirmDialog   from "./components/ConfirmDialog";
// import ConfirmDialog from "../components/ShowCompany/Confirmdialog";

// const BASE_URL = "http://localhost:3001";

// const EMPTY_EDIT = {
//   _id: "", companyName: "", productsOrServices: "",
//   companyEmail: "", contactNumber: "", description: "", image: null,
// };

// export default function ShowCompany() {
//   const [company,      setCompany]      = useState(null);
//   const [loading,      setLoading]      = useState(true);
//   const [toast,        setToast]        = useState({ msg: "", type: "success" });

//   const [editOpen,     setEditOpen]     = useState(false);
//   const [editData,     setEditData]     = useState(EMPTY_EDIT);
//   const [saving,       setSaving]       = useState(false);

//   const [confirmOpen,  setConfirmOpen]  = useState(false);

//   const storedUser  = JSON.parse(localStorage.getItem("user"));
//   const exhibitorId = storedUser?._id || storedUser?.id;

//   /* ── fetch ── */
//   const fetchMyCompany = async () => {
//     if (!exhibitorId) { setLoading(false); return; }
//     try {
//       const res = await axios.get(`${BASE_URL}/company/by-exhibitor/${exhibitorId}`);
//       const data = res.data?.company || null;
//       setCompany(data);
//       if (data?._id) localStorage.setItem("companyId", data._id);
//     } catch {
//       setToast({ msg: "Failed to fetch your company.", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchMyCompany(); }, [exhibitorId]);

//   /* ── delete ── */
//   const handleDeleteConfirm = async () => {
//     setConfirmOpen(false);
//     try {
//       await axios.delete(`${BASE_URL}/company/${company._id}`);
//       setCompany(null);
//       localStorage.removeItem("companyId");
//       setToast({ msg: "Company deleted successfully.", type: "success" });
//     } catch {
//       setToast({ msg: "Failed to delete company.", type: "error" });
//     }
//   };

//   /* ── edit open ── */
//   const handleEditOpen = () => {
//     setEditData({ ...company, image: null });
//     setEditOpen(true);
//   };

//   /* ── edit field change ── */
//   const handleEditChange = (e) => {
//     setEditData(p => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   /* ── edit save ── */
//   const handleUpdate = async () => {
//     setSaving(true);
//     try {
//       const payload = new FormData();
//       payload.append("companyName",        editData.companyName);
//       payload.append("productsOrServices", editData.productsOrServices);
//       payload.append("companyEmail",       editData.companyEmail);
//       if (editData.contactNumber) payload.append("contactNumber", editData.contactNumber);
//       if (editData.description)   payload.append("description",   editData.description);
//       if (editData.image)         payload.append("image",         editData.image);

//       const res = await axios.put(
//         `${BASE_URL}/company/${editData._id}`, payload,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res.data.success) {
//         setCompany(res.data.company);
//         setEditOpen(false);
//         setToast({ msg: "Company updated successfully!", type: "success" });
//       }
//     } catch {
//       setToast({ msg: "Error updating company.", type: "error" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ── render ── */
//   return (
//     <div className="sc-page">
//       <GlobalStyles />

//       <HeroBanner />

//       <div className="sc-body">
//         <Toast
//           msg={toast.msg}
//           type={toast.type}
//           onClose={() => setToast(t => ({ ...t, msg: "" }))}
//         />

//         {loading   ? <SkeletonCard /> :
//          !company  ? <EmptyState />   :
//           <CompanyCard
//             company={company}
//             onEdit={handleEditOpen}
//             onDelete={() => setConfirmOpen(true)}
//           />
//         }
//       </div>

//       {/* Edit modal */}
//       <EditModal
//         open={editOpen}
//         editData={editData}
//         onChange={handleEditChange}
//         onFileChange={file => setEditData(p => ({ ...p, image: file }))}
//         onFileRemove={() => setEditData(p => ({ ...p, image: null }))}
//         onSave={handleUpdate}
//         onClose={() => setEditOpen(false)}
//         saving={saving}
//       />

//       {/* Delete confirm */}
//       <ConfirmDialog
//         open={confirmOpen}
//         onConfirm={handleDeleteConfirm}
//         onCancel={() => setConfirmOpen(false)}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/* ---- FONT INJECT ---- */
if (!document.getElementById("monks-fonts")) {
  const l = document.createElement("link");
  l.id = "monks-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const G = {
  black:  "#000000",
  black2: "#0a0a0a",
  black3: "#111111",
  black4: "#1a1a1a",
  gold:   "#C9A84C",
  goldLt: "#dcc07e",
  white:  "#FFFFFF",
  w80:    "rgba(255,255,255,0.80)",
  w55:    "rgba(255,255,255,0.55)",
  w30:    "rgba(255,255,255,0.30)",
  border: "rgba(255,255,255,0.08)",
  bGold:  "rgba(201,168,76,0.30)",
};

/* =============================================
   TOAST
   ============================================= */
function Toast({ alert, onClose }) {
  useEffect(() => {
    if (!alert.message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [alert.message]);

  return (
    <AnimatePresence>
      {alert.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed", top: "90px", left: "50%",
            transform: "translateX(-50%)", zIndex: 9999,
            background: alert.success
              ? "rgba(201,168,76,0.12)"
              : "rgba(248,113,113,0.12)",
            border: `1px solid ${alert.success ? G.bGold : "rgba(248,113,113,0.35)"}`,
            borderRadius: "10px", padding: "13px 24px",
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600,
            color: alert.success ? G.gold : "#f87171",
            backdropFilter: "blur(12px)", whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {alert.success ? "✓  " : "✕  "}{alert.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================
   ICONS (SVG)
   ============================================= */
const IconBusiness = ({ size = 22, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/>
  </svg>
);
const IconMail = ({ size = 22, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPhone = ({ size = 22, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconDescription = ({ size = 22, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>
  </svg>
);
const IconEdit = ({ size = 18, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconDelete = ({ size = 18, color = "#ff4d4d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);
const IconUpload = ({ size = 22, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);
const IconClose = ({ size = 18, color = G.w55 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconBuilding = ({ size = 60, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 9h4"/><path d="M10 13h4"/>
  </svg>
);

/* =============================================
   FIELD — reusable input
   ============================================= */
function Field({ label, name, value, onChange, type = "text", multiline, rows, placeholder }) {
  const [focused, setFocused] = React.useState(false);
  const Tag = multiline ? "textarea" : "input";

  return (
    <div style={{ flex: 1 }}>
      <label style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? G.gold : G.w30,
        marginBottom: "7px",
        transition: "color 0.2s",
      }}>
        {label}
      </label>
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        rows={rows}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: G.black3,
          border: `1px solid ${focused ? G.bGold : G.border}`,
          borderRadius: "8px",
          padding: "14px 18px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: G.white,
          outline: "none",
          resize: multiline ? "vertical" : undefined,
          lineHeight: 1.7,
          cursor: "text",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* =============================================
   INFO ROW
   ============================================= */
function InfoRow({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex", alignItems: "flex-start", gap: "16px",
        padding: "16px 20px",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${G.border}`,
        borderRadius: "12px",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = G.bGold}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = G.border}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minWidth: "42px", height: "42px",
        background: "rgba(201,168,76,0.08)",
        border: `1px solid ${G.bGold}`,
        borderRadius: "10px",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: G.w30, marginBottom: "4px",
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px", fontWeight: 500,
          color: G.w80, lineHeight: 1.5,
          wordBreak: "break-word",
        }}>
          {value || "N/A"}
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ShowCompany() {
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

  /* ---- LOADING ---- */
  if (loading) {
    return (
      <div style={{
        background: G.black, minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "40px", height: "40px",
            border: `2px solid ${G.border}`,
            borderTopColor: G.gold,
            borderRadius: "50%",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
    }}>
      {/* Toast */}
      <Toast
        alert={{ success: !!successMsg, message: successMsg || error }}
        onClose={() => { setSuccessMsg(""); setError(""); }}
      />

      {/* ---- HERO ---- */}
      <section style={{
        position: "relative", background: G.black2,
        padding: "100px 0 72px", textAlign: "center",
        borderBottom: `1px solid ${G.border}`, overflow: "hidden",
      }}>
        {/* Gold glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
            borderRadius: "4px", padding: "6px 16px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold }} />
            Business Profile
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Your{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Company</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Manage your professional presence and business details for the expo network.
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          style={{
            background: G.black2,
            border: `1px solid ${G.border}`,
            borderRadius: "20px",
            padding: "clamp(28px, 5vw, 52px)",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Gold top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(90deg, ${G.gold}, transparent)`,
          }} />
          {/* Corner glow */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)",
            pointerEvents: "none",
          }} />

          {!company ? (
            /* ---- EMPTY STATE ---- */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: "center",
                padding: "60px 20px",
                border: `2px dashed ${G.border}`,
                borderRadius: "16px",
              }}
            >
              <IconBuilding size={60} />
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 700,
                color: G.w55, marginTop: "20px", marginBottom: "8px",
              }}>
                No Company Registered
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", color: G.w30, lineHeight: 1.7,
              }}>
                You haven't registered a company yet.<br />
                Please go to <span style={{ color: G.gold, fontWeight: 600 }}>'Add Company'</span> to get started.
              </p>
            </motion.div>
          ) : (
            /* ---- COMPANY CARD ---- */
            <>
              {/* Card heading */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: G.gold,
                  fontFamily: "'Inter', sans-serif", marginBottom: "10px",
                }}>
                  <span style={{ width: "20px", height: "1px", background: G.gold }} />
                  Company Details
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700,
                  color: G.white, lineHeight: 1.15,
                }}>
                  {company.companyName}
                </h2>
              </div>

              {/* Logo */}
              <AnimatePresence>
                {company.image && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      marginBottom: "28px",
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${G.border}`,
                      borderRadius: "14px",
                    }}
                  >
                    <img
                      src={`http://localhost:3001/uploads/${company.image}`}
                      alt="Company Logo"
                      style={{
                        maxHeight: "140px",
                        objectFit: "contain",
                        filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.3))",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                <InfoRow
                  icon={<IconBusiness color={G.gold} />}
                  label="Services & Products"
                  value={company.productsOrServices}
                />
                <InfoRow
                  icon={<IconMail color={G.gold} />}
                  label="Official Email"
                  value={company.companyEmail}
                />
                <InfoRow
                  icon={<IconPhone color={G.gold} />}
                  label="Contact Number"
                  value={company.contactNumber}
                />
                <InfoRow
                  icon={<IconDescription color={G.gold} />}
                  label="Business Description"
                  value={company.description || "No description provided."}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button
                  onClick={() => handleEditOpen(company)}
                  whileHover={{ y: -3, boxShadow: "0 14px 32px rgba(201,168,76,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, padding: "17px",
                    background: G.gold,
                    color: "#000",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    border: "none", borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    transition: "background 0.25s",
                  }}
                >
                  <IconEdit size={16} color="#000" />
                  Edit Profile
                </motion.button>

                <motion.button
                  onClick={() => handleDelete(company._id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, padding: "17px",
                    background: "transparent",
                    color: "#ff4d4d",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    border: "1px solid rgba(255,77,77,0.3)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ff4d4d";
                    e.currentTarget.style.background = "rgba(255,77,77,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,77,77,0.3)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <IconDelete size={16} color="#ff4d4d" />
                  Delete
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* ---- EDIT DIALOG ---- */}
      <AnimatePresence>
        {openEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
            onClick={handleEditClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: G.black2,
                border: `1px solid ${G.border}`,
                borderRadius: "20px",
                width: "100%", maxWidth: "520px",
                maxHeight: "90vh", overflowY: "auto",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, ${G.gold}, transparent)`,
              }} />

              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "28px 32px 0",
              }}>
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: G.gold,
                    fontFamily: "'Inter', sans-serif", marginBottom: "6px",
                  }}>
                    <span style={{ width: "20px", height: "1px", background: G.gold }} />
                    Update
                  </div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem", fontWeight: 700,
                    color: G.white, lineHeight: 1.15,
                  }}>
                    Business{" "}
                    <em style={{ fontStyle: "italic", color: G.gold }}>Info</em>
                  </h2>
                </div>
                <button
                  onClick={handleEditClose}
                  style={{
                    background: "transparent", border: "none",
                    cursor: "pointer", padding: "8px",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <IconClose />
                </button>
              </div>

              {/* Form */}
              <div style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Logo Upload */}
                <div style={{
                  textAlign: "center",
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px dashed ${G.border}`,
                  borderRadius: "12px",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = G.bGold}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = G.border}
                >
                  <label style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", fontWeight: 600,
                    color: G.gold,
                  }}>
                    <IconUpload size={20} />
                    Change Logo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleEditChange}
                    />
                  </label>
                  {editData.image && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: "10px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px", color: G.w55,
                      }}
                    >
                      {editData.image.name}
                    </motion.p>
                  )}
                </div>

                <Field
                  label="Company Name"
                  name="companyName"
                  value={editData.companyName}
                  onChange={handleEditChange}
                />
                <Field
                  label="Products or Services"
                  name="productsOrServices"
                  value={editData.productsOrServices}
                  onChange={handleEditChange}
                />
                <Field
                  label="Official Email"
                  name="companyEmail"
                  type="email"
                  value={editData.companyEmail}
                  onChange={handleEditChange}
                />
                <Field
                  label="Contact Phone"
                  name="contactNumber"
                  value={editData.contactNumber}
                  onChange={handleEditChange}
                />
                <Field
                  label="Business Description"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  multiline
                  rows={3}
                />

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
                    onClick={handleEditClose}
                    style={{
                      flex: 1, padding: "15px",
                      background: "transparent",
                      color: G.w55,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      border: `1px solid ${G.border}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = G.w30;
                      e.currentTarget.style.color = G.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = G.border;
                      e.currentTarget.style.color = G.w55;
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleUpdate}
                    whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(201,168,76,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1, padding: "15px",
                      background: G.gold,
                      color: "#000",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "background 0.25s",
                    }}
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}