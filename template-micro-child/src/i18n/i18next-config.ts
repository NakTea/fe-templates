'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LanguagesSupported } from '@/i18n/language';

export const defaultLocale = 'zh-CN';

const loadLangResources = (lang: string) => ({
  translation: {
    common: require(`./${lang}/common`).default,
  },
});

// Automatically generate the resources object
const resources = LanguagesSupported.reduce((acc: any, lang: string) => {
  acc[lang] = loadLangResources(lang);
  return acc;
}, {});

i18n.use(initReactI18next).init({
  lng: undefined,
  fallbackLng: defaultLocale,
  resources,
});

export const { changeLanguage } = i18n;
export default i18n;
