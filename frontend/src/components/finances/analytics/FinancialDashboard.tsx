import { UserExpenseAnalyticsResponse, userService } from '@/services/user';
import { useAuthStore } from '@/stores';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ExpensePieChart } from './ExpensePieChart';

export const FinancialDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] =
    useState<UserExpenseAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchAnalytics = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUserExpenseAnalytics(user.id);
      setAnalyticsData(data);
    } catch (err) {
      console.error('Error fetching expense analytics:', err);
      setError('Failed to load expense analytics');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <View className="items-center justify-center rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-2 text-gray-600 dark:text-gray-400">
          Loading analytics...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center justify-center rounded-xl bg-red-50 p-8 dark:bg-red-900/20">
        <Text className="text-center text-red-600 dark:text-red-400">
          {error}
        </Text>
      </View>
    );
  }

  if (!analyticsData || analyticsData.categoriesData.length === 0) {
    return (
      <View className="items-center justify-center rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
        <Text className="text-center text-gray-600 dark:text-gray-400">
          📊 No expense data yet
        </Text>
        <Text className="mt-2 text-center text-sm text-gray-500 dark:text-gray-500">
          Start adding expenses to see your spending breakdown
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-4">
      {/* Summary Stats */}
      <View className="mx-1 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          Expense Summary
        </Text>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Total Expenses
            </Text>
            <Text className="text-xl font-bold text-red-600 dark:text-red-400">
              {analyticsData.currency}{' '}
              {analyticsData.totalExpenses.toLocaleString()}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Categories
            </Text>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              {analyticsData.categoriesData.length}
            </Text>
          </View>
        </View>
      </View>

      {/* Pie Chart */}
      <View className="mx-1">
        <ExpensePieChart
          data={analyticsData.categoriesData}
          currency={analyticsData.currency}
        />
      </View>
    </View>
  );
};
