import type { Course } from '@/types/education';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from './ProgressBar';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  progress?: number;
  onPress: () => void;
  onEnroll?: () => void;
}

export function CourseCard({
  course,
  isEnrolled,
  progress = 0,
  onPress,
  onEnroll,
}: CourseCardProps) {
  const handlePress = () => {
    if (isEnrolled) {
      onPress();
    } else if (onEnroll) {
      onEnroll();
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-xl p-4 ${
        isEnrolled
          ? 'bg-green-50 dark:bg-green-900/20'
          : 'bg-blue-50 dark:bg-blue-900/20'
      }`}
      onPress={handlePress}
    >
      <View className="flex-row items-center">
        <Text className="mr-3 text-2xl">{isEnrolled ? '✅' : '📚'}</Text>
        <View className="flex-1">
          <Text
            className={`mb-1 font-semibold ${
              isEnrolled
                ? 'text-green-800 dark:text-green-300'
                : 'text-blue-800 dark:text-blue-300'
            }`}
          >
            {course.name}
          </Text>
          <Text
            className={`text-sm ${
              isEnrolled
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}
          >
            {course.description}
          </Text>

          {isEnrolled && (
            <View className="mt-2">
              {progress > 0 && (
                <ProgressBar
                  progress={progress}
                  size="small"
                  showLabel={false}
                  color={progress >= 100 ? '#10B981' : '#3B82F6'}
                />
              )}
              <Text className="mt-1 text-xs text-green-700 dark:text-green-300">
                {progress >= 100
                  ? 'Completed ✓'
                  : `${Math.round(progress)}% • Tap to continue`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
