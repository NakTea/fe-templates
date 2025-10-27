# WeatherDailyInfo 天气信息组件

## 组件概述

WeatherDailyInfo 是一个用于展示天气信息的卡片组件，支持显示地理位置、当前温度、温度范围、天气图标以及详细的天气指标信息。组件采用背景图片叠加的设计风格，提供良好的视觉体验。

## 功能特性

- 🌍 地理位置和标题显示
- 🌡️ 当前温度和温度范围展示
- ☀️ 天气状态图标
- 📊 详细天气指标网格布局
- 🖼️ 背景图片支持
- 🎨 主题色彩适配
- 📱 响应式布局

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "WeatherDailyInfo Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "image": {
          "type": "string",
          "description": "背景图片URL",
          "format": "uri"
        },
        "location": {
          "type": "string",
          "description": "地理位置名称",
          "maxLength": 50
        },
        "title": {
          "type": "string",
          "description": "标题信息",
          "maxLength": 50
        },
        "temp": {
          "type": "number",
          "description": "温度值",
          "minimum": -50,
          "maximum": 60
        },
        "tempRange": {
          "type": "string",
          "description": "温度范围",
          "pattern": "^-?\\d+°?[CF]?\\s*[-~]\\s*-?\\d+°?[CF]?$"
        },
        "condition": {
          "type": "string",
          "description": "天气状况描述",
          "maxLength": 20
        },
        "weatherIcon": {
          "type": "string",
          "description": "天气图标名称"
        },
        "list": {
          "type": "array",
          "description": "天气详细信息列表",
          "maxItems": 6,
          "items": {
            "type": "object",
            "properties": {
              "icon": {
                "type": "string",
                "description": "详情图标名称"
              },
              "label": {
                "type": "string",
                "description": "指标标签",
                "maxLength": 20
              },
              "value": {
                "type": "string",
                "description": "指标数值",
                "maxLength": 30
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
type TWeatherDetail = {
  icon?: string; // 图标名称
  label?: string; // 指标标签
  value?: string; // 指标数值
};

type TData = {
  image?: string; // 背景图片URL
  location?: string; // 地理位置
  title?: string; // 标题
  temp?: number; // 温度值
  tempRange?: string; // 温度范围
  condition?: string; // 天气状况描述
  weatherIcon?: string; // 天气图标
  list?: TWeatherDetail[]; // 详细信息列表
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
    "image": "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_360,h_376",
    "location": "北京",
    "title": "今日天气",
    "temp": 23,
    "tempRange": "28°C ~ 18°C",
    "condition": "晴转多云",
    "weatherIcon": "systemSunFill",
    "list": [
      {
        "icon": "systemWindFill",
        "label": "风速",
        "value": "12 km/h"
      },
      {
        "icon": "systemDropFill",
        "label": "湿度",
        "value": "65%"
      },
      {
        "icon": "systemEyeFill",
        "label": "能见度",
        "value": "10 km"
      },
      {
        "icon": "systemBarometerFill",
        "label": "气压",
        "value": "1013 hPa"
      }
    ]
  },
  "opts": {
    "width": 360,
    "maxHeight": 376
  }
}
```

### 完整示例

```json
{
  "data": {
    "image": "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_360,h_376",
    "location": "上海",
    "title": "浦东新区",
    "temp": 26,
    "tempRange": "30°C ~ 22°C",
    "condition": "晴",
    "weatherIcon": "systemCloudFill",
    "list": [
      {
        "icon": "systemWindFill",
        "label": "风速",
        "value": "8 km/h"
      },
      {
        "icon": "systemDropFill",
        "label": "湿度",
        "value": "78%"
      },
      {
        "icon": "systemEyeFill",
        "label": "能见度",
        "value": "8 km"
      },
      {
        "icon": "systemBarometerFill",
        "label": "气压",
        "value": "1008 hPa"
      },
      {
        "icon": "systemUvFill",
        "label": "紫外线",
        "value": "中等"
      },
      {
        "icon": "systemThermometerFill",
        "label": "体感温度",
        "value": "28°C"
      }
    ]
  },
  "opts": {
    "width": 360,
    "maxHeight": 420
  }
}
```

### 最小化示例

```json
{
  "data": {
    "location": "深圳",
    "temp": 29,
    "weatherIcon": "systemSunFill"
  },
  "opts": {
    "width": 300,
    "maxHeight": 200
  }
}
```

### 雨天示例

```json
{
  "data": {
    "image": "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_360,h_376",
    "location": "广州",
    "title": "天河区",
    "temp": 21,
    "tempRange": "24°C ~ 19°C",
    "condition": "多云",
    "weatherIcon": "systemRainFill",
    "list": [
      {
        "icon": "systemRainFill",
        "label": "降雨量",
        "value": "15 mm"
      },
      {
        "icon": "systemWindFill",
        "label": "风速",
        "value": "15 km/h"
      },
      {
        "icon": "systemDropFill",
        "label": "湿度",
        "value": "85%"
      },
      {
        "icon": "systemBarometerFill",
        "label": "气压",
        "value": "995 hPa"
      }
    ]
  }
}
```

## 使用示例

```tsx
import WeatherDailyInfo from './WeatherDailyInfo';

// 基础使用
<WeatherDailyInfo
  data={{
    location: "北京",
    temp: 23,
    tempRange: "28°C ~ 18°C",
    condition: "多云",
    weatherIcon: "systemSunFill",
    list: [
      { icon: "systemWindFill", label: "风速", value: "12 km/h" },
      { icon: "systemDropFill", label: "湿度", value: "65%" }
    ]
  }}
/>

// 自定义尺寸
<WeatherDailyInfo
  data={weatherData}
  opts={{ width: 320, height: 400 }}
/>
```

## 设计规范

### 布局结构

- 背景图片作为底层装饰
- 内容分为三个主要区域：标题、温度概览、详细信息网格
- 详细信息采用2列网格布局，自适应换行

### 视觉层次

- 当前温度使用最大字号突出显示
- 地理位置和标题使用中等字号
- 详细信息使用较小字号，保持信息层次清晰

### 交互反馈

- 组件为展示型组件，无交互行为
- 支持响应式布局适配不同屏幕尺寸

### 无障碍访问

- 所有文本内容支持屏幕阅读器
- 图标配合文字标签提供语义信息
