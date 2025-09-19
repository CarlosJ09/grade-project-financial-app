import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { contentItemService } from '@/services/contentItem';
import type { ContentItem } from '@/types/education';

export default function ContentItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contentItemId = parseInt(id || '0', 10);

  const [contentItem, setContentItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const content = await contentItemService.getById(contentItemId);
      setContentItem(content);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load content');
    } finally {
      setIsLoading(false);
    }
  }, [contentItemId]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const markdownStyles = {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: isDark ? '#f9fafb' : '#374151',
      fontFamily: 'System',
    },
    heading1: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: isDark ? '#60a5fa' : '#2563eb',
      marginTop: 24,
      marginBottom: 16,
    },
    heading2: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: isDark ? '#60a5fa' : '#2563eb',
      marginTop: 20,
      marginBottom: 12,
    },
    heading3: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: isDark ? '#60a5fa' : '#2563eb',
      marginTop: 16,
      marginBottom: 8,
    },
    paragraph: {
      marginBottom: 16,
      fontSize: 16,
      lineHeight: 24,
    },
    strong: {
      fontWeight: '600' as const,
    },
    em: {
      fontStyle: 'italic' as const,
    },
    code_inline: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      color: isDark ? '#f87171' : '#dc2626',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontFamily: 'Courier',
      fontSize: 14,
    },
    code_block: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      fontFamily: 'Courier',
      fontSize: 14,
    },
    fence: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      fontFamily: 'Courier',
      fontSize: 14,
    },
    blockquote: {
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      borderLeftWidth: 4,
      borderLeftColor: isDark ? '#60a5fa' : '#2563eb',
      paddingLeft: 16,
      paddingVertical: 8,
      marginVertical: 8,
      fontStyle: 'italic' as const,
    },
    list_item: {
      marginBottom: 8,
    },
    bullet_list: {
      marginVertical: 8,
    },
    ordered_list: {
      marginVertical: 8,
    },
    hr: {
      backgroundColor: isDark ? '#4b5563' : '#d1d5db',
      height: 1,
      marginVertical: 16,
    },
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600 dark:text-gray-400">
            Loading content...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !contentItem) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center p-6">
          <Text className="mb-4 text-center text-gray-600 dark:text-gray-400">
            {error || 'Content not found'}
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

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1">
        {/* Header */}
        <View className="border-b border-gray-200 p-4 dark:border-gray-700">
          <ThemedText type="subtitle" className="mb-1">
            {contentItem.title}
          </ThemedText>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Section {contentItem.sequence}
          </Text>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={true}>
          {contentItem.fileUrl && (
            <View className="mb-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <Text className="text-center text-blue-700 dark:text-blue-300">
                📎 File: {contentItem.fileUrl}
              </Text>
            </View>
          )}

          {contentItem.markdownBody ? (
            <Markdown style={markdownStyles}>
              {contentItem.markdownBody}
            </Markdown>
          ) : (
            <View className="flex-1 items-center justify-center py-8">
              <Text className="text-center text-gray-500 dark:text-gray-400">
                No content available for this item.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Footer Actions */}
        <View className="mb-14 border-t border-gray-200 p-4 dark:border-gray-700">
          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-6 py-3"
            onPress={() => router.back()}
          >
            <Text className="text-center font-semibold text-white">
              Back to Module
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
