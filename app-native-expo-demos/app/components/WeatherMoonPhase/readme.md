# WeatherMoonPhase 组件说明文档

## 组件概述

WeatherMoonPhase 是一个用于展示月相信息的天气组件，包含位置信息、月相详细数据、月相图片和观赏建议等内容。组件支持响应式布局，在小屏幕设备上会自动隐藏月相图片。

## 功能特性

- 📍 位置和日期信息展示
- 🌙 月相详细数据列表（月出、月落、下次满月等）
- 🖼️ 月相图片展示（响应式隐藏）
- 💡 观赏建议信息
- 📱 响应式布局适配
- 🎨 完全基于 Design Token 的主题样式

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "WeatherMoonPhase Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string",
          "description": "位置信息",
          "example": "东京"
        },
        "date": {
          "type": "string",
          "description": "日期信息",
          "example": "明天"
        },
        "details": {
          "type": "array",
          "description": "月相详细数据列表",
          "items": {
            "type": "object",
            "properties": {
              "label": {
                "type": "string",
                "description": "数据标签",
                "example": "月出"
              },
              "value": {
                "type": "string",
                "description": "数据值",
                "example": "16:47"
              },
              "active": {
                "type": "boolean",
                "description": "是否为活跃状态（高亮显示）",
                "default": false
              }
            }
          }
        },
        "image": {
          "type": "string",
          "format": "uri",
          "description": "月相图片URL",
          "example": "https://example.com/moon.png"
        },
        "suggestion": {
          "type": "object",
          "description": "观赏建议信息",
          "properties": {
            "title": {
              "type": "string",
              "description": "建议标题",
              "example": "观赏建议:"
            },
            "description": {
              "type": "string",
              "description": "建议内容",
              "example": "月出时是观赏和拍摄月亮最佳时机，尤其是天气晴朗的夜晚。"
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

### 完整数据示例

```json
{
  "data": {
    "location": "东京",
    "date": "明天",
    "details": [
      {
        "label": "月出",
        "value": "16:47",
        "active": true
      },
      {
        "label": "月落",
        "value": "01:09",
        "active": false
      },
      {
        "label": "下次满月",
        "value": "4天",
        "active": false
      }
    ],
    "image": "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/weather/moon.png",
    "suggestion": {
      "title": "观赏建议:",
      "description": "月出时是观赏和拍摄月亮最佳时机，尤其是天气晴朗的夜晚。"
    }
  },
  "opts": {
    "width": 360,
    "height": "auto"
  }
}
```

### 最小数据示例

```json
{
  "data": {
    "location": "北京",
    "details": [
      {
        "label": "月出",
        "value": "18:30",
        "active": true
      }
    ]
  }
}
```

### 多种场景示例

#### 1. 完整月相信息

```json
{
  "data": {
    "location": "上海",
    "date": "今晚",
    "details": [
      {
        "label": "月出",
        "value": "19:23",
        "active": true
      },
      {
        "label": "月落",
        "value": "06:15",
        "active": false
      },
      {
        "label": "月相",
        "value": "满月",
        "active": false
      },
      {
        "label": "下次新月",
        "value": "15天",
        "active": false
      }
    ],
    "image": "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_300,h_300",
    "suggestion": {
      "title": "最佳观赏时间:",
      "description": "今晚月亮将在19:23升起，是观赏满月的绝佳时机。建议选择视野开阔的地点进行观测。"
    }
  },
  "opts": {
    "width": 400
  }
}
```

#### 2. 简化版本（无图片）

```json
{
  "data": {
    "location": "广州",
    "details": [
      {
        "label": "月出",
        "value": "20:45",
        "active": true
      },
      {
        "label": "月落",
        "value": "07:30",
        "active": false
      }
    ],
    "suggestion": {
      "title": "观测提醒:",
      "description": "今晚云量较多，建议关注天气变化。"
    }
  },
  "opts": {
    "width": 320
  }
}
```

#### 3. 仅位置和时间

```json
{
  "data": {
    "location": "深圳",
    "date": "明日凌晨",
    "details": [
      {
        "label": "月落",
        "value": "05:42",
        "active": true
      }
    ]
  }
}
```

## 使用示例

```tsx
import WeatherMoonPhase from './WeatherMoonPhase';

// 基础使用
<WeatherMoonPhase
  data={{
    location: "东京",
    date: "明天",
    details: [
      { label: "月出", value: "16:47", active: true },
      { label: "月落", value: "01:09", active: false },
      { label: "下次满月", value: "4天", active: false }
    ],
    image: "https://example.com/moon.png",
    suggestion: {
      title: "观赏建议:",
      description: "月出时是观赏和拍摄月亮最佳时机。"
    }
  }}
  opts={{ width: 360 }}
/>

// 响应式使用
<WeatherMoonPhase
  data={moonPhaseData}
  opts={{ width: "100%", height: "auto" }}
/>
```

## 响应式特性

- **容器宽度 > 360px**: 显示月相图片
- **容器宽度 ≤ 360px**: 隐藏月相图片，优化小屏幕显示

## 样式定制

组件完全基于 Design Token 系统，支持以下主题定制：

- `containerPrimaryWeather`: 容器背景色
- `textTitle`: 标题文字颜色
- `textSecondary`: 次要文字颜色
- `dividerDefault`: 分割线颜色
- `iconPrimary`: 图标颜色
- `spaceElementsM/Xs`: 间距控制

## 注意事项

1. 所有数据字段都是可选的，组件会自动处理空数据情况
2. `active` 属性用于高亮显示重要的月相数据
3. 图片在小屏幕设备上会自动隐藏以优化布局
4. 建议使用合适尺寸的月相图片（推荐 150x150px）
