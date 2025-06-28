import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import en from './locales/en';
import es from './locales/es';

// Define available languages
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Get device language or fallback to English
const getDeviceLanguage = (): SupportedLanguage => {
  try {
    // Get the primary locale safely
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

    // Auto-detect device language
    lng: getDeviceLanguage(),

    // Debug mode (disable in production)
    debug: __DEV__,

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already handles escaping
    },

    // React options
    react: {
      useSuspense: false, // Disable suspense for React Native
    },

    // Key separator for nested objects
    keySeparator: '.',

    // Namespace separator
    nsSeparator: ':',
  })
  .catch(error => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
