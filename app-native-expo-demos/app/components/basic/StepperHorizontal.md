# StepperHorizontal 水平步骤导航组件

## 组件描述

StepperHorizontal 是一个水平步骤导航组件，用于展示多步骤内容。组件包含步骤导航按钮和对应的内容区域，支持滑动切换和点击切换步骤。每个步骤可以包含文本和图片内容。

## 组件功能：

- 水平步骤导航
- 左右滑动切换步骤
- 点击步骤按钮切换
- 支持文本和图片混合内容
- 内容支持垂直滚动

## Props 说明

| 属性               | 类型       | 必填 | 默认值 | 描述                   |
| ------------------ | ---------- | ---- | ------ | ---------------------- |
| style              | ViewStyle  | 否   | {}     | 容器样式               |
| steps              | StepItem[] | 是   | -      | 步骤数据数组           |
| activeStep         | number     | 否   | 1      | 当前激活的步骤序号     |
| activeBtnTextPreix | string     | 否   | 步骤   | 当前步骤显示的文本前缀 |

### StepItem 类型说明

```
interface StepItem {
  number: number;    // 步骤序号
  title: string;     // 步骤标题
  contents: ContentItem[];  // 步骤内容
}

interface ContentItem {
  type: 'text' | 'image';  // 内容类型：文本或图片
  text: string;            // 文本内容或图片URL
}
```

## Props JSON Schema

```
{
  "type": "object",
  "properties": {
    "style": {
      "type": "object",
      "description": "容器样式",
      "additionalProperties": true
    },
    "steps": {
      "type": "array",
      "description": "步骤数据",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["number", "title", "contents"],
        "properties": {
          "number": {
            "type": "number",
            "description": "步骤序号",
            "minimum": 1
          },
          "title": {
            "type": "string",
            "description": "步骤标题"
          },
          "contents": {
            "type": "array",
            "description": "步骤内容",
            "items": {
              "type": "object",
              "required": ["type", "text"],
              "properties": {
                "type": {
                  "type": "string",
                  "enum": ["text", "image"],
                  "description": "内容类型"
                },
                "text": {
                  "type": "string",
                  "description": "文本内容或图片URL"
                }
              }
            }
          }
        }
      }
    },
    "activeStep": {
      "type": "number",
      "description": "当前激活的步骤序号",
      "minimum": 1,
      "default": 1
    }
  },
  "required": ["steps"]
}
```

## 使用示例

```
import StepperHorizontal from './StepperHorizontal';

const App = () => {
  const steps = [
    {
      number: 1,
      title: "第一步：准备工作",
      contents: [
        {
          type: "text",
          text: "首先，确保您已经完成了所有必要的准备工作。"
        },
        {
          type: "image",
          text: "https://example.com/step1.jpg"
        }
      ]
    },
    {
      number: 2,
      title: "第二步：开始操作",
      contents: [
        {
          type: "text",
          text: "按照以下步骤进行操作："
        },
        {
          type: "image",
          text: "https://example.com/step2.jpg"
        }
      ]
    }
  ];

  return (
    <StepperHorizontal
      steps={steps}
      activeStep={1}
      style={{ height: 500 }}
    />
  );
};
```

## Mock 数据示例

```
const mockSteps = {
  steps: [
    {
      number: 1,
      title: "步骤一",
      contents: [
        {
          type: "text",
          text: "这是第一步的说明文本"
        },
        {
          type: "image",
          text: "https://picsum.photos/400/300"
        }
      ]
    },
    {
      number: 2,
      title: "步骤二",
      contents: [
        {
          type: "text",
          text: "这是第二步的说明文本"
        },
        {
          type: "image",
          text: "https://picsum.photos/400/300"
        }
      ]
    }
  ],
  activeStep: 1
};
```

## 主题定制：

组件样式依赖于主题配置中的 StepperHorizontal 部分：

```
{
  components: {
    StepperHorizontal: {
      stepButton: {},           // 步骤按钮样式
      containerGap: number,     // 按钮间距
      containerMarginBottom: number, // 按钮容器底部间距
      stepButtonActive: {},     // 激活按钮样式
      stepNumberText: {},       // 步骤数字文本样式
      stepNumberTextActive: {}, // 激活步骤数字文本样式
      stepTitle: {},           // 步骤标题样式
      contentText: {},         // 内容文本样式
      contentImage: {},        // 内容图片样式
    }
  }
}
```

## 特点：

- 使用 Swiper 实现横向切换
- 支持手势滑动和按钮点击
- 内容区域支持垂直滚动
- 图片自适应高度
- 样式完全可配置
- 支持自定义容器样式

## 注意事项：

- 需要设置容器高度
- 步骤序号从 1 开始
- 组件依赖于 `react-native-swiper` 和 `AutoHeightImage` 组件
- 图片内容需要提供有效的图片URL
- 组件支持滑动切换和点击切换两种方式
- 每个步骤的内容可以包含多个文本和图片
- 组件样式可以通过 theme 配置进行自定义

这个组件主要用于分步骤展示引导内容，适合用于教程、说明书等场景。
