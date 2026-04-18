import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { OverviewSummary } from "src/sections/overview/overview-summary";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BusinessIcon from "@mui/icons-material/Business";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PlaceIcon from "@mui/icons-material/Place";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Logo from "/src/assets/LogoName.png";

// Chart import
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BASE_URL = "http://localhost:3001";

// Neon Theme Palette
const NEON_CYAN = "#4CC9F0";
const NEON_BLUE = "#4361EE";
const NEON_TEAL = "#06D6A0";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#B0B3B8";

const COLORS = [NEON_CYAN, NEON_BLUE, NEON_TEAL, "#3F37C9"];

const Page = () => {
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

  return (
    <>
      <Helmet>
        <title>Dashmin | EventSphere</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 4, backgroundColor: "#0D1B2A", minHeight: "100vh" }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            {/* LOGO & TITLE */}
            <Box
              sx={{
                textAlign: "center",
                mb: { xs: 2, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="EventSphere Logo"
                sx={{
                  height: {
                    xs: "50px",
                    sm: "65px",
                    md: "80px",
                  },
                  width: "auto",
                  marginBottom: "10px",
                  filter: "drop-shadow(0 0 10px #4CC9F0)",
                  transition: "all 0.3s ease-in-out",
                  maxWidth: "90%",
                  objectFit: "contain",
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "3rem",
                  },
                  color: TEXT_PRIMARY,
                  background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_BLUE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: { xs: "1px", md: "2px" },
                  textTransform: "uppercase",
                }}
              >
                Admin Dashboard
              </Typography>
            </Box>

            {/* Summary Cards  */}
            <Grid container spacing={3}>
              {[
                { label: "Total Users", value: counts.users, icon: <PeopleIcon /> },
                {
                  label: "Total Registrations",
                  value: counts.registrations,
                  icon: <AssignmentTurnedInIcon />,
                },
                { label: "Total Exhibitors", value: counts.exhibitors, icon: <BusinessIcon /> },
                { label: "Total Messages", value: counts.messages, icon: <MarkEmailReadIcon /> },
                { label: "Total Venues", value: counts.venues, icon: <PlaceIcon /> },
                { label: "Total Speakers", value: counts.speakers, icon: <RecordVoiceOverIcon /> },
              ].map((item, index) => (
                <Grid key={index} xs={12} sm={6} md={4}>
                  <OverviewSummary
                    sx={{
                      background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%) !important",
                      backgroundColor: "#0D1B2A !important",
                      border: "1px solid rgba(76, 201, 240, 0.3)",
                      borderRadius: "16px",
                      transition: "0.3s",
                      "& .MuiCard-root": {
                        backgroundColor: "transparent !important",
                      },
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(76, 201, 240, 0.2)",
                        borderColor: "#4CC9F0",
                      },
                    }}
                    icon={
                      <Avatar
                        sx={{
                          backgroundColor: "#0D1B2A !important",
                          height: 56,
                          width: 56,
                          border: "1px solid #4CC9F0",
                        }}
                      >
                        <SvgIcon sx={{ color: "#4CC9F0 !important", fontSize: 28 }}>
                          {item.icon}
                        </SvgIcon>
                      </Avatar>
                    }
                    label={
                      <Typography
                        sx={{
                          color: "#475569 !important",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                    value={
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 900,
                          color: "#1E293B !important",
                          mt: 0.5,
                          textShadow: "1px 1px 0px rgba(255,255,255,0.05)",
                        }}
                      >
                        {item.value}
                      </Typography>
                    }
                  />
                </Grid>
              ))}
            </Grid>
            {/*  Charts Section */}
            <Grid container spacing={3}>
              <Grid xs={12} lg={8}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#1B263B",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, color: NEON_CYAN, fontWeight: "bold" }}>
                    Monthly Registrations
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={registrationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke={TEXT_SECONDARY} fontSize={12} />
                      <YAxis stroke={TEXT_SECONDARY} fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0D1B2A",
                          border: `1px solid ${NEON_CYAN}`,
                          borderRadius: "8px",
                        }}
                        itemStyle={{ color: TEXT_PRIMARY }}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke={NEON_CYAN}
                        strokeWidth={4}
                        dot={{ r: 6, fill: NEON_CYAN, stroke: "#1B263B", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>

              <Grid xs={12} lg={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#1B263B",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, color: NEON_TEAL, fontWeight: "bold" }}>
                    Role Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={userRoleData}
                        dataKey="value"
                        nameKey="role"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={8}
                        label={{ fill: TEXT_PRIMARY, fontSize: 12, fontWeight: "bold" }}
                      >
                        {userRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" wrapperStyle={{ color: TEXT_PRIMARY }} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
