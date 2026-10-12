'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  TrendingUp,
  Store,
  Eye,
  EyeOff,
  ShoppingBag,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  ArrowRight,
  Award,
  CalendarDays,
} from 'lucide-react';
import { useTopRestaurantsByRevenue } from '@/hooks/useRestaurantsByRevenue';
import { getDefaultDateRange, formatDate } from '@/lib/utils';
import { Restaurants } from '@/types/restaurants';
import DatePicker from '@/components/common/date-picker';

export default function DashboardPage() {
  const router = useRouter();
  const [dates, setDates] = useState(getDefaultDateRange());
  const [activePreset, setActivePreset] = useState<number | 'custom'>(7);
  const [showBalance, setShowBalance] = useState(true);

  const {
    data: topRestaurants,
    isLoading,
    isError,
  } = useTopRestaurantsByRevenue({
    startDate: dates.startDate,
    endDate: dates.endDate,
  });

  // Calculate summary metrics across top restaurants
  const metrics = useMemo(() => {
    if (!topRestaurants || topRestaurants.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        avgTicket: 0,
        champion: null,
        runnerUp: null,
      };
    }

    const totalRev = topRestaurants.reduce(
      (acc: number, r: Restaurants) => acc + Number(r.total_revenue || 0),
      0,
    );
    const totalOrd = topRestaurants.reduce(
      (acc: number, r: Restaurants) => acc + Number(r.total_orders || 0),
      0,
    );
    const avg = totalOrd > 0 ? Math.round(totalRev / totalOrd) : 0;

    return {
      totalRevenue: totalRev,
      totalOrders: totalOrd,
      avgTicket: avg,
      champion: topRestaurants[0] || null,
      runnerUp: topRestaurants[1] || null,
    };
  }, [topRestaurants]);

  // Quick preset helper
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

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12'>
        {/* ========================================================================= */}
        {/* HERO SECTION - Executive Overview with 3D Card Showcase */}
        {/* ========================================================================= */}
        <section className='mb-10 rounded-2xl bg-[#111317]/90 border border-zinc-800/80 p-8 sm:p-10 lg:p-12 overflow-hidden shadow-2xl relative'>
          {/* Subtle inner radial gradient */}
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_50%)]' />

          <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
            {/* Left Hero Content */}
            <div className='w-full lg:w-3/5 space-y-6'>
              {/* Step indicator & Live Status Tag */}
              <div className='flex items-center gap-3'>
                <span className='font-mono text-xs tracking-widest text-zinc-400 font-semibold'>
                  01/03
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-blue-950/70 border border-blue-800/50 text-blue-400'>
                  <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse' />
                  Executive Insights
                </span>
              </div>

              {/* Title Header */}
              <div>
                <div className='flex items-center gap-3'>
                  <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none'>
                    Restaurant Analytics
                  </h1>
                  <div className='inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800/90 border border-zinc-700 text-white shadow-inner'>
                    <ArrowUpRight className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                </div>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 tracking-tight leading-tight mt-1'>
                  & Executive Dashboard
                </h2>
                <p className='mt-3.5 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl font-normal'>
                  A high-performance management console designed for restaurant
                  owners to track revenue velocity, location performance, and
                  customer order patterns in real-time.
                </p>
              </div>

              {/* Summary Metrics Strip */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80'>
                {/* Total Gross Revenue */}
                <div className='p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60'>
                  <div className='flex items-center justify-between text-zinc-400 mb-1'>
                    <span className='text-[10px] font-semibold uppercase tracking-wider'>
                      Total Revenue
                    </span>
                    <TrendingUp className='w-3.5 h-3.5 text-emerald-400' />
                  </div>
                  <p className='text-lg sm:text-xl font-bold text-white font-mono tracking-tight'>
                    {showBalance
                      ? `₹ ${metrics.totalRevenue.toLocaleString('en-IN')}`
                      : '₹ ••••••••'}
                  </p>
                  <span className='text-[10px] text-emerald-400 font-medium'>
                    +24.8% vs last cycle
                  </span>
                </div>

                {/* Total Orders */}
                <div className='p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60'>
                  <div className='flex items-center justify-between text-zinc-400 mb-1'>
                    <span className='text-[10px] font-semibold uppercase tracking-wider'>
                      Order Volume
                    </span>
                    <ShoppingBag className='w-3.5 h-3.5 text-blue-400' />
                  </div>
                  <p className='text-lg sm:text-xl font-bold text-white font-mono tracking-tight'>
                    {metrics.totalOrders.toLocaleString('en-IN')}{' '}
                    <span className='text-xs text-zinc-400 font-normal'>
                      orders
                    </span>
                  </p>
                  <span className='text-[10px] text-zinc-400 font-medium'>
                    Live across top branches
                  </span>
                </div>

                {/* Average Ticket Value */}
                <div className='col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60'>
                  <div className='flex items-center justify-between text-zinc-400 mb-1'>
                    <span className='text-[10px] font-semibold uppercase tracking-wider'>
                      Avg Ticket
                    </span>
                    <Sparkles className='w-3.5 h-3.5 text-amber-400' />
                  </div>
                  <p className='text-lg sm:text-xl font-bold text-white font-mono tracking-tight'>
                    ₹ {metrics.avgTicket.toLocaleString('en-IN')}
                  </p>
                  <span className='text-[10px] text-zinc-400 font-medium'>
                    Per completed order
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase - Floating 3D Metric Passes (Matching Sign-in Style) */}
            <div className='w-full lg:w-2/5 flex items-center justify-center py-6 select-none'>
              <div className='relative w-[280px] sm:w-[310px] h-[330px] sm:h-[360px]'>
                {/* BACK CARD - Frosted Mint Glassmorphic Pass */}
                <div
                  onClick={() =>
                    metrics.runnerUp &&
                    router.push(`/restaurants/${metrics.runnerUp.id}`)
                  }
                  className='cursor-pointer absolute -left-8 sm:-left-12 top-4 w-[230px] sm:w-[260px] h-[300px] sm:h-[330px] rounded-2xl p-5 flex flex-col justify-between transition-transform duration-700 ease-out hover:scale-105'
                  style={{
                    transform: 'rotate(-15deg) translate(-15px, 10px)',
                    background:
                      'linear-gradient(145deg, rgba(206, 235, 230, 0.85) 0%, rgba(182, 222, 214, 0.7) 50%, rgba(150, 205, 196, 0.6) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow:
                      '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
                  }}
                >
                  <div>
                    {/* Indian Flag Badge */}
                    <div className='w-8 h-5 rounded-full overflow-hidden border border-black/10 shadow-sm flex flex-col bg-white'>
                      <div className='h-1/3 w-full bg-[#FF9933]' />
                      <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                        <div className='w-1.5 h-1.5 rounded-full border border-[#000080] flex items-center justify-center'>
                          <div className='w-0.5 h-0.5 rounded-full bg-[#000080]' />
                        </div>
                      </div>
                      <div className='h-1/3 w-full bg-[#138808]' />
                    </div>

                    <p className='mt-3.5 text-[10px] text-zinc-700/80 font-semibold tracking-wide uppercase'>
                      #2 Runner-Up Property
                    </p>
                    <p className='text-sm font-bold text-zinc-900 truncate'>
                      {metrics.runnerUp?.name || 'Burger Hub'}
                    </p>
                    <p className='text-[11px] text-zinc-600 font-medium'>
                      {metrics.runnerUp?.location || 'Hyderabad'}
                    </p>
                  </div>

                  {/* Watermark "RESTO" */}
                  <div className='w-full overflow-hidden opacity-25 select-none pointer-events-none'>
                    <div className='font-black italic text-5xl tracking-tighter text-zinc-800 -rotate-3'>
                      RESTO
                    </div>
                  </div>

                  <div className='pt-2 border-t border-black/10 flex items-center justify-between text-xs text-zinc-800 font-semibold'>
                    <span>
                      ₹{' '}
                      {Number(
                        metrics.runnerUp?.total_revenue || 29014,
                      ).toLocaleString('en-IN')}
                    </span>
                    <span className='text-[10px] text-zinc-600'>
                      {metrics.runnerUp?.total_orders || 45} orders
                    </span>
                  </div>
                </div>

                {/* FRONT CARD - Matte Dark Carbon Titanium Champion Pass */}
                <div
                  onClick={() =>
                    metrics.champion &&
                    router.push(`/restaurants/${metrics.champion.id}`)
                  }
                  className='cursor-pointer absolute right-0 top-0 w-[235px] sm:w-[265px] h-[310px] sm:h-[340px] rounded-2xl p-5 flex flex-col justify-between z-20 text-white transition-transform duration-700 ease-out hover:scale-105'
                  style={{
                    transform: 'rotate(-7deg) translate(8px, -5px)',
                    background:
                      'linear-gradient(145deg, #2b2e36 0%, #1f2127 45%, #15161a 100%)',
                    boxShadow:
                      '0 35px 60px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12) inset',
                  }}
                >
                  <div>
                    {/* Indian Flag Badge */}
                    <div className='w-8 h-5 rounded-full overflow-hidden border border-white/20 shadow-sm flex flex-col'>
                      <div className='h-1/3 w-full bg-[#FF9933]' />
                      <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                        <div className='w-1.5 h-1.5 rounded-full border border-[#000080] flex items-center justify-center'>
                          <div className='w-0.5 h-0.5 rounded-full bg-[#000080]' />
                        </div>
                      </div>
                      <div className='h-1/3 w-full bg-[#138808]' />
                    </div>

                    <div className='flex items-center justify-between mt-3.5'>
                      <p className='text-[10px] text-amber-400 font-semibold tracking-wider uppercase flex items-center gap-1'>
                        <Award className='w-3 h-3' /> #1 Top Earner
                      </p>
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowBalance(!showBalance);
                        }}
                        className='text-zinc-400 hover:text-white transition-colors'
                      >
                        {showBalance ? (
                          <Eye className='w-3.5 h-3.5' />
                        ) : (
                          <EyeOff className='w-3.5 h-3.5' />
                        )}
                      </button>
                    </div>

                    <p className='text-base font-bold text-white truncate mt-0.5'>
                      {metrics.champion?.name || 'Sushi Bay'}
                    </p>
                    <p className='text-[11px] text-zinc-400'>
                      {metrics.champion?.location || 'Mumbai'} •{' '}
                      {metrics.champion?.cuisine || 'Japanese'}
                    </p>
                  </div>

                  {/* Stylized "RESTO" Typography */}
                  <div className='my-auto select-none pointer-events-none'>
                    <div
                      className='font-black italic text-5xl tracking-tighter text-white drop-shadow-md'
                      style={{
                        fontFamily:
                          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        letterSpacing: '-0.06em',
                      }}
                    >
                      RESTO
                    </div>
                  </div>

                  {/* Bottom Balance Tag */}
                  <div className='pt-2 border-t border-white/10 flex items-center justify-between'>
                    <div>
                      <p className='text-[9px] text-zinc-400 font-medium uppercase tracking-wider'>
                        Gross Sales
                      </p>
                      <span className='text-xs sm:text-sm font-semibold tracking-tight text-white font-mono'>
                        {showBalance
                          ? `₹ ${Number(
                              metrics.champion?.total_revenue || 33989,
                            ).toLocaleString('en-IN')}`
                          : '₹ ••••••••'}
                      </span>
                    </div>
                    <div className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white'>
                      <ArrowUpRight className='w-3.5 h-3.5' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTROL TOOLBAR - Filters & Duration Selector */}
        {/* ========================================================================= */}
        <div className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-[#111317]/90 border border-zinc-800/80 backdrop-blur-md shadow-lg shadow-black/20'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0'>
              <CalendarDays className='w-4 h-4' />
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-xs font-semibold text-zinc-300 uppercase tracking-wider'>
                Analytics Timeline:
              </span>
              <span className='px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono'>
                {dates.startDate} → {dates.endDate}
              </span>
            </div>
          </div>

          <div className='flex items-center flex-wrap gap-2.5'>
            {/* Quick Preset Segmented Buttons */}
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

            {/* Popover DatePicker */}
            <DatePicker date={dates} setDates={handleCustomDates} />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TOP PERFORMING RESTAURANTS SECTION */}
        {/* ========================================================================= */}
        <section className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl sm:text-2xl font-bold text-white tracking-tight'>
                Top Performing Properties
              </h2>
              <p className='text-xs sm:text-sm text-zinc-400 font-normal'>
                Ranked by gross sales volume and completed transactions
              </p>
            </div>

            <button
              onClick={() => router.push('/restaurants')}
              className='text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors'
            >
              All Restaurants <ArrowRight className='w-3.5 h-3.5' />
            </button>
          </div>

          {/* Loading Skeletons */}
          {isLoading && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-64 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 animate-pulse p-6'
                />
              ))}
            </div>
          )}

          {/* Error Message */}
          {isError && (
            <div className='p-8 rounded-2xl bg-red-950/20 border border-red-800/40 text-center space-y-2'>
              <p className='text-sm text-red-400 font-medium'>
                Failed to sync live performance data with backend service.
              </p>
              <p className='text-xs text-zinc-500'>
                Please ensure the API server is active on port 8080 and try
                again.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && topRestaurants?.length === 0 && (
            <div className='p-16 rounded-2xl bg-[#111317]/60 border border-zinc-800/60 text-center space-y-3'>
              <Store className='w-8 h-8 text-zinc-500 mx-auto' />
              <p className='text-sm font-semibold text-zinc-300'>
                No order activity recorded in this timeline
              </p>
              <p className='text-xs text-zinc-500 max-w-sm mx-auto'>
                Try selecting the default 7-day range ending October 12, 2026 to
                view current order analytics.
              </p>
              <button
                type='button'
                onClick={() => handleSetPreset(7)}
                className='mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-all shadow-md shadow-blue-500/20'
              >
                Reset to Last 7 Days
              </button>
            </div>
          )}

          {/* Restaurants Grid */}
          {!isLoading && !isError && topRestaurants && topRestaurants.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {topRestaurants.map((r: Restaurants, idx: number) => {
                const maxRev = Number(topRestaurants[0]?.total_revenue || 1);
                const currentRev = Number(r.total_revenue || 0);
                const percent = Math.min(
                  Math.round((currentRev / maxRev) * 100),
                  100,
                );

                const badges = [
                  {
                    rank: '#1 Champion Property',
                    color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
                    dot: 'bg-amber-400',
                  },
                  {
                    rank: '#2 High Growth',
                    color: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
                    dot: 'bg-blue-400',
                  },
                  {
                    rank: '#3 Steady Performer',
                    color:
                      'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
                    dot: 'bg-emerald-400',
                  },
                ];

                const currentBadge = badges[idx] || badges[2];

                return (
                  <div
                    key={r.id}
                    onClick={() => router.push(`/restaurants/${r.id}`)}
                    className='group relative rounded-2xl bg-[#111317]/90 border border-zinc-800/80 p-7 cursor-pointer transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-950/20 hover:-translate-y-1 flex flex-col justify-between'
                  >
                    <div>
                      {/* Top Rank Badge & Flag */}
                      <div className='flex items-center justify-between mb-4'>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${currentBadge.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${currentBadge.dot}`}
                          />
                          {currentBadge.rank}
                        </span>

                        {/* Indian Flag Badge */}
                        <div className='w-7 h-4.5 rounded-full overflow-hidden border border-white/20 shadow-xs flex flex-col'>
                          <div className='h-1/3 w-full bg-[#FF9933]' />
                          <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                            <div className='w-1 h-1 rounded-full border border-[#000080]' />
                          </div>
                          <div className='h-1/3 w-full bg-[#138808]' />
                        </div>
                      </div>

                      {/* Restaurant Title & Meta */}
                      <h3 className='text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors truncate'>
                        {r.name}
                      </h3>

                      <div className='flex items-center gap-2 mt-1 mb-6 text-xs text-zinc-400'>
                        <span className='flex items-center gap-1 text-zinc-300'>
                          <MapPin className='w-3 h-3 text-zinc-500' />
                          {r.location}
                        </span>
                        <span>•</span>
                        <span className='flex items-center gap-1 text-zinc-400'>
                          <UtensilsCrossed className='w-3 h-3 text-zinc-500' />
                          {r.cuisine}
                        </span>
                        {r.rating && (
                          <>
                            <span>•</span>
                            <span className='text-amber-400 font-semibold'>
                              ⭐ {r.rating}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Revenue Display */}
                      <div className='space-y-2 mb-6'>
                        <div className='flex items-baseline justify-between'>
                          <span className='text-[10px] font-semibold uppercase tracking-wider text-zinc-500'>
                            Gross Sales
                          </span>
                          <span className='text-xl font-extrabold text-white font-mono tracking-tight'>
                            ₹ {currentRev.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Comparative Percentage Progress Bar */}
                        <div className='h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-700'
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className='flex items-center justify-between text-[11px] text-zinc-400 pt-1'>
                          <span>Completed Orders:</span>
                          <span className='font-semibold text-zinc-200'>
                            {r.total_orders} orders
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className='pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors'>
                      <span>Branch Analytics</span>
                      <div className='w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all'>
                        <ArrowUpRight className='w-3.5 h-3.5' />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* DIRECTORY FOOTER BANNER */}
        {/* ========================================================================= */}
        <section className='mt-16 p-8 rounded-2xl bg-[#111317]/80 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6'>
          <div>
            <h3 className='text-lg font-bold text-white tracking-tight'>
              Looking to inspect another location?
            </h3>
            <p className='text-xs text-zinc-400 mt-1'>
              Browse the complete network directory to view historical orders,
              peak loads, and location records.
            </p>
          </div>
          <button
            type='button'
            onClick={() => router.push('/restaurants')}
            className='shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-2'
          >
            <span>Explore Full Directory</span>
            <ArrowRight className='w-3.5 h-3.5' />
          </button>
        </section>
      </div>
    </div>
  );
}
