import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { TransactionCard } from '@/components/finances/TransactionCard';
import { TransactionModal } from '@/components/finances/TransactionModal';
import { transactionService } from '@/services/transaction';
import { Transaction } from '@/types/financial';
import { formatCurrency } from '@/utils/formatCurrency';

export default function FinancesScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      console.log('Fetching transactions...');
      const response = await transactionService.getAll();
      console.log('Transactions response:', response.data);
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionCreated = () => {
    fetchTransactions();
  };

  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expenses };
  };

  const { income, expenses } = calculateTotals();

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
                  {formatCurrency(income)}
                </Text>
              </View>
              <View className="flex-1 rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                <Text className="text-sm font-medium text-red-600 dark:text-red-400">
                  Expenses
                </Text>
                <Text className="mt-1 text-2xl font-bold text-red-800 dark:text-red-300">
                  {formatCurrency(expenses)}
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
              <TouchableOpacity
                className="flex-1 rounded-xl bg-secondary p-4"
                onPress={() => setShowTransactionModal(true)}
              >
                <Text className="text-center font-semibold text-white">
                  Add Transaction
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 rounded-xl bg-primary p-4">
                <Text className="text-center font-semibold text-white">
                  Create Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Transactions List */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              Recent Transactions
            </ThemedText>

            {loading ? (
              <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  Loading transactions...
                </Text>
              </View>
            ) : transactions.length === 0 ? (
              <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                <Text className="mb-2 text-center text-gray-600 dark:text-gray-400">
                  💰 No transactions yet
                </Text>
                <Text className="text-center text-sm text-gray-500 dark:text-gray-500">
                  Start by adding your first transaction
                </Text>
              </View>
            ) : (
              <View className="gap-4">
                {transactions.map(transaction => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Transaction Modal */}
      <TransactionModal
        visible={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSuccess={handleTransactionCreated}
      />
    </SafeAreaView>
  );
}
