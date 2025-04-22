const FeaturesSection = () => {
    return (
      <div className="py-16 bg-gray-50 text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our Expense Tracker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">💸 Track Expenses</h3>
            <p className="text-gray-600">Log daily expenses and income with ease. Stay aware of your financial flow in real-time.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">📅 Smart Reminders</h3>
            <p className="text-gray-600">Set calendar alerts for bill payments and get notified via email before deadlines.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">📊 Visual Insights</h3>
            <p className="text-gray-600">Analyze your income & spending trends through clean charts and reports.</p>
          </div>
        </div>
      </div>
    );
  };

  

  export default FeaturesSection