import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { PropertyGrid } from "@/components/PropertyCard";
import { TestimonialSection } from "@/components/Testimonial";
import { BookingForm } from "@/components/BookingForm";

import hero1 from "@/assets/hero-1.jpg";

const Properties = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hero1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-4 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle label-2"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="headline-1 mt-4"
          >
            Explore Our Properties
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="body-2 text-muted-foreground mt-4 max-w-lg mx-auto"
          >
            Discover the finest real estate offerings in Nairobi's most prestigious neighborhoods
          </motion.p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 lg:py-24 bg-smoky-2">
        <div className="container mx-auto px-4">
          <PropertyGrid />
        </div>
      </section>

      <TestimonialSection />
      <BookingForm />
    </Layout>
  );
};

export default Properties;
