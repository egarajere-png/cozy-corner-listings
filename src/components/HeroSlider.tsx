import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    subtitle: "Traditional & Hygienic",
    title: "For the Love of\nThe Whole Family",
    description: "Come with family & feel the joy of Luxurious Living",
  },
  {
    image: hero2,
    subtitle: "Delightful Experience",
    title: "Structures Inspired by\nthe Seasons",
    description: "Modern architecture designed for contemporary lifestyles",
  },
  {
    image: hero3,
    subtitle: "Amazing & Precious",
    title: "Where Every Home\nTells a Story",
    description: "Discover your perfect sanctuary in the heart of Kenya",
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {/* Background Image with Ken Burns Effect */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.15 }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt=""
                    className="img-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="section-subtitle label-2"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="display-1 mt-6 whitespace-pre-line"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="body-2 text-muted-foreground mt-6 max-w-lg"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="mt-10"
                  >
                    <Link
                      to="/properties"
                      className="relative overflow-hidden border-2 border-primary text-primary px-8 py-4 text-xs uppercase tracking-widest font-bold inline-block group"
                    >
                      <span className="relative z-10 transition-colors group-hover:text-primary-foreground">
                        View Our Properties
                      </span>
                      <div className="absolute inset-0 bg-primary scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center border border-white/30 text-foreground hover:border-primary hover:text-primary transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center border border-white/30 text-foreground hover:border-primary hover:text-primary transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Book Site Visit Button */}
      <Link
        to="/contact"
        className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-20 w-24 h-24 lg:w-28 lg:h-28 bg-primary flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform rotating-border"
      >
        <Calendar className="w-8 h-8 text-primary-foreground mb-1" />
        <span className="text-primary-foreground text-[10px] lg:text-xs font-bold uppercase tracking-wider leading-tight">
          Book A Site Visit
        </span>
      </Link>
    </section>
  );
};
