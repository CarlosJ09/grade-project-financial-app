import { View } from 'react-native';

export function Progress({
  progress,
  isOnTrack,
}: {
  progress: number;
  isOnTrack: boolean;
}) {
  return (
    <View className="mb-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <View
        className={`h-full rounded-full ${
          isOnTrack ? 'bg-secondary' : 'bg-red-500'
        }`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </View>
  );
}
