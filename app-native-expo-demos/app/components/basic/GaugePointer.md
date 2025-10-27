# GaugePointer 仪表盘指针组件

GaugePointer 是一个基于 ECharts 的高性能仪表盘指针组件，专为数据可视化场景设计。组件采用彩色渐变弧形轨道和动态指针，能够直观地展示数值在 0-300 范围内的位置，特别适用于空气质量、性能监控等场景。

✅ **渐变色轨道** - 支持多段渐变色彩，直观展示数值等级  
✅ **动态指针** - 指针根据数值自动旋转到对应位置  
✅ **多尺寸支持** - 提供小、中、大三种预设尺寸  
✅ **自定义内容** - 中心区域支持任意 React 组件  
✅ **高性能渲染** - 基于 ECharts SVG 渲染，性能优异  
✅ **完全可定制** - 支持自定义颜色、尺寸和样式  
✅ **TypeScript 支持** - 完整的类型定义和智能提示

## 组件 API

### Props

| 属性名       | 类型                             | 默认值      | 必填 | 描述                       |
| ------------ | -------------------------------- | ----------- | ---- | -------------------------- |
| value        | `string \| number`               | `0`         | ✅   | 指针指向的数值，范围 0-300 |
| size         | `'small' \| 'medium' \| 'large'` | `'medium'`  | ❌   | 仪表盘尺寸                 |
| children     | `React.ReactNode`                | -           | ❌   | 中心显示的内容             |
| style        | `object`                         | -           | ❌   | 容器样式                   |
| pointerStyle | `object`                         | -           | ❌   | 指针样式                   |
| centerStyle  | `object`                         | -           | ❌   | 中心内容样式               |
| pointerColor | `string`                         | `'#FFFFFF'` | ❌   | 指针颜色                   |
| diameter     | `number`                         | -           | ❌   | 自定义直径，覆盖 size 设置 |

### 接口定义

```typescript
export interface IGaugePointerProps {
  // 基础属性 - 组件核心功能
  value: string | number; // 指针指向的数值，范围 0-300
  size?: 'small' | 'medium' | 'large'; // 仪表盘尺寸

  // 内容属性 - 显示内容相关
  children?: React.ReactNode; // 中心显示的内容

  // 样式属性 - 自定义样式
  style?: object; // 容器样式
  pointerStyle?: object; // 指针样式
  centerStyle?: object; // 中心内容样式

  // 覆盖属性 - 特殊需求覆盖
  pointerColor?: string; // 指针颜色
  diameter?: number; // 自定义直径
}
```

## 使用示例

### 基础用法

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import GaugePointer from './components/GaugePointer';

const BasicExample = () => {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <GaugePointer value={150}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>
            150
          </Text>
          <Text style={{ fontSize: 14, color: '#fff', opacity: 0.8 }}>
            AQI
          </Text>
        </View>
      </GaugePointer>
    </View>
  );
};
```

### 不同尺寸展示

```typescript
const SizeExample = () => {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
        <GaugePointer value={50} size="small">
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6DD400' }}>50</Text>
            <Text style={{ fontSize: 10, color: '#fff' }}>优</Text>
          </View>
        </GaugePointer>

        <GaugePointer value={120} size="medium">
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#F78200' }}>120</Text>
            <Text style={{ fontSize: 12, color: '#fff' }}>轻度污染</Text>
          </View>
        </GaugePointer>

        <GaugePointer value={250} size="large">
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#9747FF' }}>250</Text>
            <Text style={{ fontSize: 14, color: '#fff' }}>重度污染</Text>
          </View>
        </GaugePointer>
      </View>
    </View>
  );
};
```

### 空气质量监控场景

```typescript
const AirQualityExample = () => {
  const getAQILevel = (value: number) => {
    if (value <= 50) return { level: '优', color: '#6DD400' };
    if (value <= 100) return { level: '良', color: '#F7B500' };
    if (value <= 150) return { level: '轻度污染', color: '#F78200' };
    if (value <= 200) return { level: '中度污染', color: '#E54545' };
    if (value <= 300) return { level: '重度污染', color: '#9747FF' };
    return { level: '严重污染', color: '#7E0023' };
  };

  const aqiValue = 185;
  const aqiInfo = getAQILevel(aqiValue);

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <GaugePointer
        value={aqiValue}
        size="large"
        pointerColor={aqiInfo.color}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: aqiInfo.color }}>
            {aqiValue}
          </Text>
          <Text style={{ fontSize: 16, color: '#fff', marginTop: 4 }}>
            AQI
          </Text>
          <View style={{
            marginTop: 8,
            paddingHorizontal: 12,
            paddingVertical: 4,
            backgroundColor: aqiInfo.color,
            borderRadius: 12
          }}>
            <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>
              {aqiInfo.level}
            </Text>
          </View>
        </View>
      </GaugePointer>
    </View>
  );
};
```

### 性能监控场景

```typescript
const PerformanceExample = () => {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <GaugePointer
        value={75}
        diameter={200}
        pointerColor="#00D4FF"
        centerStyle={{
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          borderRadius: 80,
          padding: 20
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#00D4FF' }}>
            75
          </Text>
          <Text style={{ fontSize: 14, color: '#fff', opacity: 0.8, marginTop: 4 }}>
            CPU 使用率
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <View style={{ width: 8, height: 8, backgroundColor: '#6DD400', borderRadius: 4, marginRight: 4 }} />
            <Text style={{ fontSize: 10, color: '#fff' }}>正常</Text>
          </View>
        </View>
      </GaugePointer>
    </View>
  );
};
```

### 动态数值变化

```typescript
import React, { useState, useEffect } from 'react';

const DynamicExample = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        const newValue = prev + Math.random() * 20 - 10; // 随机变化
        return Math.max(0, Math.min(300, newValue)); // 限制在0-300范围内
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <GaugePointer value={Math.round(value)}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>
            {Math.round(value)}
          </Text>
          <Text style={{ fontSize: 14, color: '#fff', opacity: 0.6 }}>
            实时数据
          </Text>
          <Text style={{ fontSize: 10, color: '#fff', opacity: 0.4, marginTop: 4 }}>
            每2秒更新
          </Text>
        </View>
      </GaugePointer>
    </View>
  );
};
```

### 自定义样式

```typescript
const CustomStyleExample = () => {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <GaugePointer
        value={200}
        size="large"
        pointerColor="#FF3366"
        style={{
          shadowColor: '#FF3366',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8
        }}
        pointerStyle={{
          borderBottomColor: '#FF3366',
          shadowColor: '#FF3366',
          shadowOpacity: 0.8
        }}
        centerStyle={{
          backgroundColor: 'rgba(255, 51, 102, 0.1)',
          borderWidth: 2,
          borderColor: '#FF3366',
          borderRadius: 60
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 42, fontWeight: 'bold', color: '#FF3366' }}>
            200
          </Text>
          <Text style={{ fontSize: 12, color: '#fff', opacity: 0.8 }}>
            DANGER LEVEL
          </Text>
          <View style={{
            marginTop: 6,
            width: 40,
            height: 4,
            backgroundColor: '#FF3366',
            borderRadius: 2
          }} />
        </View>
      </GaugePointer>
    </View>
  );
};
```

## 设计规范

### 默认配置

| 配置项   | 默认值 | 说明                 |
| -------- | ------ | -------------------- |
| 数值范围 | 0-300  | 支持的数值范围       |
| 弧形角度 | 270°   | 弧形轨道覆盖角度     |
| 起始角度 | 225°   | 指针起始位置         |
| 轨道厚度 | 10%    | 相对于半径的厚度比例 |

### 尺寸规范

| 尺寸   | 基础直径 | 实际尺寸     | 说明           |
| ------ | -------- | ------------ | -------------- |
| small  | 180px    | 144px (×0.8) | 适用于紧凑布局 |
| medium | 180px    | 180px (×1.0) | 标准尺寸       |
| large  | 180px    | 216px (×1.2) | 适用于重点展示 |

### 颜色规范

| 数值范围 | 颜色值  | 等级 | 说明                 |
| -------- | ------- | ---- | -------------------- |
| 0-50     | #6DD400 | 优   | 绿色，表示优秀状态   |
| 51-100   | #F7B500 | 良   | 黄色，表示良好状态   |
| 101-150  | #F78200 | 轻度 | 橙色，表示轻度问题   |
| 151-200  | #E54545 | 中度 | 红色，表示中度问题   |
| 201-300  | #9747FF | 重度 | 紫色，表示重度问题   |
| >300     | #7E0023 | 严重 | 深红色，表示严重问题 |

### 动画效果

- **指针旋转**：指针根据数值变化平滑旋转到目标位置
- **渲染性能**：基于 ECharts SVG 渲染，支持硬件加速
- **响应速度**：数值变化时指针立即响应，无延迟

## 注意事项

### 使用限制

- 数值范围限制在 0-300，超出范围的值会被自动截取
- 需要安装 `@wuba/react-native-echarts` 和 `echarts` 依赖
- 组件基于 SVG 渲染，在低端设备上可能存在性能影响
- 指针颜色建议与数值等级颜色保持一致以提供更好的视觉体验

### 最佳实践

- **数值映射**：建议根据实际业务场景调整数值范围和颜色映射
- **内容设计**：中心内容应简洁明了，避免过多信息造成视觉混乱
- **尺寸选择**：根据页面布局选择合适的尺寸，避免组件过大或过小
- **颜色一致性**：指针颜色建议与当前数值对应的轨道颜色保持一致
- **性能优化**：避免频繁更新数值，建议使用防抖或节流处理实时数据
- **无障碍支持**：为视觉障碍用户提供文字描述和语音提示

### 性能优化

- 组件使用 ECharts SVG 渲染，具有良好的性能表现
- 避免在短时间内频繁更新 value 属性
- 大量组件同时使用时，考虑使用虚拟化技术
- 在不需要实时更新时，可以使用 `React.memo` 包装组件

## 依赖说明

### 必需依赖

```json
{
  "@wuba/react-native-echarts": "^1.0.0",
  "echarts": "^5.0.0"
}
```

### 安装命令

```bash
npm install @wuba/react-native-echarts echarts
# 或
yarn add @wuba/react-native-echarts echarts
```

### 依赖说明

- **@wuba/react-native-echarts**：React Native 的 ECharts 封装库，提供 SVG 渲染支持
- **echarts**：Apache ECharts 图表库核心，提供饼图等图表类型

### 配置要求

确保项目中已正确配置 React Native SVG 支持：

```bash
# iOS 需要执行
cd ios && pod install

# Android 需要在 android/app/build.gradle 中添加相关配置
```
