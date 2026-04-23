"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm transition-all hover:border-white/10 group">
      <header className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 group-hover:bg-white transition-colors duration-500" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
              Financial Flow
            </h3>
          </div>
          <p className="text-sm font-medium text-zinc-100 tracking-tight">Daily Revenue Stream</p>
        </div>
      </header>

      {timeseriesData.length === 0 ? (
        <div className="h-[220px] flex flex-col items-center justify-center space-y-2">
          <div className="h-px w-8 bg-zinc-800" />
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
            No Revenue Records
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={timeseriesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#27272a" strokeDasharray="6 6" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#52525b", fontWeight: 500 }}
              tickFormatter={(val) => {
                const dateObj = new Date(val);
                return dateObj.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#52525b" }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.03)", radius: 8 }}
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #27272a",
                borderRadius: "12px",
                fontSize: "11px",
                padding: "12px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
              itemStyle={{ color: "#ffffff", fontWeight: 600, padding: 0 }}
              labelStyle={{
                color: "#71717a",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "9px",
              }}
              formatter={(val: number) => [`₹${val.toLocaleString("en-IN")}`, "Revenue"]}
            />

            <Bar
              dataKey="revenue"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              barSize={18}
              animationDuration={1500}
            >
              {timeseriesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover:opacity-100 opacity-80 transition-opacity duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}