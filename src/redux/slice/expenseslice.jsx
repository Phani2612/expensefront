import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getAllExpenses = createAsyncThunk(
  'user/expense',
  async (userData, { rejectWithValue }) => {
    if (!userData || !userData._id) {
      return rejectWithValue('User data is missing or invalid.');
    }
    try {
      const response = await axiosInstance.get(
        `/expense/fetch/${userData._id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get reports'
      );
    }
  }
);

export const updateanExpense = createAsyncThunk(
  'expense/update',
  async (expenseData, { rejectWithValue }) => {
    if (!expenseData) {
      return rejectWithValue('No data selected');
    }
    try {
      const response = await axiosInstance.put(
        `/expense/update/${expenseData.expense_id}`,
        expenseData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update'
      );
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expense/delete',
  async (deleteId, { rejectWithValue }) => {
    if (!deleteId) {
      return rejectWithValue('Item not selected');
    }

    try {
      const response = await axiosInstance.delete(
        `/expense/delete/${deleteId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete'
      );
    }
  }
);

export const FilterExpense = createAsyncThunk(
  'expense/filter',
  async (Data, { rejectWithValue }) => {
    if (!Data) {
      return rejectWithValue('Data not sent properly');
    }
    try {
      const response = await axiosInstance.get(
        `/expense/filter/timeline?userId=${Data.user_id}&type=${Data.type}&value=${Data.value}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to filter the data'
      );
    }
  }
);

const ExpenseSlice = createSlice({
  name: 'expense',
  initialState: {
    error: null,
    loading: false,
    expense: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExpenses.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(getAllExpenses.fulfilled, (state, action) => {
        
        state.loading = false;
        state.expense = action.payload;
      })

      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;

        state.expense.data = state.expense.data.filter(
          (item) => item._id != action.meta.arg
        );
      })

      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateanExpense.pending, (state) => {
        state.error = null;
        state.loading = true;
      })

      .addCase(updateanExpense.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(updateanExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(FilterExpense.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(FilterExpense.fulfilled, (state, action) => {
        console.log('action', action.payload);
        state.loading = false;
        state.expense = action.payload;
      })

      .addCase(FilterExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ExpenseSlice.reducer;
