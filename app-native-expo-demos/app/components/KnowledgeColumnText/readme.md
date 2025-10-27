# KnowledgeColumnText 组件文档

## 组件概述

KnowledgeColumnText 是一个用于展示知识库内容的单列文本组件，支持标题、描述、图片和层级化列表内容的展示。组件采用垂直布局，适用于功能说明、操作指南等场景。

## 功能特性

- ✅ 支持标题和描述文本展示
- ✅ 支持主图片展示
- ✅ 支持编号列表和子项目展示
- ✅ 响应式布局，支持内容滚动
- ✅ 完全基于Design Token设计
- ✅ 支持条件渲染，数据安全处理

## 组件接口

### Props 类型定义

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
  description?: string; // 描述文本
  image?: string; // 主图片URL
  items?: TPartItem[]; // 列表项数组
};

type TPartItem = {
  number?: string; // 编号
  title?: string; // 项目标题
  subItems?: TSubItem[]; // 子项目数组
};

type TSubItem = {
  content?: string; // 子项目内容
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "组件主标题"
        },
        "description": {
          "type": "string",
          "description": "组件描述文本"
        },
        "image": {
          "type": "string",
          "format": "uri",
          "description": "主图片的URL地址"
        },
        "items": {
          "type": "array",
          "description": "列表项数组",
          "items": {
            "type": "object",
            "properties": {
              "number": {
                "type": "string",
                "description": "项目编号，通常为数字字符串"
              },
              "title": {
                "type": "string",
                "description": "项目标题"
              },
              "subItems": {
                "type": "array",
                "description": "子项目数组",
                "items": {
                  "type": "object",
                  "properties": {
                    "content": {
                      "type": "string",
                      "description": "子项目的具体内容"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "additionalProperties": true
    }
  }
}
```

## 使用示例

### 基础用法

```tsx
import KnowledgeColumnText from './KnowledgeColumnText';

const basicData = {
  title: '车辆功能详解',
  description: '深入了解您车辆的各项核心功能',
  image: 'https://example.com/car-image.jpg',
  items: [
    {
      number: '1',
      title: '智能巡航控制',
      subItems: [{ content: '可设定目标速度与前车距离，车辆将自动跟随。' }],
    },
    {
      number: '2',
      title: '主动车道保持',
      subItems: [{ content: '系统会主动修正方向，帮助车辆保持在车道中央行驶。' }],
    },
  ],
};

<KnowledgeColumnText data={basicData} />;
```

### 自定义尺寸

```tsx
<KnowledgeColumnText data={data} opts={{ width: 400, height: 500 }} />
```

### 无图片模式

```tsx
const textOnlyData = {
  title: '操作指南',
  description: '详细的操作步骤说明',
  items: [
    {
      number: '1',
      title: '第一步',
      subItems: [{ content: '打开应用程序' }],
    },
  ],
};

<KnowledgeColumnText data={textOnlyData} />;
```

## Mock数据示例

```typescript
const mockData = {
  data: {
    title: '车辆功能详解',
    description: '深入了解您车辆的各项核心功能，包含具体的操作指南和注意事项。',
    image:
      'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_316,h_178',
    items: [
      {
        number: '1',
        title: '遥控泊车辅助',
        subItems: [{ content: '长按泊车按键开启遥控泊车功能，具体操作方式请参阅遥控泊车辅助章节。' }],
      },
      {
        number: '2',
        title: '智能巡航控制',
        subItems: [{ content: '可设定目标速度与前车距离，车辆将自动跟随。' }],
      },
      {
        number: '3',
        title: '主动车道保持',
        subItems: [{ content: '系统会主动修正方向，帮助车辆保持在车道中央行驶。' }],
      },
    ],
  },
  opts: {
    width: 364,
    height: 376,
  },
};
```

## 样式特性

- **标题样式**: 使用 `cnHeadlineXsStrong` 字体，`textTitle` 颜色
- **描述样式**: 使用 `cnBodyM` 字体，`textSecondary` 颜色
- **编号样式**: 圆形背景，`containerSecondary` 背景色
- **子项目**: 使用项目符号"•"，左侧缩进对齐
- **间距规范**: 使用系统间距token，保持一致性

## 注意事项

1. **数据安全**: 所有字段都进行了安全判空处理
2. **响应式**: 组件支持内容滚动，适应不同内容长度
3. **性能优化**: 使用key prop优化列表渲染
4. **可访问性**: 保持良好的文本对比度和布局层次
5. **扩展性**: 支持灵活的数据结构，易于扩展新功能

## 适用场景

- 产品功能介绍
- 操作指南说明
- 知识库文档展示
- 教程步骤说明
- 规范文档展示
