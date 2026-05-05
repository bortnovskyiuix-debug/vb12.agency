import type { Metadata } from 'next';

import ScriptsBootstrap from './components/ScriptsBootstrap';
import './landing.css';

export const metadata: Metadata = {
  title: 'VB12 — We Create Smart Solutions for Bold Brands',
  icons: {
    icon: '/landing/favicon.png',
    shortcut: '/landing/favicon.png',
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
