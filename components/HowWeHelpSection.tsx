'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, Heart, Leaf } from 'lucide-react';
import ParallaxSection from './ParallaxSection';
import { fadeInUp, fadeInLeft } from '@/utils/animations';
import { useRef } from 'react';

export default function HowWeHelpSection() {
  const steps = [
    {
      title: 'Connect',
      description: 'We start by listening. You share what\'s been weighing on you, at your own pace, without pressure or judgment.',
      icon: Phone,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      dotColor: 'bg-yellow-400'
    },
    {
      title: 'Explore',
      description: 'Together, we gently look at patterns, relationships, and experiences that may be affecting how you feel today.',
      icon: MessageCircle,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      dotColor: 'bg-blue-400'
    },
    {
      title: 'Heal',
      description: 'We work with your emotions and nervous system using trauma-informed, evidence-based approaches, helping you feel safer and more settled over time.',
      icon: Heart,
      color: 'bg-pink-100',
      textColor: 'text-pink-600',
      dotColor: 'bg-pink-400'
    },
    {
      title: 'Grow',
      description: 'As therapy continues, you gain clarity, stronger boundaries, and a more grounded way of responding to stress and uncertainty.',
      icon: Leaf,
      color: 'bg-lime-100',
      textColor: 'text-lime-700',
      dotColor: 'bg-lime-500'
    }
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="how-we-help" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: 'url(/images/help-bg.png)' }}
        aria-hidden
      />
      <ParallaxSection speed={0.3} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-manrope text-[#252525] mb-4">
              How We Help
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
              ref={imageRef}
              {...fadeInLeft}
              className="sticky top-32 bg-white rounded-3xl p-6 shadow-lg h-[90%]"
            >
              <div className="relative overflow-hidden rounded-2xl h-full">
                <motion.img
                  src="/images/how-we-help.png"
                  alt="Therapy Session"
                  className="w-full h-full object-cover block rounded-2xl"
                  style={{ y: imageY }}
                />
              </div>
            </motion.div>

            {/* <motion.div
              ref={imageRef}
              {...fadeInLeft}
              className="relative w-full max-w-[490px] h-[90%] min-h-0 rounded-3xl overflow-hidden sticky top-32 bg-white p-6"
            >
              <motion.img
                src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Therapy Session"
                className="w-full h-[140%]  object-cover rounded-2xl"
                style={{ y: imageY }}
              />
            </motion.div> */}

            <div ref={containerRef} className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6,
                      ease: [0.6, 0.05, 0.01, 0.9]
                    }}
                    className="relative flex gap-6"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          delay: index * 0.15 + 0.1,
                          duration: 0.5,
                          type: 'spring',
                          stiffness: 200
                        }}
                        className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-10 h-10 ${step.textColor}`} />
                      </motion.div>
                      {index < steps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                          transition={{
                            delay: index * 0.15 + 0.2,
                            duration: 0.4
                          }}
                          className="w-1 h-24 bg-gradient-to-b from-gray-300 to-gray-200 mt-4"
                          style={{ originY: 0 }}
                        />
                      )}
                    </div>

                    <div className="pt-2 pb-8 flex-1">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.15 + 0.05 }}
                        className={`text-2xl font-semibold font-outfit ${step.textColor} mb-2`}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.15 + 0.1 }}
                        className="text-black font-poppins leading-relaxed text-xl"
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
}
