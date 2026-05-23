// import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   Tooltip,
//   useMediaQuery,
// } from "@mui/material";
// import { items } from "./config";
// import { Scrollbar } from "src/components/scrollbar";

// const SIDE_NAV_WIDTH = 115;
// const TOP_NAV_HEIGHT = 80;

// export const SideNav = ({ open, onClose }) => {
//   const location = useLocation();
//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

//   const sideNavContent = (
//     <Scrollbar
//       sx={{
//         height: "100%",
//         "& .simplebar-content": {
//           height: "100%",
//         },
//       }}
//     >
//       <List
//         sx={{
//           px: 1.5,
//           py: lgUp ? 4 : 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         {items.map((item) => {
//           const active = matchPath({ path: item.href, end: true }, location.pathname);

//           return (
//             <Tooltip
//               key={item.href}
//               title={item.label}
//               placement="right"
//               arrow
//               disableHoverListener={!lgUp}
//             >
//               <ListItem
//                 disablePadding
//                 component={RouterLink}
//                 to={item.href}
//                 sx={{
//                   flexDirection: "column",
//                   borderRadius: "20px",
//                   mb: 2.5,
//                   py: 1.5,
//                   width: "80px",
//                   height: "80px",
//                   justifyContent: "center",
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   backgroundColor: active ? "rgba(76, 201, 240, 0.12)" : "transparent",
//                   border: active ? "1px solid rgba(76, 201, 240, 0.4)" : "1px solid transparent",
//                   position: "relative",
//                   "&:hover": {
//                     backgroundColor: "rgba(76, 201, 240, 0.05)",
//                     transform: lgUp ? "translateY(-3px)" : "none",
//                     "& .icon-box": {
//                       color: "#4CC9F0",
//                       filter: "drop-shadow(0 0 10px rgba(76, 201, 240, 0.8))",
//                     },
//                     "& .label-text": { color: "#FFF" },
//                   },
//                 }}
//               >
//                 {active && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       bottom: 8,
//                       height: "4px",
//                       width: "4px",
//                       borderRadius: "50%",
//                       backgroundColor: "#4CC9F0",
//                       boxShadow: "0 0 12px 2px #4CC9F0",
//                     }}
//                   />
//                 )}

//                 <ListItemIcon
//                   className="icon-box"
//                   sx={{
//                     minWidth: "auto",
//                     mb: 0.5,
//                     color: active ? "#4CC9F0" : "rgba(255, 255, 255, 0.4)",
//                     transition: "all 0.3s ease",
//                     "& svg": {
//                       fontSize: "28px",
//                       filter: active ? "drop-shadow(0 0 12px rgba(76, 201, 240, 0.5))" : "none",
//                     },
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>

//                 <ListItemText
//                   className="label-text"
//                   primary={item.label}
//                   primaryTypographyProps={{
//                     sx: {
//                       fontSize: "0.7rem",
//                       fontWeight: active ? 700 : 500,
//                       textAlign: "center",
//                       color: active ? "#FFF" : "rgba(255, 255, 255, 0.4)",
//                       textTransform: "capitalize",
//                       letterSpacing: "0.3px",
//                     },
//                   }}
//                 />
//               </ListItem>
//             </Tooltip>
//           );
//         })}
//       </List>
//     </Scrollbar>
//   );

//   return (
//     <Drawer
//       anchor="left"
//       onClose={onClose}
//       open={open}
//       variant={lgUp ? "permanent" : "temporary"}
//       // Z-Index fix taake TopNav upar nazar aaye
//       sx={{
//         zIndex: (theme) => (lgUp ? theme.zIndex.appBar - 1 : theme.zIndex.appBar + 1),
//       }}
//       PaperProps={{
//         sx: {
//           backgroundColor: "#0D1B2A",
//           width: SIDE_NAV_WIDTH,
//           height: lgUp ? `calc(100vh - ${TOP_NAV_HEIGHT}px)` : "100%",
//           top: lgUp ? TOP_NAV_HEIGHT : 0,
//           left: 0,
//           borderRadius: 0,
//           borderRight: "1px solid rgba(76, 201, 240, 0.15)",
//           boxShadow: "4px 0 24px rgba(0, 0, 0, 0.6)",
//           overflowX: "hidden",
//           backgroundImage: "none",
//         },
//       }}
//     >
//       {sideNavContent}
//     </Drawer>
//   );
// };
// import React from "react";
// import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// /* ---- CONFIG: Import your items here ---- */
// // import { items } from "./config";  // Uncomment if you have a config file

// /* ---- OR define items here with SVG icons ---- */
// const IconDashboard = ({ size = 26, color = "currentColor" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
//   </svg>
// );
// const IconUsers = ({ size = 26, color = "currentColor" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//   </svg>
// );
// const IconEvent = ({ size = 26, color = "currentColor" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
//   </svg>
// );
// const IconSettings = ({ size = 26, color = "currentColor" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
//   </svg>
// );

// /* ---- DEFINE YOUR NAV ITEMS HERE ---- */
// const items = [
//   { label: "Dashboard", href: "/admin-dashboard", icon: <IconDashboard /> },
//   { label: "Users", href: "/users", icon: <IconUsers /> },
//   { label: "Events", href: "/events", icon: <IconEvent /> },
//   { label: "Settings", href: "/settings", icon: <IconSettings /> },
// ];

// const G = {
//   black:  "#000000",
//   black2: "#0a0a0a",
//   black3: "#111111",
//   black4: "#1a1a1a",
//   gold:   "#C9A84C",
//   goldLt: "#dcc07e",
//   white:  "#FFFFFF",
//   w80:    "rgba(255,255,255,0.80)",
//   w55:    "rgba(255,255,255,0.55)",
//   w30:    "rgba(255,255,255,0.30)",
//   border: "rgba(255,255,255,0.08)",
//   bGold:  "rgba(201,168,76,0.30)",
// };

// const SIDE_NAV_WIDTH = 100;
// const TOP_NAV_HEIGHT = 80;

// export const SideNav = ({ open, onClose }) => {
//   const location = useLocation();
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

//   const handleOverlayClick = () => {
//     if (isMobile && onClose) onClose();
//   };

//   const sideNavContent = (
//     <div
//       style={{
//         height: "100%",
//         overflowY: "auto",
//         overflowX: "hidden",
//         padding: isMobile ? "16px 12px" : "32px 10px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "8px",
//       }}
//     >
//       {items.map((item, index) => {
//         const active = matchPath({ path: item.href, end: true }, location.pathname);

//         return (
//           <motion.div
//             key={item.href}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.08 }}
//             style={{ width: "100%" }}
//           >
//             <RouterLink
//               to={item.href}
//               onClick={() => isMobile && onClose && onClose()}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: "16px",
//                 padding: "14px 8px",
//                 width: "100%",
//                 minHeight: "72px",
//                 textDecoration: "none",
//                 position: "relative",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 backgroundColor: active ? "rgba(201, 168, 76, 0.12)" : "transparent",
//                 border: active ? `1px solid ${G.bGold}` : "1px solid transparent",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 if (!active) {
//                   e.currentTarget.style.backgroundColor = "rgba(201, 168, 76, 0.05)";
//                   e.currentTarget.style.borderColor = G.border;
//                   e.currentTarget.style.transform = "translateY(-3px)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!active) {
//                   e.currentTarget.style.backgroundColor = "transparent";
//                   e.currentTarget.style.borderColor = "transparent";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }
//               }}
//             >
//               {/* Active dot */}
//               {active && (
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   style={{
//                     position: "absolute",
//                     bottom: "6px",
//                     width: "4px",
//                     height: "4px",
//                     borderRadius: "50%",
//                     backgroundColor: G.gold,
//                     boxShadow: "0 0 12px 2px rgba(201,168,76,0.6)",
//                   }}
//                 />
//               )}

//               {/* Icon */}
//               <div
//                 style={{
//                   marginBottom: "6px",
//                   color: active ? G.gold : "rgba(255, 255, 255, 0.4)",
//                   transition: "all 0.3s ease",
//                   filter: active ? "drop-shadow(0 0 8px rgba(201,168,76,0.5))" : "none",
//                 }}
//               >
//                 {React.cloneElement(item.icon, {
//                   color: active ? G.gold : "rgba(255, 255, 255, 0.4)",
//                 })}
//               </div>

//               {/* Label */}
//               <span
//                 style={{
//                   fontFamily: "'Inter', sans-serif",
//                   fontSize: "0.65rem",
//                   fontWeight: active ? 700 : 500,
//                   textAlign: "center",
//                   color: active ? G.white : "rgba(255, 255, 255, 0.4)",
//                   textTransform: "capitalize",
//                   letterSpacing: "0.3px",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 {item.label}
//               </span>
//             </RouterLink>
//           </motion.div>
//         );
//       })}
//     </div>
//   );

//   // Desktop: Fixed sidebar
//   if (!isMobile) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           left: 0,
//           top: TOP_NAV_HEIGHT,
//           width: SIDE_NAV_WIDTH,
//           height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
//           backgroundColor: G.black2,
//           borderRight: `1px solid ${G.border}`,
//           boxShadow: "4px 0 24px rgba(0, 0, 0, 0.6)",
//           zIndex: 100,
//           overflowX: "hidden",
//         }}
//       >
//         {sideNavContent}
//       </div>
//     );
//   }

//   // Mobile: Drawer with overlay
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             style={{
//               position: "fixed",
//               inset: 0,
//               background: "rgba(0,0,0,0.6)",
//               backdropFilter: "blur(4px)",
//               zIndex: 1100,
//             }}
//             onClick={handleOverlayClick}
//           />
//           {/* Drawer */}
//           <motion.div
//             initial={{ x: -SIDE_NAV_WIDTH }}
//             animate={{ x: 0 }}
//             exit={{ x: -SIDE_NAV_WIDTH }}
//             transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
//             style={{
//               position: "fixed",
//               left: 0,
//               top: 0,
//               width: SIDE_NAV_WIDTH,
//               height: "100vh",
//               backgroundColor: G.black2,
//               borderRight: `1px solid ${G.border}`,
//               boxShadow: "4px 0 24px rgba(0, 0, 0, 0.6)",
//               zIndex: 1200,
//               overflowX: "hidden",
//             }}
//           >
//             {sideNavContent}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { items } from "./config";
import { Scrollbar } from "src/components/scrollbar";

const SIDE_NAV_WIDTH = 100;
const TOP_NAV_HEIGHT = 80;

// GOLD THEME CONSTANTS
const GOLD = "#C9A84C";
const GOLD_BORDER = "rgba(201,168,76,0.30)";
const GOLD_BG_ACTIVE = "rgba(201,168,76,0.12)";
const GOLD_BG_HOVER = "rgba(201,168,76,0.05)";
const BLACK2 = "#0a0a0a";
const BORDER = "rgba(255,255,255,0.08)";

export const SideNav = ({ open, onClose }) => {
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sideNavContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
      }}
    >
      <List
        sx={{
          px: 1.2,
          py: lgUp ? 3 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {items.map((item) => {
          const active = matchPath({ path: item.href, end: true }, location.pathname);

          return (
            <Tooltip
              key={item.href}
              title={item.label}
              placement="right"
              arrow
              disableHoverListener={!lgUp}
            >
              <ListItem
                disablePadding
                component={RouterLink}
                to={item.href}
                sx={{
                  flexDirection: "column",
                  borderRadius: "16px",
                  mb: 2,
                  py: 1.5,
                  width: "76px",
                  height: "76px",
                  justifyContent: "center",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  backgroundColor: active ? GOLD_BG_ACTIVE : "transparent",
                  border: active ? `1px solid ${GOLD_BORDER}` : "1px solid transparent",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: active ? GOLD_BG_ACTIVE : GOLD_BG_HOVER,
                    transform: lgUp ? "translateY(-3px)" : "none",
                    border: active ? `1px solid ${GOLD_BORDER}` : `1px solid ${BORDER}`,
                    "& .icon-box": {
                      color: GOLD,
                      filter: "drop-shadow(0 0 10px rgba(201,168,76,0.8))",
                    },
                    "& .label-text": { color: "#FFF" },
                  },
                }}
              >
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 6,
                      height: "4px",
                      width: "4px",
                      borderRadius: "50%",
                      backgroundColor: GOLD,
                      boxShadow: "0 0 12px 2px rgba(201,168,76,0.6)",
                    }}
                  />
                )}

                <ListItemIcon
                  className="icon-box"
                  sx={{
                    minWidth: "auto",
                    mb: 0.5,
                    color: active ? GOLD : "rgba(255, 255, 255, 0.4)",
                    transition: "all 0.3s ease",
                    "& svg": {
                      fontSize: "26px",
                      filter: active ? "drop-shadow(0 0 12px rgba(201,168,76,0.5))" : "none",
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  className="label-text"
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "0.65rem",
                      fontWeight: active ? 700 : 500,
                      textAlign: "center",
                      color: active ? "#FFF" : "rgba(255, 255, 255, 0.4)",
                      textTransform: "capitalize",
                      letterSpacing: "0.3px",
                    },
                  }}
                />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Scrollbar>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      variant={lgUp ? "permanent" : "temporary"}
      sx={{
        zIndex: (theme) => (lgUp ? theme.zIndex.appBar - 1 : theme.zIndex.appBar + 1),
      }}
      PaperProps={{
        sx: {
          backgroundColor: BLACK2,
          width: SIDE_NAV_WIDTH,
          height: lgUp ? `calc(100vh - ${TOP_NAV_HEIGHT}px)` : "100%",
          top: lgUp ? TOP_NAV_HEIGHT : 0,
          left: 0,
          borderRadius: 0,
          borderRight: `1px solid ${BORDER}`,
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.6)",
          overflowX: "hidden",
          backgroundImage: "none",
        },
      }}
    >
      {sideNavContent}
    </Drawer>
  );
};