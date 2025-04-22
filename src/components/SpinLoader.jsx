import React from 'react';
import { CircularProgress, Backdrop, Typography } from '@mui/material';

const SpinLoader = ({ open = true, message = 'Loading...' }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'column',
      }}
      open={open}
    >
      <CircularProgress color="inherit" size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Backdrop>
  );
};

export default SpinLoader;
