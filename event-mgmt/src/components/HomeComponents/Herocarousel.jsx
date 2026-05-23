// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";
// // import carousel1 from "../../assets/img/events/carousel1.png";
// // import carouseli from "..assets\carousel1.png";
// import carousel1 from "../../assets/carousel1.png";
// import carousel2 from "../../assets/carousel2.png";
// import carousel3 from "../../assets/carousel3.png";

// const heroExpos = [
//   {
//     image: carousel2,
//     tag: "12 / 17 December Annual Fete",
//     title: "Tech Innovation\nEvent 2025",
//     description:
//       "Discover the latest innovations in technology and connect with industry leaders shaping tomorrow's world.",
//   },
//   {
//     image: carousel1,
//     tag: "Marketing Summit 2025",
//     title: "Marketing\nExpo",
//     description:
//       "Explore modern marketing trends, branding & growth strategies from top creative minds.",
//   },
//   {
//     image: carousel3,
//     tag: "Creative & Design 2025",
//     title: "Art & Design\nExpo",
//     description:
//       "Explore creativity and design like never before — where art meets innovation.",
//   },
// ];

// const swiperBtnStyles = {
//   "--swiper-navigation-color": "#F5C518",
//   "--swiper-pagination-color": "#F5C518",
// };

// export default function HeroCarousel() {
//   const navigate = useNavigate();

//   return (
//     <Swiper
//       spaceBetween={0}
//       centeredSlides
//       autoplay={{ delay: 3500, disableOnInteraction: false }}
//       pagination={{ clickable: true }}
//       navigation
//       modules={[Autoplay, Pagination, Navigation]}
//       style={{ height: "100vh", ...swiperBtnStyles }}
//     >
//       {heroExpos.map((expo, index) => (
//         <SwiperSlide key={index}>
//           <Box
//             sx={{
//               position: "relative",
//               height: "100vh",
//               display: "flex",
//               alignItems: "center",
//               overflow: "hidden",
//               background: "#111",
//             }}
//           >
//             {/* Background Image */}
//             <img
//               src={expo.image}
//               alt={expo.title}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 filter: "brightness(35%)",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 zIndex: 0,
//               }}
//             />

//             {/* Decorative yellow circle */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "10%",
//                 right: "5%",
//                 width: { xs: 120, md: 220 },
//                 height: { xs: 120, md: 220 },
//                 borderRadius: "50%",
//                 background: "rgba(245,197,24,0.12)",
//                 border: "2px solid rgba(245,197,24,0.3)",
//                 zIndex: 1,
//               }}
//             />

//             {/* Content */}
//             <Box
//               sx={{
//                 position: "relative",
//                 zIndex: 2,
//                 px: { xs: 3, sm: 6, md: 10 },
//                 maxWidth: { xs: "100%", md: "65%" },
//               }}
//             >
//               {/* Small tag */}
//               <Typography
//                 sx={{
//                   color: "#F5C518",
//                   fontSize: { xs: "0.7rem", md: "0.85rem" },
//                   fontWeight: 700,
//                   letterSpacing: "3px",
//                   textTransform: "uppercase",
//                   mb: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <Box
//                   component="span"
//                   sx={{
//                     display: "inline-block",
//                     width: 28,
//                     height: 2,
//                     background: "#F5C518",
//                     borderRadius: 2,
//                   }}
//                 />
//                 {expo.tag}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5.5rem" },
//                   fontWeight: 900,
//                   color: "#fff",
//                   lineHeight: 1.05,
//                   mb: 3,
//                   whiteSpace: "pre-line",
//                   fontFamily: "'Oswald', 'Anton', sans-serif",
//                   textTransform: "uppercase",
//                   letterSpacing: "-1px",
//                 }}
//               >
//                 {expo.title}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: { xs: "0.9rem", md: "1rem" },
//                   color: "rgba(255,255,255,0.7)",
//                   mb: 4,
//                   maxWidth: 480,
//                   lineHeight: 1.7,
//                 }}
//               >
//                 {expo.description}
//               </Typography>

//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 <Button
//                   size="large"
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     fontSize: "0.85rem",
//                     fontWeight: 800,
//                     borderRadius: "6px",
//                     background: "#F5C518",
//                     color: "#111",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     "&:hover": {
//                       background: "#e6b800",
//                       transform: "translateY(-2px)",
//                     },
//                     transition: "all 0.3s",
//                   }}
//                   onClick={() => navigate("/events")}
//                 >
//                   Buy Ticket
//                 </Button>
//                 <Button
//                   size="large"
//                   variant="outlined"
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     fontSize: "0.85rem",
//                     fontWeight: 700,
//                     borderRadius: "6px",
//                     borderColor: "rgba(255,255,255,0.5)",
//                     color: "#fff",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     "&:hover": {
//                       borderColor: "#F5C518",
//                       color: "#F5C518",
//                       background: "transparent",
//                     },
//                     transition: "all 0.3s",
//                   }}
//                   onClick={() => navigate("/events")}
//                 >
//                   Learn More
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }
import React from "react";

export default function HeroSection({ onNavigate }) {
  return (
    <section className="hero">
      {/* Big decorative bg text */}
      <div className="hero-bg-text">EVENTSPHERE</div>

      {/* Gold circle glow */}
      <div className="hero-circle" />

      {/* Left content */}
      <div className="hero-content">
        <div className="hero-date-tag">
          15-17 December &nbsp;·&nbsp; National IT Hall
        </div>

        <h1 className="hero-title">
          Tech Innovation
          <span className="hero-title-italic">Event 2025</span>
        </h1>

        <p className="hero-desc">
          Unveiling breakthrough technologies and networking opportunities
          for industry pioneers, creators, and innovators.
        </p>

        <div className="hero-actions">
          <button className="btn-gold" onClick={() => onNavigate("/events")}>
            Buy Tickets →
          </button>
          <button className="btn-outline" onClick={() => onNavigate("/schedule")}>
            See Schedule
          </button>
        </div>

        <div className="hero-stats">
          {[
            { num: "200+", label: "Exhibitors" },
            { num: "50K+", label: "Attendees" },
            { num: "80+",  label: "Speakers"  },
            { num: "3",    label: "Days"       },
          ].map((s, i) => (
            <div key={i}>
              <span className="hero-stat-num">{s.num}</span>
              <span className="hero-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right floating person/event image */}
      <div className="hero-img-wrap">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85"
          alt="Event"
          style={{ borderRadius: "0 0 0 120px", opacity: 0.9 }}
        />
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll">Scroll to explore</div>
    </section>
  );
}