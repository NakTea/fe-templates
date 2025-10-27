# KnowledgeStatsList 组件说明文档

## 组件概述

`KnowledgeStatsList` 是一个数据统计列表组件，用于展示带有标题的统计数据列表。每个统计项包含标签、数值和单位，适用于展示各种性能参数、统计指标等场景。

## 组件特性

- ✅ 支持自定义标题
- ✅ 支持多项统计数据展示
- ✅ 自动分割线处理（最后一项无分割线）
- ✅ 响应式布局设计
- ✅ 完整的数据安全处理
- ✅ 使用 Design Token 系统
- ✅ TypeScript 类型安全

## 使用示例

### 基础用法

```tsx
import KnowledgeStatsList from './KnowledgeStatsList';

const statsData = {
  title: '车辆性能参数',
  list: [
    {
      label: '综合续航里程 (CLTC)',
      value: '1200',
      unit: 'km',
    },
    {
      label: '百公里电耗',
      value: '15.5',
      unit: 'kWh',
    },
    {
      label: '最高车速',
      value: '250',
      unit: 'km/h',
    },
  ],
};

<KnowledgeStatsList
  data={statsData}
  opts={{
    width: 364,
    height: 376,
  }}
/>;
```

### 自定义尺寸

```tsx
<KnowledgeStatsList
  data={statsData}
  opts={{
    width: 300,
    height: 400,
  }}
/>
```

### 仅数值无单位

```tsx
const simpleData = {
  title: '基础统计',
  list: [
    {
      label: '总数量',
      value: '1000',
    },
    {
      label: '完成率',
      value: '98.5',
      unit: '%',
    },
  ],
};

<KnowledgeStatsList data={simpleData} />;
```

## Props 接口

### IProps

| 属性 | 类型  | 必填 | 默认值 | 说明         |
| ---- | ----- | ---- | ------ | ------------ |
| data | TData | 否   | -      | 组件数据     |
| opts | TOpts | 否   | -      | 组件配置选项 |

### TData

| 属性  | 类型         | 必填 | 说明         |
| ----- | ------------ | ---- | ------------ |
| title | string       | 否   | 统计列表标题 |
| list  | TStatsItem[] | 否   | 统计项列表   |

### TStatsItem

| 属性  | 类型             | 必填 | 说明       |
| ----- | ---------------- | ---- | ---------- |
| label | string           | 否   | 统计项标签 |
| value | string \| number | 否   | 统计数值   |
| unit  | string           | 否   | 数值单位   |

### TOpts

| 属性   | 类型             | 必填 | 默认值 | 说明     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 364    | 组件宽度 |
| height | string \| number | 否   | 376    | 组件高度 |

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeStatsList Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "统计列表标题"
        },
        "list": {
          "type": "array",
          "description": "统计项列表",
          "items": {
            "type": "object",
            "properties": {
              "label": {
                "type": "string",
                "description": "统计项标签"
              },
              "value": {
                "oneOf": [{ "type": "string" }, { "type": "number" }],
                "description": "统计数值"
              },
              "unit": {
                "type": "string",
                "description": "数值单位"
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

## 样例数据

### 车辆性能参数

```json
{
  "data": {
    "title": "车辆性能参数",
    "list": [
      {
        "label": "综合续航里程 (CLTC)",
        "value": "1200",
        "unit": "km"
      },
      {
        "label": "百公里电耗",
        "value": "15.5",
        "unit": "kWh"
      },
      {
        "label": "最高车速",
        "value": "250",
        "unit": "km/h"
      },
      {
        "label": "快充时间 (10-80%)",
        "value": "25",
        "unit": "min"
      },
      {
        "label": "电池容量",
        "value": "150",
        "unit": "kWh"
      }
    ]
  },
  "opts": {
    "width": 364,
    "maxHeight": 376
  }
}
```

### 销售统计

```json
{
  "data": {
    "title": "本月销售统计",
    "list": [
      {
        "label": "总销售额",
        "value": "2,580,000",
        "unit": "元"
      },
      {
        "label": "订单数量",
        "value": "1,250",
        "unit": "单"
      },
      {
        "label": "客户满意度",
        "value": "98.5",
        "unit": "%"
      },
      {
        "label": "退货率",
        "value": "1.2",
        "unit": "%"
      }
    ]
  },
  "opts": {
    "width": 320,
    "maxHeight": 300
  }
}
```

### 系统性能监控

```json
{
  "data": {
    "title": "系统性能监控",
    "list": [
      {
        "label": "CPU 使用率",
        "value": "45.2",
        "unit": "%"
      },
      {
        "label": "内存使用",
        "value": "8.5",
        "unit": "GB"
      },
      {
        "label": "磁盘空间",
        "value": "75.8",
        "unit": "%"
      },
      {
        "label": "网络延迟",
        "value": "12",
        "unit": "ms"
      },
      {
        "label": "在线用户",
        "value": "3,247",
        "unit": "人"
      }
    ]
  }
}
```

## 设计规范

### 布局结构

- 标题：使用 `cnHeadlineXsStrong` 字体样式
- 统计项：三列布局（标签-数值-单位）
- 间距：统计项间距 `spaceElementsS`，组件内边距 `spaceElementsM`

### 颜色使用

- 标题颜色：`textTitle`
- 标签颜色：`textPrimary`
- 数值颜色：`textPrimary`
- 单位颜色：`textSecondary`
- 分割线颜色：`dividerList`

### 字体规范

- 标题：`cnHeadlineXsStrong` (14px, 800)
- 标签：`cnBodyM` (14px, 400)
- 数值：`cnDisplayXxsStrong` (20px, 800)
- 单位：`cnBodyM` (14px, 400)

## 注意事项

1. **数据安全**：所有数据访问都经过安全解构处理
2. **条件渲染**：标题、标签、数值、单位都进行条件渲染
3. **分割线处理**：最后一项不显示分割线
4. **响应式**：支持自定义宽高，适配不同场景
5. **性能优化**：使用 `StyleSheet.create` 创建样式对象
