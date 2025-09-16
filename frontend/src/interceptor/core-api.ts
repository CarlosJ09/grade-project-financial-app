import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_CORE_API_URL}/api`,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 10000, // 10 seconds
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

    // Check if it's an auth error and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      // Don't retry on auth endpoints to avoid infinite loops
      !originalRequest.url?.includes('/auth/')
    ) {
      originalRequest._retry = true;

      try {
        // Dynamic import to avoid circular dependency
        const { useAuthStore } = await import('@/stores');
        const success = await useAuthStore.getState().refreshToken();

        if (success) {
          // Get the new token and retry the original request
          const { session } = useAuthStore.getState();
          if (session?.accessToken) {
            originalRequest.headers['Authorization'] =
              `Bearer ${session.accessToken}`;
            return api(originalRequest);
          }
        }

        // If refresh failed, logout the user
        useAuthStore.getState().logout();
        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Dynamic import to avoid circular dependency
        const { useAuthStore } = await import('@/stores');
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
