'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { DollarSign } from 'lucide-react';

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

interface RevenueStreamVisualizerProps {
  timeseriesData?: RevenueDataPoint[];
}

export default function RevenueStreamVisualizer({
  timeseriesData = [],
}: RevenueStreamVisualizerProps) {
  return (
    <div className='bg-[#111317]/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 group'>
      <header className='flex items-center justify-between mb-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400'>
              <DollarSign size={13} />
            </div>
            <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
              Financial Flow
            </h3>
          </div>
          <p className='text-base font-bold text-white tracking-tight'>
            Daily Revenue Stream
          </p>
        </div>

        <span className='text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400'>
          INR (₹) Gross
        </span>
      </header>

      {timeseriesData.length === 0 ? (
        <div className='h-[220px] flex flex-col items-center justify-center space-y-2'>
          <div className='h-px w-8 bg-zinc-800' />
          <p className='text-[11px] uppercase tracking-widest text-zinc-500 font-medium'>
            No Revenue Records
          </p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={220}>
          <BarChart
            data={timeseriesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <defs>
              <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#3b82f6' stopOpacity={0.95} />
                <stop offset='100%' stopColor='#1d4ed8' stopOpacity={0.25} />
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
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip
              cursor={{ fill: 'rgba(59, 130, 246, 0.06)', radius: 8 }}
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
              formatter={(val) => [
                `₹ ${Number(val || 0).toLocaleString('en-IN')}`,
                'Revenue',
              ]}
            />

            <Bar
              dataKey='revenue'
              fill='url(#barGradient)'
              radius={[6, 6, 0, 0]}
              barSize={18}
              animationDuration={1400}
            >
              {timeseriesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className='hover:opacity-100 opacity-90 transition-opacity duration-300'
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}