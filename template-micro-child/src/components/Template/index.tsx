import { useTranslation } from 'react-i18next';

import s from './index.module.less';

export default function TemplateComp() {
  const { t } = useTranslation();
  return <div className={s.template}>{t('common.welcome')}</div>;
}
