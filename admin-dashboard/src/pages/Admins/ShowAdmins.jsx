// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const DARK_NAVY = "#0D1B2A";

// function ShowAdmins() {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   // const [successMsg, setSuccessMsg] = useState("");

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/signup");
//       const adminUsers = res.data.filter((user) => user.role === "admin");
//       setAdmins(adminUsers);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch admins");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;

//     try {
//       await axios.delete(`http://localhost:3001/delete/${id}`);
//       setSuccessMsg("Admin deleted successfully!");
//       setAdmins((prev) => prev.filter((admin) => admin._id !== id));
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to delete admin");
//       setTimeout(() => setError(""), 2000);
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "80vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress sx={{ color: NEON_CYAN }} />
//         <Typography mt={2} variant="subtitle1" sx={{ color: "#94A3B8" }}>
//           Loading Admins...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         py: 6,
//         px: 2,
//       }}
//     >
//       <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
//         <Typography
//           variant="h3"
//           textAlign="center"
//           sx={{
//             fontWeight: 900,
//             fontFamily: "'Poppins', sans-serif",
//             textTransform: "uppercase",
//             letterSpacing: "3px",
//             mb: 4,
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             filter: "drop-shadow(0px 4px 10px rgba(76, 201, 240, 0.2))",
//           }}
//         >
//           Manage Administrators
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
//             {error}
//           </Alert>
//         )}
//         {successMsg && (
//           <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
//             {successMsg}
//           </Alert>
//         )}

//         {admins.length === 0 ? (
//           <Typography textAlign="center" sx={{ color: "#94A3B8", mt: 5 }}>
//             No admins found in the system.
//           </Typography>
//         ) : (
//           <TableContainer
//             component={Paper}
//             sx={{
//               borderRadius: "20px",
//               background: "rgba(13, 27, 42, 0.8)",
//               backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255, 255, 255, 0.1)",
//               boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
//               overflow: "hidden",
//             }}
//           >
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead>
//                 <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                   {["Name", "Email", "Role", "Action"].map((heading) => (
//                     <TableCell
//                       key={heading}
//                       align={heading === "Action" ? "center" : "left"}
//                       sx={{
//                         color: "#A2EDFF !important",
//                         fontWeight: "900",
//                         fontSize: "1.1rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1.5px",
//                         borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                         padding: "24px",
//                         fontFamily: "'Poppins', sans-serif",
//                       }}
//                     >
//                       {heading}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {admins.map((admin) => (
//                   <TableRow
//                     key={admin._id}
//                     sx={{
//                       "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                       transition: "all 0.3s",
//                       "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                     }}
//                   >
//                     <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>{admin.name}</TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>{admin.email}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: "6px",
//                           fontSize: "0.75rem",
//                           fontWeight: "bold",
//                           backgroundColor: "rgba(76, 201, 240, 0.1)",
//                           color: NEON_CYAN,
//                           border: `1px solid ${NEON_CYAN}44`,
//                         }}
//                       >
//                         {admin.role.toUpperCase()}
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() => handleDelete(admin._id)}
//                         sx={{
//                           borderRadius: "8px",
//                           color: "#FF4D4D",
//                           borderColor: "rgba(255, 77, 77, 0.4)",
//                           backgroundColor: "transparent",
//                           fontWeight: "bold",
//                           textTransform: "none",
//                           fontSize: "0.85rem",
//                           padding: "4px 12px",
//                           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 77, 77, 0.15)",
//                             borderColor: "#FF4D4D",
//                             color: "#FF4D4D",
//                             transform: "translateY(-1px)",
//                             boxShadow: "0px 4px 12px rgba(255, 77, 77, 0.2)",
//                           },
//                           "&:active": {
//                             transform: "translateY(0px)",
//                             backgroundColor: "rgba(255, 77, 77, 0.25)",
//                           },
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default ShowAdmins;
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
  React.useEffect(() => {
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
            position: "fixed", top: "24px", left: "50%",
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
const IconUsers = ({ size = 55, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconTrash = ({ size = 16, color = "#ff4d4d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);
const IconEmpty = ({ size = 60, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ShowAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/signup");
      const adminUsers = res.data.filter((user) => user.role === "admin");
      setAdmins(adminUsers);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setSuccessMsg("Admin deleted successfully!");
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete admin");
      setTimeout(() => setError(""), 2000);
    }
  };

  /* ---- LOADING ---- */
  if (loading) {
    return (
      <div style={{
        background: G.black, minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
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
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px", color: G.w55,
          marginTop: "16px",
        }}>
          Loading Admins...
        </p>
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
            Admin Management
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Manage{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Administrators</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            View and manage all administrator accounts in the system.
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          style={{
            background: G.black2,
            border: `1px solid ${G.border}`,
            borderRadius: "20px",
            padding: "clamp(28px, 5vw, 40px)",
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

          {admins.length === 0 ? (
            /* ---- EMPTY STATE ---- */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center", padding: "60px 20px" }}
            >
              <IconEmpty size={60} />
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 700,
                color: G.w55, marginTop: "20px", marginBottom: "8px",
              }}>
                No Admins Found
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", color: G.w30, lineHeight: 1.7,
              }}>
                There are no administrator accounts in the system yet.
              </p>
            </motion.div>
          ) : (
            /* ---- TABLE ---- */
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "650px",
              }}>
                <thead>
                  <tr>
                    {["Name", "Email", "Role", "Action"].map((heading) => (
                      <th
                        key={heading}
                        style={{
                          textAlign: heading === "Action" ? "center" : "left",
                          color: G.gold,
                          fontWeight: 700,
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          borderBottom: `2px solid ${G.bGold}`,
                          padding: "20px 16px",
                          fontFamily: "'Inter', sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <motion.tr
                      key={admin._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      style={{
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td style={{
                        padding: "18px 16px",
                        color: G.w80,
                        fontWeight: 500,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {admin.name}
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {admin.email}
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          background: "rgba(201,168,76,0.08)",
                          border: `1px solid ${G.bGold}`,
                          borderRadius: "6px",
                          padding: "4px 12px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px", fontWeight: 700,
                          letterSpacing: "0.08em", textTransform: "uppercase",
                          color: G.gold,
                        }}>
                          <span style={{
                            width: "5px", height: "5px", borderRadius: "50%",
                            background: G.gold,
                          }} />
                          {admin.role}
                        </span>
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        borderBottom: `1px solid ${G.border}`,
                        textAlign: "center",
                      }}>
                        <motion.button
                          onClick={() => handleDelete(admin._id)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "8px 16px",
                            background: "transparent",
                            color: "#ff4d4d",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px", fontWeight: 600,
                            border: "1px solid rgba(255,77,77,0.3)",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.25s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,77,77,0.08)";
                            e.currentTarget.style.borderColor = "rgba(255,77,77,0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "rgba(255,77,77,0.3)";
                          }}
                        >
                          <IconTrash size={14} color="#ff4d4d" />
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
