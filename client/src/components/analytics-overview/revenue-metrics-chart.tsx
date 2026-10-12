'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ShoppingBag } from 'lucide-react';

interface RevenueMetricsChartProps {
  timeseriesData?: { date: string; count: number }[];
}

export default function RevenueMetricsChart({
  timeseriesData = [],
}: RevenueMetricsChartProps) {
  return (
    <div className='bg-[#111317]/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 group'>
      {/* Visual Indicator & Header */}
      <header className='flex items-center justify-between mb-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='p-1.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-400'>
              <ShoppingBag size={13} />
            </div>
            <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
              Volume Analysis
            </h3>
          </div>
          <p className='text-base font-bold text-white tracking-tight'>
            Daily Transaction Flow
          </p>
        </div>

        <span className='text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-400'>
          Order Units
        </span>
      </header>

      {timeseriesData.length === 0 ? (
        <div className='h-[220px] flex flex-col items-center justify-center space-y-2'>
          <div className='h-px w-8 bg-zinc-800' />
          <p className='text-[11px] uppercase tracking-widest text-zinc-500 font-medium'>
            Awaiting Transaction Records
          </p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={220}>
          <AreaChart
            data={timeseriesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id='volumeArea' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#2563eb' stopOpacity={0.35} />
                <stop offset='100%' stopColor='#2563eb' stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id='volumeStroke' x1='0' y1='0' x2='1' y2='0'>
                <stop offset='0%' stopColor='#38bdf8' />
                <stop offset='100%' stopColor='#2563eb' />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke='#27272a'
              strokeDasharray='4 4'
            />

            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#71717a', fontWeight: 500 }}
              tickFormatter={(val) => {
                const dateObj = new Date(val);
                return dateObj.toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                });
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#71717a' }}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{
                stroke: '#3b82f6',
                strokeWidth: 1,
                strokeDasharray: '3 3',
              }}
              contentStyle={{
                backgroundColor: '#111317',
                border: '1px solid #27272a',
                borderRadius: '14px',
                fontSize: '11px',
                padding: '12px 14px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
              }}
              itemStyle={{ color: '#ffffff', fontWeight: 700, padding: 0 }}
              labelStyle={{
                color: '#a1a1aa',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '9px',
              }}
              formatter={(val: number) => [`${val} orders`, 'Volume']}
            />

            <Area
              type='monotone'
              dataKey='count'
              stroke='url(#volumeStroke)'
              strokeWidth={2.5}
              fill='url(#volumeArea)'
              activeDot={{
                r: 4.5,
                fill: '#ffffff',
                stroke: '#2563eb',
                strokeWidth: 2,
              }}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
