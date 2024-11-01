// src/js/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ title, icon: Icon, description, whatsappLink }) => {
  return (
    <div className="service-card">
      <div className="service-card__icon-wrapper">
        <Icon className="service-card__icon" />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__description">{description}</p>
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="service-card__button"
      >
        Learn More
      </a>
    </div>
  );
};

export default ServiceCard;