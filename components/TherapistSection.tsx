'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Plus } from 'lucide-react';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export default function TherapistSection() {
  const portraitRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 60%, #E0F7FA 100%)',
      }}
    >
      <ParallaxSection speed={0.4} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - text */}
            <motion.div {...fadeInLeft} className="space-y-6">
              <h2
                className="font-manrope font-bold text-[#103040]"
                style={{
                  fontSize: '22.7px',
                  lineHeight: '112%',
                  letterSpacing: '-0.03em',
                }}
              >
                Meet Your Therapist{' '}
                <span
                  className="font-manrope font-bold text-[#103040] block mt-1"
                  style={{
                    fontSize: '38.73px',
                    lineHeight: '112%',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Tebarak Al Shamsy
                </span>
              </h2>

              <p className="text-[#103040]/90 font-normal text-xl font-manrope">
                MS, LPC Founder, <br /> Amwaj Therapy Center
              </p>
          

              <div className="space-y-5 text-[#6E6E6E] leading-relaxed text-lg font-inter">
                <p>
                  I am a Colorado-based Licensed Professional Counselor providing trauma-informed, culturally attuned virtual therapy for adolescents, adults, and families.
                </p>
                <p>
                  I specialize in anxiety, depression, trauma, ADHD, identity exploration, life transitions, and relationship challenges—with extensive experience navigating complex personality patterns (borderline, narcissistic, avoidant, obsessive-compulsive).
                </p>
                <p>
                  My approach blends evidence-based therapy (CBT, DBT), attachment-based work, empathy, and cultural understanding—focusing on nervous system regulation, emotional resilience, and healthier relational patterns for steadiness and clarity.
                </p>
              </div>

            </motion.div>

            {/* Right column - portrait + badge + card */}
            <motion.div {...fadeInRight} className="relative flex justify-center lg:justify-end">
              <div className="relative w-full">
                {/* Circular portrait with scroll-linked parallax */}
                <div
                  ref={portraitRef}
                  className="relative aspect-square mx-auto lg:mx-0 lg:ml-auto rounded-full overflow-hidden shadow-xl p-4"
                >
                  {/* Outer light blue circle - soft halo */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#D0FAFF] rounded-full z-0"
                    aria-hidden
                  />
                  {/* Inner darker blue circle - offset for depth, peeks bottom-right */}
                  <div
                    className="absolute top-3 left-3 w-full h-full bg-[#69CFE0] rounded-full z-[5]"
                    aria-hidden
                  />
                  <motion.div
                    className="absolute inset-[2%] rounded-full overflow-hidden z-10"
                    style={{ y: imageY }}
                  >
                    <Image
                      src="/images/tebarak-al-shamsy.png"
                      alt="Tebarak Al Shamsy"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 80vw, 420px"
                    />
                  </motion.div>
                </div>

            

                {/* Satisfied Customers card */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="absolute bottom-9 right-8 lg:right-8 bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 w-[192px] z-20"
                >
                  <div className="font-bold text-2xl text-[#103040]">140K+</div>
                  <div className="text-sm text-gray-600 mb-3">Satisfied Customers</div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex-shrink-0"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                      aria-label="More customers"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
}
