import React from 'react';

const RestoAnalyticLogo = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse' />
      <span className='text-sm font-medium tracking-tighter text-zinc-100'>
        resto<span className='text-zinc-500 font-light'>Analytic</span>
      </span>
    </div>
  );
};

export default RestoAnalyticLogo;
