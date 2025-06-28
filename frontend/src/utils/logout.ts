import { SESSION_KEY } from '@/constants/auth';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export const logout = async () => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
  router.replace('/auth/sign-in');
};
