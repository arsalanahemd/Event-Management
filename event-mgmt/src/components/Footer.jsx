import {
  Box,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import LogoNameTagline from "../assets/LogoNameTagline.png";
import Instagram from "../assets/instagram.svg";
import Facebook from "../assets/facebook.svg";
import Whatsapp from "../assets/whatsapp.svg";

function Footer() {
  return (
 <Box
  sx={{
    background: "linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)",
    color: "#E0E1DD",
    mt: 0, // ✅ Yahan pehle 8 tha, ab 0 kar diya
    pt: 8,
    pb: 4,
    px: { xs: 3, sm: 5, md: 8 },
    fontFamily: "'Poppins', sans-serif",
  }}
>
      <Grid
        container
        spacing={{ xs: 3, sm: 4 }}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* 1️⃣ Logo & Description */}
        <Grid item xs={12} sm={6} md={2.4} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Box
            component="img"
            src={LogoNameTagline}
            alt="EventSphere Logo"
            sx={{
              width: { xs: 180, sm: 200, md: 240 }, // responsive logo size
              mb: 2,
            }}
          />
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {/* Making large-scale events effortless, connecting organizers, exhibitors, and attendees efficiently. */}
          </Typography>
        </Grid>

        {/* 2️⃣ Quick Links */}
        <Grid item xs={12} sm={6} md={2.4} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: "1rem", md: "1.1rem" } }}>
            Quick Links
          </Typography>
          {[
            { name: "Home", href: "/" },
            { name: "Login", href: "/login" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              underline="none"
              color="inherit"
              sx={{
                display: "block",
                fontSize: { xs: 13, md: 14 },
                mb: 0.5,
                opacity: 0.85,
                transition: "all 0.3s ease",
                "&:hover": { color: "#4CC9F0", pl: 1 },
              }}
            >
              {link.name}
            </Link>
          ))}
        </Grid>

        {/* 3️⃣ Contact */}
        <Grid item xs={12} sm={6} md={2.4} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: "1rem", md: "1.1rem" } }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Karachi, Pakistan
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            +92 333 1234567
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            info@eventsphere.com
          </Typography>
        </Grid>

        {/* 4️⃣ Address */}
        <Grid item xs={12} sm={6} md={2.4} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: "1rem", md: "1.1rem" } }}>
            Address
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Suite 101, EventSphere Building
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Karachi, Pakistan
          </Typography>
        </Grid>

        {/* 5️⃣ Social Links */}
        <Grid item xs={12} sm={6} md={2.4} sx={{ textAlign: "center", mt: { xs: 3, md: 0 } }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Follow Us
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 1.5 }, // responsive gap
              mt: 1,
              justifyContent: "center",
            }}
          >
            {[
              { name: "Facebook", icon: Facebook, link: "https://facebook.com" },
              { name: "Instagram", icon: Instagram, link: "https://instagram.com" },
              { name: "Whatsapp", icon: Whatsapp, link: "https://whatsapp.com" },
            ].map((social) => (
              <Box
                key={social.name}
                sx={{
                  width: { xs: 42, sm: 46, md: 48 }, // responsive circle
                  height: { xs: 42, sm: 46, md: 48 },
                  borderRadius: "50%",
                  backgroundColor: "#1B263B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.12)",
                    backgroundColor: "rgba(76, 201, 240, 0.45)",
                    boxShadow: "0 0 8px rgba(76, 201, 240, 0.35)",
                  },
                }}
                onClick={() => window.open(social.link, "_blank")}
              >
                <Box
                  component="img"
                  src={social.icon}
                  alt={social.name}
                  sx={{ width: { xs: 22, sm: 24, md: 26 }, height: { xs: 22, sm: 24, md: 26 } }} // responsive icon
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Bottom */}
      <Box
        sx={{
          borderTop: "1px solid rgba(224,225,221,0.2)",
          mt: 6,
          pt: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.7, fontSize: { xs: 12, md: 13 } }}>
          © {new Date().getFullYear()} EventSphere Management | All rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
