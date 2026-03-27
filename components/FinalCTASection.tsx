'use client';

import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/utils/animations';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import SimplePracticeAppointmentButton from '@/components/SimplePracticeAppointmentButton';
import Image from 'next/image';

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        {...fadeInUp}
        className="relative overflow-hidden h-[530px] flex flex-col pt-16 px-4 md:px-0"
        style={{
          backgroundImage: 'url(/images/footer-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          boxShadow: '0 10.8px 16.21px 0 rgba(0, 0, 0, 0.16)',
        }}
      >
        <div className="flex flex-col items-start gap-12 justify-between max-w-7xl mx-auto w-full h-full">

          <div className="flex-1 grid md:grid-cols-2 gap-8">
            {/* Left: heading + CTA (blue area) */}
            <div className="flex flex-col text-left gap-8">
              <motion.h2
                {...fadeInUp}
                className="text-2xl md:text-[56px] font-semibold font-manrope text-white leading-tight"
              >
                You Don&apos;t Have To<br />
                Carry This Alone
              </motion.h2>
              <motion.div {...scaleIn} transition={{ delay: 0.2 }}>
                <SimplePracticeAppointmentButton
                  className="inline-block bg-[#26C56D] hover:bg-[#2e9a4a] text-white text-lg font-semibold px-8 py-4 rounded-[24px] transition-colors shadow-lg"
                >
                  Book Consultation
                </SimplePracticeAppointmentButton>
              </motion.div>
            </div>

            {/* Right: silhouette lives in bg image / yellow area */}
            <div className="hidden md:block" aria-hidden />
          </div>

          {/* Social icons + copyright */}
          <div className="pb-8 md:pb-4">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-start gap-4 mb-6"
            >
              <a
                href="https://www.instagram.com/amwajtherapycenter?igsh=MWFidWZ2dzNsY2N3bA%3D%3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Image src="/images/icons/instagram.png" alt="Instagram" width={28} height={28} />
              </a>
              <a
                href="https://www.facebook.com/share/1AtbLbr52W/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="Facebook"
              >
                <Image src="/images/icons/facebook.png" alt="Facebook" width={30} height={30} />
              </a>
              <a
                href="https://www.tiktok.com/@amwajtherapy?_r=1&_t=ZP-94xjuKGQ2Wd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="Tiktok"
              >
                <Image src="/images/icons/tiktok.png" alt="Tiktok" width={30} height={30} />
              </a>
            </motion.div>
            <p className="text-center text-black font-manrope font-medium text-lg">
              © Amwaj 2024. All rights reserved
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
