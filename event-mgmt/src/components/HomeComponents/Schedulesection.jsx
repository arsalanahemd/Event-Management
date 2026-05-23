// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   Button,
//   Chip,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// // Static schedule data — swap with API if available
// const scheduleDays = [
//   {
//     label: "Day 1",
//     date: "Sunday, December 2026",
//     theme: "Innovation & Technology",
//     sessions: [
//       {
//         id: 1,
//         title: "The Future of Digital Innovation",
//         speaker: "Dr. Alex Torres",
//         desc: "Explore the next-generation technologies transforming industries and redefining what's possible in our increasingly connected world.",
//         startTime: "10:00 AM",
//         endTime: "11:00 AM",
//         color: "#FFF9E6",
//         accent: "#F5C518",
//         speakerImage: null,
//       },
//       {
//         id: 2,
//         title: "Trends AI and Machine Learning",
//         speaker: "Dr. Tara Brown",
//         desc: "A deep dive into the most impactful AI breakthroughs shaping business strategy, product development, and customer experience.",
//         startTime: "11:30 AM",
//         endTime: "12:30 PM",
//         color: "#F0FFF4",
//         accent: "#4ade80",
//         speakerImage: null,
//       },
//       {
//         id: 3,
//         title: "Digital Marketing for a New Era",
//         speaker: "Nana Kwame",
//         desc: "Navigate the fast-evolving digital landscape for brands: how to leverage AI-assisted marketing to achieve sustainable growth.",
//         startTime: "2:00 PM",
//         endTime: "3:00 PM",
//         color: "#F0F7FF",
//         accent: "#60a5fa",
//         speakerImage: null,
//       },
//       {
//         id: 4,
//         title: "Introduction to Blockchain",
//         speaker: "Dr. Aria Voss",
//         desc: "A beginner-friendly overview of blockchain technology, smart contracts, and their real-world applications beyond cryptocurrency.",
//         startTime: "3:00 PM",
//         endTime: "4:00 PM",
//         color: "#FFF0F0",
//         accent: "#f87171",
//         speakerImage: null,
//       },
//     ],
//   },
// ];

// export default function ScheduleSection() {
//   const [activeDay, setActiveDay] = useState(0);
//   const navigate = useNavigate();
//   const day = scheduleDays[activeDay];

//   return (
//     <Box sx={{ background: "#f8f7f2", py: { xs: 7, md: 10 } }}>
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
//             Event Program
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: { xs: "2rem", md: "3rem" },
//               fontWeight: 900,
//               color: "#111",
//               lineHeight: 1.1,
//               fontFamily: "'Oswald', sans-serif",
//               textTransform: "uppercase",
//             }}
//           >
//             Browse All the{" "}
//             <Box
//               component="span"
//               sx={{ color: "#F5C518", fontStyle: "italic" }}
//             >
//               Schedule
//             </Box>
//           </Typography>
//         </Box>

//         {/* Day Tabs */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1.5,
//             mb: 4,
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//         >
//           {scheduleDays.map((d, i) => (
//             <Button
//               key={i}
//               onClick={() => setActiveDay(i)}
//               sx={{
//                 px: 3,
//                 py: 1,
//                 fontWeight: 700,
//                 borderRadius: "6px",
//                 fontSize: "0.8rem",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 background: activeDay === i ? "#111" : "#fff",
//                 color: activeDay === i ? "#F5C518" : "#555",
//                 border: activeDay === i ? "2px solid #111" : "2px solid #ddd",
//                 "&:hover": {
//                   background: "#111",
//                   color: "#F5C518",
//                   borderColor: "#111",
//                 },
//                 transition: "all 0.25s",
//               }}
//             >
//               {d.label}
//             </Button>
//           ))}
//         </Box>

//         {/* Day Header Bar */}
//         <Box
//           sx={{
//             background: "#111",
//             borderRadius: "10px 10px 0 0",
//             px: 3,
//             py: 2,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: 1,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#fff",
//               fontWeight: 700,
//               fontSize: "0.9rem",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             📅 {day.date}
//           </Typography>
//           <Chip
//             label={day.theme}
//             sx={{
//               background: "#F5C518",
//               color: "#111",
//               fontWeight: 800,
//               fontSize: "0.7rem",
//               letterSpacing: "1px",
//               textTransform: "uppercase",
//               height: 28,
//             }}
//           />
//         </Box>

//         {/* Sessions */}
//         <Box
//           sx={{
//             border: "1px solid #e5e5e5",
//             borderTop: "none",
//             borderRadius: "0 0 10px 10px",
//             overflow: "hidden",
//           }}
//         >
//           {day.sessions.map((session, idx) => (
//             <Box
//               key={session.id}
//               sx={{
//                 display: "flex",
//                 alignItems: "stretch",
//                 background: session.color,
//                 borderBottom:
//                   idx < day.sessions.length - 1
//                     ? "1px solid rgba(0,0,0,0.06)"
//                     : "none",
//                 transition: "all 0.25s",
//                 "&:hover": {
//                   filter: "brightness(0.97)",
//                 },
//               }}
//             >
//               {/* Left accent bar */}
//               <Box
//                 sx={{
//                   width: 5,
//                   flexShrink: 0,
//                   background: session.accent,
//                 }}
//               />

//               {/* Speaker avatar */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   px: 2,
//                   py: 2.5,
//                   flexShrink: 0,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 44,
//                     height: 44,
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     border: `2px solid ${session.accent}`,
//                     background: "#ccc",
//                   }}
//                 >
//                   {session.speakerImage ? (
//                     <img
//                       src={session.speakerImage}
//                       alt={session.speaker}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   ) : (
//                     <Box
//                       sx={{
//                         width: "100%",
//                         height: "100%",
//                         background: `linear-gradient(135deg, ${session.accent}44, ${session.accent}88)`,
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Box>

//               {/* Session info */}
//               <Box sx={{ flex: 1, py: 2.5, pr: 2 }}>
//                 <Typography
//                   sx={{
//                     fontWeight: 800,
//                     color: "#111",
//                     fontSize: "0.9rem",
//                     fontFamily: "'Oswald', sans-serif",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                     mb: 0.3,
//                   }}
//                 >
//                   {session.title}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: session.accent,
//                     fontSize: "0.72rem",
//                     fontWeight: 700,
//                     mb: 0.5,
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                   }}
//                 >
//                   By {session.speaker}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#666",
//                     fontSize: "0.78rem",
//                     lineHeight: 1.6,
//                     display: { xs: "none", md: "-webkit-box" },
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {session.desc}
//                 </Typography>
//               </Box>

//               {/* Time */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "flex-end",
//                   px: { xs: 1.5, md: 3 },
//                   flexShrink: 0,
//                   borderLeft: "1px solid rgba(0,0,0,0.06)",
//                   minWidth: { xs: 80, md: 110 },
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontWeight: 800,
//                     color: "#111",
//                     fontSize: { xs: "0.75rem", md: "0.85rem" },
//                     textAlign: "right",
//                   }}
//                 >
//                   {session.startTime}
//                 </Typography>
//                 <Typography sx={{ color: "#aaa", fontSize: "0.65rem" }}>—</Typography>
//                 <Typography
//                   sx={{
//                     fontWeight: 800,
//                     color: "#111",
//                     fontSize: { xs: "0.75rem", md: "0.85rem" },
//                     textAlign: "right",
//                   }}
//                 >
//                   {session.endTime}
//                 </Typography>
//               </Box>
//             </Box>
//           ))}
//         </Box>

//         {/* See More */}
//         <Box sx={{ textAlign: "center", mt: 4 }}>
//           <Button
//             onClick={() => navigate("/schedule")}
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
//             See Full Schedule
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
// import React from "react";

// const days = [
//   {
//     num: "01",
//     label: "Day 01",
//     date: "Sunday, December 2025",
//     track: "Innovation & Technology",
//     items: [
//       {
//         time: "10:00 AM - 11:00 AM",
//         title: "The Future of Digital Innovation",
//         speaker: "Make Torello",
//         img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80",
//       },
//       {
//         time: "11:00 AM - 12:00 PM",
//         title: "Trends in AI and Machine Learning",
//         speaker: "David Brown",
//         img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
//       },
//       {
//         time: "12:30 PM - 02:00 PM",
//         title: "Lunch Break & Networking",
//         speaker: null,
//         isBreak: true,
//       },
//       {
//         time: "02:00 PM - 03:00 PM",
//         title: "Digital Marketing for a New Era",
//         speaker: "Jenifer Moore",
//         img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
//       },
//       {
//         time: "03:30 PM - 04:30 PM",
//         title: "Introduction to Blockchain",
//         speaker: "David Brown",
//         img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
//       },
//     ],
//   },
// ];

// export default function ScheduleSection({ onNavigate }) {
//   return (
//     <section className="schedule">
//       <div className="container">
//         <div className="sec-header">
//           <p className="eyebrow">Program</p>
//           <h2 className="sec-title">
//             Browse all the<br /><em>schedule</em>
//           </h2>
//           <p className="sec-desc">
//             Explore the complete event schedule to find sessions, speakers,
//             and activities that match your interests.
//           </p>
//         </div>

//         {days.map((day, di) => (
//           <div key={di} style={{ marginBottom: 40 }}>
//             <div className="schedule-day-header">
//               <div className="schedule-day-num">{day.num}</div>
//               <div className="schedule-day-info">
//                 <div className="schedule-day-label">{day.label}</div>
//                 <div className="schedule-day-date">{day.date}</div>
//               </div>
//               <div className="schedule-track-badge">{day.track}</div>
//             </div>

//             <div className="schedule-items">
//               {day.items.map((item, ii) => (
//                 <div
//                   className={`schedule-item ${item.isBreak ? "break" : ""}`}
//                   key={ii}
//                 >
//                   <div className="sched-time">{item.time}</div>
//                   <div className="sched-body">
//                     <div className="sched-title">{item.title}</div>
//                     {item.speaker && (
//                       <div className="sched-speaker">
//                         By &nbsp;<span>{item.speaker}</span>
//                       </div>
//                     )}
//                   </div>
//                   {item.img && (
//                     <img
//                       className="sched-speaker-img"
//                       src={item.img}
//                       alt={item.speaker}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="schedule-see-all">
//           <button className="btn-gold" onClick={() => onNavigate("/schedule")}>
//             See All Schedule →
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef } from "react";

const days = [
  {
    num: "01",
    label: "Day 01",
    date: "Sunday, December 2025",
    track: "Innovation & Technology",
    items: [
      {
        time: "10:00 AM - 11:00 AM",
        title: "The Future of Digital Innovation",
        speaker: "Make Torello",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80",
      },
      {
        time: "11:00 AM - 12:00 PM",
        title: "Trends in AI and Machine Learning",
        speaker: "David Brown",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
      },
      {
        time: "12:30 PM - 02:00 PM",
        title: "Lunch Break & Networking",
        speaker: null,
        isBreak: true,
      },
      {
        time: "02:00 PM - 03:00 PM",
        title: "Digital Marketing for a New Era",
        speaker: "Jenifer Moore",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      },
      {
        time: "03:30 PM - 04:30 PM",
        title: "Introduction to Blockchain",
        speaker: "David Brown",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
      },
    ],
  },
];

export default function ScheduleSection({ onNavigate }) {
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
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="schedule" ref={sectionRef}>
      <div className="container">
        <div className="sec-header animate-on-scroll animate-fade-up">
          <p className="eyebrow">Program</p>
          <h2 className="sec-title">
            Browse all the<br /><em>schedule</em>
          </h2>
          <p className="sec-desc">
            Explore the complete event schedule to find sessions, speakers,
            and activities that match your interests.
          </p>
        </div>

        {days.map((day, di) => (
          <div key={di} style={{ marginBottom: 40 }}>
            <div 
              className="schedule-day-header animate-on-scroll animate-slide-right" 
              style={{"--delay": `${di * 0.15}s`}}
            >
              <div className="schedule-day-num">{day.num}</div>
              <div className="schedule-day-info">
                <div className="schedule-day-label">{day.label}</div>
                <div className="schedule-day-date">{day.date}</div>
              </div>
              <div className="schedule-track-badge">{day.track}</div>
            </div>

            <div className="schedule-items">
              {day.items.map((item, ii) => (
                <div
                  className={`schedule-item ${item.isBreak ? "break" : ""} animate-on-scroll animate-item-slide`}
                  key={ii}
                  style={{"--delay": `${0.2 + di * 0.15 + ii * 0.1}s`}}
                >
                  <div className="sched-time">{item.time}</div>
                  <div className="sched-body">
                    <div className="sched-title">{item.title}</div>
                    {item.speaker && (
                      <div className="sched-speaker">
                        By &nbsp;<span>{item.speaker}</span>
                      </div>
                    )}
                  </div>
                  {item.img && (
                    <img
                      className="sched-speaker-img"
                      src={item.img}
                      alt={item.speaker}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="schedule-see-all animate-on-scroll animate-fade-up" style={{"--delay": "0.6s"}}>
          <button className="btn-gold" onClick={() => onNavigate("/schedule")}>
            See All Schedule →
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

        /* --- Slide Right (Day Header) --- */
        .animate-slide-right {
          transform: translateX(-60px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Item Slide Up (Schedule Items) --- */
        .animate-item-slide {
          transform: translateY(30px) scale(0.97);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* === HOVER EFFECTS (Subtle) === */
        .schedule-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .schedule-item:hover {
          transform: translateX(6px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }
        .schedule-item.break:hover {
          transform: translateX(6px) scale(1.01);
        }
        .sched-speaker-img {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .schedule-item:hover .sched-speaker-img {
          transform: scale(1.12);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .btn-gold {
          transition: all 0.3s ease;
        }
        .btn-gold:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .schedule-day-header {
          transition: transform 0.3s ease;
        }
        .schedule-day-header:hover {
          transform: translateX(4px);
        }
        .schedule-track-badge {
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .schedule-day-header:hover .schedule-track-badge {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}