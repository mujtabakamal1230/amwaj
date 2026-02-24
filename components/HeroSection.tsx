'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { fadeInUp, fadeInLeft } from '@/utils/animations';
import SimplePracticeAppointmentButton from './SimplePracticeAppointmentButton';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002134] to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-7xl">
          <motion.div
            {...fadeInUp}
            className="mb-6 flex items-center gap-2"
          >
            <div className='bg-[#01FF39] rounded-full w-4 h-4' />
            <span className="text-white text-lg font-semibold font-manrope ">
             Online Therapy & Mental Health Support

            </span>
          </motion.div>

          <motion.h1
            {...fadeInLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-manrope"
          >
            You&apos;ve Been<br />
            Carrying A Lot.
          </motion.h1>

          <motion.p
            {...fadeInLeft}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-inter max-w-3xl"
          >
            At Amwaj, we understand that life can feel overwhelming. Whether you're dealing with stress, anxiety, or just need someone to talk to, we offer therapy that respects your feelings, identity, and story.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <SimplePracticeAppointmentButton
              className="bg-[#26C56D] hover:bg-[#22b561] text-white font-inter font-semibold text-lg px-8 py-3 group rounded-[18px]"
            >
              Book a Free Consultation
            </SimplePracticeAppointmentButton>
           
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white/80 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
