import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const OTPmodal = ({ closeModal }) => {
  const OTPref = useRef([]);
  const [OTPbox, setOTPbox] = useState(['', '', '', '']);
  const [timer, settimer] = useState(10);
  const data = useSelector((state) => state.user.currentUser.data);
  const navigate = useNavigate();

  // Handle typing OTP
  const OTPCapture = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === '') {
      const newOTP = [...OTPbox];
      newOTP[index] = value;
      setOTPbox(newOTP);

      if (value && index < 3) {
        OTPref.current[index + 1].focus();
      } else if (!value && index > 0) {
        OTPref.current[index - 1].focus();
      }
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  useEffect(() => {
    if (timer === 0) return;

    const intervalId = setInterval(() => {
      settimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalId);
          return 0; // No need for state updates when timer is zero
        }
        return prev - 1; // Only update if needed
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [timer]); // Dependency on `timer` ensures effect only re-runs when `timer` changes

  // Resend OTP
  const SendOTP = async () => {
    try {
      const response = await axiosInstance.post('/resend', {
        email: data.email,
      });
      toast.success(response.data.message);
      settimer(10);
      setOTPbox(['', '', '', '']);
      OTPref.current[0]?.focus();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Verify OTP
  const VerifyOTP = async () => {
    const token = OTPbox.join('');
    const NewData = {
      email: data.email,
      password: data.password,
      username: data.username,
      otp: token,
    };

    try {
      const response = await axiosInstance.post('/verify', NewData);
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Main box with responsive width */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Enter OTP
        </h2>
        <p className="text-sm text-gray-500 text-center mb-3">
          We have sent a code to your email
        </p>

        <Typography
          variant="body2"
          sx={{
            color: '#1E40AF',
            fontWeight: 'bold',
            fontFamily: "'Courier New', monospace",
            fontSize: '1.2rem',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Time Remaining: {String(timer).padStart(2, '0')}s
        </Typography>

        {/* OTP Input boxes */}
        <div className="flex justify-center gap-3 mb-4">
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={OTPbox[index]}
              onChange={(e) => OTPCapture(e, index)}
              ref={(el) => (OTPref.current[index] = el)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}
        </div>

        {/* Verify or Resend Button */}
        <button
          onClick={timer === 0 ? SendOTP : VerifyOTP}
          className={`w-full text-white py-2 rounded-md font-medium transition ${
            timer === 0
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {timer === 0 ? 'Resend OTP' : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
};

export default OTPmodal;
