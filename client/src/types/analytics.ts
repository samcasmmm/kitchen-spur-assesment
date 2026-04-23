export type DateRange = {
   startDate?: string;
   endDate?: string;
};

export type OrdersFilters = {
   page?: number;
   limit?: number;
   restaurantId?: string | number;
   status?: string;
   startDate?: string;
   endDate?: string;
   min_amount?: string;
   max_amount?: string;
   hour_from?: string;
   hour_to?: string;
};

export type UseRestaurantAnalyticsParams = {
   restaurantId: string | number;
   startDate?: string;
   endDate?: string;
};

export interface Restaurant {
   id: number;
   name: string;
}

export type OrderStatus = 0 | 1 | 2 | 3;

export interface Order {
   id: number;
   restaurant_id: number;
   restaurant: Restaurant;

   order_amount: string; // comes as string from API
   status: OrderStatus;

   created_at: string;
   updated_at: string;
   ordered_at: string;
}