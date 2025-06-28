import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  // Redirect to main app if already authenticated
  useAuthGuard(false);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
