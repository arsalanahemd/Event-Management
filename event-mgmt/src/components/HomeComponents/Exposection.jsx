// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Time-based status logic
// export const getExpoStatus = (expoDate) => {
//   if (!expoDate) return "unknown";
//   const now = new Date();
//   const eventDate = new Date(expoDate);
//   const todayDateOnly = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate()
//   ).getTime();
//   const eventDateOnly = new Date(
//     eventDate.getFullYear(),
//     eventDate.getMonth(),
//     eventDate.getDate()
//   ).getTime();
//   const expoEndTime = new Date(eventDate);
//   expoEndTime.setHours(18, 0, 0, 0);

//   if (eventDateOnly < todayDateOnly) return "past";
//   if (eventDateOnly === todayDateOnly) {
//     if (now.getTime() > expoEndTime.getTime()) return "past";
//     return "ongoing";
//   }
//   return "upcoming";
// };

// const STATUS_COLORS = {
//   upcoming: "#F5C518",
//   ongoing: "#4ade80",
//   past: "rgba(255,255,255,0.3)",
// };

// export default function ExpoSection() {
//   const [expos, setExpos] = useState([]);
//   const [loadingExpos, setLoadingExpos] = useState(true);
//   const [selectedType, setSelectedType] = useState("upcoming");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExpos = async () => {
//       try {
//         const res = await axios.get("http://localhost:3001/expo");
//         setExpos(res.data.expos || []);
//       } catch (err) {
//         console.error("Failed to fetch expos:", err);
//       } finally {
//         setLoadingExpos(false);
//       }
//     };
//     fetchExpos();
//   }, []);

//   const filteredExpos = expos.filter(
//     (expo) => getExpoStatus(expo.date) === selectedType
//   );

//   return (
//     <Box
//       sx={{
//         background: "#f8f7f2",
//         py: { xs: 7, md: 10 },
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: { xs: "flex-start", md: "center" },
//             flexDirection: { xs: "column", md: "row" },
//             mb: 5,
//             gap: 3,
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "0.75rem",
//                 fontWeight: 700,
//                 letterSpacing: "3px",
//                 color: "#F5C518",
//                 textTransform: "uppercase",
//                 mb: 1,
//               }}
//             >
//               Our Exhibitions
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: { xs: "2rem", md: "3rem" },
//                 fontWeight: 900,
//                 color: "#111",
//                 lineHeight: 1.1,
//                 fontFamily: "'Oswald', sans-serif",
//                 textTransform: "uppercase",
//               }}
//             >
//               Explore Exhibitions
//             </Typography>
//           </Box>

//           {/* Filter Buttons */}
//           <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//             {["past", "ongoing", "upcoming"].map((type) => (
//               <Button
//                 key={type}
//                 onClick={() => setSelectedType(type)}
//                 sx={{
//                   px: 3,
//                   py: 1,
//                   fontWeight: 700,
//                   borderRadius: "6px",
//                   fontSize: "0.78rem",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   background: selectedType === type ? "#111" : "transparent",
//                   color: selectedType === type ? "#F5C518" : "#555",
//                   border:
//                     selectedType === type
//                       ? "2px solid #111"
//                       : "2px solid #ddd",
//                   "&:hover": {
//                     background: "#111",
//                     color: "#F5C518",
//                     borderColor: "#111",
//                   },
//                   transition: "all 0.25s",
//                 }}
//               >
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </Button>
//             ))}
//           </Box>
//         </Box>

//         {/* Cards */}
//         {loadingExpos ? (
//           <Box textAlign="center" py={10}>
//             <CircularProgress sx={{ color: "#F5C518" }} />
//           </Box>
//         ) : filteredExpos.length > 0 ? (
//           <Grid container spacing={3}>
//             {filteredExpos.map((expo) => (
//               <Grid item xs={12} sm={6} md={4} key={expo._id}>
//                 <Card
//                   sx={{
//                     borderRadius: 3,
//                     overflow: "hidden",
//                     background: "#fff",
//                     border: "1px solid #eee",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-6px)",
//                       boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
//                     },
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                   }}
//                 >
//                   {/* Image */}
//                   <Box sx={{ position: "relative" }}>
//                     <CardMedia
//                       component="img"
//                       image={`http://localhost:3001/uploads/${expo.image}`}
//                       alt={expo.title}
//                       sx={{ height: 220, objectFit: "cover" }}
//                     />
//                     {/* Theme chip */}
//                     {expo.theme && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           top: 12,
//                           left: 12,
//                           background: "#F5C518",
//                           color: "#111",
//                           px: 1.5,
//                           py: 0.4,
//                           borderRadius: "4px",
//                           fontSize: "0.65rem",
//                           fontWeight: 800,
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                         }}
//                       >
//                         {expo.theme}
//                       </Box>
//                     )}
//                     {/* Status dot */}
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: 12,
//                         right: 12,
//                         background: "rgba(0,0,0,0.7)",
//                         backdropFilter: "blur(6px)",
//                         px: 1.5,
//                         py: 0.4,
//                         borderRadius: "4px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 0.6,
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: 7,
//                           height: 7,
//                           borderRadius: "50%",
//                           background:
//                             STATUS_COLORS[getExpoStatus(expo.date)] || "#ccc",
//                         }}
//                       />
//                       <Typography
//                         sx={{
//                           color: "#fff",
//                           fontSize: "0.6rem",
//                           fontWeight: 700,
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                         }}
//                       >
//                         {getExpoStatus(expo.date)}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <CardContent
//                     sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}
//                   >
//                     <Typography
//                       sx={{
//                         fontWeight: 800,
//                         color: "#111",
//                         fontSize: "1.05rem",
//                         mb: 0.5,
//                         fontFamily: "'Oswald', sans-serif",
//                         textTransform: "uppercase",
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {expo.title}
//                     </Typography>

//                     <Typography
//                       sx={{
//                         color: "#777",
//                         fontSize: "0.82rem",
//                         mb: 2,
//                         display: "-webkit-box",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                         lineHeight: 1.6,
//                       }}
//                     >
//                       {expo.description || "Experience innovation and excellence."}
//                     </Typography>

//                     <Box sx={{ mt: "auto", mb: 2 }}>
//                       <Typography
//                         sx={{ color: "#444", fontSize: "0.78rem", mb: 0.4 }}
//                       >
//                         📅 {expo.date ? expo.date.split("T")[0] : "N/A"}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#444",
//                           fontSize: "0.78rem",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         📍 {expo.venue?.venueName || "TBA"}
//                       </Typography>
//                     </Box>

//                     <Button
//                       fullWidth
//                       disabled={getExpoStatus(expo.date) === "past"}
//                       onClick={() => navigate("/events")}
//                       sx={{
//                         py: 1.2,
//                         fontWeight: 800,
//                         borderRadius: "6px",
//                         background:
//                           getExpoStatus(expo.date) === "past"
//                             ? "#eee"
//                             : "#111",
//                         color:
//                           getExpoStatus(expo.date) === "past" ? "#999" : "#F5C518",
//                         textTransform: "uppercase",
//                         fontSize: "0.75rem",
//                         letterSpacing: "1px",
//                         "&:hover": {
//                           background: "#F5C518",
//                           color: "#111",
//                         },
//                         "&.Mui-disabled": {
//                           background: "#eee",
//                           color: "#bbb",
//                         },
//                         transition: "all 0.25s",
//                       }}
//                     >
//                       {getExpoStatus(expo.date) === "past"
//                         ? "Expo Ended"
//                         : "View Details"}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography
//             textAlign="center"
//             sx={{ color: "#888", mt: 10, fontSize: "1.1rem" }}
//           >
//             No {selectedType} expos available at the moment.
//           </Typography>
//         )}
//       </Container>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const getExpoStatus = (expoDate) => {
//   if (!expoDate) return "unknown";
//   const now = new Date();
//   const eventDate = new Date(expoDate);
//   const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
//   const eventOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();
//   const endTime = new Date(eventDate);
//   endTime.setHours(18, 0, 0, 0);
//   if (eventOnly < todayOnly) return "past";
//   if (eventOnly === todayOnly) return now.getTime() > endTime.getTime() ? "past" : "ongoing";
//   return "upcoming";
// };

// /* ---- Demo data when API unavailable ---- */
// const demoExpos = [
//   { _id: "1", title: "Tech Innovation Summit", theme: "Technology",
//     date: new Date(Date.now() + 7  * 86400000).toISOString(),
//     venue: { venueName: "National IT Hall" },
//     description: "Discover the latest in AI, blockchain and cloud computing." },
//   { _id: "2", title: "Digital Marketing Expo", theme: "Marketing",
//     date: new Date(Date.now() + 14 * 86400000).toISOString(),
//     venue: { venueName: "Grand Expo Center" },
//     description: "Modern marketing trends, branding and growth strategies." },
//   { _id: "3", title: "Creative Design Fest", theme: "Design",
//     date: new Date(Date.now() + 21 * 86400000).toISOString(),
//     venue: { venueName: "Art District Pavilion" },
//     description: "Explore creativity and design thinking like never before." },
// ];

// const fallbackImgs = [
//   "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
//   "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
//   "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
// ];

// export default function ExposSection({ onNavigate }) {
//   const [expos, setExpos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedType, setSelectedType] = useState("upcoming");

//   useEffect(() => {
//     axios.get("http://localhost:3001/expo")
//       .then(res => setExpos(res.data.expos || []))
//       .catch(() => setExpos(demoExpos))
//       .finally(() => setLoading(false));
//   }, []);

//   const filtered = expos.filter(e => getExpoStatus(e.date) === selectedType);

//   return (
//     <section className="expos">
//       <div className="container">
//         <div className="sec-header sec-header-center">
//           <p className="eyebrow">Exhibitions</p>
//           <h2 className="sec-title">Explore <em>Exhibitions</em></h2>
//           <p className="sec-desc">
//             Discover our past, present, and future showcases of innovation and creativity.
//           </p>
//         </div>

//         <div className="expo-filters">
//           {["past", "ongoing", "upcoming"].map(type => (
//             <button
//               key={type}
//               className={`expo-filter-btn ${selectedType === type ? "active" : ""}`}
//               onClick={() => setSelectedType(type)}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)} Expos
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="loader-wrap"><div className="loader" /></div>
//         ) : filtered.length > 0 ? (
//           <div className="expos-grid">
//             {filtered.map((expo, idx) => {
//               const past = getExpoStatus(expo.date) === "past";
//               const img = expo.image
//                 ? `http://localhost:3001/uploads/${expo.image}`
//                 : fallbackImgs[idx % fallbackImgs.length];
//               return (
//                 <div className="expo-card" key={expo._id}>
//                   <div className="expo-card-img-wrap">
//                     <img src={img} alt={expo.title} className="expo-card-img" />
//                     {expo.theme && <span className="expo-card-badge">{expo.theme}</span>}
//                   </div>
//                   <div className="expo-card-body">
//                     <h3 className="expo-card-title">{expo.title}</h3>
//                     <p className="expo-card-desc">
//                       {expo.description || "Experience innovation and excellence."}
//                     </p>
//                     <div className="expo-card-meta">
//                       <span>📅 {expo.date?.split("T")[0] || "TBA"}</span>
//                       <span>📍 {expo.venue?.venueName || "TBA"}</span>
//                     </div>
//                     <button
//                       className="expo-card-btn"
//                       disabled={past}
//                       onClick={() => !past && onNavigate("/events")}
//                     >
//                       {past ? "Expo Ended" : "View Details →"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="empty-state">
//             No {selectedType} expos available at the moment.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const getExpoStatus = (expoDate) => {
  if (!expoDate) return "unknown";
  const now = new Date();
  const eventDate = new Date(expoDate);
  const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const eventOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();
  const endTime = new Date(eventDate);
  endTime.setHours(18, 0, 0, 0);
  if (eventOnly < todayOnly) return "past";
  if (eventOnly === todayOnly) return now.getTime() > endTime.getTime() ? "past" : "ongoing";
  return "upcoming";
};

/* ---- Demo data when API unavailable ---- */
const demoExpos = [
  { _id: "1", title: "Tech Innovation Summit", theme: "Technology",
    date: new Date(Date.now() + 7  * 86400000).toISOString(),
    venue: { venueName: "National IT Hall" },
    description: "Discover the latest in AI, blockchain and cloud computing." },
  { _id: "2", title: "Digital Marketing Expo", theme: "Marketing",
    date: new Date(Date.now() + 14 * 86400000).toISOString(),
    venue: { venueName: "Grand Expo Center" },
    description: "Modern marketing trends, branding and growth strategies." },
  { _id: "3", title: "Creative Design Fest", theme: "Design",
    date: new Date(Date.now() + 21 * 86400000).toISOString(),
    venue: { venueName: "Art District Pavilion" },
    description: "Explore creativity and design thinking like never before." },
];

const fallbackImgs = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
];

export default function ExposSection({ onNavigate }) {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("upcoming");
  const sectionRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/expo")
      .then(res => setExpos(res.data.expos || []))
      .catch(() => setExpos(demoExpos))
      .finally(() => setLoading(false));
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animatedElements = section.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1,
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [expos, selectedType]); // Re-run when data changes

  const filtered = expos.filter(e => getExpoStatus(e.date) === selectedType);

  return (
    <section className="expos" ref={sectionRef}>
      <div className="container">
        <div className="sec-header sec-header-center animate-on-scroll animate-fade-up">
          <p className="eyebrow">Exhibitions</p>
          <h2 className="sec-title">Explore <em>Exhibitions</em></h2>
          <p className="sec-desc">
            Discover our past, present, and future showcases of innovation and creativity.
          </p>
        </div>

        <div className="expo-filters animate-on-scroll animate-fade-up" style={{"--delay": "0.2s"}}>
          {["past", "ongoing", "upcoming"].map(type => (
            <button
              key={type}
              className={`expo-filter-btn ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Expos
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loader-wrap animate-on-scroll animate-fade-in"><div className="loader" /></div>
        ) : filtered.length > 0 ? (
          <div className="expos-grid">
            {filtered.map((expo, idx) => {
              const past = getExpoStatus(expo.date) === "past";
              const img = expo.image
                ? `http://localhost:3001/uploads/${expo.image}`
                : fallbackImgs[idx % fallbackImgs.length];
              return (
                <div 
                  className="expo-card animate-on-scroll animate-card-up" 
                  key={expo._id}
                  style={{"--delay": `${0.15 + idx * 0.12}s`}}
                >
                  <div className="expo-card-img-wrap">
                    <img src={img} alt={expo.title} className="expo-card-img" />
                    {expo.theme && <span className="expo-card-badge">{expo.theme}</span>}
                  </div>
                  <div className="expo-card-body">
                    <h3 className="expo-card-title">{expo.title}</h3>
                    <p className="expo-card-desc">
                      {expo.description || "Experience innovation and excellence."}
                    </p>
                    <div className="expo-card-meta">
                      <span>📅 {expo.date?.split("T")[0] || "TBA"}</span>
                      <span>📍 {expo.venue?.venueName || "TBA"}</span>
                    </div>
                    <button
                      className="expo-card-btn"
                      disabled={past}
                      onClick={() => !past && onNavigate("/events")}
                    >
                      {past ? "Expo Ended" : "View Details →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state animate-on-scroll animate-fade-in">
            No {selectedType} expos available at the moment.
          </div>
        )}
      </div>

      {/* Scroll-Triggered Animations CSS */}
      <style>{`
        /* === DEFAULT HIDDEN STATE === */
        .animate-on-scroll {
          opacity: 0;
          will-change: transform, opacity;
        }

        /* === VISIBLE STATE === */
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* --- Fade Up (Header, Filters) --- */
        .animate-fade-up {
          transform: translateY(50px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Fade In (Loader, Empty State) --- */
        .animate-fade-in {
          transition: opacity 0.6s ease var(--delay, 0s);
        }

        /* --- Card Slide Up with Stagger --- */
        .animate-card-up {
          transform: translateY(60px) scale(0.95);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* === HOVER EFFECTS (Subtle) === */
        .expo-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s ease;
        }
        .expo-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.12);
        }
        .expo-card-img {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .expo-card:hover .expo-card-img {
          transform: scale(1.06);
        }
        .expo-card-btn {
          transition: transform 0.2s ease, background 0.3s ease;
        }
        .expo-card-btn:hover:not(:disabled) {
          transform: translateX(4px);
        }
        .expo-filter-btn {
          transition: all 0.3s ease;
        }
        .expo-filter-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}