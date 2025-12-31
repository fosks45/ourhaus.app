import type { Metadata, Viewport } from 'next';
import { FirebaseProvider } from '@/components/firebase-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'OurHaus',
  description: 'OurHaus - Your digital home',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'OurHaus',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0ea5e9',
  viewportFit: 'cover', // Enable safe-area support for notched devices
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-background-primary text-text-primary min-h-screen">
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
