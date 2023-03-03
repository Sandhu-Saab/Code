import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from 'react-router-dom';
import classes from './Sidebar.module.css';

// Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';

//Redirect
import { useNavigate } from "react-router-dom";

function AccountMenu() {
  const currentUserId = sessionStorage.getItem("userId");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("Not Authorized");

  // Authentication
  function Authentication() {
    if (sessionStorage.getItem("username") != null) {
      setLoginUser(
        sessionStorage.getItem("username").charAt(0).toUpperCase() +
        sessionStorage.getItem("username").slice(1)
      );
    } else {
      setLoginUser("Not Authorized");
      //Navigate to Login Page
      navigate("/login");
    }
  }
  function Logout() {
    sessionStorage.clear();
    handleClose();
    //Navigate to Logoff success page
    navigate("/logoff.success");
  }

  useEffect(() => {
    Authentication();
  }, []);

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <typography>{loginUser}</typography>
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <Link to='/dash' className={classes.link}>
          <MenuItem onClick={handleClose}>
            <HomeIcon />
            Home
          </MenuItem>
        </Link>

        <Link to={`/user/edit?userId=${currentUserId}`} className={classes.link}>
          <MenuItem onClick={handleClose}>
            <ManageAccountsIcon />
            Edit Account
          </MenuItem>
        </Link>

        <MenuItem onClick={Logout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu;
