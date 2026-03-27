'use client';

import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, scaleIn } from '@/utils/animations';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const CAROUSEL_GAP = 32;

type Testimonial = {
  text: string;
  author: string;
  role: string;
  image: string;
};

export default function WhyChooseSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  const testimonials: Testimonial[] = [
    {
      text: 'They are really kind and caring, and they know what they\'re doing. They made me feel safe and comfortable, which helped me open up easily. I felt supported the whole time.',
      author: 'Sarah M.',
      role: 'Individual Therapy Client',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'You can tell they really want to help. They take the time to understand what you\'re going through and work with you to find what actually helps you feel better.',
      author: 'Ahmed K.',
      role: 'Trauma Recovery',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'I achieved more progress with you in two sessions than I did in six months with my previous therapist.',
      author: 'Fatima R.',
      role: 'Family Therapy',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'I avoided therapy for years, but working with Tebarak helped me understand myself and build healthier patterns. Starting therapy was one of the best decisions I’ve made',
      author: 'Mary Herzog',
      role: 'Individual Therapy Client',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const itemCount = testimonials.length;
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials.slice(0, itemsPerView),
  ];
  const maxIndex = Math.max(0, extendedTestimonials.length - itemsPerView);
  const realMaxIndex = Math.max(0, itemCount - itemsPerView);

  useEffect(() => {
    const updateDimensions = () => {
      const perView = window.innerWidth >= 768 ? 3 : 1;
      setItemsPerView(perView);
      if (carouselRef.current) {
        const w = carouselRef.current.offsetWidth;
        setCardWidth((w - CAROUSEL_GAP * (perView - 1)) / perView);
      }
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  const [isPaused, setIsPaused] = useState(false);

  const prev = () => {
    if (currentIndex === 0) {
      setSkipTransition(true);
      setCurrentIndex(maxIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSkipTransition(false);
          setCurrentIndex(maxIndex - 1);
        });
      });
    } else {
      setCurrentIndex(i => i - 1);
    }
  };

  const next = () => {
    if (currentIndex >= maxIndex) {
      setSkipTransition(true);
      setCurrentIndex(0);
      requestAnimationFrame(() => setSkipTransition(false));
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const handleTransitionComplete = () => {
    if (currentIndexRef.current >= maxIndex) {
      setSkipTransition(true);
      setCurrentIndex(0);
      requestAnimationFrame(() => setSkipTransition(false));
    }
  };

  useEffect(() => {
    if (maxIndex === 0 || isPaused) return;
    const id = setInterval(() => {
      setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [maxIndex, isPaused]);

  return (
    <section id="why-choose" className="py-20 relative overflow-hidden">
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
            className="relative"
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="py-6 px-6 -mx-6 overflow-hidden">
              <motion.div
                className="flex items-stretch"
                animate={{ x: cardWidth > 0 ? -(currentIndex * (cardWidth + CAROUSEL_GAP)) : 0 }}
                transition={
                  skipTransition
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 30, onComplete: handleTransitionComplete }
                }
                drag={maxIndex > 0 ? 'x' : false}
                dragConstraints={{
                  left: -(maxIndex * (cardWidth + CAROUSEL_GAP)),
                  right: 0,
                }}
                dragElastic={0.1}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) next();
                  else if (info.offset.x > 50) prev();
                  setIsPaused(false);
                }}
                style={{ gap: CAROUSEL_GAP }}
              >
                {extendedTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    style={{
                      width: cardWidth > 0
                        ? cardWidth
                        : `calc((100% - ${CAROUSEL_GAP * (itemsPerView - 1)}px) / ${itemsPerView})`,
                      flexShrink: 0,
                    }}
                    {...scaleIn}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#26C56D]/30 relative group flex flex-col"
                  >
                    <Quote className="w-12 h-12 text-[#26C56D]/20 mb-4 group-hover:text-[#26C56D]/40 transition-colors shrink-0" />

                    <p className="text-gray-700 leading-relaxed text-lg flex-grow min-h-0">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="font-bold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#26C56D] to-emerald-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {maxIndex > 0 && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#26C56D] transition-opacity hover:bg-gray-50"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#26C56D] transition-opacity hover:bg-gray-50"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {realMaxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: realMaxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex % (realMaxIndex + 1) ? 'w-6 bg-[#26C56D]' : 'w-2 bg-gray-300'
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
