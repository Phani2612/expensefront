import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import LoaderButton from '../../components/Loader.jsx';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/slice/userslice.jsx';
import { Link } from 'react-router-dom';

const Login = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const apiResult = await dispatch(LoginUser(data));

    // Check if login was successful
    if (LoginUser.fulfilled.match(apiResult)) {
      const accessToken = apiResult.payload?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        toast.success('Login successful');
        window.location.pathname = '/dashboard';
      } else {
        toast.error('Access token missing');
      }
    } else {
      // Show error toast
      const errorMessage = apiResult?.payload || 'Something went wrong!';

      toast.error(errorMessage); // 🟢 This should appear now
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      {/* Close Button for Modal */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={closeModal}
      >
        &times;
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email Field */}
        <TextField
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message || ' '}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email format',
            },
          })}
        />

        {/* Password Field */}
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
              message: 'Must be at least 5 characters',
            },
            maxLength: {
              value: 10,
              message: 'Cannot exceed 10 characters',
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Login Button */}
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          className="w-full"
          loading={loading}
        >
          Login
        </LoaderButton>

        <Link className="text-blue-300" to="/register">
          New User? Sign up
        </Link>

        <Link className="text-blue-300" to="/forgot">
          Forgot Password or reset Password?
        </Link>


      </form>
    </div>
  );
};

export default Login;
