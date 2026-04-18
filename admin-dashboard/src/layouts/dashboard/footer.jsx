import { Box, Container, Link, Typography, Stack } from '@mui/material';

const items = [
  {
    label: 'About EventSphere',
    href: '/' 
  },
  {
    label: 'Terms & Conditions',
    href: '/' 
  }
];

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      width: '100%',
      py: 4,
      background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
      borderTop: '1px solid rgba(76, 201, 240, 0.2)', 
      color: '#E0E1DD',
    }}
  >
    <Container maxWidth="xl">
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems="center"
        spacing={2}
      >
        {/* Left Side: Brand */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              background: "linear-gradient(90deg, #4CC9F0, #F72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 0.5,
              letterSpacing: '1px'
            }}
          >
            EventSphere
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.5, letterSpacing: '0.5px' }}>
            © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
          </Typography>
        </Box>

        {/* Center: Address */}
        <Box sx={{ textAlign: 'center' }}>
           <Typography variant="body2" sx={{ fontWeight: 700, color: '#4CC9F0', mb: 0.5 }}>
             Suite 101, EventSphere Building
           </Typography>
           <Typography variant="caption" sx={{ opacity: 0.7, color: '#E0E1DD' }}>
             Karachi, Pakistan
           </Typography>
        </Box>

        {/* Right Side: Links (Underline Removed) */}
        <Stack 
          direction="row" 
          spacing={4} 
          sx={{ 
            '& a': {
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none', // Direct underline removed
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                color: '#4CC9F0', // Neon Blue
                textShadow: '0 0 8px rgba(76, 201, 240, 0.6)', // Glow effect
                transform: 'translateY(-3px)', // Halka sa upar move hoga
                textDecoration: 'none' // Hover par bhi underline nahi aaye gi
              }
            }
          }}
        >
          {items.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Container>
  </Box>
);