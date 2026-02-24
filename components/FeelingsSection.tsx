'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';
import { useRef } from 'react';

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
  // Calculate when this word should start and finish animating
  // Each word animates over a portion of the scroll progress with slight overlap
  const wordStart = wordIndex / totalWords;
  const wordEnd = (wordIndex + 1) / totalWords;
  
  // Create a transform that maps scroll progress to this word's animation progress
  // When scrollProgress < wordStart, progress is 0 (initial color)
  // When scrollProgress > wordEnd, progress is 1 (final color)
  const wordProgress = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [0, 1]
  );
  
  // Transform progress to color (0 = #3BA7D6, 1 = #106387)
  // Clamp to ensure we stay within bounds
  const color = useTransform(wordProgress, (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    return interpolateColor('#3BA7D6', '#106387', clamped);
  });
  
  return (
    <motion.span style={{ color }} initial={{ color: '#3BA7D6' }}>
      {word}{isLast ? '' : ' '}
    </motion.span>
  );
}

export default function FeelingsSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "start 0.1"]
  });

  const feelings = [
    {
      image: '/images/feeling-1.png',
      title: "I can't stop overthinking. Everything feels like too much.",
    },
    {
      image: '/images/feeling-2.png',
      title: "Some days I can't get out of bed. Other days, my mind won't stop racing.",
    },
    {
      image: '/images/feeling-3.png',
      title: "I crave connecting with people, but I keep getting hurt or shutting down.",
    },
  ];

  // Split the text into words
  const text = "You don't have to wait to feel heard and valued. At Amwaj, we offer therapy that respects your feelings, identity, and story – while helping you feel stronger, more stable, and more in control over time.";
  const words = text.split(' ');

  return (
    <section className="py-24 relative overflow-hidden">
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

          <motion.div
            {...staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {feelings.map((feeling, index) => (
              <motion.div
                key={index}
                {...scaleIn}
                transition={{ delay: index * 0.2 }}
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
                  <div className='p-6'>

                  <p className="text-2xl font-semibold font-inter text-black leading-relaxed">
                    {feeling.title}
                  </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div
              className="rounded-2xl p-10 md:p-12"
              style={{
                background: 'linear-gradient(to top, #D1F1FF 0%, rgba(209, 241, 255, 0.6) 35%, rgba(209, 241, 255, 0.2) 65%, transparent 100%)',
              }}
            >
              <img src="/images/care.png" alt="Flower" className="w-16 h-22 mx-auto mb-4 object-contain" />
          
              <p
                ref={textRef}
                className="font-manrope font-extrabold text-center max-w-6xl mx-auto"
                style={{ fontSize: '43.87px', lineHeight: '59.6px', letterSpacing: '0px' }}
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
