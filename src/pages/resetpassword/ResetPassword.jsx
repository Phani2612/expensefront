import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
  const { token } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userData, setUserData] = useState(null);

  const [showPassword, setshowPassword] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser.data.user);
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      await axiosInstance.post(`/reset-password/${token}/${userData._id}`, {
        password: data.password,
      });
      toast.success('Password reset successful');
      window.location.href = '/login';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    }
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message || ' '}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be more than 5 characters',
                },
                maxLength: {
                  value: 10,
                  message: 'Password must not exceed 10 characters',
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setshowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField
              label="Confirm Password"
              type={showconfirm ? 'text' : 'password'}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message || ' '}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setshowconfirm(!showconfirm)}
                    >
                      {showconfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button variant="contained" color="secondary" fullWidth type="submit">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
