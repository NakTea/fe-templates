import data from './languages.json';
export type Item = {
  value: number | string;
  name: string;
  example: string;
};

export type I18nText = {
  'en-US': string;
  'zh-CN': string;
};

export const { languages } = data;

export const LanguagesSupported = languages.filter((item) => item.supported).map((item) => item.value);

export const getLanguage = (locale: string) => {
  if (locale === 'zh-CN') return locale.replace('-', '_');

  return LanguagesSupported[0].replace('-', '_');
};

export const NOTICE_I18N = {
  title: {
    en_US: 'Notice',
    zh_CN: '公告',
  },
  desc: {
    en_US: 'This is a Notice',
    zh_CN: '这一条公告',
  },
  href: '/stuido/',
};
