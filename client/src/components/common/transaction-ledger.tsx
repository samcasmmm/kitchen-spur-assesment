'use client';

import { useState } from 'react';
import { useOrdersAnalytics } from '@/hooks/useOrdersAnalytics';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FilterX,
  Clock,
  CircleDollarSign,
  ArrowUpRight,
} from 'lucide-react';
import { Order } from '@/types/analytics';

const STATUS_CONFIG: Record<number, { label: string; class: string }> = {
  0: { label: 'Voided', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
  1: {
    label: 'Settled',
    class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  2: {
    label: 'Pending',
    class: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  3: {
    label: 'Processing',
    class: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
};

interface TransactionLedgerProps {
  lockedRestaurantId?: string | number | null;
}

export default function TransactionLedger({
  lockedRestaurantId,
}: TransactionLedgerProps) {
  const [query, setQuery] = useState({
    restaurant_id: lockedRestaurantId ?? '',
    start_date: '',
    end_date: '',
    min_amount: '',
    max_amount: '',
    hour_from: '',
    hour_to: '',
    page: 1,
    per_page: 15,
  });
  const [draftQuery, setDraftQuery] = useState(query);
  const { data, isLoading } = useOrdersAnalytics(query);

  const transactions = data?.data ?? [];
  const meta = data?.meta ?? {};
  const totalCount = meta.total ?? 0;
  const pageCount = meta.last_page ?? 1;

  const updateQuery = (key: string, value: string | number) => {
    setDraftQuery((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const resetLedger = () => {
    setQuery({
      restaurant_id: lockedRestaurantId ?? '',
      start_date: '',
      end_date: '',
      min_amount: '',
      max_amount: '',
      hour_from: '',
      hour_to: '',
      page: 1,
      per_page: 15,
    });
    setDraftQuery({
      restaurant_id: lockedRestaurantId ?? '',
      start_date: '',
      end_date: '',
      min_amount: '',
      max_amount: '',
      hour_from: '',
      hour_to: '',
      page: 1,
      per_page: 15,
    });
  };
  const handleApply = () => {
    setQuery(draftQuery);
  };

  return (
    <div className='bg-zinc-900/20 border border-white/5 rounded-sm overflow-hidden backdrop-blur-md'>
      <div className='p-5 border-b border-white/5 bg-zinc-900/40 flex flex-wrap gap-5 items-end'>
        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold'>
            <Calendar size={12} /> Date Range
          </label>
          <div className='flex gap-2'>
            <input
              type='date'
              value={draftQuery.start_date}
              onChange={(e) => updateQuery('start_date', e.target.value)}
              className='bg-zinc-950 border border-white/10 rounded-sm px-3 py-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 transition'
            />
            <input
              type='date'
              value={draftQuery.end_date}
              onChange={(e) => updateQuery('end_date', e.target.value)}
              className='bg-zinc-950 border border-white/10 rounded-sm px-3 py-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 transition'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold'>
            <CircleDollarSign size={12} /> Amount
          </label>
          <div className='flex gap-2'>
            <input
              type='number'
              placeholder='Min'
              value={draftQuery.min_amount}
              onChange={(e) => updateQuery('min_amount', e.target.value)}
              className='w-24 bg-zinc-950 border border-white/10 rounded-sm px-3 py-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 transition'
            />
            <input
              type='number'
              placeholder='Max'
              value={draftQuery.max_amount}
              onChange={(e) => updateQuery('max_amount', e.target.value)}
              className='w-24 bg-zinc-950 border border-white/10 rounded-sm px-3 py-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 transition'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold'>
            <Clock size={12} /> Hour Window
          </label>
          <div className='flex gap-2'>
            <input
              type='number'
              min={0}
              max={23}
              placeholder='00'
              value={draftQuery.hour_from}
              onChange={(e) => updateQuery('hour_from', e.target.value)}
              className='w-16 bg-zinc-950 border border-white/10 rounded-sm px-3 py-2 text-xs text-zinc-200 text-center outline-none focus:border-zinc-500 transition'
            />
            <span className='self-center text-zinc-700'>—</span>
            <input
              type='number'
              min={0}
              max={23}
              placeholder='23'
              value={draftQuery.hour_to}
              onChange={(e) => updateQuery('hour_to', e.target.value)}
              className='w-16 bg-zinc-950 border border-white/10 rounded-sm px-3 py-2 text-xs text-zinc-200 text-center outline-none focus:border-zinc-500 transition'
            />
          </div>
        </div>

        <div className='flex items-center gap-2 ml-auto'>
          <button
            onClick={handleApply}
            className='h-9 px-4 text-[10px] uppercase tracking-widest text-zinc-100 bg-white/10 hover:bg-white/20 border border-white/10 rounded-sm'
          >
            Apply
          </button>

          <button
            onClick={resetLedger}
            className='flex items-center gap-2 h-9 px-4 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-100 border border-white/5 rounded-sm'
          >
            <FilterX size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-zinc-900/50'>
              {['ID', 'Merchant', 'Gross', 'Status', 'Timestamp'].map((h) => (
                <th
                  key={h}
                  className='px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-white/2'>
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className='animate-pulse'>
                  <td colSpan={5} className='px-6 py-5'>
                    <div className='h-6 bg-zinc-800 rounded-sm w-full' />
                  </td>
                </tr>
              ))
            ) : transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-6 py-20 text-center text-zinc-600 text-xs italic'
                >
                  No transaction records found matching the criteria.
                </td>
              </tr>
            ) : (
              transactions.map((record: Order) => {
                const dateObj = record.ordered_at
                  ? new Date(record.ordered_at)
                  : null;
                const status = STATUS_CONFIG[record.status] || {
                  label: 'Unknown',
                  class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
                };

                return (
                  <tr
                    key={record.id}
                    className='group hover:bg-white/2 transition-colors'
                  >
                    <td className='px-6 py-4 text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400'>
                      #{record.id}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs font-medium text-zinc-200'>
                          {record.restaurant?.name || 'Unspecified'}
                        </span>
                        <ArrowUpRight
                          size={10}
                          className='text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity'
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4 text-xs font-semibold text-zinc-100'>
                      ₹
                      {Number(record.order_amount).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${status.class}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='text-xs text-zinc-400'>
                          {dateObj ? dateObj.toLocaleDateString('en-IN') : '—'}
                        </span>
                        <span className='text-[10px] text-zinc-600'>
                          {dateObj
                            ? `${dateObj.getUTCHours().toString().padStart(2, '0')}:00 UTC`
                            : '—'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && totalCount > 0 && (
        <footer className='px-6 py-4 border-t border-white/5 bg-zinc-900/40 flex items-center justify-between'>
          <span className='text-[10px] uppercase tracking-widest text-zinc-500 font-bold'>
            Record{' '}
            <span className='text-zinc-200'>
              {meta.from}–{meta.to}
            </span>{' '}
            of <span className='text-zinc-200'>{totalCount}</span>
          </span>

          <div className='flex items-center gap-4'>
            <div className='flex gap-1'>
              <button
                onClick={() => setQuery((p) => ({ ...p, page: p.page - 1 }))}
                disabled={query.page <= 1}
                className='p-2 rounded-sm border border-white/5 text-zinc-400 hover:bg-white/5 disabled:opacity-20 transition'
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setQuery((p) => ({ ...p, page: p.page + 1 }))}
                disabled={query.page >= pageCount}
                className='p-2 rounded-sm border border-white/5 text-zinc-400 hover:bg-white/5 disabled:opacity-20 transition'
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <span className='text-[10px] uppercase tracking-widest text-zinc-600'>
              Page {query.page} <span className='mx-1 text-zinc-800'>/</span>{' '}
              {pageCount}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
