import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { Dropdown, DropdownOption } from '@/components/ui/Dropdown';
import { TextInput } from '@/components/ui/TextInput';
import { budgetService } from '@/services/budget';
import { budgetCategoryService } from '@/services/budgetCategory';
import { budgetTypeService } from '@/services/budgetType';
import { useAuthStore } from '@/stores/authStore';
import { BudgetCategory, BudgetType } from '@/types/financial/budget';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

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
  budgetTypeId: number;
  startedDate: Date;
  finishedDate: Date;
  statusId: number;
};

export function BudgetForm({ onSuccess, onCancel }: BudgetFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [categories, setCategories] = useState<DropdownOption[]>([]);
  const [budgetTypes, setBudgetTypes] = useState<DropdownOption[]>([]);
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    currentAmount: 0,
    goalAmount: 0,
    currencyId: 4, // Default to Dominican Peso
    categoryId: 0,
    budgetTypeId: 0,
    startedDate: new Date(),
    finishedDate: new Date(),
    statusId: 1,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoadingData(true);
    try {
      await Promise.all([loadCategories(), loadBudgetTypes()]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert('Error', 'Failed to load form data');
    } finally {
      setLoadingData(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await budgetCategoryService.getAll();
      const categories = res.map((category: BudgetCategory) => ({
        label: category.name,
        value: category.id.toString(),
      }));
      setCategories(categories);

      // Set first category as default if available
      if (categories.length > 0) {
        setForm(prev => ({ ...prev, categoryId: Number(categories[0].value) }));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      throw error;
    }
  };

  const loadBudgetTypes = async () => {
    try {
      const res = await budgetTypeService.getAll();
      const types = res.map((type: BudgetType) => ({
        label: type.name,
        value: type.id.toString(),
      }));
      setBudgetTypes(types);

      // Set first type as default if available
      if (types.length > 0) {
        setForm(prev => ({ ...prev, budgetTypeId: Number(types[0].value) }));
      }
    } catch (error) {
      console.error('Error loading budget types:', error);
      throw error;
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
    if (!form.categoryId) {
      Alert.alert('Error', 'Please select a category');
      return;
    }
    if (!form.budgetTypeId) {
      Alert.alert('Error', 'Please select a budget type');
      return;
    }
    if (!form.goalAmount || form.goalAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid goal amount');
      return;
    }
    if (form.finishedDate < form.startedDate) {
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
        currencyId: form.currencyId,
        statusId: form.statusId,
        categoryId: form.categoryId,
        budgetTypeId: form.budgetTypeId,
        startedDate: form.startedDate,
        finishedDate: form.finishedDate,
        // These are required by the API but seem to be placeholder values
        // based on the schema design issue
        budgetAllocationId: 1,
        budgetExecutionId: 1,
      });

      if (res?.id) {
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
          className="mb-4"
        />

        <Dropdown
          label="Budget Type"
          value={form.budgetTypeId.toString()}
          options={budgetTypes}
          onSelect={value => update('budgetTypeId', Number(value))}
          placeholder="Select a budget type"
          className="mb-4"
        />

        <DatePicker
          label="Start Date"
          value={form.startedDate}
          onChange={date => update('startedDate', date)}
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
