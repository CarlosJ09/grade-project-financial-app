import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

api.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    const originalRequest = error.config;

    console.log(
      'API ERROR',
      `PATH: ${originalRequest.url}`,
      `STATUS: ${error.response?.status}`
    );

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
          // Dynamic import to avoid circular dependency
          import('@/stores').then(({ useAuthStore }) => {
            useAuthStore.getState().logout();
          });
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
  // Dynamic import to avoid circular dependency
  try {
    const { useAuthStore } = await import('@/stores');
    const success = await useAuthStore.getState().refreshToken();
    if (success) {
      const { session } = useAuthStore.getState();
      return session?.accessToken;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

export default api;
