import { useEffect } from 'react';
import { AppLink, getBasename } from '@ice/stark-app';
import { DatePicker, Space } from 'antd';
import { useTranslation } from 'react-i18next';

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
    console.log('basename', getBasename());
  }, []);

  return (
    <div className={styles.studioHome}>
      {t('common.welcome')}...
      {/* <Space direction="vertical" size={12}>
        <RangePicker />
        <RangePicker showTime />
        <RangePicker picker="week" />
        <RangePicker picker="month" />
        <RangePicker picker="quarter" />
        <RangePicker
          picker="year"
          id={{
            start: 'startInput',
            end: 'endInput',
          }}
          onFocus={(_, info) => {
            console.log('Focus:', info.range);
          }}
          onBlur={(_, info) => {
            console.log('Blur:', info.range);
          }}
        />
      </Space> */}
    </div>
  );
}
