// src/js/pages/services.jsx
import React from 'react';
import { Building2, Home, KeyRound, Banknote } from 'lucide-react';
import ServiceCard from '../components/ServiceCard.jsx';

const ServicesPage = () => {
  const services = [
    {
      title: "New Project Sales",
      icon: Building2,
      description: "Access to the latest property developments across Malaysia. Get exclusive launches, special developer packages, and the best deals on new properties.",
      whatsappLink: "https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20new%20project%20sales"
    },
    {
      title: "Subsale Properties",
      icon: Home,
      description: "Expert assistance in buying and selling secondary market properties. We help you navigate the market to find the best value for your investment.",
      whatsappLink: "https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20subsale%20properties"
    },
    {
      title: "Rental Services",
      icon: KeyRound,
      description: "Comprehensive rental management solutions for landlords and tenants. From property listing to tenant screening and contract preparation.",
      whatsappLink: "https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20rental%20services"
    },
    {
      title: "Loan Advisory",
      icon: Banknote,
      description: "Professional guidance on property financing options. We help you secure the best loan packages from various banks and financial institutions.",
      whatsappLink: "https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20loan%20services"
    }
  ];

  return (
    <div className="content-container">
      <div className="services-page">
        <div className="services-page__header">
          <h1 className="services-page__title">Our Professional Services</h1>
          <p className="services-page__subtitle">
            Your trusted partner in Malaysian real estate. We provide comprehensive 
            property solutions tailored to your needs.
          </p>
        </div>

        <div className="services-page__content">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;