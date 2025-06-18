import { useTranslation } from 'react-i18next';
import styles from './index.module.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <p className={styles.footer}>
      <p className={styles.copyright}>© 2014-{t('common.footer.name')}</p>
    </p>
  );
}
