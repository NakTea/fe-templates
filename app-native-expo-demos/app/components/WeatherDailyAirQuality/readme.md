# WeatherDailyAirQuality 组件说明文档

## 组件概述

WeatherDailyAirQuality 是一个用于展示每日空气质量信息的 React Native 组件。该组件以卡片形式展示地点、日期、空气质量指数（AQI）和健康建议等信息，并使用仪表盘指针可视化显示 AQI 数值。

## 功能特性

- 📍 显示地点和日期信息
- 📊 使用仪表盘指针展示 AQI 数值和等级
- 💡 提供健康建议信息
- 🎨 支持主题样式定制
- 📱 响应式布局设计
- 🔒 完整的数据安全处理

## 组件结构

```
WeatherDailyAirQuality
├── 标题区域（地点 + 日期）
├── AQI 仪表盘展示区域
└── 健康建议区域
```

## Props 接口定义

### TData 类型定义

```typescript
type TData = {
  location?: string; // 地点名称
  date?: string; // 日期信息
  aqi?: {
    // 空气质量指数对象
    value?: number; // AQI 数值
    label?: string; // AQI 等级标签（如：优、良、轻度污染等）
  };
  suggestion?: {
    // 健康建议对象
    title?: string; // 建议标题
    description?: string; // 建议描述
  };
};
```

### IProps 接口定义

```typescript
interface IProps {
  data?: TData; // 数据对象
  opts?: {
    // 配置选项
    width?: string | number; // 组件宽度
    height?: string | number; // 组件高度
  };
}
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
        "location": {
          "type": "string",
          "description": "地点名称"
        },
        "date": {
          "type": "string",
          "description": "日期信息"
        },
        "aqi": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number",
              "minimum": 0,
              "maximum": 500,
              "description": "空气质量指数数值，范围0-500"
            },
            "label": {
              "type": "string",
              "description": "空气质量等级标签"
            }
          },
          "description": "空气质量指数对象"
        },
        "suggestion": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "健康建议标题"
            },
            "description": {
              "type": "string",
              "description": "健康建议详细描述"
            }
          },
          "description": "健康建议对象"
        }
      },
      "description": "组件数据对象"
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "additionalProperties": true
    }
  }
}
```

## Mock Data

### 基础示例数据

```json
{
  "data": {
    "location": "北京市",
    "date": "2024年1月15日",
    "aqi": {
      "value": 85,
      "label": "良"
    },
    "suggestion": {
      "title": "健康建议",
      "description": "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响，极少数异常敏感人群应减少户外活动。"
    }
  },
  "opts": {
    "width": 350,
    "maxHeight": 280
  }
}
```

### 优质空气示例

```json
{
  "data": {
    "location": "三亚市",
    "date": "今天",
    "aqi": {
      "value": 35,
      "label": "优"
    },
    "suggestion": {
      "title": "健康建议",
      "description": "空气质量令人满意，基本无空气污染，各类人群可正常活动。"
    }
  },
  "opts": {
    "width": 320
  }
}
```

### 轻度污染示例

```json
{
  "data": {
    "location": "上海市浦东新区",
    "date": "2024-01-15",
    "aqi": {
      "value": 125,
      "label": "轻度污染"
    },
    "suggestion": {
      "title": "健康建议",
      "description": "易感人群症状有轻度加剧，健康人群出现刺激症状。儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。"
    }
  },
  "opts": {
    "width": 360,
    "maxHeight": 300
  }
}
```

### 重度污染示例

```json
{
  "data": {
    "location": "石家庄市",
    "date": "12月25日",
    "aqi": {
      "value": 245,
      "label": "重度污染"
    },
    "suggestion": {
      "title": "健康建议",
      "description": "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状。儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。"
    }
  },
  "opts": {
    "width": 340,
    "maxHeight": 320
  }
}
```

### 最小数据示例

```json
{
  "data": {
    "aqi": {
      "value": 68,
      "label": "良"
    }
  }
}
```

### 仅地点和日期示例

```json
{
  "data": {
    "location": "广州市",
    "date": "明天"
  },
  "opts": {
    "width": "100%",
    "height": 200
  }
}
```

## 使用示例

### 基础使用

```tsx
import WeatherDailyAirQuality from './WeatherDailyAirQuality';

const App = () => {
  const airQualityData = {
    location: '北京市',
    date: '今天',
    aqi: {
      value: 85,
      label: '良',
    },
    suggestion: {
      title: '健康建议',
      description: '空气质量可接受，敏感人群应减少户外活动。',
    },
  };

  return <WeatherDailyAirQuality data={airQualityData} opts={{ width: 350, height: 280 }} />;
};
```

### 响应式使用

```tsx
<WeatherDailyAirQuality data={airQualityData} opts={{ width: '90%' }} />
```

## 设计规范

### 颜色使用

- 标题文字：`textTitle`
- 主要文字：`textPrimary`
- 图标颜色：`iconPrimary`
- 背景色：`containerPrimaryWeather`

### 间距规范

- 元素间距：`spaceElementsXs`（小间距）
- 区块间距：`spaceElementsM`（中等间距）

### 字体规范

- 标题：`cnHeadlineXsStrong`
- AQI 数值：`cnDisplayLStrong`
- AQI 等级：`cnDisplayXxsStrong`
- 描述文字：`cnBodyM`

## 注意事项

1. **数据安全**：所有数据字段都进行了安全处理，支持部分数据缺失
2. **条件渲染**：各个区域根据数据是否存在进行条件渲染
3. **AQI 范围**：AQI 数值建议在 0-500 范围内
4. **依赖组件**：需要 `GaugePointer` 组件支持仪表盘显示
5. **主题支持**：完全支持主题系统，自动适配不同主题样式

## AQI 等级参考

| AQI 范围 | 等级     | 颜色建议 |
| -------- | -------- | -------- |
| 0-50     | 优       | 绿色     |
| 51-100   | 良       | 黄色     |
| 101-150  | 轻度污染 | 橙色     |
| 151-200  | 中度污染 | 红色     |
| 201-300  | 重度污染 | 紫色     |
| 300+     | 严重污染 | 褐红色   |
