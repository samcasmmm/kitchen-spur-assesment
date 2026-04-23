export interface Restaurants {
   id: string,
   cuisine: string,
   location: string,
   name: string,
   rating: number | string | null,
   total_orders: number,
   total_revenue: number,
}

export type RestaurantsParams = {
   search?: string;
   cuisine?: string;
   location?: string;
   rating?: string;
   sort_by?: string;
   sort_dir?: 'asc' | 'desc';
   page?: number;
   per_page?: number;
};


export type RestaurantsResponse = {
   data: Restaurants[];
   meta: {
      total: number;
      last_page: number;
   };
};