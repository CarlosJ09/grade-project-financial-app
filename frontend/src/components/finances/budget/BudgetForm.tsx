import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { Dropdown, DropdownOption } from '@/components/ui/Dropdown';
import { TextInput } from '@/components/ui/TextInput';
import { budgetService } from '@/services/budget';
import { categoryService } from '@/services/category';
import { currencyService } from '@/services/currency';
import { useAuthStore } from '@/stores/authStore';
import { Currency } from '@/types/financial/shared';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface BudgetFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type FormState = {
  name: string;
  description: string;
  currentAmount: number;
  goalAmount: number;
  currencyId: number;
  categoryId: number;
  startDate: Date;
  finishedDate: Date;
  statusId: number;
};

export function BudgetForm({ onSuccess, onCancel }: BudgetFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [categories, setCategories] = useState<DropdownOption[]>([]);
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    currentAmount: 0,
    goalAmount: 0,
    currencyId: 0,
    categoryId: 0,
    startDate: new Date(),
    finishedDate: new Date(),
    statusId: 1,
  });

  useEffect(() => {
    loadCategories();
    loadCurrencies();
  }, []);

  const loadCategories = async () => {
    const res = await categoryService.getAll();
    const categories = res.data
      .filter(category => category.type === 'budget')
      .map(category => {
        return {
          label: category.name,
          value: category.id,
        };
      });

    console.log(res.data);
    setCategories(categories);
  };

  const loadCurrencies = async () => {
    try {
      const res = await currencyService.getAll();
      setCurrencies(res.data || []);
      if (res.data && res.data.length > 0) {
        // Use currency code (e.g., 'USD') for budgets API
        setForm(prev => ({ ...prev, currencyId: res.data[0].id }));
      }
    } catch (error) {
      console.error('Error loading currencies:', error);
      Alert.alert('Error', 'Failed to load currencies');
    } finally {
      setLoadingData(false);
    }
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a budget');
      return;
    }

    // Basic validation
    if (!form.name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }
    if (!form.currencyId) {
      Alert.alert('Error', 'Please select a currency');
      return;
    }
    if (!form.goalAmount || form.goalAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid goal amount');
      return;
    }
    if (form.finishedDate < form.startDate) {
      Alert.alert('Error', 'Finished date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const res = await budgetService.create({
        userId: user.id,
        name: form.name.trim(),
        description: form.description.trim(),
        currentAmount: Number(form.currentAmount) || 0,
        goalAmount: Number(form.goalAmount),
        currencyId: form.currencyId, // currency code e.g., 'USD'
        startDate: form.startDate,
        finishedDate: form.finishedDate,
        statusId: form.statusId,
        categoryId: form.categoryId,
      });

      if (res.status === 201) {
        Alert.alert('Success', 'Budget created successfully');
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating budget:', error);
      Alert.alert('Error', 'Failed to create budget');
    } finally {
      setLoading(false);
    }
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
          New Budget
        </ThemedText>

        <View className="mb-4">
          <TextInput
            label="Name"
            value={form.name}
            onChangeText={value => update('name', value)}
            placeholder="e.g., Emergency Fund"
            className="w-full"
          />
        </View>

        <View className="mb-4">
          <TextInput
            label="Description"
            value={form.description}
            onChangeText={value => update('description', value)}
            placeholder="Describe your budget goal"
            className="w-full"
          />
        </View>

        <View className="mb-4">
          <TextInput
            label="Current Amount"
            value={String(form.currentAmount)}
            onChangeText={value =>
              update('currentAmount', parseFloat(value) || 0)
            }
            keyboardType="decimal-pad"
            placeholder="0.00"
            className="w-full"
          />
        </View>

        <View className="mb-4">
          <TextInput
            label="Goal Amount"
            value={String(form.goalAmount)}
            onChangeText={value => update('goalAmount', parseFloat(value) || 0)}
            keyboardType="decimal-pad"
            placeholder="0.00"
            className="w-full"
          />
        </View>

        <Dropdown
          label="Category"
          value={form.categoryId.toString()}
          options={categories}
          onSelect={value => update('categoryId', Number(value))}
          placeholder="Select a category"
        />

        {/* Currency selector (use currency code) */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </Text>
          <View className="rounded-lg border border-gray-300 dark:border-gray-600">
            {currencies.map(currency => (
              <TouchableOpacity
                key={currency.id}
                className={`border-b border-gray-200 p-3 dark:border-gray-700 ${
                  form.currencyId === currency.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                onPress={() => update('currencyId', currency.id)}
              >
                <Text
                  className={`font-medium ${
                    form.currencyId === currency.id
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

        <DatePicker
          label="Start Date"
          value={form.startDate}
          onChange={date => update('startDate', date)}
          className="mb-4"
          placeholder="Select start date"
        />

        <DatePicker
          label="Finished Date"
          value={form.finishedDate}
          onChange={date => update('finishedDate', date)}
          className="mb-6"
          placeholder="Select finished date"
        />

        <View className="flex-row justify-between">
          <Button title="Cancel" onPress={onCancel} variant="outline" />
          <Button
            title="Create Budget"
            onPress={handleSubmit}
            disabled={loading}
            variant="primary"
          />
        </View>
      </View>
    </ScrollView>
  );
}
