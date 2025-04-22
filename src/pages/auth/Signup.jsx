import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import LoaderButton from '../../components/Loader.jsx';
import { useDispatch } from 'react-redux';
import { SigninUser } from '../../redux/slice/userslice.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const apiResult = await dispatch(SigninUser(data));
    if (SigninUser.fulfilled.match(apiResult)) {
      toast.success('OTP sent to email successfully!');
      Navigate('/otp');
    } else {
      toast.error(apiResult?.payload || 'Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/landing_video.mp4"
        autoPlay
        muted
        loop
      />

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-y-4 items-center w-full max-w-md p-8 rounded-2xl bg-white shadow-lg
             sm:mx-auto sm:my-auto
             lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-gray-800">
          Create Your Account
        </h2>

        {/* Email */}
        <TextField
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message || ' '}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
        />

        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          error={!!errors.username}
          helperText={errors.username?.message || ' '}
          {...register('username', {
            required: 'Username is required',
          })}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message || ' '}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            maxLength: {
              value: 10,
              message: 'Max 10 characters allowed',
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setshowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type={showconfirm ? 'text' : 'password'}
          fullWidth
          error={!!errors.confirmpassword}
          helperText={errors.confirmpassword?.message || ' '}
          {...register('confirmpassword', {
            required: 'Confirmation required',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setshowconfirm(!showconfirm)}>
                  {showconfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit */}
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
          className="w-full"
        >
          Register
        </LoaderButton>

        <Link
          to="/"
          className="text-sm text-blue-600 text-center hover:underline mt-2"
        >
          Already signed in? Login here.
        </Link>
      </form>
    </div>
  );
};

export default Signup;
