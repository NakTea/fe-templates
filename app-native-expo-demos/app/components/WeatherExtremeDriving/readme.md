# WeatherExtremeDriving 组件说明文档

## 组件概述

WeatherExtremeDriving 是一个用于显示极端天气驾驶预警信息的 React Native 组件。该组件展示地点、预警类型、天气图标、影响时段以及安全提示信息。

## 功能特性

- 显示地点信息（带定位图标）
- 展示天气预警图标和类型
- 显示影响时段描述
- 提供安全驾驶提示信息
- 支持自定义宽高
- 响应式布局设计

## Props 接口

### IProps

| 属性 | 类型  | 必填 | 默认值 | 说明         |
| ---- | ----- | ---- | ------ | ------------ |
| data | TData | 否   | -      | 预警数据对象 |
| opts | TOpts | 否   | -      | 组件配置选项 |

### TData

| 属性        | 类型   | 必填 | 说明         |
| ----------- | ------ | ---- | ------------ |
| location    | string | 否   | 地点名称     |
| title       | string | 否   | 预警类型标题 |
| weatherIcon | string | 否   | 天气图标名称 |
| description | string | 否   | 影响时段描述 |
| tips        | TTips  | 否   | 提示信息对象 |

### TTips

| 属性    | 类型   | 必填 | 说明                                                  |
| ------- | ------ | ---- | ----------------------------------------------------- |
| type    | string | 是   | 提示类型：'error' \| 'warning' \| 'info' \| 'success' |
| message | string | 是   | 提示消息内容                                          |

### TOpts

| 属性   | 类型             | 必填 | 说明     |
| ------ | ---------------- | ---- | -------- |
| width  | string \| number | 否   | 组件宽度 |
| height | string \| number | 否   | 组件高度 |

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
        "title": {
          "type": "string",
          "description": "预警类型标题"
        },
        "weatherIcon": {
          "type": "string",
          "description": "天气图标名称"
        },
        "description": {
          "type": "string",
          "description": "影响时段描述"
        },
        "tips": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["error", "warning", "info", "success"],
              "description": "提示类型"
            },
            "message": {
              "type": "string",
              "description": "提示消息内容"
            }
          },
          "required": ["type", "message"]
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
    "location": "北京市朝阳区",
    "title": "暴雨预警",
    "weatherIcon": "systemCloudRainFill",
    "description": "预计今日14:00-20:00有强降雨",
    "tips": {
      "type": "warning",
      "message": "请减速慢行，注意路面积水，保持安全车距"
    }
  },
  "opts": {
    "width": 360,
    "maxHeight": 280
  }
}
```

### 雪灾预警示例

```json
{
  "data": {
    "location": "哈尔滨市道里区",
    "title": "暴雪预警",
    "weatherIcon": "systemCloudSnowFill",
    "description": "预计明日06:00-18:00有大到暴雪",
    "tips": {
      "type": "error",
      "message": "路面结冰湿滑，建议安装防滑链，非必要不出行"
    }
  },
  "opts": {
    "width": 320
  }
}
```

### 高温预警示例

```json
{
  "data": {
    "location": "上海市浦东新区",
    "title": "高温预警",
    "weatherIcon": "systemSunFill",
    "description": "今日最高气温将达到39℃",
    "tips": {
      "type": "warning",
      "message": "注意防暑降温，及时补充水分，避免长时间暴晒"
    }
  },
  "opts": {
    "width": "100%",
    "height": 300
  }
}
```

### 大风预警示例

```json
{
  "data": {
    "location": "青岛市市南区",
    "title": "大风预警",
    "weatherIcon": "systemWindFill",
    "description": "今日风力7-8级，阵风9级",
    "tips": {
      "type": "warning",
      "message": "注意横风影响，握紧方向盘，避免在空旷路段高速行驶"
    }
  }
}
```

### 最小数据示例

```json
{
  "data": {
    "title": "天气预警"
  }
}
```

### 完整数据示例

```json
{
  "data": {
    "location": "深圳市南山区",
    "title": "台风预警",
    "weatherIcon": "systemTornadoFill",
    "description": "预计今晚22:00-明日08:00受台风影响",
    "tips": {
      "type": "error",
      "message": "台风天气极其危险，请立即停止驾驶，寻找安全避风场所"
    }
  },
  "opts": {
    "width": 400,
    "maxHeight": 320
  }
}
```

## 使用示例

```tsx
import React from 'react';
import WeatherExtremeDriving from './WeatherExtremeDriving';

const App = () => {
  const weatherData = {
    location: '北京市朝阳区',
    title: '暴雨预警',
    weatherIcon: 'systemCloudRainFill',
    description: '预计今日14:00-20:00有强降雨',
    tips: {
      type: 'warning',
      message: '请减速慢行，注意路面积水，保持安全车距',
    },
  };

  const options = {
    width: 360,
    height: 280,
  };

  return <WeatherExtremeDriving data={weatherData} opts={options} />;
};

export default App;
```

## 设计规范

- 使用 CardContainer 作为外层容器
- 遵循 Design Token 规范
- 支持主题色彩系统
- 响应式布局设计
- 条件渲染确保数据安全

## 注意事项

1. 所有数据字段都是可选的，组件会进行安全的条件渲染
2. tips.type 必须是有效的提示类型枚举值
3. weatherIcon 应使用系统内置的图标名称
4. 组件会自动适配主题色彩
5. 建议为不同预警类型使用对应的图标和提示类型
