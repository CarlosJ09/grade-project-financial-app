import { Progress } from '@/components/ui/Progress';
import { Budget } from '@/types/financial/budget';
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import { Text, View } from 'react-native';

interface BudgetCardProps {
  budget: Budget;
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const spent = budget.currentAmount;
  const total = budget.goalAmount;
  const remaining = total - spent;
  const percentageUsed = Math.round((spent / total) * 100);
  const isOnTrack = percentageUsed <= 75;

  return (
    <View className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <View className="mb-4 flex-row items-start justify-between">
        <View className="flex-1">
          <View className="mb-1 flex-row items-center">
            {/*     {budget.category.icon && (
              <Text className="mr-2 text-lg">{budget.category.icon}</Text>
            )} */}
            <Text className="text-xl font-semibold text-gray-900 dark:text-white">
              {budget.name}
            </Text>
          </View>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {budget.category?.name}
          </Text>
        </View>
        <View
          className={`rounded-full px-3 py-1 ${
            isOnTrack
              ? 'bg-green-100 dark:bg-green-900/20'
              : 'bg-yellow-100 dark:bg-yellow-900/20'
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              isOnTrack
                ? 'text-green-800 dark:text-green-300'
                : 'text-yellow-800 dark:text-yellow-300'
            }`}
          >
            {isOnTrack ? 'On Track' : 'Over Budget'}
          </Text>
        </View>
      </View>

      {/* Amount spent and total */}
      <View className="mb-3 flex-row items-baseline justify-between">
        <Text className="text-md text-gray-500 dark:text-gray-400">
          {formatCurrency(Number(spent))} spent
        </Text>
        <Text className="text-md text-gray-500 dark:text-gray-400">
          of {formatCurrency(Number(total))}
        </Text>
      </View>

      {/* Progress bar */}
      <Progress progress={percentageUsed} isOnTrack={isOnTrack} />

      {/* Bottom stats */}
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          {percentageUsed}% used
        </Text>
        <Text className="text-sm font-medium text-gray-900 dark:text-white">
          {formatCurrency(remaining)} left
        </Text>
      </View>
    </View>
  );
}
