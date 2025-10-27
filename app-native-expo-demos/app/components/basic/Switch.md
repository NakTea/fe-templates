# Switch 开关组件

## 组件描述

Switch 是一个开关控制组件，用于在两个状态之间进行切换。它提供了流畅的动画效果和完整的交互反馈，支持禁用状态和自定义样式。

### 特性

- ✅ 流畅的开关动画效果
- ✅ 支持禁用状态
- ✅ 完整的主题系统集成
- ✅ 支持自定义颜色和样式
- ✅ TypeScript 类型安全
- ✅ 无障碍访问支持
- ✅ 触摸反馈优化

## 组件 API

### Props

| 属性名        | 类型                                | 默认值  | 必填 | 描述                 |
| ------------- | ----------------------------------- | ------- | ---- | -------------------- |
| value         | `boolean`                           | -       | ✅   | 开关的当前状态       |
| onValueChange | `(value: boolean) => void`          | -       | ✅   | 状态改变时的回调函数 |
| disabled      | `boolean`                           | `false` | ❌   | 是否禁用开关         |
| style         | `object`                            | -       | ❌   | 容器自定义样式       |
| trackColor    | `{ false?: string; true?: string }` | -       | ❌   | 轨道颜色配置         |
| thumbColor    | `string`                            | -       | ❌   | 滑块颜色             |

### 接口定义

```typescript
export interface ISwitchProps {
  // 基础属性
  value: boolean;
  disabled?: boolean;

  // 事件属性
  onValueChange: (value: boolean) => void;

  // 样式属性
  style?: object;

  // 覆盖属性
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: string;
}
```

## 使用示例

### 基础用法

```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch } from '@your-ui/components';

const BasicExample = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
      />
    </View>
  );
};
```

### 禁用状态

```typescript
const DisabledExample = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <View>
      {/* 开启状态禁用 */}
      <Switch
        value={true}
        onValueChange={() => {}}
        disabled={true}
      />

      {/* 关闭状态禁用 */}
      <Switch
        value={false}
        onValueChange={() => {}}
        disabled={true}
      />
    </View>
  );
};
```

### 自定义颜色

```typescript
const CustomColorExample = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        trackColor={{
          false: '#767577',
          true: '#81b0ff',
        }}
        thumbColor="#f5dd4b"
      />
    </View>
  );
};
```

### 带标签的开关

```typescript
import { Text, StyleSheet } from 'react-native';

const LabeledSwitchExample = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {isEnabled ? '开启' : '关闭'}
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});
```

### 设置列表中使用

```typescript
const SettingsExample = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>推送通知</Text>
        <Switch
          value={settings.notifications}
          onValueChange={(value) => updateSetting('notifications', value)}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>深色模式</Text>
        <Switch
          value={settings.darkMode}
          onValueChange={(value) => updateSetting('darkMode', value)}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>自动同步</Text>
        <Switch
          value={settings.autoSync}
          onValueChange={(value) => updateSetting('autoSync', value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
});
```

## 设计规范

### 颜色规范

| 状态     | 属性   | Token                        | 颜色值                      | 说明         |
| -------- | ------ | ---------------------------- | --------------------------- | ------------ |
| 滑块     | 前景色 | `textInverse`                | `rgba(255, 255, 255, 1)`    | 滑块颜色     |
| 开启     | 背景色 | `containerBpDefault`         | `rgba(49, 122, 247, 1)`     | 开启状态背景 |
| 关闭     | 背景色 | `containerPrimaryDisabled`   | `rgba(255, 255, 255, 0.15)` | 关闭状态背景 |
| 开启禁用 | 背景色 | `containerBpDisabled`        | `rgba(49, 122, 247, 0.4)`   | 开启禁用背景 |
| 关闭禁用 | 背景色 | `containerSwitchOffDisabled` | `rgba(255, 255, 255, 0.4)`  | 关闭禁用背景 |

### 尺寸规范

| 属性 | Token         | 数值   | 说明           |
| ---- | ------------- | ------ | -------------- |
| 高度 | `sizeSwitch`  | `22px` | 开关轨道高度   |
| 宽度 | `sizeComphWM` | `40px` | 开关轨道宽度   |
| 圆角 | `radiusComp1` | `20px` | 轨道和滑块圆角 |

### 间距规范

- 滑块与轨道边距：`2px`
- 滑块尺寸：轨道高度减去 `4px`（上下各留 `2px`）
- 滑块移动范围：轨道宽度减去滑块尺寸再减去 `4px`

## 动画效果

### 动画参数

```typescript
const springConfig = {
  mass: 1, // 质量
  damping: 15, // 阻尼
  stiffness: 120, // 刚度
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};
```

### 动画行为

- **滑块移动**：使用弹簧动画，提供自然的缓动效果
- **颜色过渡**：轨道背景色在开启/关闭状态间平滑插值
- **响应速度**：动画响应迅速，提供即时的视觉反馈

## 注意事项

### 使用限制

1. **状态管理**：必须通过 `value` 和 `onValueChange` 进行受控组件使用
2. **颜色自定义**：自定义颜色会覆盖主题颜色，请确保符合设计规范
3. **禁用状态**：禁用时会自动降低透明度，无需额外处理

### 最佳实践

1. **标签配对**：建议为开关配置清晰的标签说明
2. **状态反馈**：在状态改变时提供适当的反馈（如提示文字更新）
3. **布局对齐**：在列表或表单中使用时，注意与其他元素的对齐
4. **响应式设计**：在不同屏幕尺寸下保持良好的视觉效果

### 性能优化

- 使用 `react-native-reanimated` 实现高性能动画
- 动画运行在 UI 线程，不会阻塞 JS 线程
- 合理使用 `useDerivedValue` 和 `useAnimatedStyle` 优化重渲染

## 依赖说明

### 必需依赖

- `react-native-reanimated`: `^3.0.0` - 动画库
- `@your-ui/provider`: 主题配置提供者

### 主题配置

组件依赖以下主题 Token：

```typescript
const switchToken = {
  // 尺寸相关
  height: system.sizeSwitch,
  width: system.sizeComphWM,
  radius: system.radiusComp1,

  // 颜色相关
  thumbColor: system.textInverse,
  onBackgroundDefault: system.containerBpDefault,
  offBackgroundDefault: system.containerPrimaryDisabled,
  onBackgroundDisabled: system.containerBpDisabled,
  offBackgroundDisabled: system.containerSwitchOffDisabled,
};
```

确保在使用组件前正确配置了 `FlexUIProvider` 和相关主题 Token。
