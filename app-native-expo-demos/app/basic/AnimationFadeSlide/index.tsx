import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../../components/basic/AnimationFadeSlide';

const App = () => {
  return (
    <View style={styles.container}>
      {/* 默认配置：透明度渐变 + 从下往上 + 0.3s + 30px */}
      <AnimationFadeSlide>
        <View style={styles.card}>
          <Text>默认动画</Text>
        </View>
      </AnimationFadeSlide>

      {/* 只有透明度渐变 */}
      <AnimationFadeSlide enableSlide={false}>
        <View style={styles.card}>
          <Text>透明度变化</Text>
        </View>
      </AnimationFadeSlide>

      {/* 从左往右，无透明度变化 */}
      <AnimationFadeSlide enableOpacity={false} direction="right" duration={500} distance={50} delay={200}>
        <View style={styles.card}>
          <Text>从左滑入</Text>
        </View>
      </AnimationFadeSlide>

      {/* 从上往下，快速动画 */}
      <AnimationFadeSlide direction="down" duration={500} distance={40} delay={400}>
        <View style={styles.card}>
          <Text>从上滑入</Text>
        </View>
      </AnimationFadeSlide>

      {/* 从上往下，快速动画 */}
      <AnimationFadeSlide direction="up" duration={500} distance={40} delay={400}>
        <View style={styles.card}>
          <Text>从上滑入</Text>
        </View>
      </AnimationFadeSlide>

      {/* 从右往左，长距离 */}
      <AnimationFadeSlide direction="left" duration={500} distance={80} delay={600}>
        <View style={styles.card}>
          <Text>从右滑入</Text>
        </View>
      </AnimationFadeSlide>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    gap: 20,
  },
  card: {
    width: 200,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default App;
