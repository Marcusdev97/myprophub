export const properties = [
    // New Projects
    {
      id: 1,
      name: "The Park Residences",
      developer: "EcoWorld Development Group",
      location: "Bangsar South, Kuala Lumpur",
      price: 850000,
      monthlyRent: null,
      type: "Condominium",
      category: "new",
      listingType: "sale",
      bedrooms: 3,
      bathrooms: 2,
      size: 1200,
      image: "/api/placeholder/800/600",
      description: "Luxury condominium in the heart of Bangsar South with premium facilities and contemporary design.",
      features: [
        "High ceiling",
        "Premium fittings",
        "Smart home system",
        "Private lift lobby",
      ],
      facilities: [
        "Swimming pool",
        "Gym",
        "Function hall",
        "24-hour security",
      ],
      completionDate: "Q4 2025",
    },
    {
      id: 2,
      name: "Verdant Villa Residences",
      developer: "Sime Darby Property",
      location: "Subang Jaya, Selangor",
      price: 1200000,
      monthlyRent: null,
      type: "Semi-D",
      category: "new",
      listingType: "sale",
      bedrooms: 4,
      bathrooms: 3,
      size: 2800,
      image: "/api/placeholder/800/600",
      description: "Modern semi-detached homes in a gated and guarded community.",
      features: [
        "Double volume ceiling",
        "Premium marble flooring",
        "Built-in wardrobes",
        "Designer kitchen",
      ],
      facilities: [
        "Clubhouse",
        "Children's playground",
        "Jogging track",
        "BBQ area",
      ],
      completionDate: "Q2 2024",
    },
  
    // Subsale Properties
    {
      id: 3,
      name: "Desa ParkCity Condo",
      developer: "Original: ParkCity",
      location: "Desa ParkCity, Kuala Lumpur",
      price: 980000,
      monthlyRent: null,
      type: "Condominium",
      category: "subsale",
      listingType: "sale",
      bedrooms: 3,
      bathrooms: 2,
      size: 1500,
      image: "/api/placeholder/800/600",
      description: "Well-maintained corner unit with panoramic lake view.",
      features: [
        "Fully furnished",
        "Renovated kitchen",
        "Built-in wardrobes",
        "Covered parking",
      ],
      facilities: [
        "Swimming pool",
        "Tennis court",
        "Mini market",
        "24-hour security",
      ],
      completionDate: "Completed",
    },
  
    // Rental Properties
    {
      id: 4,
      name: "Pavilion Residences",
      developer: "Original: Pavilion Group",
      location: "Bukit Bintang, Kuala Lumpur",
      price: null,
      monthlyRent: 4500,
      type: "Condominium",
      category: "subsale",
      listingType: "rent",
      bedrooms: 2,
      bathrooms: 2,
      size: 1100,
      image: "/api/placeholder/800/600",
      description: "Fully furnished luxury apartment in the heart of KL.",
      features: [
        "Fully furnished",
        "City view",
        "High floor",
        "Modern appliances",
      ],
      facilities: [
        "Infinity pool",
        "Sky gym",
        "Private lift",
        "Concierge service",
      ],
      completionDate: "Completed",
    },
    {
      id: 5,
      name: "Tropicana Gardens",
      developer: "Original: Tropicana",
      location: "Kota Damansara, Selangor",
      price: null,
      monthlyRent: 2800,
      type: "Condominium",
      category: "subsale",
      listingType: "rent",
      bedrooms: 3,
      bathrooms: 2,
      size: 950,
      image: "/api/placeholder/800/600",
      description: "Convenient location with direct mall access.",
      features: [
        "Partly furnished",
        "MRT connected",
        "Balcony",
        "New paint",
      ],
      facilities: [
        "Swimming pool",
        "Gym",
        "Multi-purpose hall",
        "Covered parking",
      ],
      completionDate: "Completed",
    },
  ];
  
  // Helper function to filter properties
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