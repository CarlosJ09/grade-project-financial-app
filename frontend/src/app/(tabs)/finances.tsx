import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';

export default function FinancesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-6">
          <ThemedText type="title" className="mb-4">
            Your Finances
          </ThemedText>

          {/* Financial Summary */}
          <View className="mb-6">
            <View className="flex-row gap-4">
              <View className="flex-1 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                <Text className="text-sm font-medium text-green-600 dark:text-green-400">
                  Income
                </Text>
                <Text className="mt-1 text-2xl font-bold text-green-800 dark:text-green-300">
                  $0.00
                </Text>
              </View>
              <View className="flex-1 rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                <Text className="text-sm font-medium text-red-600 dark:text-red-400">
                  Expenses
                </Text>
                <Text className="mt-1 text-2xl font-bold text-red-800 dark:text-red-300">
                  $0.00
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              Quick Actions
            </ThemedText>
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 rounded-xl bg-blue-500 p-4">
                <Text className="text-center font-semibold text-white">
                  Add Transaction
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 rounded-xl bg-purple-500 p-4">
                <Text className="text-center font-semibold text-white">
                  Create Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Placeholder Content */}
          <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
            <Text className="mb-2 text-center text-gray-600 dark:text-gray-400">
              💰 Your Financial Dashboard R{' '}
            </Text>
            <Text className="text-center text-sm text-gray-500 dark:text-gray-500">
              Track expenses, manage budgets, and achieve your financial goals
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
