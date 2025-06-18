import { useTranslation } from 'react-i18next';
import s from './index.module.less';

export function pageConfig() {
  return {
    title: 'template',
  };
}

export default function IndexPage() {
  const { t } = useTranslation();

  return <div className={s.indexPage}>{t('common.welcome')}...</div>;
}
