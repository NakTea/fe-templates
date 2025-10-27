# WeatherDailyWind 组件说明文档

## 组件概述

WeatherDailyWind 是一个天气风力详情卡片组件，展示风向、风速、空气质量等信息，并通过可视化的风力罗盘显示风向和风级。组件支持响应式布局，在小屏幕下会隐藏左侧数据区域。

## 功能特性

- 🌪️ **风力罗盘可视化**：使用 ECharts 绘制风力罗盘，直观显示风向
- 📊 **多维度数据展示**：支持风向、风速、空气质量等多项数据
- 📱 **响应式布局**：根据容器宽度自动调整布局
- 🎨 **主题适配**：完全适配设计系统主题
- 💡 **智能建议**：支持穿衣建议等生活提示

## Props 接口

### IProps

| 属性 | 类型   | 必填 | 默认值 | 说明         |
| ---- | ------ | ---- | ------ | ------------ |
| data | TData  | 否   | -      | 天气数据对象 |
| opts | object | 否   | -      | 组件配置选项 |

### TData 数据结构

| 属性       | 类型           | 必填 | 说明         |
| ---------- | -------------- | ---- | ------------ |
| location   | string         | 否   | 地理位置     |
| date       | string         | 否   | 日期描述     |
| details    | DetailItem[]   | 否   | 详细数据列表 |
| wind       | WindInfo       | 否   | 风力信息     |
| suggestion | SuggestionInfo | 否   | 建议信息     |

### DetailItem 结构

| 属性  | 类型   | 必填 | 说明     |
| ----- | ------ | ---- | -------- |
| label | string | 否   | 数据标签 |
| value | string | 否   | 数据值   |

### WindInfo 结构

| 属性      | 类型   | 必填 | 说明                                           |
| --------- | ------ | ---- | ---------------------------------------------- |
| direction | string | 否   | 风向（北、东北、东、东南、南、西南、西、西北） |
| level     | number | 否   | 风级                                           |
| unit      | string | 否   | 风级单位                                       |

### SuggestionInfo 结构

| 属性        | 类型   | 必填 | 说明     |
| ----------- | ------ | ---- | -------- |
| title       | string | 否   | 建议标题 |
| description | string | 否   | 建议描述 |

### opts 配置选项

| 属性   | 类型             | 必填 | 默认值 | 说明     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | -      | 组件宽度 |
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
          "description": "地理位置"
        },
        "date": {
          "type": "string",
          "description": "日期描述"
        },
        "details": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "label": {
                "type": "string",
                "description": "数据标签"
              },
              "value": {
                "type": "string",
                "description": "数据值"
              }
            }
          },
          "description": "详细数据列表"
        },
        "wind": {
          "type": "object",
          "properties": {
            "direction": {
              "type": "string",
              "enum": ["北", "东北", "东", "东南", "南", "西南", "西", "西北"],
              "description": "风向"
            },
            "level": {
              "type": "number",
              "minimum": 0,
              "maximum": 17,
              "description": "风级"
            },
            "unit": {
              "type": "string",
              "description": "风级单位"
            }
          },
          "description": "风力信息"
        },
        "suggestion": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "建议标题"
            },
            "description": {
              "type": "string",
              "description": "建议描述"
            }
          },
          "description": "建议信息"
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

### 基础示例

```javascript
const basicMockData = {
  data: {
    location: '上海',
    date: '明天',
    details: [
      { label: '风向', value: '西北' },
      { label: '风速', value: '8.8m/s' },
      { label: '空气质量', value: '优' },
    ],
    wind: {
      direction: '西北',
      level: 5,
      unit: '级',
    },
    suggestion: {
      title: '穿衣建议',
      description: '今日风力较大，天气较冷，建议穿着夹克、毛衣、长裤等保暖衣物，并佩戴围巾，注意防风。',
    },
  },
  opts: {
    width: 360,
    height: 400,
  },
};
```

### 完整示例

```javascript
const fullMockData = {
  data: {
    location: '北京',
    date: '今天',
    details: [
      { label: '风向', value: '东北' },
      { label: '风速', value: '12.5m/s' },
      { label: '空气质量', value: '良' },
      { label: '湿度', value: '65%' },
      { label: '气压', value: '1013hPa' },
    ],
    wind: {
      direction: '东北',
      level: 7,
      unit: '级',
    },
    suggestion: {
      title: '出行建议',
      description: '今日风力强劲，建议减少户外活动，如需外出请注意防风保暖，避免在高楼、广告牌等附近停留。',
    },
  },
  opts: {
    width: 400,
    height: 450,
  },
};
```

### 最小化示例

```javascript
const minimalMockData = {
  data: {
    wind: {
      direction: '南',
      level: 3,
      unit: '级',
    },
  },
};
```

### 多种风向示例

```javascript
const windDirectionExamples = [
  {
    data: {
      location: '广州',
      wind: { direction: '北', level: 2, unit: '级' },
    },
  },
  {
    data: {
      location: '深圳',
      wind: { direction: '东南', level: 4, unit: '级' },
    },
  },
  {
    data: {
      location: '杭州',
      wind: { direction: '西南', level: 6, unit: '级' },
    },
  },
];
```

## 使用示例

### 基础用法

```tsx
import WeatherDailyWind from './WeatherDailyWind';

const App = () => {
  return (
    <WeatherDailyWind
      data={{
        location: '上海',
        date: '明天',
        details: [
          { label: '风向', value: '西北' },
          { label: '风速', value: '8.8m/s' },
          { label: '空气质量', value: '优' },
        ],
        wind: {
          direction: '西北',
          level: 5,
          unit: '级',
        },
      }}
      opts={{ width: 360 }}
    />
  );
};
```

### 响应式用法

```tsx
const ResponsiveWeather = () => {
  return (
    <WeatherDailyWind
      data={weatherData}
      opts={{
        width: '100%', // 自适应宽度
        height: 400,
      }}
    />
  );
};
```

## 注意事项

1. **风向支持**：目前支持八个主要风向，其他风向会默认显示为北风
2. **响应式行为**：当容器宽度小于 360px 时，左侧数据区域会自动隐藏
3. **图标依赖**：需要确保 `chartWindIndicator` 和 `systemLocalFill` 图标可用
4. **ECharts 依赖**：需要正确安装和配置 `@wuba/react-native-echarts`

## 设计规范

- 遵循设计系统的颜色、字体、间距规范
- 使用天气类 AI 卡片背景色
- 支持主题切换和深色模式
- 保持与其他天气组件的视觉一致性
