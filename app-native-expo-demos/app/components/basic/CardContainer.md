# CardContainer 卡片容器组件

## 组件描述

CardContainer 是一个通用的卡片容器组件，提供了统一的样式规范和布局结构。支持滚动和非滚动两种模式，可以用于构建各种卡片式界面元素，如信息卡片、内容面板等。

### 特性

- ✅ 支持滚动和非滚动两种模式
- ✅ 完整的主题系统集成
- ✅ 灵活的尺寸和样式配置
- ✅ TypeScript 类型安全
- ✅ 响应式布局支持
- ✅ 自定义内边距配置
- ✅ 圆角和背景色自定义

## 组件 API

### Props

| 属性名            | 类型                   | 默认值 | 必填 | 描述                 |
| ----------------- | ---------------------- | ------ | ---- | -------------------- |
| children          | `React.ReactNode`      | -      | ❌   | 子组件内容           |
| style             | `ViewStyle`            | -      | ❌   | 容器自定义样式       |
| width             | `number \| string`     | 主题值 | ❌   | 容器宽度             |
| height            | `number \| string`     | 主题值 | ❌   | 容器高度             |
| maxHeight         | `number \| string`     | 主题值 | ❌   | 容器最大高度         |
| borderRadius      | `number`               | 主题值 | ❌   | 圆角半径             |
| backgroundColor   | `string`               | 主题值 | ❌   | 背景颜色             |
| opacity           | `number`               | 主题值 | ❌   | 透明度               |
| paddingVertical   | `number`               | 主题值 | ❌   | 垂直内边距           |
| paddingHorizontal | `number`               | 主题值 | ❌   | 水平内边距           |
| hasScrollView     | `boolean`              | `true` | ❌   | 是否启用滚动视图     |
| onLayout          | `(event: any) => void` | -      | ❌   | 布局变化时的回调函数 |

### 接口定义

```typescript
export interface ICardContainerProps {
  // 内容属性
  children?: React.ReactNode;

  // 样式属性
  style?: ViewStyle;
  width?: number | string | undefined;
  height?: number | string | undefined;
  maxHeight?: number | string | undefined;
  borderRadius?: number;
  backgroundColor?: string;
  opacity?: number;

  // 内边距属性
  paddingVertical?: number;
  paddingHorizontal?: number;

  // 功能属性
  hasScrollView?: boolean;

  // 事件属性
  onLayout?: (event: any) => void;
}
```

## 使用示例

### 基础用法

```typescript
import React from 'react';
import { Text } from 'react-native';
import { CardContainer } from '@your-ui/components';

const BasicExample = () => {
  return (
    <CardContainer>
      <Text>这是一个基础的卡片容器</Text>
    </CardContainer>
  );
};
```

### 自定义尺寸和样式

```typescript
const CustomStyleExample = () => {
  return (
    <CardContainer
      width={300}
      height={200}
      maxHeight={300}
      borderRadius={16}
      backgroundColor="#f0f0f0"
      paddingVertical={20}
      paddingHorizontal={16}
    >
      <Text>自定义样式的卡片容器</Text>
    </CardContainer>
  );
};
```

### 固定高度容器

```typescript
const FixedHeightExample = () => {
  return (
    <CardContainer
      width="100%"
      height={150}
      hasScrollView={false}
    >
      <Text>这是一个固定高度的卡片容器</Text>
      <Text>高度为 150px</Text>
    </CardContainer>
  );
};
```

### 限制最大高度的滚动容器

```typescript
const MaxHeightScrollExample = () => {
  return (
    <CardContainer
      width="100%"
      maxHeight={200}
      hasScrollView={true}
    >
      <Text>这是一个限制最大高度的滚动容器</Text>
      <Text>当内容超出 200px 时会出现滚动</Text>
      {/* 更多内容... */}
    </CardContainer>
  );
};
```

### 禁用滚动视图

```typescript
const NoScrollExample = () => {
  return (
    <CardContainer hasScrollView={false}>
      <Text>这是一个不带滚动功能的卡片容器</Text>
      <Text>适用于内容较少的场景</Text>
    </CardContainer>
  );
};
```

### 信息卡片

```typescript
import { View, Text, StyleSheet } from 'react-native';

const InfoCardExample = () => {
  return (
    <CardContainer
      width="90%"
      height={200}
      borderRadius={12}
      paddingVertical={16}
      paddingHorizontal={20}
      style={styles.cardShadow}
    >
      <View style={styles.header}>
        <Text style={styles.title}>用户信息</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>姓名：张三</Text>
        <Text style={styles.label}>邮箱：zhangsan@example.com</Text>
        <Text style={styles.label}>电话：138-0000-0000</Text>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
```

### 长内容滚动卡片

```typescript
const ScrollableCardExample = () => {
  const longContent = Array.from({ length: 20 }, (_, i) => `这是第 ${i + 1} 行内容`);

  return (
    <CardContainer
      width="100%"
      maxHeight={300}
      hasScrollView={true}
    >
      <View>
        <Text style={styles.cardTitle}>长内容列表</Text>
        {longContent.map((text, index) => (
          <Text key={index} style={styles.listItem}>
            {text}
          </Text>
        ))}
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});
```

### 响应式卡片网格

```typescript
import { Dimensions } from 'react-native';

const ResponsiveGridExample = () => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; // 减去外边距和间距

  const cards = [
    { id: 1, title: '卡片 1', content: '内容 1' },
    { id: 2, title: '卡片 2', content: '内容 2' },
    { id: 3, title: '卡片 3', content: '内容 3' },
    { id: 4, title: '卡片 4', content: '内容 4' },
  ];

  return (
    <View style={styles.gridContainer}>
      {cards.map((card) => (
        <CardContainer
          key={card.id}
          width={cardWidth}
          height={120}
          hasScrollView={false}
          style={styles.gridCard}
        >
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardContent}>{card.content}</Text>
        </CardContainer>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  gridCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
  },
});
```

### 高度与最大高度的组合使用

```typescript
const HeightCombinationExample = () => {
  return (
    <View style={{ gap: 16 }}>
      {/* 固定高度，不滚动 */}
      <CardContainer
        width="100%"
        height={100}
        hasScrollView={false}
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <Text>固定高度 100px</Text>
      </CardContainer>

      {/* 初始高度 150px，最大高度 250px，可滚动 */}
      <CardContainer
        width="100%"
        height={150}
        maxHeight={250}
        hasScrollView={true}
        style={{ backgroundColor: '#f3e5f5' }}
      >
        <Text>初始高度 150px，最大高度 250px</Text>
        <Text>内容超出时会滚动</Text>
        {Array.from({ length: 10 }, (_, i) => (
          <Text key={i}>内容行 {i + 1}</Text>
        ))}
      </CardContainer>
    </View>
  );
};
```

### 监听布局变化

```typescript
const LayoutTrackingExample = () => {
  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(`卡片尺寸: ${width} x ${height}`);
  };

  return (
    <CardContainer
      onLayout={handleLayout}
      style={{ alignSelf: 'center' }}
    >
      <Text>这个卡片会监听布局变化</Text>
      <Text>查看控制台输出</Text>
    </CardContainer>
  );
};
```

## 高度属性说明

### height vs maxHeight

组件同时支持 `height` 和 `maxHeight` 两个属性，它们的作用不同：

| 属性      | 作用                                    | 适用场景                       |
| --------- | --------------------------------------- | ------------------------------ |
| height    | 设置容器的固定高度或初始高度            | 固定尺寸的卡片、网格布局       |
| maxHeight | 设置容器的最大高度限制                  | 内容可变的滚动容器             |
| 组合使用  | height 设置初始高度，maxHeight 设置上限 | 需要初始高度但有最大限制的场景 |

### 使用建议

1. **仅使用 height**：适用于内容固定、不需要滚动的场景
2. **仅使用 maxHeight**：适用于内容可变、需要滚动的场景
3. **组合使用**：适用于需要初始高度但内容可能超出的场景

## 设计规范

### 默认配置

组件依赖主题配置中的以下字段：

```typescript
const cardContainerTheme = {
  // 尺寸配置
  cardContainerWidth: '100%', // 默认宽度
  cardContainerHeight: undefined, // 默认高度
  cardContainerMaxHeight: 400, // 默认最大高度
  cardContainerRadius: 12, // 默认圆角

  // 颜色配置
  cardContainerBgColor: '#ffffff', // 默认背景色

  // 内边距配置
  cardContainerUpAndDownPadding: 16, // 默认垂直内边距
  cardContainerLeftAndRightPadding: 16, // 默认水平内边距
};
```

### 样式规范

| 属性     | 默认值      | 说明                 |
| -------- | ----------- | -------------------- |
| 宽度     | `100%`      | 自适应父容器宽度     |
| 高度     | `undefined` | 默认不设置固定高度   |
| 最大高度 | `400px`     | 滚动模式下的最大高度 |
| 圆角     | `12px`      | 统一的圆角规范       |
| 背景色   | `#ffffff`   | 默认白色背景         |
| 内边距   | `16px`      | 统一的内边距规范     |

### 布局模式

#### 滚动模式 (`hasScrollView: true`)

- 外层容器：设置宽度和高度（如果指定）
- 滚动视图：设置宽度、高度和最大高度，以及圆角
- 内容容器：设置背景色和内边距

#### 非滚动模式 (`hasScrollView: false`)

- 直接容器：设置所有样式属性，包括高度和最大高度
- 适用于内容确定不会超出的场景

## 注意事项

### 使用限制

1. **主题依赖**：组件依赖 `useFlexUIConfig` 提供的主题配置
2. **尺寸单位**：width、height 和 maxHeight 支持数字（像素）和字符串（百分比）
3. **滚动性能**：长列表建议使用专门的列表组件，而非滚动容器
4. **高度冲突**：当同时设置 height 和 maxHeight 时，实际表现取决于内容大小

### 最佳实践

1. **内容适配**：根据内容长度选择是否启用滚动视图
2. **响应式设计**：使用百分比宽度实现响应式布局
3. **性能优化**：避免在滚动容器中嵌套过多复杂组件
4. **样式一致性**：优先使用主题配置，保持设计一致性
5. **高度设置**：根据具体需求选择合适的高度属性组合

### 性能优化

1. **样式缓存**：`StyleSheet.create` 会缓存样式对象
2. **条件渲染**：根据 `hasScrollView` 条件渲染不同结构
3. **布局优化**：使用 `overflow: 'hidden'` 优化渲染性能

## 依赖说明

### 必需依赖

- `react-native`: 基础 RN 组件
- `@your-ui/provider`: 主题配置提供者
- `@your-ui/utils`: 工具函数（`isNotEmpty`）

### 主题配置

确保在使用组件前正确配置了 `FlexUIProvider` 和相关主题 Token：

```typescript
const theme = {
  components: {
    cardContainer: {
      cardContainerWidth: '100%',
      cardContainerHeight: undefined,
      cardContainerMaxHeight: 400,
      cardContainerRadius: 12,
      cardContainerBgColor: '#ffffff',
      cardContainerUpAndDownPadding: 16,
      cardContainerLeftAndRightPadding: 16,
    },
  },
};
```

### 工具函数

- `isNotEmpty(value)`: 检查值是否不为空，用于判断是否使用自定义内边距
