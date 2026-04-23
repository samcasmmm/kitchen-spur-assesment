'use client';

import { useTopRestaurantsByRevenue } from '@/hooks/useRestaurantsByRevenue';
import { getDefaultDateRange } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Restaurants } from '@/types/restaurants';
import DatePicker from '@/components/common/date-picker';

const Dashboard = () => {
  const router = useRouter();
  const [dates, setDates] = useState(getDefaultDateRange());

  const {
    data: topRestaurants,
    isLoading,
    isError,
  } = useTopRestaurantsByRevenue({
    startDate: dates.startDate,
    endDate: dates.endDate,
  });

  return (
    <main className='min-h-screen bg-zinc-950 text-zinc-200 selection:bg-zinc-100 selection:text-zinc-900'>
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <header className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-zinc-500'>
              <TrendingUp size={14} />
              <span className='text-[10px] uppercase tracking-[0.2em] font-bold'>
                Insights
              </span>
            </div>
            <h1 className='text-3xl font-medium tracking-tight text-zinc-100'>
              Executive Overview
            </h1>
            <p className='text-zinc-500 text-sm font-light'>
              Analyzing the top 3 performing properties by gross revenue.
            </p>
          </div>

          <DatePicker date={dates} setDates={setDates} />
        </header>

        {isLoading && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-56 rounded-2xl bg-zinc-900/50 border border-white/5 animate-pulse'
              />
            ))}
          </div>
        )}

        {isError && (
          <div className='rounded-sm bg-red-500/5 border border-red-500/20 p-8 mb-4 text-center'>
            <p className='text-sm text-red-400'>
              Dynamic data sync failed. Please refresh the interface.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {topRestaurants?.length === 0 ? (
              <div className='rounded-sm bg-zinc-900/30 border border-zinc-800/50 py-20 text-center'>
                <p className='text-zinc-500 text-sm font-light italic'>
                  No transactions recorded for this period.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {topRestaurants.map((r: Restaurants, idx: number) => (
                  <div
                    key={r.id}
                    onClick={() => router.push(`/restaurants/${r.id}`)}
                    className='group relative bg-zinc-900/40 border border-white/5 rounded-sm p-8 cursor-pointer
                      hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-300'
                  >
                    <div className='flex items-center justify-between mb-6'>
                      <div className='h-8 w-8 rounded-sm bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors'>
                        0{idx + 1}
                      </div>
                      <span className='text-[10px] uppercase tracking-widest text-zinc-500 font-medium'>
                        {r.cuisine}
                      </span>
                    </div>

                    <h3 className='text-xl font-medium text-zinc-100 mb-1 truncate'>
                      {r.name}
                    </h3>
                    <p className='text-xs text-zinc-500 font-light mb-8'>
                      {r.location}
                    </p>

                    <div className='space-y-4'>
                      <div className='flex justify-between items-end'>
                        <span className='text-[10px] uppercase tracking-tighter text-zinc-500'>
                          Revenue
                        </span>
                        <span className='text-lg font-medium text-white tracking-tight'>
                          ₹{Number(r.total_revenue).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Visual Revenue Bar */}
                      <div className='h-1 w-full bg-zinc-800 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-zinc-100 transition-all duration-1000'
                          style={{
                            width: `${Math.min((r.total_revenue / 100000) * 100, 100)}%`,
                          }}
                        />
                      </div>

                      <div className='flex justify-between text-[11px] text-zinc-500'>
                        <span>Volume</span>
                        <span className='text-zinc-300 font-medium'>
                          {r.total_orders} orders
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className='mt-16 text-center'>
              <button
                onClick={() => router.push('/restaurants')}
                className='group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-100 transition-all'
              >
                Explore Full Directory
                <ArrowRight
                  size={14}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
