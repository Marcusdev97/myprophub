// src/js/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ title, icon: Icon, description, onClick }) => {
 return (
   <div className="service-card">
     <div className="service-card__icon-wrapper">
       <Icon className="service-card__icon" />
     </div>
     <h3 className="service-card__title">{title}</h3>
     <p className="service-card__description">{description}</p>
     <button 
       onClick={onClick}
       className="service-card__button"
     >
       Learn More
     </button>
   </div>
 );
};

export default ServiceCard;