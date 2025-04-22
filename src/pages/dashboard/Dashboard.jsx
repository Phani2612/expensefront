import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { Paper } from '@mui/material';
import { MyBox } from '../../context/Mybox.jsx';
import ExpenseForm from '../../components/forms/ExpenseForm.jsx';
import IncomeForm from '../../components/forms/IncomeForm.jsx';
import ExpenseTable from '../../components/tables/ExpenseTable.jsx';
import IncomeTable from '../../components/tables/IncomeTable.jsx';
import { getAllExpenses } from '../../redux/slice/expenseslice.jsx';
import { getAllIncomes } from '../../redux/slice/incomeslice.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './Welcomepage.jsx';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userData, setUserData] = useState(null);

  const Months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  const dispatch = useDispatch();
  const location = useLocation();

  const data = useContext(MyBox);

  if (!data) {
    return null;
  }

  const {
    showExpense,
    setShowExpense,
    showIncome,
    setShowIncome,
    datafrom,
    setDataFrom,
    totalIncome,
    totalExpense,
    setTotalExpense,
    setTotalIncome,
  } = data;

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser.data.user); // Update state when Redux data is available
    }
  }, [currentUser]);

  useEffect(() => {
    if (totalIncome === 0) return; // avoid division by zero
    const percentage = (totalExpense / totalIncome) * 100;

    if (percentage >= 90) {
      // 90% or more used
      axiosInstance
        .post('/notify-expense-warning', {
          email: userData?.email,
          username: userData?.username,
          expense: totalExpense,
          income: totalIncome,
        })
        .then(() => toast.success('Expense warning email sent!'))
        .catch((err) => toast.error('Failed to send expense email!'));
    }
  }, [totalExpense, totalIncome]);

  const CalculateTotalExpense = (array) => {
    let resultofExpense = array.reduce((a, b) => {
      const date = new Date(b.date);
      const now = new Date();

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        return a + b.amount;
      } else {
        return a;
      }
    }, 0);

    setTotalExpense(resultofExpense);
  };

  const CalculateTotalIncome = (array) => {
    let resultofIncome = array.reduce((a, b) => {
      const date = new Date(b.date);
      const now = new Date();

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        return a + b.amount;
      } else {
        return a;
      }
    }, 0);

    setTotalIncome(resultofIncome);
  };

  useEffect(() => {
    const fetchExpenseData = async () => {
      if (!userData) return;
      const apiResult = await dispatch(getAllExpenses(userData));
      await CalculateTotalExpense(apiResult.payload.data);
      if (getAllExpenses.fulfilled.match(apiResult)) {
      } else {
        const errorMessage = apiResult?.payload || 'Something went wrong!';

        toast.error(errorMessage);
      }
    };

    fetchExpenseData();
  }, [userData]);

  useEffect(() => {
    const fetchIncomeData = async () => {
      if (!userData) return;
      const apiResult = await dispatch(getAllIncomes(userData));

      await CalculateTotalIncome(apiResult.payload.data);
      if (getAllIncomes.fulfilled.match(apiResult)) {
      } else {
        const errorMessage = apiResult?.payload || 'Something went wrong';

        toast.error(errorMessage);
      }
    };

    fetchIncomeData();
  }, [userData]);

  const closeExpenseForm = () => {
    setDataFrom(null);
    setShowExpense(false);
  };

  const closeIncomeForm = () => {
    setDataFrom(null);
    setShowIncome(false);
  };

  return (
    <div className="p-10 space-y-15">
      {showExpense && (
        <ExpenseForm
          userData={userData}
          onClose={closeExpenseForm}
          datafrom={datafrom}
        />
      )}
      {showIncome && (
        <IncomeForm
          userData={userData}
          onClose={closeIncomeForm}
          datafrom={datafrom}
        />
      )}
      {location.pathname === '/dashboard' ? (
        <>
          <WelcomePage totalExpense={totalExpense} totalIncome={totalIncome} />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Dashboard;
