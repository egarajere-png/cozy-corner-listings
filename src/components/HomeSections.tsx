import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, FileCheck, Home, TrendingUp } from "lucide-react";

import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";

const services = [
  {
    icon: Eye,
    title: "Property Viewing & Tours",
    description:
      "We organize personalized property viewings that allow you to experience each space firsthand. Our agents guide you through every detail, helping you visualize your future home.",
  },
  {
    icon: FileCheck,
    title: "Consultation & Property Evaluation",
    description:
      "Our team provides professional consultation and accurate property evaluations based on current market trends. We help you determine the true value of your property.",
  },
  {
    icon: Home,
    title: "Property Sales & Management",
    description:
      "We handle the entire sales and management process — from listings and client matching to paperwork and legal support. Your property journey, made smooth.",
  },
  {
    icon: TrendingUp,
    title: "Real Estate Investment Guidance",
    description:
      "Looking to invest in real estate? We offer tailored investment strategies, guiding you toward high-return properties that align with your goals.",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <p className="section-subtitle label-2 lg:after:mx-0">Our Story</p>
            <h2 className="headline-1 mt-4">Every House Tells a Story</h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              From a father's vision to a trusted real estate partner — Lakashe
              Homes was founded on integrity, local knowledge, and a passion for
              helping people find the right place to call home. We believe that
              every property has a unique story, and we're here to help you
              write the next chapter.
            </p>
            <Link
              to="/about"
              className="inline-block mt-8 border-2 border-primary text-primary px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Discover About Us
            </Link>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 max-w-md mx-auto lg:max-w-none lg:ml-auto">
              <img
                src={about1}
                alt="Luxury interior"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute -bottom-8 -left-8 lg:-left-16 w-40 lg:w-56 border-8 border-background">
                <img
                  src={about2}
                  alt="Elegant bedroom"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const FeaturedSection = () => {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="h-64 lg:h-auto">
          <img
            src={about1}
            alt="Featured property"
            className="img-cover"
          />
        </div>

        {/* Content */}
        <div className="bg-smoky-2 py-16 lg:py-24 px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-subtitle label-2">Featured Properties</p>
            <h2 className="headline-1 mt-4">Welcome to View Our Properties</h2>
            <p className="text-muted-foreground mt-6 leading-relaxed max-w-lg mx-auto">
              Discover our exclusive collection of premium properties across
              Nairobi's most prestigious neighborhoods. From modern apartments
              to luxurious family estates, we have the perfect home for you.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="text-muted-foreground text-lg line-through">
                From KES 30,000,000
              </span>
              <span className="text-primary text-2xl font-forum">
                Starting KES 20,000,000
              </span>
            </div>
            <Link
              to="/properties"
              className="inline-block mt-8 border-2 border-primary text-primary px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              View All Properties
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const ServicesSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle label-2">Why Choose Us</p>
          <h2 className="headline-1 mt-4">Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-forum text-xl mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
