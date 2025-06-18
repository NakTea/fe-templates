import { useState, useEffect } from 'react';
import { Outlet } from 'ice';
import { isInIcestark } from '@ice/stark-app';
import { store } from '@ice/stark-data';
import I18N from '@/components/i18n';
import { getLocaleOnClient, getMatchedLangName } from '@/i18n';
import { ConfigProvider } from 'antd';
import * as dayjs from 'dayjs';

export default function Layout(props) {
  // const [langInfo, setLangInfo] = useState({});
  const [isInner, setIsInner] = useState(true);
  let langInfo;
  store.on(
    'languageInfo',
    (lang) => {
      // console.log('lang-child', lang);
      langInfo = lang;
      // 这里不能用usestate ????
      // setLangInfo(lang);
    },
    true,
  );

  if (!isInIcestark()) {
    const locale = getLocaleOnClient();
    const matchedLang = getMatchedLangName[locale] || getMatchedLangName.default;
    langInfo = { locale, matchedLang };
  }

  dayjs?.locale(langInfo?.matchedLang?.dayjs?.name);

  useEffect(() => {
    setIsInner(isInIcestark());
  }, []);

  // useEffect(() => {
  //   dayjs?.locale(langInfo?.matchedLang?.dayjs?.name);
  // }, [langInfo?.locale]);

  // console.log('props', props);
  // console.log('zhCN', zhCN);
  // console.log('langInfo', langInfo?.matchedLang?.antd?.resource);
  // dayjs.locale('zh-cn');
  return (
    <I18N {...{ locale: langInfo?.locale }}>
      <ConfigProvider locale={langInfo?.matchedLang?.antd?.resource}>
        <div style={{ height: isInner ? 'calc(100vh - 64px)' : '100vh' }}>
          <Outlet />
        </div>
      </ConfigProvider>
    </I18N>
  );
}
