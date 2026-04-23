import { useQuery } from '@tanstack/react-query';
import { AnalyticsRepository } from '@/api/analytics/analytics-repo';
import { OrdersFilters } from '@/types/analytics';

export function useOrdersAnalytics(filters: OrdersFilters = {}) {
  return useQuery({
    queryKey: ['analytics', 'orders', filters],
    queryFn: () => AnalyticsRepository.orders(filters),
    staleTime: 1000 * 60 * 2,
  });
}
