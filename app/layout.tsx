import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "Sid's Collectibles - Antiques & Repair Services",
    template: "%s | Sid's Collectibles"
  },
  description: 'Your trusted source for high-quality collectibles, antiques, and professional repair services. Specializing in preserving the value and beauty of your precious items.',
  keywords: ['antiques', 'collectibles', 'repair services', 'restoration', 'vintage items', 'collectible shop'],
  authors: [{ name: "Sid's Collectibles" }],
  creator: "Sid's Collectibles",
  publisher: "Sid's Collectibles",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "Sid's Collectibles - Antiques & Repair Services",
    description: 'Your trusted source for high-quality collectibles, antiques, and professional repair services.',
    siteName: "Sid's Collectibles",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Sid's Collectibles - Antiques & Repair Services",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sid's Collectibles - Antiques & Repair Services",
    description: 'Your trusted source for high-quality collectibles, antiques, and professional repair services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
