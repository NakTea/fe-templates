# AnimationFadeSlide 组件说明文档

## 概述

`AnimationFadeSlide` 是一个基于 React Native Reanimated 开发的动画组件，提供了淡入淡出和滑动进入的组合动画效果。该组件支持四个方向的滑动动画，并可配置透明度变化、动画时长、距离和延迟等参数。

## 安装依赖

使用该组件前，请确保已安装以下依赖：

```bash
npm install react-native-reanimated
# 或
yarn add react-native-reanimated
```

## 基本用法

```jsx
import AnimationFadeSlide from './path/to/AnimationFadeSlide';

<AnimationFadeSlide>
  <Text>这是一个带动画的文本</Text>
</AnimationFadeSlide>;
```

## Props 参数

| 参数名          | 类型      | 默认值 | 说明                                                    |
| --------------- | --------- | ------ | ------------------------------------------------------- |
| `children`      | ReactNode | -      | 要添加动画效果的子组件                                  |
| `enableOpacity` | boolean   | `true` | 是否启用透明度渐变动画                                  |
| `direction`     | string    | `'up'` | 滑动方向，可选值：`'up'`, `'down'`, `'left'`, `'right'` |
| `duration`      | number    | `300`  | 动画持续时间（毫秒）                                    |
| `distance`      | number    | `30`   | 滑动距离（像素）                                        |
| `delay`         | number    | `0`    | 动画延迟时间（毫秒）                                    |
| `style`         | object    | `{}`   | 自定义样式对象                                          |
| `...props`      | any       | -      | 其他传递给 `Animated.View` 的属性                       |

## 方向说明

- **`'up'`**: 从下往上滑入（元素初始位置在下方）
- **`'down'`**: 从上往下滑入（元素初始位置在上方）
- **`'left'`**: 从右往左滑入（元素初始位置在右方）
- **`'right'`**: 从左往右滑入（元素初始位置在左方）

## 使用示例

### 1. 默认动画

```jsx
<AnimationFadeSlide>
  <View style={styles.card}>
    <Text>默认动画效果</Text>
  </View>
</AnimationFadeSlide>
```

### 2. 自定义方向和参数

```jsx
<AnimationFadeSlide direction="right" duration={500} distance={50} delay={200}>
  <View style={styles.card}>
    <Text>从左滑入，500ms动画</Text>
  </View>
</AnimationFadeSlide>
```

### 3. 禁用透明度动画

```jsx
<AnimationFadeSlide enableOpacity={false} direction="left" distance={80}>
  <View style={styles.card}>
    <Text>仅滑动，无透明度变化</Text>
  </View>
</AnimationFadeSlide>
```

### 4. 序列动画（使用延迟）

```jsx
{
  /* 第一个元素 */
}
<AnimationFadeSlide delay={0}>
  <Text>第一个出现</Text>
</AnimationFadeSlide>;

{
  /* 第二个元素，延迟200ms */
}
<AnimationFadeSlide delay={200}>
  <Text>第二个出现</Text>
</AnimationFadeSlide>;

{
  /* 第三个元素，延迟400ms */
}
<AnimationFadeSlide delay={400}>
  <Text>第三个出现</Text>
</AnimationFadeSlide>;
```

## 动画效果

该组件使用贝塞尔曲线缓动函数 `Easing.bezier(0.4, 0.0, 0.2, 1.0)`，提供平滑自然的动画效果。

### 动画流程：

1. 组件挂载时，根据 `direction` 设置初始位置
2. 如果启用了透明度动画，初始透明度为 0
3. 延迟指定时间后开始动画
4. 同时执行位移和透明度动画到目标值

## 性能优化

- 使用 `useSharedValue` 和 `useAnimatedStyle` 确保动画在 UI 线程执行
- 避免不必要的重渲染
- 支持硬件加速

## 注意事项

1. 确保已正确配置 React Native Reanimated
2. 在 Android 上可能需要额外配置以启用手势和动画功能
3. 如果遇到性能问题，可以考虑减少同时执行的动画数量

## 兼容性

- React Native: >= 0.60
- React Native Reanimated: >= 3.0
- iOS: >= 11.0
- Android: >= API 21

## 完整示例

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from './components/AnimationFadeSlide';

const App = () => {
  return (
    <View style={styles.container}>
      <AnimationFadeSlide>
        <View style={styles.card}>
          <Text>默认动画</Text>
        </View>
      </AnimationFadeSlide>

      <AnimationFadeSlide enableOpacity={false} direction="right" duration={500} distance={50} delay={200}>
        <View style={styles.card}>
          <Text>从左滑入</Text>
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
```
