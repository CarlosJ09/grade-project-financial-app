import { useAuthStore } from '@/stores';
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_HOST}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    const originalRequest = error.config;

    console.log('API PATH', `PATH: ${originalRequest.url}`);
    console.log('API ERROR', `STATUS CODE: ${error.response?.status}`);
    console.log(`DATA: ${error.response?.data}`);
    console.log(`ERROR: ${error.response?.data?.error}`);

    const isAuthRequest = !!originalRequest.headers['Authorization'];

    if (
      isAuthRequest &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          // If refresh failed, logout the user
          const { logout } = useAuthStore.getState();
          logout();
          return Promise.reject(error);
        }
      } catch (error) {
        return error;
      }
    }

    return error.response;
  }
);

const refreshToken = async () => {
  // Get the refresh token function from the auth store
  const { refreshToken: storeRefreshToken } = useAuthStore.getState();

  try {
    const success = await storeRefreshToken();
    if (success) {
      // Return the new token from the store
      const { session } = useAuthStore.getState();
      return session?.token;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

export default api;
