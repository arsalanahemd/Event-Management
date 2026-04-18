import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { Footer } from "./footer";

const SIDE_NAV_WIDTH = 110;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100vw",
  backgroundColor: "#0D1B2A",
  minHeight: "100vh",
  overflowX: "hidden",
  transition: "padding 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  position: "relative",
});

export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const [openNav, setOpenNav] = useState(false);

  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const TOP_NAV_HEIGHT = isMobile ? 70 : 90;

  useEffect(() => {
    if (openNav) setOpenNav(false);
  }, [pathname]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />

      <SideNav onClose={() => setOpenNav(false)} open={lgUp ? true : openNav} />

      <LayoutRoot
        sx={{
          pt: `${TOP_NAV_HEIGHT}px`,

          pl: {
            xs: 0,
            lg: `${SIDE_NAV_WIDTH}px`,
          },
        }}
      >
        <LayoutContainer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,

              py: { xs: 4, md: 6 },
              px: { xs: 2, sm: 3, md: 4 },
              width: "100%",
              maxWidth: "1600px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
          >
            {children}
          </Box>

          <Box sx={{ mt: "auto" }}>
            <Footer />
          </Box>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
