# KnowledgeHorizontalOverview 组件说明文档

## 组件概述

`KnowledgeHorizontalOverview` 是一个知识库横向概览组件，用于展示核心功能模块的卡片式横向滚动列表。组件包含标题、描述和可横向滚动的功能卡片，每个卡片包含图片、标题和描述信息。

## 组件特性

- ✅ 横向滚动展示多个功能卡片
- ✅ 支持自定义容器尺寸
- ✅ 响应式图片展示（4:3宽高比）
- ✅ 完整的类型安全保障
- ✅ 遵循设计系统规范
- ✅ 安全的数据渲染处理

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
  title?: string; // 主标题
  description?: string; // 主描述
  items?: TScrollItem[]; // 滚动项目列表
};

type TScrollItem = {
  title?: string; // 卡片标题
  description?: string; // 卡片描述
  image?: string; // 卡片图片URL
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeHorizontalOverview Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "description": "组件主要数据内容",
      "properties": {
        "title": {
          "type": "string",
          "description": "组件主标题",
          "maxLength": 50,
          "examples": ["车辆核心功能", "产品功能概览"]
        },
        "description": {
          "type": "string",
          "description": "组件主描述文本",
          "maxLength": 200,
          "examples": ["快速了解您爱车的核心功能模块，滑动浏览各项功能的详细介绍与设置入口。"]
        },
        "items": {
          "type": "array",
          "description": "横向滚动的功能卡片列表",
          "minItems": 1,
          "maxItems": 10,
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "卡片标题",
                "maxLength": 30,
                "examples": ["动力系统", "智能座舱", "自动空调"]
              },
              "description": {
                "type": "string",
                "description": "卡片描述文本",
                "maxLength": 100,
                "examples": ["2.0T涡轮增压发动机，提供强劲的动力输出与多种驾驶模式选择。"]
              },
              "image": {
                "type": "string",
                "format": "uri",
                "description": "卡片图片URL地址",
                "pattern": "^https?://.*\\.(jpg|jpeg|png|webp|gif).*$",
                "examples": [
                  "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_01.png"
                ]
              }
            },
            "additionalProperties": false
          }
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
  "additionalProperties": false
}
```

## 使用示例

### 基础用法

```tsx
import KnowledgeHorizontalOverview from './KnowledgeHorizontalOverview';

const basicData = {
  title: '车辆核心功能',
  description: '快速了解您爱车的核心功能模块，滑动浏览各项功能的详细介绍与设置入口。',
  items: [
    {
      title: '动力系统',
      description: '2.0T涡轮增压发动机，提供强劲的动力输出与多种驾驶模式选择。',
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_01.png',
    },
    {
      title: '智能座舱',
      description: '集成12.3英寸中控大屏，支持语音控制与在线娱乐功能。',
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_02.png',
    },
  ],
};

<KnowledgeHorizontalOverview data={basicData} />;
```

### 自定义尺寸

```tsx
const customOpts = {
  width: 500,
  height: 400,
};

<KnowledgeHorizontalOverview data={basicData} opts={customOpts} />;
```

### 无图片模式

```tsx
const textOnlyData = {
  title: '功能列表',
  description: '以下是主要功能介绍',
  items: [
    {
      title: '基础功能',
      description: '提供核心的基础操作功能，满足日常使用需求。',
    },
    {
      title: '高级功能',
      description: '包含更多高级特性，提升使用体验。',
    },
  ],
};

<KnowledgeHorizontalOverview data={textOnlyData} />;
```

## 数据要求

### 必填字段

- 无强制必填字段，组件会安全处理所有空值情况

### 推荐字段

- `data.title`: 建议提供主标题
- `data.items`: 建议至少提供1个项目
- `data.items[].title`: 建议每个项目都有标题

### 字段限制

- `title`: 建议不超过50个字符
- `description`: 建议不超过200个字符
- `items`: 建议不超过10个项目
- `items[].title`: 建议不超过30个字符
- `items[].description`: 建议不超过100个字符

## 样式定制

组件使用设计系统的tokens，主要包括：

- **颜色**: `textTitle`, `textPrimary`, `textSecondary`, `textTertiary`
- **间距**: `spaceElementsXs`, `spaceElementsS`, `spaceElementsM`
- **圆角**: `radiusCard`, `radiusInCard`
- **字体**: `cnHeadlineXsStrong`, `cnHeadlineXxsStrong`, `cnBodyM`, `cnBodyS`

## 注意事项

1. **图片资源**: 确保图片URL可访问，建议使用CDN
2. **性能优化**: 大量图片时注意内存使用
3. **文本长度**: 过长文本会自动截断显示
4. **横向滚动**: 在小屏设备上确保滚动体验良好
5. **数据安全**: 组件已内置空值处理，无需额外判断

## Mock数据生成器

```javascript
// 生成Mock数据的辅助函数
function generateMockData(itemCount = 4) {
  const mockItems = [];

  for (let i = 1; i <= itemCount; i++) {
    mockItems.push({
      title: `功能模块 ${i}`,
      description: `这是第${i}个功能模块的详细描述，展示了该模块的核心特性和使用场景。`,
      image: `https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_168,h_126`,
    });
  }

  return {
    title: '功能概览',
    description: '探索我们产品的核心功能模块，每个模块都经过精心设计以提供最佳用户体验。',
    items: mockItems,
  };
}

// 使用示例
const mockData = generateMockData(5);
<KnowledgeHorizontalOverview data={mockData} />;
```
