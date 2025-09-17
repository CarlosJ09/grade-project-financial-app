import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
}

export function ProgressBar({
  progress,
  showLabel = true,
  size = 'medium',
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
}: ProgressBarProps) {
  const getHeight = () => {
    switch (size) {
      case 'small':
        return 'h-1';
      case 'large':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View>
      {showLabel && (
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-500">
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View
        className={`w-full rounded-full ${getHeight()}`}
        style={{ backgroundColor }}
      >
        <View
          className={`${getHeight()} rounded-full transition-all duration-300`}
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}
