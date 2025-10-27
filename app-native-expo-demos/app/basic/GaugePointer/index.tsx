import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import GaugePointer from '../../components/basic/GaugePointer';
import { useFlexUIConfig } from '../../components/provider/useFlexUIConfig';

const props = {
  // 基础样式示例
  basic: {
    value: 75,
  },
  // 不同尺寸示例
  sizes: {
    small: { value: 30, size: 'small' as const },
    medium: { value: 60, size: 'medium' as const },
    large: { value: 90, size: 'large' as const },
  },
  // 自定义样式示例
  custom: {
    value: 85,
    gaugeColor: 'rgba(255, 255, 255, 0.1)',
    pointerColor: '#FF6B6B',
    centerBackgroundColor: 'rgba(0, 0, 0, 0.8)',
    style: { marginBottom: 20 },
    centerStyle: { borderWidth: 2, borderColor: '#FF6B6B' },
  },
  // 复杂内容示例
  complex: {
    value: 72,
    size: 'large' as const,
    centerBackgroundColor: 'rgba(49, 122, 247, 0.1)',
  },
};

const GaugePointerDemo = () => {
  const [value, setValue] = useState(0);
  const { theme } = useFlexUIConfig();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ padding: 20, gap: 16, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      {/* 基础用法 */}
      <GaugePointer {...props.basic}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>75%</Text>
      </GaugePointer>

      {/* 不同尺寸 */}
      <GaugePointer {...props.sizes.small}>
        <Text style={{ fontSize: 16, color: '#fff' }}>30%</Text>
      </GaugePointer>

      <GaugePointer {...props.sizes.medium}>
        <Text style={{ fontSize: 20, color: '#fff' }}>60%</Text>
      </GaugePointer>

      <GaugePointer {...props.sizes.large}>
        <Text style={{ fontSize: 24, color: '#fff' }}>90%</Text>
      </GaugePointer>

      {/* 自定义样式 */}
      <GaugePointer {...props.custom}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FF6B6B' }}>85</Text>
          <Text style={{ fontSize: 12, color: '#fff', opacity: 0.8 }}>SCORE</Text>
        </View>
      </GaugePointer>

      {/* 动态数值变化 */}
      <GaugePointer value={value}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#317AF7' }}>{value}</Text>
          <Text style={{ fontSize: 14, color: '#fff', opacity: 0.6 }}>Progress</Text>
        </View>
      </GaugePointer>

      {/* 复杂内容展示 */}
      <GaugePointer {...props.complex}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#317AF7' }}>72</Text>
          <Text style={{ fontSize: 12, color: '#fff', opacity: 0.8 }}>CPU Usage</Text>
          <View
            style={{
              marginTop: 4,
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: '#317AF7',
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 10, color: '#fff' }}>Normal</Text>
          </View>
        </View>
      </GaugePointer>
    </View>
  );
};

export default GaugePointerDemo;
