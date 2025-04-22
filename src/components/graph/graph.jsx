
import React, { useState, useContext } from 'react';
import IncomeExpensePieChart from '../charts/IncomeExpenseChart.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { MyBox } from '../../context/Mybox.jsx';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Graph() {
  const data = useContext(MyBox);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showdatefilter, setshowdatefilter] = useState(true);

  if (!data) return null;

  const { totalExpense, totalIncome, userData } = data;
  const expenseData = useSelector((output) => output.expense.expense.data || []);
  const incomeData = useSelector((output) => output.income.income.data || []);

  if (!expenseData || !incomeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2019 + 1 },
    (_, index) => 2020 + index
  );
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="p-4 md:p-8 mb-20 w-full max-w-6xl mx-auto">
      {showdatefilter && (
        <div className="mb-6">
          <Typography
            variant="h5"
            gutterBottom
            className="text-center md:text-left"
          >
            Select Year and Month
          </Typography>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                label="Select Month and Year"
                minDate={new Date('2020-01-01')}
                maxDate={new Date()}
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setYear(newValue.getFullYear());
                  setMonth(newValue.getMonth() + 1);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center">
        <IncomeExpensePieChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          User={userData}
          selectedYear={year}
          selectedMonth={month}
          monthstring={months[month - 1]}
          dateShow={setshowdatefilter}
        />
      </div>
    </div>
  );
}

export default Graph;
