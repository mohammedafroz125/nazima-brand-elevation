import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

interface Slide {
  image: string;
  category: string;
  title: string;
  subtitle: string;
  link: string;
}

const slides: Slide[] = [
  {
    image: heroSlide1,
    category: "Luxury Abayas",
    title: "Grace in Every Layer",
    subtitle: "Flowing silhouettes crafted in champagne and ivory",
    link: "/shop?category=abayas",
  },
  {
    image: heroSlide2,
    category: "Jilbab & Makhna",
    title: "Modest by Nature",
    subtitle: "Timeless jilbab sets in earth tones for everyday elegance",
    link: "/shop?category=jilbab",
  },
  {
    image: heroSlide3,
    category: "Prayer Wear & Khimar",
    title: "Serenity in Simplicity",
    subtitle: "Pure and peaceful prayer wear for sacred moments",
    link: "/shop?category=khimar",
  },
  {
    image: heroSlide4,
    category: "Everyday Modest",
    title: "Effortless Beauty",
    subtitle: "Soft pastels and feminine cuts for daily wear",
    link: "/shop?category=dresses",
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
    <section className="relative h-[200vh] md:h-[180vh] lg:h-[200vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/60 via-brand-charcoal/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="max-w-2xl text-brand-ivory"
              >
                <span className="inline-block text-xs md:text-sm tracking-[0.35em] uppercase text-brand-champagne mb-4 md:mb-6 font-body">
                  {slides[currentSlide].category}
                </span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 leading-[1.05] font-medium">
                  {slides[currentSlide].title}
                </h1>
                <p className="font-body text-lg md:text-xl text-brand-ivory/80 mb-8 md:mb-10 max-w-lg leading-relaxed">
                  {slides[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={slides[currentSlide].link}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-brand-ivory text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:bg-brand-champagne"
                  >
                    Shop This Collection
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/lookbook"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-brand-ivory/40 text-brand-ivory font-body font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:bg-brand-ivory/10 hover:border-brand-ivory/70"
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
        <span className="text-xs tracking-[0.2em] uppercase font-body">Scroll</span>
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
