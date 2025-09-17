import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemedText } from '@/components/ThemedText';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/stores/authStore';
import { logout } from '@/utils/logout';

export default function ProfileScreen() {
  const { user, logout: storeLogout } = useAuthStore();
  const { t } = useTranslation();

  const handleLogout = () => {
    Alert.alert(
      t('profile.logout.confirmTitle'),
      t('profile.logout.confirmMessage'),
      [
        { text: t('profile.logout.cancel'), style: 'cancel' },
        {
          text: t('profile.logout.confirm'),
          style: 'destructive',
          onPress: async () => {
            await logout();
            await storeLogout();
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      title: t('profile.menu.personalInfo'),
      icon: '👤',
      onPress: () => {},
    },
    {
      title: t('profile.menu.securityPrivacy'),
      icon: '🔒',
      onPress: () => {},
    },
    {
      title: t('profile.menu.notifications'),
      icon: '🔔',
      onPress: () => {},
    },
    {
      title: t('profile.menu.helpSupport'),
      icon: '❓',
      onPress: () => {},
    },
    {
      title: t('profile.menu.about'),
      icon: 'ℹ️',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="border-b border-gray-200 p-4 dark:border-gray-700">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Text className="text-2xl text-blue-500">←</Text>
          </TouchableOpacity>
          <ThemedText type="title">{t('profile.title')}</ThemedText>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* User Info */}
        <View className="items-center border-b border-gray-200 p-6 dark:border-gray-700">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-500">
            <Text className="text-2xl font-bold text-white">
              {user?.firstName?.[0]?.toUpperCase() || 'C'}
            </Text>
          </View>
          <ThemedText type="subtitle" className="mb-1">
            {user?.firstName} {user?.lastName}
          </ThemedText>
          <Text className="text-gray-600 dark:text-gray-400">
            {user?.email}
          </Text>
        </View>

        {/* Language Switcher */}
        <View className="p-4">
          <LanguageSwitcher />
        </View>

        {/* Theme Switcher */}
        <View className="px-4 pb-4">
          <View className="mb-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <View className="mb-3 flex-row items-center">
              <Text className="mr-4 text-2xl">🎨</Text>
              <View className="flex-1">
                <Text className="font-medium text-gray-900 dark:text-white">
                  {t('profile.theme.title')}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {t('profile.theme.description')}
                </Text>
              </View>
            </View>
            <ThemeSwitcher variant="full" showLabels />
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 pb-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="mb-3 flex-row items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
              onPress={item.onPress}
            >
              <Text className="mr-4 text-2xl">{item.icon}</Text>
              <View className="flex-1">
                <Text className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </Text>
              </View>
              <Text className="text-xl text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="p-4">
          <TouchableOpacity
            className="rounded-xl bg-red-500 p-4"
            onPress={handleLogout}
          >
            <Text className="text-center font-semibold text-white">
              {t('profile.logout.button')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="items-center p-4">
          <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {t('profile.appInfo.title')}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            {t('profile.appInfo.version')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
