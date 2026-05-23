// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Stack,
//   Typography,
//   Menu,
//   MenuItem,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useNavigate, useLocation } from "react-router-dom";
// import Logo from "../../assets/LogoName.png";

// export const TopNav = ({ onNavOpen }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [admin, setAdmin] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

//   const TOP_NAV_HEIGHT = isMobile ? 70 : 90;

//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("adminUser");
//     let parsedAdmin = null;

//     if (storedAdmin) {
//       try {
//         parsedAdmin = JSON.parse(storedAdmin);
//         setAdmin(parsedAdmin);
//       } catch (err) {
//         console.error("Error parsing admin data:", err);
//       }
//     }

//     const params = new URLSearchParams(location.search);
//     const nameFromURL = params.get("name");
//     const idFromURL = params.get("id");
//     if (nameFromURL) {
//       const newAdmin = {
//         name: decodeURIComponent(nameFromURL),
//         id: idFromURL || parsedAdmin?.id || parsedAdmin?._id || null,
//       };
//       setAdmin(newAdmin);
//       localStorage.setItem("adminUser", JSON.stringify(newAdmin));
//       window.history.replaceState({}, document.title, window.location.pathname);
//     }

//     const handleStorageChange = () => {
//       const updatedAdmin = localStorage.getItem("adminUser");
//       setAdmin(updatedAdmin ? JSON.parse(updatedAdmin) : null);
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [location]);

//   const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleLogout = () => {
//     localStorage.removeItem("adminUser");
//     setAdmin(null);
//     window.dispatchEvent(new Event("storage"));
//     window.location.replace("http://localhost:5173/");
//   };

//   const handleLogoutClick = () => {
//     handleMenuClose();
//     setTimeout(() => handleLogout(), 200);
//   };

//   const handleChangePassword = () => {
//     handleMenuClose();
//     const adminId = admin?._id || admin?.id;
//     navigate(adminId ? `/changePass?id=${adminId}` : "/changePass");
//   };

//   return (
//     <Box
//       component="header"
//       sx={{
//         background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//         color: "white",
//         position: "fixed",
//         top: 0,
//         width: "100%",
//         zIndex: (theme) => theme.zIndex.appBar,
//         boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
//         borderBottom: "1px solid rgba(76, 201, 240, 0.2)",
//       }}
//     >
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{
//           minHeight: TOP_NAV_HEIGHT,
//           px: { xs: 2, sm: 4 },
//         }}
//       >
//         {/* Hamburger+ Logo */}
//         <Stack direction="row" alignItems="center" spacing={1}>
//           {!lgUp && (
//             <IconButton
//               onClick={onNavOpen}
//               sx={{
//                 color: "#4CC9F0",
//                 backgroundColor: "rgba(76, 201, 240, 0.05)",
//                 mr: 1,
//                 "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.15)" },
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}

//           <Box
//             onClick={() => navigate("/")}
//             sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
//           >
//             <img
//               src={Logo}
//               alt="Logo"
//               style={{
//                 height: isMobile ? "35px" : "50px",
//                 transition: "0.3s",
//               }}
//             />
//           </Box>
//         </Stack>

//         {/*Admin Dropdown */}
//         <Stack direction="row" alignItems="center">
//           <IconButton
//             onClick={handleMenuOpen}
//             sx={{
//               color: "white",
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 0.5, sm: 1 },
//               backgroundColor: "rgba(255,255,255,0.05)",
//               borderRadius: "10px",
//               px: { xs: 1, sm: 2 },
//               py: 0.8,
//               border: "1px solid rgba(76, 201, 240, 0.3)",
//               "&:hover": {
//                 backgroundColor: "rgba(76, 201, 240, 0.1)",
//                 borderColor: "#4CC9F0",
//               },
//             }}
//           >
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: 600,
//                 fontSize: { xs: "0.75rem", sm: "0.9rem" },
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {isMobile ? "Admin" : admin?.name ? `Admin: ${admin.name}` : "Admin Panel"}
//             </Typography>
//             <ArrowDropDownIcon
//               sx={{ color: "#4CC9F0", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
//             />
//           </IconButton>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             transformOrigin={{ vertical: "top", horizontal: "right" }}
//             disableScrollLock
//             PaperProps={{
//               sx: {
//                 mt: 1.5,
//                 borderRadius: 2,
//                 minWidth: 160,
//                 bgcolor: "#1B263B",
//                 color: "white",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
//                 "& .MuiMenuItem-root": {
//                   fontSize: "0.85rem",
//                   py: 1.2,
//                   "&:hover": { bgcolor: "rgba(76, 201, 240, 0.1)", color: "#4CC9F0" },
//                 },
//               },
//             }}
//           >
//             <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//             <MenuItem
//               onClick={handleLogoutClick}
//               sx={{
//                 color: "#FF4D4D",
//                 fontWeight: "bold",
//                 "&:hover": { bgcolor: "rgba(255, 77, 77, 0.1) !important" },
//               }}
//             >
//               Logout
//             </MenuItem>
//           </Menu>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/LogoNameTagline.jpg";

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

/* ---- ICONS ---- */
const IconMenu = ({ size = 24, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconChevronDown = ({ size = 18, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconLock = ({ size = 16, color = G.w55 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconLogout = ({ size = 16, color = "#ff4d4d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

export const TopNav = ({ onNavOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const TOP_NAV_HEIGHT = isMobile ? 70 : 80;

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    let parsedAdmin = null;

    if (storedAdmin) {
      try {
        parsedAdmin = JSON.parse(storedAdmin);
        setAdmin(parsedAdmin);
      } catch (err) {
        console.error("Error parsing admin data:", err);
      }
    }

    const params = new URLSearchParams(location.search);
    const nameFromURL = params.get("name");
    const idFromURL = params.get("id");
    if (nameFromURL) {
      const newAdmin = {
        name: decodeURIComponent(nameFromURL),
        id: idFromURL || parsedAdmin?.id || parsedAdmin?._id || null,
      };
      setAdmin(newAdmin);
      localStorage.setItem("adminUser", JSON.stringify(newAdmin));
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const handleStorageChange = () => {
      const updatedAdmin = localStorage.getItem("adminUser");
      setAdmin(updatedAdmin ? JSON.parse(updatedAdmin) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setAdmin(null);
    window.dispatchEvent(new Event("storage"));
    window.location.replace("http://localhost:5173/");
  };

  const handleLogoutClick = () => {
    setMenuOpen(false);
    setTimeout(() => handleLogout(), 200);
  };

  const handleChangePassword = () => {
    setMenuOpen(false);
    const adminId = admin?._id || admin?.id;
    navigate(adminId ? `/changePass?id=${adminId}` : "/changePass");
  };

  return (
    <header
      style={{
        background: G.black2,
        color: G.white,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 200,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        borderBottom: `1px solid ${G.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: TOP_NAV_HEIGHT,
          padding: isMobile ? "0 16px" : "0 32px",
        }}
      >
        {/* Left: Hamburger + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!isDesktop && (
            <button
              onClick={onNavOpen}
              style={{
                background: "rgba(201,168,76,0.05)",
                border: `1px solid ${G.border}`,
                borderRadius: "10px",
                padding: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,168,76,0.12)";
                e.currentTarget.style.borderColor = G.bGold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                e.currentTarget.style.borderColor = G.border;
              }}
            >
              <IconMenu size={22} />
            </button>
          )}

          <div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: isMobile ? "32px" : "44px",
                transition: "0.3s",
              }}
            />
          </div>
        </div>

        {/* Right: Admin Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${G.border}`,
              borderRadius: "10px",
              padding: isMobile ? "8px 12px" : "10px 16px",
              cursor: "pointer",
              color: G.white,
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "0.75rem" : "0.85rem",
              fontWeight: 600,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.08)";
              e.currentTarget.style.borderColor = G.bGold;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = G.border;
            }}
          >
            <span>
              {isMobile ? "Admin" : admin?.name ? `Admin: ${admin.name}` : "Admin Panel"}
            </span>
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IconChevronDown size={16} />
            </motion.div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop to close */}
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 1,
                  }}
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    minWidth: "180px",
                    background: G.black2,
                    border: `1px solid ${G.border}`,
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    zIndex: 2,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={handleChangePassword}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      border: "none",
                      color: G.w80,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                      e.currentTarget.style.color = G.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = G.w80;
                    }}
                  >
                    <IconLock size={16} color={G.w55} />
                    Change Password
                  </button>
                  <div style={{ height: "1px", background: G.border, margin: "0 12px" }} />
                  <button
                    onClick={handleLogoutClick}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      border: "none",
                      color: "#ff4d4d",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,77,77,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <IconLogout size={16} color="#ff4d4d" />
                    Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};