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
import { Clock } from 'lucide-react';

interface PeakHourDataPoint {
  date: string;
  peak_hour: number;
  order_count: number;
}

interface TemporalPeakVisualizerProps {
  timeseriesData?: PeakHourDataPoint[];
}

export default function TemporalPeakVisualizer({
  timeseriesData = [],
}: TemporalPeakVisualizerProps) {
  // Identify the highest order count to highlight the absolute peak
  const absoluteMaxOrders = Math.max(
    ...timeseriesData.map((d) => d.order_count),
    0,
  );

  return (
    <div className='bg-[#111317]/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 group'>
      {/* Header Section */}
      <header className='flex items-center justify-between mb-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='p-1.5 rounded-lg bg-amber-950/60 border border-amber-800/50 text-amber-400'>
              <Clock size={13} />
            </div>
            <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
              Temporal Analysis
            </h3>
          </div>
          <p className='text-base font-bold text-white tracking-tight'>
            Peak Demand Windows
          </p>
        </div>

        <span className='text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400'>
          24h Hourly Distribution
        </span>
      </header>

      {timeseriesData.length === 0 ? (
        <div className='h-[220px] flex flex-col items-center justify-center space-y-2'>
          <div className='h-px w-8 bg-zinc-800' />
          <p className='text-[11px] uppercase tracking-widest text-zinc-500 font-medium'>
            Awaiting Traffic Data
          </p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={220}>
          <BarChart
            data={timeseriesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
              domain={[0, 23]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickFormatter={(h) => `${h}:00`}
            />

            <Tooltip
              cursor={{ fill: 'rgba(245, 158, 11, 0.05)', radius: 8 }}
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
              formatter={(value, _name, item) => [
                `${value}:00 (${(item as { payload?: { order_count?: number } })?.payload?.order_count ?? 0} orders)`,
                'Peak Hour',
              ]}
            />

            <Bar dataKey='peak_hour' radius={[6, 6, 0, 0]} barSize={18}>
              {timeseriesData.map((entry, idx) => {
                const isAbsolutePeak = entry.order_count === absoluteMaxOrders;
                return (
                  <Cell
                    key={`cell-${idx}`}
                    fill={isAbsolutePeak ? '#f59e0b' : '#3b82f6'}
                    className='transition-all duration-300'
                    style={{
                      filter: isAbsolutePeak
                        ? 'drop-shadow(0 0 10px rgba(245,158,11,0.5))'
                        : 'none',
                    }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
