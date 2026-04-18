import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { items } from "./config";
import { Scrollbar } from "src/components/scrollbar";

const SIDE_NAV_WIDTH = 115;
const TOP_NAV_HEIGHT = 80;

export const SideNav = ({ open, onClose }) => {
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sideNavContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
      }}
    >
      <List
        sx={{
          px: 1.5,
          py: lgUp ? 4 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {items.map((item) => {
          const active = matchPath({ path: item.href, end: true }, location.pathname);

          return (
            <Tooltip
              key={item.href}
              title={item.label}
              placement="right"
              arrow
              disableHoverListener={!lgUp}
            >
              <ListItem
                disablePadding
                component={RouterLink}
                to={item.href}
                sx={{
                  flexDirection: "column",
                  borderRadius: "20px",
                  mb: 2.5,
                  py: 1.5,
                  width: "80px",
                  height: "80px",
                  justifyContent: "center",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  backgroundColor: active ? "rgba(76, 201, 240, 0.12)" : "transparent",
                  border: active ? "1px solid rgba(76, 201, 240, 0.4)" : "1px solid transparent",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "rgba(76, 201, 240, 0.05)",
                    transform: lgUp ? "translateY(-3px)" : "none",
                    "& .icon-box": {
                      color: "#4CC9F0",
                      filter: "drop-shadow(0 0 10px rgba(76, 201, 240, 0.8))",
                    },
                    "& .label-text": { color: "#FFF" },
                  },
                }}
              >
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      height: "4px",
                      width: "4px",
                      borderRadius: "50%",
                      backgroundColor: "#4CC9F0",
                      boxShadow: "0 0 12px 2px #4CC9F0",
                    }}
                  />
                )}

                <ListItemIcon
                  className="icon-box"
                  sx={{
                    minWidth: "auto",
                    mb: 0.5,
                    color: active ? "#4CC9F0" : "rgba(255, 255, 255, 0.4)",
                    transition: "all 0.3s ease",
                    "& svg": {
                      fontSize: "28px",
                      filter: active ? "drop-shadow(0 0 12px rgba(76, 201, 240, 0.5))" : "none",
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  className="label-text"
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "0.7rem",
                      fontWeight: active ? 700 : 500,
                      textAlign: "center",
                      color: active ? "#FFF" : "rgba(255, 255, 255, 0.4)",
                      textTransform: "capitalize",
                      letterSpacing: "0.3px",
                    },
                  }}
                />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Scrollbar>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      variant={lgUp ? "permanent" : "temporary"}
      // Z-Index fix taake TopNav upar nazar aaye
      sx={{
        zIndex: (theme) => (lgUp ? theme.zIndex.appBar - 1 : theme.zIndex.appBar + 1),
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#0D1B2A",
          width: SIDE_NAV_WIDTH,
          height: lgUp ? `calc(100vh - ${TOP_NAV_HEIGHT}px)` : "100%",
          top: lgUp ? TOP_NAV_HEIGHT : 0,
          left: 0,
          borderRadius: 0,
          borderRight: "1px solid rgba(76, 201, 240, 0.15)",
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.6)",
          overflowX: "hidden",
          backgroundImage: "none",
        },
      }}
    >
      {sideNavContent}
    </Drawer>
  );
};
