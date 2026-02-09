import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

interface Slide {
  image: string;
  tagline: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: heroSlide1,
    tagline: "New Collection 2026",
    title: "Timeless Elegance",
    subtitle: "Premium abayas crafted with love and tradition",
  },
  {
    image: heroSlide2,
    tagline: "Modest Luxury",
    title: "Grace & Modesty",
    subtitle: "Exquisite modest dresses for every occasion",
  },
  {
    image: heroSlide3,
    tagline: "Signature Collection",
    title: "Refined Beauty",
    subtitle: "Where tradition meets contemporary elegance",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative h-[180vh] md:h-[150vh] lg:h-[180vh] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-top"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/60 via-brand-charcoal/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-2xl text-brand-ivory"
              >
                <span className="inline-block text-xs md:text-sm tracking-[0.3em] uppercase text-brand-champagne mb-4 md:mb-6">
                  {slides[currentSlide].tagline}
                </span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 leading-[1.1]">
                  {slides[currentSlide].title}
                </h1>
                <p className="font-body text-lg md:text-xl text-brand-ivory/80 mb-8 md:mb-10 max-w-lg">
                  {slides[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-brand-ivory text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:bg-brand-champagne"
                  >
                    Shop Collection
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/lookbook"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-brand-ivory/50 text-brand-ivory font-body font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:bg-brand-ivory/10"
                  >
                    View Lookbook
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-brand-ivory/30 text-brand-ivory transition-all duration-300 hover:bg-brand-ivory/10 hover:border-brand-ivory/60"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-brand-ivory/30 text-brand-ivory transition-all duration-300 hover:bg-brand-ivory/10 hover:border-brand-ivory/60"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 md:w-16 h-1 transition-all duration-500 ${
              index === currentSlide
                ? "bg-brand-ivory"
                : "bg-brand-ivory/30 hover:bg-brand-ivory/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-ivory/60"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-brand-ivory/40"
        />
      </motion.div>
    </section>
  );
};

export default HeroSlider;
