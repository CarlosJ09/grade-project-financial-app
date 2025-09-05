import { Budget } from '@/types/financial';
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import { Text, View } from 'react-native';

interface BudgetCardProps {
  budget: Budget;
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const isActive = budget.state === 'active';

  console.log(budget);

  return (
    <View className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <View className="mb-2 flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            {budget.name}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {budget.category.name}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text
            className={`text-lg font-bold ${
              isActive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isActive ? '+' : '-'}
            {formatCurrency(budget.currentAmount)}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View
          className={`rounded-full px-2 py-1 ${
            isActive
              ? 'bg-green-100 dark:bg-green-900/20'
              : 'bg-red-100 dark:bg-red-900/20'
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              isActive
                ? 'text-green-800 dark:text-green-300'
                : 'text-red-800 dark:text-red-300'
            }`}
          >
            {budget.statusId}
          </Text>
        </View>

        <Text className="text-xs text-gray-500 dark:text-gray-400">
          ID: {budget.id.slice(-8)}
        </Text>
      </View>
    </View>
  );
}
