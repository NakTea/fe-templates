# KnowledgeDataGrid 组件说明文档

## 组件概述

KnowledgeDataGrid 是一个用于展示知识数据网格的组件，采用2列网格布局展示数据项，支持标题、数值、单位和描述信息，并可添加提醒信息。

## 功能特性

- **2列网格布局**：自动排列数据项，每行显示2个数据块
- **数据展示**：支持标题、描述、数值和单位的完整展示
- **提醒功能**：集成Tips组件，支持4种类型的提醒信息
- **响应式设计**：支持自定义宽高，内容超出时可滚动
- **主题一致性**：使用系统Design Token确保样式统一

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
  items?: TItem[];
  tips?: {
    type: 'error' | 'success' | 'warning' | 'info';
    message: string;
  };
};

type TItem = {
  title?: string;
  description?: string;
  value?: string | number;
  unit?: string;
};
```

## 参数说明

### data 参数

| 属性  | 类型    | 必填 | 默认值       | 说明       |
| ----- | ------- | ---- | ------------ | ---------- |
| title | string  | 否   | -            | 卡片标题   |
| items | TItem[] | 否   | -            | 数据项数组 |
| tips  | TTips   | 否   | 提示信息对象 |

### TTips

| 属性    | 类型   | 必填 | 说明                                                  |
| ------- | ------ | ---- | ----------------------------------------------------- |
| type    | string | 是   | 提示类型：'error' \| 'warning' \| 'info' \| 'success' |
| message | string | 是   | 提示消息内容                                          |

### TItem 数据项参数

| 属性        | 类型             | 必填 | 默认值 | 说明       |
| ----------- | ---------------- | ---- | ------ | ---------- |
| title       | string           | 否   | -      | 数据项标题 |
| description | string           | 否   | -      | 数据项描述 |
| value       | string \| number | 否   | -      | 数据值     |
| unit        | string           | 否   | -      | 数据单位   |

### opts 参数

| 属性   | 类型             | 必填 | 默认值 | 说明     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 376    | 组件宽度 |
| height | string \| number | 否   | -      | 组件高度 |

## 使用示例

```tsx
import KnowledgeDataGrid from './KnowledgeDataGrid';

const Example = () => {
  const mockData = {
    title: '家充桩·单相功率',
    items: [
      {
        title: '用电容量',
        description: '常规数值 (默认)',
        value: '7',
        unit: 'kW',
      },
      {
        title: '输入电流',
        description: '常规数值',
        value: '32',
        unit: 'A',
      },
      {
        title: '最大输出功率',
        description: '常规数值',
        value: '11',
        unit: 'kW',
      },
      {
        title: '输入电压',
        description: '常规数值',
        value: '220',
        unit: 'V',
      },
    ],
    tips: {
      type: 'warning',
      message: '家充桩可根据 AITO 设置的用电容量，限制最大功率',
    },
  };

  return <KnowledgeDataGrid data={mockData} opts={{ width: 376, height: 400 }} />;
};
```

## Mock Data JSON Schema

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
          "description": "卡片标题"
        },
        "items": {
          "type": "array",
          "description": "数据项数组",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "数据项标题"
              },
              "description": {
                "type": "string",
                "description": "数据项描述"
              },
              "value": {
                "oneOf": [{ "type": "string" }, { "type": "number" }],
                "description": "数据值"
              },
              "unit": {
                "type": "string",
                "description": "数据单位"
              }
            },
            "additionalProperties": false
          }
        },
        "tips": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["error", "warning", "info", "success"],
              "description": "提示类型"
            },
            "message": {
              "type": "string",
              "description": "提示信息内容"
            }
          },
          "required": ["type", "message"]
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

## Mock Data 示例

```json
{
  "data": {
    "title": "家充桩·单相功率",
    "items": [
      {
        "title": "用电容量",
        "description": "常规数值 (默认)",
        "value": "7",
        "unit": "kW"
      },
      {
        "title": "输入电流",
        "description": "常规数值",
        "value": "32",
        "unit": "A"
      },
      {
        "title": "最大输出功率",
        "description": "常规数值",
        "value": "11",
        "unit": "kW"
      },
      {
        "title": "输入电压",
        "description": "常规数值",
        "value": "220",
        "unit": "V"
      }
    ],
    "reminderText": "家充桩可根据 AITO 设置的用电容量，限制最大功率",
    "reminderType": "warning"
  },
  "opts": {
    "width": 376,
    "maxHeight": 400
  }
}
```

## 设计规范

- **布局**：2列网格，每个数据块占48%宽度
- **间距**：使用系统token控制各元素间距
- **字体**：标题使用cnHeadlineXsStrong，数值使用cnDisplayXxsStrong
- **颜色**：遵循主题色彩规范
- **圆角**：数据块使用radiusInCard圆角
- **提醒**：使用Tips组件统一提醒样式

## 注意事项

1. 所有数据字段都是可选的，组件会自动处理空值情况
2. 数据项数组为空或不存在时，不会渲染网格区域
3. 提醒文本支持Markdown格式
4. 组件内容超出高度时会自动滚动
5. 建议数据项数量为偶数，以保持网格布局的美观
