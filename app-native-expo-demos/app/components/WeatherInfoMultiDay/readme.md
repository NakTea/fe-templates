# WeatherInfoMultiDay 组件文档

## 组件描述

WeatherInfoMultiDay 是一个多日天气预报组件，展示当前温度、多日天气预报列表以及相关建议信息。组件采用卡片式设计，支持温度条可视化展示。

## 功能特性

- 显示当前位置和温度
- 多日天气预报列表展示
- 温度范围可视化条形图
- 天气建议信息展示
- 响应式布局设计

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
        "temp": {
          "type": "number",
          "description": "温度值（摄氏度）"
        },
        "title": {
          "type": "string",
          "description": "预报标题描述"
        },
        "list": {
          "type": "array",
          "description": "多日天气预报列表",
          "items": {
            "type": "object",
            "properties": {
              "day": {
                "type": "string",
                "description": "日期描述（如：明天、周五）"
              },
              "weatherIcon": {
                "type": "string",
                "description": "天气图标名称"
              },
              "minTemp": {
                "type": "number",
                "description": "最低温度（摄氏度）"
              },
              "maxTemp": {
                "type": "number",
                "description": "最高温度（摄氏度）"
              }
            }
          }
        },
        "suggestion": {
          "type": "object",
          "description": "天气建议信息",
          "properties": {
            "title": {
              "type": "string",
              "description": "建议标题"
            },
            "description": {
              "type": "string",
              "description": "建议详细描述"
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

```json
{
  "data": {
    "location": "东京",
    "temp": 10,
    "title": "未来三天·最低温度",
    "list": [
      {
        "day": "明天",
        "weatherIcon": "weatherRain",
        "minTemp": 12,
        "maxTemp": 18
      },
      {
        "day": "周五",
        "weatherIcon": "weatherThunder",
        "minTemp": 10,
        "maxTemp": 20
      },
      {
        "day": "周六",
        "weatherIcon": "weatherCloudy",
        "minTemp": 14,
        "maxTemp": 22
      }
    ],
    "suggestion": {
      "title": "穿衣建议",
      "description": "周五将迎来近期最低温，体感稍凉，请注意保暖。"
    }
  },
  "opts": {
    "width": 440,
    "maxHeight": 445
  }
}
```

## 使用示例

```tsx
import WeatherInfoMultiDay from './WeatherInfoMultiDay';

const App = () => {
  const weatherData = {
    location: '北京',
    temp: 15,
    title: '未来三天·温度趋势',
    list: [
      {
        day: '今天',
        weatherIcon: 'weatherSunny',
        minTemp: 8,
        maxTemp: 18,
      },
      {
        day: '明天',
        weatherIcon: 'weatherCloudy',
        minTemp: 10,
        maxTemp: 20,
      },
      {
        day: '后天',
        weatherIcon: 'weatherRain',
        minTemp: 12,
        maxTemp: 16,
      },
    ],
    suggestion: {
      title: '出行建议',
      description: '明天天气晴朗，适合户外活动。',
    },
  };

  return <WeatherInfoMultiDay data={weatherData} opts={{ width: 400, height: 500 }} />;
};
```

## 组件特性

### 温度条可视化

- 自动计算全局温度范围
- 动态调整温度条位置和宽度
- 直观展示温度变化趋势

### 天气图标支持

支持的天气图标类型：

- `weatherSunny` - 晴天
- `weatherCloudy` - 多云
- `weatherRain` - 雨天
- `weatherThunder` - 雷雨
- `weatherSnow` - 雪天

### 响应式设计

- 支持自定义宽高
- 自适应内容布局
- 优雅的间距处理

### 主题适配

- 使用 Design Token 系统
- 支持深色/浅色主题
- 一致的视觉风格

## 注意事项

1. **数据安全性**：所有数据字段都是可选的，组件会进行安全的空值检查
2. **温度单位**：温度数据使用摄氏度（°C）
3. **图标依赖**：需要确保 IconFont 组件中包含相应的天气图标
4. **性能优化**：温度条计算会在数据变化时重新计算，建议合理控制数据更新频率
