import React from 'react';
import { MapPin, Bed, Bath, Square, ChevronRight } from 'lucide-react';


const PropertyCard = ({ property, onClick }) => {
  const {
    preview,
    name,
    developer,
    location,
    price,
    monthlyRent,
    type,
    bedrooms,
    bathrooms,
    size,
  } = property;

  const locationDisplay = typeof location === 'object' ? location.description : location;

  const formatPrice = (value) => {
    return value.toLocaleString('en-MY', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  };

  return (
    <article className="property-card" onClick={onClick}>
      <div className="property-card__image-container">
        <img 
          src={preview} 
          alt={name}
          className="property-card__image"
        />
        <span className="property-card__tag">{type}</span>
      </div>

      <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__title">{name}</h3>
          <p className="property-card__developer">By {developer}</p>
          <div className="property-card__location">
            <MapPin size={18} />
            <span>{locationDisplay}</span>
          </div>
        </div>

        <div className="property-card__features">
          <div className="property-card__feature">
            <Bed size={18} />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="property-card__feature">
            <Bath size={18} />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="property-card__feature">
            <Square size={18} />
            <span>{size} sqft</span>
          </div>
        </div>

        <div className="property-card__footer">
          <div className="property-card__price">
            <span className="property-card__price-value">
              RM {monthlyRent ? formatPrice(monthlyRent) : formatPrice(price)}
            </span>
            {monthlyRent && <span className="property-card__price-period">/month</span>}
          </div>
          <button className="property-card__button">
            View Details
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;