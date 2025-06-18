import Cookies from 'js-cookie';

import { changeLanguage, defaultLocale } from '@/i18n/i18next-config';
import { LOCALE_COOKIE_NAME } from '@/config';
import { LanguagesSupported } from '@/i18n/language';

export const i18n = {
  defaultLocale,
  locales: LanguagesSupported,
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const getMatchedLangName = {
  default: {
    dayjs: {
      name: 'zh-cn',
      resource: require('dayjs/locale/zh-cn'),
    },
    antd: {
      name: 'zh_CN',
      resource: require('antd/locale/zh_CN').default,
    },
  },
  'zh-CN': {
    dayjs: {
      name: 'zh-cn',
      resource: require('dayjs/locale/zh-cn'),
    },
    antd: {
      name: 'zh_CN',
      resource: require('antd/locale/zh_CN').default,
    },
  },
  'en-US': {
    dayjs: {
      name: 'en',
      resource: require('dayjs/locale/en'),
    },
    antd: {
      name: 'en_GB',
      resource: require('antd/locale/en_GB'),
    },
  },
};

export const setLocaleOnClient = (locale: Locale, reloadPage = true) => {
  Cookies.set(LOCALE_COOKIE_NAME, locale);
  changeLanguage(locale);
  reloadPage && location.reload();
};

export const getLocaleOnClient = (): Locale => {
  return (Cookies.get(LOCALE_COOKIE_NAME) as Locale) || i18n.defaultLocale;
};

// 读取cookie内的语言信息
setLocaleOnClient(getLocaleOnClient(), false);
