import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { useAuthStore } from '@/stores/authStore';
import { useEducationData } from '@/stores/educationStore';
import type { Module } from '@/types/education';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const courseId = parseInt(id || '0', 10);

  const {
    currentCourse,
    currentModules,
    enrollments,
    moduleProgress,
    isLoading,
    error,
    fetchCourseContent,
    enrollInCourse,
    clearError,
  } = useEducationData();

  const { user } = useAuthStore();

  useEffect(() => {
    if (courseId) {
      fetchCourseContent(courseId);
    }
  }, [courseId]);

  const handleEnrollInCourse = async () => {
    if (!user) {
      Alert.alert(
        'Authentication Required',
        'Please sign in to enroll in courses'
      );
      return;
    }

    const success = await enrollInCourse(courseId);
    if (success) {
      Alert.alert('Success', 'You have been enrolled in the course!');
    } else if (error) {
      Alert.alert('Error', error);
      clearError();
    }
  };

  const handleModulePress = (module: Module) => {
    router.push(`/(tabs)/learn/module/${module.id}`);
  };

  const isEnrolledInCourse = () => {
    return enrollments.some(
      enrollment => enrollment.courseId === courseId && !enrollment.unenrolledAt
    );
  };

  const getModuleProgress = (moduleId: number) => {
    const progress = moduleProgress.find(p => p.moduleId === moduleId);
    return progress?.progressPercent || 0;
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">
            Loading course...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentCourse) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-center text-gray-600 dark:text-gray-400">
            Course not found
          </Text>
          <TouchableOpacity
            className="mt-4 rounded-lg bg-blue-500 px-6 py-3"
            onPress={() => router.back()}
          >
            <Text className="font-semibold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isEnrolled = isEnrolledInCourse();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Course Header */}
          <View className="mb-6">
            <ThemedText type="title" className="mb-2">
              {currentCourse.name}
            </ThemedText>
            <Text className="mb-4 text-gray-600 dark:text-gray-400">
              {currentCourse.description}
            </Text>

            {!isEnrolled && (
              <TouchableOpacity
                className="rounded-lg bg-blue-500 px-6 py-3"
                onPress={handleEnrollInCourse}
              >
                <Text className="text-center font-semibold text-white">
                  Enroll in Course
                </Text>
              </TouchableOpacity>
            )}

            {isEnrolled && (
              <View className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <Text className="text-center font-semibold text-green-800 dark:text-green-300">
                  ✅ Enrolled
                </Text>
              </View>
            )}
          </View>

          {/* Course Modules */}
          {isEnrolled && (
            <View className="mb-6">
              <ThemedText type="subtitle" className="mb-4">
                Course Modules
              </ThemedText>

              {currentModules.length === 0 ? (
                <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                  <Text className="text-center text-gray-600 dark:text-gray-400">
                    No modules available yet
                  </Text>
                </View>
              ) : (
                <View className="gap-3">
                  {currentModules.map((module, index) => {
                    const progress = getModuleProgress(module.id);
                    const isCompleted = progress >= 100;

                    return (
                      <TouchableOpacity
                        key={module.id}
                        className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
                        onPress={() => handleModulePress(module)}
                      >
                        <View className="flex-row items-center">
                          <View className="mr-3">
                            <Text className="text-2xl">
                              {isCompleted ? '✅' : '📖'}
                            </Text>
                          </View>

                          <View className="flex-1">
                            <Text className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                              Module {module.sequence}: {module.contentItem}
                            </Text>
                            <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                              {module.summary}
                            </Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-500">
                              {module.estimatedMinutes} minutes
                            </Text>

                            {progress > 0 && (
                              <View className="mt-2">
                                <View className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                  <View
                                    className="h-2 rounded-full bg-blue-500"
                                    style={{ width: `${progress}%` }}
                                  />
                                </View>
                                <Text className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                  {Math.round(progress)}% complete
                                </Text>
                              </View>
                            )}
                          </View>

                          <View className="ml-3">
                            <Text className="text-gray-400">›</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          )}

          {/* Course Info */}
          <View className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <Text className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
              Course Information
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Created: {new Date(currentCourse.createdAt).toLocaleDateString()}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Last updated:{' '}
              {new Date(currentCourse.updatedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
