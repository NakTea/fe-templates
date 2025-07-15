import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import IconUri, {
  AlarmFill1,
  Calendar,
  CalendarBadgeClock,
  Dashboard,
  Extroversion,
  IconWarningJingao,
  IconWarningWeixian,
  IconWarningZhuyi,
  Logo,
  Neuroticism,
  Rain,
  Trash,
  Union,
} from '../components/Icons';

export default function IconPreviewScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Icon Preview' }} />
      <ScrollView style={styles.container}>
        <IconUri
          size={16}
          url="https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg"
        />
        <Text style={styles.iconLabel}>AlarmFill1:</Text>
        <AlarmFill1 size={60} />
        <Text style={styles.iconLabel}>Calendar:</Text>
        <Calendar size={60} />
        <Text style={styles.iconLabel}>CalendarBadgeClock:</Text>
        <CalendarBadgeClock size={60} />
        <Text style={styles.iconLabel}>Dashboard:</Text>
        <Dashboard size={60} />
        <Text style={styles.iconLabel}>Extroversion:</Text>
        <Extroversion size={100} />
        <Text style={styles.iconLabel}>IconWarningJingao:</Text>
        <IconWarningJingao size={24} />
        <Text style={styles.iconLabel}>IconWarningWeixian:</Text>
        <IconWarningWeixian size={24} />
        <Text style={styles.iconLabel}>IconWarningZhuyi:</Text>
        <IconWarningZhuyi size={24} />
        <Text style={styles.iconLabel}>Logo:</Text>
        <Logo size={60} />
        <Text style={styles.iconLabel}>Neuroticism:</Text>
        <Neuroticism size={100} />
        <Text style={styles.iconLabel}>Rain:</Text>
        <Rain size={60} />
        <Text style={styles.iconLabel}>Trash:</Text>
        <Trash size={60} />
        <Text style={styles.iconLabel}>Union:</Text>
        <Union size={60} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
