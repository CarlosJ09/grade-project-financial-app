import { router } from 'expo-router';
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

export default function LearnScreen() {
  const {
    courses,
    enrollments,
    isLoading,
    error,
    fetchCourses,
    fetchEnrollments,
    enrollInCourse,
    clearError,
  } = useEducationData();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchEnrollments();
    }
  }, [user, fetchCourses, fetchEnrollments]);

  const handleEnrollInCourse = async (courseId: number) => {
    if (!user) {
      Alert.alert(
        'Authentication Required',
        'Please sign in to enroll in courses'
      );
      return;
    }

    const success = await enrollInCourse({ userId: user.id, courseId });
    if (success) {
      Alert.alert('Success', 'You have been enrolled in the course!');
    } else if (error) {
      Alert.alert('Error', error);
      clearError();
    }
  };

  const handleCoursePress = (courseId: number) => {
    router.push(`/(tabs)/learn/course/${courseId}`);
  };

  const handleNavigateToChat = () => {
    router.push('/(tabs)/chat');
  };

  const isEnrolledInCourse = (courseId: number) => {
    return enrollments.some(
      enrollment => enrollment.courseId === courseId && !enrollment.unenrolledAt
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">
            Loading courses...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-6">
          <ThemedText type="title" className="mb-4">
            Learn & Grow
          </ThemedText>

          {/* AI Assistant Section */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              AI Financial Assistant
            </ThemedText>
            <TouchableOpacity
              className="rounded-xl bg-blue-500 p-6"
              onPress={handleNavigateToChat}
            >
              <View className="flex-row items-center">
                <Text className="mr-4 text-4xl">🤖</Text>
                <View className="flex-1">
                  <Text className="mb-2 text-lg font-bold text-white">
                    Get Personalized Advice
                  </Text>
                  <Text className="text-sm text-blue-100">
                    Ask questions about budgeting, saving, investing, and more
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Available Courses */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              Available Courses
            </ThemedText>

            {courses.length === 0 ? (
              <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  No courses available at the moment
                </Text>
              </View>
            ) : (
              <View className="gap-4">
                {courses.map(course => {
                  const isEnrolled = isEnrolledInCourse(course.id);
                  return (
                    <TouchableOpacity
                      key={course.id}
                      className={`rounded-xl p-4 ${
                        isEnrolled
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-blue-50 dark:bg-blue-900/20'
                      }`}
                      onPress={() =>
                        isEnrolled
                          ? handleCoursePress(course.id)
                          : handleEnrollInCourse(course.id)
                      }
                    >
                      <View className="flex-row items-center">
                        <Text className="mr-3 text-2xl">
                          {isEnrolled ? '✅' : '📚'}
                        </Text>
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
                            <Text className="mt-1 text-xs text-green-700 dark:text-green-300">
                              Enrolled ✓ • Tap to view
                            </Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Getting Started */}
          <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
            <Text className="mb-2 text-center text-gray-600 dark:text-gray-400">
              📚 Start Your Financial Journey
            </Text>
            <Text className="text-center text-sm text-gray-500 dark:text-gray-500">
              {courses.length > 0
                ? 'Enroll in courses to build your financial knowledge'
                : 'Check back later for new courses'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
