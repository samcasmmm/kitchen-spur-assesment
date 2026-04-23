import { useQuery } from '@tanstack/react-query';
import { UseRestaurantAnalyticsParams } from '@/types/analytics';
import { AnalyticsRepository } from '@/api/analytics/analytics-repo';

export function useRestaurantAnalyticsSummary(
   params: UseRestaurantAnalyticsParams
) {
   const { restaurantId } = params;
   const dateRange = {
      startDate: params.startDate, endDate: params.endDate
   }

   return useQuery({
      queryKey: [
         'analytics',
         'restaurant',
         restaurantId,
         'summary',
         params?.startDate,
         params?.endDate,
      ],
      queryFn: () =>
         AnalyticsRepository.restaurantAnalytics(restaurantId, dateRange),
      enabled: !!restaurantId && !!params?.startDate && !!params?.endDate,
      staleTime: 1000 * 60 * 5,
   });
}