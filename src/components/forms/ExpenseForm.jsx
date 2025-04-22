import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import SpinLoader from '../SpinLoader';
import { MyBox } from '../../context/Mybox.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  getAllExpenses,
  updateanExpense,
} from '../../redux/slice/expenseslice';

const categories = [
  'Food',
  'Travel',
  'Shopping',
  'Utilities',
  'Health',
  'Others',
];

const frequency = ['Yearly', 'Monthly', 'Weekly', 'Daily'];

const ExpenseForm = ({ onClose, userData, datafrom }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm();

  const Data = useContext(MyBox);

  if (!Data) {
    return null;
  }

  const { setShowExpense, disabled, setdisabled } = Data;

  const [isLoading, setisLoading] = useState(false);
  const [isRecurring, setisRecurring] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (datafrom) {
      setValue('title', datafrom.title || '');
      setValue('amount', datafrom.amount || '');
      setValue('category', datafrom.category || '');
      setValue('date', datafrom.date ? datafrom.date.split('T')[0] : ''); // Extract the date part
      setValue('notes', datafrom.notes || '');
      setValue(
        'enddate',
        datafrom.enddate ? datafrom.enddate.split('T')[0] : ''
      );
      setValue('frequency', datafrom.frequency || '');
      {
        datafrom.isActive ? setisRecurring(true) : null;
      }
      setisEditing(true);
      setExpenseId(datafrom._id || null);
    }
  }, [setValue, datafrom]);

  const SubmitForm = async (data) => {
    const newData = {
      user_id: userData._id,
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      notes: data.notes,
      isActive: isRecurring ? true : null,
      enddate: isRecurring ? data.enddate : null,
      expense_id: expenseId,
      frequency: isRecurring ? data.frequency : null,
    };

    try {
      if (isEditing) {
        setisLoading(true);

        const apiResult = await dispatch(updateanExpense(newData));
        if (updateanExpense.fulfilled.match(apiResult)) {
          toast.success('Updated siccessfully');
          await dispatch(getAllExpenses(userData));
          setShowExpense(false);
        } else {
          const errorMessage = apiResult?.payload || 'Something went wrong!';

          toast.error(errorMessage);
        }
      } else {
        setisLoading(true);
        const response = await axiosInstance.post(`/expense/add`, newData);
        const { success, message } = response.data;
        toast.success(message);
        await dispatch(getAllExpenses(userData));
        reset();
        setShowExpense(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setisLoading(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleSwitchChange = (event) => {
    setisRecurring(event.target.checked);
  };

  const Handleclose = () => {
    if (disabled) {
      setdisabled(false);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50 p-4 min-h-screen">
      <Paper
        elevation={3}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl p-4 sm:p-8 mt-6 max-h-[90vh] overflow-y-auto"
      >
        <IconButton
          onClick={Handleclose}
          className="absolute top-2 right-2"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" className="mb-4 text-center">
          Add New Expense
        </Typography>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit(SubmitForm)}
        >
          <TextField
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message || ' '}
            {...register('title', { required: 'Title is required' })}
            required
            fullWidth
            disabled={disabled}
          />

          <TextField
            label="Amount"
            error={!!errors.amount}
            helperText={errors.amount?.message || ' '}
            {...register('amount', { required: 'Amount is required' })}
            type="number"
            required
            fullWidth
            disabled={disabled}
          />

          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category must be selected' }}
            disabled={disabled}
            render={({ field }) => (
              <TextField
                select
                label="Category"
                error={!!errors.category}
                helperText={errors.category?.message || ' '}
                fullWidth
                {...field}
              >
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Date"
            error={!!errors.date}
            helperText={errors.date?.message || ' '}
            {...register('date', { required: 'Date is required' })}
            type="date"
            disabled={disabled}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <FormControlLabel
            disabled={disabled}
            control={
              <Switch checked={isRecurring} onChange={handleSwitchChange} />
            }
            label="Recurring?"
          />

          {isRecurring && (
            <Controller
              name="frequency"
              control={control}
              defaultValue=""
              rules={{ required: 'Frequency must be selected' }}
              disabled={disabled}
              render={({ field }) => (
                <TextField
                  select
                  label="Frequency"
                  error={!!errors.frequency}
                  helperText={errors.frequency?.message || ' '}
                  fullWidth
                  {...field}
                >
                  {frequency.map((fre, index) => (
                    <MenuItem key={index} value={fre}>
                      {fre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}

          {isRecurring && (
            <TextField
              label="End Date"
              error={!!errors.enddate}
              helperText={errors.enddate?.message || ' '}
              {...register('enddate')}
              type="date"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={disabled}
            />
          )}

          <TextField
            label="Notes"
            error={!!errors.notes}
            helperText={errors.notes?.message || ' '}
            disabled={disabled}
            {...register('notes', { required: 'Notes required' })}
            fullWidth
            multiline
            rows={3}
            className="sm:col-span-2"
          />

          <div className="flex gap-4 sm:col-span-2 justify-end mt-2">
            <Button
              type="button"
              variant="outlined"
              disabled={disabled}
              onClick={handleReset}
              className={`${isEditing ? 'invisible' : ''}`}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disabled}
            >
              {isEditing ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </Paper>

      {isLoading && <SpinLoader message="submitting your expense" />}
    </div>
  );
};

export default ExpenseForm;
