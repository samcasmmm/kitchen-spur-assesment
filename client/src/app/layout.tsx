import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | RestoAnalytics',
    default: 'RestoAnalytics | Restaurant Data & Insights',
  },
  description:
    'Professional-grade analytics for restaurant performance, sales tracking, and order management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`dark ${geistSans.className} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-[#0b0c10] text-zinc-100 selection:bg-white selection:text-zinc-950'>
        <div className='fixed inset-0 pointer-events-none' />

        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
