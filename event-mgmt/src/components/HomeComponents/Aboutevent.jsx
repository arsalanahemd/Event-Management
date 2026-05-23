// // // import React from "react";
// // // import { Box, Typography, Grid, Container } from "@mui/material";

// // // // Replace these with real images if available
// // // const galleryImages = [
// // //   { src: null, label: "Unforgettable Moments at Eventbus 2025" },
// // //   { src: null, label: "Storytelling Festival" },
// // //   { src: null, label: "Build Networking" },
// // // ];

// // // export default function AboutEvent() {
// // //   return (
// // //     <Box sx={{ background: "#fff", py: { xs: 7, md: 10 } }}>
// // //       <Container maxWidth="lg">
// // //         <Grid container spacing={6} alignItems="center">
// // //           {/* Left text */}
// // //           <Grid item xs={12} md={5}>
// // //             <Typography
// // //               sx={{
// // //                 fontSize: "0.75rem",
// // //                 fontWeight: 700,
// // //                 letterSpacing: "3px",
// // //                 color: "#F5C518",
// // //                 textTransform: "uppercase",
// // //                 mb: 1.5,
// // //               }}
// // //             >
// // //               About the event
// // //             </Typography>
// // //             <Typography
// // //               sx={{
// // //                 fontSize: { xs: "1.8rem", md: "2.4rem" },
// // //                 fontWeight: 900,
// // //                 color: "#111",
// // //                 lineHeight: 1.2,
// // //                 mb: 2,
// // //                 fontFamily: "'Oswald', sans-serif",
// // //                 textTransform: "uppercase",
// // //               }}
// // //             >
// // //               Join Our Biggest Expo Event of the Year
// // //             </Typography>
// // //             <Typography
// // //               sx={{
// // //                 color: "#555",
// // //                 fontSize: "0.95rem",
// // //                 lineHeight: 1.8,
// // //               }}
// // //             >
// // //               An immersive gathering of innovators, creators, and thinkers.
// // //               Experience keynotes, workshops, and networking sessions that
// // //               inspire growth and collaboration.
// // //             </Typography>
// // //           </Grid>

// // //           {/* Right image grid */}
// // //           <Grid item xs={12} md={7}>
// // //             <Grid container spacing={1.5}>
// // //               {galleryImages.map((img, i) => (
// // //                 <Grid item xs={12} sm={i === 0 ? 12 : 6} key={i}>
// // //                   <Box
// // //                     sx={{
// // //                       height: i === 0 ? { xs: 180, md: 220 } : { xs: 140, md: 170 },
// // //                       borderRadius: 2,
// // //                       overflow: "hidden",
// // //                       position: "relative",
// // //                       background: i === 0 ? "#222" : "#1a1a2e",
// // //                     }}
// // //                   >
// // //                     {img.src ? (
// // //                       <img
// // //                         src={img.src}
// // //                         alt={img.label}
// // //                         style={{
// // //                           width: "100%",
// // //                           height: "100%",
// // //                           objectFit: "cover",
// // //                         }}
// // //                       />
// // //                     ) : (
// // //                       <Box
// // //                         sx={{
// // //                           width: "100%",
// // //                           height: "100%",
// // //                           background:
// // //                             i === 0
// // //                               ? "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)"
// // //                               : i === 1
// // //                               ? "linear-gradient(135deg, #2d1b00 0%, #5a3800 100%)"
// // //                               : "linear-gradient(135deg, #001a2d 0%, #003a5c 100%)",
// // //                           display: "flex",
// // //                           alignItems: "flex-end",
// // //                           p: 1.5,
// // //                         }}
// // //                       >
// // //                         <Typography
// // //                           sx={{
// // //                             color: "rgba(255,255,255,0.6)",
// // //                             fontSize: "0.7rem",
// // //                             fontWeight: 600,
// // //                           }}
// // //                         >
// // //                           {img.label}
// // //                         </Typography>
// // //                       </Box>
// // //                     )}
// // //                   </Box>
// // //                 </Grid>
// // //               ))}
// // //             </Grid>
// // //           </Grid>
// // //         </Grid>
// // //       </Container>
// // //     </Box>
// // //   );
// // // }

// // import React from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Container,
// //   Button,
// //   Stack,
// // } from "@mui/material";
// // import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// // // ============================================
// // // DUMMY DATA
// // // Later replace with API data
// // // ============================================
// // const eventData = {
// //   subtitle: "ABOUT THE EVENT",
// //   title: "The Biggest Creative & Business Expo 2026",
// //   description:
// //     "Join thousands of innovators, entrepreneurs, creators, and industry leaders for an unforgettable experience packed with networking, workshops, keynote sessions, and live entertainment.",

// //   stats: [
// //     { number: "25K+", label: "Attendees" },
// //     { number: "120+", label: "Speakers" },
// //     { number: "80+", label: "Workshops" },
// //   ],

// //   gallery: [
// //     {
// //       image:
// //         "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
// //       title: "Main Conference Hall",
// //     },
// //     {
// //       image:
// //         "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
// //       title: "Networking Session",
// //     },
// //     {
// //       image:
// //         "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
// //       title: "Live Workshops",
// //     },
// //   ],
// // };

// // export default function AboutEvent() {
// //   return (
// //     <Box
// //       sx={{
// //         background: "#f7f8fc",
// //         py: { xs: 8, md: 12 },
// //       }}
// //     >
// //       <Container maxWidth="xl">
// //         <Grid
// //           container
// //           spacing={{ xs: 6, md: 8 }}
// //           alignItems="center"
// //         >
// //           {/* ========================================= */}
// //           {/* LEFT CONTENT */}
// //           {/* ========================================= */}
// //           <Grid item xs={12} md={5}>
// //             <Typography
// //               sx={{
// //                 color: "#ffb400",
// //                 fontWeight: 800,
// //                 letterSpacing: "3px",
// //                 fontSize: "0.8rem",
// //                 mb: 2,
// //               }}
// //             >
// //               {eventData.subtitle}
// //             </Typography>

// //             <Typography
// //               sx={{
// //                 fontSize: { xs: "2.3rem", md: "4rem" },
// //                 fontWeight: 900,
// //                 lineHeight: 1.1,
// //                 color: "#111",
// //                 mb: 3,
// //                 textTransform: "uppercase",
// //               }}
// //             >
// //               {eventData.title}
// //             </Typography>

// //             <Typography
// //               sx={{
// //                 color: "#666",
// //                 lineHeight: 1.9,
// //                 fontSize: "1rem",
// //                 mb: 4,
// //                 maxWidth: "520px",
// //               }}
// //             >
// //               {eventData.description}
// //             </Typography>

// //             {/* STATS */}
// //             <Stack
// //               direction="row"
// //               spacing={{ xs: 3, md: 5 }}
// //               sx={{
// //                 mb: 5,
// //                 flexWrap: "wrap",
// //                 rowGap: 2,
// //               }}
// //             >
// //               {eventData.stats.map((item, index) => (
// //                 <Box key={index}>
// //                   <Typography
// //                     sx={{
// //                       fontSize: { xs: "2rem", md: "2.5rem" },
// //                       fontWeight: 900,
// //                       color: "#111",
// //                     }}
// //                   >
// //                     {item.number}
// //                   </Typography>

// //                   <Typography
// //                     sx={{
// //                       color: "#777",
// //                       fontSize: "0.95rem",
// //                     }}
// //                   >
// //                     {item.label}
// //                   </Typography>
// //                 </Box>
// //               ))}
// //             </Stack>

// //             {/* BUTTONS */}
// //             <Stack direction="row" spacing={2}>
// //               <Button
// //                 variant="contained"
// //                 sx={{
// //                   background: "#111",
// //                   px: 4,
// //                   py: 1.5,
// //                   borderRadius: "14px",
// //                   textTransform: "none",
// //                   fontWeight: 700,
// //                   fontSize: "0.95rem",
// //                   boxShadow: "none",
// //                   "&:hover": {
// //                     background: "#000",
// //                     boxShadow: "none",
// //                   },
// //                 }}
// //               >
// //                 Explore Event
// //               </Button>

// //               <Button
// //                 startIcon={<PlayArrowIcon />}
// //                 sx={{
// //                   color: "#111",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                 }}
// //               >
// //                 Watch Video
// //               </Button>
// //             </Stack>
// //           </Grid>

// //           {/* ========================================= */}
// //           {/* RIGHT IMAGE GRID */}
// //           {/* ========================================= */}
// //          <Grid item xs={12} md={7}>
// //   <Grid
// //     container
// //     spacing={2}
// //     sx={{
// //       justifyContent: "center",
// //       alignItems: "stretch",
// //     }}
// //   >
// //     {eventData.gallery.map((item, index) => (
// //       <Grid item xs={12} sm={4} key={index}>
// //         <Box
// //           sx={{
// //             position: "relative",
// //             height: 240,
// //             borderRadius: "20px",
// //             overflow: "hidden",
// //             cursor: "pointer",

// //             // smooth entrance
// //             opacity: 0,
// //             transform: "translateY(20px)",
// //             animation: "fadeUp 0.6s ease forwards",
// //             animationDelay: `${index * 0.15}s`,

// //             "@keyframes fadeUp": {
// //               "0%": { opacity: 0, transform: "translateY(20px)" },
// //               "100%": { opacity: 1, transform: "translateY(0)" },
// //             },

// //             // hover (simple but premium)
// //             transition: "all 0.35s ease",
// //             "&:hover": {
// //               transform: "translateY(-6px)",
// //               boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
// //             },

// //             "&:hover img": {
// //               transform: "scale(1.08)",
// //             },
// //           }}
// //         >
// //           {/* IMAGE */}
// //           <Box
// //             component="img"
// //             src={item.image}
// //             alt={item.title}
// //             sx={{
// //               width: "100%",
// //               height: "100%",
// //               objectFit: "cover",
// //               transition: "0.5s ease",
// //             }}
// //           />

// //           {/* OVERLAY */}
// //           <Box
// //             sx={{
// //               position: "absolute",
// //               inset: 0,
// //               background:
// //                 "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.05))",
// //             }}
// //           />

// //           {/* TEXT */}
// //           <Typography
// //             sx={{
// //               position: "absolute",
// //               bottom: 14,
// //               left: 14,
// //               color: "#fff",
// //               fontWeight: 700,
// //               fontSize: "0.95rem",
// //             }}
// //           >
// //             {item.title}
// //           </Typography>
// //         </Box>
// //       </Grid>
// //     ))}
// //   </Grid>
// // </Grid>       </Grid> 
// //       </Container>
// //     </Box>
// //   );
// // }
// // import React, { react', useState, useEffect, useRef } from "react";
// import  {React,useState,useEffect,useRef} from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Container,
//   Button,
//   Stack,
// } from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import GroupsIcon from "@mui/icons-material/Groups";
// import MicIcon from "@mui/icons-material/Mic";
// import WavingHandIcon from "@mui/icons-material/WavingHand";
// // import { , useRef, useState } from "react";

// // ============================================
// // ANIMATION HOOK (Intersection Observer)
// // ============================================
// const useInView = (options = {}) => {
//   const ref = useRef(null);
//   const [isInView, setIsInView] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsInView(true);
//       }
//     }, { threshold: 0.2, ...options });

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return { ref, isInView };
// };

// // ============================================
// // ANIMATED COUNTER COMPONENT
// // ============================================
// const AnimatedCounter = ({ target, duration = 2000, suffix = "" }) => {
//   const [count, setCount] = useState(0);
//   const { ref, isInView } = useInView();

//   useEffect(() => {
//     if (!isInView) return;

//     let start = 0;
//     const increment = target / (duration / 16);
    
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [isInView, target, duration]);

//   return (
//     <span ref={ref}>
//       {count}{suffix}
//     </span>
//   );
// };

// // ============================================
// // FLOATING PARTICLE COMPONENT
// // ============================================
// const FloatingParticle = ({ delay = 0, x = "50%", y = "50%" }) => (
//   <Box
//     sx={{
//       position: "absolute",
//       left: x,
//       top: y,
//       width: "8px",
//       height: "8px",
//       borderRadius: "50%",
//       background: "linear-gradient(135deg, #ffb400, #ff6b00)",
//       opacity: 0.6,
//       animation: `float 6s ease-in-out infinite`,
//       animationDelay: `${delay}s`,
//       "@keyframes float": {
//         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
//         "25%": { transform: "translate(20px, -30px) scale(1.2)" },
//         "50%": { transform: "translate(-10px, -50px) scale(0.8)" },
//         "75%": { transform: "translate(30px, -20px) scale(1.1)" },
//       },
//     }}
//   />
// );

// // ============================================
// // PREMIUM IMAGE CARD WITH 3D HOVER
// // ============================================
// const PremiumImageCard = ({ image, title, index, isInView }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Box
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         position: "relative",
//         height: { xs: 220, md: 320 },
//         borderRadius: "24px",
//         overflow: "hidden",
//         cursor: "pointer",
        
//         // Entry Animation
//         opacity: isInView ? 1 : 0,
//         transform: isInView 
//           ? "translateY(0) rotateX(0)" 
//           : "translateY(60px) rotateX(10deg)",
//         transition: `
//           all 0.8s cubic-bezier(0.16, 1, 0.3, 1),
//           box-shadow 0.4s ease
//         `,
//         transitionDelay: `${index * 0.15}s`,
        
//         // 3D Tilt Effect on Hover
//         transformPerspective: "1000px",
//         ...(isHovered && {
//           transform: "translateY(-12px) scale(1.03)",
//           boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
//         }),
        
//         // Shadow
//         boxShadow: isHovered
//           ? "0 25px 50px rgba(0,0,0,0.2)"
//           : "0 10px 30px rgba(0,0,0,0.1)",
//       }}
//     >
//       {/* Background Image */}
//       <Box
//         component="img"
//         src={image}
//         alt={title}
//         sx={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
//           transform: isHovered ? "scale(1.12)" : "scale(1)",
//         }}
//       />

//       {/* Gradient Overlays */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)",
//           transition: "opacity 0.4s ease",
//           opacity: isHovered ? 1 : 0.7,
//         }}
//       />

//       {/* Shimmer Effect */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: isHovered
//             ? "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.08) 45%, transparent 55%)"
//             : "transparent",
//           transition: "background 0.6s ease",
//           animation: isHovered ? "shimmer 1.5s infinite" : "none",
//           "@keyframes shimmer": {
//             "0%": { transform: "translateX(-100%)" },
//             "100%": { transform: "translateX(100%)" },
//           },
//         }}
//       />

//       {/* Accent Line */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: isHovered ? "100%" : "0%",
//           height: "4px",
//           background: "linear-gradient(90deg, #ffb400, #ff6b00)",
//           transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       />

//       {/* Content */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           p: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             color: "#fff",
//             fontWeight: 800,
//             fontSize: { xs: "1rem", md: "1.25rem" },
//             transform: isHovered ? "translateY(-8px)" : "translateY(0)",
//             transition: "transform 0.4s ease",
//           }}
//         >
//           {title}
//         </Typography>

//         <Typography
//           sx={{
//             color: "rgba(255,255,255,0.6)",
//             fontSize: "0.85rem",
//             mt: 0.5,
//             transform: isHovered ? "translateY(0)" : "translateY(10px)",
//             opacity: isHovered ? 1 : 0,
//             transition: "all 0.4s ease 0.1s",
//           }}
//         >
//           View Gallery →
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// // ============================================
// // MAIN COMPONENT
// // ============================================
// export default function AboutEvent() {
//   const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
//   const [activeFeature, setActiveFeature] = useState(null);

//   const features = [
//     {
//       icon: <MicIcon sx={{ fontSize: 28 }} />,
//       title: "Keynote Speakers",
//       desc: "Learn from industry pioneers",
//     },
//     {
//       icon: <GroupsIcon sx={{ fontSize: 28 }} />,
//       title: "Networking",
//       desc: "Connect with 25K+ professionals",
//     },
//     {
//       icon: <AutoAwesomeIcon sx={{ fontSize: 28 }} />,
//       title: "Workshops",
//       desc: "80+ hands-on sessions",
//     },
//   ];

//   return (
//     <Box
//       ref={sectionRef}
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(165deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)",
//         py: { xs: 10, md: 14 },
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Background Decorative Elements */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "10%",
//           right: "-5%",
//           width: "600px",
//           height: "600px",
//           background: "radial-gradient(circle, rgba(255,180,0,0.08) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(60px)",
//           pointerEvents: "none",
//         }}
//       />
      
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: "20%",
//           left: "-10%",
//           width: "400px",
//           height: "400px",
//           background: "radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(60px)",
//           pointerEvents: "none",
//         }}
//       />

//       {/* Floating Particles */}
//       <FloatingParticle delay={0} x="15%" y="20%" />
//       <FloatingParticle delay={1} x="85%" y="30%" />
//       <FloatingParticle delay={2} x="75%" y="70%" />
//       <FloatingParticle delay={3} x="25%" y="80%" />

//       <Container maxWidth="xl">
//         <Grid container spacing={{ xs: 8, md: 10 }} alignItems="center">
          
//           {/* ========================================= */}
//           {/* LEFT CONTENT */}
//           {/* ========================================= */}
//           <Grid item xs={12} md={5.5}>
            
//             {/* Badge */}
//             <Box
//               sx={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 1,
//                 px: 2.5,
//                 py: 1,
//                 borderRadius: "50px",
//                 background: "rgba(255,180,0,0.1)",
//                 border: "1px solid rgba(255,180,0,0.3)",
//                 mb: 4,
//                 opacity: isInView ? 1 : 0,
//                 transform: isInView ? "translateX(0)" : "translateX(-30px)",
//                 transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
//               }}
//             >
//               <WavingHandIcon sx={{ color: "#FFB400", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#FFB400",
//                   fontWeight: 700,
//                   fontSize: "0.75rem",
//                   letterSpacing: "2px",
//                 }}
//               >
//                 ABOUT THE EVENT
//               </Typography>
//             </Box>

//             {/* Main Title */}
//             <Typography
//               sx={{
//                 fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
//                 fontWeight: 900,
//                 lineHeight: 1.05,
//                 color: "#fff",
//                 mb: 4,
//                 opacity: isInView ? 1 : 0,
//                 transform: isInView ? "translateY(0)" : "translateY(40px)",
//                 transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
//               }}
//             >
//               The Biggest{" "}
//               <Box
//                 component="span"
//                 sx={{
//                   background: "linear-gradient(135deg, #FFB400 0%, #FF6B00 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                 }}
//               >
//                 Creative & Business
//               </Box>{" "}
//               Expo 2026
//             </Typography>

//             {/* Description */}
//             <Typography
//               sx={{
//                 color: "rgba(255,255,255,0.65)",
//                 lineHeight: 1.9,
//                 fontSize: "1.1rem",
//                 mb: 5,
//                 opacity: isInView ? 1 : 0,
//                 transform: isInView ? "translateY(0)" : "translateY(40px)",
//                 transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
//               }}
//             >
//               Join thousands of innovators, entrepreneurs, creators, and industry 
//               leaders for an unforgettable experience packed with networking, 
//               workshops, keynote sessions, and live entertainment.
//             </Typography>

//             {/* Animated Stats */}
//             <Stack
//               direction="row"
//               spacing={{ xs: 4, md: 6 }}
//               sx={{
//                 mb: 5,
//                 opacity: isInView ? 1 : 0,
//                 transform: isInView ? "translateY(0)" : "translateY(40px)",
//                 transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
//               }}
//             >
//               {[
//                 { value: 25, suffix: "K+", label: "Attendees" },
//                 { value: 120, suffix: "+", label: "Speakers" },
//                 { value: 80, suffix: "+", label: "Workshops" },
//               ].map((stat, index) => (
//                 <Box key={index}>
//                   <Typography
//                     sx={{
//                       fontSize: { xs: "2.2rem", md: "2.8rem" },
//                       fontWeight: 900,
//                       color: "#FFB400",
//                       lineHeight: 1,
//                     }}
//                   >
//                     <AnimatedCounter target={stat.value} suffix={stat.suffix} />
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "rgba(255,255,255,0.5)",
//                       fontSize: "0.9rem",
//                       mt: 0.5,
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               ))}
//             </Stack>

//             {/* Buttons */}
//             <Stack
//               direction="row"
//               spacing={2}
//               sx={{
//                 opacity: isInView ? 1 : 0,
//                 transform: isInView ? "translateY(0)" : "translateY(40px)",
//                 transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
//               }}
//             >
//               <Button
//                 variant="contained"
//                 endIcon={<ArrowForwardIcon />}
//                 sx={{
//                   background: "linear-gradient(135deg, #FFB400 0%, #FF6B00 100%)",
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: "16px",
//                   textTransform: "none",
//                   fontWeight: 700,
//                   fontSize: "1rem",
//                   color: "#000",
//                   boxShadow: "0 8px 30px rgba(255,180,0,0.3)",
//                   "&:hover": {
//                     transform: "translateY(-3px)",
//                     boxShadow: "0 15px 40px rgba(255,180,0,0.4)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 Explore Event
//               </Button>

//               <Button
//                 startIcon={<PlayArrowIcon />}
//                 sx={{
//                   color: "#fff",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   fontSize: "1rem",
//                   px: 3,
//                   "&:hover": {
//                     background: "rgba(255,255,255,0.08)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 Watch Video
//               </Button>
//             </Stack>
//           </Grid>

//           {/* ========================================= */}
//           {/* RIGHT IMAGE GRID */}
//           {/* ========================================= */}
//           <Grid item xs={12} md={6.5}>
//             <Grid container spacing={2.5}>
//               {[
//                 {
//                   image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
//                   title: "Main Conference Hall",
//                 },
//                 {
//                   image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
//                   title: "Networking Session",
//                 },
//                 {
//                   image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
//                   title: "Live Workshops",
//                 },
//               ].map((item, index) => (
//                 <Grid item xs={12} sm={index === 0 ? 12 : 6} key={index}>
//                   <PremiumImageCard
//                     image={item.image}
//                     title={item.title}
//                     index={index}
//                     isInView={isInView}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>

//         </Grid>
//       </Container>
//     </Box>
//   );
// }
// import React from "react";

// const bentoImages = [
//   {
//     src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80",
//     tag: "Memorable Experience",
//     title: "Unforgettable Moments at EventSphere 2024",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=500&q=80",
//     tag: "Skilled Speakers",
//     title: "Storytelling Festival",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80",
//     tag: "Community Build",
//     title: "Build Networking",
//   },
// ];

// export default function AboutEvent() {
//   return (
//     <section className="about">
//       <div className="container">
//         <div className="about-inner">
//           {/* Left text */}
//           <div className="about-text">
//             <p className="eyebrow">About the Event</p>
//             <h2 className="sec-title">
//               About the<br />
//               <em>event</em>
//             </h2>
//             <p className="sec-desc">
//               EventSphere showcases groundbreaking innovations, featuring keynote
//               talks, interactive workshops, and networking sessions for tech
//               enthusiasts and industry leaders.
//             </p>

//             <div className="about-detail-row">
//               {[
//                 { num: "200+", label: "Exhibitors" },
//                 { num: "50K+", label: "Attendees" },
//                 { num: "80+",  label: "Speakers"  },
//                 { num: "3",    label: "Days"       },
//               ].map((d, i) => (
//                 <div className="about-detail-item" key={i}>
//                   <div className="about-detail-num">{d.num}</div>
//                   <div className="about-detail-label">{d.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right bento grid */}
//           <div className="about-bento">
//             {bentoImages.map((card, i) => (
//               <div className={`bento-card bento-card-${i}`} key={i}>
//                 <img src={card.src} alt={card.title} />
//                 <div className="bento-overlay" />
//                 <div className="bento-info">
//                   <div className="bento-tag">{card.tag}</div>
//                   <div className="bento-title">{card.title}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef } from "react";

const bentoImages = [
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80",
    tag: "Memorable Experience",
    title: "Unforgettable Moments at EventSphere 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=500&q=80",
    tag: "Skilled Speakers",
    title: "Storytelling Festival",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80",
    tag: "Community Build",
    title: "Build Networking",
  },
];

export default function AboutEvent() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Sab elements jo animate hone chahiye
    const animatedElements = section.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Ek baar animate hone ke baad unobserve kar do
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Thoda pehle trigger hoga
        threshold: 0.15, // 15% visible hone par trigger
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" ref={sectionRef}>
      <div className="container">
        <div className="about-inner">
          {/* Left text */}
          <div className="about-text animate-on-scroll animate-left">
            <p className="eyebrow animate-on-scroll animate-fade-down">About the Event</p>
            <h2 className="sec-title animate-on-scroll animate-fade-up">
              About the<br />
              <em>event</em>
            </h2>
            <p className="sec-desc animate-on-scroll animate-fade-up">
              EventSphere showcases groundbreaking innovations, featuring keynote
              talks, interactive workshops, and networking sessions for tech
              enthusiasts and industry leaders.
            </p>

            <div className="about-detail-row">
              {[
                { num: "200+", label: "Exhibitors" },
                { num: "50K+", label: "Attendees" },
                { num: "80+",  label: "Speakers"  },
                { num: "3",    label: "Days"       },
              ].map((d, i) => (
                <div 
                  className={`about-detail-item animate-on-scroll animate-pop`} 
                  key={i}
                  style={{ "--delay": `${0.3 + i * 0.15}s` }}
                >
                  <div className="about-detail-num">{d.num}</div>
                  <div className="about-detail-label">{d.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right bento grid */}
          <div className="about-bento animate-on-scroll animate-right">
            {bentoImages.map((card, i) => (
              <div 
                className={`bento-card bento-card-${i} animate-on-scroll animate-bento-pop`}
                key={i}
                style={{ "--delay": `${0.4 + i * 0.2}s` }}
              >
                <img src={card.src} alt={card.title} />
                <div className="bento-overlay" />
                <div className="bento-info">
                  <div className="bento-tag">{card.tag}</div>
                  <div className="bento-title">{card.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations - Scroll Triggered */}
      <style>{`
        /* === DEFAULT STATE (Hidden) === */
        .animate-on-scroll {
          opacity: 0;
          will-change: transform, opacity;
        }

        /* === VISIBLE STATE (Triggered by IntersectionObserver) === */
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* --- Left Slide In --- */
        .animate-left {
          transform: translateX(-80px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* --- Right Slide In --- */
        .animate-right {
          transform: translateX(80px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                      transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
        }

        /* --- Fade Up --- */
        .animate-fade-up {
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .animate-fade-up.is-visible {
          transition-delay: 0.1s;
        }

        /* --- Fade Down --- */
        .animate-fade-down {
          transform: translateY(-30px);
          transition: opacity 0.5s ease-out,
                      transform 0.5s ease-out;
        }
        .animate-fade-down.is-visible {
          transition-delay: 0s;
        }

        /* --- Pop In (for stats) --- */
        .animate-pop {
          transform: translateY(30px) scale(0.9);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Bento Pop In --- */
        .animate-bento-pop {
          transform: scale(0.85) translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0s),
                      transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0s);
        }

        /* === HOVER EFFECTS (Subtle - UI same hai) === */
        .bento-card {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s ease;
        }
        .bento-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .bento-card img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bento-card:hover img {
          transform: scale(1.08);
        }
        .bento-overlay {
          transition: opacity 0.4s ease;
        }
        .bento-card:hover .bento-overlay {
          opacity: 0.4;
        }
        .about-detail-item {
          transition: transform 0.3s ease;
        }
        .about-detail-item:hover {
          transform: translateY(-4px);
        }
        .about-detail-num {
          transition: transform 0.3s ease;
        }
        .about-detail-item:hover .about-detail-num {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}