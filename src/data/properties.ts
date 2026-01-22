import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface PropertyAmenity {
  icon: string;
  label: string;
}

export interface PropertyDetail {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  type: string;
  featured?: boolean;
  // Detailed info for property detail page
  gallery: string[];
  overview: string[];
  features: string[];
  amenities: PropertyAmenity[];
  locationDescription: string;
}

// Property 1: 6 Bedroom Penthouse
const penthouseGallery = [property1, property2, property3, property4, property5, property6];

const penthouseOverview = [
  "Experience the pinnacle of luxury living in this magnificent 6-bedroom penthouse located in the exclusive Karen neighborhood. Spanning over 8,500 square feet, this exceptional residence offers breathtaking panoramic views of the Ngong Hills and surrounding lush greenery.",
  "This architectural masterpiece features soaring double-height ceilings, floor-to-ceiling windows, and premium Italian marble flooring throughout. The open-plan living and dining areas seamlessly flow onto an expansive wraparound terrace, perfect for entertaining guests while enjoying the stunning sunset views.",
];

const penthouseFeatures = [
  "Double-height ceilings in living areas",
  "Private rooftop terrace with infinity pool",
  "Smart home automation system",
  "Italian marble flooring throughout",
  "Gourmet chef's kitchen with Miele appliances",
  "Master suite with walk-in closet and spa bathroom",
  "Private elevator access",
  "Wine cellar and tasting room",
  "Home cinema with Dolby Atmos",
  "Staff quarters with separate entrance",
];

const penthouseAmenities: PropertyAmenity[] = [
  { icon: "Car", label: "4 Parking Spaces" },
  { icon: "Wifi", label: "Smart Home System" },
  { icon: "Shield", label: "24/7 Security" },
  { icon: "TreePine", label: "Private Garden" },
  { icon: "Building2", label: "Private Elevator" },
  { icon: "Utensils", label: "Chef's Kitchen" },
  { icon: "Waves", label: "Infinity Pool" },
  { icon: "Dumbbell", label: "Private Gym" },
];

// Property 2: Luxury 2-Bedroom Apartment
const apartmentGallery = [property2, property3, property4, property5, property6, property1];

const apartmentOverview = [
  "Discover urban sophistication in this beautifully designed 2-bedroom luxury apartment in the heart of Westlands. This contemporary residence combines modern elegance with practical living, offering the perfect sanctuary for young professionals or couples seeking a premium lifestyle.",
  "The apartment features an intelligent open-plan layout that maximizes natural light and creates a seamless flow between living spaces. High-quality finishes, including hardwood flooring and designer fixtures, create an atmosphere of refined comfort.",
];

const apartmentFeatures = [
  "Open-plan living and dining area",
  "Modern kitchen with granite countertops",
  "Master bedroom with en-suite bathroom",
  "Built-in wardrobes in all bedrooms",
  "Private balcony with city views",
  "Underfloor heating system",
  "Double-glazed windows for noise reduction",
  "Dedicated home office space",
];

const apartmentAmenities: PropertyAmenity[] = [
  { icon: "Car", label: "2 Parking Spaces" },
  { icon: "Wifi", label: "High-Speed Fiber" },
  { icon: "Shield", label: "24/7 Security" },
  { icon: "Building2", label: "Elevator Access" },
  { icon: "Utensils", label: "Modern Kitchen" },
  { icon: "Waves", label: "Shared Pool" },
  { icon: "Dumbbell", label: "Gym Access" },
  { icon: "TreePine", label: "Rooftop Garden" },
];

export const propertiesData: PropertyDetail[] = [
  {
    id: "1",
    title: "6-Bedroom Penthouse",
    location: "Karen, Nairobi",
    price: "KES 150,000,000",
    bedrooms: 6,
    bathrooms: 7,
    area: "8,500 sq ft",
    image: property1,
    type: "Penthouse",
    featured: true,
    gallery: penthouseGallery,
    overview: penthouseOverview,
    features: penthouseFeatures,
    amenities: penthouseAmenities,
    locationDescription: "Located in the prestigious Karen neighborhood, this penthouse enjoys proximity to the Karen Country Club, Village Market, and top international schools including the International School of Kenya. The area is renowned for its lush greenery, spacious plots, and serene environment, making it one of Nairobi's most desirable addresses.",
  },
  {
    id: "2",
    title: "Luxury 2-Bedroom Apartment",
    location: "Westlands, Nairobi",
    price: "KES 28,000,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,500 sq ft",
    image: property2,
    type: "Apartment",
    featured: true,
    gallery: apartmentGallery,
    overview: apartmentOverview,
    features: apartmentFeatures,
    amenities: apartmentAmenities,
    locationDescription: "Situated in the vibrant Westlands area, this apartment offers unparalleled convenience with walking distance to Sarit Centre, Westgate Mall, and numerous restaurants and entertainment venues. The neighborhood is well-connected to major transport routes and is home to many embassies and international organizations.",
  },
];

// Helper function to get property by ID
export const getPropertyById = (id: string): PropertyDetail | undefined => {
  return propertiesData.find((p) => p.id === id);
};

// Helper function to get featured properties
export const getFeaturedProperties = (): PropertyDetail[] => {
  return propertiesData.filter((p) => p.featured);
};

// Helper function to get related properties (same type, excluding current)
export const getRelatedProperties = (id: string, type: string, limit = 3): PropertyDetail[] => {
  return propertiesData
    .filter((p) => p.type === type && p.id !== id)
    .slice(0, limit);
};
