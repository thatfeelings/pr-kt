import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function HeaderWithBreadcrumbs() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left Side - Menu Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        {/* Center - Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          My Header
        </Typography>

        {/* Right Side - Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="text.primary">Settings</Typography>
          </Breadcrumbs>
          <IconButton color="inherit" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="account">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
