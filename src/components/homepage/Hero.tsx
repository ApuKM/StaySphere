'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import { Search, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { HeroSlide } from '@/utils/types/Homepage';


const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
    title: 'Find beachfront villas',
    subtitle: 'Discover cozy stays right next to the ocean waves.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=80',
    title: 'Explore mountain cabins',
    subtitle: 'Escape to the quiet woods and breathe the fresh mountain air.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1711426793036-cc10917d34a9',
    title: 'Discover modern penthouses',
    subtitle: 'Experience luxury living in the heart of the world’s top cities.',
  },
];

export default function Hero(): React.JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Auto-play Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev: number) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const scrollToNextSection = (): void => {
    window.scrollTo({
      top: window.innerHeight * 0.65, 
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full h-[65vh] bg-black overflow-hidden select-none">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-8 flex flex-col justify-between py-12">
        
        <div />

        {/* Dynamic Animated Text & CTA */}
        <div className="max-w-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-base md:text-lg text-slate-200/90 font-medium mb-6 max-w-xl">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-fit">
            <Button
              onClick={scrollToNextSection}
              className="bg-brand-primary text-white font-semibold text-sm px-6 py-5 rounded-full shadow-lg shadow-brand-primary/20 flex items-center gap-2 hover:bg-brand-primary/90 transition-all"
            >
              <Search size={16} strokeWidth={2.5} />
              Start Exploring
            </Button>
          </motion.div>
        </div>

        {/* Bottom Bar Controls */}
        <div className="flex justify-between items-center w-full text-white">
          
          {/* Slider Dots Indicator */}
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Animated Scroll Down Indicator */}
          <motion.button
            onClick={scrollToNextSection}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-200 hover:text-white transition-colors cursor-pointer bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            Explore Homes
            <ArrowDown size={14} className="text-brand-primary" />
          </motion.button>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}