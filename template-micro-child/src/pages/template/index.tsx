import { useTranslation } from 'react-i18next';
import { useUser } from '@/hooks/useUser';

import s from './index.module.less';

export function pageConfig() {
  return {
    title: 'template',
  };
}

export default function TemplateComp() {
  const { t } = useTranslation();
  const { userInfo, updateUserInfo, clearUserInfo, isLogin } = useUser();

  return (
    <div className={s.template}>
      {t('common.welcome')}
      <div>
        用户名：{userInfo?.name || '-'}
        <div
          onClick={() => {
            updateUserInfo({
              name: +new Date(),
            });
          }}
        >
          重命名
        </div>
      </div>
    </div>
  );
}
