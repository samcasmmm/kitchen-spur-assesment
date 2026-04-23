import { AnalyticsRepository } from '@/api/analytics/analytics-repo';
import { useQuery } from '@tanstack/react-query';

type UseTopRestaurantsParams = {
   startDate?: string;
   endDate?: string;
};

export function useTopRestaurantsByRevenue(
   params: UseTopRestaurantsParams
) {
   const { startDate, endDate } = params;
   console.log(startDate,
      endDate,)
   return useQuery({
      queryKey: [
         'analytics',
         'restaurants',
         'top-revenue',
         startDate,
         endDate,
      ],
      queryFn: () => AnalyticsRepository.topRestaurants(params),
      enabled: !!startDate && !!endDate,
      staleTime: 1000 * 60 * 5,
   });
}