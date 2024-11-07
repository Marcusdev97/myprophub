import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section } from '../components/Layout';
import HomeLoanCalculator from '../components/HomeLoanCalculator';
import DSRCalculator from '../components/DSRCalculator';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('loan');

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-white pt-8 md:pt-12">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loan Calculators
            </h1>
            <p className="text-lg text-gray-600">
              Calculate your loan eligibility, monthly repayments, and DSR with our comprehensive calculators.
            </p>
          </div>
        </Container>
      </Section>

      {/* Calculators Section */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Custom Tabs */}
            <div className="flex mb-8 bg-white rounded-lg p-2 shadow-sm">
              <button
                onClick={() => setActiveTab('loan')}
                className={`flex-1 py-3 text-base rounded-lg transition-colors ${
                  activeTab === 'loan'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Home Loan Calculator
              </button>
              <button
                onClick={() => setActiveTab('dsr')}
                className={`flex-1 py-3 text-base rounded-lg transition-colors ${
                  activeTab === 'dsr'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                DSR Calculator
              </button>
            </div>

            {/* Calculator Content */}
            <div className="transition-all duration-300">
              {activeTab === 'loan' && <HomeLoanCalculator />}
              {activeTab === 'dsr' && <DSRCalculator />}
            </div>
          </div>
        </Container>
      </Section>

      {/* Info Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Loan Calculator Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Home Loan Calculator</h3>
              <p className="text-gray-600 text-sm">
                Calculate your monthly repayments, view amortization schedule, and understand the total cost of your home loan.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Monthly repayment breakdown</li>
                <li>• Principal vs Interest visualization</li>
                <li>• Loan amortization schedule</li>
                <li>• Total interest calculation</li>
              </ul>
            </div>

            {/* DSR Calculator Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">DSR Calculator</h3>
              <p className="text-gray-600 text-sm">
                Check your Debt Service Ratio (DSR) and understand your loan eligibility based on your income and commitments.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Income-based DSR limits</li>
                <li>• Monthly commitment analysis</li>
                <li>• Loan eligibility check</li>
                <li>• Professional recommendations</li>
              </ul>
              <Link 
                to="/contact" 
                className="inline-block mt-6 text-primary font-medium hover:text-primary-dark"
              >
                Need help? Contact our loan specialists →
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;