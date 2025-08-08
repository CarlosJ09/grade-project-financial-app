import { useColorScheme } from '@/hooks/useColorScheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}

export function DatePicker({
  label,
  value,
  onChange,
  mode = 'date',
  placeholder = 'Select date',
  disabled = false,
  error,
  className,
  maximumDate,
  minimumDate,
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const formatDate = (date: Date) => {
    if (mode === 'date') {
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    } else if (mode === 'time') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleString();
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (selectedDate && event.type !== 'dismissed') {
      onChange(selectedDate);
    }
  };

  const showDatePicker = () => {
    if (!disabled) {
      setShow(true);
    }
  };

  const hideDatePicker = () => {
    setShow(false);
  };

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
        onPress={showDatePicker}
        disabled={disabled}
      >
        <Text
          className={`flex-1 ${
            value
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </Text>
      )}

      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          is24Hour={true}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          textColor={isDark ? '#ffffff' : '#000000'}
          themeVariant={isDark ? 'dark' : 'light'}
          // On iOS, add additional props for modal presentation
          {...(Platform.OS === 'ios' && {
            display: 'spinner',
            style: {
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
            },
          })}
        />
      )}

      {/* iOS specific: Add done button overlay */}
      {Platform.OS === 'ios' && show && (
        <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center bg-black/50">
          <View className="mx-6 rounded-xl bg-white p-4 dark:bg-gray-800">
            <DateTimePicker
              value={value}
              mode={mode}
              is24Hour={true}
              onChange={handleDateChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              textColor={isDark ? '#ffffff' : '#000000'}
              themeVariant={isDark ? 'dark' : 'light'}
              display="spinner"
            />
            <TouchableOpacity
              className="mt-4 rounded-lg bg-blue-600 p-3"
              onPress={hideDatePicker}
            >
              <Text className="text-center font-medium text-white">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
