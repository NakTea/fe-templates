# VehicleControlValueAdjuster 组件说明文档

## 组件概述

VehicleControlValueAdjuster 是一个车辆控制数值调节组件，用于在车载系统中调节各种数值参数（如空调温度、音量等）。组件提供直观的滑块界面，支持实时数值调节和事件响应。

## 组件特性

- 🚗 专为车载场景设计的数值调节器
- 🎚️ 支持自定义范围、步长和单位的滑块控制
- 🎯 实时数值反馈和事件触发
- 🎨 基于主题系统的样式定制
- 📱 响应式布局，支持自定义尺寸
- 🎙️ 支持热词语音控制
- ⚡ 平滑的动画过渡效果

## 使用示例

```typescript
import VehicleControlValueAdjuster from './VehicleControlValueAdjuster';

const App = () => {
  const templateData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '空调调节',
      value: 75,
      config: {
        min: 0,
        max: 100,
        step: 5,
        unit: '%',
        icon: 'systemSettingsFill',
      },
      buttons: [
        {
          id: 'adjust',
          deeplink: '',
          event: {
            set: [
              {
                type: 'vehicleControl',
                action: 'adjustValue',
                input: 'value: {value}',
              },
            ],
          },
        },
      ],
    },
  };

  return (
    <VehicleControlValueAdjuster
      data={templateData.data}
      opts={templateData.opts}
      sendMsgToNative={(msg) => console.log(msg)}
      isEnded={true}
      messageData={{}}
    />
  );
};
```

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
  };
  sendMsgToNative: (msg: any) => void;
  isEnded: boolean;
  messageData: object;
}
```

## 数据类型定义

```typescript
// 按钮配置类型
type TButtonConfig = {
  id: string; // 按钮唯一标识
  deeplink: string; // 深度链接地址
  event?: Record<string, any>; // 原子能力event专用配置
  hotwords?: Record<string, any>; // 热词专用配置
};

// 滑块配置类型
type TSliderConfig = {
  min?: number; // 最小值，默认0
  max?: number; // 最大值，默认100
  step?: number; // 步长，默认1
  defaultValue?: number; // 默认值，默认50
  unit?: string; // 单位，默认'%'
  icon?: string; // 图标名称，默认'systemSettingsFill'
};

// 主数据类型
type TData = {
  title?: string; // 组件标题
  value?: number; // 当前数值
  config?: TSliderConfig; // 滑块配置
  buttons?: TButtonConfig[]; // 按钮配置数组
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "VehicleControlValueAdjuster Data Schema",
  "description": "车辆控制数值调节组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "组件标题"
        },
        "value": {
          "type": "number",
          "description": "当前数值"
        },
        "config": {
          "type": "object",
          "description": "滑块配置",
          "properties": {
            "min": {
              "type": "number",
              "description": "最小值",
              "default": 0
            },
            "max": {
              "type": "number",
              "description": "最大值",
              "default": 100
            },
            "step": {
              "type": "number",
              "description": "步长",
              "default": 1
            },
            "defaultValue": {
              "type": "number",
              "description": "默认值",
              "default": 50
            },
            "unit": {
              "type": "string",
              "description": "单位",
              "default": "%"
            },
            "icon": {
              "type": "string",
              "description": "图标名称",
              "default": "systemSettingsFill"
            }
          }
        },
        "buttons": {
          "type": "array",
          "description": "按钮配置数组",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "按钮唯一标识"
              },
              "deeplink": {
                "type": "string",
                "description": "深度链接地址"
              },
              "event": {
                "type": "object",
                "description": "原子能力event专用配置",
                "additionalProperties": true
              },
              "hotwords": {
                "type": "object",
                "description": "热词专用配置",
                "additionalProperties": true
              }
            },
            "required": ["id", "deeplink"]
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

## 事件处理

组件支持以下事件处理机制：

1. **滑块值变化事件**：
   - 当用户拖动滑块时，触发 `handleSliderChange` 函数
   - 根据配置的步长自动调整数值
   - 发送配置的事件到原生端

2. **外部数值设置**：
   - 监听 `messageData` 中的 `invokeRNMethod` 消息
   - 支持通过 `setValue` 方法外部设置数值

3. **热词注册**：
   - 组件结束时自动注册热词配置
   - 支持语音控制功能

4. **原生消息发送**：
   - 数值变化时发送标准化消息格式
   - 支持自定义事件配置的消息发送

## 样式定制

组件使用 FlexUI 主题系统，支持以下样式定制：

- **颜色主题**：基于 `system` token 的颜色配置
- **字体样式**：支持标题和数值显示的字体定制
- **间距配置**：使用系统定义的间距 token
- **图标样式**：支持自定义图标和颜色
- **滑块样式**：可定制滑块轨道和拇指的颜色

## 注意事项

1. **数值范围**：确保 `value` 在 `min` 和 `max` 范围内
2. **步长配置**：`step` 值应该是合理的，避免过小导致精度问题
3. **事件配置**：`event.set` 数组中的 `input` 字段支持模板替换 `{value}`
4. **热词配置**：需要在 `isEnded` 为 `true` 时才会注册热词
5. **主题依赖**：组件依赖 FlexUI 主题系统，确保正确配置主题提供者
6. **原生通信**：`sendMsgToNative` 函数必须正确实现以支持与原生端通信
