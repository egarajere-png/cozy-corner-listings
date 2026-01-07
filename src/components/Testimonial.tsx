import { motion } from "framer-motion";
import testimonialBg from "@/assets/testimonial-bg.jpg";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I wanted to thank you for helping us find our dream home. The service was extraordinary and the attention to detail was impeccable.",
    name: "Sarah Johnson",
    role: "Homeowner, Karen",
  },
];

export const TestimonialSection = () => {
  const testimonial = testimonials[0];

  return (
    <section
      className="relative py-20 lg:py-32 text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${testimonialBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Quote Mark */}
          <div className="text-primary text-8xl lg:text-9xl font-forum leading-none mb-4">
            "
          </div>

          {/* Quote */}
          <p className="headline-2 leading-relaxed">
            {testimonial.quote}
          </p>

          {/* Separators */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="separator" />
            <div className="separator" />
            <div className="separator" />
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                alt={testimonial.name}
                className="img-cover"
              />
            </div>
            <p className="text-sm uppercase tracking-widest font-bold text-primary">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-sm">
              {testimonial.role}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
