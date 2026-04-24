import type { Metadata } from 'next';
import localFont from 'next/font/local';

import LoaderGate from './components/LoaderGate';
import './globals.css';

const suisseIntl = localFont({
  variable: '--font-suisse',
  display: 'swap',
  src: [
    { path: './fonts/SuisseIntl-Thin.otf', weight: '100', style: 'normal' },
    { path: './fonts/SuisseIntl-ThinItalic.otf', weight: '100', style: 'italic' },
    { path: './fonts/SuisseIntl-Ultralight.otf', weight: '200', style: 'normal' },
    { path: './fonts/SuisseIntl-UltralightItalic.otf', weight: '200', style: 'italic' },
    { path: './fonts/SuisseIntl-Light.otf', weight: '300', style: 'normal' },
    { path: './fonts/SuisseIntl-LightItalic.otf', weight: '300', style: 'italic' },
    { path: './fonts/SuisseIntl-Book.otf', weight: '350', style: 'normal' },
    { path: './fonts/SuisseIntl-BookItalic.otf', weight: '350', style: 'italic' },
    { path: './fonts/SuisseIntl-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/SuisseIntl-RegularItalic.otf', weight: '400', style: 'italic' },
    { path: './fonts/SuisseIntl-Medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/SuisseIntl-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: './fonts/SuisseIntl-SemiBold.otf', weight: '600', style: 'normal' },
    { path: './fonts/SuisseIntl-SemiBoldItalic.otf', weight: '600', style: 'italic' },
    { path: './fonts/SuisseIntl-Bold.otf', weight: '700', style: 'normal' },
    { path: './fonts/SuisseIntl-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: './fonts/SuisseIntl-Black.otf', weight: '900', style: 'normal' },
    { path: './fonts/SuisseIntl-BlackItalic.otf', weight: '900', style: 'italic' },
  ],
});

export const metadata: Metadata = {
  title: 'VB12',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${suisseIntl.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LoaderGate />
        {children}
      </body>
    </html>
  );
}
