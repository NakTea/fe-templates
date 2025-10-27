# Stepper 组件说明文档

## 概述

Stepper 是一个用于展示步骤流程的 React Native 组件，支持显示步骤编号、标题、描述、图片以及提示信息。组件支持 Markdown 格式的描述内容。

## 功能特性

- ✅ 支持步骤编号显示
- ✅ 支持标题和描述文本
- ✅ 支持 Markdown 格式描述
- ✅ 支持图片展示
- ✅ 支持提示信息（Tips）
- ✅ 高度可定制的样式配置
- ✅ 主题系统集成

## 使用示例

```tsx
import Stepper from './components/Stepper';

const ExampleComponent = () => {
  const stepData = {
    number: 1,
    title: '第一步',
    description: '这是第一步的**详细描述**，支持 Markdown 格式',
    image: 'https://example.com/image.jpg',
  };

  return (
    <Stepper
      step={stepData}
      tip={{
        position: 'bottom',
        title: '提示',
        type: 'info',
        message: '这是一个提示信息',
        iconSize: 16,
      }}
    />
  );
};
```

## Props 接口

### IStepperProps

| 属性名                          | 类型      | 必填 | 默认值     | 说明             |
| ------------------------------- | --------- | ---- | ---------- | ---------------- |
| style                           | ViewStyle | 否   | -          | 容器样式         |
| step                            | StepItem  | 是   | -          | 步骤数据         |
| stepperSerialNumberFontStyle    | any       | 否   | 主题默认值 | 步骤编号字体样式 |
| stepperSerialNumberColor        | string    | 否   | 主题默认值 | 步骤编号文字颜色 |
| stepperSerialNumberRightPadding | number    | 否   | 主题默认值 | 步骤编号右侧间距 |
| stepperSerialNumberBgColor      | string    | 否   | 主题默认值 | 步骤编号背景色   |
| stepperCardTitleFontStyle       | any       | 否   | 主题默认值 | 标题字体样式     |
| stepperCardTitleColor           | string    | 否   | 主题默认值 | 标题文字颜色     |
| stepperCardDescFontStyle        | any       | 否   | 主题默认值 | 描述字体样式     |
| stepperCardDescColor            | string    | 否   | 主题默认值 | 描述文字颜色     |
| stepperCardPictureWidth         | number    | 否   | 150        | 图片宽度         |
| stepperCardPictureRadius        | number    | 否   | 主题默认值 | 图片圆角         |
| stepperCardMarginBottom         | number    | 否   | 主题默认值 | 卡片底部间距     |
| stepperElementsPadding          | number    | 否   | 主题默认值 | 元素间距         |
| stepperVerticalLineColor        | string    | 否   | 主题默认值 | 垂直连接线颜色   |
| stepperVerticalLineWidth        | number    | 否   | 主题默认值 | 垂直连接线宽度   |
| tip                             | TipConfig | 否   | -          | 提示信息配置     |

### StepItem

| 属性名      | 类型   | 必填 | 说明                      |
| ----------- | ------ | ---- | ------------------------- |
| number      | number | 是   | 步骤编号                  |
| title       | string | 是   | 步骤标题                  |
| description | string | 否   | 步骤描述（支持 Markdown） |
| image       | string | 否   | 图片 URL                  |

### TipConfig

| 属性名   | 类型                                                     | 必填 | 说明     |
| -------- | -------------------------------------------------------- | ---- | -------- |
| position | 'top' \| 'bottom'                                        | 是   | 提示位置 |
| title    | string                                                   | 是   | 提示标题 |
| type     | 'error' \| 'success' \| 'warning' \| 'info' \| undefined | 是   | 提示类型 |
| message  | string                                                   | 是   | 提示内容 |
| iconSize | number                                                   | 是   | 图标大小 |

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Stepper Component Props",
  "properties": {
    "style": {
      "type": "object",
      "description": "容器样式"
    },
    "step": {
      "type": "object",
      "required": ["number", "title"],
      "properties": {
        "number": {
          "type": "number",
          "description": "步骤编号"
        },
        "title": {
          "type": "string",
          "description": "步骤标题"
        },
        "description": {
          "type": "string",
          "description": "步骤描述，支持 Markdown 格式"
        },
        "image": {
          "type": "string",
          "format": "uri",
          "description": "图片 URL"
        }
      }
    },
    "stepperSerialNumberFontStyle": {
      "type": "object",
      "description": "步骤编号字体样式"
    },
    "stepperSerialNumberColor": {
      "type": "string",
      "description": "步骤编号文字颜色"
    },
    "stepperSerialNumberRightPadding": {
      "type": "number",
      "description": "步骤编号右侧间距"
    },
    "stepperSerialNumberBgColor": {
      "type": "string",
      "description": "步骤编号背景色"
    },
    "stepperCardTitleFontStyle": {
      "type": "object",
      "description": "标题字体样式"
    },
    "stepperCardTitleColor": {
      "type": "string",
      "description": "标题文字颜色"
    },
    "stepperCardDescFontStyle": {
      "type": "object",
      "description": "描述字体样式"
    },
    "stepperCardDescColor": {
      "type": "string",
      "description": "描述文字颜色"
    },
    "stepperCardPictureWidth": {
      "type": "number",
      "default": 150,
      "description": "图片宽度"
    },
    "stepperCardPictureRadius": {
      "type": "number",
      "description": "图片圆角"
    },
    "stepperCardMarginBottom": {
      "type": "number",
      "description": "卡片底部间距"
    },
    "stepperElementsPadding": {
      "type": "number",
      "description": "元素间距"
    },
    "stepperVerticalLineColor": {
      "type": "string",
      "description": "垂直连接线颜色"
    },
    "stepperVerticalLineWidth": {
      "type": "number",
      "description": "垂直连接线宽度"
    },
    "tip": {
      "type": "object",
      "properties": {
        "position": {
          "type": "string",
          "enum": ["top", "bottom"],
          "description": "提示位置"
        },
        "title": {
          "type": "string",
          "description": "提示标题"
        },
        "type": {
          "type": "string",
          "enum": ["error", "success", "warning", "info"],
          "description": "提示类型"
        },
        "message": {
          "type": "string",
          "description": "提示内容"
        },
        "iconSize": {
          "type": "number",
          "description": "图标大小"
        }
      },
      "required": ["position", "title", "type", "message", "iconSize"]
    }
  },
  "required": ["step"]
}
```

## Markdown 支持

✅ **支持 Markdown 格式**

组件的 `step.description` 属性支持 Markdown 格式，通过内置的 `MarkdownRenderer` 组件进行渲染。支持的 Markdown 语法包括：

- **粗体文本**
- _斜体文本_
- 链接
- 列表
- 其他常见 Markdown 语法

## 主题系统

组件集成了主题系统，通过 `useFlexUIConfig` 获取主题配置。所有样式属性都有对应的主题默认值，可以通过传入 props 进行覆盖。

## 注意事项

1. 图片高度自动计算为宽度的一半
2. 垂直连接线从步骤编号下方开始延伸
3. 提示信息可以显示在步骤的顶部或底部
4. 所有样式属性都支持主题系统的默认值
