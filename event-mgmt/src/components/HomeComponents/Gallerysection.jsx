// import React, { useState } from "react";
// import { Box, Typography, Container, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// // Replace with real gallery images or fetch from API
// const galleryItems = [
//   { id: 1, bg: "#1a1a2e", size: "tall" },    // tall left
//   { id: 2, bg: "#2d1b00", size: "wide" },    // wide top-right
//   { id: 3, bg: "#001a2d", size: "small" },
//   { id: 4, bg: "#1a001a", size: "small" },
//   { id: 5, bg: "#002d1a", size: "wide" },    // wide bottom-left
//   { id: 6, bg: "#2d2d00", size: "small" },
//   { id: 7, bg: "#1a1a1a", size: "tall" },    // tall right
//   { id: 8, bg: "#2d0000", size: "small" },
// ];

// // Image placeholder with a gradient bg
// function GalleryItem({ item, sx }) {
//   return (
//     <Box
//       sx={{
//         borderRadius: 2,
//         overflow: "hidden",
//         background: item.bg,
//         position: "relative",
//         cursor: "pointer",
//         "&:hover .goverlay": { opacity: 1 },
//         "&:hover img": { transform: "scale(1.07)" },
//         ...sx,
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           background: `linear-gradient(135deg, ${item.bg} 0%, #444 100%)`,
//           minHeight: "inherit",
//         }}
//       />
//       {/* Hover overlay */}
//       <Box
//         className="goverlay"
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: "rgba(245,197,24,0.2)",
//           opacity: 0,
//           transition: "opacity 0.3s ease",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: "50%",
//             background: "#F5C518",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "1.2rem",
//           }}
//         >
//           +
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default function GallerySection() {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ background: "#fff", py: { xs: 7, md: 10 } }}>
//       <Container maxWidth="lg">
//         {/* Header */}
//         <Box sx={{ textAlign: "center", mb: 5 }}>
//           <Typography
//             sx={{
//               fontSize: "0.75rem",
//               fontWeight: 700,
//               letterSpacing: "3px",
//               color: "#F5C518",
//               textTransform: "uppercase",
//               mb: 1,
//             }}
//           >
//             Photo Gallery
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: { xs: "2rem", md: "3rem" },
//               fontWeight: 900,
//               color: "#111",
//               lineHeight: 1.1,
//               fontFamily: "'Oswald', sans-serif",
//               textTransform: "uppercase",
//               mb: 1,
//             }}
//           >
//             Check our{" "}
//             <Box
//               component="span"
//               sx={{ color: "#F5C518", fontStyle: "italic" }}
//             >
//               Latest Gallery
//             </Box>
//           </Typography>
//           <Typography sx={{ color: "#888", fontSize: "0.9rem" }}>
//             Moments captured from our most memorable events
//           </Typography>
//         </Box>

//         {/* Masonry-style Grid using CSS Grid */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
//             gridTemplateRows: "auto",
//             gap: 1.5,
//             "& > *": { minHeight: 140 },
//           }}
//         >
//           {/* Row 1: tall left + 2 smalls + tall right */}
//           <Box sx={{ gridRow: "span 2", minHeight: 300 }}>
//             <GalleryItem item={galleryItems[0]} sx={{ height: "100%" }} />
//           </Box>
//           <GalleryItem item={galleryItems[1]} sx={{ minHeight: 140 }} />
//           <GalleryItem item={galleryItems[2]} sx={{ minHeight: 140 }} />
//           <Box sx={{ gridRow: "span 2", minHeight: 300 }}>
//             <GalleryItem item={galleryItems[6]} sx={{ height: "100%" }} />
//           </Box>

//           {/* Row 2 */}
//           <GalleryItem item={galleryItems[4]} sx={{ minHeight: 140 }} />
//           <GalleryItem item={galleryItems[3]} sx={{ minHeight: 140 }} />

//           {/* Row 3: wide bottom */}
//           <Box sx={{ gridColumn: "span 2", minHeight: 140 }}>
//             <GalleryItem item={galleryItems[5]} sx={{ height: "100%" }} />
//           </Box>
//           <GalleryItem item={galleryItems[7]} sx={{ minHeight: 140 }} />
//         </Box>

//         {/* See More */}
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <Button
//             onClick={() => navigate("/gallery")}
//             sx={{
//               px: 5,
//               py: 1.5,
//               fontWeight: 800,
//               borderRadius: "6px",
//               fontSize: "0.8rem",
//               textTransform: "uppercase",
//               letterSpacing: "1px",
//               background: "#111",
//               color: "#F5C518",
//               "&:hover": {
//                 background: "#F5C518",
//                 color: "#111",
//               },
//               transition: "all 0.25s",
//             }}
//           >
//             See More Photos
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
// import React from "react";

// const galleryItems = [
//   { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", views: "50K", name: "Tech Summit", large: true },
//   { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", views: "20K", name: "Business Conference" },
//   { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", views: "26K", name: "Innovation Festival" },
//   { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", views: "30K", name: "Next-gen Marketing" },
//   { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80", views: "18K", name: "Networking Event" },
// ];

// export default function GallerySection({ onNavigate }) {
//   return (
//     <section className="gallery">
//       <div className="container">
//         <div className="gallery-header-row">
//           <div>
//             <p className="eyebrow">Instagram</p>
//             <h2 className="sec-title" style={{ marginBottom: 0 }}>
//               Check our latest<br /><em>gallery</em>
//             </h2>
//           </div>
//           <button className="btn-outline" onClick={() => onNavigate("/gallery")}>
//             Follow on Instagram →
//           </button>
//         </div>

//         <div className="gallery-grid">
//           {galleryItems.map((item, i) => (
//             <div
//               className={`gallery-item ${item.large ? "gallery-item-large" : ""}`}
//               key={i}
//             >
//               <img src={item.src} alt={item.name} />
//               <div className="gallery-overlay">
//                 <div className="gallery-views">{item.views} views</div>
//                 <div className="gallery-name">{item.name}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="gallery-see-all">
//           <button className="btn-outline" onClick={() => onNavigate("/gallery")}>
//             View All Gallery →
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef } from "react";

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", views: "50K", name: "Tech Summit", large: true },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", views: "20K", name: "Business Conference" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", views: "26K", name: "Innovation Festival" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", views: "30K", name: "Next-gen Marketing" },
  { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80", views: "18K", name: "Networking Event" },
];

export default function GallerySection({ onNavigate }) {
  const sectionRef = useRef(null);

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
  }, []);

  return (
    <section className="gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header-row animate-on-scroll animate-fade-up">
          <div>
            <p className="eyebrow">Instagram</p>
            <h2 className="sec-title" style={{ marginBottom: 0 }}>
              Check our latest<br /><em>gallery</em>
            </h2>
          </div>
          <button className="btn-outline" onClick={() => onNavigate("/gallery")}>
            Follow on Instagram →
          </button>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div
              className={`gallery-item ${item.large ? "gallery-item-large" : ""} animate-on-scroll animate-gallery-pop`}
              key={i}
              style={{"--delay": `${0.15 + i * 0.1}s`}}
            >
              <img src={item.src} alt={item.name} />
              <div className="gallery-overlay">
                <div className="gallery-views">{item.views} views</div>
                <div className="gallery-name">{item.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-see-all animate-on-scroll animate-fade-up" style={{"--delay": "0.7s"}}>
          <button className="btn-outline" onClick={() => onNavigate("/gallery")}>
            View All Gallery →
          </button>
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

        /* --- Fade Up (Header, Button) --- */
        .animate-fade-up {
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Gallery Pop In (Grid Items) --- */
        .animate-gallery-pop {
          transform: scale(0.8) translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0s),
                      transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0s);
        }

        /* === HOVER EFFECTS (Subtle) === */
        .gallery-item {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s ease;
        }
        .gallery-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .gallery-item img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-item:hover img {
          transform: scale(1.1);
        }
        .gallery-overlay {
          transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
          backdrop-filter: blur(4px);
        }
        .gallery-views {
          transition: transform 0.3s ease;
        }
        .gallery-item:hover .gallery-views {
          transform: translateY(-4px);
        }
        .gallery-name {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-item:hover .gallery-name {
          transform: translateY(-2px);
        }
        .btn-outline {
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}