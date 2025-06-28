import { useAuthStore } from '@/stores';
import { router } from 'expo-router';
import { useEffect } from 'react';

export const useAuthGuard = (requireAuth: boolean = true) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.replace('/auth/sign-in');
      } else if (!requireAuth && isAuthenticated) {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth]);

  return { isAuthenticated, isLoading };
};

export const useAuthUser = () => {
  const { user, isAuthenticated } = useAuthStore();
  return { user, isAuthenticated };
};
