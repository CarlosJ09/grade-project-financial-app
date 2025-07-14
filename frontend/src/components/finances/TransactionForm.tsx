import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { categoryService } from '@/services/category';
import { currencyService } from '@/services/currency';
import { paymentMethodService } from '@/services/paymentMethod';
import { transactionService } from '@/services/transaction';
import { useAuthStore } from '@/stores/authStore';
import {
  Category,
  CreateTransactionInput,
  Currency,
  PaymentMethod,
} from '@/types/financial';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface TransactionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function TransactionForm({ onSuccess, onCancel }: TransactionFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Form data
  const [formData, setFormData] = useState<CreateTransactionInput>({
    amount: 0,
    currencyId: '',
    type: 'expense',
    categoryId: '',
    paymentMethodId: '',
    place: '',
    transactionDate: new Date().toISOString().split('T')[0],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const [categoriesRes, paymentMethodsRes, currenciesRes] =
        await Promise.all([
          categoryService.getAll(),
          paymentMethodService.getAll(),
          currencyService.getAll(),
        ]);

      setCategories(categoriesRes.data || []);
      setPaymentMethods(paymentMethodsRes.data || []);
      setCurrencies(currenciesRes.data || []);

      if (currenciesRes.data && currenciesRes.data.length > 0) {
        setFormData(prev => ({
          ...prev,
          currencyId: currenciesRes.data[0].id,
        }));
      }
    } catch (error) {
      console.error('Error loading form data:', error);
      Alert.alert('Error', 'Failed to load form data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a transaction');
      return;
    }

    // Validation
    if (!formData.amount || formData.amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!formData.categoryId) {
      Alert.alert('Error', 'Please select a category');
      return;
    }
    if (!formData.paymentMethodId) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    if (!formData.place.trim()) {
      Alert.alert('Error', 'Please enter a place');
      return;
    }

    setLoading(true);
    try {
      // Add userId and convert date to ISO string
      const transactionData = {
        ...formData,
        userId: user.id,
        transactionDate: new Date(formData.transactionDate).toISOString(),
      };

      await transactionService.create(transactionData);
      Alert.alert('Success', 'Transaction created successfully');
      onSuccess();
    } catch (error) {
      console.error('Error creating transaction:', error);
      Alert.alert('Error', 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof CreateTransactionInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loadingData) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-gray-600 dark:text-gray-400">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        <ThemedText type="title" className="mb-6">
          New Transaction
        </ThemedText>

        {/* Transaction Type */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 rounded-lg border-2 p-3 ${
                formData.type === 'expense'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onPress={() => updateFormData('type', 'expense')}
            >
              <Text
                className={`text-center font-medium ${
                  formData.type === 'expense'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 rounded-lg border-2 p-3 ${
                formData.type === 'income'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onPress={() => updateFormData('type', 'income')}
            >
              <Text
                className={`text-center font-medium ${
                  formData.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount
          </Text>
          <TextInput
            label="Amount"
            value={formData.amount.toString()}
            onChangeText={value =>
              updateFormData('amount', parseFloat(value) || 0)
            }
            keyboardType="decimal-pad"
            placeholder="0.00"
            className="w-full"
          />
        </View>

        {/* Currency */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </Text>
          <View className="rounded-lg border border-gray-300 dark:border-gray-600">
            {currencies.map(currency => (
              <TouchableOpacity
                key={currency.id}
                className={`border-b border-gray-200 p-3 dark:border-gray-700 ${
                  formData.currencyId === currency.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                onPress={() => updateFormData('currencyId', currency.id)}
              >
                <Text
                  className={`font-medium ${
                    formData.currencyId === currency.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {currency.currency}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </Text>
          <View className="rounded-lg border border-gray-300 dark:border-gray-600">
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                className={`border-b border-gray-200 p-3 dark:border-gray-700 ${
                  formData.categoryId === category.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                onPress={() => updateFormData('categoryId', category.id)}
              >
                <Text
                  className={`font-medium ${
                    formData.categoryId === category.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Method */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Payment Method
          </Text>
          <View className="rounded-lg border border-gray-300 dark:border-gray-600">
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                className={`border-b border-gray-200 p-3 dark:border-gray-700 ${
                  formData.paymentMethodId === method.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                onPress={() => updateFormData('paymentMethodId', method.id)}
              >
                <Text
                  className={`font-medium ${
                    formData.paymentMethodId === method.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {method.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-4">
          <TextInput
            label="Place"
            value={formData.place}
            onChangeText={value => updateFormData('place', value)}
            placeholder="e.g., Starbucks, Salary, etc."
            className="w-full"
          />
        </View>

        <View className="mb-6">
          <TextInput
            label="Date"
            value={formData.transactionDate}
            onChangeText={value => updateFormData('transactionDate', value)}
            placeholder="YYYY-MM-DD"
            className="w-full"
          />
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3">
          <Button
            title="Cancel"
            onPress={onCancel}
            className="flex-1"
            variant="outline"
          />

          <Button
            title="Create Transaction"
            onPress={handleSubmit}
            disabled={loading}
            className="flex-1"
            variant="outline"
          />
        </View>
      </View>
    </ScrollView>
  );
}
