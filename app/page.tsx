'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InsuranceSection from '@/components/InsuranceSection';
import FeelingsSection from '@/components/FeelingsSection';
import HowWeHelpSection from '@/components/HowWeHelpSection';
import TherapistSection from '@/components/TherapistSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />
      <InsuranceSection />
      <FeelingsSection />
      <HowWeHelpSection />
      <TherapistSection />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <FinalCTASection />
      {/* <Footer /> */}
    </main>
  );
}
