import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import CloseIcon from "@mui/icons-material/Close";
  import { useSelector, useDispatch } from "react-redux";
  import { logoutUserInfro } from "../features/users/userSlice";
  import { useNavigate, Link } from "react-router-dom";
  import { useState } from "react";
  
  const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = useSelector((state) => state.user.userInfo?.isAdmin);
    const isLoggedIn = isAdmin !== undefined;
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    const handleLogout = () => {
      dispatch(logoutUserInfro());
      navigate("/signin");
    };
  
    const handleLogin = () => {
      navigate("/signin");
    };
  
    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };
  
    const menuItems = isAdmin
      ? [
          { name: "Manage Users", path: "/admin-dashboard" },
          { name: "Manage Activities", path: "/admin-dashboard/manage-activity" },
          { name: "Manage Rewards", path: "/admin-dashboard/manage-rewards" },
          { name: "Analytics", path: "/admin-dashboard/manage-redeem" },
        ]
      : [
          { name: "My Profile", path: "/profile" },
          { name: "Activity Feed", path: "/activities" },
          { name: "Redeem Rewards", path: "/rewards" },
          {name:"LeaderBoard" ,path:"/leaderBoard"}
        ];
  
    return (
      <>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              RewardHub
            </Typography>
  
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {isLoggedIn &&
                menuItems.map((item, idx) => (
                  <Button
                    key={idx}
                    component={Link}
                    to={item.path}
                    sx={{ color: "white" }}
                  >
                    {item.name}
                  </Button>
                ))}
              {isLoggedIn ? (
                <Button variant="contained" color="error" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="contained" color="success" onClick={handleLogin}>
                  Login
                </Button>
              )}
            </Box>
  
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
  
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Menu</Typography>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
  
            <List>
              {isLoggedIn &&
                menuItems.map((item, idx) => (
                  <ListItem
                    button
                    key={idx}
                    component={Link}
                    to={item.path}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              {isLoggedIn ? (
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              ) : (
                <ListItem button onClick={handleLogin}>
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </>
    );
  };
  
  export default Navbar;
  