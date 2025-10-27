# KnowledgeBarChartComparison 组件文档

## 组件概述

KnowledgeBarChartComparison 是一个用于展示数据对比的柱状图组件，支持多个数据项的可视化对比，具有渐变色柱子效果和横向滚动功能。

## 功能特性

- ✅ 支持多个数据项的柱状图对比
- ✅ 柱子具有渐变色效果（从底部80%透明度到顶部0%透明度）
- ✅ 支持横向滚动，适配不同屏幕尺寸
- ✅ 自动计算柱子高度比例
- ✅ 支持标题、描述和多级标签
- ✅ 响应式设计，支持自定义宽高
- ✅ 使用Design Token确保视觉一致性

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
  title?: string; // 图表标题
  description?: string; // 图表描述
  bars?: TBarData[]; // 柱状图数据数组
};

type TBarData = {
  value?: string; // 柱子顶部显示的数值
  height?: number; // 柱子的实际高度值（用于比例计算）
  title?: string; // 柱子底部的主标题
  labels?: string[]; // 柱子底部的标签数组
};
```

## 使用示例

```tsx
import KnowledgeBarChartComparison from './KnowledgeBarChartComparison';

const chartData = {
  title: '能耗参数-纯电动模式下续航里程',
  description: '不同配置下的续航里程对比',
  bars: [
    {
      value: '175km',
      height: 109,
      title: '21寸',
      labels: ['SKE6520S', 'SHEVAS'],
    },
    {
      value: '167km',
      height: 104,
      title: '22寸',
      labels: ['SKE6520S', 'SHEVA1S'],
    },
    {
      value: '225km',
      height: 140,
      title: '21寸',
      labels: ['SKE6520S', 'SHEVA2S'],
    },
    {
      value: '215km',
      height: 134,
      title: '22寸',
      labels: ['SKE6520S', 'SHEVA2S'],
    },
  ],
};

<KnowledgeBarChartComparison data={chartData} opts={{ width: 360, height: 300 }} />;
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeBarChartComparison Props Schema",
  "properties": {
    "data": {
      "type": "object",
      "title": "图表数据",
      "properties": {
        "title": {
          "type": "string",
          "title": "图表标题",
          "description": "显示在图表顶部的主标题",
          "examples": ["能耗参数-纯电动模式下续航里程"]
        },
        "description": {
          "type": "string",
          "title": "图表描述",
          "description": "显示在标题下方的描述文字",
          "examples": ["不同配置下的续航里程对比"]
        },
        "bars": {
          "type": "array",
          "title": "柱状图数据数组",
          "description": "包含所有柱子的数据信息",
          "items": {
            "type": "object",
            "title": "单个柱子数据",
            "properties": {
              "value": {
                "type": "string",
                "title": "数值标签",
                "description": "显示在柱子顶部的数值，如 '175km'",
                "examples": ["175km", "167km", "225km"]
              },
              "height": {
                "type": "number",
                "title": "柱子高度值",
                "description": "用于计算柱子相对高度的数值",
                "minimum": 0,
                "examples": [109, 104, 140, 134]
              },
              "title": {
                "type": "string",
                "title": "柱子主标题",
                "description": "显示在柱子底部的主要标签",
                "examples": ["21寸", "22寸"]
              },
              "labels": {
                "type": "array",
                "title": "标签数组",
                "description": "显示在柱子底部的多个标签",
                "items": {
                  "type": "string"
                },
                "examples": [
                  ["SKE6520S", "SHEVAS"],
                  ["SKE6520S", "SHEVA1S"]
                ]
              }
            }
          },
          "minItems": 1,
          "maxItems": 10
        }
      }
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "additionalProperties": true
    }
  },
  "examples": [
    {
      "data": {
        "title": "能耗参数-纯电动模式下续航里程",
        "description": "不同配置下的续航里程对比",
        "bars": [
          {
            "value": "175km",
            "height": 109,
            "title": "21寸",
            "labels": ["SKE6520S", "SHEVAS"]
          },
          {
            "value": "167km",
            "height": 104,
            "title": "22寸",
            "labels": ["SKE6520S", "SHEVA1S"]
          },
          {
            "value": "225km",
            "height": 140,
            "title": "21寸",
            "labels": ["SKE6520S", "SHEVA2S"]
          },
          {
            "value": "215km",
            "height": 134,
            "title": "22寸",
            "labels": ["SKE6520S", "SHEVA2S"]
          }
        ]
      },
      "opts": {
        "width": 360,
        "maxHeight": 300
      }
    }
  ]
}
```

## 设计规范

### 视觉层次

- **标题**：使用 `cnHeadlineXsStrong` 字体样式，`textTitle` 颜色
- **描述**：使用 `cnBodyS` 字体样式，`textSecondary` 颜色
- **数值标签**：使用 `cnDisplayXxxsStrong` 字体样式，`textPrimary` 颜色
- **底部标签**：使用 `cnBodyS` 字体样式，`textSecondary` 颜色

### 布局间距

- 标题与图表间距：`spaceElementsM`
- 柱子之间间距：`spaceElementsM`
- 柱子内部间距：`spaceElementsS`
- 底部标签间距：`spaceElementsXxs`

### 柱子样式

- **宽度**：12px
- **圆角**：使用 `radiusComp1`
- **渐变色**：从底部 `containerBpDefault` 80%透明度到顶部 0%透明度
- **最小容器宽度**：70px
- **基础高度**：140px（用于比例计算）

## 注意事项

1. **数据安全**：所有属性都是可选的，组件会进行安全的判空处理
2. **响应式**：支持横向滚动，当柱子数量较多时自动启用滚动
3. **高度计算**：柱子高度根据数据中的最大值自动计算比例
4. **依赖项**：需要安装 `react-native-linear-gradient` 用于渐变效果
5. **性能**：建议数据项不超过10个，以确保良好的用户体验

## 依赖

- `react-native-linear-gradient`: 用于柱子的渐变效果
- `CardContainer`: 基础容器组件
- `useFlexUIConfig`: 主题配置Hook
- `hexToRgba`: 颜色转换工具函数
