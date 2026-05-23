// import { Box, Container, Link, Typography, Stack } from '@mui/material';

// const items = [
//   {
//     label: 'About EventSphere',
//     href: '/' 
//   },
//   {
//     label: 'Terms & Conditions',
//     href: '/' 
//   }
// ];

// export const Footer = () => (
//   <Box
//     component="footer"
//     sx={{
//       mt: 'auto',
//       width: '100%',
//       py: 4,
//       background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//       borderTop: '1px solid rgba(76, 201, 240, 0.2)', 
//       color: '#E0E1DD',
//     }}
//   >
//     <Container maxWidth="xl">
//       <Stack 
//         direction={{ xs: 'column', md: 'row' }} 
//         justifyContent="space-between" 
//         alignItems="center"
//         spacing={2}
//       >
//         {/* Left Side: Brand */}
//         <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               fontWeight: 800, 
//               background: "linear-gradient(90deg, #4CC9F0, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               mb: 0.5,
//               letterSpacing: '1px'
//             }}
//           >
//             EventSphere
//           </Typography>
//           <Typography variant="caption" sx={{ opacity: 0.5, letterSpacing: '0.5px' }}>
//             © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
//           </Typography>
//         </Box>

//         {/* Center: Address */}
//         <Box sx={{ textAlign: 'center' }}>
//            <Typography variant="body2" sx={{ fontWeight: 700, color: '#4CC9F0', mb: 0.5 }}>
//              Suite 101, EventSphere Building
//            </Typography>
//            <Typography variant="caption" sx={{ opacity: 0.7, color: '#E0E1DD' }}>
//              Karachi, Pakistan
//            </Typography>
//         </Box>

//         {/* Right Side: Links (Underline Removed) */}
//         <Stack 
//           direction="row" 
//           spacing={4} 
//           sx={{ 
//             '& a': {
//               color: 'rgba(255, 255, 255, 0.7)',
//               textDecoration: 'none', // Direct underline removed
//               fontSize: '0.85rem',
//               fontWeight: 600,
//               transition: 'all 0.3s ease-in-out',
//               '&:hover': {
//                 color: '#4CC9F0', // Neon Blue
//                 textShadow: '0 0 8px rgba(76, 201, 240, 0.6)', // Glow effect
//                 transform: 'translateY(-3px)', // Halka sa upar move hoga
//                 textDecoration: 'none' // Hover par bhi underline nahi aaye gi
//               }
//             }
//           }}
//         >
//           {items.map((link) => (
//             <Link href={link.href} key={link.label}>
//               {link.label}
//             </Link>
//           ))}
//         </Stack>
//       </Stack>
//     </Container>
//   </Box>
// );


import React from "react";
import { motion } from "framer-motion";

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

const items = [
  { label: "About EventSphere", href: "/" },
  { label: "Terms & Conditions", href: "/" },
];

export const Footer = () => (
  <footer
    style={{
      marginTop: "auto",
      width: "100%",
      padding: "32px 24px",
      background: G.black2,
      borderTop: `1px solid ${G.border}`,
      color: G.w55,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Gold top line */}
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "1px",
      background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
    }} />

    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: Brand */}
      <div style={{ textAlign: "left", flex: "1 1 200px" }}>
        <h6
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: G.gold,
            marginBottom: "4px",
            letterSpacing: "1px",
          }}
        >
          EventSphere
        </h6>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            color: G.w30,
            letterSpacing: "0.5px",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
      </div>

      {/* Center: Address */}
      <div style={{ textAlign: "center", flex: "1 1 200px" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: G.gold,
            marginBottom: "2px",
            margin: 0,
          }}
        >
          Suite 101, EventSphere Building
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            color: G.w55,
            margin: 0,
          }}
        >
          Karachi, Pakistan
        </p>
      </div>

      {/* Right: Links */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          flex: "1 1 200px",
          justifyContent: "flex-end",
        }}
      >
        {items.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            whileHover={{ y: -3 }}
            style={{
              color: G.w55,
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "color 0.3s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = G.gold;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = G.w55;
            }}
          >
            {link.label}
            <span
              style={{
                position: "absolute",
                bottom: "-2px",
                left: 0,
                width: "0%",
                height: "1px",
                background: G.gold,
                transition: "width 0.3s ease",
              }}
              className="footer-link-underline"
            />
          </motion.a>
        ))}
      </div>
    </div>
  </footer>
);