'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
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
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: date?.startDate ? new Date(date?.startDate) : undefined,
    to: date?.endDate ? new Date(date?.endDate) : undefined,
  }));

  return (
    <div className='flex items-center justify-between gap-3 p-2 bg-zinc-900/40 rounded-sm border border-white/5 backdrop-blur-sm text-white'>
      <div className='space-y-1.5 px-2'>
        <label className='text-[9px] uppercase tracking-widest text-zinc-600 font-bold mx-2'>
          Duration
        </label>

        <Popover>
          <PopoverTrigger asChild className='cursor-pointer rounded-sm'>
            <Button
              variant='ghost'
              className='text-xs text-zinc-300 hover:text-white'
            >
              {range?.from && range?.to
                ? `${formatDisplayDate(range.from)} — ${formatDisplayDate(range.to)}`
                : 'Select date range'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className='w-auto p-0 bg-zinc-900 border border-white/10'>
            <Calendar
              mode='range'
              selected={range}
              onSelect={setRange}
              numberOfMonths={1}
              className='rounded-md'
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        size='sm'
        onClick={() => {
          if (!range?.from || !range?.to) return;

          setDates({
            startDate: formatDate(range.from),
            endDate: formatDate(range.to),
          });
        }}
        className='bg-zinc-100 text-zinc-950 hover:bg-white rounded-sm h-9 px-4 transition-all active:scale-95 cursor-pointer'
      >
        <Filter size={14} className='mr-2' />
        Apply
      </Button>
    </div>
  );
}
