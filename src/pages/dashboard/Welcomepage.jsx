import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { toast } from 'react-toastify';

const WelcomePage = ({totalIncome , totalExpense}) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* Welcome Section */}
      <div className="text-center p-8 md:p-16 bg-white shadow-lg rounded-xl max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Here you can track your progress, manage your tasks, and stay on top
          of everything. Let's get started.
        </p>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
          Get Started
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {`${months[new Date().getMonth()]} month's Expense `}
          </h3>
          <p className="text-3xl text-blue-600 font-bold"><CurrencyRupeeIcon/>{totalExpense}</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{`${months[new Date().getMonth()]} month's Income `}</h3>
          <p className="text-3xl text-green-600 font-bold"><CurrencyRupeeIcon/>{totalIncome}</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Pending Tasks
          </h3>
          <p className="text-3xl text-yellow-600 font-bold">7</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
