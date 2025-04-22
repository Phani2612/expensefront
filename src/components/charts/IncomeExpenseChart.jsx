import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import SpinLoader from '../SpinLoader';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseCharts = ({
  totalIncome,
  totalExpense,
  User,
  selectedMonth,
  selectedYear,
  monthstring,
  dateShow,
}) => {
  const [view, setView] = useState('main'); // 'main' | 'income' | 'expense'
  const [ExpenseCat, setExpenseCat] = useState([]);
  const [IncomeCat, setIncomeCat] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Expenselabels, setExpenseLabels] = useState([]);
  const [ExpensedataPoints, setExpenseDataPoints] = useState([]);
  const [Incomelabels, setIncomeLabels] = useState([]);
  const [IncomedataPoints, setIncomeDataPoints] = useState([]);

  // Total Income vs Expenses
  const totalData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Income Categories
  const incomeData = {
    labels: Incomelabels,
    datasets: [
      {
        data: IncomedataPoints,
        backgroundColor: ['#4BC0C0', '#36A2EB', '#9966FF'],
      },
    ],
  };

  useEffect(() => {
    if (ExpenseCat.length > 0) {
      const tempLabels = [];
      const tempDatapoints = [];

      ExpenseCat.forEach((i) => {
        tempLabels.push(i._id);
        tempDatapoints.push(i.TotalAmount);
      });

      setExpenseLabels(tempLabels);
      setExpenseDataPoints(tempDatapoints);
    }
  }, [ExpenseCat]);

  useEffect(() => {
    if (IncomeCat.length > 0) {
      const tempLabels = [];
      const tempDatapoints = [];

      IncomeCat.forEach((i) => {
        tempLabels.push(i._id);
        tempDatapoints.push(i.TotalAmount);
      });

      setIncomeLabels(tempLabels);
      setIncomeDataPoints(tempDatapoints);
    }
  }, [IncomeCat]);

  const expenseData = {
    labels: Expenselabels,
    datasets: [
      {
        data: ExpensedataPoints,
        backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#36A2EB'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  const ExpenseBreakDown = async () => {
    dateShow(false);
    setView('expense');
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/expense/category-summary?user_id=${User._id}&month=${selectedMonth}&year=${selectedYear}`
      );
      const { data } = response.data;
      if (data.length === 0) {
        toast.info(
          `No records for ${selectedYear} and selected ${monthstring}`
        );
      }
      setExpenseCat(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const IncomeBreakdown = async () => {
    dateShow(false);
    setView('income');
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/income/category-summary?user_id=${User._id}&month=${selectedMonth}&year=${selectedYear}`
      );
      const { data } = response.data;
      if (data.length === 0) {
        toast.info(
          `No records for ${selectedYear} and selected ${monthstring}`
        );
      }
      setIncomeCat(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'something is wrong');
    } finally {
      setLoading(false);
    }
  };

  const BackController = () => {
    setView('main');
    dateShow(true);
  };

  return (
    <div className="flex flex-col items-center text-center p-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Expense Tracker Dashboard
      </h2>

      {view === 'main' && (
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] mx-auto mb-6">
          <h4 className="text-lg md:text-xl font-medium mb-4">
            Total Income vs Expenses
          </h4>
          <Pie data={totalData} options={options} />
          <div className="mt-5 flex flex-col md:flex-row justify-center gap-4">
            <Button
              variant="contained"
              onClick={() => IncomeBreakdown()}
              sx={{
                backgroundColor: '#4BC0C0',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '12px',
                px: 3,
                py: 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#36A2EB',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              View Income Breakdown
            </Button>

            <Button
              variant="contained"
              onClick={() => ExpenseBreakDown()}
              sx={{
                backgroundColor: '#FF6384',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '12px',
                px: 3,
                py: 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#E91E63',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              View Expense Breakdown
            </Button>
          </div>
        </div>
      )}

      {view === 'income' && (
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] mx-auto mb-6">
          <h4 className="text-lg md:text-xl font-medium mb-4">
            Income Categories
          </h4>
          <Pie data={incomeData} options={options} />
          <Button
            variant="outlined"
            onClick={() => BackController()}
            sx={{
              marginTop: '20px',
              borderColor: '#1976D2',
              color: '#1976D2',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '12px',
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#1976D2',
                color: 'white',
                borderColor: '#1976D2',
                transform: 'scale(1.03)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            Back
          </Button>
        </div>
      )}

      {view === 'expense' && (
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] mx-auto mb-6">
          <h4 className="text-lg md:text-xl font-medium mb-4">
            Expense Categories
          </h4>
          <Pie data={expenseData} options={options} />
          <Button
            variant="outlined"
            onClick={() => BackController()}
            sx={{
              marginTop: '20px',
              borderColor: '#1976D2',
              color: '#1976D2',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '12px',
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#1976D2',
                color: 'white',
                borderColor: '#1976D2',
                transform: 'scale(1.03)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            Back
          </Button>
        </div>
      )}

      {Loading && <SpinLoader />}
    </div>
  );
};

export default IncomeExpenseCharts;
