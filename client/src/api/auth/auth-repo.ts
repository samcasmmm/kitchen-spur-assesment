import api from '@/api/axios';
import { LoginCredentials } from '@/types/auth';

export const AuthRepository = {
   login: async (credentials: LoginCredentials) => {
      const { data } = await api.post('/api/v1/auth/login', credentials);
      return data.data;
   },

   logout: async (): Promise<void> => {
      await api.post('/api/v1/auth/logout');
   },
};