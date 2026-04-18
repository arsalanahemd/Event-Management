import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/LogoName.png";

export const TopNav = ({ onNavOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const TOP_NAV_HEIGHT = isMobile ? 70 : 90;

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    let parsedAdmin = null;

    if (storedAdmin) {
      try {
        parsedAdmin = JSON.parse(storedAdmin);
        setAdmin(parsedAdmin);
      } catch (err) {
        console.error("Error parsing admin data:", err);
      }
    }

    const params = new URLSearchParams(location.search);
    const nameFromURL = params.get("name");
    const idFromURL = params.get("id");
    if (nameFromURL) {
      const newAdmin = {
        name: decodeURIComponent(nameFromURL),
        id: idFromURL || parsedAdmin?.id || parsedAdmin?._id || null,
      };
      setAdmin(newAdmin);
      localStorage.setItem("adminUser", JSON.stringify(newAdmin));
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const handleStorageChange = () => {
      const updatedAdmin = localStorage.getItem("adminUser");
      setAdmin(updatedAdmin ? JSON.parse(updatedAdmin) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setAdmin(null);
    window.dispatchEvent(new Event("storage"));
    window.location.replace("http://localhost:5173/");
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setTimeout(() => handleLogout(), 200);
  };

  const handleChangePassword = () => {
    handleMenuClose();
    const adminId = admin?._id || admin?.id;
    navigate(adminId ? `/changePass?id=${adminId}` : "/changePass");
  };

  return (
    <Box
      component="header"
      sx={{
        background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
        color: "white",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: (theme) => theme.zIndex.appBar,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(76, 201, 240, 0.2)",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Hamburger+ Logo */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {!lgUp && (
            <IconButton
              onClick={onNavOpen}
              sx={{
                color: "#4CC9F0",
                backgroundColor: "rgba(76, 201, 240, 0.05)",
                mr: 1,
                "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.15)" },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: isMobile ? "35px" : "50px",
                transition: "0.3s",
              }}
            />
          </Box>
        </Stack>

        {/*Admin Dropdown */}
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              px: { xs: 1, sm: 2 },
              py: 0.8,
              border: "1px solid rgba(76, 201, 240, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(76, 201, 240, 0.1)",
                borderColor: "#4CC9F0",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.9rem" },
                whiteSpace: "nowrap",
              }}
            >
              {isMobile ? "Admin" : admin?.name ? `Admin: ${admin.name}` : "Admin Panel"}
            </Typography>
            <ArrowDropDownIcon
              sx={{ color: "#4CC9F0", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            disableScrollLock
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 160,
                bgcolor: "#1B263B",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                "& .MuiMenuItem-root": {
                  fontSize: "0.85rem",
                  py: 1.2,
                  "&:hover": { bgcolor: "rgba(76, 201, 240, 0.1)", color: "#4CC9F0" },
                },
              },
            }}
          >
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            <MenuItem
              onClick={handleLogoutClick}
              sx={{
                color: "#FF4D4D",
                fontWeight: "bold",
                "&:hover": { bgcolor: "rgba(255, 77, 77, 0.1) !important" },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};
