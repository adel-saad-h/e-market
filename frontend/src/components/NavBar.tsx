import {
  Badge,
  Box,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ShoppingCart } from "@mui/icons-material";

export const Navbar = () => {
  const { username, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handelMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    //It will do 3 things
    logout(); //Delete user token from storage
    navigate("/"); //Send the user to the main page
    handleCloseUserMenu(); //Close the menu
   
  };
  const handleCart = () => {
    navigate("/cart");
  };
  const handleHome = () => {
    navigate("/");
  };
  const loginButton = () => {
    return (
      <Fab variant="circular" color="default" onClick={handleLogin}>
        <Typography>{"Login "}</Typography>
      </Fab>
    );
  };
  const userMenu = () => {
    return (
      <Box>
        <IconButton aria-label="cart" onClick={handleCart} sx={{ mr: 2 }}>
          {/* <Badge badgeContent={cartItems.length} color="warning"> */}
          <Badge badgeContent={2} color="warning">
            <ShoppingCart sx={{ color: "#ffffff" }} />
          </Badge>
        </IconButton>
        <Fab variant="circular" color="default" onClick={handleOpenUserMenu}>
          <Typography>{username}</Typography>
        </Fab>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handelMyOrders}>
            <Typography sx={{ textAlign: "center" }}>My Orders</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography sx={{ textAlign: "center" }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  };
  return (
    <Box
      p={2}
      display={"flex"}
      flexDirection={"row"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Fab
        variant="extended"
        color="primary"
        onClick={() => {
          handleHome();
        }}
      >
        <Typography>{"ADEL =>"}</Typography>
      </Fab>
      <Box>{isAuthenticated ? userMenu() : loginButton()}</Box>
      {/* <Fab
        variant="circular"
        color="default"
        onClick={!token ? handleLogin : userMenu}
      >
        <Typography>{!token ? "Login " : username}</Typography>
      </Fab> */}
    </Box>
  );
};
