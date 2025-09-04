import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/colors';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useColorScheme } from '@/hooks/useColorScheme';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isLoading } = useAuthGuard(true);

  if (isLoading) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances/index"
        options={{
          title: 'Finances',
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="creditcard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances/balance"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="message1" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
