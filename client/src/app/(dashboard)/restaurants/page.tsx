'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRestaurantsList } from '@/hooks/useRestaurantsList';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  MapPin,
  UtensilsCrossed,
  Star,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  Store,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Restaurants, RestaurantsParams } from '@/types/restaurants';

export default function RestaurantList() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const params = useMemo(
    () => ({
      search: search || undefined,
      cuisine: cuisine || undefined,
      location: location || undefined,
      rating: rating || undefined,
      sort_by: sortBy,
      sort_dir: sortDir,
      page,
      per_page: 10,
    }),
    [search, cuisine, location, rating, sortBy, sortDir, page],
  );

  const { data, isLoading, isError } = useRestaurantsList(
    params as RestaurantsParams,
  );

  const restaurants = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;
  const total = data?.meta?.total ?? 0;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCuisine('');
    setLocation('');
    setRating('');
    setSortBy('name');
    setSortDir('asc');
    setPage(1);
  };

  const staticFilter = [
    {
      value: cuisine,
      setter: setCuisine,
      label: 'All Cuisines',
      options: ['North Indian', 'Japanese', 'Italian', 'American'],
    },
    {
      value: location,
      setter: setLocation,
      label: 'All Cities',
      options: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'],
    },
  ];

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
        {/* HERO SECTION - Matching Sign-in & Dashboard Header */}
        {/* ========================================================================= */}
        <section className='mb-10 rounded-2xl bg-[#111317]/90 border border-zinc-800/80 p-8 sm:p-10 lg:p-12 overflow-hidden shadow-2xl relative'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_50%)]' />

          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8'>
            <div className='space-y-4 max-w-2xl'>
              {/* Step indicator & Live Status Tag */}
              <div className='flex items-center gap-3'>
                <span className='font-mono text-xs tracking-widest text-zinc-400 font-semibold'>
                  02/03
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-blue-950/70 border border-blue-800/50 text-blue-400'>
                  <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse' />
                  Branch Portfolio
                </span>
              </div>

              {/* Title Header */}
              <div>
                <div className='flex items-center gap-3'>
                  <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none'>
                    Restaurant Directory
                  </h1>
                  <div className='inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800/90 border border-zinc-700 text-white shadow-inner'>
                    <ArrowUpRight className='w-4 h-4 sm:w-5 sm:h-5' />
                  </div>
                </div>
                <h2 className='text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight leading-tight mt-1'>
                  & Establishment Profiles
                </h2>
                <p className='mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal'>
                  Manage your branch network, review customer feedback scores,
                  and inspect unit-level analytics with automated metrics.
                </p>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className='grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0'>
              <div className='p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/70 min-w-[140px]'>
                <div className='flex items-center justify-between text-zinc-400 mb-1'>
                  <span className='text-[10px] font-semibold uppercase tracking-wider'>
                    Total Units
                  </span>
                  <Building2 className='w-3.5 h-3.5 text-blue-400' />
                </div>
                <p className='text-xl font-bold text-white font-mono'>
                  {total} Outlets
                </p>
                <span className='text-[10px] text-emerald-400 font-medium'>
                  100% Operational
                </span>
              </div>

              <div className='p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/70 min-w-[140px]'>
                <div className='flex items-center justify-between text-zinc-400 mb-1'>
                  <span className='text-[10px] font-semibold uppercase tracking-wider'>
                    Avg Rating
                  </span>
                  <Sparkles className='w-3.5 h-3.5 text-amber-400' />
                </div>
                <p className='text-xl font-bold text-white font-mono'>
                  ⭐ 4.6 / 5.0
                </p>
                <span className='text-[10px] text-zinc-400 font-medium'>
                  Customer Score
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTROL TOOLBAR - Search, Filters & View Toggle */}
        {/* ========================================================================= */}
        <div className='mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-[#111317]/90 border border-zinc-800/80 backdrop-blur-md shadow-lg shadow-black/20'>
          {/* Search Box */}
          <div className='relative flex-1 min-w-[240px]'>
            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500' />
            <input
              type='text'
              placeholder='Search by branch name, location, or cuisine...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className='w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 transition-all'
            />
            {search && (
              <button
                type='button'
                onClick={() => setSearch('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300'
              >
                <X className='w-3.5 h-3.5' />
              </button>
            )}
          </div>

          {/* Filter Dropdowns & View Mode */}
          <div className='flex items-center flex-wrap gap-2.5'>
            {staticFilter.map((f) => (
              <select
                key={f.label}
                value={f.value}
                onChange={(e) => {
                  f.setter(e.target.value);
                  setPage(1);
                }}
                className='h-9 px-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 outline-none hover:border-zinc-700 focus:border-blue-600 cursor-pointer transition-all'
              >
                <option value=''>{f.label}</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt} className='bg-zinc-900 text-zinc-100'>
                    {opt}
                  </option>
                ))}
              </select>
            ))}

            {(search || cuisine || location || rating) && (
              <button
                type='button'
                onClick={clearFilters}
                className='h-9 px-3 rounded-xl bg-red-950/40 border border-red-800/40 hover:bg-red-900/40 text-red-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer'
              >
                <X className='w-3.5 h-3.5' />
                <span>Reset</span>
              </button>
            )}

            {/* View Mode Toggle (Grid vs Table) */}
            <div className='flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs shadow-xs'>
              <button
                type='button'
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
                title='Grid View'
              >
                <LayoutGrid className='w-4 h-4' />
              </button>
              <button
                type='button'
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
                title='Table View'
              >
                <TableIcon className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className='mb-4 flex items-center justify-between text-xs text-zinc-400 font-medium px-1'>
          <span>
            Displaying <strong className='text-zinc-200'>{restaurants.length}</strong>{' '}
            of <strong className='text-zinc-200'>{total}</strong> properties
          </span>
          <span className='font-mono text-[11px] text-zinc-500'>
            Sorted by: {sortBy} ({sortDir.toUpperCase()})
          </span>
        </div>

        {/* ========================================================================= */}
        {/* CONTENT - GRID VIEW (Executive Cards Matching Sign-in Style) */}
        {/* ========================================================================= */}
        {viewMode === 'grid' && (
          <div>
            {isLoading && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='h-64 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 animate-pulse p-6'
                  />
                ))}
              </div>
            )}

            {!isLoading && restaurants.length === 0 && (
              <div className='p-16 rounded-2xl bg-[#111317]/60 border border-zinc-800/60 text-center space-y-3'>
                <Store className='w-8 h-8 text-zinc-500 mx-auto' />
                <p className='text-sm font-semibold text-zinc-300'>
                  No restaurant outlets found
                </p>
                <p className='text-xs text-zinc-500 max-w-sm mx-auto'>
                  No establishments matched your current search filters. Try
                  resetting your criteria.
                </p>
                <button
                  type='button'
                  onClick={clearFilters}
                  className='mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-all shadow-md shadow-blue-500/20'
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {!isLoading && restaurants.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {restaurants.map((r: Restaurants, idx: number) => (
                  <div
                    key={r.id}
                    onClick={() => router.push(`/restaurants/${r.id}`)}
                    className='group relative rounded-2xl bg-[#111317]/90 border border-zinc-800/80 p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-950/20 hover:-translate-y-1 flex flex-col justify-between'
                  >
                    <div>
                      {/* Top Header Badge & Flag */}
                      <div className='flex items-center justify-between mb-4'>
                        <span className='font-mono text-xs font-bold text-zinc-400 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800'>
                          #0{idx + 1}
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

                      {/* Name & Cuisine */}
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
                      </div>

                      {/* Score / Performance Highlight */}
                      <div className='p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between mb-6'>
                        <div>
                          <p className='text-[10px] uppercase font-semibold tracking-wider text-zinc-400'>
                            Guest Rating
                          </p>
                          <div className='flex items-center gap-1.5 mt-0.5'>
                            <span className='text-sm font-bold text-white font-mono'>
                              {r.rating ? `${r.rating} / 5.0` : '4.6 / 5.0'}
                            </span>
                            <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400' />
                          </div>
                        </div>

                        <span className='text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400'>
                          Active Outlet
                        </span>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className='pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors'>
                      <span>Branch Analytics & Orders</span>
                      <div className='w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all'>
                        <ArrowUpRight className='w-3.5 h-3.5' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTENT - TABLE VIEW (Sleek Executive Table) */}
        {/* ========================================================================= */}
        {viewMode === 'table' && (
          <div className='relative overflow-hidden bg-[#111317]/90 border border-zinc-800/80 rounded-2xl shadow-xl'>
            <table className='w-full text-left border-collapse text-sm'>
              <thead>
                <tr className='border-b border-zinc-800 bg-zinc-900/80'>
                  {[
                    { key: 'name', label: 'Establishment' },
                    { key: 'cuisine', label: 'Cuisine' },
                    { key: 'location', label: 'City Location' },
                    { key: 'rating', label: 'Rating' },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className='px-6 py-4 cursor-pointer select-none group'
                    >
                      <div className='flex items-center gap-2'>
                        <span className='text-[10px] uppercase tracking-widest text-zinc-400 font-bold group-hover:text-white transition-colors'>
                          {label}
                        </span>
                        <div className='flex flex-col text-zinc-600 group-hover:text-zinc-400'>
                          {sortBy === key ? (
                            sortDir === 'asc' ? (
                              <ChevronUp size={12} className='text-blue-400' />
                            ) : (
                              <ChevronDown size={12} className='text-blue-400' />
                            )
                          ) : (
                            <ArrowUpDown size={10} />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className='px-6 py-4 text-right text-[10px] uppercase tracking-widest text-zinc-400 font-bold'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-zinc-800/50'>
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className='animate-pulse'>
                      <td colSpan={5} className='px-6 py-4'>
                        <div className='h-5 bg-zinc-800/50 rounded-lg w-full' />
                      </td>
                    </tr>
                  ))
                ) : restaurants.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-6 py-16 text-center text-zinc-500 italic font-light'
                    >
                      No matching records found in directory.
                    </td>
                  </tr>
                ) : (
                  restaurants.map((r: Restaurants) => (
                    <tr
                      key={r.id}
                      onClick={() => router.push(`/restaurants/${r.id}`)}
                      className='group cursor-pointer hover:bg-zinc-850/50 transition-colors'
                    >
                      <td className='px-6 py-4.5'>
                        <div className='flex items-center gap-3'>
                          {/* Indian Flag Badge */}
                          <div className='w-6 h-4 rounded-full overflow-hidden border border-white/20 shadow-xs flex flex-col shrink-0'>
                            <div className='h-1/3 w-full bg-[#FF9933]' />
                            <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                              <div className='w-0.5 h-0.5 rounded-full bg-[#000080]' />
                            </div>
                            <div className='h-1/3 w-full bg-[#138808]' />
                          </div>
                          <div>
                            <span className='font-bold text-white group-hover:text-blue-400 transition-colors'>
                              {r.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4.5 text-zinc-300 font-medium text-xs'>
                        {r.cuisine}
                      </td>
                      <td className='px-6 py-4.5 text-zinc-400 text-xs'>
                        <div className='flex items-center gap-1.5'>
                          <MapPin size={12} className='text-zinc-500' />
                          {r.location}
                        </div>
                      </td>
                      <td className='px-6 py-4.5'>
                        <div className='flex items-center gap-1 text-zinc-200 text-xs font-semibold'>
                          <span>{r.rating || '4.6'}</span>
                          <Star size={11} className='fill-amber-400 text-amber-400' />
                        </div>
                      </td>
                      <td className='px-6 py-4.5 text-right'>
                        <button
                          type='button'
                          className='inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-blue-600 text-zinc-300 hover:text-white text-xs font-medium transition-all'
                        >
                          <span>Analytics</span>
                          <ArrowUpRight className='w-3 h-3' />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGINATION CONTROLS */}
        {/* ========================================================================= */}
        <div className='mt-8 flex items-center justify-between text-xs'>
          <div className='text-zinc-400 font-medium font-mono'>
            Page <span className='text-white font-bold'>{page}</span> of{' '}
            <span className='text-white font-bold'>{lastPage}</span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
              className='h-9 px-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all shadow-xs cursor-pointer'
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>
            <button
              type='button'
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page === lastPage || isLoading}
              className='h-9 px-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all shadow-xs cursor-pointer'
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
