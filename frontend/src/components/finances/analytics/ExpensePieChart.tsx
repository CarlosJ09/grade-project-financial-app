import { ExpenseCategoryData } from '@/services/user';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface ExpensePieChartProps {
  data: ExpenseCategoryData[];
  currency: string;
}

// Color palette for the pie chart
const COLORS = [
  '#FF6384', // Red
  '#36A2EB', // Blue
  '#FFCE56', // Yellow
  '#4BC0C0', // Teal
  '#9966FF', // Purple
  '#FF9F40', // Orange
  '#FF6384', // Pink
  '#C9CBCF', // Gray
  '#4BC0C0', // Cyan
  '#FF6384', // Light Red
];

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({
  data,
  currency,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 80; // Account for container padding and margins

  // Transform data for react-native-chart-kit
  const chartData = data.slice(0, 8).map((item, index) => ({
    name:
      item.categoryName.length > 12
        ? item.categoryName.substring(0, 12) + '...'
        : item.categoryName,
    population: item.amount,
    color: COLORS[index % COLORS.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 11,
  }));

  if (data.length === 0) {
    return (
      <View className="items-center justify-center rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
        <Text className="text-center text-gray-600 dark:text-gray-400">
          📊 No expense data available
        </Text>
        <Text className="mt-2 text-center text-sm text-gray-500 dark:text-gray-500">
          Start adding expenses to see your spending breakdown
        </Text>
      </View>
    );
  }

  return (
    <View className="rounded-xl bg-white px-4 py-4 shadow-sm dark:bg-gray-800">
      <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Expense Breakdown
      </Text>

      <View className="items-center justify-center">
        <PieChart
          data={chartData}
          width={Math.min(chartWidth, 300)}
          height={180}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[70, 0]}
          absolute
          hasLegend={false}
        />
      </View>

      {/* Top categories summary */}
      <View className="mt-4 px-1">
        <Text className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Top Categories
        </Text>
        {data.slice(0, 5).map((item, index) => (
          <View
            key={item.categoryName}
            className="mb-2 flex-row items-center justify-between"
          >
            <View className="flex-1 flex-row items-center pr-2">
              <View
                className="mr-3 h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <Text
                className="flex-1 text-sm text-gray-700 dark:text-gray-300"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.categoryName}
              </Text>
            </View>
            <View className="items-end" style={{ minWidth: 85, maxWidth: 85 }}>
              <Text className="text-sm font-medium text-gray-900 dark:text-white">
                {item.percentage.toFixed(1)}%
              </Text>
              <Text
                className="text-xs text-gray-500 dark:text-gray-400"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {currency}{' '}
                {item.amount > 999
                  ? `${(item.amount / 1000).toFixed(1)}k`
                  : item.amount.toLocaleString()}
              </Text>
            </View>
          </View>
        ))}

        {data.length > 5 && (
          <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            +{data.length - 5} more categories
          </Text>
        )}
      </View>
    </View>
  );
};
