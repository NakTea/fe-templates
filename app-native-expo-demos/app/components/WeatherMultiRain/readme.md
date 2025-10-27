# WeatherMultiRain 组件说明文档

## 组件概述

WeatherMultiRain 是一个天气降雨概率展示组件，使用 ECharts 图表库展示多日降雨概率趋势，支持高亮特定日期，并提供地点、天气图标、结论文本等信息展示。

## 功能特性

- 📍 地点信息展示
- 🌦️ 天气图标展示
- 📊 降雨概率折线图
- ✨ 特定日期高亮显示
- 💬 提示信息展示
- 🎨 主题色彩适配
- 📱 响应式布局

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
        "weatherIcon": {
          "type": "string",
          "description": "天气图标名称，使用 IconFont 组件支持的图标"
        },
        "title": {
          "type": "string",
          "description": "主要结论文本"
        },
        "chartData": {
          "type": "object",
          "properties": {
            "x": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "时间标签数组，如日期或时间"
            },
            "y": {
              "type": "array",
              "items": {
                "type": "number",
                "minimum": 0,
                "maximum": 100
              },
              "description": "降水概率数据数组，范围 0-100"
            },
            "highlight": {
              "type": "array",
              "items": {
                "oneOf": [{ "type": "string" }, { "type": "number" }]
              },
              "description": "高亮日期，可以是日期字符串或索引数字"
            }
          },
          "description": "图表数据配置"
        },
        "message": {
          "type": "string",
          "description": "底部提示文本"
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
  location?: string; // 地点名称
  weatherIcon?: string; // 天气图标
  title?: string; // 主要结论文本
  chartData?: {
    x?: string[]; // 时间标签
    y?: number[]; // 降水概率数据
    highlight?: (string | number)[]; // 高亮日期索引
  };
  message?: string; // 提示文本
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}
```

## Mock Data

### 基础示例

```json
{
  "data": {
    "location": "北京市",
    "weatherIcon": "systemCloudRainFill",
    "title": "未来7天有3天降雨",
    "chartData": {
      "x": ["今天", "明天", "后天", "周四", "周五", "周六", "周日"],
      "y": [20, 45, 80, 60, 30, 10, 5],
      "highlight": ["明天", "后天", "周四"]
    },
    "message": "建议出行携带雨具"
  },
  "opts": {
    "width": 360,
    "maxHeight": 280
  }
}
```

### 高降雨概率示例

```json
{
  "data": {
    "location": "上海市",
    "weatherIcon": "systemCloudRainHeavyFill",
    "title": "连续强降雨天气",
    "chartData": {
      "x": ["周一", "周二", "周三", "周四", "周五"],
      "y": [85, 90, 95, 88, 75],
      "highlight": [0, 1, 2, 3, 4]
    },
    "message": "请注意防范强降雨天气，避免户外活动"
  },
  "opts": {
    "width": 320
  }
}
```

### 低降雨概率示例

```json
{
  "data": {
    "location": "深圳市",
    "weatherIcon": "systemSunFill",
    "title": "晴好天气为主",
    "chartData": {
      "x": ["1日", "2日", "3日", "4日", "5日", "6日", "7日"],
      "y": [5, 10, 15, 8, 12, 6, 3],
      "highlight": []
    },
    "message": "适宜户外活动和出行"
  },
  "opts": {
    "width": 400,
    "maxHeight": 300
  }
}
```

### 使用索引高亮示例

```json
{
  "data": {
    "location": "广州市",
    "weatherIcon": "systemCloudFill",
    "title": "周末有雨",
    "chartData": {
      "x": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      "y": [25, 30, 20, 35, 40, 70, 65],
      "highlight": [5, 6]
    },
    "message": "周末降雨概率较高，注意安排行程"
  }
}
```

### 无图表数据示例

```json
{
  "data": {
    "location": "杭州市",
    "weatherIcon": "systemCloudFill",
    "title": "天气数据更新中",
    "message": "正在获取最新天气信息..."
  },
  "opts": {
    "width": 360
  }
}
```

### 最小数据示例

```json
{
  "data": {
    "title": "天气预报"
  }
}
```

## 使用示例

```tsx
import React from 'react';
import WeatherMultiRain from './WeatherMultiRain';

const WeatherExample = () => {
  const weatherData = {
    location: '北京市',
    weatherIcon: 'systemCloudRainFill',
    title: '未来7天有3天降雨',
    chartData: {
      x: ['今天', '明天', '后天', '周四', '周五', '周六', '周日'],
      y: [20, 45, 80, 60, 30, 10, 5],
      highlight: ['明天', '后天', '周四'],
    },
    message: '建议出行携带雨具',
  };

  return <WeatherMultiRain data={weatherData} opts={{ width: 360, height: 280 }} />;
};
```

## 设计规范

### 布局结构

- 地点信息：顶部左对齐，带位置图标
- 天气图标：居中显示，大尺寸
- 结论文本：居中显示，突出字体
- 图表区域：全宽显示，固定高度 80px
- 提示信息：底部显示，小字体

### 图表特性

- 折线图：平滑曲线，带填充区域
- 高亮点：圆形标记，突出显示
- Y轴范围：0-100%，间隔50%
- 工具提示：显示具体降雨概率

### 颜色主题

- 使用系统主题色彩
- 图表颜色：chartBorderRain、chartBgRain
- 高亮颜色：textTitle
- 背景色：containerPrimaryWeather

## 注意事项

1. **数据验证**：确保 chartData.x 和 chartData.y 数组长度一致
2. **降雨概率范围**：y 值应在 0-100 之间
3. **高亮匹配**：highlight 数组中的值应与 x 数组中的值或索引匹配
4. **图标名称**：weatherIcon 应使用 IconFont 组件支持的图标名称
5. **响应式适配**：组件会根据屏幕宽度自动调整图表宽度
6. **无数据处理**：当图表数据不完整时会显示"暂无图表数据"提示
