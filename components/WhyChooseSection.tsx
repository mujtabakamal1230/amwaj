'use client';

import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';
import { Quote } from 'lucide-react';

export default function WhyChooseSection() {
  const testimonials = [
    {
      text: 'A calming experience full of clear advice and practical strategies I can apply in my daily life.',
      author: 'Sarah M.',
      role: 'Individual Therapy Client',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'I finally feel understood. The therapy has helped me process trauma I\'ve carried for years.',
      author: 'Ahmed K.',
      role: 'Trauma Recovery',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'Helped me reconnect with my family in ways I never thought possible. Truly life-changing.',
      author: 'Fatima R.',
      role: 'Family Therapy',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'A shame-free and judgment-free space where I could finally talk about what I\'ve been through.',
      author: 'Layla H.',
      role: 'Anxiety Management',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'The therapist genuinely cares. I feel supported and empowered every single session.',
      author: 'Omar A.',
      role: 'Depression Support',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      text: 'I\'ve tried many therapists, but this is the first time I truly felt heard and understood.',
      author: 'Mariam S.',
      role: 'Long-term Client',
      image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#26C56D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <ParallaxSection speed={0.4}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Amwaj
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to providing exceptional care that makes a real difference in your life
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                {...scaleIn}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#26C56D]/30 relative group"
              >
                <Quote className="w-12 h-12 text-[#26C56D]/20 mb-4 group-hover:text-[#26C56D]/40 transition-colors" />

                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#26C56D] to-emerald-500 flex items-center justify-center text-white font-bold overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#26C56D] to-emerald-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
}
