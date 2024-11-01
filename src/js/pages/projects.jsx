// src/js/pages/projects.jsx
import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { properties, filterProperties } from '../data/properties';

const FilterSection = ({ label, value, onChange, options }) => (
  <div className="filter-section">
    <label className="filter-section__label">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="filter-section__select"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ProjectsPage = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [listingType, setListingType] = useState('sale');
  const [propertyCategory, setPropertyCategory] = useState('new');
  const [filters, setFilters] = useState({
    priceRange: 'any',
    propertyType: 'any',
    location: 'any',
  });

  // 价格范围选项
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

  // 房产类型选项
  const propertyTypes = [
    { value: 'any', label: 'All Types' },
    { value: 'condo', label: 'Condominium' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'terrace', label: 'Terrace House' },
    { value: 'semi-d', label: 'Semi-D' },
    { value: 'bungalow', label: 'Bungalow' },
  ];

  // 地区选项
  const locations = [
    { value: 'any', label: 'All Locations' },
    { value: 'kl', label: 'Kuala Lumpur' },
    { value: 'selangor', label: 'Selangor' },
    { value: 'penang', label: 'Penang' },
    { value: 'johor', label: 'Johor' },
  ];

  const filteredProperties = filterProperties(properties, {
    listingType,
    propertyCategory,
    ...filters
  });

  return (
    <div className="content-container">
      <div className="projects-page">
        <div className="projects-page__header">
          <h1 className="projects-page__title">Property Listings</h1>
          <p className="projects-page__subtitle">
            Find your perfect property in Malaysia. Browse through our curated selection 
            of properties for sale and rent.
          </p>
        </div>

        <div className="projects-page__filters">
      {/* 修改切换按钮部分 */}
      <div className="toggle-buttons">
        {/* Buy/Rent 切换 */}
        <div className="toggle-buttons__primary">
          <button 
            className={`toggle-button ${listingType === 'sale' ? 'toggle-button--active' : ''}`}
            onClick={() => setListingType('sale')}
          >
            Buy Property
          </button>
          <button 
            className={`toggle-button ${listingType === 'rent' ? 'toggle-button--active' : ''}`}
            onClick={() => setListingType('rent')}
          >
            Rent Property
          </button>
        </div>

        {/* New/Subsale 切换 */}
        {listingType === 'sale' && (
          <div className="toggle-buttons__secondary">
            <button 
              className={`toggle-button toggle-button--secondary ${
                propertyCategory === 'new' ? 'toggle-button--active' : ''
              }`}
              onClick={() => setPropertyCategory('new')}
            >
              New Projects
            </button>
            <button 
              className={`toggle-button toggle-button--secondary ${
                propertyCategory === 'subsale' ? 'toggle-button--active' : ''
              }`}
              onClick={() => setPropertyCategory('subsale')}
            >
              Subsale
            </button>
          </div>
        )}
      </div>

      {/* 保持原有的筛选部分 */}
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
    </div>

        <div className="projects-page__content">
          {filteredProperties.length > 0 ? (
            <div className="projects-page__grid">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          ) : (
            <div className="projects-page__empty">
              <p>No properties found matching your criteria. Please try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;