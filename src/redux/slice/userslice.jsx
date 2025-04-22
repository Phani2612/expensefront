import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const SigninUser = createAsyncThunk(
  'user/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/signup', userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signin failed');
    }
  }
);

export const LoginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getUser = createAsyncThunk(
  'user/get',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/get/${userData}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something wrong'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SigninUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(SigninUser.fulfilled, (state, action) => {
        (state.loading = false), (state.currentUser = action.payload);
      })

      .addCase(SigninUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      .addCase(LoginUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(LoginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.currentUser = action.payload);
      })

      .addCase(LoginUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      .addCase(getUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(getUser.fulfilled, (state, action) => {
        (state.loading = false), (state.currentUser = action.payload);
      })

      .addCase(getUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default userSlice.reducer;
