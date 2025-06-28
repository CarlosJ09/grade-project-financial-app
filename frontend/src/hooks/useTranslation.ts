import type { SupportedLanguage } from '@/i18n';
import { useTranslation as useI18nTranslation } from 'react-i18next';

// Custom hook with better TypeScript support
export const useTranslation = () => {
  const { t, i18n, ready } = useI18nTranslation();

  const changeLanguage = async (language: SupportedLanguage) => {
    try {
      await i18n.changeLanguage(language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const getCurrentLanguage = (): SupportedLanguage => {
    return (i18n.language || 'en') as SupportedLanguage;
  };

  // Safe translation function that ensures string return
  const translate = (key: string, options?: any): string => {
    try {
      const result = t(key, options);
      return typeof result === 'string' ? result : String(result);
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return key; // Return key as fallback
    }
  };

  return {
    // Safe translation function
    t: translate,

    // Language utilities
    changeLanguage,
    getCurrentLanguage,
    currentLanguage: getCurrentLanguage(),

    // i18n ready state
    ready,

    // Available languages
    supportedLanguages: ['en', 'es'] as const,
  };
};

// Specific hooks for different sections (optional but helpful for organization)
export const useAuthTranslation = () => {
  const { t } = useTranslation();
  return {
    t: (key: string, options?: any): string => t(`auth.${key}`, options),
  };
};

export const useCommonTranslation = () => {
  const { t } = useTranslation();
  return {
    t: (key: string, options?: any): string => t(`common.${key}`, options),
  };
};

export const useNavigationTranslation = () => {
  const { t } = useTranslation();
  return {
    t: (key: string, options?: any): string => t(`navigation.${key}`, options),
  };
};
