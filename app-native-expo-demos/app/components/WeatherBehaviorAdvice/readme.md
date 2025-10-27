# WeatherBehaviorAdvice 组件说明文档

## 组件概述

`WeatherBehaviorAdvice` 是一个天气行为建议组件，用于展示基于天气条件的行为建议和相关原因说明。组件支持响应式布局，会根据容器宽度自动调整内容的列数显示。

## 功能特性

- **响应式布局**：根据容器宽度自动调整为1-4列显示
- **天气信息展示**：支持位置、标题和天气图标显示
- **建议内容**：展示天气建议的标题和描述
- **原因列表**：网格化展示多个原因项，每项包含图标、标题和描述
- **主题适配**：完全基于Design Token系统

## 布局规则

| 容器宽度  | 列数 | 适用场景        |
| --------- | ---- | --------------- |
| ≤300px    | 1列  | 手机竖屏        |
| 301-480px | 2列  | 手机横屏/小平板 |
| 481-720px | 3列  | 平板竖屏        |
| >720px    | 4列  | 平板横屏/桌面   |

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
          "description": "位置信息"
        },
        "title": {
          "type": "string",
          "description": "主标题"
        },
        "weatherIcon": {
          "type": "string",
          "description": "天气图标名称"
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
          }
        },
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "icon": {
                "type": "string",
                "description": "图标名称"
              },
              "title": {
                "type": "string",
                "description": "项目标题"
              },
              "description": {
                "type": "string",
                "description": "项目描述"
              }
            }
          },
          "description": "原因项目列表"
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

```json
{
  "data": {
    "location": "北京",
    "title": "今日天气",
    "weatherIcon": "systemSunFill",
    "suggestion": {
      "title": "适合户外运动",
      "description": "今天天气晴朗，温度适宜，是进行户外活动的好时机"
    },
    "items": [
      {
        "icon": "systemThermometerFill",
        "title": "温度适宜",
        "description": "22°C，体感舒适"
      },
      {
        "icon": "systemWindFill",
        "title": "微风轻拂",
        "description": "3级风，空气流通好"
      },
      {
        "icon": "systemSunFill",
        "title": "阳光充足",
        "description": "晴天，紫外线适中"
      },
      {
        "icon": "systemDropFill",
        "title": "湿度合适",
        "description": "60%湿度，不干燥"
      }
    ]
  },
  "opts": {
    "width": 360,
    "height": "auto"
  }
}
```

### 雨天建议示例

```json
{
  "data": {
    "location": "上海",
    "title": "雨天出行",
    "weatherIcon": "systemCloudRainFill",
    "suggestion": {
      "title": "建议室内活动",
      "description": "今天有中雨，路面湿滑，建议减少外出或选择室内活动"
    },
    "items": [
      {
        "icon": "systemUmbrellaFill",
        "title": "携带雨具",
        "description": "出门记得带伞"
      },
      {
        "icon": "systemCarFill",
        "title": "注意交通",
        "description": "路面湿滑，小心驾驶"
      },
      {
        "icon": "systemHomeFill",
        "title": "室内运动",
        "description": "可选择瑜伽、健身等"
      }
    ]
  },
  "opts": {
    "width": "100%"
  }
}
```

### 极端天气示例

```json
{
  "data": {
    "location": "哈尔滨",
    "title": "寒潮预警",
    "weatherIcon": "systemSnowFill",
    "suggestion": {
      "title": "注意保暖防寒",
      "description": "气温骤降至-15°C，外出需做好充分的保暖措施"
    },
    "items": [
      {
        "icon": "systemThermometerFill",
        "title": "极低温度",
        "description": "-15°C，体感寒冷"
      },
      {
        "icon": "systemWindFill",
        "title": "强风降温",
        "description": "6级大风，风寒效应明显"
      },
      {
        "icon": "systemSnowFill",
        "title": "降雪天气",
        "description": "中到大雪，能见度低"
      },
      {
        "icon": "systemWarningFill",
        "title": "路面结冰",
        "description": "道路湿滑，出行需谨慎"
      },
      {
        "icon": "systemClothingFill",
        "title": "增加衣物",
        "description": "穿戴厚重保暖衣物"
      },
      {
        "icon": "systemTimeFill",
        "title": "减少外出",
        "description": "非必要不外出"
      }
    ]
  },
  "opts": {
    "width": 480
  }
}
```

### 最小化示例

```json
{
  "data": {
    "title": "天气提醒",
    "suggestion": {
      "title": "天气不错"
    }
  },
  "opts": {
    "width": 300
  }
}
```

## 使用示例

```tsx
import WeatherBehaviorAdvice from './WeatherBehaviorAdvice';

// 基础使用
<WeatherBehaviorAdvice
  data={mockData.data}
  opts={mockData.opts}
/>

// 响应式宽度
<WeatherBehaviorAdvice
  data={data}
  opts={{ width: '100%' }}
/>

// 固定尺寸
<WeatherBehaviorAdvice
  data={data}
  opts={{ width: 360, height: 400 }}
/>
```

## 设计要点

1. **内容优先级**：位置 > 标题 > 天气图标 > 建议 > 原因列表
2. **响应式设计**：自动根据容器宽度调整列数
3. **内容安全**：所有字段都支持可选，组件会优雅处理缺失数据
4. **视觉层次**：使用不同的字体大小和颜色建立信息层次
5. **交互友好**：文本支持多行显示和省略号处理

## 注意事项

- 所有数据字段都是可选的，组件会根据实际数据动态显示内容
- 图标名称需要符合IconFont组件的规范
- 建议items数组长度控制在2-8个之间以获得最佳显示效果
- 组件会自动处理空数据和边界情况
