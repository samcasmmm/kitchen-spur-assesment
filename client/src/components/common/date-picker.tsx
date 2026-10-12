'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { formatDate, formatDisplayDate } from '@/lib/utils';

type Dates = {
  startDate: string;
  endDate: string;
};

type Props = {
  date: Dates;
  setDates: React.Dispatch<React.SetStateAction<Dates>>;
};

export default function DatePicker({ date, setDates }: Props) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: date?.startDate ? new Date(date?.startDate) : undefined,
    to: date?.endDate ? new Date(date?.endDate) : undefined,
  }));

  // Keep internal range in sync if external date changes (e.g. from presets)
  useEffect(() => {
    if (date?.startDate && date?.endDate) {
      setRange({
        from: new Date(date.startDate),
        to: new Date(date.endDate),
      });
    }
  }, [date?.startDate, date?.endDate]);

  const handleApply = () => {
    if (!range?.from || !range?.to) return;

    setDates({
      startDate: formatDate(range.from),
      endDate: formatDate(range.to),
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type='button'
          className='h-9 px-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 hover:text-white flex items-center gap-2.5 transition-all shadow-xs cursor-pointer select-none'
        >
          <CalendarIcon className='w-3.5 h-3.5 text-blue-400' />
          <span className='font-medium font-mono'>
            {range?.from && range?.to
              ? `${formatDisplayDate(range.from)} — ${formatDisplayDate(range.to)}`
              : 'Select dates'}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        className='w-auto p-3 bg-[#111317] border border-zinc-800 rounded-2xl shadow-2xl text-zinc-100'
      >
        <div className='p-1'>
          <p className='text-xs font-semibold text-zinc-300 mb-2 px-1 flex items-center justify-between'>
            <span>Select Custom Range</span>
            <span className='text-[10px] text-zinc-500 font-normal font-mono'>
              {range?.from ? formatDisplayDate(range.from) : '...'} →{' '}
              {range?.to ? formatDisplayDate(range.to) : '...'}
            </span>
          </p>
          <Calendar
            mode='range'
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            className='rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-2'
          />
          <div className='mt-3 flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setOpen(false)}
              className='h-8 px-3 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg'
            >
              Cancel
            </Button>
            <Button
              size='sm'
              disabled={!range?.from || !range?.to}
              onClick={handleApply}
              className='h-8 px-3.5 text-xs font-semibold bg-[#1877F2] hover:bg-[#1569d6] text-white rounded-lg shadow-sm shadow-blue-500/20 disabled:opacity-50'
            >
              <Check className='w-3.5 h-3.5 mr-1' />
              Apply Range
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
