'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';

const items = [
  {
    image: '/images/awaits-1.png',
    text: 'A private, confidential space',
    borderColor: '#9AFFB0',
  },
  {
    image: '/images/awaits-2.png',
    text: 'Sensitivity to identity, faith, and life transitions',
    borderColor: '#F3E3A2',
  },
  {
    image: '/images/awaits-3.png',
    text: 'Sessions available in English and Arabic',
    borderColor: '#87E4F4',
  },
  {
    image: '/images/awaits-4.png',
    text: 'A gentle pace, without pressure or labels',
    borderColor: '#A8B8F4',
  },
  {
    image: '/images/awaits-5.png',
    text: 'Trauma-informed therapy that respects family and cultural dynamics',
    borderColor: '#F9B2D4',
  },
  {
    image: '/images/awaits-6.png',
    text: 'Fully online therapy for comfort and privacy',
    borderColor: '#DCF89B',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <ParallaxSection speed={0.3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-manrope text-[#252525]">
              What Awaits You
            </h2>
            <p className="text-xl md:text-2xl text-[#5A5A5A] max-w-sm font-inter font-normal">
              A therapy experience built on trust, privacy, and respect
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {items.map((item, index) => {
              const col = index % 3;
              const isStaggerDown = col === 0 || col === 2;
              return (
              <div
                key={index}
                className={isStaggerDown ? 'lg:mt-16' : ''}
              >
                <motion.div
                  {...scaleIn}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 flex flex-col"
                  style={{ borderColor: item.borderColor }}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover rounded-t-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-center text-gray-700 font-medium px-6 py-5 text-base md:text-lg leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              </div>
            );
            })}
          </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
}
