# WeatherMultiAirQuality 组件文档

## 组件描述

WeatherMultiAirQuality 是一个综合性的空气质量展示组件，包含当前空气质量仪表盘、未来多日预报和健康建议。适用于天气应用中的空气质量监测场景。

## 组件特性

- 🎯 **空气质量仪表盘**：使用 GaugePointer 组件展示当前 AQI 值和等级
- 📅 **多日预报**：显示未来几日的天气图标和空气质量等级
- 💡 **健康建议**：基于当前空气质量提供健康指导
- 🎨 **天气主题**：使用专用的天气卡片背景色
- 📱 **响应式设计**：支持自定义宽高适配不同屏幕

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
          "description": "标题文本，通常为时间范围"
        },
        "active": {
          "type": "string",
          "description": "当前激活状态标识"
        },
        "aqi": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number",
              "minimum": 0,
              "maximum": 500,
              "description": "空气质量指数数值"
            },
            "label": {
              "type": "string",
              "description": "空气质量等级标签，如：优、良、轻度污染等"
            }
          }
        },
        "list": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "description": "日期显示文本，如：今天、周一等"
              },
              "weatherIcon": {
                "type": "string",
                "description": "天气图标名称"
              },
              "label": {
                "type": "string",
                "description": "空气质量等级标签"
              },
              "active": {
                "type": "boolean",
                "description": "是否为当前激活日期"
              }
            }
          },
          "description": "未来几日的空气质量预报列表"
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
              "description": "详细的健康建议内容"
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
type TForecastDay = {
  date?: string;
  weatherIcon?: string;
  label?: string;
  active?: boolean;
};

type TData = {
  location?: string;
  title?: string;
  active?: string;
  aqi?: {
    value?: number;
    label?: string;
  };
  list?: TForecastDay[];
  suggestion?: {
    title?: string;
    description?: string;
  };
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
    "location": "北京",
    "title": "未来五日",
    "aqi": {
      "value": 45,
      "label": "优"
    },
    "list": [
      {
        "date": "今天",
        "weatherIcon": "weatherCloudy",
        "label": "优",
        "active": true
      },
      {
        "date": "周三",
        "weatherIcon": "weatherSunny",
        "label": "优"
      },
      {
        "date": "周四",
        "weatherIcon": "weatherRain",
        "label": "良"
      },
      {
        "date": "周五",
        "weatherIcon": "weatherThunder",
        "label": "良"
      },
      {
        "date": "周六",
        "weatherIcon": "weatherCloudy",
        "label": "轻度"
      }
    ],
    "suggestion": {
      "title": "健康建议",
      "description": "空气质量令人满意，基本无空气污染，各类人群可正常活动。"
    }
  },
  "opts": {
    "width": 360,
    "height": "auto"
  }
}
```

### 污染天气示例

```json
{
  "data": {
    "location": "上海",
    "title": "未来五日",
    "aqi": {
      "value": 156,
      "label": "中度污染"
    },
    "list": [
      {
        "date": "今天",
        "weatherIcon": "weatherHaze",
        "label": "中度",
        "active": true
      },
      {
        "date": "明天",
        "weatherIcon": "weatherHaze",
        "label": "轻度"
      },
      {
        "date": "后天",
        "weatherIcon": "weatherCloudy",
        "label": "良"
      },
      {
        "date": "周四",
        "weatherIcon": "weatherRain",
        "label": "优"
      },
      {
        "date": "周五",
        "weatherIcon": "weatherSunny",
        "label": "优"
      }
    ],
    "suggestion": {
      "title": "健康建议",
      "description": "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。"
    }
  },
  "opts": {
    "width": 400
  }
}
```

### 最小化示例

```json
{
  "data": {
    "location": "深圳",
    "aqi": {
      "value": 28,
      "label": "优"
    }
  },
  "opts": {
    "width": 300
  }
}
```

### 完整功能示例

```json
{
  "data": {
    "location": "广州",
    "title": "未来七日",
    "aqi": {
      "value": 89,
      "label": "良"
    },
    "list": [
      {
        "date": "今天",
        "weatherIcon": "weatherSunny",
        "label": "良",
        "active": true
      },
      {
        "date": "周二",
        "weatherIcon": "weatherCloudy",
        "label": "良"
      },
      {
        "date": "周三",
        "weatherIcon": "weatherRain",
        "label": "优"
      },
      {
        "date": "周四",
        "weatherIcon": "weatherThunder",
        "label": "优"
      },
      {
        "date": "周五",
        "weatherIcon": "weatherSunny",
        "label": "良"
      },
      {
        "date": "周六",
        "weatherIcon": "weatherCloudy",
        "label": "轻度"
      },
      {
        "date": "周日",
        "weatherIcon": "weatherHaze",
        "label": "中度"
      }
    ],
    "suggestion": {
      "title": "出行建议",
      "description": "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响，建议极少数异常敏感人群减少户外活动。"
    }
  },
  "opts": {
    "width": "100%",
    "height": 480
  }
}
```

## 使用示例

```tsx
import WeatherMultiAirQuality from './WeatherMultiAirQuality';

// 基础使用
<WeatherMultiAirQuality
  data={{
    location: "北京",
    title: "未来五日",
    aqi: { value: 45, label: "优" },
    list: [
      { date: "今天", weatherIcon: "weatherSunny", label: "优", active: true },
      { date: "明天", weatherIcon: "weatherCloudy", label: "良" }
    ],
    suggestion: {
      title: "健康建议",
      description: "空气质量良好，适合户外活动。"
    }
  }}
  opts={{ width: 360 }}
/>

// 响应式使用
<WeatherMultiAirQuality
  data={airQualityData}
  opts={{ width: "90%", height: "auto" }}
/>
```

## 注意事项

1. **数据安全**：所有字段都是可选的，组件会自动处理空数据情况
2. **图标支持**：weatherIcon 字段需要使用 IconFont 组件支持的图标名称
3. **AQI 范围**：建议 AQI 值在 0-500 范围内，超出范围可能影响仪表盘显示
4. **列表长度**：预报列表建议 3-7 项，过多可能影响布局美观
5. **主题适配**：组件使用天气专用主题色，确保在深色背景下的可读性

## 依赖组件

- `CardContainer`：卡片容器
- `GaugePointer`：仪表盘指针组件
- `IconFont`：图标组件
- `useFlexUIConfig`：主题配置 Hook
