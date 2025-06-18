import React, { useState } from 'react';
import { setLocaleOnClient } from '@/i18n';
import { useTranslation } from 'react-i18next';
import { getOssUriPrefix } from '@/config';
import useUserInfoStore from '@/store/store-user';

import s from './index.module.less';

export default function Header({ lang, setLocle }) {
  const { t } = useTranslation();
  const user = useUserInfoStore((state) => state.userInfo);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  const [langName, setLangName] = useState(lang);
  return (
    <div className={s.header}>
      <div className={s.left}>
        <img src={`${getOssUriPrefix()}/assets/img/logo.png`} height="30" />
        {/* <span className={s.logoName}>{t('common.header.name')}</span> */}
      </div>

      <div className={s.right}>
        用户名：{user?.name || '-'}
        <div
          onClick={() => {
            setUserInfo({
              name: +new Date(),
            });
          }}
        >
          重命名
        </div>
        <div
          className={s.locale}
          onClick={() => {
            // console.log('change locale name before', langName);
            let name = langName;
            name = name === 'zh-CN' ? 'en-US' : 'zh-CN';
            console.log('change locale name', name);
            setLocle(name);
            setLocaleOnClient(name, true);
            setLangName(name);
          }}
        >
          {langName === 'zh-CN' ? t('common.header.en') : t('common.header.cn')}
        </div>
      </div>
    </div>
  );
}
