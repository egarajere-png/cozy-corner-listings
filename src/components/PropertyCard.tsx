import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface Property {
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
}

export const properties: Property[] = [
  {
    id: "1",
    title: "3-Bedroom Maisonette",
    location: "Karen, Nairobi",
    price: "KES 45,000,000",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,800 sq ft",
    image: property1,
    type: "Maisonette",
    featured: true,
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
  },
  {
    id: "3",
    title: "4-Bedroom Family Home",
    location: "Runda Estate, Nairobi",
    price: "KES 85,000,000",
    bedrooms: 4,
    bathrooms: 4,
    area: "4,200 sq ft",
    image: property3,
    type: "Villa",
    featured: true,
  },
  {
    id: "4",
    title: "Modern 3-Bedroom Townhouse",
    location: "Kilimani, Nairobi",
    price: "KES 35,000,000",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,200 sq ft",
    image: property4,
    type: "Townhouse",
  },
  {
    id: "5",
    title: "Luxury Penthouse Suite",
    location: "Upper Hill, Nairobi",
    price: "KES 120,000,000",
    bedrooms: 4,
    bathrooms: 5,
    area: "5,500 sq ft",
    image: property5,
    type: "Penthouse",
  },
  {
    id: "6",
    title: "Exclusive Villa Estate",
    location: "Muthaiga, Nairobi",
    price: "KES 150,000,000",
    bedrooms: 5,
    bathrooms: 6,
    area: "6,800 sq ft",
    image: property6,
    type: "Villa",
  },
];

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative overflow-hidden hover-shine">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="img-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Price Tag */}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider">
            {property.price}
          </div>

          {/* Property Type */}
          <div className="absolute top-4 right-4 bg-smoky-1/80 backdrop-blur-sm text-foreground px-3 py-1 text-xs uppercase tracking-wider border border-white/10">
            {property.type}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-primary text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              {property.location}
            </p>
            <h3 className="font-forum text-xl lg:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
              {property.title}
            </h3>

            {/* Features */}
            <div className="flex items-center gap-4 text-muted-foreground text-sm border-t border-white/10 pt-4">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-primary" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-primary" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4 text-primary" />
                <span>{property.area}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const PropertyGrid = ({ limit }: { limit?: number }) => {
  const displayProperties = limit ? properties.slice(0, limit) : properties;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayProperties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  );
};

export const FeaturedProperties = () => {
  const featured = properties.filter((p) => p.featured);

  return (
    <section className="py-16 lg:py-24 bg-smoky-2">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle label-2">Recent Updates</p>
          <h2 className="headline-1 mt-4">Properties Offered</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
