import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const ImageSlideshow = ({ images, current, setCurrent }) => {
  const nextSlide = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  

  useEffect(()=>{
    const timer = setInterval(()=>{
      nextSlide();
    }, 5000);
    return ()=> clearInterval(timer);
  }, [current]);
  return (
    <div className="relative overflow-hidden rounded-lg shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-primary/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${current === idx ? 'bg-accent-orange w-6' : 'bg-green-soft hover:bg-accent-orange'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-primary/30 hover:bg-green-primary/50 
        text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-primary/30 hover:bg-green-primary/50 
        text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
};

export default ImageSlideshow;
