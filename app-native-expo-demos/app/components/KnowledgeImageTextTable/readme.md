# KnowledgeImageTextTable 组件文档

## 组件概述

KnowledgeImageTextTable 是一个专门用于知识库场景的图文表格组件，支持展示包含图片、文本等多种类型数据的表格内容。组件基于 CardContainer 和 Table 基础组件构建，提供了良好的数据安全处理和样式规范。

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeImageTextTable Props Schema",
  "properties": {
    "data": {
      "type": "object",
      "description": "表格数据对象",
      "properties": {
        "title": {
          "type": "string",
          "description": "表格标题"
        },
        "tableKey": {
          "type": "string",
          "description": "表格唯一标识键"
        },
        "columns": {
          "type": "array",
          "description": "表格列配置数组",
          "items": {
            "type": "object",
            "required": ["title", "dataIndex"],
            "properties": {
              "title": {
                "type": "string",
                "description": "列标题"
              },
              "dataIndex": {
                "type": "string",
                "description": "数据字段名"
              },
              "width": {
                "type": "number",
                "description": "列宽度（像素）",
                "minimum": 1
              },
              "type": {
                "type": "string",
                "default": "text",
                "description": "列数据类型"
              },
              "imageStyle": {
                "type": "object",
                "description": "图片样式配置（仅当type为image时有效）",
                "properties": {
                  "width": {
                    "type": "number",
                    "description": "图片宽度",
                    "minimum": 1,
                    "default": 32
                  },
                  "height": {
                    "type": "number",
                    "description": "图片高度",
                    "minimum": 1,
                    "default": 32
                  },
                  "borderRadius": {
                    "type": "number",
                    "description": "图片圆角",
                    "minimum": 0
                  }
                }
              }
            }
          }
        },
        "dataSource": {
          "type": "array",
          "description": "表格数据源数组",
          "items": {
            "type": "object",
            "description": "表格行数据",
            "patternProperties": {
              "^.*$": {
                "oneOf": [{ "type": "string" }, { "type": "number" }, { "type": "boolean" }, { "type": "null" }]
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

## TypeScript 类型定义

```typescript
type TData = {
  title?: string;
  tableKey?: string;
  columns?: {
    title: string;
    dataIndex: string;
    width?: number;
    type?: 'text' | 'image' | 'icon';
    imageStyle?: {
      width?: number;
      height?: number;
      borderRadius?: number;
    };
  }[];
  dataSource?: Record<string, any>[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}
```

## 属性说明

### data 属性

| 属性名     | 类型                  | 必填 | 默认值 | 描述                                  |
| ---------- | --------------------- | ---- | ------ | ------------------------------------- |
| title      | string                | 否   | -      | 表格标题，显示在表格上方              |
| tableKey   | string                | 否   | -      | 表格唯一标识键，用于Table组件内部处理 |
| columns    | Column[]              | 否   | -      | 表格列配置数组                        |
| dataSource | Record<string, any>[] | 否   | -      | 表格数据源数组                        |

### columns 列配置

| 属性名     | 类型                        | 必填 | 默认值 | 描述                                |
| ---------- | --------------------------- | ---- | ------ | ----------------------------------- |
| title      | string                      | 是   | -      | 列标题                              |
| dataIndex  | string                      | 是   | -      | 对应数据源中的字段名                |
| width      | number                      | 否   | -      | 列宽度（像素）                      |
| type       | 'text' \| 'image' \| 'icon' | 否   | 'text' | 列数据类型                          |
| imageStyle | ImageStyle                  | 否   | -      | 图片样式配置（仅type为image时有效） |

### imageStyle 图片样式

| 属性名       | 类型   | 必填 | 默认值       | 描述     |
| ------------ | ------ | ---- | ------------ | -------- |
| width        | number | 否   | 32           | 图片宽度 |
| height       | number | 否   | 32           | 图片高度 |
| borderRadius | number | 否   | radiusImageS | 图片圆角 |

### opts 选项配置

| 属性名 | 类型             | 必填 | 默认值 | 描述     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 440    | 组件宽度 |
| height | string \| number | 否   | 376    | 组件高度 |

## 使用示例

### 基础用法

```tsx
import KnowledgeImageTextTable from './KnowledgeImageTextTable';

const basicData = {
  title: 'NCA 图标含义',
  tableKey: 'icon',
  columns: [
    {
      title: '图标',
      dataIndex: 'icon',
      type: 'image',
      width: 60,
      imageStyle: { width: 32, height: 32 },
    },
    { title: '状态', dataIndex: 'status' },
    { title: '含义', dataIndex: 'meaning' },
    { title: '说明', dataIndex: 'description' },
  ],
  dataSource: [
    {
      id: 1,
      icon: 'https://example.com/icon1.png',
      status: '点亮',
      meaning: 'NCA 可用',
      description: '满足 NCA条件时显示',
    },
  ],
};

<KnowledgeImageTextTable data={basicData} />;
```

### 自定义尺寸

```tsx
<KnowledgeImageTextTable data={basicData} opts={{ width: '100%', maxHeight: 400 }} />
```

### 纯文本表格

```tsx
const textOnlyData = {
  title: '功能对比',
  columns: [
    { title: '功能', dataIndex: 'feature' },
    { title: '基础版', dataIndex: 'basic' },
    { title: '专业版', dataIndex: 'pro' },
  ],
  dataSource: [
    { feature: '用户数量', basic: '10人', pro: '无限制' },
    { feature: '存储空间', basic: '1GB', pro: '100GB' },
  ],
};

<KnowledgeImageTextTable data={textOnlyData} />;
```

## 设计规范

### 视觉规范

- 组件使用 CardContainer 作为外层容器
- 标题使用 `cnHeadlineXsStrong` 字体样式
- 图片默认尺寸为 32x32 像素，圆角使用 `radiusImageS`
- 组件间距使用 `spaceElementsM`

### 数据安全

- 所有 props 解构都有兜底处理 `|| {}`
- 所有内容渲染都有条件判断
- 支持数据源为空的情况

### 响应式支持

- 宽度支持数字和字符串类型
- 自动计算表格容器宽度
- 支持百分比宽度设置

## 注意事项

1. **图片资源**：确保图片URL可访问，建议使用CDN资源
2. **数据结构**：dataSource中的字段名需与columns中的dataIndex对应
3. **性能优化**：大量数据时建议使用分页或虚拟滚动
4. **样式一致性**：遵循设计系统token，保持视觉统一
5. **类型安全**：使用TypeScript确保数据类型正确
