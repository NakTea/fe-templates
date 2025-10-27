# KnowledgeHorizontalSetupStepper 知识设置步骤组件

## 组件描述

KnowledgeHorizontalSetupStepper 是一个知识设置步骤引导组件，专门用于展示分步骤的设置流程。组件基于 StepperHorizontal 实现，提供横向步骤导航和对应的内容展示，支持滑动切换和点击切换步骤。每个步骤可以包含标题、文本说明和配图，特别适用于产品功能设置、操作指南等场景。

## 组件功能

- 横向步骤导航展示
- 支持滑动和点击切换步骤
- 每步骤包含标题和混合内容（文本+图片）
- 自适应容器尺寸
- 主题样式统一
- 内容支持垂直滚动

## Props 说明

| 属性 | 类型  | 必填 | 默认值 | 描述         |
| ---- | ----- | ---- | ------ | ------------ |
| data | TData | 否   | -      | 组件数据对象 |
| opts | IOpts | 否   | -      | 组件配置选项 |

### TData 类型说明

| 属性                | 类型       | 必填 | 默认值 | 描述               |
| ------------------- | ---------- | ---- | ------ | ------------------ |
| title               | string     | 否   | -      | 组件标题           |
| steps               | StepItem[] | 否   | []     | 步骤数据数组       |
| activeStep          | number     | 否   | 1      | 当前激活的步骤序号 |
| activeBtnTextPrefix | string     | 否   | "步骤" | 激活按钮的文本前缀 |

### IOpts 类型说明

| 属性   | 类型             | 必填 | 默认值 | 描述     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 364    | 组件宽度 |
| height | string \| number | 否   | 376    | 组件高度 |

### StepItem 类型说明

```typescript
interface StepItem {
  number: number; // 步骤序号
  title: string; // 步骤标题
  contents: ContentItem[]; // 步骤内容数组
}

interface ContentItem {
  type: 'text' | 'image'; // 内容类型：文本或图片
  text: string; // 文本内容或图片URL
}
```

## JSON Schema

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "description": "组件数据",
      "properties": {
        "title": {
          "type": "string",
          "description": "组件标题"
        },
        "steps": {
          "type": "array",
          "description": "步骤数据数组",
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
                "description": "步骤内容数组",
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
        },
        "activeBtnTextPrefix": {
          "type": "string",
          "description": "激活按钮的文本前缀",
          "default": "步骤"
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

## 使用示例

```tsx
import KnowledgeHorizontalSetupStepper from './KnowledgeHorizontalSetupStepper';

const App = () => {
  const setupData = {
    title: '抬头显示系统 (HUD)',
    activeBtnTextPrefix: '步骤',
    activeStep: 1,
    steps: [
      {
        number: 1,
        title: '调节显示亮度和高度',
        contents: [
          {
            type: 'text',
            text: '在中央触摸屏上，选择"控制" > "显示"。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_08.png',
          },
          {
            type: 'text',
            text: '使用"抬头显示"设置，拖动滑块来调整亮度，并选择三种预设高度之一以获得最佳视角。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_06.png',
          },
        ],
      },
      {
        number: 2,
        title: '设置显示信息',
        contents: [
          {
            type: 'text',
            text: '选择要在抬头显示中显示的信息类型。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_08.png',
          },
        ],
      },
    ],
  };

  return <KnowledgeHorizontalSetupStepper data={setupData} opts={{ width: '100%', maxHeight: 400 }} />;
};
```

## Mock 数据示例

```tsx
const mockData = {
  title: "WiFi 连接设置",
  activeBtnTextPrefix: "步骤",
  activeStep: 1,
  steps: [
    {
      number: 1,
      title: "打开设置界面",
      contents: [
        {
          type: "text",
          text: "在主界面点击设置图标进入系统设置。"
        },
        {
          type: "image",
          text: "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_400,h_300"
        }
      ]
    },
    {
      number: 2,
      title: "选择网络设置",
      contents: [
        {
          type: "text",
          text: "在设置菜单中找到并点击"网络和互联网"选项。"
        },
        {
          type: "image",
          text: "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_400,h_300"
        }
      ]
    },
    {
      number: 3,
      title: "连接WiFi",
      contents: [
        {
          type: "text",
          text: "选择要连接的WiFi网络，输入密码完成连接。"
        },
        {
          type: "image",
          text: "https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_400,h_300"
        }
      ]
    }
  ]
};
```

## 主题定制

组件样式依赖于主题配置中的以下 token：

```typescript
{
  system: {
    cnHeadlineXsStrong: {},    // 标题文字样式
    textTitle: string,         // 标题文字颜色
    spaceElementsM: number,    // 标准间距
  }
}
```

## 特点

- **基于StepperHorizontal**：复用现有组件，保持设计一致性
- **Swiper支持**：支持手势滑动和按钮点击切换
- **混合内容**：支持文本和图片混合展示
- **响应式设计**：支持自定义宽高，适配不同屏幕
- **安全数据处理**：所有数据都进行安全解构和条件渲染
- **主题一致性**：使用统一的 design token 系统

## 使用场景

- 产品功能设置指南
- 操作流程说明
- 安装配置教程
- 故障排除步骤
- 使用说明文档

## 注意事项

- 需要设置合适的容器高度以确保内容完整显示
- 步骤序号从 1 开始计算
- 图片内容需要提供有效的图片URL
- 组件依赖于 `StepperHorizontal` 基础组件
- 内容区域支持垂直滚动，适合长内容展示
- 建议每个步骤包含3-5个内容项以保持良好的用户体验
