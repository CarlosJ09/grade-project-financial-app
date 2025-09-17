import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { ThemedText } from '@/components/ThemedText';
import { contentItemService } from '@/services/contentItem';
import type { ContentItem } from '@/types/education';

export default function ContentItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contentItemId = parseInt(id || '0', 10);

  const [contentItem, setContentItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, [contentItemId]);

  const loadContent = async () => {
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
  };

  const renderMarkdownContent = (markdown: string) => {
    // Simple markdown to HTML conversion for basic formatting
    const htmlContent = markdown
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 20px;
            }
            h1, h2, h3 {
              color: #2563eb;
              margin-top: 24px;
              margin-bottom: 16px;
            }
            h1 { font-size: 24px; }
            h2 { font-size: 20px; }
            h3 { font-size: 18px; }
            p { margin-bottom: 16px; }
            strong { font-weight: 600; }
            em { font-style: italic; }
            @media (prefers-color-scheme: dark) {
              body { background-color: #1f2937; color: #f9fafb; }
              h1, h2, h3 { color: #60a5fa; }
            }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `;

    return html;
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
        <View className="flex-1">
          {contentItem.fileUrl ? (
            <View className="flex-1 p-4">
              <Text className="mb-4 text-center text-gray-600 dark:text-gray-400">
                📎 File: {contentItem.fileUrl}
              </Text>
              {contentItem.markdownBody && (
                <ScrollView className="flex-1">
                  <WebView
                    source={{
                      html: renderMarkdownContent(contentItem.markdownBody),
                    }}
                    style={{ flex: 1, minHeight: 400 }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                  />
                </ScrollView>
              )}
            </View>
          ) : (
            <ScrollView className="flex-1 p-4">
              <WebView
                source={{
                  html: renderMarkdownContent(contentItem.markdownBody),
                }}
                style={{ flex: 1, minHeight: 400 }}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          )}
        </View>

        {/* Footer Actions */}
        <View className="border-t border-gray-200 p-4 dark:border-gray-700">
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
