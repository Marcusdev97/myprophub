import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TRANSITION_DURATION = 800;

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

const CHART_COLORS = [
  'var(--color-primary)',   
  'var(--color-success)',   
  'var(--color-warning)',   
  'var(--color-info)'     
];

const LOAN_FIELDS = [
  { name: 'carLoan', label: 'Car Loan' },
  { name: 'personalLoan', label: 'Personal Loan' },
  { name: 'creditCard', label: 'Credit Card Balance' },
  { name: 'housingLoan', label: 'Housing Loan' }
];

const DSRCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    carLoan: '',
    personalLoan: '',
    creditCard: '',
    housingLoan: ''
  });

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const calculateAvailableQuota = (income, totalCommitments) => {
    const dsrLimit = getDSRLimit(income);
    const maxMonthlyCommitment = (income * dsrLimit) / 100;
    return Math.max(0, maxMonthlyCommitment - totalCommitments);
  };

  const handleCalculate = useCallback(() => {
    if (!formData.monthlyIncome) {
      alert('Please enter your monthly income');
      return;
    }

    setIsCalculating(true);
    setTimeout(() => {
      try {
        const income = parseNumber(formData.monthlyIncome);
        const commitments = {
          carLoan: parseNumber(formData.carLoan),
          personalLoan: parseNumber(formData.personalLoan),
          creditCard: parseNumber(formData.creditCard) * 0.05,
          housingLoan: parseNumber(formData.housingLoan)
        };
        
        const totalCommitments = Object.values(commitments).reduce((a, b) => a + b, 0);
        const dsr = (totalCommitments / income) * 100;
        const availableQuota = calculateAvailableQuota(income, totalCommitments);

        const chartData = Object.entries(commitments)
          .map(([key, value]) => ({
            name: LOAN_FIELDS.find(field => field.name === key)?.label || key,
            value,
            percentage: (value / income) * 100
          }))
          .filter(item => item.value > 0);

        setResults({
          dsr,
          monthlyCommitments: totalCommitments,
          monthlyIncome: income,
          chartData,
          availableQuota,
          exceededLimit: dsr > getDSRLimit(income)
        });
      } catch (error) {
        console.error('Calculation error:', error);
        alert('An error occurred while calculating DSR');
      }
    }, TRANSITION_DURATION / 2);
  }, [formData]);

  const handleRecalculate = useCallback(() => {
    setIsCalculating(false);
    setTimeout(() => {
      setResults(null);
    }, TRANSITION_DURATION);
  }, []);

  return (
    <div className="dsr-calculator">
      <div className="dsr-calculator__container">
        {/* Form Section */}
        <div className={`dsr-calculator__form ${
          isCalculating ? 'dsr-calculator__form--hidden' : ''
        }`}>
          <div className="dsr-calculator__form-content">
            <div className="dsr-calculator__input-group">
              <label>Monthly Income (After EPF & SOCSO)</label>
              <div className="dsr-calculator__input-group-wrapper">
                <span className="dsr-calculator__input-group-prefix">RM</span>
                <input
                  type="text"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="dsr-calculator__form-group">
              {LOAN_FIELDS.map(({ name, label }) => (
                <div key={name} className="dsr-calculator__input-group">
                  <label>{label}</label>
                  <div className="dsr-calculator__input-group-wrapper">
                    <span className="dsr-calculator__input-group-prefix">RM</span>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleCalculate} className="dsr-calculator__submit">
              Calculate DSR
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className={`dsr-calculator__results ${
            isCalculating ? '' : 'dsr-calculator__results--hidden'
          }`}>
            <div className="dsr-calculator__results-content">
              {/* DSR Header */}
              <div className="dsr-calculator__result-header">
                <h3 className="dsr-calculator__result-header-title">DSR of Salary</h3>
                <div className="dsr-calculator__result-header-value">
                  <p className={`percentage ${
                    results.exceededLimit ? 'percentage--danger' : 'percentage--success'
                  }`}>
                    {results.dsr.toFixed(2)}%
                  </p>
                  <p className="income">
                    Monthly Income: RM {formatNumber(results.monthlyIncome)}
                  </p>
                </div>
                <p className="dsr-calculator__available-quota">
                  Available Monthly Commitment: RM {formatNumber(results.availableQuota)}
                </p>
              </div>

              {/* Status Indicator */}
              <div className={`dsr-calculator__status ${
                results.exceededLimit ? 'dsr-calculator__status--danger' : 'dsr-calculator__status--success'
              }`}>
                <p className="dsr-calculator__status-message">
                  {results.exceededLimit 
                    ? "Your DSR exceeds the recommended range for loan approval" 
                    : "Your DSR is within acceptable range for most banks"
                  }
                </p>
              </div>

              {/* Analysis Section */}
              <div className="dsr-calculator__analysis">
                {/* Chart */}
                <div className="dsr-calculator__chart">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={results.chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius="65%"
                        outerRadius="85%"
                        paddingAngle={4}
                      >
                        {results.chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `RM ${formatNumber(value)}`}
                        contentStyle={{
                          backgroundColor: 'var(--color-white)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Breakdown */}
                <div className="dsr-calculator__breakdown">
                  {results.chartData.map((entry, index) => (
                    <div key={index} className="dsr-calculator__breakdown-item">
                      <span 
                        className="dsr-calculator__breakdown-item-indicator"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      <span className="dsr-calculator__breakdown-item-label">
                        {entry.name}
                      </span>
                      <div className="dsr-calculator__breakdown-item-values">
                        <span className="amount">
                          RM {formatNumber(entry.value)}
                        </span>
                        <span className="percentage">
                          {entry.percentage.toFixed(1)}% of salary
                        </span>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={handleRecalculate} 
                    className="dsr-calculator__recalculate"
                  >
                    Recalculate DSR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSRCalculator;