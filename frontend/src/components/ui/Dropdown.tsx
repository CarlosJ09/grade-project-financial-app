import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label: string;
  value?: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function Dropdown({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className,
}: DropdownProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsModalVisible(false);
  };

  const renderOption = ({ item }: { item: DropdownOption }) => (
    <TouchableOpacity
      className={`border-b border-gray-200 p-4 dark:border-gray-700 ${
        item.value === value ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      onPress={() => handleSelect(item.value)}
    >
      <Text
        className={`font-medium ${
          item.value === value
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className={className}>
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}

      <TouchableOpacity
        className={`flex-row items-center justify-between rounded-xl border bg-white p-4 dark:bg-gray-800 ${
          error
            ? 'border-red-500'
            : disabled
              ? 'border-gray-200 dark:border-gray-700'
              : 'border-gray-300 dark:border-gray-600'
        } ${disabled ? 'opacity-60' : ''}`}
        onPress={() => !disabled && setIsModalVisible(true)}
        disabled={disabled}
      >
        <Text
          className={`flex-1 ${
            selectedOption
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text className="text-gray-400 dark:text-gray-500">▼</Text>
      </TouchableOpacity>

      {error && (
        <Text className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </Text>
      )}

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/50"
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable
            className="mx-6 max-h-96 w-full max-w-sm rounded-xl bg-white dark:bg-gray-800"
            onPress={e => e.stopPropagation()}
          >
            <View className="border-b border-gray-200 p-4 dark:border-gray-700">
              <Text className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                {label}
              </Text>
            </View>

            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={renderOption}
              style={{ maxHeight: 300 }}
              showsVerticalScrollIndicator={true}
            />

            <TouchableOpacity
              className="border-t border-gray-200 p-4 dark:border-gray-700"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-center font-medium text-blue-600 dark:text-blue-400">
                Cancel
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
