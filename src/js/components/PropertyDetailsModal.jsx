import React from 'react';

const PropertyDetailsModal = ({ property, onClose }) => {
  if (!property) return null;

  const {
    image,
    name,
    developer,
    location,
    price,
    type,
    bedrooms,
    bathrooms,
    size,
    description,
    features,
    completionDate,
    facilities,
  } = property;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Images */}
          <div className="mb-6">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Developer:</strong> {developer}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>Price:</strong> From RM {price.toLocaleString()}</p>
                <p><strong>Size:</strong> {size} sqft</p>
                <p><strong>Bedrooms:</strong> {bedrooms}</p>
                <p><strong>Bathrooms:</strong> {bathrooms}</p>
                <p><strong>Expected Completion:</strong> {completionDate}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">✓</span> {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Facilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">•</span> {facility}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-4 mt-6">
            <a
              href={`https://wa.me/601133698121?text=I'm interested in ${name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg text-center hover:bg-green-700 transition-colors"
            >
              WhatsApp Enquiry
            </a>
            <button
              onClick={() => window.location.href = '/pages/contact.html'}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;