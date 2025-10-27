import { IconUvFill } from '@/app/components/basic/Icon';
import { StyleSheet, View } from 'react-native';
import Slider from './../../components/basic/Slider';

const SwitchExample = () => {
  return (
    <View style={styles.container}>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={50}
        onSlidingComplete={value => console.log('当前值:', value)}
      />
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={30}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#E5E5E5"
        thumbTintColor="#FFFFFF"
        thumbTintWidth={24}
        maximumTrackHeight={8}
        onSlidingComplete={value => {}}
        leftIcon={<IconUvFill size={24} />}
      />
      <Slider minimumValue={0} maximumValue={100} value={75} disabled={true} onSlidingComplete={value => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
});

export default SwitchExample;
