import React, { useState } from 'react';
import Login from '../auth/Login';
import { Button } from '@mui/material';

const HeroSection = () => {
  const [showloginmodal, setshowlogin] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/landing_video.mp4"
        autoPlay
        muted
        loop
      >
        <source src="/images/landing_video.mp4" type="video/mp4" />
      </video>

      <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
          Welcome to our application
        </h1>
        <h3 className="text-white text-xl sm:text-2xl md:text-3xl mb-6">
          Please login to continue
        </h3>
        <Button
          variant="contained"
          onClick={() => setshowlogin(true)}
          sx={{
            background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
            color: 'white',
            borderRadius: '30px',
            padding: '10px 20px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            fontSize: '14px',
            '&:hover': {
              background: 'linear-gradient(90deg, #e52e71, #ff8a00)',
            },
          }}
        >
          Login
        </Button>
      </div>

      {showloginmodal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md mx-auto">
            <Login closeModal={() => setshowlogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
