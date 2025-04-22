import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const LoaderButton = ({ loading, children, ...props }) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default LoaderButton;
