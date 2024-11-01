import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { properties, filterProperties } from '../data/properties';

const ProjectsPage = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [listingType, setListingType] = useState('sale');
  const [propertyCategory, setPropertyCategory] = useState('new');
  const [filters, setFilters] = useState({
    priceRange: 'any',
    propertyType: 'any',
    location: 'any',
  });

  const filteredProperties = filterProperties(properties, {
    listingType,
    propertyCategory,
    ...filters
  });

  // Filter section component
  const FilterSection = ({ label, value, onChange, options }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-text mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border border-gray-light rounded-lg 
                 focus:ring-2 focus:ring-primary-light focus:border-transparent
                 bg-white text-text cursor-pointer hover:border-primary
                 transition-colors duration-200"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const priceRanges = listingType === 'rent' 
    ? [
        { value: 'any', label: 'Any Rental' },
        { value: 'below-1000', label: 'Below RM 1,000' },
        { value: '1000-2000', label: 'RM 1,000 - RM 2,000' },
        { value: '2000-3000', label: 'RM 2,000 - RM 3,000' },
        { value: '3000-5000', label: 'RM 3,000 - RM 5,000' },
        { value: 'above-5000', label: 'Above RM 5,000' },
      ]
    : [
        { value: 'any', label: 'Any Price' },
        { value: 'below-500k', label: 'Below RM 500,000' },
        { value: '500k-1m', label: 'RM 500,000 - RM 1,000,000' },
        { value: '1m-2m', label: 'RM 1,000,000 - RM 2,000,000' },
        { value: 'above-2m', label: 'Above RM 2,000,000' },
      ];

  const propertyTypes = [
    { value: 'any', label: 'All Types' },
    { value: 'condo', label: 'Condominium' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'terrace', label: 'Terrace House' },
    { value: 'semi-d', label: 'Semi-D' },
    { value: 'bungalow', label: 'Bungalow' },
  ];

  const locations = [
    { value: 'any', label: 'All Locations' },
    { value: 'kl', label: 'Kuala Lumpur' },
    { value: 'selangor', label: 'Selangor' },
    { value: 'penang', label: 'Penang' },
    { value: 'johor', label: 'Johor' },
  ];

  return (
    <div className="content-container"> 
      <div className="projects-page">
      {/* Header */}
      <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-text mb-4">Property Listings</h1>
      <p className="text-text-light max-w-2xl mx-auto">
        Find your perfect property in Malaysia. Browse through our curated selection 
          of properties for sale and rent.
        </p>
      </div>

      {/* Main Actions */}
      <div className="button-container">
        <div className="button-group">
          {/* Buy/Rent Toggle */}
          <div className="button-group__wrapper button-group__wrapper--spaced">
            <div className="button-group__toggle">
              <button 
                className={`button__action ${
                  listingType === 'sale' ? 'button__action--primary' : 'button__action--secondary'
                }`}
                onClick={() => setListingType('sale')}
              >
                Buy Property
              </button>
              <button 
                className={`button__action ${
                  listingType === 'rent' ? 'button__action--primary' : 'button__action--secondary'
                }`}
                onClick={() => setListingType('rent')}
              >
                Rent Property
              </button>
            </div>
          </div>

          {/* New/Subsale Toggle */}
          {listingType === 'sale' && (
            <div className="button-group__wrapper">
              <div className="button-group__toggle">
                <button 
                  className={`button__action button__action--secondary ${
                    propertyCategory === 'new' ? 'active' : ''
                  }`}
                  onClick={() => setPropertyCategory('new')}
                >
                  New Projects
                </button>
                <button 
                  className={`button__action button__action--secondary ${
                    propertyCategory === 'subsale' ? 'active' : ''
                  }`}
                  onClick={() => setPropertyCategory('subsale')}
                >
                  Subsale
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-light p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FilterSection
            label={listingType === 'rent' ? 'Monthly Rental' : 'Price Range'}
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
            options={priceRanges}
          />
          <FilterSection
            label="Property Type"
            value={filters.propertyType}
            onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
            options={propertyTypes}
          />
          <FilterSection
            label="Location"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            options={locations}
          />
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => setSelectedProperty(property)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-text-light">
              No properties found matching your criteria. Please try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
    </div>
  );
};

export default ProjectsPage;