# Slider 组件说明文档

## 组件概述

Slider 是一个基于 React Native 和手势处理的滑块组件，支持通过拖拽或点击来设置数值。组件使用 `react-native-gesture-handler` 和 `react-native-reanimated` 实现流畅的交互动画效果。

## 组件特性

- 📱 支持拖拽和点击交互
- 🎯 自定义数值范围（最小值/最大值）
- 🎨 完全可定制的样式和颜色
- ✋ 手势识别，支持平移和点击
- 🔄 流畅的动画过渡效果
- 🚫 支持禁用状态
- 🎭 支持自定义左侧图标
- 📐 灵活的尺寸配置

## 使用示例

```typescript
import Slider from './Slider';

// 基础用法
<Slider
  minimumValue={0}
  maximumValue={100}
  value={50}
  onSlidingComplete={(value) => console.log('当前值:', value)}
/>

// 自定义样式
<Slider
  minimumValue={0}
  maximumValue={100}
  value={30}
  minimumTrackTintColor="#007AFF"
  maximumTrackTintColor="#E5E5E5"
  thumbTintColor="#FFFFFF"
  thumbTintWidth={24}
  maximumTrackHeight={8}
  onSlidingComplete={(value) => handleValueChange(value)}
  leftIcon={<Icon name="volume" size={16} />}
/>

// 禁用状态
<Slider
  minimumValue={0}
  maximumValue={100}
  value={75}
  disabled={true}
  onSlidingComplete={(value) => {}}
/>
```

## Props 接口

```typescript
export interface ISliderProps {
  style?: object; // 容器样式
  disabled?: boolean; // 是否禁用，默认 false
  minimumValue?: number; // 最小值，默认 0
  maximumValue?: number; // 最大值，默认 100
  value?: number; // 当前值，默认 0
  onSlidingComplete(value: number): void; // 滑动结束回调
  minimumTrackTintColor?: string; // 已滑动部分的颜色
  maximumTrackTintColor?: string; // 未滑动部分的颜色
  thumbTintColor?: string; // 滑块手柄颜色
  minimumTrackStyle?: object; // 已滑动部分样式
  maximumTrackTintStyle?: object; // 滑动轨道样式
  thumbTintStyle?: object; // 滑块手柄样式
  thumbTintWidth?: number; // 滑块手柄宽度，默认 32
  minimumTrackPadding?: number; // 已滑动部分内边距，默认 4
  maximumTrackHeight?: number; // 滑动轨道高度，默认 32
  thumbTintPadding?: number; // 滑块内边距，默认 2
  leftIcon?: React.ReactNode; // 左侧自定义图标
}
```

## 数据类型定义

```typescript
// 布局事件类型
type LayoutChangeEvent = {
  nativeEvent: {
    layout: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
};

// 手势事件相关类型
type PanGestureEvent = {
  changeX: number;
  changeY: number;
  x: number;
  y: number;
};

type TapGestureEvent = {
  x: number;
  y: number;
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Slider Component Props Schema",
  "description": "Slider 滑块组件的属性定义",
  "properties": {
    "style": {
      "type": "object",
      "description": "容器样式对象"
    },
    "disabled": {
      "type": "boolean",
      "description": "是否禁用滑块",
      "default": false
    },
    "minimumValue": {
      "type": "number",
      "description": "滑块最小值",
      "default": 0
    },
    "maximumValue": {
      "type": "number",
      "description": "滑块最大值",
      "default": 100
    },
    "value": {
      "type": "number",
      "description": "滑块当前值",
      "default": 0
    },
    "onSlidingComplete": {
      "type": "function",
      "description": "滑动结束时的回调函数"
    },
    "minimumTrackTintColor": {
      "type": "string",
      "description": "已滑动部分的颜色"
    },
    "maximumTrackTintColor": {
      "type": "string",
      "description": "未滑动部分的颜色"
    },
    "thumbTintColor": {
      "type": "string",
      "description": "滑块手柄的颜色"
    },
    "minimumTrackStyle": {
      "type": "object",
      "description": "已滑动部分的样式"
    },
    "maximumTrackTintStyle": {
      "type": "object",
      "description": "滑动轨道的样式"
    },
    "thumbTintStyle": {
      "type": "object",
      "description": "滑块手柄的样式"
    },
    "thumbTintWidth": {
      "type": "number",
      "description": "滑块手柄宽度",
      "default": 32
    },
    "minimumTrackPadding": {
      "type": "number",
      "description": "已滑动部分内边距",
      "default": 4
    },
    "maximumTrackHeight": {
      "type": "number",
      "description": "滑动轨道高度",
      "default": 32
    },
    "thumbTintPadding": {
      "type": "number",
      "description": "滑块内边距",
      "default": 2
    },
    "leftIcon": {
      "type": "object",
      "description": "左侧自定义图标 React 节点"
    }
  },
  "required": ["onSlidingComplete"]
}
```

## 事件处理

### 手势识别

- **平移手势 (Pan Gesture)**: 用于拖拽滑块手柄
  - `onChange`: 实时更新滑块位置
  - `onEnd`: 拖拽结束时触发回调

- **点击手势 (Tap Gesture)**: 用于点击滑动轨道
  - `onEnd`: 点击结束时将滑块移动到点击位置

### 回调函数

- `onSlidingComplete`: 滑动操作结束时调用，传入当前数值

### 数值计算

组件内部会根据滑块位置自动计算对应的数值，并在滑动结束时通过回调函数返回。

## 样式定制

### 默认主题

组件使用设计令牌系统提供默认样式：

- `containerBsWeakSecondary`: 轨道背景色
- `textInverse`: 滑块和已滑动部分颜色

### 可定制样式

- **轨道样式**: `maximumTrackTintStyle`、`maximumTrackTintColor`、`maximumTrackHeight`
- **已滑动部分**: `minimumTrackStyle`、`minimumTrackTintColor`、`minimumTrackPadding`
- **滑块手柄**: `thumbTintStyle`、`thumbTintColor`、`thumbTintWidth`、`thumbTintPadding`

## 注意事项

1. **必需属性**: `onSlidingComplete` 是必需的回调函数
2. **数值范围**: 确保 `maximumValue` 大于 `minimumValue`
3. **初始值**: `value` 应在 `minimumValue` 和 `maximumValue` 之间
4. **禁用状态**: 当 `disabled` 为 `true` 时，所有手势交互都会被忽略
5. **布局依赖**: 组件需要获取容器宽度才能正常工作，确保父容器有明确的宽度
6. **性能优化**: 使用了 `react-native-reanimated` 的 worklet，动画运行在 UI 线程上
7. **手势冲突**: 如果父组件也有手势处理，可能需要配置手势优先级
