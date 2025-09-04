import { useAuthUser } from '@/hooks/useAuthGuard';
import { View } from 'react-native';

export default function BalanceScreen() {
  const { user } = useAuthUser();

  return <View>Balance</View>;
}
