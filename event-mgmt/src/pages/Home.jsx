import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";

function Home() {
  const [expos, setExpos] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [loadingExpos, setLoadingExpos] = useState(true);
  const [loadingSpeakers, setLoadingSpeakers] = useState(true);
  const [selectedType, setSelectedType] = useState("upcoming");
  const navigate = useNavigate();

  //  Fetch expos
  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get("http://localhost:3001/expo");
        setExpos(res.data.expos || []);
      } catch (err) {
        console.error("Failed to fetch expos:", err);
      } finally {
        setLoadingExpos(false);
      }
    };
    fetchExpos();
  }, []);

  //  Fetch speakers
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/speaker");
        if (res.data.success) {
          setSpeakers(res.data.speakers || []);
        }
      } catch (err) {
        console.error("Failed to fetch speakers:", err);
      } finally {
        setLoadingSpeakers(false);
      }
    };
    fetchSpeakers();
  }, []);

  // Time-based status logic
  const getExpoStatus = (expoDate) => {
    if (!expoDate) return "unknown";
    const now = new Date();
    const eventDate = new Date(expoDate);
    const todayDateOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const eventDateOnly = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    ).getTime();
    const expoEndTime = new Date(eventDate);
    expoEndTime.setHours(18, 0, 0, 0);

    if (eventDateOnly < todayDateOnly) return "past";
    if (eventDateOnly === todayDateOnly) {
      if (now.getTime() > expoEndTime.getTime()) return "past";
      return "ongoing";
    }
    return "upcoming";
  };

  const filteredExpos = expos.filter((expo) => {
    const status = getExpoStatus(expo.date);
    return status === selectedType;
  });

  const heroExpos = [
    {
      image: carousel2,
      title: "Tech Expo 2025",
      description: "Discover the latest innovations in technology.",
    },
    {
      image: carousel1,
      title: "Marketing Expo",
      description:
        "Explore modern marketing trends, branding & growth strategies.",
    },
    {
      image: carousel3,
      title: "Art & Design Expo",
      description: "Explore creativity and design like never before.",
    },
  ];

  return (
    <>
      {/* Hero Carousel */}
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        style={{ height: "75vh" }}
      >
        {heroExpos.map((expo, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                height: "75vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={expo.image}
                alt={expo.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(55%)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  px: { xs: 2, sm: 5 },
                  maxWidth: "700px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "2.2rem", sm: "3.5rem" },
                    fontWeight: 800,
                    mb: 2,
                    letterSpacing: "1px",
                    background:
                      "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textTransform: "uppercase",
                  }}
                >
                  {expo.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    lineHeight: 1.7,
                    mb: 4,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {expo.description}
                </Typography>
                <Button
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: "30px",
                    background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-3px) scale(1.05)",
                      background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
                    },
                  }}
                  onClick={() => navigate("/events")}
                >
                  Explore Events
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Explore Expos Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
          py: 8,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8, px: 2 }}>
            <Typography
              variant="h2"
              fontWeight="900"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                lineHeight: 1.2,
                mx: "auto",
              }}
            >
              Explore Exhibitions
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                maxWidth: "600px",
                mx: "auto",
                mt: 2,
              }}
            >
              Discover our past, present, and future showcases of innovation and
              creativity.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 8,
              flexWrap: "wrap",
            }}
          >
            {["past", "ongoing", "upcoming"].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "contained" : "outlined"}
                onClick={() => setSelectedType(type)}
                sx={{
                  px: 4,
                  fontWeight: 700,
                  borderRadius: "25px",
                  color: "#E0E1DD",
                  borderColor: "rgba(76, 201, 240, 0.5)",
                  background:
                    selectedType === type
                      ? "linear-gradient(90deg, #4895EF, #4CC9F0)"
                      : "rgba(255,255,255,0.05)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
                    borderColor: "transparent",
                  },
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Expos
              </Button>
            ))}
          </Box>

          {loadingExpos ? (
            <Box textAlign="center" sx={{ py: 10 }}>
              <CircularProgress sx={{ color: "#4CC9F0" }} />
            </Box>
          ) : filteredExpos.length > 0 ? (
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  maxWidth: "1200px",
                  width: "100%",
                  mx: "auto",
                  alignItems: "stretch",
                  justifyContent: "center",
                }}
              >
                {filteredExpos.map((expo) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    key={expo._id}
                    sx={{ display: "flex", p: 1 }}
                  >
                    <Card
                      sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "100%",
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          border: "1px solid #4CC9F0",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                        },
                      }}
                    >
                      {/*  Chip */}
                      {expo.theme && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 2,
                            background:
                              "linear-gradient(90deg, #4895EF, #4CC9F0)", 
                            color: "#0D1B2A",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "0.65rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          }}
                        >
                          {expo.theme}
                        </Box>
                      )}

                      <CardMedia
                        component="img"
                        image={`http://localhost:3001/uploads/${expo.image}`}
                        alt={expo.title}
                        sx={{ height: 240, objectFit: "cover", width: "100%" }}
                      />

                      <CardContent
                        sx={{
                          p: 2,
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#4CC9F0",
                            mb: 0.5,
                            fontSize: "1rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.2,
                          }}
                        >
                          {expo.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            mb: 1.5,
                            fontSize: "0.8rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {expo.description
                            ? expo.description
                            : "Experience innovation and excellence."}
                        </Typography>

                        <Box sx={{ mb: 2, mt: "auto" }}>
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: 11,
                              mb: 0.5,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            📅 {expo.date ? expo.date.split("T")[0] : "N/A"}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: 11,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            📍 {expo.venue?.venueName || "TBA"}
                          </Typography>
                        </Box>

                        <Button
                          variant="contained"
                          fullWidth
                          disabled={getExpoStatus(expo.date) === "past"}
                          sx={{
                            py: 1.5,
                            fontWeight: 800,
                            borderRadius: "12px",
                            background:
                              "linear-gradient(90deg, #4895EF, #4CC9F0)",
                            color: "#0D1B2A",
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
                            "&.Mui-disabled": {
                              background: "rgba(255, 255, 255, 0.12)",
                              color: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover": {
                              background:
                                "linear-gradient(90deg, #4CC9F0, #4895EF)",
                              transform: "scale(1.02)",
                            },
                            transition: "0.3s",
                          }}
                          onClick={() => navigate('/events')}
                        >
                          {getExpoStatus(expo.date) === "past"
                            ? "Expo Ended"
                            : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography
              textAlign="center"
              sx={{ color: "#A8B2C1", mt: 10, fontSize: "1.2rem" }}
            >
              No {selectedType} expos available at the moment.
            </Typography>
          )}
        </Container>
      </Box>

      {/* Speakers Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
          py: 8,
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.2rem", md: "3.5rem" },
              }}
            >
              Industry Leading Speakers
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                maxWidth: "700px",
                mx: "auto",
                mt: 1,
              }}
            >
              Learn from experts shaping the future of innovation
            </Typography>
          </Box>

          {loadingSpeakers ? (
            <Box textAlign="center">
              <CircularProgress sx={{ color: "#4CC9F0" }} />
            </Box>
          ) : speakers.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {speakers.map((speaker) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={speaker._id}>
                  <Card
                    sx={{
                      borderRadius: 6,
                      textAlign: "center",
                      p: 4,
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-15px)",
                        boxShadow: "0 25px 50px rgba(76, 201, 240, 0.25)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`http://localhost:3001/uploads/${speaker.image}`}
                      alt={speaker.name}
                      sx={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        width: { xs: "180px", md: "220px" },
                        height: { xs: "180px", md: "220px" },
                        mb: 2,
                        filter: "drop-shadow(0px 15px 20px rgba(0,0,0,0.4))",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "800", color: "#fff", mb: 1 }}
                      >
                        {speaker.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4CC9F0",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Guest Speaker
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography textAlign="center" color="rgba(255,255,255,0.7)">
              No speakers available yet.
            </Typography>
          )}
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
          py: 8,
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.2rem", md: "3.5rem" },
              }}
            >
              Why EventSphere Stands Out
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <EventIcon sx={{ fontSize: 50, color: "#4CC9F0" }} />,
                title: "Professional Management",
                desc: "Experienced team ensuring every event runs flawlessly.",
              },
              {
                icon: <FavoriteIcon sx={{ fontSize: 50, color: "#F72585" }} />,
                title: "Personalized Planning",
                desc: "Every event tailored to reflect your unique style and goals.",
              },
              {
                icon: <GroupIcon sx={{ fontSize: 50, color: "#4895EF" }} />,
                title: "Trusted Network",
                desc: "Strong vendor relationships for reliable, high-quality services.",
              },
              {
                icon: <StarIcon sx={{ fontSize: 50, color: "#FFD166" }} />,
                title: "Top Rated",
                desc: "Hundreds of satisfied clients trust us for their biggest days.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    px: 2,
                    transition: "0.35s",
                    "&:hover": { transform: "translateY(-8px)" },
                  }}
                >
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mt: 2, mb: 1, color: "#fff" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/*  Contact Banner */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1B263B, #273746)",
          color: "white",
          py: 10,
          textAlign: "center",
          mt: 8,
          mb: { xs: 8, md: 12 },
          mx: { xs: 2, md: 6 },
          borderRadius: 5,
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              mb: 1,
            }}
          >
            Join the Next Big Event Experience
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              mb: 4,
            }}
          >
            Turn your vision into reality—reserve your spot and craft an
            unforgettable event!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
              color: "#0D1B2A",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: "30px",
              "&:hover": {
                transform: "translateY(-3px) scale(1.05)",
                background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
              },
            }}
            onClick={() => navigate("/contact")}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default Home;
