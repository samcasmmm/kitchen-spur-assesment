import api from '@/api/axios';
import { cleanParams } from '@/lib/utils';
import { DateRange, OrdersFilters } from '@/types/analytics';

export const AnalyticsRepository = {
   restaurantAnalytics: async (
      restaurantId: string | number,
      params: DateRange = {}
   ) => {
      const { data } = await api.get(
         `/api/v1/analytics/restaurant/${restaurantId}`,
         {
            params: cleanParams({
               start_date: params.startDate,
               end_date: params.endDate,
            }),
         }
      );

      return data.data;
   },

   topRestaurants: async (params: DateRange = {}) => {
      const { data } = await api.get(
         `/api/v1/analytics/top-restaurants`,
         {
            params: cleanParams({
               start_date: params.startDate,
               end_date: params.endDate,
            }),
         }
      );

      return data.data;
   },

   orders: async (params: OrdersFilters = {}) => {
      const { data } = await api.get(`/api/v1/analytics/orders`, {
         params: cleanParams({
            page: params.page,
            limit: params.limit,
            restaurant_id: params.restaurantId,
            status: params.status,
            start_date: params.startDate,
            end_date: params.endDate,
            min_amount: params.min_amount,
            max_amount: params.max_amount,
            hour_from: params?.hour_from,
            hour_to: params?.hour_to
         }),
      });

      return {
         data: data.data,
         meta: data.meta,
      };
   },
};