import { BudgetForm } from '@/components/finances/budget/BudgetForm';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BudgetModal({ visible, onClose, onSuccess }: BudgetModalProps) {
  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            New Budget
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
          >
            <Text className="font-medium text-gray-600 dark:text-gray-400">
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <BudgetForm onSuccess={handleSuccess} onCancel={onClose} />
      </SafeAreaView>
    </Modal>
  );
}
