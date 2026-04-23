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
  Utensils,
  Star,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  const { data, isLoading } = useRestaurantsList(params as RestaurantsParams);

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
      label: 'Cuisine',
      options: ['North Indian', 'Japanese', 'Italian', 'American'],
    },
    {
      value: location,
      setter: setLocation,
      label: 'Location',
      options: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'],
    },
  ];

  return (
    <main className='min-h-screen bg-zinc-950 text-zinc-300 selection:bg-zinc-100 selection:text-zinc-900'>
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <header className='mb-10 space-y-2 mt-4'>
          <div className='flex items-center gap-2 text-zinc-500'>
            <Utensils size={14} />
            <span className='text-[10px] uppercase tracking-[0.2em] font-bold'>
              Directory
            </span>
          </div>
          <h1 className='text-3xl font-medium tracking-tight text-zinc-100'>
            Establishments
          </h1>
          <p className='text-zinc-500 text-sm font-light'>
            Manage and analyze your restaurant portfolio.
          </p>
        </header>

        <div className='flex flex-col lg:flex-row gap-4 mb-8'>
          <div className='relative flex-1 group'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-zinc-300 transition-colors' />
            <Input
              placeholder='Search directory...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className='pl-10 bg-zinc-900/40 border-white/5 text-zinc-200 placeholder:text-zinc-700 h-10 rounded-sm focus-visible:ring-1 focus-visible:ring-zinc-700'
            />
          </div>

          <div className='flex gap-3 flex-wrap'>
            {staticFilter.map((filter) => (
              <select
                key={filter.label}
                value={filter.value}
                onChange={(e) => {
                  filter.setter(e.target.value);
                  setPage(1);
                }}
                className='bg-zinc-900/40 border border-white/5 text-zinc-400 text-xs px-5 py-2 rounded-sm outline-none focus:border-zinc-700 transition-all hover:bg-zinc-900/60'
              >
                <option value=''>{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ))}

            <Button
              variant='ghost'
              onClick={clearFilters}
              className='text-zinc-500 hover:text-zinc-200 text-[11px] uppercase tracking-widest px-4 h-10 rounded-sm'
            >
              <X size={14} className='mr-2' />
              Reset
            </Button>
          </div>
        </div>

        <div className='flex items-center justify-between mb-4'>
          <p className='text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-bold'>
            Total Results: <span className='text-zinc-400'>{total}</span>
          </p>
        </div>

        <div className='relative overflow-hidden bg-zinc-900/20 border border-white/5 rounded-sm'>
          <table className='w-full text-left border-collapse text-sm'>
            <thead>
              <tr className='border-b border-white/5 bg-zinc-900/40'>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'cuisine', label: 'Cuisine' },
                  { key: 'location', label: 'Location' },
                  { key: 'rating', label: 'Rating' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className='px-6 py-4 cursor-pointer select-none group'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-[10px] uppercase tracking-widest text-zinc-500 font-bold group-hover:text-zinc-300 transition-colors'>
                        {label}
                      </span>
                      <div className='flex flex-col text-zinc-700 group-hover:text-zinc-500'>
                        {sortBy === key ? (
                          sortDir === 'asc' ? (
                            <ChevronUp size={12} />
                          ) : (
                            <ChevronDown size={12} />
                          )
                        ) : (
                          <ArrowUpDown size={10} />
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-white/2'>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className='animate-pulse'>
                    <td colSpan={4} className='px-6 py-4'>
                      <div className='h-4 bg-zinc-900 rounded-sm w-full' />
                    </td>
                  </tr>
                ))
              ) : restaurants.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className='px-6 py-20 text-center text-zinc-600 italic font-light'
                  >
                    No matching records found in the directory.
                  </td>
                </tr>
              ) : (
                restaurants.map((r: Restaurants) => (
                  <tr
                    key={r.id}
                    onClick={() => router.push(`/restaurants/${r.id}`)}
                    className='group cursor-pointer hover:bg-zinc-900/60 transition-all duration-200'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='text-zinc-100 font-medium tracking-tight group-hover:text-white'>
                          {r.name}
                        </span>
                        <span className='text-[10px] text-zinc-600 md:hidden'>
                          {r.cuisine}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-zinc-500 font-light'>
                      {r.cuisine}
                    </td>
                    <td className='px-6 py-4 text-zinc-500'>
                      <div className='flex items-center gap-1.5 font-light'>
                        <MapPin size={12} className='text-zinc-700' />
                        {r.location}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      {r.rating ? (
                        <div className='flex items-center gap-1 text-zinc-300'>
                          <span className='text-xs font-medium'>
                            {r.rating}
                          </span>
                          <Star
                            size={10}
                            className='fill-zinc-500 text-zinc-500'
                          />
                        </div>
                      ) : (
                        <span className='text-zinc-700'>—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='mt-8 flex items-center justify-between'>
          <div className='text-[10px] uppercase tracking-widest text-zinc-600 font-bold'>
            Page {page} of {lastPage}
          </div>

          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
              className='bg-transparent border-white/5 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-sm h-9 cursor-pointer'
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page === lastPage || isLoading}
              className='bg-transparent border-white/5 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-sm h-9 cursor-pointer'
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
