import { Button } from '@/components/ui/Button';
import { useAuthUser } from '@/hooks/useAuthGuard';
import { useFinancialStore } from '@/stores';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export const FinancialExample = () => {
  const { user } = useAuthUser();
  const {
    transactions,
    budgets,
    isLoading,
    error,
    fetchTransactions,
    fetchBudgets,
    createTransaction,
  } = useFinancialStore();

  useEffect(() => {
    // Fetch data when component mounts
    if (user) {
      fetchTransactions();
      fetchBudgets();
    }
  }, [user]);

  const handleCreateSampleTransaction = async () => {
    if (user) {
      await createTransaction({
        amount: 50.0,
        description: 'Sample Expense',
        type: 'expense',
        categoryId: 'sample-category-id',
        paymentMethodId: 'sample-payment-id',
        userId: user.id,
        date: new Date().toISOString(),
      });
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Loading financial data...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold">Financial Overview</Text>

      {error && (
        <View className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <Text className="text-red-600 dark:text-red-400">{error}</Text>
        </View>
      )}

      <View className="mb-6">
        <Text className="mb-2 text-lg font-semibold">
          Budgets ({budgets.length})
        </Text>
        {budgets.map(budget => (
          <View
            key={budget.id}
            className="mb-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800"
          >
            <Text className="font-medium">{budget.name}</Text>
            <Text className="text-gray-600 dark:text-gray-400">
              ${budget.spentAmount} / ${budget.totalAmount}
            </Text>
          </View>
        ))}
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-lg font-semibold">
          Recent Transactions ({transactions.length})
        </Text>
        <FlatList
          data={transactions.slice(0, 5)} // Show last 5 transactions
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="mb-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <Text className="font-medium">{item.description}</Text>
              <Text
                className={`${
                  item.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.type === 'income' ? '+' : '-'}${item.amount}
              </Text>
              <Text className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      </View>

      <Button
        title="Create Sample Transaction"
        onPress={handleCreateSampleTransaction}
      />
    </View>
  );
};
