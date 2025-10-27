# WeatherDailyFallback 组件说明文档

## 组件概述

WeatherDailyFallback 是一个天气预报卡片组件，用于展示当前天气信息、小时预报和穿衣建议。组件具有毛玻璃背景效果，支持自定义背景图片。

## 功能特性

- 显示当前位置和温度范围
- 展示当前温度（大字体显示）
- 小时预报列表（最多5个时段）
- 穿衣建议提示
- 支持自定义背景图片
- 响应式布局设计

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}
```

## 数据类型定义

```typescript
type THourlyForecast = {
  time?: string; // 时间显示（如："现在"、"1点"）
  temp?: number; // 温度值
  weatherIcon?: string; // 天气图标名称（IconFont图标）
  condition?: string; // 天气状况描述
};

type TData = {
  image?: string; // 背景图片URL
  location?: string; // 位置名称
  temp?: number; // 温度值
  tempRange?: string; // 温度范围描述
  weatherIcon?: string; // 主要天气图标
  list?: THourlyForecast[]; // 小时预报列表
  suggestion?: {
    title?: string; // 建议标题
    description?: string; // 建议内容
  };
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
        "image": {
          "type": "string",
          "description": "背景图片URL",
          "format": "uri"
        },
        "location": {
          "type": "string",
          "description": "位置名称",
          "maxLength": 20
        },
        "temp": {
          "type": "number",
          "description": "温度值",
          "minimum": -50,
          "maximum": 60
        },
        "tempRange": {
          "type": "string",
          "description": "温度范围描述",
          "maxLength": 50
        },
        "weatherIcon": {
          "type": "string",
          "description": "主要天气图标名称"
        },
        "list": {
          "type": "array",
          "description": "小时预报列表",
          "maxItems": 5,
          "items": {
            "type": "object",
            "properties": {
              "time": {
                "type": "string",
                "description": "时间显示",
                "maxLength": 10
              },
              "temp": {
                "type": "number",
                "description": "温度值",
                "minimum": -50,
                "maximum": 60
              },
              "weatherIcon": {
                "type": "string",
                "description": "天气图标名称"
              },
              "condition": {
                "type": "string",
                "description": "天气状况描述",
                "maxLength": 20
              }
            }
          }
        },
        "suggestion": {
          "type": "object",
          "description": "穿衣建议",
          "properties": {
            "title": {
              "type": "string",
              "description": "建议标题",
              "maxLength": 20
            },
            "description": {
              "type": "string",
              "description": "建议内容",
              "maxLength": 200
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

## Mock Data

```javascript
// 基础示例数据
const mockData = {
  image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/weather/weather.jpg',
  location: '北京市',
  temp: 18,
  tempRange: '最高 24° 最低 16°',
  list: [
    {
      time: '现在',
      temp: 18,
      weatherIcon: 'weatherCloudy',
      condition: '多云',
    },
    {
      time: '1点',
      temp: 17,
      weatherIcon: 'weatherCloudy',
      condition: '多云',
    },
    {
      time: '2点',
      temp: 17,
      weatherIcon: 'weatherRain',
      condition: '小雨',
    },
    {
      time: '3点',
      temp: 16,
      weatherIcon: 'weatherCloudy',
      condition: '多云',
    },
    {
      time: '4点',
      temp: 16,
      weatherIcon: 'weatherThunder',
      condition: '雷雨',
    },
  ],
  suggestion: {
    title: '穿衣suggestion:',
    description: '避免穿着紧身衣物：紧身衣物可能会影响血液循环，使身体感到更加闷热。',
  },
};

// 最小数据示例
const minimalData = {
  location: '上海市',
  temp: 22,
};

// 完整数据示例
const fullData = {
  image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/weather/weather.jpg',
  location: '深圳市',
  temp: 28,
  tempRange: '最高 32° 最低 25°',
  list: [
    {
      time: '现在',
      temp: 28,
      weatherIcon: 'weatherSunny',
      condition: '晴朗',
    },
    {
      time: '14点',
      temp: 30,
      weatherIcon: 'weatherSunny',
      condition: '晴朗',
    },
    {
      time: '15点',
      temp: 32,
      weatherIcon: 'weatherCloudy',
      condition: '多云',
    },
    {
      time: '16点',
      temp: 31,
      weatherIcon: 'weatherRain',
      condition: '阵雨',
    },
    {
      time: '17点',
      temp: 29,
      weatherIcon: 'weatherCloudy',
      condition: '多云',
    },
  ],
  suggestion: {
    title: '防晒提醒:',
    description: '紫外线较强，外出时请做好防晒措施，建议穿着轻薄透气的衣物。',
  },
};
```

## 使用示例

```tsx
import WeatherDailyFallback from './WeatherDailyFallback';

// 基础使用
<WeatherDailyFallback
  data={mockData}
  opts={{ width: 360, height: 376 }}
/>

// 自定义尺寸
<WeatherDailyFallback
  data={mockData}
  opts={{ width: 400, height: 400 }}
/>

// 响应式宽度
<WeatherDailyFallback
  data={mockData}
  opts={{ width: '100%', maxHeight: 376 }}
/>
```

## 设计规范

- **容器背景**: 使用 `containerPrimaryWeather` token，具有毛玻璃效果
- **文字颜色**: 主标题使用 `textTitle`，次要文字使用 `textSecondary`
- **字体样式**: 当前温度使用 `cnDisplayLStrong`，标题使用 `cnHeadlineXsStrong`
- **间距**: 遵循系统间距 token (`spaceElementsXs`, `spaceElementsM` 等)
- **图标尺寸**: 位置图标使用 `sizeIconXs`，天气图标使用 `sizeIconXl`

## 注意事项

1. 所有数据字段都是可选的，组件会自动处理空数据情况
2. 小时预报列表建议不超过5个项目，以保证良好的显示效果
3. 背景图片会自动填充整个容器，建议使用高质量图片
4. 天气图标使用 IconFont 组件，需要确保图标名称正确
5. 组件支持响应式布局，可以使用百分比宽度
