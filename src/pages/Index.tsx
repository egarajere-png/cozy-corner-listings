import { Layout } from "@/components/layout";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutSection, FeaturedSection, ServicesSection } from "@/components/HomeSections";
import { FeaturedProperties } from "@/components/PropertyCard";
import { TestimonialSection } from "@/components/Testimonial";
import { BookingForm } from "@/components/BookingForm";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <AboutSection />
      <FeaturedSection />
      <ServicesSection />
      <FeaturedProperties />
      <TestimonialSection />
      <BookingForm />
    </Layout>
  );
};

export default Index;
