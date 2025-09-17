import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { contentItemService } from '@/services/contentItem';
import { moduleService } from '@/services/module';
import { userModuleProgressService } from '@/services/userModuleProgress';
import { useAuthStore } from '@/stores/authStore';
import { useEducationData } from '@/stores/educationStore';
import type { ContentItem, Module } from '@/types/education';

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const moduleId = parseInt(id || '0', 10);

  const [module, setModule] = useState<Module | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { moduleProgress, updateModuleProgress, completeModule } =
    useEducationData();

  const { user } = useAuthStore();

  useEffect(() => {
    loadModuleContent();
  }, [moduleId]);

  const loadModuleContent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [moduleData, content] = await Promise.all([
        moduleService.getById(moduleId),
        contentItemService.getContentByModule(moduleId),
      ]);

      setModule(moduleData);
      setContentItems(content);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load module content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartModule = async () => {
    if (!user || !module) return;

    try {
      await userModuleProgressService.startModule(moduleId);
      // Refresh progress
      loadModuleContent();
    } catch (err: any) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Failed to start module'
      );
    }
  };

  const handleCompleteModule = async () => {
    if (!user || !module) return;

    try {
      await completeModule(moduleId);
      Alert.alert('Congratulations!', 'You have completed this module!');
    } catch (err: any) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Failed to complete module'
      );
    }
  };

  const handleContentItemPress = (contentItem: ContentItem) => {
    router.push(`/(tabs)/learn/content/${contentItem.id}`);
  };

  const getModuleProgress = () => {
    const progress = moduleProgress.find(p => p.moduleId === moduleId);
    return progress?.progressPercent || 0;
  };

  const isModuleCompleted = () => {
    return getModuleProgress() >= 100;
  };

  const hasModuleStarted = () => {
    return moduleProgress.some(p => p.moduleId === moduleId);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">
            Loading module...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !module) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center p-6">
          <Text className="mb-4 text-center text-gray-600 dark:text-gray-400">
            {error || 'Module not found'}
          </Text>
          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-6 py-3"
            onPress={() => router.back()}
          >
            <Text className="font-semibold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progress = getModuleProgress();
  const isCompleted = isModuleCompleted();
  const hasStarted = hasModuleStarted();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Module Header */}
          <View className="mb-6">
            <ThemedText type="title" className="mb-2">
              {module.contentItem}
            </ThemedText>
            <Text className="mb-4 text-gray-600 dark:text-gray-400">
              {module.summary}
            </Text>

            {/* Progress Bar */}
            {hasStarted && (
              <View className="mb-4">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-500">
                    {Math.round(progress)}%
                  </Text>
                </View>
                <View className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <View
                    className="h-3 rounded-full bg-blue-500"
                    style={{ width: `${progress}%` }}
                  />
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              {!hasStarted && (
                <TouchableOpacity
                  className="flex-1 rounded-lg bg-blue-500 px-6 py-3"
                  onPress={handleStartModule}
                >
                  <Text className="text-center font-semibold text-white">
                    Start Module
                  </Text>
                </TouchableOpacity>
              )}

              {hasStarted && !isCompleted && (
                <TouchableOpacity
                  className="flex-1 rounded-lg bg-green-500 px-6 py-3"
                  onPress={handleCompleteModule}
                >
                  <Text className="text-center font-semibold text-white">
                    Mark Complete
                  </Text>
                </TouchableOpacity>
              )}

              {isCompleted && (
                <View className="flex-1 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                  <Text className="text-center font-semibold text-green-800 dark:text-green-300">
                    ✅ Completed
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Module Info */}
          <View className="mb-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <Text className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
              Module Information
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Estimated time: {module.estimatedMinutes} minutes
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Sequence: Module {module.sequence}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Release date: {new Date(module.releaseAt).toLocaleDateString()}
            </Text>
          </View>

          {/* Content Items */}
          <View className="mb-6">
            <ThemedText type="subtitle" className="mb-4">
              Module Content
            </ThemedText>

            {contentItems.length === 0 ? (
              <View className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  No content available yet
                </Text>
              </View>
            ) : (
              <View className="gap-3">
                {contentItems.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
                    onPress={() => handleContentItemPress(item)}
                  >
                    <View className="flex-row items-center">
                      <View className="mr-3">
                        <Text className="text-2xl">📄</Text>
                      </View>

                      <View className="flex-1">
                        <Text className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                          {item.title}
                        </Text>
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                          Section {item.sequence}
                        </Text>
                      </View>

                      <View className="ml-3">
                        <Text className="text-gray-400">›</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
