'use client';

import { useState } from 'react';
import { useOrdersAnalytics } from '@/hooks/useOrdersAnalytics';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FilterX,
  Clock,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { Order } from '@/types/analytics';

const STATUS_CONFIG: Record<number, { label: string; class: string }> = {
  0: {
    label: 'Voided',
    class: 'bg-red-950/60 text-red-400 border-red-800/50',
  },
  1: {
    label: 'Settled',
    class: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
  },
  2: {
    label: 'Pending',
    class: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
  },
  3: {
    label: 'Processing',
    class: 'bg-blue-950/60 text-blue-400 border-blue-800/50',
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
    per_page: 12,
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
    const defaultQuery = {
      restaurant_id: lockedRestaurantId ?? '',
      start_date: '',
      end_date: '',
      min_amount: '',
      max_amount: '',
      hour_from: '',
      hour_to: '',
      page: 1,
      per_page: 12,
    };
    setQuery(defaultQuery);
    setDraftQuery(defaultQuery);
  };

  const handleApply = () => {
    setQuery(draftQuery);
  };

  return (
    <div className='bg-[#111317]/90 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md'>
      {/* Filters Toolbar */}
      <div className='p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex flex-wrap gap-4 items-end'>
        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-400 font-bold'>
            <Calendar size={12} className='text-blue-400' />
            <span>Date Range</span>
          </label>
          <div className='flex gap-2'>
            <input
              type='date'
              value={draftQuery.start_date}
              onChange={(e) => updateQuery('start_date', e.target.value)}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 outline-none focus:border-blue-600 transition'
            />
            <input
              type='date'
              value={draftQuery.end_date}
              onChange={(e) => updateQuery('end_date', e.target.value)}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 outline-none focus:border-blue-600 transition'
            />
          </div>
        </div>

        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-400 font-bold'>
            <span className='font-mono font-bold text-emerald-400'>₹</span>
            <span>Amount Window</span>
          </label>
          <div className='flex gap-2'>
            <input
              type='number'
              placeholder='Min ₹'
              value={draftQuery.min_amount}
              onChange={(e) => updateQuery('min_amount', e.target.value)}
              className='w-24 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 outline-none focus:border-blue-600 transition'
            />
            <input
              type='number'
              placeholder='Max ₹'
              value={draftQuery.max_amount}
              onChange={(e) => updateQuery('max_amount', e.target.value)}
              className='w-24 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 outline-none focus:border-blue-600 transition'
            />
          </div>
        </div>

        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-400 font-bold'>
            <Clock size={12} className='text-amber-400' />
            <span>Hour Range</span>
          </label>
          <div className='flex gap-1.5 items-center'>
            <input
              type='number'
              min={0}
              max={23}
              placeholder='00'
              value={draftQuery.hour_from}
              onChange={(e) => updateQuery('hour_from', e.target.value)}
              className='w-14 bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 text-center outline-none focus:border-blue-600 transition'
            />
            <span className='text-zinc-600 text-xs'>—</span>
            <input
              type='number'
              min={0}
              max={23}
              placeholder='23'
              value={draftQuery.hour_to}
              onChange={(e) => updateQuery('hour_to', e.target.value)}
              className='w-14 bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 text-center outline-none focus:border-blue-600 transition'
            />
          </div>
        </div>

        <div className='flex items-center gap-2 ml-auto'>
          <button
            type='button'
            onClick={handleApply}
            className='h-8.5 px-4 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#1569d6] rounded-xl flex items-center gap-1.5 transition-all shadow-sm shadow-blue-500/20 cursor-pointer'
          >
            <Check size={13} />
            <span>Apply</span>
          </button>

          <button
            type='button'
            onClick={resetLedger}
            className='flex items-center gap-1.5 h-8.5 px-3.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all cursor-pointer'
          >
            <FilterX size={13} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse text-sm'>
          <thead>
            <tr className='bg-zinc-900/80 border-b border-zinc-800/80'>
              {['Order ID', 'Merchant Unit', 'Gross Amount', 'Status', 'Timestamp'].map((h) => (
                <th
                  key={h}
                  className='px-6 py-3.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-zinc-800/50'>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className='animate-pulse'>
                  <td colSpan={5} className='px-6 py-4'>
                    <div className='h-4.5 bg-zinc-800/50 rounded-lg w-full' />
                  </td>
                </tr>
              ))
            ) : transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-6 py-16 text-center text-zinc-500 text-xs italic'
                >
                  No transaction records found matching the filter criteria.
                </td>
              </tr>
            ) : (
              transactions.map((record: Order) => {
                const dateObj = record.ordered_at
                  ? new Date(record.ordered_at)
                  : null;
                const status = STATUS_CONFIG[record.status] || {
                  label: 'Unknown',
                  class: 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50',
                };

                return (
                  <tr
                    key={record.id}
                    className='group hover:bg-zinc-800/30 transition-colors'
                  >
                    <td className='px-6 py-4 text-xs font-mono font-semibold text-zinc-400 group-hover:text-blue-400 transition-colors'>
                      #{record.id}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1.5'>
                        <span className='text-xs font-bold text-zinc-200'>
                          {record.restaurant?.name || 'Central Kitchen'}
                        </span>
                        <ArrowUpRight
                          size={11}
                          className='text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity'
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4 text-xs font-bold text-white font-mono'>
                      ₹{' '}
                      {Number(record.order_amount).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${status.class}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='text-xs text-zinc-300 font-mono'>
                          {dateObj ? dateObj.toLocaleDateString('en-IN') : '—'}
                        </span>
                        <span className='text-[10px] text-zinc-500 font-mono'>
                          {dateObj
                            ? `${dateObj.getUTCHours().toString().padStart(2, '0')}:${dateObj.getUTCMinutes().toString().padStart(2, '0')} UTC`
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
        <footer className='px-6 py-3.5 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between text-xs'>
          <span className='text-[10px] uppercase tracking-widest text-zinc-400 font-bold'>
            Showing{' '}
            <span className='text-white font-mono'>
              {meta.from}–{meta.to}
            </span>{' '}
            of <span className='text-white font-mono'>{totalCount}</span> orders
          </span>

          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1.5'>
              <button
                type='button'
                onClick={() => setQuery((p) => ({ ...p, page: p.page - 1 }))}
                disabled={query.page <= 1}
                className='h-8 px-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition'
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type='button'
                onClick={() => setQuery((p) => ({ ...p, page: p.page + 1 }))}
                disabled={query.page >= pageCount}
                className='h-8 px-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition'
              >
                <ChevronRight size={14} />
              </button>
            </div>
            <span className='text-[11px] text-zinc-400 font-mono'>
              Page {query.page} / {pageCount}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
