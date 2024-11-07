import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Home, KeyRound, Banknote } from 'lucide-react';
import ServiceCard from '../components/ServiceCard.jsx';
import { Container, Section } from '../components/Layout';

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceType) => {
    switch (serviceType) {
      case 'new':
        navigate('/projects', { state: { listingType: 'sale', initialCategory: 'new' } });
        break;
      case 'subsale':
        navigate('/projects', { state: { listingType: 'sale', initialCategory: 'subsale' } });
        break;
      case 'rental':
        navigate('/projects', { state: { listingType: 'rent' } });
        break;
      case 'loan':
        window.open('https://wa.me/601133698121?text=I%20want%20to%20know%20more%20about%20loan%20services', '_blank');
        break;
      default:
        navigate('/projects');
    }
  };

  const services = [
    {
      title: "New Project Sales",
      icon: Building2,
      description: "Access to the latest property developments across Malaysia. Get exclusive launches, special developer packages, and the best deals on new properties.",
      onClick: () => handleServiceClick('new')
    },
    {
      title: "Subsale Properties",
      icon: Home,
      description: "Expert assistance in buying and selling secondary market properties. We help you navigate the market to find the best value for your investment.",
      onClick: () => handleServiceClick('subsale')
    },
    {
      title: "Rental Services",
      icon: KeyRound,
      description: "Comprehensive rental management solutions for landlords and tenants. From property listing to tenant screening and contract preparation.",
      onClick: () => handleServiceClick('rental')
    },
    {
      title: "Loan Advisory",
      icon: Banknote,
      description: "Professional guidance on property financing options. We help you secure the best loan packages from various banks and financial institutions.",
      onClick: () => handleServiceClick('loan')
    }
  ];

  return (
    <Section className="py-4 sm:py-6 md:py-10">
      <Container size="default" className="max-w-6xl">
        {/* Header Section - 采用与 Projects 页面相似的样式 */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
            Our Professional Services
          </h1>
          <p className="text-center text-gray-600 text-sm sm:text-base max-w-xl px-4 sm:px-0">
            Your trusted partner in Malaysian real estate. We provide comprehensive 
            property solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid - 使用与 Projects 相似的网格布局 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              className="mx-auto w-full max-w-sm sm:max-w-none"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ServicesPage;