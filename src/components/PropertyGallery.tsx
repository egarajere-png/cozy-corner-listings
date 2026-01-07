import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h2 className="title-1 mb-6">Property Gallery</h2>
        
        {/* Main Image */}
        <div 
          className="relative aspect-[16/10] overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(selectedIndex)}
        >
          <img
            src={images[selectedIndex]}
            alt={`${title} - Image ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Expand className="w-10 h-10 text-white" />
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-primary text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-primary text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden transition-all ${
                index === selectedIndex
                  ? "ring-2 ring-primary"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[selectedIndex]}
              alt={`${title} - Image ${selectedIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
