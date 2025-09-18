import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from '@/hooks/useTranslation';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n';

interface LanguageSwitcherProps {
  style?: 'modal' | 'inline';
  onLanguageChange?: (language: SupportedLanguage) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  style = 'modal',
  onLanguageChange,
}) => {
  const { changeLanguage, currentLanguage, t } = useTranslation();

  const handleLanguageChange = async (language: SupportedLanguage) => {
    if (language === currentLanguage) return;

    try {
      await changeLanguage(language);
      onLanguageChange?.(language);

      // Show success message
      Alert.alert(
        t('common.status.success'),
        `Language changed to ${SUPPORTED_LANGUAGES[language]}`,
        [{ text: t('common.actions.done') }]
      );
    } catch (error) {
      Alert.alert(
        t('common.status.error'),
        t('common.errors.unexpectedError'),
        [{ text: t('common.actions.retry') }]
      );
    }
  };

  const showLanguageOptions = () => {
    const options = Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => ({
      text: `${name}${code === currentLanguage ? ' ✓' : ''}`,
      onPress: () => handleLanguageChange(code as SupportedLanguage),
    }));

    Alert.alert(
      t('profile.settings.language'),
      'Choose your preferred language',
      [
        ...options,
        {
          text: t('common.actions.cancel'),
          style: 'cancel' as const,
        },
      ]
    );
  };

  if (style === 'inline') {
    return (
      <View className="gap-2">
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <TouchableOpacity
            key={code}
            className={`flex-row items-center justify-between rounded-xl p-3 ${
              code === currentLanguage
                ? 'border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                : 'bg-gray-50 dark:bg-gray-800'
            }`}
            onPress={() => handleLanguageChange(code as SupportedLanguage)}
          >
            <Text
              className={`font-medium ${
                code === currentLanguage
                  ? 'text-blue-800 dark:text-blue-300'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {name}
            </Text>
            {code === currentLanguage && (
              <Ionicons
                name="checkmark"
                size={18}
                color="#2563eb"
                className="dark:color-blue-400"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
      onPress={showLanguageOptions}
    >
      <View className="flex-row items-center">
        <Ionicons
          name="language"
          size={24}
          color="#6b7280"
          className="mr-3 dark:color-gray-400"
        />
        <Text className="font-medium text-gray-900 dark:text-white">
          {t('profile.settings.language')}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="mr-2 text-gray-600 dark:text-gray-400">
          {SUPPORTED_LANGUAGES[currentLanguage]}
        </Text>
        <Text className="text-xl text-gray-400">›</Text>
      </View>
    </TouchableOpacity>
  );
};
