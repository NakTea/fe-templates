import React, { useState } from 'react';
import { setLocaleOnClient } from '@/i18n';
import { useTranslation } from 'react-i18next';
import { getOssUriPrefix } from '@/config';
import NavItems from '../NavItems';
import MobileMenu from '../MobileMenu';
// import useUserStore from '@/userStore';

import s from './index.module.less';

export default function Header({ lang }) {
  const { t } = useTranslation();
  // const user = useUserStore((state) => state.user);
  // const { setUser } = useUserStore();

  const [langName, setLangName] = useState(lang);
  return (
    <div className={s.header}>
      <div className={s.left}>
        <img src={`${getOssUriPrefix()}/assets/img/logo.png`} height="30" />
        {/* <span className={s.logoName}>{t('common.header.name')}</span> */}
        {/* 用户名：{user?.name || '-'} */}
      </div>

      <div className={s.nav}>
        <NavItems />
      </div>

      <div className={s.right}>
        <div className={s.navMobile}>
          <MobileMenu />
        </div>

        <div
          className={s.locale}
          onClick={() => {
            let name = langName;
            name = name === 'zh-CN' ? 'en-US' : 'zh-CN';
            setLocaleOnClient(name, false);
            setLangName(name);
          }}
        >
          {langName === 'zh-CN' ? t('common.header.en') : t('common.header.cn')}
        </div>
      </div>

      {/* <div
        onClick={() => {
          setUser({
            name: +new Date(),
          });
        }}
      >
        Change user name
      </div> */}
    </div>
  );
}
