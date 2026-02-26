'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { scaleIn, staggerContainer } from '@/utils/animations';

const services = [
  {
    title: 'Individual Therapy',
    description:
      "For adults who feel overwhelmed, emotionally exhausted, or stuck in the same patterns, we offer one-on-one therapy at the pace you're comfortable with. Sessions focus on understanding your feelings and building healthier ways to respond to stress.",
    image: '/images/services-1.png',
    gradient:
      'linear-gradient(to top left, rgba(255, 242, 224, 0.5) 0%, #FFFFFF 100%)',
  },
  {
    title: 'Adolescent Therapy',
    description:
      'For adolescents and teens navigating school pressure, identity, or emotional challenges. We provide a supportive space to build coping skills, confidence, and healthier family communication.',
    image: '/images/services-2.png',
    gradient:
      'linear-gradient(to bottom left, rgba(236, 140, 255, 0.2) 0%, #FFFFFF 100%)',
  },
  {
    title: 'Family Therapy',
    description:
      'For families who need help with communication or conflict. We provide support during stressful periods or times of change when your family members may feel overwhelmed. Our sessions focus on driving clearer conversations and stronger trust.',
    image: '/images/services-3.png',
    gradient:
      'linear-gradient(to bottom right, rgba(203, 255, 140, 0.2) 0%, #FFFFFF 100%)',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
    >
      <ParallaxSection speed={0.3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-manrope text-[#252525] mb-4">
              Our Services
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                {...scaleIn}
                transition={{ delay: index * 0.2 }}
                className="rounded-3xl overflow-hidden p-8 flex flex-col"
                style={{ background: service.gradient }}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-xl md:text-[28px] font-bold font-manrope text-[#252525] text-center mb-4">
                  {service.title}
                </h3>
                <p className="text-[#636363] leading-relaxed font-inter text-sm flex-1 text-center">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
}
