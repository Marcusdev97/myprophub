import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const calculateLoanSchedule = (propertyPrice, downPaymentPercent, interestRate, years) => {
  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = years * 12;
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let balance = loanAmount;
  const schedule = [];
  let accumulatedPrincipal = 0;
  let accumulatedInterest = 0;
  let yearlyData = {
    year: 1,
    accumulatedPrincipal: 0,
    accumulatedInterest: 0,
    balance: balance
  };
  
  for (let payment = 1; payment <= totalMonths; payment++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    balance -= principalPayment;
    accumulatedPrincipal += principalPayment;
    accumulatedInterest += interestPayment;
    
    yearlyData.accumulatedPrincipal = accumulatedPrincipal;
    yearlyData.accumulatedInterest = accumulatedInterest;
    yearlyData.balance = balance;
    
    if (payment % 12 === 0) {
      schedule.push({ ...yearlyData });
      yearlyData = {
        year: schedule.length + 1,
        accumulatedPrincipal,
        accumulatedInterest,
        balance
      };
    }
  }

  return {
    monthlyPayment,
    totalInterest: accumulatedInterest,
    schedule,
    loanAmount,
    downPayment
  };
};

const HomeLoanCalculator = () => {
  const [formData, setFormData] = useState({
    propertyPrice: '',
    downPayment: '10',
    interestRate: '4.25',
    tenure: '35'
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const formatNumber = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^\d.]/g, '');
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const number = parseFloat(value);
    if (!isNaN(number)) {
      setFormData(prev => ({
        ...prev,
        [name]: formatNumber(number)
      }));
    }
  };

  const calculateLoan = () => {
    const propertyPrice = parseFloat(formData.propertyPrice.replace(/,/g, ''));
    const downPaymentPercent = parseFloat(formData.downPayment);
    const interestRate = parseFloat(formData.interestRate);
    const years = parseInt(formData.tenure);

    const results = calculateLoanSchedule(
      propertyPrice,
      downPaymentPercent,
      interestRate,
      years
    );

    setResults(results);
    setShowResults(true);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Home Loan Calculator</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500">RM</span>
                  </div>
                  <input
                    type="text"
                    name="propertyPrice"
                    value={formData.propertyPrice}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="block w-full pl-14 pr-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="downPayment"
                      value={formData.downPayment}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="10"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="interestRate"
                      value={formData.interestRate}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="4.25"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Period
                  </label>
                  <select
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {[10, 20, 30, 35].map(year => (
                      <option key={year} value={year}>{year} Years</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculateLoan}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors mt-4"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Results Card */}
          {showResults && results && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600">Monthly Repayment</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  RM {formatNumber(results.monthlyPayment)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Total Principal</p>
                  <p className="text-xl font-semibold text-primary mt-1">
                    RM {formatNumber(results.loanAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-xl font-semibold text-red-500 mt-1">
                    RM {formatNumber(results.totalInterest)}
                  </p>
                </div>
              </div>

              <div className="h-72">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Schedule</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.schedule}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="year"
                      tickMargin={10}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value/1000}k`}
                      stroke="#9ca3af"
                    />
                    <Tooltip
                      formatter={(value) => `RM ${formatNumber(value)}`}
                      labelFormatter={(value) => `Year ${value}`}
                    />
                    <Line 
                      type="monotone"
                      name="Principal Paid"
                      dataKey="accumulatedPrincipal"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone"
                      name="Interest Paid"
                      dataKey="accumulatedInterest"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone"
                      name="Remaining Balance"
                      dataKey="balance"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center mt-4 gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <span>Principal Paid</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <span>Interest Paid</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2" />
                  <span>Remaining Balance</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculator;