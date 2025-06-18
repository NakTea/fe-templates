import { useState, useEffect } from 'react';
import { store } from '@ice/stark-data';
import I18N from '@/components/i18n';
import { ConfigProvider } from 'antd';
import * as dayjs from 'dayjs';
import { getLocaleOnClient, getMatchedLangName } from '@/i18n';

import BasicLayout from '../BasicLayout';
import UserLayout from '../UserLayout';

export default function FrameworkLayout(props: {
  children: React.ReactNode;
  pathname: string;
  appLeave: { path: string };
  appEnter: { path: string };
}) {
  const localeInit = getLocaleOnClient();
  const [locale, setLocle] = useState(localeInit);
  const [langName, setLangName] = useState(null);
  const [langInfo, setLangInfo] = useState({});

  const { pathname, children, appLeave, appEnter } = props;
  const Layout = ['/login', '/home']?.includes(pathname) ? UserLayout : BasicLayout;
  // const Layout = UserLayout;

  useEffect(() => {
    // console.log('== app leave ==', appLeave);
  }, [appLeave]);

  useEffect(() => {
    // console.log('== app enter ==', appEnter);
  }, [appEnter]);

  useEffect(() => {
    // console.log('--locale', locale);
    const matchedLang = getMatchedLangName[locale] || getMatchedLangName.default;
    setLangName(matchedLang);
    setLangInfo({ locale, matchedLang, setLocle });
    store.set('languageInfo', { locale, matchedLang }); // 设置语言
    // console.log('locale', locale, langName);
  }, [locale]);

  useEffect(() => {
    dayjs.locale(langName?.dayjs?.name);
    // console.log(dayjs.months());
  }, [langName]);

  return (
    <I18N {...{ locale }}>
      <ConfigProvider locale={langName?.antd?.resource}>
        <Layout pathname={pathname} langInfo={langInfo}>
          {children}
        </Layout>
      </ConfigProvider>
    </I18N>
  );
}
