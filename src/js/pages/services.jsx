import React from 'react';
import { Building2, Home, KeyRound, Banknote } from 'lucide-react';
import ServiceCard from '../components/ServiceCard.jsx';

const ServicesPage = () => {
  return (
    <div className="content-container">
      <div className="services-page">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Professional Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in Malaysian real estate. We provide comprehensive 
            property solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="New Project Sales"
            icon={Building2}
            description="Access to the latest property developments across Malaysia. Get exclusive launches, special developer packages, and the best deals on new properties."
            whatsappLink="https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20new%20project%20sales"
          />
          
          <ServiceCard
            title="Subsale Properties"
            icon={Home}
            description="Expert assistance in buying and selling secondary market properties. We help you navigate the market to find the best value for your investment."
            whatsappLink="https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20subsale%20properties"
          />
          
          <ServiceCard
            title="Rental Services"
            icon={KeyRound}
            description="Comprehensive rental management solutions for landlords and tenants. From property listing to tenant screening and contract preparation."
            whatsappLink="https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20rental%20services"
          />

          <ServiceCard
            title="Loan Advisory"
            icon={Banknote}
            description="Professional guidance on property financing options. We help you secure the best loan packages from various banks and financial institutions."
            whatsappLink="https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20loan%20services"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;