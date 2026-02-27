'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, staggerContainer } from '@/utils/animations';

export default function InsuranceSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 65%, #DCF8FD 100%)' }}>

      <ParallaxSection speed={0.3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...staggerContainer}
            className="grid lg:grid-cols-[45%_55%] gap-12 items-center"
          >
            {/* Left Column - Text Content */}
            <motion.div
              {...fadeInUp}
              className="text-left"
            >
              <motion.h2
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                We Accept Insurance
              </motion.h2>

              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-gray-600"
              >
                At Amwaj, we work with most major insurance providers to make therapy accessible for everyone.
              </motion.p>
            </motion.div>

            {/* Right Column - Insurance Logos */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-6"
            >
              {/* Mobile: 2-col grid */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
                {[
                  { src: '/images/logos/anthem.png', alt: 'Anthem' },
                  { src: '/images/logos/united-healthcare.png', alt: 'United Healthcare' },
                  { src: '/images/logos/cigna.png', alt: 'Cigna' },
                  { src: '/images/logos/bluecross.png', alt: 'BlueCross BlueShield' },
                  { src: '/images/logos/aetna.png', alt: 'Aetna' },
                ].map(({ src, alt }) => (
                  <div key={alt} className="h-14 flex items-center justify-center">
                    <img
                      src={src}
                      alt={alt}
                      className="max-h-10 w-auto max-w-full object-contain brightness-0 opacity-60"
                    />
                  </div>
                ))}
              </div>

              {/* Desktop: original two rows */}
              <div className="hidden md:flex flex-col gap-6">
                {/* Row 1: Anthem, United Healthcare */}
                <div className="flex items-center gap-4 justify-end">
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.5 }}
                    className="relative h-14 w-[200px] flex items-center justify-center shrink-0"
                  >
                    <img
                      src="/images/logos/anthem.png"
                      alt="Anthem"
                      className="max-h-14 w-auto max-w-full object-contain brightness-0 opacity-60"
                    />
                  </motion.div>
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.6 }}
                    className="relative h-14 w-[200px] flex items-center justify-center shrink-0"
                  >
                    <img
                      src="/images/logos/united-healthcare.png"
                      alt="United Healthcare"
                      className="max-h-14 w-auto max-w-full object-contain brightness-0 opacity-60"
                    />
                  </motion.div>
                </div>

                {/* Row 2: Cigna, BlueCross BlueShield, Aetna */}
                <div className="flex items-center gap-2 justify-end">
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.7 }}
                    className="relative h-14 w-[200px] flex items-center justify-center shrink-0"
                  >
                    <img
                      src="/images/logos/cigna.png"
                      alt="Cigna"
                      className="max-h-14 w-auto max-w-full object-contain brightness-0 opacity-60"
                    />
                  </motion.div>
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.8 }}
                    className="relative h-14 w-[200px] flex items-center justify-center shrink-0"
                  >
                    <img
                      src="/images/logos/bluecross.png"
                      alt="BlueCross BlueShield"
                      className="max-h-14 w-auto max-w-full object-contain brightness-0 opacity-60"
                    />
                  </motion.div>
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.9 }}
                    className="relative h-14 w-[200px] flex items-center justify-center shrink-0"
                  >
                    <img
                      src="/images/logos/aetna.png"
                      alt="Aetna"
                      className="max-h-14 w-auto max-w-full object-contain brightness-0 opacity-60"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
      
        </div>
      </ParallaxSection>
    </section>
  );
}
