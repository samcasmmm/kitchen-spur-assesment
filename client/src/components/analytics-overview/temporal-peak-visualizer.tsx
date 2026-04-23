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
    <div className='bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm transition-all hover:border-white/10 group'>
      {/* Header Section */}
      <header className='flex items-center justify-between mb-8'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='h-1.5 w-1.5 rounded-full bg-zinc-500 group-hover:bg-white transition-colors duration-500' />
            <h3 className='text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500'>
              Temporal Analysis
            </h3>
          </div>
          <p className='text-sm font-medium text-zinc-100 tracking-tight'>
            Peak Demand Windows
          </p>
        </div>
      </header>

      {timeseriesData.length === 0 ? (
        <div className='h-55 flex flex-col items-center justify-center space-y-2'>
          <div className='h-px w-8 bg-zinc-800' />
          <p className='text-[10px] uppercase tracking-widest text-zinc-600 font-medium'>
            Awaiting Traffic Data
          </p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={220}>
          <BarChart
            data={timeseriesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Dark Mode Grid */}
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
              domain={[0, 23]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#52525b' }}
              tickFormatter={(h) => `${h}:00`}
            />

            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.03)', radius: 8 }}
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
              formatter={(value: number, _name: string, props: any) => [
                `${value}:00 (${props.payload.order_count} units)`,
                'Peak Hour',
              ]}
            />

            <Bar dataKey='peak_hour' radius={[4, 4, 4, 4]} barSize={16}>
              {timeseriesData.map((entry, idx) => {
                const isAbsolutePeak = entry.order_count === absoluteMaxOrders;
                return (
                  <Cell
                    key={`cell-${idx}`}
                    fill={isAbsolutePeak ? '#ffffff' : '#27272a'}
                    className='transition-all duration-500 cursor-crosshair'
                    style={{
                      filter: isAbsolutePeak
                        ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
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
