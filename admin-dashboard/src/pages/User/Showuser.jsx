// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   ButtonGroup,
// } from "@mui/material";
// import axios from "axios";

// //  Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const NEON_PINK = "#F72585";
// const LIGHT_CYAN = "#A2EDFF";

// function ShowUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/signup");
//       setUsers(res.data);
//     } catch (err) {
//       setError("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/delete/${id}`);
//       setSuccessMsg("User deleted successfully!");
//       setUsers((prev) => prev.filter((user) => user._id !== id));
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to delete user");
//     }
//   };

//   const filteredUsers = filter === "all" ? users : users.filter((user) => user.role === filter);

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
//         <Typography mt={2} sx={{ color: "#94A3B8" }}>
//           Loading Users Database...
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
//           User Management
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <ButtonGroup
//             sx={{
//               borderRadius: "12px",
//               overflow: "hidden",
//               border: "1px solid rgba(76, 201, 240, 0.3)",
//               boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
//             }}
//           >
//             {["all", "attendee", "exhibitor"].map((role) => (
//               <Button
//                 key={role}
//                 onClick={() => setFilter(role)}
//                 sx={{
//                   px: 3,
//                   py: 1,
//                   fontWeight: "700",
//                   textTransform: "uppercase",
//                   fontSize: "0.75rem",
//                   letterSpacing: "1px",
//                   backgroundColor: filter === role ? "rgba(76, 201, 240, 0.2)" : "transparent",
//                   color: filter === role ? NEON_CYAN : "#94A3B8",
//                   border: "none !important",
//                   "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.1)", color: "#fff" },
//                   transition: "all 0.3s",
//                 }}
//               >
//                 {role}
//               </Button>
//             ))}
//           </ButtonGroup>
//         </Box>

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

//         <TableContainer
//           component={Paper}
//           sx={{
//             borderRadius: "20px",
//             background: "rgba(13, 27, 42, 0.8)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//             boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
//             overflow: "hidden",
//           }}
//         >
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                 {["Name", "Email", "Role", "Action"].map((heading) => (
//                   <TableCell
//                     key={heading}
//                     align={heading === "Action" ? "center" : "left"}
//                     sx={{
//                       color: "#A2EDFF !important",
//                       fontWeight: "900",
//                       fontSize: "1.1rem",
//                       textTransform: "uppercase",
//                       letterSpacing: "1.5px",
//                       borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                       padding: "24px",
//                       fontFamily: "'Poppins', sans-serif",
//                     }}
//                   >
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredUsers.map((user) => (
//                 <TableRow
//                   key={user._id}
//                   sx={{
//                     "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                     transition: "all 0.3s",
//                     "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                   }}
//                 >
//                   <TableCell sx={{ color: "#F1F5F9", fontWeight: 500, paddingY: 2 }}>
//                     {user.name}
//                   </TableCell>
//                   <TableCell sx={{ color: "#94A3B8" }}>{user.email}</TableCell>
//                   <TableCell>
//                     <Box
//                       sx={{
//                         display: "inline-block",
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: "6px",
//                         fontSize: "0.75rem",
//                         fontWeight: "bold",
//                         backgroundColor:
//                           user.role === "exhibitor"
//                             ? "rgba(247, 37, 133, 0.1)"
//                             : "rgba(76, 201, 240, 0.1)",
//                         color: user.role === "exhibitor" ? NEON_PINK : NEON_CYAN,
//                         border: `1px solid ${user.role === "exhibitor" ? NEON_PINK : NEON_CYAN}44`,
//                       }}
//                     >
//                       {user.role.toUpperCase()}
//                     </Box>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleDelete(user._id)}
//                       sx={{
//                         borderRadius: "8px",
//                         color: "#FF4D4D",
//                         borderColor: "rgba(255, 77, 77, 0.4)",
//                         backgroundColor: "transparent",
//                         fontWeight: "bold",
//                         "&:hover": {
//                           backgroundColor: "rgba(255, 77, 77, 0.15)",
//                           borderColor: "#FF4D4D",
//                           transform: "translateY(-2px)",
//                           boxShadow: "0px 4px 12px rgba(255, 77, 77, 0.2)",
//                         },
//                         transition: "all 0.2s",
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// export default ShowUsers;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

if (!document.getElementById("monks-fonts")) {
  const l = document.createElement("link");
  l.id = "monks-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const G = {
  black: "#000000",
  black2: "#0a0a0a",
  gold: "#C9A84C",
  white: "#FFFFFF",
  w80: "rgba(255,255,255,0.80)",
  w55: "rgba(255,255,255,0.55)",
  w30: "rgba(255,255,255,0.30)",
  border: "rgba(255,255,255,0.08)",
  bGold: "rgba(201,168,76,0.30)",
};

function LoadingScreen() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
      background: G.black, minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "20px",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: "48px", height: "48px",
        border: `2px solid ${G.border}`,
        borderTop: `2px solid ${G.gold}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: "13px",
        color: G.w30, letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        Loading users…
      </p>
    </motion.div>
  );
}

function ConfirmDialog({ open, onConfirm, onCancel, userName }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            style={{
              position: "fixed", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)", zIndex: 1001,
              background: G.black2, border: `1px solid rgba(248,113,113,0.25)`,
              borderRadius: "16px", padding: "36px", width: "100%",
              maxWidth: "380px", textAlign: "center",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, #f87171, transparent)",
            }} />
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>⚠️</div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem", fontWeight: 700, color: G.white,
              marginBottom: "10px",
            }}>
              Delete User?
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "13px",
              color: G.w55, marginBottom: "24px", lineHeight: 1.7,
            }}>
              Are you sure you want to permanently delete{" "}
              <strong>{userName}</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <motion.button
                onClick={onCancel}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "12px", border: "none",
                  background: "rgba(255,255,255,0.05)", borderRadius: "8px",
                  color: G.w30, fontFamily: "'Inter', sans-serif",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = G.white)}
                onMouseLeave={(e) => (e.currentTarget.style.color = G.w30)}
              >
                Keep
              </motion.button>
              <motion.button
                onClick={onConfirm}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "12px", border: "none",
                  background: "#f87171", borderRadius: "8px",
                  color: G.white, fontFamily: "'Inter', sans-serif",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function UserRow({ user, onDelete, index }) {
  const [hov, setHov] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(201,168,76,0.05)" : "transparent",
          transition: "background 0.3s",
        }}
      >
        <td style={{
          padding: "16px 20px", color: G.w80, fontSize: "14px", fontWeight: 500,
          borderBottom: `1px solid ${G.border}`,
        }}>
          {user.name}
        </td>
        <td style={{
          padding: "16px 20px", color: G.w55, fontSize: "13px",
          borderBottom: `1px solid ${G.border}`,
        }}>
          {user.email}
        </td>
        <td style={{
          padding: "16px 20px", borderBottom: `1px solid ${G.border}`,
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: user.role === "exhibitor"
                ? "rgba(201,168,76,0.12)" : "rgba(74,222,128,0.12)",
              border: `1px solid ${user.role === "exhibitor" ? G.bGold : "rgba(74,222,128,0.3)"}`,
              borderRadius: "6px", padding: "4px 12px",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: user.role === "exhibitor" ? G.gold : "#4ade80",
            }}
          >
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: user.role === "exhibitor" ? G.gold : "#4ade80",
            }} />
            {user.role}
          </motion.div>
        </td>
        <td style={{
          padding: "16px 20px", textAlign: "center",
          borderBottom: `1px solid ${G.border}`,
        }}>
          <motion.button
            onClick={() => setConfirm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "6px 14px", background: "rgba(248,113,113,0.12)",
              border: "1px solid rgba(248,113,113,0.3)", borderRadius: "6px",
              color: "#f87171", fontFamily: "'Inter', sans-serif",
              fontSize: "12px", fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(248,113,113,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(248,113,113,0.12)";
            }}
          >
            Delete
          </motion.button>
        </td>
      </motion.tr>
      <ConfirmDialog
        open={confirm}
        onConfirm={() => { setConfirm(false); onDelete(user._id); }}
        onCancel={() => setConfirm(false)}
        userName={user.name}
      />
    </>
  );
}

export default function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [alert, setAlert] = useState({ text: "", success: true });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/signup");
      setUsers(res.data);
    } catch {
      setAlert({ text: "Failed to fetch users", success: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setUsers((p) => p.filter((u) => u._id !== id));
      setAlert({ text: "User deleted successfully", success: true });
    } catch {
      setAlert({ text: "Failed to delete user", success: false });
    }
    setTimeout(() => setAlert({ text: "", success: true }), 3000);
  };

  const filtered = filter === "all" ? users : users.filter((u) => u.role === filter);

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ background: G.black, minHeight: "100vh", padding: "80px 40px" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <AnimatePresence>
        {alert.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: "90px", left: "50%",
              transform: "translateX(-50%)", zIndex: 9999,
              background: alert.success ? "rgba(201,168,76,0.12)" : "rgba(248,113,113,0.12)",
              border: `1px solid ${alert.success ? G.bGold : "rgba(248,113,113,0.35)"}`,
              borderRadius: "10px", padding: "13px 24px",
              fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600,
              color: alert.success ? G.gold : "#f87171",
              backdropFilter: "blur(12px)",
            }}
          >
            {alert.success ? "✓  " : "✕  "}{alert.text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
            color: G.white, lineHeight: 1.1, marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}>
            User <span style={{ color: G.gold, fontStyle: "italic" }}>Management</span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "14px",
            color: G.w55, lineHeight: 1.75,
          }}>
            Manage all registered users and their roles
          </p>
        </div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px",
          }}
        >
          {["all", "attendee", "exhibitor"].map((role) => (
            <motion.button
              key={role}
              onClick={() => setFilter(role)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 18px", borderRadius: "8px",
                background: filter === role ? G.gold : "rgba(201,168,76,0.1)",
                border: `1px solid ${filter === role ? G.gold : G.bGold}`,
                color: filter === role ? "#000" : G.gold,
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.3s",
              }}
            >
              {role}
            </motion.button>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          style={{
            background: G.black2, border: `1px solid ${G.border}`,
            borderRadius: "16px", overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{
                background: `linear-gradient(90deg, ${G.black2}, ${G.black})`,
                borderBottom: `2px solid ${G.bGold}`,
              }}>
                {["Name", "Email", "Role", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "20px", textAlign: h === "Actions" ? "center" : "left",
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "12px", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: G.gold,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <UserRow key={u._id} user={u} onDelete={handleDelete} index={i} />
              ))}
            </tbody>
          </table>
        </motion.div>

      </motion.div>
    </div>
  );
}