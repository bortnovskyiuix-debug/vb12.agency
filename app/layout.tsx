import type { Metadata } from 'next';

import ScriptsBootstrap from './components/ScriptsBootstrap';
import './landing.css';

export const metadata: Metadata = {
  title: 'VB12 — Bold Brands. Smart Pixels. Zero Boring.',
  description:
    'Creative studio that ships digital products with sharp design, slick motion, and code that actually works. UX/UI, web & app, 3D, animation, pitchdecks — all under one roof.',
  keywords: [
    'VB12',
    'creative agency',
    'UX/UI design',
    'web design',
    'product design',
    'motion design',
    'branding',
    '3D',
    'pitchdeck',
    'Vlad Bortnovskyi',
  ],
  authors: [{ name: 'Vlad Bortnovskyi' }],
  creator: 'VB12',
  openGraph: {
    type: 'website',
    title: 'VB12 — Bold Brands. Smart Pixels. Zero Boring.',
    description:
      'High-end digital products that look clean and work hard. Design, motion, 3D, and dev — crafted by VB12.',
    siteName: 'VB12',
    images: [{ url: '/landing/hero-mockup.png', width: 1200, height: 630, alt: 'VB12' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VB12 — Bold Brands. Smart Pixels. Zero Boring.',
    description:
      'Smart solutions for bold brands. UX/UI, web, motion, 3D, pitchdecks — by VB12.',
    images: ['/landing/hero-mockup.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/landing/hero-mockup.png" fetchPriority="high" />
      </head>
      <body className="is-loading">
        {children}
        <ScriptsBootstrap />
      </body>
    </html>
  );
}
