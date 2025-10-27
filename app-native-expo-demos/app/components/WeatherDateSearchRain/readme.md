# WeatherDateSearchRain 组件说明文档

## 组件概述

`WeatherDateSearchRain` 是一个天气降雨预报卡片组件，用于展示特定地区的假期降雨概览信息。组件包含地理位置、降雨概述、详细天气列表等功能模块。

## 功能特性

- 📍 地理位置显示
- 🌧️ 降雨概述信息
- 📅 多日天气预报列表
- 🎯 重点日期高亮显示
- 📱 响应式布局设计
- 🎨 Design Token 样式规范

## 组件结构

```
WeatherDateSearchRain
├── 地理位置头部 (location + icon)
├── 概览内容 (title + description + weatherIcon)
├── 分割线
└── 天气预报列表 (date + condition + percent + tempRange)
```

## Props 接口定义

### IProps

| 属性 | 类型  | 必填 | 默认值 | 说明         |
| ---- | ----- | ---- | ------ | ------------ |
| data | TData | 否   | -      | 天气数据对象 |
| opts | TOpts | 否   | -      | 组件配置选项 |

### TData

| 属性        | 类型          | 必填 | 说明             |
| ----------- | ------------- | ---- | ---------------- |
| location    | string        | 否   | 地理位置名称     |
| title       | string        | 否   | 主要概述标题     |
| description | string        | 否   | 详细描述信息     |
| weatherIcon | string        | 否   | 概述天气图标名称 |
| list        | TWeatherDay[] | 否   | 天气预报列表     |

### TWeatherDay

| 属性        | 类型    | 必填 | 说明           |
| ----------- | ------- | ---- | -------------- |
| date        | string  | 否   | 日期显示文本   |
| tempRange   | string  | 否   | 温度范围       |
| condition   | string  | 否   | 天气状况       |
| percent     | number  | 否   | 降水概率百分比 |
| weatherIcon | string  | 否   | 天气图标名称   |
| active      | boolean | 否   | 是否为重点日期 |

### TOpts

| 属性   | 类型             | 必填 | 默认值 | 说明     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 440    | 组件宽度 |
| height | string \| number | 否   | -      | 组件高度 |

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
          "description": "地理位置名称"
        },
        "title": {
          "type": "string",
          "description": "主要概述标题"
        },
        "description": {
          "type": "string",
          "description": "详细描述信息"
        },
        "weatherIcon": {
          "type": "string",
          "description": "概述天气图标名称"
        },
        "list": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "description": "日期显示文本"
              },
              "tempRange": {
                "type": "string",
                "description": "温度范围"
              },
              "condition": {
                "type": "string",
                "description": "天气状况"
              },
              "percent": {
                "type": "number",
                "minimum": 0,
                "maximum": 100,
                "description": "降水概率百分比"
              },
              "weatherIcon": {
                "type": "string",
                "description": "天气图标名称"
              },
              "active": {
                "type": "boolean",
                "description": "是否为重点日期"
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

## Mock Data

### 基础示例数据

```typescript
const mockData = {
  location: '东京',
  title: '假期中段可能迎来降雨',
  description: '主要降雨集中在 10 月 3 日至 5 日，请提前规划行程。',
  weatherIcon: 'weatherRain',
  list: [
    {
      date: '10/1 周三',
      tempRange: '25°/20°',
      condition: '多云',
      percent: 10,
      weatherIcon: 'weatherCloudy',
      active: false,
    },
    {
      date: '10/2 周四',
      tempRange: '24°/19°',
      condition: '多云',
      percent: 20,
      weatherIcon: 'weatherCloudy',
      active: false,
    },
    {
      date: '10/3 周五',
      tempRange: '22°/18°',
      condition: '中雨',
      percent: 80,
      weatherIcon: 'weatherRain',
      active: true,
    },
    {
      date: '10/4 周六',
      tempRange: '23°/19°',
      condition: '小雨',
      percent: 60,
      weatherIcon: 'weatherRain',
      active: true,
    },
    {
      date: '10/5 周日',
      tempRange: '24°/20°',
      condition: '阵雨',
      percent: 40,
      weatherIcon: 'weatherRain',
      active: true,
    },
    {
      date: '10/6 周一',
      tempRange: '26°/21°',
      condition: '多云',
      percent: 10,
      weatherIcon: 'weatherCloudy',
      active: false,
    },
  ],
};
```

### 简化示例数据

```typescript
const simpleData = {
  location: '北京',
  title: '未来三天有雨',
  description: '建议携带雨具出行。',
  weatherIcon: 'weatherRain',
  list: [
    {
      date: '今天',
      condition: '小雨',
      percent: 60,
      weatherIcon: 'weatherRain',
      active: true,
    },
    {
      date: '明天',
      condition: '多云',
      percent: 20,
      weatherIcon: 'weatherCloudy',
      active: false,
    },
    {
      date: '后天',
      condition: '晴',
      percent: 5,
      weatherIcon: 'weatherSunny',
      active: false,
    },
  ],
};
```

### 空数据示例

```typescript
const emptyData = {
  location: '上海',
  title: '暂无降雨预报',
  description: '未来一周天气晴好。',
};
```

## 使用示例

### 基础用法

```tsx
import WeatherDateSearchRain from './WeatherDateSearchRain';

const App = () => {
  return <WeatherDateSearchRain data={mockData} opts={{ width: 440 }} />;
};
```

### 自定义尺寸

```tsx
<WeatherDateSearchRain
  data={mockData}
  opts={{
    width: '100%',
    height: 500,
  }}
/>
```

### 响应式使用

```tsx
<WeatherDateSearchRain
  data={mockData}
  opts={{
    width: screenWidth > 600 ? 440 : '90%',
  }}
/>
```

## 设计规范

### 颜色使用

- **主要文本**: `textTitle` - 标题和重要信息
- **次要文本**: `textPrimary` - 常规文本内容
- **辅助文本**: `textSecondary` - 描述性文本
- **信息文本**: `textInfoDefault` - 降雨相关信息
- **背景色**: `containerPrimaryWeather` - 天气卡片背景

### 字体规范

- **标题**: `cnDisplayXxsStrong` - 主要概述标题
- **小标题**: `cnHeadlineXsStrong` - 地理位置
- **正文**: `cnBodyM` - 列表内容和描述

### 间距规范

- **组件间距**: `spaceElementsL` (20px)
- **元素间距**: `spaceElementsS` (12px)
- **小间距**: `spaceElementsXs` (8px)

## 注意事项

1. **数据安全**: 所有数据字段都进行了安全解构，支持空数据渲染
2. **图标使用**: 使用 IconFont 组件，确保图标名称正确
3. **高亮显示**: 通过 `active` 字段控制重点日期的高亮显示
4. **响应式**: 组件支持不同屏幕尺寸的适配
5. **性能优化**: 使用 StyleSheet.create 和合理的组件结构

## 常用图标名称

- `weatherSunny` - 晴天
- `weatherCloudy` - 多云
- `weatherRain` - 雨天
- `weatherSnow` - 雪天
- `weatherThunder` - 雷雨
- `systemLocalFill` - 位置图标
