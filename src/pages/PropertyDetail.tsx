import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Bed, Bath, Square, MapPin, Calendar, Phone, Mail, 
  ChevronRight, Check, Car, Wifi, Shield, TreePine,
  Building2, Utensils, Waves, Dumbbell, ArrowLeft
} from "lucide-react";
import { Layout } from "@/components/layout";
import { properties, PropertyCard } from "@/components/PropertyCard";
import { BookingForm } from "@/components/BookingForm";
import { PropertyGallery } from "@/components/PropertyGallery";
import { MortgageCalculator } from "@/components/MortgageCalculator";

// Sample gallery images for properties
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const propertyGalleryImages = [
  property1, property2, property3, property4, property5, property6
];

// Property amenities
const amenities = [
  { icon: Car, label: "Parking Space" },
  { icon: Wifi, label: "High-Speed Internet" },
  { icon: Shield, label: "24/7 Security" },
  { icon: TreePine, label: "Garden" },
  { icon: Building2, label: "Elevator Access" },
  { icon: Utensils, label: "Modern Kitchen" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Dumbbell, label: "Gym Access" },
];

// Property features
const features = [
  "Spacious living areas with natural lighting",
  "Premium fixtures and finishes",
  "Master bedroom with en-suite bathroom",
  "Built-in wardrobes in all bedrooms",
  "Fully fitted kitchen with modern appliances",
  "Private balcony/terrace",
  "Dedicated service quarters",
  "Landscaped outdoor spaces",
];

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="headline-1">Property Not Found</h1>
            <p className="text-muted-foreground mt-4">
              The property you're looking for doesn't exist.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 mt-8 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Get related properties (same type, excluding current)
  const relatedProperties = properties
    .filter((p) => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-end"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(${property.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 pb-12 lg:pb-20 pt-32">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/properties" className="hover:text-primary transition-colors">
              Properties
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{property.title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-4">
              {property.type}
            </span>
            <h1 className="headline-1">{property.title}</h1>
            <p className="flex items-center gap-2 text-primary mt-4 text-lg">
              <MapPin className="w-5 h-5" />
              {property.location}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-primary" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-primary" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-5 h-5 text-primary" />
              <span>{property.area}</span>
            </div>
            <div className="ml-auto">
              <span className="text-3xl lg:text-4xl font-forum text-primary">
                {property.price}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Property Gallery */}
              <PropertyGallery images={propertyGalleryImages} title={property.title} />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="title-1 mb-6">Property Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to this stunning {property.title.toLowerCase()} located in the prestigious 
                  {property.location}. This exceptional property offers the perfect blend of luxury, 
                  comfort, and modern design. Set in one of Nairobi's most sought-after neighborhoods, 
                  this home provides an unparalleled living experience for discerning buyers.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The property features {property.bedrooms} spacious bedrooms and {property.bathrooms} modern 
                  bathrooms, spread across {property.area} of meticulously designed living space. 
                  Every detail has been carefully considered to ensure maximum comfort and style, 
                  from the premium fixtures to the thoughtful layout that maximizes natural light 
                  and ventilation.
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="title-1 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="title-1 mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity.label}
                      className="flex flex-col items-center text-center p-4 border border-white/10 hover:border-primary/50 transition-colors"
                    >
                      <amenity.icon className="w-8 h-8 text-primary mb-3" />
                      <span className="text-sm text-muted-foreground">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="title-1 mb-6">Location</h2>
                <p className="text-muted-foreground mb-6">
                  Situated in {property.location}, this property enjoys excellent proximity to 
                  top schools, shopping centers, restaurants, and medical facilities. The neighborhood 
                  is known for its security, serenity, and beautiful surroundings, making it ideal 
                  for families and professionals alike.
                </p>
                <div className="aspect-video bg-eerie-2 border border-white/10 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p>Interactive map coming soon</p>
                    <p className="text-sm">{property.location}, Kenya</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-smoky-2 p-6 lg:p-8 sticky top-32"
              >
                <div className="text-center mb-6">
                  <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                    Asking Price
                  </p>
                  <p className="text-3xl font-forum text-primary">
                    {property.price}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <Link
                    to="/contact"
                    className="w-full bg-primary text-primary-foreground px-6 py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule a Viewing
                  </Link>
                  <a
                    href="tel:+254123456789"
                    className="w-full border border-primary text-primary px-6 py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </a>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider">
                    Contact Agent
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                        alt="Agent"
                        className="img-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">John Kamau</p>
                      <p className="text-muted-foreground text-sm">Senior Agent</p>
                    </div>
                  </div>
                  <a
                    href="mailto:john@lakashehomes.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    john@lakashehomes.com
                  </a>
                  <a
                    href="tel:+254123456789"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    +254 123 456 789
                  </a>
                </div>
              </motion.div>

              {/* Mortgage Calculator */}
              <MortgageCalculator propertyPrice={property.price} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="py-16 lg:py-24 bg-smoky-2">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="section-subtitle label-2">You May Also Like</p>
              <h2 className="headline-1 mt-4">Similar Properties</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((prop, index) => (
                <PropertyCard key={prop.id} property={prop} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingForm />
    </Layout>
  );
};

export default PropertyDetail;
