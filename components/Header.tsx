'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import SimplePracticeAppointmentButton from '@/components/SimplePracticeAppointmentButton';
import SimplePracticeContactButton from '@/components/SimplePracticeContactButton';

const navLinks = [
  { href: '#how-we-help', label: 'How we help' },
  { href: '#services', label: 'Services' },
  { href: '#why-choose', label: 'Why Amwaj' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between h-16 px-6 sm:px-8 rounded-full bg-white shadow-[0_2px_20px_rgba(0,0,0,0.1)]"
          >
            {/* Logo */}
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

            {/* Desktop Nav */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex items-center gap-10"
            >
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-lg text-gray-700 hover:text-[#26C56D] transition-colors font-medium font-manrope"
                >
                  {label}
                </a>
              ))}
              <SimplePracticeContactButton className="text-lg text-gray-700 hover:text-[#26C56D] transition-colors font-medium font-manrope">
                Contact Us
              </SimplePracticeContactButton>
            </motion.nav>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex items-center gap-4"
            >
              <SimplePracticeAppointmentButton className="inline-flex items-center justify-center gap-2 bg-[#26C56D] hover:bg-[#22b561] text-white rounded-[18px] px-4 py-3 text-sm font-medium transition-colors">
                Book Consultation
              </SimplePracticeAppointmentButton>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-700 hover:text-[#26C56D] transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[84px] left-4 right-4 z-40 rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="text-lg text-gray-800 hover:text-[#26C56D] transition-colors font-medium font-manrope"
              >
                {label}
              </a>
            ))}
            <div onClick={closeMenu}>
              <SimplePracticeContactButton className="text-lg text-gray-800 hover:text-[#26C56D] transition-colors font-medium font-manrope">
                Contact Us
              </SimplePracticeContactButton>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <SimplePracticeAppointmentButton className="w-full inline-flex items-center justify-center gap-2 bg-[#26C56D] hover:bg-[#22b561] text-white rounded-[18px] px-4 py-3 text-sm font-medium transition-colors">
                Book Consultation
              </SimplePracticeAppointmentButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
