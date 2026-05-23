// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import {
//   Avatar,
//   Box,
//   Container,
//   Stack,
//   SvgIcon,
//   Typography,
//   Unstable_Grid2 as Grid,
// } from "@mui/material";
// import { OverviewSummary } from "src/sections/overview/overview-summary";
// import PeopleIcon from "@mui/icons-material/People";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import BusinessIcon from "@mui/icons-material/Business";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// import PlaceIcon from "@mui/icons-material/Place";
// import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
// import Logo from "/src/assets/LogoName.png";

// // Chart import
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// const BASE_URL = "http://localhost:3001";

// // Neon Theme Palette
// const NEON_CYAN = "#4CC9F0";
// const NEON_BLUE = "#4361EE";
// const NEON_TEAL = "#06D6A0";
// const TEXT_PRIMARY = "#FFFFFF";
// const TEXT_SECONDARY = "#B0B3B8";

// const COLORS = [NEON_CYAN, NEON_BLUE, NEON_TEAL, "#3F37C9"];

// const Page = () => {
//   const [counts, setCounts] = useState({
//     users: 0,
//     registrations: 0,
//     exhibitors: 0,
//     messages: 0,
//     venues: 0,
//     speakers: 0,
//   });

//   const [registrationData, setRegistrationData] = useState([]);
//   const [userRoleData, setUserRoleData] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const [summaryRes, regChartRes, roleChartRes] = await Promise.all([
//           axios.get(`${BASE_URL}/reports/summary`),
//           axios.get(`${BASE_URL}/reports/registrations-per-month`),
//           axios.get(`${BASE_URL}/reports/users-by-role`),
//         ]);

//         if (summaryRes.data.success) setCounts(summaryRes.data.data);
//         if (regChartRes.data.success) setRegistrationData(regChartRes.data.data);
//         if (roleChartRes.data.success) setUserRoleData(roleChartRes.data.data);
//       } catch (err) {
//         console.error("Error fetching report data:", err);
//       }
//     };
//     fetchAllData();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Dashmin | EventSphere</title>
//       </Helmet>
//       <Box sx={{ flexGrow: 1, py: 4, backgroundColor: "#0D1B2A", minHeight: "100vh" }}>
//         <Container maxWidth="xl">
//           <Stack spacing={4}>
//             {/* LOGO & TITLE */}
//             <Box
//               sx={{
//                 textAlign: "center",
//                 mb: { xs: 2, md: 4 },
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Box
//                 component="img"
//                 src={Logo}
//                 alt="EventSphere Logo"
//                 sx={{
//                   height: {
//                     xs: "50px",
//                     sm: "65px",
//                     md: "80px",
//                   },
//                   width: "auto",
//                   marginBottom: "10px",
//                   filter: "drop-shadow(0 0 10px #000000)",
//                   transition: "all 0.3s ease-in-out",
//                   maxWidth: "90%",
//                   objectFit: "contain",
//                 }}
//               />

//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: 900,
//                   fontSize: {
//                     xs: "1.5rem",
//                     sm: "2rem",
//                     md: "3rem",
//                   },
//                   color: TEXT_PRIMARY,
//                   background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_BLUE})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   letterSpacing: { xs: "1px", md: "2px" },
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Admin Dashboard
//               </Typography>
//             </Box>

//             {/* Summary Cards  */}
//             <Grid container spacing={3}>
//               {[
//                 { label: "Total Users", value: counts.users, icon: <PeopleIcon /> },
//                 {
//                   label: "Total Registrations",
//                   value: counts.registrations,
//                   icon: <AssignmentTurnedInIcon />,
//                 },
//                 { label: "Total Exhibitors", value: counts.exhibitors, icon: <BusinessIcon /> },
//                 { label: "Total Messages", value: counts.messages, icon: <MarkEmailReadIcon /> },
//                 { label: "Total Venues", value: counts.venues, icon: <PlaceIcon /> },
//                 { label: "Total Speakers", value: counts.speakers, icon: <RecordVoiceOverIcon /> },
//               ].map((item, index) => (
//                 <Grid key={index} xs={12} sm={6} md={4}>
//                   <OverviewSummary
//                     sx={{
//                       background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%) !important",
//                       backgroundColor: "#0D1B2A !important",
//                       border: "1px solid rgba(76, 201, 240, 0.3)",
//                       borderRadius: "16px",
//                       transition: "0.3s",
//                       "& .MuiCard-root": {
//                         backgroundColor: "transparent !important",
//                       },
//                       "&:hover": {
//                         transform: "translateY(-5px)",
//                         boxShadow: "0 8px 20px rgba(76, 201, 240, 0.2)",
//                         borderColor: "#4CC9F0",
//                       },
//                     }}
//                     icon={
//                       <Avatar
//                         sx={{
//                           backgroundColor: "#0D1B2A !important",
//                           height: 56,
//                           width: 56,
//                           border: "1px solid #4CC9F0",
//                         }}
//                       >
//                         <SvgIcon sx={{ color: "#4CC9F0 !important", fontSize: 28 }}>
//                           {item.icon}
//                         </SvgIcon>
//                       </Avatar>
//                     }
//                     label={
//                       <Typography
//                         sx={{
//                           color: "#475569 !important",
//                           fontWeight: 700,
//                           fontSize: "0.75rem",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                         }}
//                       >
//                         {item.label}
//                       </Typography>
//                     }
//                     value={
//                       <Typography
//                         variant="h4"
//                         sx={{
//                           fontWeight: 900,
//                           color: "#1E293B !important",
//                           mt: 0.5,
//                           textShadow: "1px 1px 0px rgba(255,255,255,0.05)",
//                         }}
//                       >
//                         {item.value}
//                       </Typography>
//                     }
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//             {/*  Charts Section */}
//             <Grid container spacing={3}>
//               <Grid xs={12} lg={8}>
//                 <Box
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     backgroundColor: "#1B263B",
//                     border: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ mb: 3, color: NEON_CYAN, fontWeight: "bold" }}>
//                     Monthly Registrations
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={350}>
//                     <LineChart data={registrationData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//                       <XAxis dataKey="month" stroke={TEXT_SECONDARY} fontSize={12} />
//                       <YAxis stroke={TEXT_SECONDARY} fontSize={12} />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: "#0D1B2A",
//                           border: `1px solid ${NEON_CYAN}`,
//                           borderRadius: "8px",
//                         }}
//                         itemStyle={{ color: TEXT_PRIMARY }}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="count"
//                         stroke={NEON_CYAN}
//                         strokeWidth={4}
//                         dot={{ r: 6, fill: NEON_CYAN, stroke: "#1B263B", strokeWidth: 2 }}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </Grid>

//               <Grid xs={12} lg={4}>
//                 <Box
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     backgroundColor: "#1B263B",
//                     border: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ mb: 3, color: NEON_TEAL, fontWeight: "bold" }}>
//                     Role Distribution
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={350}>
//                     <PieChart>
//                       <Pie
//                         data={userRoleData}
//                         dataKey="value"
//                         nameKey="role"
//                         innerRadius={70}
//                         outerRadius={100}
//                         paddingAngle={8}
//                         label={{ fill: TEXT_PRIMARY, fontSize: 12, fontWeight: "bold" }}
//                       >
//                         {userRoleData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend verticalAlign="bottom" wrapperStyle={{ color: TEXT_PRIMARY }} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Page;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Logo from "/src/assets/LogoNameTagline.jpg";

/* ---- FONT INJECT ---- */
if (!document.getElementById("monks-fonts")) {
  const l = document.createElement("link");
  l.id = "monks-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

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

const BASE_URL = "http://localhost:3001";

const COLORS = [G.gold, "#4361EE", "#06D6A0", "#3F37C9"];

/* =============================================
   ICONS (SVG)
   ============================================= */
const IconUsers = ({ size = 28, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconRegistrations = ({ size = 28, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>
  </svg>
);
const IconBusiness = ({ size = 28, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 9h4"/><path d="M10 13h4"/>
  </svg>
);
const IconMessage = ({ size = 28, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconLocation = ({ size = 28, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMic = ({ size = 28, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
);

/* =============================================
   SUMMARY CARD
   ============================================= */
function SummaryCard({ label, value, icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: G.black2,
        border: `1px solid ${G.border}`,
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = G.bGold;
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = G.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Gold top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${G.gold}, transparent)`,
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "56px", height: "56px",
          background: "rgba(201,168,76,0.08)",
          border: `1px solid ${G.bGold}`,
          borderRadius: "14px",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: G.w30, marginBottom: "6px",
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "2rem", fontWeight: 700,
            color: G.white, lineHeight: 1,
          }}>
            {value}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   CHART CARD
   ============================================= */
function ChartCard({ title, children, color = G.gold }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        background: G.black2,
        border: `1px solid ${G.border}`,
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />

      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px", fontWeight: 700,
        color: color,
        marginBottom: "20px",
        letterSpacing: "0.04em",
      }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    registrations: 0,
    exhibitors: 0,
    messages: 0,
    venues: 0,
    speakers: 0,
  });

  const [registrationData, setRegistrationData] = useState([]);
  const [userRoleData, setUserRoleData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [summaryRes, regChartRes, roleChartRes] = await Promise.all([
          axios.get(`${BASE_URL}/reports/summary`),
          axios.get(`${BASE_URL}/reports/registrations-per-month`),
          axios.get(`${BASE_URL}/reports/users-by-role`),
        ]);

        if (summaryRes.data.success) setCounts(summaryRes.data.data);
        if (regChartRes.data.success) setRegistrationData(regChartRes.data.data);
        if (roleChartRes.data.success) setUserRoleData(roleChartRes.data.data);
      } catch (err) {
        console.error("Error fetching report data:", err);
      }
    };
    fetchAllData();
  }, []);

  const summaryItems = [
    { label: "Total Users", value: counts.users, icon: <IconUsers /> },
    { label: "Total Registrations", value: counts.registrations, icon: <IconRegistrations /> },
    { label: "Total Exhibitors", value: counts.exhibitors, icon: <IconBusiness /> },
    { label: "Total Messages", value: counts.messages, icon: <IconMessage /> },
    { label: "Total Venues", value: counts.venues, icon: <IconLocation /> },
    { label: "Total Speakers", value: counts.speakers, icon: <IconMic /> },
  ];

  return (
    <>
      <Helmet>
        <title>Dashmin | EventSphere</title>
      </Helmet>

      <div style={{
        background: G.black,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: "antialiased",
        padding: "24px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ spacing: 4 }}>
            {/* ---- LOGO & TITLE ---- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: "8px" }}
            >
              <img
                src={Logo}
                alt="EventSphere Logo"
                style={{
                  height: "clamp(50px, 8vw, 80px)",
                  width: "auto",
                  marginBottom: "12px",
                  filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
                  transition: "all 0.3s ease-in-out",
                  maxWidth: "90%",
                  objectFit: "contain",
                }}
              />

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
                borderRadius: "4px", padding: "6px 16px",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: G.gold,
                fontFamily: "'Inter', sans-serif", marginBottom: "12px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold }} />
                Overview
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700, color: G.white,
                letterSpacing: "-0.01em",
                margin: 0,
              }}>
                Admin{" "}
                <em style={{ fontStyle: "italic", color: G.gold }}>Dashboard</em>
              </h1>
            </motion.div>

            {/* ---- SUMMARY CARDS ---- */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}>
              {summaryItems.map((item, index) => (
                <SummaryCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  index={index}
                />
              ))}
            </div>

            {/* ---- CHARTS ---- */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px",
            }}>
              {/* Line Chart */}
              <ChartCard title="Monthly Registrations" color={G.gold}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke={G.w55} fontSize={12} />
                    <YAxis stroke={G.w55} fontSize={12} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: G.black2,
                        border: `1px solid ${G.bGold}`,
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: G.white }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke={G.gold}
                      strokeWidth={3}
                      dot={{ r: 5, fill: G.gold, stroke: G.black2, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Pie Chart */}
              <ChartCard title="Role Distribution" color="#06D6A0">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      dataKey="value"
                      nameKey="role"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      label={{ fill: G.white, fontSize: 12, fontWeight: "bold" }}
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" wrapperStyle={{ color: G.w55 }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}