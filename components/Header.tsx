'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import SimplePracticeAppointmentButton from '@/components/SimplePracticeAppointmentButton';
import SimplePracticeContactButton from '@/components/SimplePracticeContactButton';

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between h-16 px-8 rounded-full bg-white shadow-[0_2px_20px_rgba(0,0,0,0.1)]"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/logo.png"
              alt="Amwaj Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-10"
          >
            <a href="#services" className="text-lg text-gray-700 hover:text-[#26C56D] transition-colors font-medium font-manrope">
            How we help
            </a>
            <a href="#about" className="text-lg text-gray-700 hover:text-[#26C56D] transition-colors font-medium font-manrope">
            Services
            </a>
            <a href="#faq" className="text-lg text-gray-700 hover:text-[#26C56D] transition-colors font-medium font-manrope">
            Why  amwaj
            </a>
            <SimplePracticeContactButton className="text-lg text-gray-700 hover:text-[#26C56D] transition-colors font-medium font-manrope">
            Contact us
            </SimplePracticeContactButton>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <SimplePracticeAppointmentButton className="inline-flex items-center justify-center gap-2 bg-[#26C56D] hover:bg-[#22b561] text-white rounded-[18px] px-4 py-3 text-sm font-medium transition-colors">
              Book Consultation
            </SimplePracticeAppointmentButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
