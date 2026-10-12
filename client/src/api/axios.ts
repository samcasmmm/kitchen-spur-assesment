import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const isAuthRoute = window.location.pathname.startsWith('/sign-in');
        if (!isAuthRoute) {
          localStorage.removeItem('AUTH_TOKEN');
          window.location.href = '/sign-in?expired=true';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
