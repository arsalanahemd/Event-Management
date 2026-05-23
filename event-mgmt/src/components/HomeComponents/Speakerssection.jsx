// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Container,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function SpeakersSection() {
//   const [speakers, setSpeakers] = useState([]);
//   const [loadingSpeakers, setLoadingSpeakers] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSpeakers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3001/speaker");
//         if (res.data.success) {
//           setSpeakers(res.data.speakers || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch speakers:", err);
//       } finally {
//         setLoadingSpeakers(false);
//       }
//     };
//     fetchSpeakers();
//   }, []);

//   return (
//     <Box sx={{ background: "#111", py: { xs: 7, md: 10 } }}>
//       <Container maxWidth="lg">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: { xs: "flex-start", md: "center" },
//             flexDirection: { xs: "column", md: "row" },
//             mb: 6,
//             gap: 2,
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
//               Our Speakers
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: { xs: "2rem", md: "3rem" },
//                 fontWeight: 900,
//                 color: "#fff",
//                 lineHeight: 1.1,
//                 fontFamily: "'Oswald', sans-serif",
//                 textTransform: "uppercase",
//               }}
//             >
//               Meet the Top{" "}
//               <Box component="span" sx={{ fontStyle: "italic", color: "#F5C518" }}>
//                 Incredible
//               </Box>{" "}
//               Speakers
//             </Typography>
//           </Box>

//           <Button
//             onClick={() => navigate("/speakers")}
//             sx={{
//               px: 3,
//               py: 1,
//               fontWeight: 700,
//               borderRadius: "6px",
//               fontSize: "0.78rem",
//               textTransform: "uppercase",
//               letterSpacing: "1px",
//               border: "2px solid rgba(255,255,255,0.2)",
//               color: "#fff",
//               whiteSpace: "nowrap",
//               "&:hover": {
//                 background: "#F5C518",
//                 color: "#111",
//                 borderColor: "#F5C518",
//               },
//               transition: "all 0.25s",
//             }}
//           >
//             See All Speakers
//           </Button>
//         </Box>

//         {loadingSpeakers ? (
//           <Box textAlign="center">
//             <CircularProgress sx={{ color: "#F5C518" }} />
//           </Box>
//         ) : speakers.length > 0 ? (
//           <Grid container spacing={3} justifyContent="center">
//             {speakers.map((speaker) => (
//               <Grid item xs={6} sm={4} md={3} key={speaker._id}>
//                 <Card
//                   sx={{
//                     background: "rgba(255,255,255,0.04)",
//                     border: "1px solid rgba(255,255,255,0.08)",
//                     borderRadius: 3,
//                     textAlign: "center",
//                     p: 2,
//                     transition: "all 0.35s ease",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       border: "1px solid #F5C518",
//                       background: "rgba(245,197,24,0.05)",
//                     },
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     image={`http://localhost:3001/uploads/${speaker.image}`}
//                     alt={speaker.name}
//                     sx={{
//                       borderRadius: "50%",
//                       objectFit: "cover",
//                       width: { xs: 90, md: 120 },
//                       height: { xs: 90, md: 120 },
//                       mx: "auto",
//                       mb: 1.5,
//                       border: "3px solid rgba(245,197,24,0.3)",
//                     }}
//                   />
//                   <CardContent sx={{ p: 0 }}>
//                     <Typography
//                       sx={{
//                         fontWeight: 800,
//                         color: "#fff",
//                         fontSize: "0.95rem",
//                         mb: 0.3,
//                       }}
//                     >
//                       {speaker.name}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: "#F5C518",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                       }}
//                     >
//                       Guest Speaker
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography textAlign="center" sx={{ color: "rgba(255,255,255,0.5)" }}>
//             No speakers available yet.
//           </Typography>
//         )}
//       </Container>
//     </Box>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

const demoSpeakers = [
  { _id: "1", name: "Sarah Johnson", designation: "CEO, TechVision", image: null },
  { _id: "2", name: "Marcus Chen", designation: "AI Research Lead", image: null },
  { _id: "3", name: "Priya Patel", designation: "UX Design Director", image: null },
  { _id: "4", name: "James Wright", designation: "Blockchain Pioneer", image: null },
];

const avatarColors = ["#4CC9F0", "#F72585", "#4895EF", "#FFD166"];

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/speaker");
        if (res.data.success) setSpeakers(res.data.speakers || []);
        else setSpeakers(demoSpeakers);
      } catch {
        setSpeakers(demoSpeakers);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  return (
    <section className="speakers-section">
      <div className="speakers-bg-accent" />
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Our Speakers</p>
          <h2 className="section-title">
            Industry Leading<br />
            <span className="gradient-text">Voices</span>
          </h2>
          <p className="section-desc">
            Learn from experts shaping the future of innovation and technology.
          </p>
        </div>

        {loading ? (
          <div className="loader-wrap"><div className="loader" /></div>
        ) : (
          <div className="speakers-grid">
            {speakers.map((speaker, idx) => (
              <div className="speaker-card" key={speaker._id}>
                <div
                  className="speaker-avatar-wrap"
                  style={{ "--accent": avatarColors[idx % avatarColors.length] }}
                >
                  {speaker.image ? (
                    <img
                      src={`http://localhost:3001/uploads/${speaker.image}`}
                      alt={speaker.name}
                      className="speaker-avatar"
                    />
                  ) : (
                    <div className="speaker-avatar-placeholder">
                      {speaker.name.charAt(0)}
                    </div>
                  )}
                  <div className="speaker-avatar-ring" />
                </div>
                <div className="speaker-info">
                  <h3 className="speaker-name">{speaker.name}</h3>
                  <span className="speaker-role">
                    {speaker.designation || "Guest Speaker"}
                  </span>
                </div>
                <div className="speaker-social">
                  <span className="social-pill">🎤 Keynote</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}