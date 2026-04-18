import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupsIcon from "@mui/icons-material/Groups";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Link } from "react-router-dom";
import aboutBanner from "../assets/aboutbanner.png";
import LogoNameTagline from "../assets/LogoNameTagline.png";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

function About() {
  const whyChooseUs = [
    {
      icon: <AutoAwesomeIcon fontSize="large" />,
      title: "Innovative Concepts",
      desc: "Fresh and imaginative ideas crafted to make every event truly distinctive.",
    },
    {
      icon: <Diversity3Icon fontSize="large" />,
      title: "Elite Professionals",
      desc: "A skilled team that manages every detail with professionalism and care.",
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: "Strategic Intelligence",
      desc: "Thoughtful planning powered by insights and hands-on industry experience.",
    },
    {
      icon: <WorkspacePremiumIcon fontSize="large" />,
      title: "Signature Excellence", 
      desc: "A proven record of delivering exceptional events and happy clients worldwide.",
    },
  ];

  const achievements = [
    {
      icon: <EventAvailableIcon fontSize="large" />,
      number: "300+",
      label: "Successful Events",
    },
    {
      icon: <GroupsIcon fontSize="large" />,
      number: "600+",
      label: "Satisfied Clients",
    },
    {
      icon: <CelebrationIcon fontSize="large" />,
      number: "99%",
      label: "Positive Feedback",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f6f9fc" }}>
      {/* Hero Section  */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 400, md: 520 },
          backgroundImage: `url(${aboutBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Overlay   */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(13,27,42,0.85), rgba(27,38,59,0.85))",  
            backdropFilter: "blur(2px)",
            zIndex: 1,
          }}
        />

        <Container
          sx={{ textAlign: "center", position: "relative", zIndex: 2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Main Heading */}
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 900,
                fontFamily: "'Poppins', sans-serif",
                textShadow: "2px 2px 15px rgba(0,0,0,0.4)",
                mb: 2,
                letterSpacing: "1px",
              }}
            >
              About EventSphere
            </Typography>

            {/* Subheading */}
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.95)",
                maxWidth: 700,
                mx: "auto",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                lineHeight: 1.7,
                textShadow: "1px 1px 8px rgba(0,0,0,0.3)",
              }}
            >
              We craft innovative, seamless, and unforgettable event
              experiences, bringing your vision to life with style and
              precision.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/*   Who We Are   */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          py: { xs: 8, md: 15 }, // Padding thodi badhai hai taaki space achi lage
          px: { xs: 4, md: 12 },
          background: "linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)",
          gap: { md: 8 },
        }}
      >
        {/* Text Area */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            pr: { md: 6 },
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1, 
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "2.2rem", md: "3.5rem" },
            }}
          >
            Who We Are
          </Typography>

          {/*  Tagline Heading */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              mb: 4,
              letterSpacing: "1px",
              textTransform: "none", 
            }}
          ></Typography>

          <Typography
            sx={{
              lineHeight: 1.8,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "1rem", md: "1.15rem" },
              textAlign: "justify", 
            }}
          >
            EventSphere is a modern event management company committed to
            excellence, creativity, and innovation. From corporate meetings to
            grand festivals, we deliver experiences that connect people and
            inspire brands. With a team of professionals and years of expertise,
            we ensure every event is planned to perfection — on time, on budget,
            and beyond expectations.
          </Typography>
        </Box>

        {/* Logo */}
        <Box
          component="img"
          src={LogoNameTagline}
          alt="EventSphere Logo"
          sx={{
            width: { xs: 250, md: 450 }, 
            maxWidth: "100%",
            height: "auto",
            mt: { xs: 6, md: 0 },
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))", 
          }}
        />
      </Box>

      {/* Why Choose Us  */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)",
          py: { xs: 8, md: 10 },
        }}
      >
        <Container>
          {/* Heading Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "2.2rem", md: "3.5rem" }, 
              }}
            >
              Why Choose EventSphere
            </Typography>

            {/* Tagline */}
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                fontFamily: "'Poppins', sans-serif",
                maxWidth: "700px",
                mx: "auto",
                mt: 1,
                letterSpacing: "1px",
              }}
            >
              Your vision, our expertise—delivering seamless experiences that
              last a lifetime.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {whyChooseUs.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 4,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      height: 280,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#4895EF",
                        width: 70,
                        height: 70,
                        mb: 2,
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#F0F4FF",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        mt: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Achievements */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #0D1B2A 0%, #16213E 100%)",
          py: { xs: 10, md: 15 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          {/* Section Heading  */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "2.2rem", md: "3.5rem" },
              }}
            >
              Our Achievements
            </Typography>

            {/* tagline */}
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                fontFamily: "'Poppins', sans-serif",
                maxWidth: "600px",
                mx: "auto",
                mt: 1,
                letterSpacing: "1px",
              }}
            >
              Transforming visions into reality through dedicated excellence and
              innovation.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {achievements.map((stat, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      py: 8,
                      px: 3,
                      borderRadius: "24px",
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                      height: 380,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        background: "linear-gradient(90deg, #4CC9F0, #F72585)",
                        opacity: 0,
                        transition: "0.3s",
                      },
                      "&:hover": {
                        background: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(76,201,240,0.3)",
                        boxShadow:
                          "0 30px 60px rgba(0,0,0,0.4), 0 0 25px rgba(76,201,240,0.1)",
                      },
                      "&:hover::before": {
                        opacity: 1,
                      },
                    }}
                  >
                    {/* Icons */}
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg, rgba(76,201,240,0.15) 0%, rgba(247,37,133,0.1) 100%)",
                        mb: 4,
                        border: "1px solid rgba(76,201,240,0.2)",
                      }}
                    >
                      {React.cloneElement(stat.icon, {
                        sx: { fontSize: 45, color: "#4CC9F0" },
                      })}
                    </Box>

                    <Typography
                      variant="h2"
                      fontWeight="900"
                      sx={{
                        color: "#fff",
                        mb: 1,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: { xs: "2.8rem", md: "3.5rem" },
                      }}
                    >
                      {stat.number}
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/*Contact  Us  */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
          color: "white",
          py: 10,
          textAlign: "center",
          mt: 12,  
          mb: 12, 
          mx: { xs: 2, md: 6 }, 
          borderRadius: 5,  
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)", 
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",  
        }}
      >
        <Container>
          {/* Heading */}
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
            }}
          >
            Let's Create Something Amazing Together
          </Typography>

          {/* Subtext */}
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              color: "rgba(255,255,255,0.8)",
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 400,
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Partner with EventSphere and make your event a masterpiece. Contact
            our experts today to bring your vision to life.
          </Typography>

          {/* Button*/}
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              color: "#0D1B2A",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "30px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              textTransform: "uppercase",
              transition: "all 0.4s ease",

              "&:hover": {
                transform: "translateY(-3px) scale(1.05)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
              },
            }}
          >
            Contact Us Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
