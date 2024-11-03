// src/js/data/properties.js
export const properties = [
  {
    id: 1,
    name: "M Terra",
    developer: "Mah Sing Group Berhad",
    location: "Puchong, Selangor",
    tagline: "Affordable luxury in Puchong",
    price: 384000,
    monthlyRent: null,
    type: "Service Residence",
    category: "new",
    listingType: "sale",
    projectStage: "New launch",
    tenure: "Leasehold",
    bedrooms: "2-3",
    bathrooms: "2",
    size: "775-1023",
    monthlyRepayment: 1649,
    description: "M Terra in Puchong offers affordable luxury living with modern amenities and excellent connectivity.",
    preview: "/src/assets/images/properties/M-Terra/previews/condo-preview.jpg",
    features: [
      "Strategic location",
      "Modern design",
      "Security system",
      "Quality finishes"
    ],
    facilities: [
      {
        id: "fac-1",
        name: "Overview",
        image: "/src/assets/images/properties/M-Terra/facilities/overview.jpg",
        description: "Property Overview"
      },
      {
        id: "fac-2",
        name: "Swimming Pool",
        image: "/src/assets/images/properties/M-Terra/facilities/swimming-pool.jpg",
        description: "Luxury swimming pool for residents"
      }
    ],
    floorPlans: [
      {
        id: "fp-2",
        type: "Type B",
        size: "850 sqft",
        bedrooms: 3,
        bathrooms: 2,
        image: "/src/assets/images/properties/M-Terra/floor-plans/type-b.png"
      },
      {
        id: "fp-3",
        type: "Type C",
        size: "1023 sqft",
        bedrooms: 3,
        bathrooms: 2,
        image: "/src/assets/images/properties/M-Terra/floor-plans/type-c.png"
      }
    ],
    interior: [
      {
        id: "int-1",
        name: "Bathroom",
        image: "/src/assets/images/properties/M-Terra/interior/bathroom.png",
        description: "Modern bathroom design"
      },
      {
        id: "int-2",
        name: "Kitchen",
        image: "/src/assets/images/properties/M-Terra/interior/kitchen.png",
        description: "Spacious kitchen layout"
      },
      {
        id: "int-3",
        name: "Living Room",
        image: "/src/assets/images/properties/M-Terra/interior/livingroom.png",
        description: "Contemporary living space"
      },
      {
        id: "int-4",
        name: "Master Room",
        image: "/src/assets/images/properties/M-Terra/interior/masterroom.png",
        description: "Comfortable master bedroom"
      },
      {
        id: "int-5",
        name: "Second Room",
        image: "/src/assets/images/properties/M-Terra/interior/secondroom.png",
        description: "Cozy second bedroom"
      }
    ],
    additionalInfo: {
      totalUnits: 999,
      listingId: "39715937",
      propertyType: "Service Residence For Sale",
      completionYear: "N/A"
    }
  }
];

// 保持筛选函数不变
export const filterProperties = (properties, filters) => {
  const { listingType, propertyCategory, priceRange, propertyType, location } = filters;

  return properties.filter(property => {
    // Basic listing type and category filter
    if (listingType === 'sale' && property.listingType !== 'sale') return false;
    if (listingType === 'rent' && property.listingType !== 'rent') return false;
    if (listingType === 'sale' && propertyCategory && property.category !== propertyCategory) return false;

    // Property type filter
    if (propertyType !== 'any' && property.type.toLowerCase() !== propertyType) return false;

    // Location filter
    if (location !== 'any' && !property.location.toLowerCase().includes(location.toLowerCase())) return false;

    // Price range filter
    if (priceRange !== 'any') {
      if (listingType === 'sale') {
        switch (priceRange) {
          case 'below-500k': return property.price < 500000;
          case '500k-1m': return property.price >= 500000 && property.price <= 1000000;
          case '1m-2m': return property.price > 1000000 && property.price <= 2000000;
          case 'above-2m': return property.price > 2000000;
          default: return true;
        }
      } else {
        switch (priceRange) {
          case 'below-1000': return property.monthlyRent < 1000;
          case '1000-2000': return property.monthlyRent >= 1000 && property.monthlyRent <= 2000;
          case '2000-3000': return property.monthlyRent > 2000 && property.monthlyRent <= 3000;
          case '3000-5000': return property.monthlyRent > 3000 && property.monthlyRent <= 5000;
          case 'above-5000': return property.monthlyRent > 5000;
          default: return true;
        }
      }
    }

    return true;
  });
};