// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Container,
//   Card,
//   CardMedia,
//   CardContent,
// } from "@mui/material";

// // Replace with real influencer data / API if needed
// const influencers = [
//   {
//     name: "Sarah Johnson",
//     date: "December 12, 2025",
//     role: "Tech Innovator",
//     image: null,
//   },
//   {
//     name: "Christopher Allen",
//     date: "December 17, 2025",
//     role: "Creative Director",
//     image: null,
//   },
// ];

// export default function InfluencersSection() {
//   return (
//     <Box sx={{ background: "#fff", py: { xs: 7, md: 10 } }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={6} alignItems="center">
//           {/* Left: Influencer Cards */}
//           <Grid item xs={12} md={5}>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {influencers.map((inf, i) => (
//                 <Card
//                   key={i}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                     p: 2,
//                     borderRadius: 3,
//                     background: i === 0 ? "#f8f7f2" : "#fff",
//                     border: "1px solid #eee",
//                     boxShadow: "none",
//                     transition: "all 0.3s",
//                     "&:hover": {
//                       boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
//                       transform: "translateY(-3px)",
//                     },
//                   }}
//                 >
//                   {/* Avatar */}
//                   <Box
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       borderRadius: "50%",
//                       overflow: "hidden",
//                       flexShrink: 0,
//                       border: "3px solid #F5C518",
//                       background: "#222",
//                     }}
//                   >
//                     {inf.image ? (
//                       <img
//                         src={inf.image}
//                         alt={inf.name}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     ) : (
//                       <Box
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           background:
//                             "linear-gradient(135deg, #1a1a2e 0%, #3a3a5c 100%)",
//                         }}
//                       />
//                     )}
//                   </Box>

//                   <Box>
//                     <Typography
//                       sx={{
//                         fontWeight: 800,
//                         color: "#111",
//                         fontSize: "0.95rem",
//                         fontFamily: "'Oswald', sans-serif",
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       {inf.name}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: "#F5C518",
//                         fontSize: "0.72rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         mb: 0.3,
//                       }}
//                     >
//                       {inf.role}
//                     </Typography>
//                     <Typography sx={{ color: "#888", fontSize: "0.75rem" }}>
//                       📅 {inf.date}
//                     </Typography>
//                   </Box>
//                 </Card>
//               ))}
//             </Box>
//           </Grid>

//           {/* Right: Text */}
//           <Grid item xs={12} md={7}>
//             {/* Decorative large circle */}
//             <Box sx={{ position: "relative" }}>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: -20,
//                   right: 20,
//                   width: 180,
//                   height: 180,
//                   borderRadius: "50%",
//                   background: "#f0ede3",
//                   zIndex: 0,
//                 }}
//               />
//               <Box sx={{ position: "relative", zIndex: 1 }}>
//                 <Typography
//                   sx={{
//                     fontSize: "0.75rem",
//                     fontWeight: 700,
//                     letterSpacing: "3px",
//                     color: "#F5C518",
//                     textTransform: "uppercase",
//                     mb: 1.5,
//                   }}
//                 >
//                   Top Influencers
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: { xs: "2rem", md: "2.8rem" },
//                     fontWeight: 900,
//                     color: "#111",
//                     lineHeight: 1.15,
//                     mb: 2,
//                     fontFamily: "'Oswald', sans-serif",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   The Event Boasts Our Top{" "}
//                   <Box
//                     component="span"
//                     sx={{ color: "#F5C518", fontStyle: "italic" }}
//                   >
//                     Creative Influencers
//                   </Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#666",
//                     fontSize: "0.95rem",
//                     lineHeight: 1.8,
//                     maxWidth: 460,
//                   }}
//                 >
//                   Our hand-picked lineup of industry pioneers and creative
//                   visionaries will share ideas, inspire action, and spark
//                   conversations that matter.
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const demoSpeakers = [
//   { _id: "1", name: "Sarah Johnson",      designation: "CEO, TechVision",      date: "December 15, 2025", time: "10:00 AM - 11:30 AM" },
//   { _id: "2", name: "Christopher Wilson", designation: "AI Research Lead",     date: "December 17, 2025", time: "12:00 PM - 02:00 PM" },
//   { _id: "3", name: "Priya Patel",        designation: "UX Design Director",   date: "December 16, 2025", time: "02:00 PM - 03:30 PM" },
//   { _id: "4", name: "Marcus Chen",        designation: "Blockchain Pioneer",   date: "December 15, 2025", time: "04:00 PM - 05:00 PM" },
// ];

// export default function InfluencersSection({ onNavigate }) {
//   const [speakers, setSpeakers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:3001/speaker")
//       .then(res => setSpeakers(res.data.success ? res.data.speakers : demoSpeakers))
//       .catch(() => setSpeakers(demoSpeakers))
//       .finally(() => setLoading(false));
//   }, []);

//   const display = loading ? demoSpeakers : (speakers.length ? speakers : demoSpeakers);

//   return (
//     <section className="influencers">
//       <div className="container">
//         <div className="influencers-inner">

//           {/* LEFT: heading + speaker cards */}
//           <div className="influencers-text">
//             <p className="eyebrow">Our Speakers</p>
//             <h2 className="influencers-title">
//               The event boasts<br />
//               our top <em>creative</em><br />
//               influencers
//             </h2>
//             <p className="influencers-desc">
//               The event features renowned influencers and innovators shaping
//               trends and driving creativity across various industries.
//             </p>

//             <div className="inf-cards">
//               {display.slice(0, 4).map((spk, i) => (
//                 <div className="inf-card" key={spk._id || i}>
//                   {spk.image ? (
//                     <img
//                       className="inf-avatar"
//                       src={`http://localhost:3001/uploads/${spk.image}`}
//                       alt={spk.name}
//                     />
//                   ) : (
//                     <div className="inf-avatar-placeholder">
//                       {spk.name?.charAt(0)}
//                     </div>
//                   )}
//                   <div className="inf-info">
//                     <div className="inf-name">{spk.name}</div>
//                     <div className="inf-role">{spk.designation || "Guest Speaker"}</div>
//                   </div>
//                   <div className="inf-meta">
//                     <div>{spk.date || "December 2025"}</div>
//                     <div>{spk.time || "10:00 AM"}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ marginTop: 28 }}>
//               <button className="btn-outline" onClick={() => onNavigate("/speakers")}>
//                 View All Speakers →
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: person image with circle */}
//           <div className="influencers-img-side">
//             <div className="inf-img-circle" />
//             <img
//               className="inf-main-img"
//               src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80"
//               alt="Speaker"
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const demoSpeakers = [
  { _id: "1", name: "Sarah Johnson",      designation: "CEO, TechVision",      date: "December 15, 2025", time: "10:00 AM - 11:30 AM" },
  { _id: "2", name: "Christopher Wilson", designation: "AI Research Lead",     date: "December 17, 2025", time: "12:00 PM - 02:00 PM" },
  { _id: "3", name: "Priya Patel",        designation: "UX Design Director",   date: "December 16, 2025", time: "02:00 PM - 03:30 PM" },
  { _id: "4", name: "Marcus Chen",        designation: "Blockchain Pioneer",   date: "December 15, 2025", time: "04:00 PM - 05:00 PM" },
];

export default function InfluencersSection({ onNavigate }) {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/speaker")
      .then(res => setSpeakers(res.data.success ? res.data.speakers : demoSpeakers))
      .catch(() => setSpeakers(demoSpeakers))
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
  }, [speakers, loading]);

  const display = loading ? demoSpeakers : (speakers.length ? speakers : demoSpeakers);

  return (
    <section className="influencers" ref={sectionRef}>
      <div className="container">
        <div className="influencers-inner">

          {/* LEFT: heading + speaker cards */}
          <div className="influencers-text">
            <p className="eyebrow animate-on-scroll animate-fade-down">Our Speakers</p>
            <h2 className="influencers-title animate-on-scroll animate-fade-up" style={{"--delay": "0.1s"}}>
              The event boasts<br />
              our top <em>creative</em><br />
              influencers
            </h2>
            <p className="influencers-desc animate-on-scroll animate-fade-up" style={{"--delay": "0.2s"}}>
              The event features renowned influencers and innovators shaping
              trends and driving creativity across various industries.
            </p>

            <div className="inf-cards">
              {display.slice(0, 4).map((spk, i) => (
                <div 
                  className="inf-card animate-on-scroll animate-card-slide" 
                  key={spk._id || i}
                  style={{"--delay": `${0.3 + i * 0.12}s`}}
                >
                  {spk.image ? (
                    <img
                      className="inf-avatar"
                      src={`http://localhost:3001/uploads/${spk.image}`}
                      alt={spk.name}
                    />
                  ) : (
                    <div className="inf-avatar-placeholder">
                      {spk.name?.charAt(0)}
                    </div>
                  )}
                  <div className="inf-info">
                    <div className="inf-name">{spk.name}</div>
                    <div className="inf-role">{spk.designation || "Guest Speaker"}</div>
                  </div>
                  <div className="inf-meta">
                    <div>{spk.date || "December 2025"}</div>
                    <div>{spk.time || "10:00 AM"}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }} className="animate-on-scroll animate-fade-up" style={{"--delay": "0.8s"}}>
              <button className="btn-outline" onClick={() => onNavigate("/speakers")}>
                View All Speakers →
              </button>
            </div>
          </div>

          {/* RIGHT: person image with circle */}
          <div className="influencers-img-side animate-on-scroll animate-slide-left">
            <div className="inf-img-circle" />
            <img
              className="inf-main-img"
              src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80"
              alt="Speaker"
            />
          </div>

        </div>
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

        /* --- Fade Down (Eyebrow) --- */
        .animate-fade-down {
          transform: translateY(-30px);
          transition: opacity 0.5s ease-out,
                      transform 0.5s ease-out;
        }

        /* --- Fade Up (Title, Desc, Button) --- */
        .animate-fade-up {
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Card Slide In (Speaker Cards) --- */
        .animate-card-slide {
          transform: translateX(-50px) scale(0.95);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Slide Left (Right Image Side) --- */
        .animate-slide-left {
          transform: translateX(80px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }

        /* === HOVER EFFECTS (Subtle) === */
        .inf-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .inf-card:hover {
          transform: translateX(8px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .inf-avatar, .inf-avatar-placeholder {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .inf-card:hover .inf-avatar,
        .inf-card:hover .inf-avatar-placeholder {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .btn-outline {
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          transform: translateX(4px);
        }
        .inf-main-img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .influencers-img-side:hover .inf-main-img {
          transform: scale(1.03);
        }
        .inf-img-circle {
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .influencers-img-side:hover .inf-img-circle {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}