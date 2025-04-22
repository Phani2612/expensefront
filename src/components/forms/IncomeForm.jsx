import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { MyBox } from '../../context/Mybox';
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
import SpinLoader from '../SpinLoader';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { getAllIncomes, updateanIncome } from '../../redux/slice/incomeslice';

const categories = [
  'Food',
  'Travel',
  'Shopping',
  'Utilities',
  'Health',
  'Others',
];

const paymentMethods = [
  'Bank Transfer',
  'Cash',
  'Cheque',
  'Credit Card',
  'Debit Card',
  'PayPal',
  'Venmo',
  'Stripe',
  'Zelle',
  'Google Pay',
  'Apple Pay',
  'Samsung Pay',
  'Cash App',
  'Cryptocurrency',
  'Other',
];

const IncomeForm = ({ onClose, userData, datafrom }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm();

  const data = useContext(MyBox);

  if (!data) {
    return null;
  }

  const { setShowIncome } = data;

  const [isLoading, setisLoading] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [incomeid, setIncomeId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (datafrom) {
      setValue('title', datafrom.title || '');
      setValue('amount', datafrom.amount || '');
      setValue('category', datafrom.category || '');
      setValue('date', datafrom.date ? datafrom.date.split('T')[0] : ''); // Extract the date part
      setValue('notes', datafrom.notes || '');
      setValue('payment', datafrom.payment || '');
      setValue(
        'enddate',
        datafrom.enddate ? datafrom.enddate.split('T')[0] : ''
      );
      setisEditing(true);
      setIncomeId(datafrom._id || null);
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
      payment: data.payment,
      income_id: incomeid,
    };
    try {
      if (isEditing) {
        setisLoading(true);
        const apiResult = await dispatch(updateanIncome(newData));
        if (updateanIncome.fulfilled.match(apiResult)) {
          toast.success('Updated siccessfully');
          await dispatch(getAllIncomes(userData));
          setShowIncome(false);
        } else {
          const errorMessage = apiResult?.payload || 'Something went wrong!';

          toast.error(errorMessage);
        }
      } else {
        setisLoading(true);
        const response = await axiosInstance.post(`/income/add`, newData);
        const { success, message } = response.data;
        toast.success(message);
        await dispatch(getAllIncomes(userData));
        reset();
        setShowIncome(false);
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

  const Handleclose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50 p-4 min-h-screen">
      <Paper
        elevation={3}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl p-4 sm:p-8 mt-6 max-h-[90vh] overflow-y-auto"
      >
        <Typography variant="h6" className="mb-4 text-center">
          Add New Income
        </Typography>

        <IconButton
          onClick={Handleclose}
          className="absolute top-2 right-2"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit(SubmitForm)}
        >
          <TextField
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message || ' '}
            {...register('title', {
              required: 'Title is required',
            })}
            required
            fullWidth
          />

          <TextField
            label="Amount"
            error={!!errors.amount}
            helperText={errors.amount?.message || ' '}
            {...register('amount', {
              required: 'Amount is required',
            })}
            type="number"
            required
            fullWidth
          />

          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category must be selected' }}
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

          <Controller
            name="payment"
            control={control}
            defaultValue=""
            rules={{ required: 'payment must be selected' }}
            render={({ field }) => (
              <TextField
                select
                label="Payment method"
                error={!!errors.payment}
                helperText={errors.payment?.message || ' '}
                fullWidth
                {...field}
              >
                {paymentMethods.map((pay, index) => (
                  <MenuItem key={index} value={pay}>
                    {pay}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Date"
            error={!!errors.date}
            helperText={errors.date?.message || ' '}
            {...register('date', {
              required: 'Date is required',
            })}
            type="date"
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Notes"
            error={!!errors.notes}
            helperText={errors.notes?.message || ' '}
            {...register('notes')}
            fullWidth
            multiline
            rows={3}
            className="sm:col-span-2"
          />

          <div className="flex gap-4 sm:col-span-2 justify-end mt-2">
            <Button
              type="button"
              variant="outlined"
              onClick={handleReset}
              className={`${isEditing ? 'invisible' : ''}`}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Update Income' : 'Add Income'}
            </Button>
          </div>
        </form>
      </Paper>
      {isLoading && <SpinLoader message="SUbmitting your income" />}
    </div>
  );
};

export default IncomeForm;
