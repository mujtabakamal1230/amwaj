import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Manrope, Outfit, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://amwajtherapy.org'),
  title: {
    default: 'Amwaj Therapy Center | Professional Therapy & Mental Health Support',
    template: '%s | Amwaj Therapy Center',
  },
  description:
    'Meet Tebarak Al Shamsy, MS, LPC, Founder of Amwaj Therapy Center. Professional therapy services focused on mental wellness, emotional growth, and compassionate care.',
  keywords: [
    'therapy',
    'therapist',
    'mental health',
    'counseling',
    'psychotherapy',
    'Amwaj Therapy Center',
    'Tebarak Al Shamsy',
    'LPC',
    'Dubai therapist',
    'mental wellness',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amwajtherapy.org',
    siteName: 'Amwaj Therapy Center',
    title: 'Amwaj Therapy Center | Professional Therapy & Mental Health Support',
    description:
      'Meet Tebarak Al Shamsy, MS, LPC, Founder of Amwaj Therapy Center. Compassionate therapy services for individuals, couples, and families.',
    images: [
      {
        url: 'https://amwajtherapy.org/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meet Your Therapist - Tebarak Al Shamsy | Amwaj Therapy Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amwaj Therapy Center | Professional Therapy & Mental Health Support',
    description:
      'Meet Tebarak Al Shamsy, MS, LPC, Founder of Amwaj Therapy Center.',
    images: ['https://amwajtherapy.org/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://amwajtherapy.org',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} ${poppins.variable} ${outfit.variable} ${inter.className}`}>
      <Script src="https://widget-cdn.simplepractice.com/assets/integration-1.0.js" strategy="lazyOnload" />
      <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
        </body>
    </html>
  );
}
