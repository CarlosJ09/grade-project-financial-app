import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/i18n/locales/en';
import es from '@/i18n/locales/es';

export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

const getDeviceLanguage = (): SupportedLanguage => {
  try {
    let locale = 'en';

    if (Localization.locale && typeof Localization.locale === 'string') {
      locale = Localization.locale;
    } else if (
      Localization.locales &&
      Array.isArray(Localization.locales) &&
      Localization.locales.length > 0
    ) {
      locale = Localization.locales[0];
    }

    // Ensure locale is a string and split safely
    if (typeof locale === 'string' && locale.length > 0) {
      const deviceLanguage = locale.split('-')[0] as SupportedLanguage;
      return Object.keys(SUPPORTED_LANGUAGES).includes(deviceLanguage)
        ? deviceLanguage
        : 'en';
    }

    return 'en';
  } catch (error) {
    console.warn('Error detecting device language:', error);
    return 'en';
  }
};

// Configure and initialize i18next
i18n
  .use(initReactI18next)
  .init({
    // Resources containing translations
    resources: {
      en: { translation: en },
      es: { translation: es },
    },

    // Language to use if translations in current language are not available
    fallbackLng: 'en',

    lng: getDeviceLanguage(),

    debug: __DEV__,

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    keySeparator: '.',

    nsSeparator: ':',
  })
  .catch(error => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
