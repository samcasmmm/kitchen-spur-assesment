import React from 'react';
import Link from 'next/link';

interface RestoAnalyticLogoProps {
  clickable?: boolean;
}

const RestoAnalyticLogo = ({ clickable = true }: RestoAnalyticLogoProps) => {
  const content = (
    <div className='flex items-center gap-2.5 group cursor-pointer select-none'>
      {/* Brand Icon Mark */}
      <div className='w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-all duration-300 shrink-0'>
        RA
      </div>

      {/* Typography & Subtitle */}
      <div className='flex flex-col leading-none'>
        <div className='flex items-center gap-1.5'>
          <span className='text-base font-bold tracking-tight text-white group-hover:text-blue-100 transition-colors'>
            Resto<span className='text-blue-500 font-normal'>Analytics</span>
          </span>
          <span className='text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400'>
            IN
          </span>
        </div>
        <span className='text-[9px] tracking-wider text-zinc-500 font-medium uppercase mt-0.5'>
          Executive Suite
        </span>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link href='/dashboard' className='outline-none inline-flex'>
        {content}
      </Link>
    );
  }

  return content;
};

export default RestoAnalyticLogo;
