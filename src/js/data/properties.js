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
    preview: "/assets/images/properties/M-Terra/previews/condo-preview.jpg", // 单张预览图片
    features: [
      "Strategic location",
      "Modern design",
      "Security system",
      "Quality finishes"
    ],
    facilities: [
      {
        id: "fac-1",
        name: "Swimming Pool",
        image: "/assets/images/properties/M-Terra/facilities/swimming-pool.jpg",
        description: "Luxury infinity pool for residents"
      },
      {
        id: "fac-2",
        name: "Gymnasium",
        image: "/assets/images/properties/M-Terra/facilities/gym.jpg",
        description: "Fully equipped modern gymnasium"
      },
      {
        id: "fac-3",
        name: "Playground",
        image: "/assets/images/properties/M-Terra/facilities/playground.jpg",
        description: "Children's playground area"
      },
      {
        id: "fac-4",
        name: "BBQ Area",
        image: "/assets/images/properties/M-Terra/facilities/bbq.jpg",
        description: "Outdoor BBQ and dining area"
      }
    ],
    floorPlans: [
      {
        id: "fp-1",
        type: "Type A",
        size: "775 sqft",
        bedrooms: 2,
        bathrooms: 2,
        image: "/assets/images/properties/M-Terra/floor-plans/type-a.jpg"
      },
      {
        id: "fp-2",
        type: "Type B",
        size: "850 sqft",
        bedrooms: 3,
        bathrooms: 2,
        image: "/assets/images/properties/M-Terra/floor-plans/type-b.jpg"
      },
      {
        id: "fp-3",
        type: "Type C",
        size: "1023 sqft",
        bedrooms: 3,
        bathrooms: 2,
        image: "/assets/images/properties/M-Terra/floor-plans/type-c.jpg"
      }
    ],
    gallery: [
      {
        id: "gal-1",
        category: "exterior",
        image: "/assets/images/properties/M-Terra/gallery/exterior-1.jpg",
        description: "Building Facade"
      },
      {
        id: "gal-2",
        category: "interior",
        image: "/assets/images/properties/M-Terra/gallery/interior-1.jpg",
        description: "Living Room Sample"
      },
      {
        id: "gal-3",
        category: "surroundings",
        image: "/assets/images/properties/M-Terra/gallery/surroundings-1.jpg",
        description: "Neighborhood View"
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

// Helper function to filter properties (保持不变)
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