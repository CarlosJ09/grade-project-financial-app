import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';

export default function LearnScreen() {
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
            <TouchableOpacity className="rounded-xl bg-blue-500 p-6">
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

          {/* Course Categories */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              Courses
            </ThemedText>
            <View className="gap-4">
              <TouchableOpacity className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                <View className="flex-row items-center">
                  <Text className="mr-3 text-2xl">💰</Text>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-green-800 dark:text-green-300">
                      Budgeting Basics
                    </Text>
                    <Text className="text-sm text-green-600 dark:text-green-400">
                      Learn to track and control your spending
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                <View className="flex-row items-center">
                  <Text className="mr-3 text-2xl">📊</Text>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-blue-800 dark:text-blue-300">
                      Investment Fundamentals
                    </Text>
                    <Text className="text-sm text-blue-600 dark:text-blue-400">
                      Start your investment journey
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Placeholder */}
          <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
            <Text className="mb-2 text-center text-gray-600 dark:text-gray-400">
              📚 Start Your Financial Journey
            </Text>
            <Text className="text-center text-sm text-gray-500 dark:text-gray-500">
              Begin with courses to build your financial knowledge
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
