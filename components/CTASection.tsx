'use client';

import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, scaleIn } from '@/utils/animations';
import Image from 'next/image';
import SimplePracticeContactButton from '@/components/SimplePracticeContactButton';

export default function CTASection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">

      <ParallaxSection speed={0.2}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
      {...fadeInUp}
      transition={{ delay: 0.8 }}
      className="mt-16 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden bg-[linear-gradient(180deg,#93DDE9,#36ABBE)]"

    >
      <div className="grid md:grid-cols-[60%_1fr] gap-8 md:gap-12 items-center">
        {/* Left: Icon, heading, CTA */}
        <div className="flex flex-col gap-4 items-start text-center md:text-left order-2 md:order-1">
          <div className="inline-flex mb-6">
            <Image
              src="/images/cta-icon.png"
              alt=""
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h3 className="text-3xl md:text-6xl font-bold font-manrope text-white mb-2">
            You Matter To Us.<br /> 
            Reach Out Anytime.
          </h3>
          <SimplePracticeContactButton
            className="inline-block bg-[#26C56D] text-white px-8 py-4 rounded-[24px] font-semibold font-inter text-2xl hover:bg-[#2e9a4a] transition-colors shadow-lg hover:shadow-xl"
          >
            Contact Us
          </SimplePracticeContactButton>
        </div>

        {/* Right: Illustration */}
        <motion.div
          {...scaleIn}
          transition={{ delay: 0.3 }}
          className="relative order-1 md:order-2 flex justify-center md:justify-end"
        >
          <Image
            src="/images/choose.png"
            alt="Reach out anytime - we are here for you"
            width={480}
            height={320}
            className="object-contain w-full max-w-md"
          />
        </motion.div>
      </div>
    </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
}
