import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { properties } from '../data/properties';
import { CheckIcon, MessageCircle } from 'lucide-react';

const PropertyDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { id } = useParams();
  
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="content-container">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Property not found</h2>
          <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const {
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
    preview,
    facilities,
    floorPlans,
    interior,
    completionDate,
  } = property;

  // 通用的图片容器类名
  const imageContainerClass = "relative overflow-hidden rounded-lg shadow-sm";
  const imageClass = "w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300";

  return (
    <div className="property-details-page">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/601133698121?text=I'm interested in ${name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 top-3/4 z-50 flex items-center bg-green-600 text-white rounded-full md:rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
        <div className="p-4 md:p-3">
          <MessageCircle className="w-8 h-8 md:w-6 md:h-6" />
        </div>
        <span className="hidden md:block pr-4">WhatsApp Enquiry</span>
      </a>

      {/* Top Info Section */}
      <div className="content-container py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">Developer</span>
            <div className="font-medium mt-1">{developer}</div>
          </div>
          <div>
            <span className="text-gray-600">Expected Completion</span>
            <div className="font-medium mt-1">{completionDate || 'TBA'}</div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="content-container">
        <div className={imageContainerClass}>
          <img 
            src={preview} 
            alt={name}
            className={imageClass}
          />
        </div>
      </div>

      {/* Property Info Section */}
      <div className="content-container py-6">
        {/* 基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-lg text-gray-600 mt-2">{location}</p>
            <div className="text-xl font-semibold text-primary mt-2">
              From RM {price.toLocaleString()}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <span className="text-gray-600 text-sm">Type</span>
            <div className="font-medium">{type}</div>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Size</span>
            <div className="font-medium">{size} sqft</div>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Bedrooms</span>
            <div className="font-medium">{bedrooms}</div>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Bathrooms</span>
            <div className="font-medium">{bathrooms}</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-gray-600 text-sm mb-2">Key Features</h3>
            <div className="space-y-1">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="content-container">
        <div className="border-b overflow-x-auto">
          <nav className="flex gap-6 min-w-max">
            {['overview', 'interior', 'floorplans'].map((tab) => (
              <button
                key={tab}
                className={`pb-3 px-1 ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((facility) => (
                <div key={facility.id}>
                  <div className={imageContainerClass}>
                    <img 
                      src={facility.image} 
                      alt={facility.name}
                      className={imageClass}
                    />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{facility.name}</h3>
                  <p className="text-gray-600 mt-2">{facility.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'interior' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interior.map((room) => (
                <div key={room.id}>
                  <div className={imageContainerClass}>
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className={imageClass}
                    />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{room.name}</h3>
                  <p className="text-gray-600 mt-2">{room.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'floorplans' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {floorPlans.map((plan) => (
                <div key={plan.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h3 className="font-medium">{plan.type}</h3>
                      <p className="text-sm text-gray-600">
                        {plan.bedrooms} Bedrooms • {plan.bathrooms} Bathrooms
                      </p>
                    </div>
                    <span className="text-primary font-medium mt-2 md:mt-0">{plan.size}</span>
                  </div>
                  <div className="p-4 bg-white">
                    <img 
                      src={plan.image} 
                      alt={plan.type}
                      className="w-full h-[300px] object-contain rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;