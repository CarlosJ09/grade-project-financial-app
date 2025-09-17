import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { FinancialDashboard } from '@/components/finances/analytics/FinancialDashboard';
import { useTranslation } from '@/hooks/useTranslation';
import { userService } from '@/services/user';
import { useAuthStore } from '@/stores/authStore';
import { formatCurrency } from '@/utils/formatCurrency';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = useCallback(async () => {
    if (!user?.id) return;

    const balance = await userService.getUserBalance(user?.id);
    setBalance(balance.totalBalance);
  }, [user?.id]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Get current time for greeting
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return t('home.greeting.goodMorning');
    if (currentHour < 18) return t('home.greeting.goodAfternoon');
    return t('home.greeting.goodEvening');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        {/* Header with Profile Button */}
        <View className="flex-row items-center justify-between p-6 pb-4">
          <View>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {getGreeting()}
            </Text>
            <ThemedText type="title" className="mt-1">
              {user?.firstName || t('home.greeting.welcome')}
            </ThemedText>
          </View>
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-blue-500"
            onPress={() => router.push('/profile')}
          >
            <Text className="text-lg font-bold text-white">
              {user?.firstName?.[0]?.toUpperCase() || 'C'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Financial Overview */}
        <View className="mb-6 px-6">
          <View className="rounded-2xl bg-primary p-6">
            <Text className="mb-2 text-lg font-semibold text-white">
              {t('home.financialOverview.title')}
            </Text>
            <Text className="mb-1 text-3xl font-bold text-white">
              {balance
                ? formatCurrency(balance)
                : t('home.financialOverview.noBalance')}
            </Text>
            <Text className="text-sm text-white">
              {t('home.financialOverview.totalBalance')}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6 px-6">
          <ThemedText type="subtitle" className="mb-4">
            {t('home.quickActions.title')}
          </ThemedText>
          <View className="mb-4 flex-row gap-3">
            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-green-50 p-4 dark:bg-green-900/20"
              onPress={() => router.push('/(tabs)/finances')}
            >
              <Text className="mb-2 text-2xl">💰</Text>
              <Text className="text-sm font-medium text-green-800 dark:text-green-300">
                {t('home.quickActions.addIncome')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-red-50 p-4 dark:bg-red-900/20"
              onPress={() => router.push('/(tabs)/finances')}
            >
              <Text className="mb-2 text-2xl">💸</Text>
              <Text className="text-sm font-medium text-red-800 dark:text-red-300">
                {t('home.quickActions.addExpense')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20"
              onPress={() => router.push('/(tabs)/finances')}
            >
              <Text className="mb-2 text-2xl">📊</Text>
              <Text className="text-sm font-medium text-blue-800 dark:text-blue-300">
                {t('home.quickActions.budget')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Learning Progress */}
        <View className="mb-6 px-6">
          <ThemedText type="subtitle" className="mb-4">
            {t('home.learning.title')}
          </ThemedText>
          <TouchableOpacity
            className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
            onPress={() => router.push('/(tabs)/learn')}
          >
            <View className="flex-row items-center">
              <Text className="mr-4 text-3xl">📚</Text>
              <View className="flex-1">
                <Text className="mb-1 font-semibold text-gray-900 dark:text-white">
                  {t('home.learning.subtitle')}
                </Text>
                <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {t('home.learning.description')}
                </Text>
                <View className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <View className="h-2 w-0 rounded-full bg-blue-500" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* AI Assistant */}
        <View className="mb-6 px-6">
          <ThemedText type="subtitle" className="mb-4">
            {t('home.aiAssistant.title')}
          </ThemedText>
          <TouchableOpacity
            className="rounded-xl bg-secondary p-4"
            onPress={() => router.push('/(tabs)/chat')}
          >
            <View className="flex-row items-center">
              <Text className="mr-4 text-3xl">🤖</Text>
              <View className="flex-1">
                <Text className="mb-1 font-semibold text-white">
                  {t('home.aiAssistant.subtitle')}
                </Text>
                <Text className="text-sm text-white">
                  {t('home.aiAssistant.description')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Financial Dashboard */}
        <View className="mb-6 px-6">
          <ThemedText type="subtitle" className="mb-4">
            Spending Analytics
          </ThemedText>
          <FinancialDashboard />
        </View>

        {/* Recent Activity Placeholder */}
        <View className="px-6 pb-6">
          <ThemedText type="subtitle" className="mb-4">
            {t('home.recentActivity.title')}
          </ThemedText>
          <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
            <Text className="mb-2 text-center text-gray-600 dark:text-gray-400">
              {t('home.recentActivity.welcomeTitle')}
            </Text>
            <Text className="text-center text-sm text-gray-500 dark:text-gray-500">
              {t('home.recentActivity.welcomeDescription')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
