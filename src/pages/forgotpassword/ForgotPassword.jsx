// src/pages/ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axiosInstance';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgot = async (data) => {
    setEmail(data.email);
    try {
      await axiosInstance.post('/forgot-password', { email });
      toast.success('Reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending email');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4 ">
      <form onSubmit={handleSubmit(handleForgot)}>
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl min-h-[100px] space-y-6">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Forgot Password
          </h2>
          <div>
            <TextField
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message || ' '}
              fullWidth
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className="mt-4"
          >
            Send Reset Link
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
