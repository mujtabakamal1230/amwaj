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
  title: 'Amwaj Therapy - Your Mental Health Journey Starts Here',
  description: 'At Amwaj, we offer compassionate therapy that respects your feelings, identity, and story. Find support for anxiety, depression, trauma, and more.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
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
