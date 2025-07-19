import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import IconUri, {
  MediaIqiyi
} from '../components/Icons';

export default function IconPreviewScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Icon Preview' }} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconUri:</Text>
            <IconUri
              size={24}
              url="https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg"
            />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaIqiyi:</Text>
            <MediaIqiyi size={60} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  iconItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
});
