import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { BudgetCard } from '@/components/finances/budget/BudgetCard';
import { BudgetModal } from '@/components/finances/budget/BudgetModal';
import { TransactionCard } from '@/components/finances/transaction/TransactionCard';
import { TransactionModal } from '@/components/finances/transaction/TransactionModal';
import { budgetService } from '@/services/budget';
import { transactionService } from '@/services/transaction';
import { UserBalanceResponse, userService } from '@/services/user';
import { useAuthStore } from '@/stores/authStore';
import { Budget } from '@/types/financial/budget';
import { Transaction } from '@/types/financial/transaction';
import { formatCurrency } from '@/utils/formatCurrency';

export default function FinancesScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState<UserBalanceResponse | null>(
    null
  );

  const { user } = useAuthStore();

  const fetchUserBalance = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await userService.getUserBalance(user?.id);
      setUserBalance(response);
    } catch (error) {
      console.error('Error fetching user balance:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
    fetchUserBalance();
  }, [fetchUserBalance]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionService.getAll();
      setTransactions(response || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const response = await budgetService.getAll();
      setBudgets(response || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionCreated = () => {
    fetchTransactions();
    fetchUserBalance(); // Refresh balance after transaction is created
  };

  const handleBudgetCreated = () => {
    fetchBudgets();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-6">
          <ThemedText type="title" className="mb-4">
            Your Finances
          </ThemedText>

          {/* Financial Summary */}
          <View className="mb-6 gap-4">
            <View className="flex-1 rounded-xl bg-primary p-4 dark:bg-primary">
              <Text className="font-poppins-medium text-sm text-white dark:text-white">
                Current Balance
              </Text>
              <Text className="mt-1 text-2xl font-bold text-white dark:text-white">
                {formatCurrency(Number(userBalance?.totalBalance))}
              </Text>
            </View>
            <View className="flex-row gap-4">
              <View className="flex-1 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                <Text className="font-poppins-medium text-sm text-green-600 dark:text-green-400">
                  Income
                </Text>
                <Text className="mt-1 font-poppins-bold text-xl text-green-800 dark:text-green-300">
                  {formatCurrency(Number(userBalance?.totalIncome))}
                </Text>
              </View>
              <View className="flex-1 rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                <Text className="font-poppins-medium text-sm text-red-600 dark:text-red-400">
                  Expenses
                </Text>
                <Text className="mt-1 font-poppins-bold text-xl text-red-800 dark:text-red-300">
                  {formatCurrency(Number(userBalance?.totalExpenses))}
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
              <TouchableOpacity
                className="flex-1 rounded-xl bg-primary p-4"
                onPress={() => setShowBudgetModal(true)}
              >
                <Text className="text-center font-semibold text-white">
                  Create Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Budgets List */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              Budgets
            </ThemedText>

            {loading ? (
              <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  Loading budgets...
                </Text>
              </View>
            ) : budgets.length === 0 ? (
              <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                <Ionicons
                  name="cash"
                  size={48}
                  color="#6b7280"
                  className="mx-auto mb-4 dark:color-gray-400"
                />
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  No budgets yet
                </Text>
                <Text className="text-center text-sm text-gray-500 dark:text-gray-500">
                  Start by adding your first budget
                </Text>
              </View>
            ) : (
              <View className="gap-4">
                {budgets.map(budget => (
                  <BudgetCard key={budget.id} budget={budget} />
                ))}
              </View>
            )}
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
                <Ionicons
                  name="cash"
                  size={48}
                  color="#6b7280"
                  className="mx-auto mb-4 dark:color-gray-400"
                />
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  No transactions yet
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

      {/* Budget Modal */}
      <BudgetModal
        visible={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onSuccess={handleBudgetCreated}
      />
    </SafeAreaView>
  );
}
