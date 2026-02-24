'use client';

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you take insurance or accept self-pay?',
      answer: 'Yes, we accept most major insurance providers including Anthem, Aetna, Blue Cross Blue Shield, Cigna, and more. We also offer affordable self-pay options and sliding scale fees based on your financial situation.'
    },
    {
      question: 'What do you cover during?',
      answer: 'We cover a wide range of mental health concerns including anxiety, depression, trauma, relationship issues, stress management, and personal growth. Each session is tailored to your specific needs and goals.'
    },
    {
      question: 'How much does therapy cost?',
      answer: 'The cost varies depending on your insurance coverage. For self-pay clients, sessions typically range from $100-$200. We offer sliding scale fees to ensure therapy is accessible to everyone who needs it.'
    },
    {
      question: 'Do you do virtual sessions?',
      answer: 'Yes! We offer secure, HIPAA-compliant virtual sessions via video call. This allows you to attend therapy from the comfort of your own home while maintaining the same level of care and confidentiality.'
    },
    {
      question: 'Is therapy confidential?',
      answer: 'Absolutely. Your privacy is our top priority. All sessions are completely confidential and protected by law. Information is only shared with your explicit consent or in rare cases required by law for safety reasons.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">

      <ParallaxSection speed={0.3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[24px] overflow-hidden bg-[linear-gradient(to_bottom_right,white_40%,#6EBEE2_160%)] py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-manrope text-[#252525] mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#26C56D]/30 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openIndex === index
                      ? 'bg-[#26C56D] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed mt-3">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
}
