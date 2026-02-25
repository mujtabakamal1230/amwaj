'use client';

import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/utils/animations';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import SimplePracticeAppointmentButton from '@/components/SimplePracticeAppointmentButton';
import Image from 'next/image';

export default function FinalCTASection() {
  return (
    <section className="relative py-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="relative rounded-[24px] overflow-hidden min-h-[420px] flex flex-col"
          style={{
            backgroundImage: 'url(/images/footer-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 10.8px 16.21px 0 rgba(0, 0, 0, 0.16)',
          }}
        >
          <div className="flex-1 grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
            {/* Left: heading + CTA (blue area) */}
            <div className="flex flex-col justify-center text-left gap-8">
              <motion.h2
                {...fadeInUp}
                className="text-3xl md:text-5xl lg:text-6xl font-semibold font-manrope text-white mb-6 leading-tight"
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
          <div className="px-8 md:px-12 lg:px-16 pb-8 md:pb-4">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-6"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Image src="/images/icons/instagram.png" alt="Instagram" width={32} height={32} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="X (Twitter)"
              >
                <Image src="/images/icons/x.png" alt="Twitter" width={32} height={32} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="LinkedIn"
              >
                <Image src="/images/icons/linkedin.png" alt="LinkedIn" width={32} height={32} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:opacity-90 transition-opacity"
                aria-label="YouTube"
              >
                <Image src="/images/icons/youtube.png" alt="YouTube" width={32} height={32} />
              </a>
            </motion.div>
            <p className="text-center text-black font-manrope font-medium text-lg">
              © Amwaj 2026. All rights reserved
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
