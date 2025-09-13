import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { Dropdown, DropdownOption } from '@/components/ui/Dropdown';
import { TextInput } from '@/components/ui/TextInput';
import { merchantService } from '@/services/merchant';
import { paymentMethodService } from '@/services/paymentMethod';
import { transactionService } from '@/services/transaction';
import { transactionCategoryService } from '@/services/transactionCategory';
import { transactionTypeService } from '@/services/transactionType';
import { userBankingProductService } from '@/services/userBankingProduct';
import { useAuthStore } from '@/stores/authStore';
import { UserBankingProduct } from '@/types/financial/bank';
import { PaymentMethod } from '@/types/financial/shared';
import {
  CreateTransactionInput,
  Merchant,
  TransactionCategory,
  TransactionType,
} from '@/types/financial/transaction';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

interface TransactionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function TransactionForm({ onSuccess, onCancel }: TransactionFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [transactionDate, setTransactionDate] = useState<Date>(new Date());
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [userBankingProducts, setUserBankingProducts] = useState<
    UserBankingProduct[]
  >([]);

  // Form data matching API requirements
  const [formData, setFormData] = useState<
    Omit<CreateTransactionInput, 'userId' | 'transactionDate'>
  >({
    amount: 0,
    currencyId: 4, // Default to Dominican Peso
    exchangeRateId: null,
    transactionTypeId: 0,
    categoryId: 0,
    merchantId: 1, // Default to first merchant
    userBankingProductId: null,
    paymentMethodId: 0,
  });

  const loadFormData = useCallback(async () => {
    try {
      if (!user) {
        Alert.alert('Error', 'You must be logged in');
        return;
      }

      const [
        categoriesRes,
        transactionTypesRes,
        paymentMethodsRes,
        userBankingProductsRes,
        merchantsRes,
      ] = await Promise.all([
        transactionCategoryService.getAll(),
        transactionTypeService.getAll(),
        paymentMethodService.getAll(),
        userBankingProductService.getAllByUserId(user.id),
        merchantService.getAll(),
      ]);

      setCategories(categoriesRes.data || []);
      setTransactionTypes(transactionTypesRes.data || []);
      setPaymentMethods(paymentMethodsRes.data || []);
      setUserBankingProducts(userBankingProductsRes.data || []);
      setMerchants(merchantsRes.data || []);

      // Set default values
      if (transactionTypesRes.data && transactionTypesRes.data.length > 0) {
        const expenseType = transactionTypesRes.data.find(
          t => t.name === 'Expense'
        );
        if (expenseType) {
          setFormData(prev => ({
            ...prev,
            transactionTypeId: expenseType.id,
          }));
        }
      }
      if (merchantsRes.data && merchantsRes.data.length > 0) {
        setFormData(prev => ({
          ...prev,
          merchantId: merchantsRes.data[0].id,
        }));
      }
    } catch (error) {
      console.error('Error loading form data:', error);
      Alert.alert('Error', 'Failed to load form data');
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

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
    if (!formData.transactionTypeId) {
      Alert.alert('Error', 'Please select a transaction type');
      return;
    }
    if (!formData.categoryId) {
      Alert.alert('Error', 'Please select a category');
      return;
    }
    if (!formData.merchantId) {
      Alert.alert('Error', 'Please select a merchant');
      return;
    }
    if (!formData.paymentMethodId) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    setLoading(true);
    try {
      // Create transaction data matching API requirements
      const transactionData: CreateTransactionInput = {
        userId: user.id,
        amount: Number(formData.amount),
        currencyId: Number(formData.currencyId),
        exchangeRateId: formData.exchangeRateId,
        transactionTypeId: Number(formData.transactionTypeId),
        categoryId: Number(formData.categoryId),
        merchantId: Number(formData.merchantId),
        userBankingProductId: formData.userBankingProductId,
        paymentMethodId: Number(formData.paymentMethodId),
        transactionDate: transactionDate,
      };

      console.log(transactionData);

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

  const updateFormData = (
    field: keyof Omit<CreateTransactionInput, 'transactionDate' | 'userId'>,
    value: any
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Convert arrays to dropdown options
  const transactionTypeOptions: DropdownOption[] = transactionTypes.map(
    type => ({
      label: type.name,
      value: type.id.toString(),
    })
  );

  const merchantOptions: DropdownOption[] = merchants.map(merchant => ({
    label: merchant.name,
    value: merchant.id.toString(),
  }));

  const categoryOptions: DropdownOption[] = categories.map(category => ({
    label: category.name,
    value: category.id.toString(),
  }));

  const paymentMethodOptions: DropdownOption[] = paymentMethods.map(method => ({
    label: method.name,
    value: method.id.toString(),
  }));

  const userBankingProductOptions: DropdownOption[] = userBankingProducts.map(
    product => ({
      label: product.label,
      value: product.id,
    })
  );

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

        <View className="mb-4">
          <TextInput
            label="Amount"
            value={formData.amount.toString()}
            onChangeText={value =>
              updateFormData('amount', parseFloat(value) || '')
            }
            keyboardType="decimal-pad"
            placeholder="0.00"
            className="w-full"
          />
        </View>

        <Dropdown
          label="Transaction Type"
          value={formData.transactionTypeId.toString()}
          options={transactionTypeOptions}
          onSelect={value =>
            updateFormData('transactionTypeId', parseInt(value))
          }
          placeholder="Select transaction type"
          className="mb-4"
        />

        <Dropdown
          label="Merchant"
          value={formData.merchantId.toString()}
          options={merchantOptions}
          onSelect={value => updateFormData('merchantId', parseInt(value))}
          placeholder="Select a merchant"
          className="mb-4"
        />

        <Dropdown
          label="Category"
          value={formData?.categoryId?.toString() || ''}
          options={categoryOptions}
          onSelect={value => updateFormData('categoryId', parseInt(value))}
          placeholder="Select a category"
          className="mb-4"
        />

        <Dropdown
          label="Payment Method"
          value={formData.paymentMethodId.toString()}
          options={paymentMethodOptions}
          onSelect={value => updateFormData('paymentMethodId', parseInt(value))}
          placeholder="Select a payment method"
          className="mb-4"
        />

        {userBankingProducts.length > 0 && (
          <Dropdown
            label="Banking Product (Optional)"
            value={formData.userBankingProductId || ''}
            options={userBankingProductOptions}
            onSelect={value =>
              updateFormData('userBankingProductId', value || null)
            }
            placeholder="Select a banking product"
            className="mb-4"
          />
        )}

        <DatePicker
          label="Date"
          value={transactionDate}
          onChange={setTransactionDate}
          className="mb-6"
          maximumDate={new Date()}
          placeholder="Select transaction date"
        />

        {/* Buttons */}
        <View className="flex-row justify-between">
          <Button title="Cancel" onPress={onCancel} variant="outline" />

          <Button
            title="Create Transaction"
            onPress={handleSubmit}
            disabled={loading}
            variant="primary"
          />
        </View>
      </View>
    </ScrollView>
  );
}
