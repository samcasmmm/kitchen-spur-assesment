'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RevenueMetricsChartProps {
  timeseriesData?: { date: string; count: number }[];
}

export default function RevenueMetricsChart({
  timeseriesData = [],
}: RevenueMetricsChartProps) {
  return (
    <div className='bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm transition-all hover:border-white/10 group'>
      {/* Visual Indicator & Header */}
      <header className='flex items-center justify-between mb-8'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='h-1.5 w-1.5 rounded-full bg-zinc-500 group-hover:bg-white transition-colors duration-500' />
            <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500'>
              Volume Analysis
            </h3>
          </div>
          <p className='text-sm font-medium text-zinc-100 tracking-tight'>
            Daily Transaction Flow
          </p>
        </div>
      </header>

      {timeseriesData.length === 0 ? (
        <div className='h-[220px] flex flex-col items-center justify-center space-y-2'>
          <div className='h-px w-8 bg-zinc-800' />
          <p className='text-[10px] uppercase tracking-widest text-zinc-600 font-medium'>
            Empty Dataset
          </p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={220}>
          <LineChart
            data={timeseriesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Elegant White-to-Transparent Gradient */}
            <defs>
              <linearGradient id='lineStroke' x1='0' y1='0' x2='1' y2='0'>
                <stop offset='0%' stopColor='#3f3f46' />
                <stop offset='100%' stopColor='#ffffff' />
              </linearGradient>
            </defs>

            {/* Subtle horizontal-only grid */}
            <CartesianGrid
              vertical={false}
              stroke='#27272a'
              strokeDasharray='6 6'
            />

            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#52525b', fontWeight: 500 }}
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
              tick={{ fontSize: 10, fill: '#52525b' }}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{
                stroke: '#3f3f46',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
              contentStyle={{
                backgroundColor: '#09090b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                fontSize: '11px',
                padding: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
              itemStyle={{ color: '#ffffff', fontWeight: 600, padding: 0 }}
              labelStyle={{
                color: '#71717a',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '9px',
              }}
              formatter={(val: number) => [val, 'Units']}
            />

            <Line
              type='monotone'
              dataKey='count'
              stroke='url(#lineStroke)'
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: '#ffffff',
                stroke: '#09090b',
                strokeWidth: 2,
              }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
