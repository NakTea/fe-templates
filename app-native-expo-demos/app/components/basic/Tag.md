# Tag 标签组件

标签组件用于展示分类、状态或属性信息，支持多种尺寸和自定义样式。

## 组件特性

- 🎨 **多种尺寸**：支持大、中、小三种尺寸规格
- 📝 **灵活内容**：支持文本和自定义内容
- 🎯 **主题集成**：完全集成设计系统主题
- 🔧 **高度定制**：支持颜色、样式完全自定义
- 📱 **响应式**：自适应内容宽度，支持灵活布局

## 组件 API

### Props

| 属性名          | 类型                             | 默认值     | 说明                        |
| --------------- | -------------------------------- | ---------- | --------------------------- |
| size            | `'large' \| 'medium' \| 'small'` | `'medium'` | 标签尺寸                    |
| children        | `React.ReactNode`                | -          | 自定义内容，优先级高于 text |
| text            | `string`                         | -          | 标签文本内容                |
| style           | `object`                         | -          | 自定义容器样式              |
| textStyle       | `object`                         | -          | 自定义文字样式              |
| backgroundColor | `string`                         | -          | 自定义背景颜色              |
| textColor       | `string`                         | -          | 自定义文字颜色              |

## 使用示例

### 基础用法

```typescript
import React from 'react';
import { View } from 'react-native';
import Tag from './components/Tag';

const BasicExample = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Tag text="默认标签" />
      <Tag text="推荐" />
      <Tag text="热门" />
    </View>
  );
};
```

### 不同尺寸

```typescript
const SizeExample = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Tag size="large" text="大标签" />
      <Tag size="medium" text="中标签" />
      <Tag size="small" text="小标签" />
    </View>
  );
};
```

### 自定义颜色

```typescript
const ColorExample = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {/* 成功状态 */}
      <Tag
        text="已完成"
        backgroundColor="#52C41A"
        textColor="#FFFFFF"
      />

      {/* 警告状态 */}
      <Tag
        text="待处理"
        backgroundColor="#FAAD14"
        textColor="#FFFFFF"
      />

      {/* 错误状态 */}
      <Tag
        text="已失败"
        backgroundColor="#FF4D4F"
        textColor="#FFFFFF"
      />
    </View>
  );
};
```

### 边框样式

```typescript
const BorderExample = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Tag
        text="边框标签"
        style={{
          borderWidth: 1,
          borderColor: '#317AF7',
          backgroundColor: 'transparent'
        }}
        textStyle={{
          color: '#317AF7'
        }}
      />

      <Tag
        text="虚线边框"
        style={{
          borderWidth: 1,
          borderColor: '#D9D9D9',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }}
        textStyle={{
          color: '#666666'
        }}
      />
    </View>
  );
};
```

### 自定义内容

```typescript
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomContentExample = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {/* 带图标的标签 */}
      <Tag size="medium">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={{ color: '#FFFFFF', fontSize: 12 }}>精选</Text>
        </View>
      </Tag>

      {/* 数字标签 */}
      <Tag size="small">
        <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>
          99+
        </Text>
      </Tag>
    </View>
  );
};
```

### 状态标签示例

```typescript
const StatusExample = () => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return { backgroundColor: '#52C41A', textColor: '#FFFFFF' };
      case 'warning':
        return { backgroundColor: '#FAAD14', textColor: '#FFFFFF' };
      case 'error':
        return { backgroundColor: '#FF4D4F', textColor: '#FFFFFF' };
      case 'processing':
        return { backgroundColor: '#1890FF', textColor: '#FFFFFF' };
      default:
        return {};
    }
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Tag text="成功" {...getStatusStyle('success')} />
      <Tag text="警告" {...getStatusStyle('warning')} />
      <Tag text="错误" {...getStatusStyle('error')} />
      <Tag text="处理中" {...getStatusStyle('processing')} />
    </View>
  );
};
```

## 设计规范

### 尺寸规格

| 尺寸   | 高度 | 内边距 | 字体大小       | 使用场景           |
| ------ | ---- | ------ | -------------- | ------------------ |
| Large  | 28px | 12px   | 14px (cnBodyM) | 重要标签、分类标签 |
| Medium | 20px | 8px    | 12px (cnBodyS) | 常规标签、状态标签 |
| Small  | 16px | 4px    | 12px (cnBodyS) | 紧凑标签、辅助信息 |

### 颜色规范

- **默认背景色**：`containerBpWeakDefault` - 二级品牌主色容器背景
- **默认文字色**：`textPrimary` - 一级文本颜色
- **圆角大小**：`4px` - 使用 `radiusComp2`

### 间距规范

- **大标签内边距**：左右各 12px
- **中标签内边距**：左右各 8px
- **小标签内边距**：左右各 4px
- **标签间距**：建议 8px

## 最佳实践

### 使用建议

1. **尺寸选择**
   - 大标签：用于重要分类或主要状态展示
   - 中标签：常规使用，适合大多数场景
   - 小标签：紧凑布局或辅助信息展示

2. **颜色使用**
   - 保持颜色语义一致性（如绿色表示成功）
   - 避免使用过于鲜艳的颜色影响可读性
   - 确保文字与背景有足够的对比度

3. **内容规范**
   - 标签文字应简洁明了，建议不超过 6 个字符
   - 避免在标签中使用过长的文本
   - 使用 `numberOfLines={1}` 确保单行显示

4. **布局建议**
   - 使用 `flexWrap: 'wrap'` 支持标签换行
   - 设置合适的 `gap` 间距
   - 考虑使用 `alignItems: 'center'` 垂直居中对齐

### 注意事项

- 标签默认宽度自适应内容，使用 `alignSelf: 'flex-start'` 避免拉伸
- 自定义样式通过 `style` 和 `textStyle` 属性覆盖，会覆盖默认主题样式
- `children` 属性优先级高于 `text` 属性
- 建议在列表或卡片中使用时保持标签尺寸一致性

## 依赖说明

- **主题系统**：依赖 `useFlexUIConfig` Hook 获取主题配置
- **React Native**：需要 `View`、`Text`、`StyleSheet` 组件支持
- **TypeScript**：完整的类型定义支持
