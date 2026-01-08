import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ServicesSection } from "@/components/HomeSections";
import { TestimonialSection } from "@/components/Testimonial";
import { BookingForm } from "@/components/BookingForm";
import { Target, Eye, Heart, Users } from "lucide-react";

import hero2 from "@/assets/hero-2.jpg";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import collo from "@/assets/collins_image.jpeg"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide exceptional real estate services that exceed expectations, helping every client find their perfect property with integrity and expertise.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be Kenya's most trusted real estate partner, known for our commitment to quality, transparency, and client satisfaction.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, excellence, and client-first approach guide everything we do. We believe in building lasting relationships based on trust.",
  },
];

const team = [
  {
    name: "Collins Ndwiga",
    role: "Founder & CEO",
    image: collo,
  },
  {
    name: "Mary Wanjiku",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=400&fit=crop&crop=face",
  },
  {
    name: "John Kamau",
    role: "Senior Agent",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hero2})`,
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="headline-1 mt-4"
          >
            About Lakashe Homes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="body-2 text-muted-foreground mt-4 max-w-lg mx-auto"
          >
            Your trusted partner in finding the perfect home
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle label-2 lg:after:mx-0 text-left lg:text-left">
                Since 2010
              </p>
              <h2 className="headline-1 mt-4">Every House Tells a Story</h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Founded by James Lakashe in 2010, Lakashe Homes began with a simple
                vision: to help families find homes that truly resonate with their
                dreams and aspirations. What started as a small family business
                has grown into one of Nairobi's most trusted real estate companies.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Our founder's passion for real estate was sparked by his own family's
                journey to find the perfect home. Understanding the challenges and
                emotions involved in this process, he committed to creating a
                company that would guide others through this significant life
                decision with care, expertise, and integrity.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Today, we've helped over 500 families find their dream homes across
                Nairobi's most prestigious neighborhoods. Our team combines local
                market expertise with personalized service to ensure every client
                receives the attention they deserve.
              </p>
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

      {/* Mission, Vision, Values */}
      <section className="py-16 lg:py-24 bg-smoky-2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-subtitle label-2">What Drives Us</p>
            <h2 className="headline-1 mt-4">Our Core Principles</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 border border-white/10 hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-forum text-2xl mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-subtitle label-2">The People Behind</p>
            <h2 className="headline-1 mt-4">Meet Our Team</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Our dedicated team of professionals is committed to making your
              real estate journey smooth and successful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden hover-shine mb-6">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="img-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-forum text-xl group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Users className="w-4 h-4" />
              Join Our Team
            </Link>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <TestimonialSection />
      <BookingForm />
    </Layout>
  );
};

export default About;
