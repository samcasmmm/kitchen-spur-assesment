import { RestaurantRepository } from '@/api/restaurants/restaurants-repo';
import { RestaurantsParams } from '@/types/restaurants';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useRestaurantsList = (params: RestaurantsParams = {}) => {
   return useQuery({
      queryKey: [
         'restaurants',
         params
      ],
      queryFn: () => RestaurantRepository.list(params),
      placeholderData: keepPreviousData,
   });
};