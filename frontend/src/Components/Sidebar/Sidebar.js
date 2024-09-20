import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./Sidebar.css";

const drawerWidth = 240;

export default function ResponsiveDrawer({ children, check, change, theme }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha("rgb(238, 238, 238)", 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const drawer = (
    <div className="sidebar">
      <Toolbar />
      <List>
        <Link to="/" className="list-link">
          <ListItem
            disablePadding
            className={`list-item ${
              location.pathname === "/" ? "selected" : ""
            }`}
          >
            <ListItemButton>
              <ListItemIcon>
                <div className="sidebar-icon">
                  <HomeOutlinedIcon />
                </div>
              </ListItemIcon>
              <ListItemText primary="Home" className="list-item-text" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/products" className="list-link">
          <ListItem
            disablePadding
            className={`list-item ${
              location.pathname === "/products" ? "selected" : ""
            }`}
          >
            <ListItemButton>
              <ListItemIcon>
                <div className="sidebar-icon">
                  <Inventory2OutlinedIcon />
                </div>
              </ListItemIcon>
              <ListItemText primary="Products" className="list-item-text" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/comments" className="list-link">
          <ListItem
            disablePadding
            className={`list-item ${
              location.pathname === "/comments" ? "selected" : ""
            }`}
          >
            <ListItemButton>
              <ListItemIcon>
                <div className="sidebar-icon">
                  <CommentOutlinedIcon />
                </div>
              </ListItemIcon>
              <ListItemText primary="Comments" className="list-item-text" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/users" className="list-link">
          <ListItem
            disablePadding
            className={`list-item ${
              location.pathname === "/users" ? "selected" : ""
            }`}
          >
            <ListItemButton>
              <ListItemIcon>
                <div className="sidebar-icon">
                  <PeopleAltOutlinedIcon />
                </div>
              </ListItemIcon>
              <ListItemText primary="Users" className="list-item-text" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/orders" className="list-link">
          <ListItem
            disablePadding
            className={`list-item ${
              location.pathname === "/orders" ? "selected" : ""
            }`}
          >
            <ListItemButton>
              <ListItemIcon>
                <div className="sidebar-icon">
                  <ShoppingBasketOutlinedIcon />
                </div>
              </ListItemIcon>
              <ListItemText primary="Orders" className="list-item-text" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        variant="outlined"
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: theme.palette.icon }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton sx={{ color: theme.palette.icon }} onClick={change}>
            {check ? (
              <Tooltip title="light mode" arrow>
                <WbSunnyOutlinedIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Dark mode" arrow>
                <DarkModeIcon sx={{ color: "rgba(0,0,0,.8)" }} />
              </Tooltip>
            )}
          </IconButton>

          <Search sx={{ display: { md: "block", xs: "none" } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: theme.palette.icon }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search …"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              <Tooltip title="Messages" arrow>
                <IconButton sx={{ color: theme.palette.icon }}>
                  <Badge badgeContent={5} color="secondary">
                    <ChatBubbleOutlineIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications" arrow>
                <IconButton sx={{ color: theme.palette.icon }}>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack>
              <Tooltip title="Account" arrow>
                <Avatar
                  sx={{ cursor: "pointer", marginLeft: "15px" }}
                  alt="Remy Sharp"
                  src="./images/TopbarImg/avatar.jpg"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
