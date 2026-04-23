'use client';

import { CreditCard, TrendingUp } from 'lucide-react';

interface OperationalValueMetricProps {
  value?: number | string;
}

export default function OperationalValueMetric({
  value = 0,
}: OperationalValueMetricProps) {
  const formattedValue = Number(value).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <div className='group relative bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/60 overflow-hidden'>
      <div className='absolute -right-4 -top-4 h-24 w-24 bg-zinc-100/2 rounded-full blur-2xl group-hover:bg-zinc-100/4 transition-colors' />

      <div className='relative flex flex-col justify-between h-full'>
        <header className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-lg bg-zinc-800/50 text-zinc-400 group-hover:text-zinc-100 transition-colors'>
              <CreditCard size={14} />
            </div>
            <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500'>
              Avg Ticket
            </h3>
          </div>

          <div className='flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20'>
            <TrendingUp size={10} className='text-emerald-500' />
            <span className='text-[9px] font-bold text-emerald-500'>+2.4%</span>
          </div>
        </header>

        <div className='space-y-1'>
          <div className='flex items-baseline gap-1'>
            <span className='text-sm font-light text-zinc-500'>₹</span>
            <span className='text-3xl font-medium tracking-tight text-zinc-100'>
              {formattedValue}
            </span>
          </div>
          <p className='text-[10px] text-zinc-600 font-medium uppercase tracking-wider'>
            Operational AOV per order
          </p>
        </div>

        {/* Bottom Decorative Bar */}
        <div className='absolute -bottom-6 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
      </div>
    </div>
  );
}
