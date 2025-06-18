import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getBasename, isInIcestark } from '@ice/stark-app';
import * as dayjs from 'dayjs';
import { DatePicker } from 'antd';

import styles from './index.module.less';

export function pageConfig() {
  return {
    title: 'Home',
  };
}

const { RangePicker } = DatePicker;

export default function IndexPage() {
  const { t } = useTranslation();
  useEffect(() => {
    console.log('isInIcestark', isInIcestark());
    console.log('basename', getBasename());
    console.log('dayjs', dayjs?.months());
  }, []);

  return <div className={styles.app}>{t('common.welcome')}</div>;
}
