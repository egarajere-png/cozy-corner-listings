// import { land3 } from '@/assets/property3main.jpeg';
//Property1 images
import property1 from "@/assets/property1main.jpeg";
import property2 from "@/assets/property2main.jpeg";
import property3 from "@/assets/property3main.jpeg";
import property4 from "@/assets/property4main.jpeg";
import property5 from "@/assets/property5main.jpeg";
import property6 from "@/assets/property6main.jpeg";
import property7 from "@/assets/property7main.jpeg";
import property8 from "@/assets/property8main.jpeg";
import property9 from "@/assets/property9main.jpeg";
import property10 from "@/assets/property10main.jpeg";
import property11 from "@/assets/property11main.jpeg";
import property12 from "@/assets/property12main.jpeg";
import property13 from "@/assets/property13main.jpeg";
import property14 from "@/assets/property14main.jpeg";
import property15 from "@/assets/property15main.jpeg";
import property16 from "@/assets/property16main.jpeg";
import property17 from "@/assets/property17main.jpeg";
import property18 from "@/assets/property18main.jpeg";

//land2 images
import land1 from "@/assets/land1.jpeg";
import land2 from "@/assets/land2.jpeg";
import land3m from "@/assets/land3.jpeg";
import land4 from "@/assets/land4.jpeg";
import land5 from "@/assets/land5.jpeg";
import land6 from "@/assets/land6.jpeg";

// land3 Images
import landks1 from "@/assets/landi1.jpeg";
import landks2 from "@/assets/landi2.jpeg";
import landks3 from "@/assets/landi3.jpeg";
import landks4 from "@/assets/landi4.jpeg";
import landks5 from "@/assets/landi5.jpeg";

// wundanyi property images
import wundanyi1 from "@/assets/wundanyi1.jpeg";
import wundanyi2 from "@/assets/wundanyi2.jpeg";
import wundanyi3 from "@/assets/wundanyi3.jpeg";
import wundanyi4 from "@/assets/wundanyi4.jpeg";
import wundanyi5 from "@/assets/wundanyi5.jpeg";
// import wundanyi6 from "@/assets/wundanyi6.jpeg";
import wundanyi7 from "@/assets/wundanyi7.jpeg";
import wundanyi8 from "@/assets/wundanyi8.jpeg";
import wundanyi9 from "@/assets/wundanyi9.jpeg";
import wundanyi10 from "@/assets/wundanyi10.jpeg";
import wundanyi11 from "@/assets/wundanyi11.jpeg";
import wundanyi12 from "@/assets/wundanyi12.jpeg";
import wundanyi13 from "@/assets/wundanyi13.jpeg";
import wundanyi14 from "@/assets/wundanyi14.jpeg";
import wundanyi15 from "@/assets/wundanyi15.jpeg";
import wundanyi16 from "@/assets/wundanyi16.jpeg";
import wundanyi17 from "@/assets/wundanyi17.jpeg";
import wundanyi18 from "@/assets/wundanyi18.jpeg";
import wundanyi19 from "@/assets/wundanyi19.jpeg";
import wundanyi20 from "@/assets/wundanyi20.jpeg";
import wundanyi21 from "@/assets/wundanyi21.jpeg";
import wundanyi22 from "@/assets/wundanyi22.jpeg";
import wundanyi23 from "@/assets/wundanyi23.jpeg";
import wundanyi24 from "@/assets/wundanyi24.jpeg";
import wundanyi25 from "@/assets/wundanyi25.jpeg";
import wundanyi26 from "@/assets/wundanyi26.jpeg";
import wundanyi27 from "@/assets/wundanyi27.jpeg";
import wundanyi28 from "@/assets/wundanyi28.jpeg";
import wundanyi29 from "@/assets/wundanyi29.jpeg";
import wundanyi30 from "@/assets/wundanyi30.jpeg";

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

// Property 1: 6 Bedroom Mansionette
const mansionetteGallery = [property1, property2, property3, property4, property5, property6, property7, property8, property9, property10, property11, property12, property13, property14, property15, property16, property17, property18]; //prop];

const mansionetteOverview = [
  "Experience the pinnacle of luxury living in this magnificent 6-bedroom penthouse located in the exclusive Karen neighborhood. Spanning over 8,500 square feet, this exceptional residence offers breathtaking panoramic views of the Ngong Hills and surrounding lush greenery.",
  "This architectural masterpiece features soaring double-height ceilings, floor-to-ceiling windows, and premium Italian marble flooring throughout. The open-plan living and dining areas seamlessly flow onto an expansive wraparound terrace, perfect for entertaining guests while enjoying the stunning sunset views.",
];

const mansionetteFeatures = [
  "All bathrooms with Jacuzzis",
  "Master Bedroom withPrivate Bathroom",
  "Spacious Living and Dining areas",
  "En-Suite Servant Quaters",
  "Secure Compound with ample parking",
  "CCTV Camera All round",
];

const mansionetteAmenities: PropertyAmenity[] = [
  { icon: "Car", label: "4 Parking Spaces" },
  { icon: "Wifi", label: "Smart Home System" },
  { icon: "Shield", label: "24/7 Security" },
  { icon: "TreePine", label: "Private Garden" },
  { icon: "Building2", label: "Ensuite Servant Quaters" },
  { icon: "Utensils", label: "Fully Furnished Kitchen" },
  { icon: "Waves", label: "Jacuzzi available" },
  { icon: "Dumbbell", label: "Private Gym" },
];

//Property 2: Luxury 2-Bedroom Apartment
const apartmentGallery = [land1, land2, land3m, land4, land5, land6];

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

// land3 Info
const land3Gallery = [landks2, landks3, landks4, landks5, ];

const landOverview = [
"This prime 1/2 residential plot is located in the highly sought-after Kahawa Sukari area, just minutes from the Eastern Bypass. The plot is situated in a quiet, secure, and well-developed neighborhood strictly zoned for stand-alone homes only, ensuring privacy and low-density living.",
];

const landFeatures = [
  "Strictly stand-alone residential development",
  "Well-maintained all-weather access road",
  "Electricity and reliable water available",
  "Septic-tank friendly area",
  "Perimeter wall allowed",
  "Location & Connectivity",
  "Easy access to Eastern Bypass",
  "Close to Thika Road, Ruiru & Nairobi CBD",
  "Near reputable schools, shopping centres, hospitals & churches",
  "Double-glazed windows for noise reduction",
  "Dedicated home office space",
];

const landAmenities: PropertyAmenity[] = [
  
  { icon: "Car", label: "2 Parking Spaces" },
  { icon: "Wifi", label: "High-Speed Fiber" },
  { icon: "Shield", label: "24/7 Security" },
  { icon: "Building2", label: "Elevator Access" },
  { icon: "Utensils", label: "Modern Kitchen" },
  { icon: "Waves", label: "Shared Pool" },
  { icon: "Dumbbell", label: "Gym Access" },
  { icon: "TreePine", label: "Rooftop Garden" },
];

const wundanyiGallery = [wundanyi1, wundanyi2, wundanyi3, wundanyi4, wundanyi5, wundanyi7, wundanyi8, wundanyi9, wundanyi10, wundanyi11, wundanyi12, wundanyi13, wundanyi14, wundanyi15, wundanyi16, wundanyi17, wundanyi18, wundanyi19, wundanyi20, wundanyi21, wundanyi22, wundanyi23, wundanyi24, wundanyi25, wundanyi26, wundanyi27, wundanyi28, wundanyi29, wundanyi30]; //prop];

const wundanyiOverview = [
  "Beautiful home sitting on a 40 x 80 plot in the highly sought after Kahawa Sukari area. Located within a secure, well-developed gated community - perfect for comfortable family living.",
]
const wundanyiFeatures = [
  "All Essential amenities available",
  "Good access roads",
  "Secure gated Community",
  "Close to reputable schools and Churches",
  "Near main roads and shopping centers",
  "Easy access to Thika Superhaighway and Eastern Bypass",
];

const wundanyiAmenities: PropertyAmenity[] = [
  { icon: "Car", label: "4 Parking Spaces" },
  { icon: "Wifi", label: "Smart Home System" },
  { icon: "Shield", label: "24/7 Security" },
  { icon: "TreePine", label: "Private Garden" },
  { icon: "Building2", label: "Ensuite Servant Quaters" },
  { icon: "Utensils", label: "Fully Furnished Kitchen" },
  { icon: "Waves", label: "Jacuzzi available" },
  { icon: "Dumbbell", label: "Private Gym" },
];

export const propertiesData: PropertyDetail[] = [
  {
    id: "1",
    title: "6-Bedroom Mansionette",
    location: "Kahawa Sukari, Nairobi",
    price: "KES 54,000,000",
    bedrooms: 5,
    bathrooms: 6,
    area: "8,500 sq ft",
    image: property1,
    type: "Mansionette",
    featured: true,
    gallery: mansionetteGallery,
    overview: mansionetteOverview,
    features: mansionetteFeatures,
    amenities: mansionetteAmenities,
    locationDescription: "Located in the prestigious Kahawa Sukari neighborhood, this mansionette enjoys proximity to the Thika Superhighway, Thika Road Mall, and varioua schools such as Thika Road Academy. The area is renowned for its lush greenery, spacious plots, and serene environment, making it one of Nairobi's most desirable addresses.",
  },
  {
    id: "2",
    title: "Prime 100×100 Stand-Alone Residential Plot",
    location: "Kahawa Sukari, Nairobi",
    price: "KES 13,000,000",
    bedrooms: 0,
    bathrooms: 0,
    area: "100×100",
    image: land1,
    type: "Plot",
    featured: true,
    gallery: apartmentGallery,
    overview: [
      "This prime 1/2 residential plot is located in the highly sought-after Kahawa Sukari area, just minutes from the Eastern Bypass. The plot is situated in a quiet, secure, and well-developed neighborhood strictly zoned for stand-alone homes only, ensuring privacy and low-density living."
    ],
    features: [
      "Strictly stand-alone residential development",
      "Well-maintained all-weather access road",
      "Electricity and reliable water available",
      "Septic-tank friendly area",
      "Perimeter wall allowed",
      "Location & Connectivity",
      "Easy access to Eastern Bypass",
      "Close to Thika Road, Ruiru & Nairobi CBD",
      "Near reputable schools, shopping centres, hospitals & churches"
    ],
    amenities: [{ icon: "Info", label: "No amenities available for land plots" }],
    locationDescription: "Situated in the Kahawa Sukari area with quick access to the Eastern Bypass, nearby schools, shopping centres, hospitals and places of worship.",
  },
  {
    id: "3",
    title: "Prime 1/2 Residential Plot",
    location: "Kahawa Sukari, Nairobi",
    price: "KES 25,000,000",
    bedrooms: 0,
    bathrooms: 0,
    area: "100×100",
    image: landks2,
    type: "Plot",
    featured: false,
    gallery: land3Gallery,
    overview: [
      "This prime 1/2 residential plot is located in the highly sought-after Kahawa Sukari area, just minutes from the Eastern Bypass. The plot is situated in a quiet, secure, and well-developed neighborhood strictly zoned for stand-alone homes only, ensuring privacy and low-density living. This is Ideal For Families seeking a serene and secure residential environment, Buyers looking to build an executive private home or Long-term investors in a high-appreciation area" ,
    ],
    features: [
      "Strictly stand-alone residential development",
      "Well-maintained all-weather access road",
      "Electricity and reliable water available",
      "Septic-tank friendly area",
      "Perimeter wall allowed",
      "Location & Connectivity",
      "Easy access to Eastern Bypass",
      "Close to Thika Road, Ruiru & Nairobi CBD",
      "Near reputable schools, shopping centres, hospitals & churches"
    ],
    amenities: [{ icon: "Info", label: "No amenities available for land plots" }],
    locationDescription: "Located in Kahawa Sukari with easy connectivity to the Eastern Bypass and local amenities.",
  },

  {
    id: "4",
    title: "Prime 40 x 80 Manshionette Residential Home",
    location: "Kahawa Sukari, Nairobi",
    price: "KES 25,000,000",
    bedrooms: 6,
    bathrooms: 7,
    area: "40×80 sq ft",
    image: wundanyi1,
    type: "Mansionette",
    featured: true,
    gallery: wundanyiGallery,
    overview: wundanyiOverview,
    features: wundanyiFeatures,
    amenities: wundanyiAmenities,
    locationDescription: "Located in the prestigious Kahawa Sukari neighborhood, this mansionette enjoys proximity to the Thika Superhighway, Thika Road Mall, and varioua schools such as Thika Road Academy. The area is renowned for its lush greenery, spacious plots, and serene environment, making it one of Nairobi's most desirable addresses.",
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
