'use client';

import { CreditCard, TrendingUp, Sparkles } from 'lucide-react';

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
    <div className='bg-[#111317]/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 group flex flex-col justify-between'>
      {/* Subtle blue accent glow */}
      <div className='pointer-events-none absolute -right-6 -top-6 h-32 w-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/15 transition-all' />

      <header className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-400'>
            <CreditCard size={13} />
          </div>
          <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
            Ticket Analytics
          </h3>
        </div>

        <div className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400'>
          <TrendingUp size={11} />
          <span className='text-[10px] font-bold'>+2.4% vs Avg</span>
        </div>
      </header>

      <div className='space-y-2 my-auto'>
        <div className='flex items-baseline gap-1.5'>
          <span className='text-2xl font-bold text-blue-400 font-mono'>₹</span>
          <span className='text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono'>
            {formattedValue}
          </span>
        </div>
        <p className='text-xs text-zinc-400 font-medium flex items-center gap-1.5'>
          <Sparkles className='w-3 h-3 text-amber-400' />
          <span>Average Order Value per transaction</span>
        </p>
      </div>

      <div className='pt-4 border-t border-zinc-800/80 mt-6 flex items-center justify-between text-[11px] text-zinc-500'>
        <span>Calculated from settled units</span>
        <span className='text-emerald-400 font-medium'>Healthy Margin</span>
      </div>
    </div>
  );
}
