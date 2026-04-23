'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';

import { useRestaurantAnalyticsSummary } from '@/hooks/useRestaurantAnalyticsSummary';

import RevenueMetricsChart from '@/components/analytics-overview/revenue-metrics-chart';
import RevenueStreamVisualizer from '@/components/analytics-overview/revenue-stream-visualizer';
import OperationalValueMetric from '@/components/analytics-overview/operational-value-metric';
import TemporalPeakVisualizer from '@/components/analytics-overview/temporal-peak-visualizer';
import TransactionLedger from '@/components/common/transaction-ledger';
import { getDefaultDateRange } from '@/lib/utils';
import DatePicker from '@/components/common/date-picker';

export default function RestaurantAnalytics({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [dates, setDates] = useState(getDefaultDateRange);

  const hookParams = {
    restaurantId: Number(id),
    startDate: dates.startDate,
    endDate: dates.endDate,
  };
  const { data, isLoading, isError } =
    useRestaurantAnalyticsSummary(hookParams);

  if (isError) {
    return (
      <div className='min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 font-medium mb-2'>
            Restaurant not found or failed to load.
          </p>
          <button
            onClick={() => router.push('/restaurants')}
            className='text-sm text-gray-500 underline'
          >
            ← Back to restaurants
          </button>
        </div>
      </div>
    );
  }

  const restaurant = data?.restaurant;

  return (
    <main className='max-w-6xl mx-auto px-6 py-10 border-t border-transparent mt-4'>
      <div className='mb-6 flex items-center gap-3'>
        <button
          onClick={() => router.push('/restaurants')}
          className='text-sm text-gray-300 hover:text-gray-100 transition'
        >
          ← Restaurants
        </button>
        <span className='text-zinc-400'>/</span>
        <span className='text-sm font-medium text-gray-300'>
          {isLoading ? '…' : restaurant?.name}
        </span>
      </div>

      <div className='mb-8 flex flex-col sm:flex-row sm:items-end gap-4'>
        <div>
          {isLoading ? (
            <div className='h-6 w-48 bg-gray-200 rounded animate-pulse' />
          ) : (
            <>
              <h2 className='text-xl font-semibold text-gray-200'>
                {restaurant?.name}
              </h2>
              <p className='text-sm text-gray-500 mt-0.5'>
                {restaurant?.cuisine} · {restaurant?.location}
                {restaurant?.rating ? ` · ⭐ ${restaurant.rating}` : ''}
              </p>
            </>
          )}
        </div>

        <div className='sm:ml-auto flex flex-wrap items-end gap-3'>
          <DatePicker date={dates} setDates={setDates} />
        </div>
      </div>

      {isLoading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='bg-white rounded-sm border border-gray-200 p-5 h-56 animate-pulse'
            />
          ))}
        </div>
      )}

      {!isLoading && data && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
            <RevenueMetricsChart timeseriesData={data.daily_orders} />
            <RevenueStreamVisualizer timeseriesData={data.daily_revenue} />
            <OperationalValueMetric value={data.avg_order_value} />
            <TemporalPeakVisualizer timeseriesData={data.peak_hours} />
          </div>

          <div>
            <h3 className='text-base font-semibold text-gray-200 mb-3'>
              Orders
            </h3>
            <TransactionLedger lockedRestaurantId={Number(id)} />
          </div>
        </>
      )}
    </main>
  );
}
