import { Restaurants, RestaurantsParams, RestaurantsResponse } from '@/types/restaurants';
import api from '../axios';
import { cleanParams } from '@/lib/utils';

export const RestaurantRepository = {
   list: async (params: RestaurantsParams = {}) => {
      const { data } = await api.get('/api/v1/restaurants', {
         params: cleanParams(params),
      });

      return {
         data: data.data,
         meta: data.meta,
      } as RestaurantsResponse;
   },

   detail: async (id: string | number) => {
      const { data } = await api.get(`/api/v1/restaurants/${id}`);

      return data.data as Restaurants;
   },
};