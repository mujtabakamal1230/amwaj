'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { fadeInUp } from '@/utils/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const CARD_BG_COLORS = ['#EEFDFF', '#FAFFEE', '#EEFFF1'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function WhyChooseSection() {
  const testimonials = [
    { text: 'They are really kind and caring, and they know what they\'re doing. They made me feel safe and comfortable, which helped me open up easily. I felt supported the whole time.' },
    { text: 'You can tell they really want to help. They take the time to understand what you\'re going through and work with you to find what actually helps you feel better.' },
    { text: 'I achieved more progress with you in two sessions than I did in six months with my previous therapist.' },
  ];

  const slides: { text: string }[][] = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    slides.push(testimonials.slice(i, i + 3));
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const maxIndex = slides.length - 1;

  const prev = () => {
    if (currentIndex === 0) return;
    setDirection(-1);
    setCurrentIndex(i => i - 1);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
  };

  useEffect(() => {
    if (maxIndex === 0 || isPaused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
    }, 400000);
    return () => clearInterval(id);
  }, [maxIndex, isPaused]);

  return (
    <section id="why-choose" className="py-24 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#26C56D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <ParallaxSection speed={0.4}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Amwaj
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to providing exceptional care that makes a real difference in your life
            </p>
          </motion.div>

          <div
            className="relative "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {slides[currentIndex].map((testimonial, cardIndex) => (
                  <div
                    key={cardIndex}
                    className={`rounded-2xl p-10${cardIndex === 2 ? ' md:col-span-2' : ''}`}
                    style={{ backgroundColor: CARD_BG_COLORS[cardIndex % 3] }}
                  >
                    <div className={`${cardIndex === 2 ? 'flex flex-col justify-start max-w-4xl mx-auto' : ''}`}>
                      <span
                        className="block text-[#3B82F6] leading-none select-none"
                        style={{ fontSize: '7.5rem', fontFamily: 'Georgia, serif', lineHeight: 1 }}
                      >
                        &ldquo;
                      </span>
                      <p className={`text-[#6D6D6D] leading-relaxed text-2xl font-medium font-manrope`}>
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {maxIndex > 0 && (
              <>
                <button
                  onClick={prev}
                  disabled={currentIndex === 0}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#26C56D] disabled:opacity-30 transition-opacity hover:bg-gray-50"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  disabled={currentIndex === maxIndex}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#26C56D] disabled:opacity-30 transition-opacity hover:bg-gray-50"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-6 bg-[#26C56D]' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </ParallaxSection>
    </section>
  );
}
