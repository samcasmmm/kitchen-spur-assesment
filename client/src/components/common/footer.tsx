import React from 'react';
import Link from 'next/link';
import RestoAnalyticLogo from './resto-logo';

const Footer = () => {
  return (
    <footer className='w-full bg-[#0b0c10] border-t border-zinc-800/80 px-6 sm:px-8 py-10 transition-colors'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
          {/* Brand & Tagline */}
          <div className='space-y-2 max-w-md'>
            <RestoAnalyticLogo clickable={true} />
            <p className='text-xs text-zinc-500 leading-relaxed'>
              Executive multi-unit restaurant analytics, dynamic revenue
              attribution, and real-time ledger intelligence for Indian
              hospitality enterprises.
            </p>
          </div>

          {/* Quick System Status & Indian Region pill */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
            <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-400'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
              <span>All Systems Nominal</span>
              <span className='text-zinc-600'>•</span>
              <span className='font-mono text-zinc-300 text-[11px]'>
                Oct 12, 2026 Sync
              </span>
            </div>

            {/* Quick Links */}
            <div className='flex items-center gap-4 text-xs font-medium text-zinc-400'>
              <Link
                href='/dashboard'
                className='hover:text-white transition-colors'
              >
                Dashboard
              </Link>
              <Link
                href='/restaurants'
                className='hover:text-white transition-colors'
              >
                Restaurants
              </Link>
              <span className='text-zinc-600'>|</span>
              <span className='font-mono text-zinc-500 text-[11px]'>
                &copy; {new Date().getFullYear()} RestoAnalytics
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
