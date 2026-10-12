'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  MapPin,
  UtensilsCrossed,
  Star,
  Receipt,
  Store,
  CalendarDays,
} from 'lucide-react';
import { useRestaurantAnalyticsSummary } from '@/hooks/useRestaurantAnalyticsSummary';
import RevenueMetricsChart from '@/components/analytics-overview/revenue-metrics-chart';
import RevenueStreamVisualizer from '@/components/analytics-overview/revenue-stream-visualizer';
import OperationalValueMetric from '@/components/analytics-overview/operational-value-metric';
import TemporalPeakVisualizer from '@/components/analytics-overview/temporal-peak-visualizer';
import TransactionLedger from '@/components/common/transaction-ledger';
import { getDefaultDateRange, formatDate } from '@/lib/utils';
import DatePicker from '@/components/common/date-picker';

export default function RestaurantAnalytics({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [dates, setDates] = useState(getDefaultDateRange());
  const [activePreset, setActivePreset] = useState<number | 'custom'>(7);

  const hookParams = {
    restaurantId: Number(id),
    startDate: dates.startDate,
    endDate: dates.endDate,
  };
  const { data, isLoading, isError } =
    useRestaurantAnalyticsSummary(hookParams);

  const handleSetPreset = (days: number) => {
    setActivePreset(days);
    const end = new Date('2026-10-12');
    const start = new Date('2026-10-12');
    start.setDate(end.getDate() - (days - 1));

    setDates({
      startDate: formatDate(start),
      endDate: formatDate(end),
    });
  };

  const handleCustomDates = (
    newDates: React.SetStateAction<{ startDate: string; endDate: string }>,
  ) => {
    setActivePreset('custom');
    setDates(newDates);
  };

  if (isError) {
    return (
      <div className='min-h-[calc(100vh-80px)] bg-[#0b0c10] flex items-center justify-center p-6 text-zinc-100'>
        <div className='text-center p-12 rounded-2xl bg-[#111317] border border-zinc-800 max-w-md w-full shadow-2xl'>
          <Store className='w-10 h-10 text-red-400 mx-auto mb-3' />
          <h2 className='text-lg font-bold text-white mb-1'>
            Restaurant Outlet Not Found
          </h2>
          <p className='text-xs text-zinc-400 mb-6'>
            Unable to locate property records or retrieve live analytics.
          </p>
          <button
            onClick={() => router.push('/restaurants')}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-all shadow-md shadow-blue-500/20'
          >
            <ChevronLeft size={14} />
            <span>Back to Directory</span>
          </button>
        </div>
      </div>
    );
  }

  const restaurant = data?.restaurant;

  return (
    <div className='min-h-screen bg-[#0b0c10] text-zinc-100 font-sans selection:bg-white selection:text-zinc-950 pb-20'>
      {/* Subtle ambient lighting & dot grid */}
      <div className='pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]' />
      <div
        className='pointer-events-none fixed inset-0 opacity-[0.025]'
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-8 sm:pt-10'>
        {/* Navigation Breadcrumb */}
        <div className='mb-6 flex items-center gap-2.5 text-xs text-zinc-400'>
          <button
            onClick={() => router.push('/restaurants')}
            className='hover:text-white flex items-center gap-1 transition-colors'
          >
            <ChevronLeft size={14} />
            <span>Directory</span>
          </button>
          <span className='text-zinc-600'>/</span>
          <span className='font-semibold text-zinc-200'>
            {isLoading ? 'Loading property…' : restaurant?.name}
          </span>
        </div>

        {/* ========================================================================= */}
        {/* UNIT HEADER SHOWCASE BANNER */}
        {/* ========================================================================= */}
        <section className='mb-10 rounded-2xl bg-[#111317]/90 border border-zinc-800/80 p-8 sm:p-10 overflow-hidden shadow-2xl relative'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_50%)]' />

          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <span className='font-mono text-xs font-bold text-zinc-400 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800'>
                  Outlet #{id}
                </span>

                {/* Indian Flag Badge */}
                <div className='w-7 h-4.5 rounded-full overflow-hidden border border-white/20 shadow-xs flex flex-col'>
                  <div className='h-1/3 w-full bg-[#FF9933]' />
                  <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                    <div className='w-1 h-1 rounded-full border border-[#000080]' />
                  </div>
                  <div className='h-1/3 w-full bg-[#138808]' />
                </div>

                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-950/70 border border-emerald-800/50 text-emerald-400'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                  Live Operational
                </span>
              </div>

              <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
                {isLoading ? '…' : restaurant?.name}
              </h1>

              <div className='flex items-center gap-3 mt-2 text-xs text-zinc-400'>
                <span className='flex items-center gap-1 text-zinc-300 font-medium'>
                  <MapPin size={13} className='text-zinc-500' />
                  {restaurant?.location}
                </span>
                <span>•</span>
                <span className='flex items-center gap-1 text-zinc-300 font-medium'>
                  <UtensilsCrossed size={13} className='text-zinc-500' />
                  {restaurant?.cuisine}
                </span>
                {restaurant?.rating && (
                  <>
                    <span>•</span>
                    <span className='flex items-center gap-1 text-amber-400 font-bold'>
                      ⭐ {restaurant.rating} / 5.0
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quick KPI Badge */}
            <div className='flex items-center gap-3'>
              <div className='p-3.5 px-5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-right'>
                <span className='text-[10px] uppercase font-semibold text-zinc-400 tracking-wider block'>
                  Property Status
                </span>
                <span className='text-base font-bold text-emerald-400 font-mono'>
                  Full Sync Active
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TIMELINE CONTROL TOOLBAR */}
        {/* ========================================================================= */}
        <div className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-[#111317]/90 border border-zinc-800/80 backdrop-blur-md shadow-lg shadow-black/20'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0'>
              <CalendarDays className='w-4 h-4' />
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-xs font-semibold text-zinc-300 uppercase tracking-wider'>
                Analysis Period:
              </span>
              <span className='px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono'>
                {dates.startDate} → {dates.endDate}
              </span>
            </div>
          </div>

          <div className='flex items-center flex-wrap gap-2.5'>
            {/* Quick Preset Buttons */}
            <div className='flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs shadow-xs'>
              {[
                { label: '7 Days', val: 7 },
                { label: '14 Days', val: 14 },
                { label: '30 Days', val: 30 },
              ].map((p) => {
                const isActive = activePreset === p.val;
                return (
                  <button
                    key={p.val}
                    type='button'
                    onClick={() => handleSetPreset(p.val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <DatePicker date={dates} setDates={handleCustomDates} />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ANALYTICS CHARTS & VISUALIZERS */}
        {/* ========================================================================= */}
        {isLoading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className='bg-[#111317]/80 rounded-2xl border border-zinc-800/80 p-6 h-64 animate-pulse'
              />
            ))}
          </div>
        )}

        {!isLoading && data && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10'>
              <RevenueMetricsChart timeseriesData={data.daily_orders} />
              <RevenueStreamVisualizer timeseriesData={data.daily_revenue} />
              <OperationalValueMetric value={data.avg_order_value} />
              <TemporalPeakVisualizer timeseriesData={data.peak_hours} />
            </div>

            {/* Transaction Ledger Section */}
            <div className='rounded-2xl bg-[#111317]/90 border border-zinc-800/80 p-6 sm:p-8 shadow-xl'>
              <div className='flex items-center gap-2 mb-6'>
                <Receipt className='w-4 h-4 text-blue-400' />
                <h3 className='text-lg font-bold text-white tracking-tight'>
                  Recent Orders & Transactions
                </h3>
              </div>
              <TransactionLedger lockedRestaurantId={Number(id)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
