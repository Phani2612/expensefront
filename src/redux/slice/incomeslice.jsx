import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getAllIncomes = createAsyncThunk(
  'user/income',
  async (userData, { rejectWithValue }) => {
    if (!userData || !userData._id) {
      return rejectWithValue('User data is missing or invalid.');
    }
    try {
      const response = await axiosInstance.get(`/income/fetch/${userData._id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get reports'
      );
    }
  }
);

export const updateanIncome = createAsyncThunk(
  'income/update',
  async (incomeData, { rejectWithValue }) => {
    if (!incomeData) {
      return rejectWithValue('No data selected');
    }

    try {
      const response = await axiosInstance.put(
        `/income/update/${incomeData.income_id}`,
        incomeData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update'
      );
    }
  }
);

export const deleteIncome = createAsyncThunk(
  'income/delete',
  async (deleteId, { rejectWithValue }) => {
    if (!deleteId) {
      return rejectWithValue('Item not selected');
    }

    try {
      const response = await axiosInstance.delete(`/income/delete/${deleteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete'
      );
    }
  }
);

export const FilterIncome = createAsyncThunk(
  'expense/filter',
  async (Data, { rejectWithValue }) => {
    if (!Data) {
      return rejectWithValue('Data not sent properly');
    }
    try {
      const response = await axiosInstance.get(
        `/income/filter/timeline?userId=${Data.user_id}&type=${Data.type}&value=${Data.value}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to filter the data'
      );
    }
  }
);

export const IncomeSlice = createSlice({
  name: 'income',
  initialState: {
    error: null,
    loading: false,
    income: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllIncomes.fulfilled, (state, action) => {
        (state.loading = false), (state.income = action.payload);
      })

      .addCase(getAllIncomes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.loading = false;

        state.income.data = state.income.data.filter(
          (item) => item._id != action.meta.arg
        );
      })

      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateanIncome.pending, (state) => {
        state.error = null;
        state.loading = true;
      })

      .addCase(updateanIncome.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(updateanIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(FilterIncome.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(FilterIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
      })

      .addCase(FilterIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default IncomeSlice.reducer;
