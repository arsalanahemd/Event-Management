import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import { GlobalStyles } from "@mui/system";
import Logo from '../assets/LogoName.png';


function Nav() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedExhibitee = JSON.parse(localStorage.getItem("exhibitee"));
      setUser(storedUser || storedExhibitee);
    };
    window.addEventListener("storage", updateUser);
    updateUser();
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("exhibitee");
    setUser(null);
    handleMenuClose();
    navigate("/");
  };

  const handleChangePassword = () => {
    handleMenuClose();
    const userId = user?.id || user?._id;
    navigate(userId ? `/changePass?id=${userId}` : "/changePass");
  };

  const handleMessages = () => {
    const userId = user?.id || user?._id;
    navigate(userId ? `/showmsg?userId=${userId}` : "/showmsg");
  };

  const handleCompany = () => {
    const userId = user?.id || user?._id;
    navigate(userId ? `/showCompany?userId=${userId}` : "/showCompany");
  };
  const handleRating = () => {
    handleMenuClose();
    navigate("/rating");
  };

  const menuItems = useMemo(() => {
    const baseItems = [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Events", path: "/events" },
      { name: "Contact", path: "/contact" },
    ];

    if (user?.role === "attendee") {
      baseItems.push({ name: "Your Registration", path: "/your-registration" });
    }

    if (user?.role === "exhibitor") {
      baseItems.push(
        { name: "Add Company", path: "/addYourCompany" },
        { name: "Your Participations", path: "/Yourparticipation" }
      );
    }


    return baseItems;
  }, [user]);

  return (
    <>
      <GlobalStyles
        styles={{
          "@import":
            "url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap')",
        }}
      />
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
          boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2, // <-- increased from 1 to 2 for more height
            px: { xs: 2, sm: 6 },
            minHeight: 80, // <-- optional: explicitly set toolbar height
          }}
        >
          {/* LOGO */}
          <Link to="/">
            <Box
              component="img"
              src={Logo}
              alt="Eventify Logo"
              sx={{ height: 50, cursor: "pointer" }}
            />
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "none",
                  fontSize: "1rem",
                  position: "relative",
                  color: "#E0E1DD",

                  "&:hover": {
                    color: "#4CC9F0",
                  },

                  "&:hover::after": {
                    width: "100%",
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: "2px",
                    backgroundColor: "#4CC9F0",
                    transition: "width 0.3s ease",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Auth / User */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: "none",
                    color: "#E0E1DD",
                    "&:hover": {
                      color: "#4CC9F0",
                    },
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  sx={{
                    color: "#4CC9F0",
                    borderColor: "#4CC9F0",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#4CC9F0",
                      color: "#0D1B2A",
                    },
                  }}
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleMenuClick}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    textTransform: "none",
                    color: "#E0E1DD",
                    "&:hover": {
                      color: "#4CC9F0",
                    },
                  }}
                >
                  Welcome : {user.name || user.fullName || "User"}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#1B263B",
                      color: "#E0E1DD",
                    },
                  }}
                >
                  <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                  <MenuItem onClick={handleRating}>
                    Rate Us
                  </MenuItem>
                  <MenuItem onClick={handleMessages}>Your Messages</MenuItem>
                  {user?.role === "exhibitor" && (
                    <MenuItem onClick={handleCompany}>Your Company</MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "block", md: "none" },
              color: "#E0E1DD",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>


      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 240,
            background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
            height: "100%",
            color: "#E0E1DD",
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-start" },
              p: 2,
              borderBottom: "1px solid rgba(224,225,221,0.2)",
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="EventSphere Logo"
              sx={{
                width: { xs: 150, sm: 200 },
                height: "auto",
              }}
            />
          </Box>

          {/* Menu Items */}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    color: "#E0E1DD",
                    "&:hover": {
                      backgroundColor: "rgba(76,201,240,0.15)",
                      color: "#4CC9F0",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: "rgba(224,225,221,0.2)" }} />

          {/* Auth / User Actions */}
          <Box sx={{ p: 2 }}>
            {!user ? (
              <>
                <Button
                  fullWidth
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: "#4CC9F0",
                    borderColor: "#4CC9F0",
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "#4CC9F0",
                      color: "#0D1B2A",
                    },
                  }}
                >
                  Login
                </Button>

                <Button
                  fullWidth
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    backgroundColor: "#4CC9F0",
                    color: "#0D1B2A",
                    "&:hover": {
                      backgroundColor: "#38BDF8",
                    },
                  }}
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Typography sx={{ mb: 1, color: "#E0E1DD" }}>
                  {user.name || user.fullName || "User"}
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mb: 1,
                    color: "#4CC9F0",
                    borderColor: "#4CC9F0",
                    "&:hover": {
                      backgroundColor: "#4CC9F0",
                      color: "#0D1B2A",
                    },
                  }}
                  onClick={() => {
                    handleChangePassword();
                    setOpen(false);
                  }}
                >
                  Change Password
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 1,
                    backgroundColor: "#1B263B",
                    color: "#E0E1DD",
                    "&:hover": {
                      backgroundColor: "#FFD166",
                      color: "#0D1B2A",
                    },
                  }}
                  onClick={() => {
                    navigate("/rating");
                    setOpen(false);
                  }}
                >
                  Rate Us
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 1,
                    backgroundColor: "#1B263B",
                    color: "#E0E1DD",
                    "&:hover": {
                      backgroundColor: "#4CC9F0",
                      color: "#0D1B2A",
                    },
                  }}
                  onClick={() => {
                    handleMessages();
                    setOpen(false);
                  }}
                >
                  Your Messages
                </Button>

                {user?.role === "exhibitor" && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mb: 1,
                      backgroundColor: "#1B263B",
                      color: "#E0E1DD",
                      "&:hover": {
                        backgroundColor: "#4CC9F0",
                        color: "#0D1B2A",
                      },
                    }}
                    onClick={() => {
                      handleCompany();
                      setOpen(false);
                    }}
                  >
                    Your Company
                  </Button>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#0D1B2A",
                    color: "#E0E1DD",
                    "&:hover": {
                      backgroundColor: "#EF4444",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>

    </>
  );
}

export default Nav;
