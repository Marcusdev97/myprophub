import React from 'react';

const PropertyCard = ({ property, onClick }) => {
  const {
    preview, // 改用 preview 而不是 image
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

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
    >
      {/* Property Image */}
      <div className="relative h-48">
        <img 
          src={preview || '/src/assets/images/properties/M-Terra/previews/condo-preview.jpg'} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {type}
        </div>
      </div>

      {/* Property Information */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text mb-2">{name}</h3>
        <p className="text-gray text-sm mb-2">By {developer}</p>
        <p className="text-gray-600 flex items-center text-sm mb-3">
          <span className="mr-1">📍</span> {location}
        </p>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <span className="mr-1">🛏️</span> {bedrooms} Beds
          </div>
          <div className="flex items-center">
            <span className="mr-1">🚿</span> {bathrooms} Baths
          </div>
          <div className="flex items-center">
            <span className="mr-1">📏</span> {size} sqft
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-primary font-bold">
            {monthlyRent 
              ? `RM ${monthlyRent.toLocaleString()}/month`
              : `RM ${price.toLocaleString()}`
            }
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;