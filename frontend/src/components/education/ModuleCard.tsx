import type { Module } from '@/types/education';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from './ProgressBar';

interface ModuleCardProps {
  module: Module;
  progress: number;
  onPress: () => void;
  isLocked?: boolean;
}

export function ModuleCard({
  module,
  progress,
  onPress,
  isLocked = false,
}: ModuleCardProps) {
  const isCompleted = progress >= 100;
  const hasStarted = progress > 0;

  return (
    <TouchableOpacity
      className={`rounded-xl p-4 shadow-sm ${
        isLocked
          ? 'bg-gray-100 opacity-60 dark:bg-gray-800'
          : 'bg-white dark:bg-gray-800'
      }`}
      onPress={onPress}
      disabled={isLocked}
    >
      <View className="flex-row items-center">
        <View className="mr-3">
          <Text className="text-2xl">
            {isLocked ? '🔒' : isCompleted ? '✅' : hasStarted ? '📖' : '📄'}
          </Text>
        </View>

        <View className="flex-1">
          <Text
            className={`mb-1 font-semibold ${
              isLocked
                ? 'text-gray-500 dark:text-gray-500'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            Module {module.sequence}: {module.contentItem}
          </Text>
          <Text
            className={`mb-2 text-sm ${
              isLocked
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {module.summary}
          </Text>
          <Text
            className={`text-xs ${
              isLocked
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-gray-500 dark:text-gray-500'
            }`}
          >
            {module.estimatedMinutes} minutes
          </Text>

          {!isLocked && hasStarted && (
            <View className="mt-2">
              <ProgressBar
                progress={progress}
                size="small"
                showLabel={false}
                color={isCompleted ? '#10B981' : '#3B82F6'}
              />
              <Text className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {Math.round(progress)}% complete
              </Text>
            </View>
          )}

          {isLocked && (
            <Text className="mt-1 text-xs text-gray-400 dark:text-gray-600">
              Complete previous modules to unlock
            </Text>
          )}
        </View>

        <View className="ml-3">
          <Text className={isLocked ? 'text-gray-300' : 'text-gray-400'}>
            ›
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
