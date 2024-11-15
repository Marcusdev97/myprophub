// src/js/components/PropertyDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';
import { Container, Section } from '../components/Layout';
import { MessageCircle, X, ArrowLeft } from 'lucide-react';

// ImageModal Component
const ImageModal = ({ image, alt, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-7xl mx-auto p-4 w-full">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={image}
          alt={alt}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          onClick={e => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

const PropertyDetails = () => {
  const navigate = useNavigate(); // 添加导航hook
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  
  const property = properties.find(p => p.id === parseInt(id));

  const handleGoBack = () => {
    navigate(-1);
  }

  if (!property) {
    return (
      <Section>
        <Container size="default">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Property not found</h2>
            <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
          </div>
        </Container>
      </Section>
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

  const imageContainerClass = "relative overflow-hidden rounded-lg shadow-sm";
  const imageClass = "w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300";

  const handleImageClick = (image, alt) => {
    setSelectedImage({ image, alt });
  };

  return (
    <div className="property-details-page">
      {/* Fixed Enquiry Button */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <a 
          href={`https://wa.me/601133698121?text=I'm interested in ${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-600 text-white shadow-xl rounded-xl 
                   hover:bg-green-500 hover:scale-105 hover:shadow-2xl 
                   transform transition-all duration-300 group"
        >
          {/* 大图标 */}
          <div className="p-4 md:p-5">
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
          </div>
          {/* 默认显示文字 */}
          <div className="pr-5 pl-1 hidden md:block">
            <div className="text-lg font-semibold whitespace-nowrap">
              Enquire Now
            </div>
            <div className="text-sm text-white/90">
              Via WhatsApp
            </div>
          </div>
        </a>

        {/* 移动端提示文字 */}
        <div className="absolute right-0 top-full mt-2 text-center w-full">
          <span className="text-xs bg-white/90 text-gray-600 px-2 py-1 rounded-full shadow-sm md:hidden">
            Enquire
          </span>
        </div>
      </div>

      {/* 添加返回按钮 */}
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={handleGoBack}
          className="back-button group mt-6 mb-2"
        >
          <ArrowLeft className="back-button__icon" />
          <span>Back to Listings</span>
        </button>
      </div>


      {selectedImage && (
        <ImageModal
          image={selectedImage.image}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Hero Section with Full Width Image */}
      <div className="w-full h-[50vh] relative overflow-hidden">
        <img 
          src={preview} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Main Content */}
      <Section className="py-8 md:py-12">
        <Container size="default" className="max-w-6xl">
          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{name}</h1>
              <p className="text-xl text-gray-600 mb-4">
                {typeof location === 'string' ? location : location.description}
              </p>
              <div className="text-2xl font-semibold text-primary mb-6">
                From RM {price.toLocaleString()}
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600">{description}</p>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-gray-50 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">Property Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Developer</span>
                  <span className="font-medium">{developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-medium">{completionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium">{size} sqft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-medium">{bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-medium">{bathrooms}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b mb-8">
            <nav className="flex gap-8 overflow-x-auto">
              {['overview', 'interior', 'floorplans', 'location'].map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 px-1 font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {facilities.map((facility) => (
                  <div key={facility.id} className="space-y-4">
                    <div 
                      className={imageContainerClass + " cursor-pointer"}
                      onClick={() => handleImageClick(facility.image, facility.name)}
                    >
                      <img 
                        src={facility.image} 
                        alt={facility.name}
                        className={imageClass}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{facility.name}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'interior' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {interior.map((room) => (
                  <div key={room.id} className="space-y-4">
                    <div 
                      className={imageContainerClass + " cursor-pointer"}
                      onClick={() => handleImageClick(room.image, room.name)}
                    >
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className={imageClass}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{room.name}</h3>
                    <p className="text-gray-600">{room.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'floorplans' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {floorPlans.map((plan) => (
                  <div key={plan.id} className="bg-white rounded-xl overflow-hidden border">
                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{plan.type}</h3>
                        <p className="text-sm text-gray-600">
                          {plan.bedrooms} Bedrooms • {plan.bathrooms} Bathrooms
                        </p>
                      </div>
                      <span className="text-primary font-medium">{plan.size}</span>
                    </div>
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => handleImageClick(plan.image, plan.type)}
                    >
                      <img 
                        src={plan.image} 
                        alt={plan.type}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'location' && location && typeof location === 'object' && (
              <div>
                <div 
                  className={imageContainerClass + " cursor-pointer"}
                  onClick={() => handleImageClick(location.image, "Property Location")}
                >
                  <img 
                    src={location.image} 
                    alt="Property Location"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Bottom spacing for fixed button */}
      <div className="h-24" aria-hidden="true"></div>
    </div>
  );
};

export default PropertyDetails;