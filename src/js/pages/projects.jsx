import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import FilterSection from '../components/FilterSection';
import { properties, filterProperties } from '../data/properties';
import { Container, Section, Grid } from '../components/Layout';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    if (location.state) {
      const { listingType: newListingType, initialCategory } = location.state;
      if (newListingType) {
        setListingType(newListingType);
        setFilters(prev => ({ ...prev, priceRange: 'any' }));
      }
      if (initialCategory) {
        setPropertyCategory(initialCategory);
      }
    }
  }, [location.state]);

  const handlePropertyClick = (property) => {
    navigate(`/properties/${property.id}`);
  };

  const handleListingTypeChange = (type) => {
    setListingType(type);
    if (type === 'rent') {
      setPropertyCategory('');
    }
    setFilters(prev => ({ ...prev, priceRange: 'any' }));
  };

  const getSubtitleText = () => {
    if (listingType === 'rent') {
      return 'Browse through our selection of properties available for rent.';
    }
    return propertyCategory === 'new'
      ? 'Explore our latest new property developments.'
      : 'Discover our collection of subsale properties.';
  };

  const filteredProperties = filterProperties(properties, {
    listingType,
    propertyCategory,
    ...filters
  });

  return (
    <Section className="py-4 sm:py-6 md:py-10">
      <Container size="default" className="max-w-6xl">
        {/* Header Section - 调整移动端间距 */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Property Listings</h1>
          <p className="text-center text-gray-600 text-sm sm:text-base max-w-xl px-4 sm:px-0">{getSubtitleText()}</p>
        </div>

        {/* Filters Section - 优化移动端布局 */}
        <div className="mb-6 sm:mb-8">
          {/* Toggle Buttons - 调整按钮大小和间距 */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6">
            {/* Primary Toggle */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center">
              <button 
                className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition-colors
                  ${listingType === 'sale' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => handleListingTypeChange('sale')}
              >
                Buy Property
              </button>
              <button 
                className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition-colors
                  ${listingType === 'rent' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => handleListingTypeChange('rent')}
              >
                Rent Property
              </button>
            </div>

            {/* Secondary Toggle */}
            {listingType === 'sale' && (
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                <button 
                  className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-lg text-sm font-medium border transition-colors
                    ${propertyCategory === 'new'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  onClick={() => setPropertyCategory('new')}
                >
                  New Projects
                </button>
                <button 
                  className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-lg text-sm font-medium border transition-colors
                    ${propertyCategory === 'subsale'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  onClick={() => setPropertyCategory('subsale')}
                >
                  Subsale
                </button>
              </div>
            )}
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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

        {/* Properties Grid - 优化移动端卡片间距 */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => handlePropertyClick(property)}
                className="mx-auto w-full max-w-sm sm:max-w-none" // 控制移动端卡片宽度
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center px-4 sm:px-0">
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg max-w-lg w-full">
              <p className="text-gray-600 text-sm sm:text-base">
                No properties found matching your criteria. Please try adjusting your filters.
              </p>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default ProjectsPage;