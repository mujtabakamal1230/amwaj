'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, scaleIn } from '@/utils/animations';
import { useRef, useState, useEffect } from 'react';

const cardShadow =
  '0 29.95px 12.39px 0 rgba(108, 113, 128, 0.01), 0 17.56px 10.33px 0 rgba(108, 113, 128, 0.04), 0 7.23px 7.23px 0 rgba(108, 113, 128, 0.07), 0 2.07px 4.13px 0 rgba(108, 113, 128, 0.08)';

// Helper function to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  // Convert hex to RGB
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

// Component for individual word with color animation
function TextRevealWord({
  word,
  scrollProgress,
  wordIndex,
  totalWords,
  isLast
}: {
  word: string;
  scrollProgress: MotionValue<number>;
  wordIndex: number;
  totalWords: number;
  isLast: boolean;
}) {
  // Compress reveal into first ~40% of scroll so more words highlight per scroll
  const revealSpan = 0.4;
  const wordStart = (wordIndex / totalWords) * revealSpan;
  const wordEnd = ((wordIndex + 1) / totalWords) * revealSpan;

  // Create a transform that maps scroll progress to this word's animation progress
  // When scrollProgress < wordStart, progress is 0 (initial color)
  // When scrollProgress > wordEnd, progress is 1 (final color)
  const wordProgress = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [0, 1]
  );

  // Transform progress to color (0 = #0B5778, 1 = #A1E2FF)
  // Clamp to ensure we stay within bounds
  const color = useTransform(wordProgress, (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    return interpolateColor('#A1E2FF', '#0B5778', clamped);
  });

  return (
    <motion.span style={{ color }} initial={{ color: '#A1E2FF' }}>
      {word}{isLast ? '' : ' '}
    </motion.span>
  );
}

const CAROUSEL_GAP = 32;

export default function FeelingsSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "start 0.15"]
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

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

  const feelings = [
    {
      tag: 'Growth',
      image: '/images/feelings/feeling-1.png',
      title: "“I react in ways I don’t understand. My past traumas keep showing up.”",
    },
    {
      tag: 'Workflow',
      image: '/images/feelings/feeling-2.png',
      title: "“I don’t know where I belong. I’ve always felt between things.”",
    },
    {
      image: '/images/feelings/feeling-3.png',
      title: "“I can’t stop overthinking. Everything feels like too much.”",
    },
    {
      tag: 'Operations',
      image: '/images/feelings/feeling-4.png',
      title: "“I don’t know what’s wrong. I just know I don’t feel okay.”",
    },
    {
      tag: 'Operations',
      image: '/images/feelings/feeling-5.png',
      title: "“I hate how much I care. I hate how much I push people away.”",
    },
    {
      image: '/images/feelings/feeling-6.png',
      title: "“Some days I can’t get out of bed. Other days, my mind won’t stop racing.”",
    },
    {
      image: '/images/feelings/feeling-7.png',
      title: "“I crave connecting with people, but I keep getting hurt or shutting down.”",
    },
  ];

  const itemCount = feelings.length;
  const extendedFeelings = [
    ...feelings,
    ...feelings,
    ...feelings.slice(0, itemsPerView),
  ];
  const maxIndex = Math.max(0, extendedFeelings.length - itemsPerView);
  const realMaxIndex = Math.max(0, itemCount - itemsPerView);
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

  const text = "You don't have to wait to feel heard and valued. At Amwaj, we offer therapy that respects your feelings, identity, and story – while helping you feel stronger, more stable, and more in control over time.";
  const words = text.split(' ');

  return (
    <section className="py-20 relative overflow-hidden">
      <ParallaxSection speed={0.4}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-manrope text-[#252525] mb-4">
              Your Feelings Deserve To Be Understood
            </h2>
          </motion.div>

          {/* Carousel */}
          <div
            className="relative"
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex"
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
                {extendedFeelings.map((feeling, index) => (
                  <motion.div
                    key={index}
                    style={{
                      width: cardWidth > 0
                        ? cardWidth
                        : `calc((100% - ${CAROUSEL_GAP * (itemsPerView - 1)}px) / ${itemsPerView})`,
                      flexShrink: 0,
                    }}
                    {...scaleIn}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative border-[4px] border-[#F8F8F8] rounded-2xl"
                  >
                    <div
                      className="bg-white rounded-2xl transition-all duration-300 h-full flex flex-col overflow-hidden"
                      style={{ boxShadow: cardShadow }}
                    >
                      <div className="relative w-full aspect-[4/3] bg-gray-50">

                        <Image
                          src={feeling.image}
                          alt=""
                          fill
                          className="object-contain object-center"
                        />
                        <div
                          className="absolute inset-x-0 -bottom-1 h-2/3 pointer-events-none"
                          style={{
                            background: 'linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.5) 55%, transparent 100%)',
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-2xl font-semibold font-inter text-black leading-relaxed">
                          {feeling.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Prev / Next buttons — only visible when there are pages to navigate */}
            {maxIndex > 0 && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0B5778] transition-opacity hover:bg-[#F0FAFF]"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0B5778] transition-opacity hover:bg-[#F0FAFF]"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Dot indicators */}
          {realMaxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: realMaxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex % (realMaxIndex + 1) ? 'w-6 bg-[#0B5778]' : 'w-2 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div
              className="rounded-2xl p-10 md:p-12"
              style={{
                background: 'linear-gradient(to top, #D1F1FF 0%, rgba(209, 241, 255, 0.6) 0%, transparent 60%)',
              }}
            >
              <img src="/images/care.png" alt="Flower" className="w-16 h-22 mx-auto mb-4 object-contain" />

              <p
                ref={textRef}
                className="text-2xl md:text-[44px]  md:leading-[59.6px] font-manrope font-extrabold text-center max-w-6xl mx-auto"
              >
                {words.map((word, index) => (
                  <TextRevealWord
                    key={index}
                    word={word}
                    scrollProgress={scrollYProgress}
                    wordIndex={index}
                    totalWords={words.length}
                    isLast={index === words.length - 1}
                  />
                ))}
              </p>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
}
