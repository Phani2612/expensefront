import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

const AppHeader = () => {
  const handleLogout = () => {
    localStorage.clear();

    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/';
  };

  return (
    <AppBar position="static" className="bg-blue-600 shadow-md">
      <Toolbar className="flex justify-between px-4">
        <Sidebar />

        <Typography variant="h6" className="text-white font-semibold">
          Expense Tracker
        </Typography>

        <div className="hidden md:flex gap-4">
          <Link to="/dashboard">
            <Button color="inherit" className="text-white">
              Dashboard
            </Button>
          </Link>
          <Link to="/profile">
            <Button color="inherit" className="text-white">
              Profile
            </Button>
          </Link>
         
        </div>

        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon className="text-white" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
