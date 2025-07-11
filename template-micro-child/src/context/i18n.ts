import { createContext, useContext } from 'use-context-selector';
import type { Locale } from '@/i18n';
import { getLanguage } from '@/i18n/language';
import { defaultLocale } from '@/i18n/i18next-config';

type II18NContext = {
  locale: Locale;
  i18n: Record<string, any>;
  setLocaleOnClient: (_lang: Locale, _reloadPage?: boolean) => void;
};

const I18NContext = createContext<II18NContext>({
  locale: defaultLocale,
  i18n: {},
  setLocaleOnClient: (_lang: Locale, _reloadPage?: boolean) => {},
});

export const useI18N = () => useContext(I18NContext);
export const useGetLanguage = () => {
  const { locale } = useI18N();

  return getLanguage(locale);
};

export default I18NContext;
