# WeatherDailyRain 组件说明文档

## 组件概述

WeatherDailyRain 是一个天气降雨概率展示组件，用于显示特定地点和日期的降雨概率信息，包含交互式图表和相关建议。组件使用 ECharts 绘制降雨概率趋势图，支持高亮显示特定时间点。

## 功能特性

- 📍 地点和日期信息展示
- 📊 降雨概率百分比显示
- 📈 交互式降雨概率趋势图表
- 🎯 支持高亮显示特定时间点
- 💡 降雨建议信息展示
- 🎨 响应式设计，支持自定义尺寸
- ✨ 平滑动画效果

## 类型定义

```typescript
type TData = {
  location?: string; // 地点名称
  date?: string; // 日期信息
  percent?: number; // 降雨概率百分比 (0-100)
  condition?: string; // 天气状况描述
  chartData?: {
    x?: string[]; // 时间轴数据 (格式: "HH:mm")
    y?: number[]; // 降雨概率数据 (0-100)
    highlight?: string[]; // 需要高亮的时间点 (格式: "HH:mm")
  };
  suggestion?: {
    title?: string; // 建议标题
    description?: string; // 建议描述
  };
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number; // 组件宽度
    height?: string | number; // 组件高度
  };
}
```

## 使用示例

```tsx
import WeatherDailyRain from './WeatherDailyRain';

const weatherData = {
  location: '北京',
  date: '今天',
  percent: 75,
  condition: '中雨',
  chartData: {
    x: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    y: [20, 45, 75, 85, 60, 30],
    highlight: ['12:00', '15:00'],
  },
  suggestion: {
    title: '出行建议',
    description: '今日降雨概率较高，建议携带雨具出行，避免在下午时段外出。',
  },
};

<WeatherDailyRain data={weatherData} opts={{ width: 360, height: 400 }} />;
```

## Mock Data

```json
{
  "location": "上海",
  "date": "2024年3月15日",
  "percent": 65,
  "condition": "小到中雨",
  "chartData": {
    "x": ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    "y": [15, 25, 40, 55, 75, 85, 70, 45],
    "highlight": ["12:00", "15:00", "18:00"]
  },
  "suggestion": {
    "title": "温馨提示",
    "description": "午后降雨概率达到峰值，建议提前做好防雨准备。傍晚时分雨势可能减弱，适合短途出行。"
  }
}
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "WeatherDailyRain Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "title": "WeatherDailyRain Data Schema",
      "properties": {
        "location": {
          "type": "string",
          "description": "地点名称",
          "examples": ["北京", "上海", "广州"]
        },
        "date": {
          "type": "string",
          "description": "日期信息",
          "examples": ["今天", "明天", "2024年3月15日"]
        },
        "percent": {
          "type": "number",
          "description": "降雨概率百分比",
          "minimum": 0,
          "maximum": 100,
          "examples": [25, 50, 75]
        },
        "condition": {
          "type": "string",
          "description": "天气状况描述",
          "examples": ["晴", "多云", "小雨", "中雨", "大雨"]
        },
        "chartData": {
          "type": "object",
          "description": "图表数据",
          "properties": {
            "x": {
              "type": "array",
              "description": "时间轴数据，格式为 HH:mm",
              "items": {
                "type": "string",
                "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              },
              "examples": [["06:00", "12:00", "18:00"]]
            },
            "y": {
              "type": "array",
              "description": "降雨概率数据，范围 0-100",
              "items": {
                "type": "number",
                "minimum": 0,
                "maximum": 100
              },
              "examples": [[20, 60, 40]]
            },
            "highlight": {
              "type": "array",
              "description": "需要高亮显示的时间点",
              "items": {
                "type": "string",
                "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              },
              "examples": [["12:00", "15:00"]]
            }
          },
          "additionalProperties": false
        },
        "suggestion": {
          "type": "object",
          "description": "建议信息",
          "properties": {
            "title": {
              "type": "string",
              "description": "建议标题",
              "examples": ["出行建议", "温馨提示"]
            },
            "description": {
              "type": "string",
              "description": "建议描述内容",
              "examples": ["今日降雨概率较高，建议携带雨具"]
            }
          },
          "additionalProperties": false
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

## 设计规范

### 视觉层次

- **主要信息**：降雨概率百分比使用大号字体突出显示
- **次要信息**：地点、日期、天气状况使用中等字体
- **辅助信息**：图表坐标轴、建议文本使用小号字体

### 颜色使用

- **主色调**：使用主题的天气容器背景色
- **强调色**：高亮时间点使用标题文本色
- **图表色彩**：降雨图表使用专用的雨水主题色

### 交互反馈

- **图表交互**：支持 tooltip 显示详细数值
- **动画效果**：使用淡入滑动动画增强用户体验

## 注意事项

1. **数据验证**：组件内部会对所有数据进行安全检查，避免渲染错误
2. **图表依赖**：需要确保 ECharts 相关依赖已正确安装和配置
3. **响应式适配**：图表宽度会根据容器宽度自动调整，最小宽度为 280px
4. **时间格式**：时间数据必须使用 "HH:mm" 格式，如 "09:00"、"15:30"
5. **数据一致性**：chartData 中的 x 和 y 数组长度应该保持一致
6. **高亮逻辑**：highlight 时间点会自动匹配到最近的 x 轴时间点进行高亮显示

## 依赖组件

- `CardContainer`：外层容器组件
- `IconFont`：图标组件
- `AnimationFadeSlide`：动画组件
- `SvgChart`：ECharts SVG 图表组件
