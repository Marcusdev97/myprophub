import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DSR_LIMITS = {
  LOW_INCOME: {
    max: 3000,
    limit: 60
  },
  MEDIUM_INCOME: {
    min: 3000,
    max: 5000,
    limit: 70
  },
  HIGH_INCOME: {
    min: 5000,
    limit: 80
  }
};

const DSR_MESSAGES = {
  WITHIN_LIMIT: "Your DSR is within acceptable range for most banks.",
  EXCEED_LIMIT: "Your DSR exceeds the recommended limit for your income bracket. Consider:",
  RECOMMENDATIONS: [
    "Joint loan application with a family member",
    "Reducing existing commitments",
    "Consulting with our loan specialists for professional guidance"
  ]
};

const CHART_COLORS = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-info)'
];

const DSRCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    carLoan: '',
    personalLoan: '',
    creditCard: '',
    housingLoan: '',
    othersLoan: ''
  });

  const [results, setResults] = useState(null);

  const formatNumber = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const parseNumber = (value) => {
    if (!value) return 0;
    return parseFloat(value.replace(/,/g, ''));
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

  const getDSRLimit = (income) => {
    if (income <= DSR_LIMITS.LOW_INCOME.max) {
      return DSR_LIMITS.LOW_INCOME.limit;
    } else if (income <= DSR_LIMITS.MEDIUM_INCOME.max) {
      return DSR_LIMITS.MEDIUM_INCOME.limit;
    }
    return DSR_LIMITS.HIGH_INCOME.limit;
  };

  const calculateDSR = () => {
    const income = parseNumber(formData.monthlyIncome);
    const commitments = {
      carLoan: parseNumber(formData.carLoan),
      personalLoan: parseNumber(formData.personalLoan),
      creditCard: parseNumber(formData.creditCard) * 0.05,
      housingLoan: parseNumber(formData.housingLoan),
      othersLoan: parseNumber(formData.othersLoan)
    };
    
    const totalCommitments = Object.values(commitments).reduce((a, b) => a + b, 0);
    const dsr = (totalCommitments / income) * 100;
    const dsrLimit = getDSRLimit(income);

    const chartData = [
      { name: 'Car Loan', value: commitments.carLoan },
      { name: 'Personal Loan', value: commitments.personalLoan },
      { name: 'Credit Card (5%)', value: commitments.creditCard },
      { name: 'Housing Loan', value: commitments.housingLoan },
      { name: 'Other Loan', value: commitments.otherLoan },
    ].filter(item => item.value > 0);

    setResults({
      dsr: dsr.toFixed(2),
      dsrLimit,
      monthlyCommitments: totalCommitments,
      monthlyIncome: income,
      chartData,
      exceededLimit: dsr > dsrLimit
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">DSR Calculator</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income (After EPF & SOCSO)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">RM</span>
              </div>
              <input
                type="text"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Loan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">RM</span>
                </div>
                <input
                  type="text"
                  name="carLoan"
                  value={formData.carLoan}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Loan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">RM</span>
                </div>
                <input
                  type="text"
                  name="personalLoan"
                  value={formData.personalLoan}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Card Balance
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">RM</span>
                </div>
                <input
                  type="text"
                  name="creditCard"
                  value={formData.creditCard}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Housing Loan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">RM</span>
                </div>
                <input
                  type="text"
                  name="housingLoan"
                  value={formData.housingLoan}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Others Loan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">RM</span>
                </div>
                <input
                  type="text"
                  name="othersloan"
                  value={formData.othersLoan} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateDSR}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors"
          >
            Calculate DSR
          </button>
        </div>
      </div>

      {/* Results Card */}
      {results && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="text-base font-medium text-gray-600">Your DSR</h3>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold ${results.exceededLimit ? 'text-red-500' : 'text-primary'}`}>
                    {results.dsr}%
                  </p>
                  <p className="text-sm text-gray-500">
                    of {results.dsrLimit}% limit
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Monthly Commitments: RM {formatNumber(results.monthlyCommitments)}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${results.exceededLimit ? 'bg-red-50' : 'bg-green-50'}`}>
                <p className={`text-sm ${results.exceededLimit ? 'text-red-800' : 'text-green-800'}`}>
                  {results.exceededLimit ? DSR_MESSAGES.EXCEED_LIMIT : DSR_MESSAGES.WITHIN_LIMIT}
                </p>
                {results.exceededLimit && (
                  <ul className="mt-2 text-sm text-red-700 space-y-1">
                    {DSR_MESSAGES.RECOMMENDATIONS.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={2}
                  >
                    {results.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `RM ${formatNumber(value)}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {results.chartData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DSRCalculator;