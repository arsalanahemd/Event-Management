// import React, { useState, useEffect, useMemo } from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { Link, useNavigate } from "react-router-dom";
// import { GlobalStyles } from "@mui/system";
// import Logo from '../assets/LogoName.png';


// function Nav() {
//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const toggleDrawer = (newOpen) => () => setOpen(newOpen);

//   useEffect(() => {
//     const updateUser = () => {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const storedExhibitee = JSON.parse(localStorage.getItem("exhibitee"));
//       setUser(storedUser || storedExhibitee);
//     };
//     window.addEventListener("storage", updateUser);
//     updateUser();
//     return () => window.removeEventListener("storage", updateUser);
//   }, []);

//   const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("exhibitee");
//     setUser(null);
//     handleMenuClose();
//     navigate("/");
//   };

//   const handleChangePassword = () => {
//     handleMenuClose();
//     const userId = user?.id || user?._id;
//     navigate(userId ? `/changePass?id=${userId}` : "/changePass");
//   };

//   const handleMessages = () => {
//     const userId = user?.id || user?._id;
//     navigate(userId ? `/showmsg?userId=${userId}` : "/showmsg");
//   };

//   const handleCompany = () => {
//     const userId = user?.id || user?._id;
//     navigate(userId ? `/showCompany?userId=${userId}` : "/showCompany");
//   };
//   const handleRating = () => {
//     handleMenuClose();
//     navigate("/rating");
//   };

//   const menuItems = useMemo(() => {
//     const baseItems = [
//       { name: "Home", path: "/" },
//       { name: "About", path: "/about" },
//       { name: "Events", path: "/events" },
//       { name: "Contact", path: "/contact" },
//     ];

//     if (user?.role === "attendee") {
//       baseItems.push({ name: "Your Registration", path: "/your-registration" });
//     }

//     if (user?.role === "exhibitor") {
//       baseItems.push(
//         { name: "Add Company", path: "/addYourCompany" },
//         { name: "Your Participations", path: "/Yourparticipation" }
//       );
//     }


//     return baseItems;
//   }, [user]);

//   return (
//     <>
//       <GlobalStyles
//         styles={{
//           "@import":
//             "url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap')",
//         }}
//       />
//       <AppBar
//         position="sticky"
//         sx={{
//           background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//           boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             py: 2, // <-- increased from 1 to 2 for more height
//             px: { xs: 2, sm: 6 },
//             minHeight: 80, // <-- optional: explicitly set toolbar height
//           }}
//         >
//           {/* LOGO */}
//           <Link to="/">
//             <Box
//               component="img"
//               src={Logo}
//               alt="Eventify Logo"
//               sx={{ height: 50, cursor: "pointer" }}
//             />
//           </Link>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
//             {menuItems.map((item) => (
//               <Button
//                 key={item.name}
//                 component={Link}
//                 to={item.path}
//                 sx={{
//                   fontFamily: "'Poppins', sans-serif",
//                   textTransform: "none",
//                   fontSize: "1rem",
//                   position: "relative",
//                   color: "#E0E1DD",

//                   "&:hover": {
//                     color: "#4CC9F0",
//                   },

//                   "&:hover::after": {
//                     width: "100%",
//                   },

//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     width: 0,
//                     height: "2px",
//                     backgroundColor: "#4CC9F0",
//                     transition: "width 0.3s ease",
//                   },
//                 }}
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Box>

//           {/* Auth / User */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
//             {!user ? (
//               <>
//                 <Button
//                   component={Link}
//                   to="/login"
//                   sx={{
//                     textTransform: "none",
//                     color: "#E0E1DD",
//                     "&:hover": {
//                       color: "#4CC9F0",
//                     },
//                   }}
//                 >
//                   Login
//                 </Button>

//                 <Button
//                   component={Link}
//                   to="/signup"
//                   variant="outlined"
//                   sx={{
//                     color: "#4CC9F0",
//                     borderColor: "#4CC9F0",
//                     textTransform: "none",
//                     "&:hover": {
//                       backgroundColor: "#4CC9F0",
//                       color: "#0D1B2A",
//                     },
//                   }}
//                 >
//                   Signup
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   onClick={handleMenuClick}
//                   endIcon={<ArrowDropDownIcon />}
//                   sx={{
//                     textTransform: "none",
//                     color: "#E0E1DD",
//                     "&:hover": {
//                       color: "#4CC9F0",
//                     },
//                   }}
//                 >
//                   Welcome : {user.name || user.fullName || "User"}
//                 </Button>

//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                   PaperProps={{
//                     sx: {
//                       backgroundColor: "#1B263B",
//                       color: "#E0E1DD",
//                     },
//                   }}
//                 >
//                   <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//                   <MenuItem onClick={handleRating}>
//                     Rate Us
//                   </MenuItem>
//                   <MenuItem onClick={handleMessages}>Your Messages</MenuItem>
//                   {user?.role === "exhibitor" && (
//                     <MenuItem onClick={handleCompany}>Your Company</MenuItem>
//                   )}
//                   <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                 </Menu>
//               </>
//             )}
//           </Box>

//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="start"
//             aria-label="menu"
//             onClick={toggleDrawer(true)}
//             sx={{
//               display: { xs: "block", md: "none" },
//               color: "#E0E1DD",
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>


//       <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
//         <Box
//           sx={{
//             width: 240,
//             background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
//             height: "100%",
//             color: "#E0E1DD",
//           }}
//           role="presentation"
//           onKeyDown={toggleDrawer(false)}
//         >
//           {/* Drawer Header */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: { xs: "center", sm: "flex-start" },
//               p: 2,
//               borderBottom: "1px solid rgba(224,225,221,0.2)",
//             }}
//           >
//             <Box
//               component="img"
//               src={Logo}
//               alt="EventSphere Logo"
//               sx={{
//                 width: { xs: 150, sm: 200 },
//                 height: "auto",
//               }}
//             />
//           </Box>

//           {/* Menu Items */}
//           <List>
//             {menuItems.map((item) => (
//               <ListItem key={item.name} disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to={item.path}
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     color: "#E0E1DD",
//                     "&:hover": {
//                       backgroundColor: "rgba(76,201,240,0.15)",
//                       color: "#4CC9F0",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={item.name}
//                     primaryTypographyProps={{
//                       fontFamily: "'Poppins', sans-serif",
//                       fontSize: "1rem",
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>

//           <Divider sx={{ bgcolor: "rgba(224,225,221,0.2)" }} />

//           {/* Auth / User Actions */}
//           <Box sx={{ p: 2 }}>
//             {!user ? (
//               <>
//                 <Button
//                   fullWidth
//                   component={Link}
//                   to="/login"
//                   variant="outlined"
//                   sx={{
//                     color: "#4CC9F0",
//                     borderColor: "#4CC9F0",
//                     mb: 1,
//                     "&:hover": {
//                       backgroundColor: "#4CC9F0",
//                       color: "#0D1B2A",
//                     },
//                   }}
//                 >
//                   Login
//                 </Button>

//                 <Button
//                   fullWidth
//                   component={Link}
//                   to="/signup"
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#4CC9F0",
//                     color: "#0D1B2A",
//                     "&:hover": {
//                       backgroundColor: "#38BDF8",
//                     },
//                   }}
//                 >
//                   Signup
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Typography sx={{ mb: 1, color: "#E0E1DD" }}>
//                   {user.name || user.fullName || "User"}
//                 </Typography>

//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   sx={{
//                     mb: 1,
//                     color: "#4CC9F0",
//                     borderColor: "#4CC9F0",
//                     "&:hover": {
//                       backgroundColor: "#4CC9F0",
//                       color: "#0D1B2A",
//                     },
//                   }}
//                   onClick={() => {
//                     handleChangePassword();
//                     setOpen(false);
//                   }}
//                 >
//                   Change Password
//                 </Button>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     mb: 1,
//                     backgroundColor: "#1B263B",
//                     color: "#E0E1DD",
//                     "&:hover": {
//                       backgroundColor: "#FFD166",
//                       color: "#0D1B2A",
//                     },
//                   }}
//                   onClick={() => {
//                     navigate("/rating");
//                     setOpen(false);
//                   }}
//                 >
//                   Rate Us
//                 </Button>

//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     mb: 1,
//                     backgroundColor: "#1B263B",
//                     color: "#E0E1DD",
//                     "&:hover": {
//                       backgroundColor: "#4CC9F0",
//                       color: "#0D1B2A",
//                     },
//                   }}
//                   onClick={() => {
//                     handleMessages();
//                     setOpen(false);
//                   }}
//                 >
//                   Your Messages
//                 </Button>

//                 {user?.role === "exhibitor" && (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       mb: 1,
//                       backgroundColor: "#1B263B",
//                       color: "#E0E1DD",
//                       "&:hover": {
//                         backgroundColor: "#4CC9F0",
//                         color: "#0D1B2A",
//                       },
//                     }}
//                     onClick={() => {
//                       handleCompany();
//                       setOpen(false);
//                     }}
//                   >
//                     Your Company
//                   </Button>
//                 )}

//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#0D1B2A",
//                     color: "#E0E1DD",
//                     "&:hover": {
//                       backgroundColor: "#EF4444",
//                       color: "#fff",
//                     },
//                   }}
//                   onClick={() => {
//                     handleLogout();
//                     setOpen(false);
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Box>
//       </Drawer>

//     </>
//   );
// }

// export default Nav;
// import React from "react";

// export default function Navbar({ onNavigate }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar-inner">
//         <a className="navbar-logo" onClick={() => onNavigate("/")} href="#">
//           Event<span>Sphere</span>
//         </a>
//         <ul className="navbar-links">
//           <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("/"); }}>Home</a></li>
//           <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("/about"); }}>About</a></li>
//           <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("/speakers"); }}>Speakers</a></li>
//           <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("/gallery"); }}>Gallery</a></li>
//           <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("/contact"); }}>Contact</a></li>
//         </ul>
//         <button className="btn-gold" onClick={() => onNavigate("/events")}>
//           Get Tickets
//         </button>
//       </div>
//     </nav>
//   );
// }
// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import "../pages/home.css";

// export default function Navbar() {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const updateUser = () => {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const storedExhibitee = JSON.parse(
//         localStorage.getItem("exhibitee")
//       );

//       setUser(storedUser || storedExhibitee);
//     };

//     updateUser();

//     window.addEventListener("storage", updateUser);

//     return () => {
//       window.removeEventListener("storage", updateUser);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("exhibitee");

//     setUser(null);
//     setDropdownOpen(false);

//     navigate("/");
//   };

//   const handleChangePassword = () => {
//     const userId = user?.id || user?._id;

//     setDropdownOpen(false);

//     navigate(userId ? `/changePass?id=${userId}` : "/changePass");
//   };

//   const handleMessages = () => {
//     const userId = user?.id || user?._id;

//     setDropdownOpen(false);

//     navigate(userId ? `/showmsg?userId=${userId}` : "/showmsg");
//   };

//   const handleCompany = () => {
//     const userId = user?.id || user?._id;

//     setDropdownOpen(false);

//     navigate(userId ? `/showCompany?userId=${userId}` : "/showCompany");
//   };

//   const handleRating = () => {
//     setDropdownOpen(false);
//     navigate("/rating");
//   };

//   const menuItems = useMemo(() => {
//     const baseItems = [
//       { name: "Home", path: "/" },
//       { name: "About", path: "/about" },
//       { name: "Speakers", path: "/speakers" },
//       { name: "Gallery", path: "/gallery" },
//       { name: "Contact", path: "/contact" },
//       { name: "Events", path: "/events" },
//     ];

//     if (user?.role === "attendee") {
//       baseItems.push({
//         name: "Your Registration",
//         path: "/your-registration",
//       });
//     }

//     if (user?.role === "exhibitor") {
//       baseItems.push(
//         {
//           name: "Add Company",
//           path: "/addYourCompany",
//         },
//         {
//           name: "Your Participations",
//           path: "/Yourparticipation",
//         }
//       );
//     }

//     return baseItems;
//   }, [user]);

//   return (
//     <nav className="navbar">
//       <div className="navbar-inner">
//         {/* LOGO */}
//         <a
//           href="#"
//           className="navbar-logo"
//           onClick={(e) => {
//             e.preventDefault();
//             navigate("/");
//           }}
//         >
//           Event<span>Sphere</span>
//         </a>

//         {/* DESKTOP MENU */}
//         <ul className="navbar-links">
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <a
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate(item.path);
//                 }}
//               >
//                 {item.name}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* RIGHT SIDE */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "12px",
//           }}
//         >
//           {!user ? (
//             <>
//               <button
//                 className="btn-gold"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>

//               <button
//                 className="btn-gold"
//                 onClick={() => navigate("/signup")}
//               >
//                 Signup
//               </button>
//             </>
//           ) : (
//             <div
//               style={{
//                 position: "relative",
//               }}
//             >
//               <button
//                 className="btn-gold"
//                 onClick={() =>
//                   setDropdownOpen(!dropdownOpen)
//                 }
//               >
//                 {user.name || user.fullName || "User"} ▼
//               </button>

//               {dropdownOpen && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "55px",
//                     right: 0,
//                     background: "#111",
//                     border: "1px solid #d4af37",
//                     borderRadius: "10px",
//                     minWidth: "220px",
//                     overflow: "hidden",
//                     zIndex: 999,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item"
//                     onClick={handleChangePassword}
//                   >
//                     Change Password
//                   </button>

//                   <button
//                     className="dropdown-item"
//                     onClick={handleRating}
//                   >
//                     Rate Us
//                   </button>

//                   <button
//                     className="dropdown-item"
//                     onClick={handleMessages}
//                   >
//                     Your Messages
//                   </button>

//                   {user?.role === "exhibitor" && (
//                     <button
//                       className="dropdown-item"
//                       onClick={handleCompany}
//                     >
//                       Your Company
//                     </button>
//                   )}

//                   <button
//                     className="dropdown-item logout"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* MOBILE MENU BUTTON */}
//           <button
//             className="mobile-menu-btn"
//             onClick={() =>
//               setMobileMenu(!mobileMenu)
//             }
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenu && (
//         <div className="mobile-menu">
//           {menuItems.map((item) => (
//             <a
//               key={item.name}
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate(item.path);
//                 setMobileMenu(false);
//               }}
//             >
//               {item.name}
//             </a>
//           ))}

//           {!user ? (
//             <>
//               <button
//                 className="btn-gold"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>

//               <button
//                 className="btn-gold"
//                 onClick={() => navigate("/signup")}
//               >
//                 Signup
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 className="btn-gold"
//                 onClick={handleChangePassword}
//               >
//                 Change Password
//               </button>

//               <button
//                 className="btn-gold"
//                 onClick={handleRating}
//               >
//                 Rate Us
//               </button>

//               <button
//                 className="btn-gold"
//                 onClick={handleMessages}
//               >
//                 Your Messages
//               </button>

//               {user?.role === "exhibitor" && (
//                 <button
//                   className="btn-gold"
//                   onClick={handleCompany}
//                 >
//                   Your Company
//                 </button>
//               )}

//               <button
//                 className="btn-gold"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/LogoNameTagline.jpg";

/* ---- FONT INJECT ---- */
if (!document.getElementById("monks-fonts")) {
  const l = document.createElement("link");
  l.id = "monks-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(l);
}

/* ---- SHARED TOKENS ---- */
const G = {
  black:   "#000000",
  black2:  "#0a0a0a",
  black3:  "#111111",
  gold:    "#C9A84C",
  goldLt:  "#dcc07e",
  white:   "#FFFFFF",
  w80:     "rgba(255,255,255,0.80)",
  w55:     "rgba(255,255,255,0.55)",
  w30:     "rgba(255,255,255,0.30)",
  w10:     "rgba(255,255,255,0.10)",
  border:  "rgba(255,255,255,0.08)",
  bGold:   "rgba(201,168,76,0.30)",
};

export default function Nav() {
  /* ---- ORIGINAL LOGIC — UNCHANGED ---- */
  const [open, setOpen] = useState(false);           // mobile drawer
  const [user, setUser] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);   // desktop dropdown
  const navigate  = useNavigate();
  const location  = useLocation();
  const dropRef   = useRef(null);

  useEffect(() => {
    const updateUser = () => {
      const storedUser     = JSON.parse(localStorage.getItem("user"));
      const storedExhibitee = JSON.parse(localStorage.getItem("exhibitee"));
      setUser(storedUser || storedExhibitee);
    };
    window.addEventListener("storage", updateUser);
    updateUser();
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("exhibitee");
    setUser(null);
    setDropOpen(false);
    setOpen(false);
    navigate("/");
  };

  const handleChangePassword = () => {
    setDropOpen(false);
    setOpen(false);
    const userId = user?.id || user?._id;
    navigate(userId ? `/changePass?id=${userId}` : "/changePass");
  };

  const handleMessages = () => {
    setOpen(false);
    const userId = user?.id || user?._id;
    navigate(userId ? `/showmsg?userId=${userId}` : "/showmsg");
  };

  const handleCompany = () => {
    setOpen(false);
    const userId = user?.id || user?._id;
    navigate(userId ? `/showCompany?userId=${userId}` : "/showCompany");
  };

  const handleRating = () => {
    setDropOpen(false);
    setOpen(false);
    navigate("/rating");
  };

  const menuItems = useMemo(() => {
    const base = [
      { name: "Home",   path: "/" },
      { name: "About",  path: "/about" },
      { name: "Events", path: "/events" },
      { name: "Contact",path: "/contact" },
    ];
    if (user?.role === "attendee")
      base.push({ name: "Your Registration", path: "/your-registration" });
    if (user?.role === "exhibitor")
      base.push(
        { name: "Add Company",          path: "/addYourCompany" },
        { name: "Your Participations",  path: "/Yourparticipation" }
      );
    return base;
  }, [user]);
  /* ---- END ORIGINAL LOGIC ---- */

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const dropItems = [
    { label: "Change Password", action: handleChangePassword },
    { label: "Rate Us",         action: handleRating },
    { label: "Your Messages",   action: handleMessages },
    ...(user?.role === "exhibitor"
      ? [{ label: "Your Company", action: handleCompany }]
      : []),
    { label: "Logout", action: handleLogout, danger: true },
  ];

  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: `1px solid ${G.border}`,
        }}
      >
        {/* Gold top line */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 40px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <motion.img
              src={Logo}
              alt="EventSphere"
              style={{ height: "44px", cursor: "pointer" }}
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {menuItems.map((item) => (
              <NavLink key={item.name} item={item} active={isActive(item.path)} />
            ))}
          </div>

          {/* DESKTOP AUTH */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            className="desktop-auth"
          >
            {!user ? (
              <>
                <Link
                  to="/login"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: G.w80,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = G.white)}
                  onMouseLeave={(e) => (e.target.style.color = G.w80)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#000",
                    textDecoration: "none",
                    padding: "9px 22px",
                    borderRadius: "6px",
                    background: G.gold,
                    letterSpacing: "0.04em",
                    transition: "background 0.2s, transform 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = G.goldLt;
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = G.gold;
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              /* User dropdown */
              <div ref={dropRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: dropOpen ? "rgba(201,168,76,0.1)" : "transparent",
                    border: `1px solid ${dropOpen ? G.bGold : G.border}`,
                    borderRadius: "8px",
                    padding: "8px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    color: G.white,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = G.bGold;
                    e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    if (!dropOpen) {
                      e.currentTarget.style.borderColor = G.border;
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${G.gold}, rgba(201,168,76,0.4))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#000",
                      flexShrink: 0,
                    }}
                  >
                    {(user.name || user.fullName || "U").charAt(0).toUpperCase()}
                  </div>
                  <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name || user.fullName || "User"}
                  </span>
                  {/* Chevron */}
                  <motion.span
                    animate={{ rotate: dropOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ fontSize: "10px", color: G.w55 }}
                  >
                    ▼
                  </motion.span>
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        minWidth: "190px",
                        background: "#111",
                        border: `1px solid ${G.border}`,
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* User info header */}
                      <div
                        style={{
                          padding: "14px 16px",
                          borderBottom: `1px solid ${G.border}`,
                        }}
                      >
                        <div style={{ fontSize: "11px", color: G.w30, fontFamily: "'Inter',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
                          Signed in as
                        </div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: G.white, fontFamily: "'Inter',sans-serif" }}>
                          {user.name || user.fullName || "User"}
                        </div>
                        <div style={{ fontSize: "11px", color: G.gold, fontFamily: "'Inter',sans-serif", marginTop: "2px", textTransform: "capitalize" }}>
                          {user.role || "member"}
                        </div>
                      </div>

                      {/* Items */}
                      {dropItems.map((d, i) => (
                        <button
                          key={i}
                          onClick={d.action}
                          style={{
                            width: "100%",
                            display: "block",
                            padding: "11px 16px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: d.danger ? "#f87171" : G.w80,
                            textAlign: "left",
                            borderTop: i === dropItems.length - 1 ? `1px solid ${G.border}` : "none",
                            transition: "background 0.15s, color 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = d.danger
                              ? "rgba(248,113,113,0.08)"
                              : "rgba(201,168,76,0.07)";
                            e.currentTarget.style.color = d.danger ? "#f87171" : G.white;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = d.danger ? "#f87171" : G.w80;
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            style={{
              display: "none",
              background: "transparent",
              border: `1px solid ${G.border}`,
              borderRadius: "8px",
              padding: "8px 10px",
              cursor: "pointer",
              color: G.white,
              lineHeight: 1,
            }}
            id="mob-hamburger"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div style={{ height: "72px" }} />

      {/* ===================== MOBILE DRAWER ===================== */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1001,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 1002,
                width: "280px",
                background: "#0a0a0a",
                borderLeft: `1px solid ${G.border}`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Gold top line */}
              <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${G.gold})`, flexShrink: 0 }} />

              {/* Drawer header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  borderBottom: `1px solid ${G.border}`,
                  flexShrink: 0,
                }}
              >
                <img src={Logo} alt="EventSphere" style={{ height: "36px" }} />
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${G.border}`,
                    borderRadius: "6px",
                    padding: "6px 9px",
                    cursor: "pointer",
                    color: G.w55,
                    fontSize: "14px",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div style={{ padding: "12px 12px 0", flexShrink: 0 }}>
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        padding: "12px 14px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: isActive(item.path) ? 600 : 500,
                        color: isActive(item.path) ? G.gold : G.w80,
                        textDecoration: "none",
                        borderRadius: "8px",
                        marginBottom: "2px",
                        background: isActive(item.path) ? "rgba(201,168,76,0.08)" : "transparent",
                        borderLeft: isActive(item.path) ? `2px solid ${G.gold}` : "2px solid transparent",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(item.path)) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                          e.currentTarget.style.color = G.white;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(item.path)) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = G.w80;
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: G.border, margin: "16px 24px" }} />

              {/* Auth section */}
              <div style={{ padding: "0 12px", flex: 1, overflow: "auto" }}>
                {!user ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        padding: "13px",
                        textAlign: "center",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: G.white,
                        textDecoration: "none",
                        borderRadius: "8px",
                        border: `1px solid ${G.border}`,
                        letterSpacing: "0.04em",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = G.bGold)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = G.border)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        padding: "13px",
                        textAlign: "center",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#000",
                        textDecoration: "none",
                        borderRadius: "8px",
                        background: G.gold,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {/* User pill */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 14px",
                        background: "rgba(201,168,76,0.06)",
                        border: `1px solid ${G.bGold}`,
                        borderRadius: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px", height: "32px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${G.gold}, rgba(201,168,76,0.4))`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: 700, color: "#000", flexShrink: 0,
                        }}
                      >
                        {(user.name || user.fullName || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", fontWeight: 600, color: G.white }}>
                          {user.name || user.fullName || "User"}
                        </div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: G.gold, textTransform: "capitalize" }}>
                          {user.role || "member"}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    {dropItems.map((d, i) => (
                      <button
                        key={i}
                        onClick={d.action}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          background: "transparent",
                          border: `1px solid ${d.danger ? "rgba(248,113,113,0.2)" : G.border}`,
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: d.danger ? "#f87171" : G.w80,
                          textAlign: "left",
                          transition: "all 0.2s",
                          marginBottom: d.danger ? "4px" : "0",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = d.danger ? "rgba(248,113,113,0.08)" : "rgba(201,168,76,0.07)";
                          e.currentTarget.style.borderColor = d.danger ? "rgba(248,113,113,0.4)" : G.bGold;
                          e.currentTarget.style.color = d.danger ? "#f87171" : G.white;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.borderColor = d.danger ? "rgba(248,113,113,0.2)" : G.border;
                          e.currentTarget.style.color = d.danger ? "#f87171" : G.w80;
                        }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ height: "24px" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===================== RESPONSIVE STYLE ===================== */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav  { display: none !important; }
          .desktop-auth { display: none !important; }
          #mob-hamburger { display: flex !important; align-items: center; }
        }
        @media (min-width: 901px) {
          #mob-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ---- Active-underline nav link ---- */
function NavLink({ item, active }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      to={item.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: active ? 600 : 500,
        color: active ? "#C9A84C" : hovered ? "#fff" : "rgba(255,255,255,0.75)",
        textDecoration: "none",
        padding: "8px 14px",
        letterSpacing: "0.02em",
        transition: "color 0.2s",
      }}
    >
      {item.name}
      {/* Underline */}
      <span
        style={{
          position: "absolute",
          bottom: "4px",
          left: "14px",
          right: "14px",
          height: "1px",
          background: "#C9A84C",
          transform: `scaleX(${active || hovered ? 1 : 0})`,
          transformOrigin: "left",
          transition: "transform 0.25s ease",
        }}
      />
    </Link>
  );
}

/* ---- Hamburger SVG ---- */
function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <rect y="0"  width="18" height="1.5" rx="1" fill="rgba(255,255,255,0.8)" />
      <rect y="6"  width="13" height="1.5" rx="1" fill="rgba(201,168,76,0.9)" />
      <rect y="12" width="18" height="1.5" rx="1" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}


