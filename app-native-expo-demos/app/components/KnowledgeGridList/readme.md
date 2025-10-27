# KnowledgeGridList 知识网格列表组件

## 组件简介

KnowledgeGridList 是一个响应式的知识内容网格展示组件，支持根据容器宽度自动调整列数（1-4列），适用于展示图文知识内容、产品说明、教程步骤等场景。

## 功能特性

- 🔄 **响应式布局**: 根据容器宽度自动调整列数（1-4列）
- 📱 **移动端优化**: 支持移动端到桌面端的完美适配
- 🎨 **Design Token**: 完全基于设计系统token构建
- 🖼️ **图片自适应**: 使用AutoHeightImage组件，保持16:9宽高比
- 📝 **文本截断**: 描述文本最多显示2行，超出部分省略
- 💪 **类型安全**: 完整的TypeScript类型定义
- 🛡️ **容错处理**: 完善的空数据和异常处理

## 响应式断点

| 容器宽度  | 列数 | 适用场景           |
| --------- | ---- | ------------------ |
| ≤ 300px   | 1列  | 移动端竖屏         |
| 301-480px | 2列  | 移动端横屏、小平板 |
| 481-720px | 3列  | 平板竖屏、中等屏幕 |
| > 720px   | 4列  | 平板横屏、桌面端   |

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

type TData = {
  title?: string;
  items?: TKnowledgeItem[];
};

type TKnowledgeItem = {
  image?: string;
  description?: string;
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeGridList Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "description": "组件数据对象",
      "properties": {
        "title": {
          "type": "string",
          "description": "标题文本",
          "maxLength": 100,
          "examples": ["车辆安全气囊说明", "智能驾驶功能介绍"]
        },
        "items": {
          "type": "array",
          "description": "知识项列表",
          "items": {
            "type": "object",
            "properties": {
              "image": {
                "type": "string",
                "description": "图片URL地址",
                "format": "uri",
                "pattern": "^https?://",
                "examples": ["https://picsum.photos/320/180", "https://example.com/image.jpg"]
              },
              "description": {
                "type": "string",
                "description": "描述文本，最多显示2行",
                "maxLength": 200,
                "examples": ["01.正面安全气囊展开", "自适应巡航控制系统，智能调节车速"]
              }
            },
            "additionalProperties": false
          },
          "minItems": 0,
          "maxItems": 50
        }
      },
      "additionalProperties": false
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "additionalProperties": true
    }
  },
  "additionalProperties": false,
  "examples": [
    {
      "data": {
        "title": "车辆安全气囊说明",
        "items": [
          {
            "image": "https://picsum.photos/320/180?random=1",
            "description": "01.正面安全气囊展开"
          },
          {
            "image": "https://picsum.photos/320/180?random=2",
            "description": "02.远端侧气囊"
          }
        ]
      },
      "opts": {
        "width": "100%",
        "height": 376
      }
    }
  ]
}
```

## 使用示例

### 基础用法

```tsx
import KnowledgeGridList from '../components/KnowledgeGridList';

const BasicExample = () => {
  const data = {
    title: '车辆安全气囊说明',
    items: [
      {
        image: 'https://picsum.photos/320/180?random=1',
        description: '01.正面安全气囊展开',
      },
      {
        image: 'https://picsum.photos/320/180?random=2',
        description: '02.远端侧气囊',
      },
      {
        image: 'https://picsum.photos/320/180?random=3',
        description: '03.座椅侧气囊',
      },
      {
        image: 'https://picsum.photos/320/180?random=4',
        description: '04.远端侧气囊展开',
      },
    ],
  };

  return <KnowledgeGridList data={data} />;
};
```

### 自适应宽度

```tsx
const ResponsiveExample = () => {
  const data = {
    title: '智能驾驶功能介绍',
    items: [
      {
        image: 'https://picsum.photos/320/180?random=5',
        description: '自适应巡航控制系统，智能调节车速',
      },
      {
        image: 'https://picsum.photos/320/180?random=6',
        description: '车道保持辅助，确保行驶安全',
      },
    ],
  };

  return <KnowledgeGridList data={data} opts={{ width: '100%' }} />;
};
```

### 固定尺寸

```tsx
const FixedSizeExample = () => {
  const data = {
    title: '技术解析',
    items: [
      {
        image: 'https://picsum.photos/320/180?random=7',
        description: '锂电池充电技术原理',
      },
      {
        image: 'https://picsum.photos/320/180?random=8',
        description: '电机驱动系统工作机制',
      },
    ],
  };

  return <KnowledgeGridList data={data} opts={{ width: 400, height: 500 }} />;
};
```

## Design Token 使用

组件使用以下Design Token：

### 文本样式

- `cnHeadlineXsStrong`: 标题字体样式
- `cnBodyM`: 描述文本字体样式

### 颜色

- `textTitle`: 标题文本颜色
- `textPrimary`: 主要文本颜色

### 间距

- `spaceElementsXs`: 小间距（图片与文本间距）
- `spaceElementsL`: 大间距（网格间距、标题与内容间距）

### 圆角

- `radiusImageS`: 图片圆角

## 容错处理

组件具备完善的容错机制：

### 数据安全

```tsx
// 所有数据访问都有安全处理
const { width, height = 376 } = opts || {};
const { title, items } = data || {};

// 条件渲染避免空数据错误
{
  title && <Text style={styles.title}>{title}</Text>;
}
{
  items?.length > 0 && renderGrid();
}
```

### 图片处理

```tsx
// 图片存在性检查
{
  item?.image && <AutoHeightImage source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />;
}
```

### 文本处理

```tsx
// 文本截断和安全显示
{
  item?.description && (
    <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
      {item.description}
    </Text>
  );
}
```

## 性能特性

- ⚡ **按需渲染**: 只渲染可见内容
- 🔄 **智能更新**: 只在宽度变化时重新计算布局
- 📱 **内存优化**: 高效的图片加载和缓存
- 🎯 **类型优化**: TypeScript提供编译时优化

## 注意事项

1. **图片比例**: 组件固定使用16:9的图片比例，请确保图片资源符合此比例
2. **文本长度**: 描述文本建议控制在50字符以内，超出部分会被截断
3. **容器宽度**: 建议最小宽度不低于200px，以确保良好的显示效果
4. **数据量**: 建议单次渲染的items数量不超过50个，以保证性能

## 兼容性

- ✅ React Native 0.60+
- ✅ iOS 10.0+
- ✅ Android API 21+
- ✅ TypeScript 4.0+
