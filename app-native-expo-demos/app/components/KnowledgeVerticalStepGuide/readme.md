# KnowledgeVerticalStepGuide 组件说明文档

## 组件概述

`KnowledgeVerticalStepGuide` 是一个用于展示垂直步骤指引的 React Native 组件，适用于操作指南、教程说明等场景。组件支持步骤编号、标题、描述、图片展示，并可在步骤中或组件底部添加提示信息。

## 组件特性

- 支持多步骤垂直展示
- 每个步骤可包含编号、标题、描述和图片
- 支持步骤级别的提示信息（警告、错误、成功、信息）
- 支持组件级别的全局提示（顶部或底部）
- 响应式布局，支持自定义宽高
- 基于 CardContainer 容器组件

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

## 数据结构 JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeVerticalStepGuide Data Schema",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "指引标题"
        },
        "steps": {
          "type": "array",
          "description": "步骤信息数组",
          "items": {
            "type": "object",
            "required": ["number", "title"],
            "properties": {
              "number": {
                "type": "integer",
                "minimum": 1,
                "description": "步骤编号"
              },
              "title": {
                "type": "string",
                "description": "步骤标题"
              },
              "description": {
                "type": "string",
                "description": "步骤描述信息"
              },
              "image": {
                "type": "string",
                "format": "uri",
                "description": "步骤配图URL"
              },
              "tip": {
                "type": "object",
                "description": "步骤提示信息",
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
                    "description": "提示内容，支持Markdown格式"
                  },
                  "iconSize": {
                    "type": "integer",
                    "minimum": 1,
                    "description": "提示图标大小"
                  }
                },
                "required": ["position", "title", "type", "message", "iconSize"]
              }
            }
          }
        },
        "tip": {
          "type": "object",
          "description": "组件级别的全局提示",
          "properties": {
            "position": {
              "type": "string",
              "enum": ["top", "bottom"],
              "default": "bottom",
              "description": "提示位置"
            },
            "type": {
              "type": "string",
              "enum": ["error", "success", "warning", "info"],
              "default": "info",
              "description": "提示类型"
            },
            "message": {
              "type": "string",
              "description": "提示内容"
            },
            "iconSize": {
              "type": "integer",
              "minimum": 1,
              "description": "提示图标大小"
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

## 使用示例

```tsx
import KnowledgeVerticalStepGuide from './KnowledgeVerticalStepGuide';

const App = () => {
  const guideData = {
    title: '自动泊车指引',
    steps: [
      {
        number: 1,
        title: '寻找可用车位',
        description: '车辆将自动扫描周围环境，并在中控屏上显示识别到的可用车位，请选择一个目标车位。',
        image: 'https://example.com/step1.png',
      },
      {
        number: 2,
        title: '启动并监控泊车过程',
        description: '确认选择后，点击"开始泊车"并保持警惕。车辆将自动完成转向、加速和制动，直到完全停入车位。',
        image: 'https://example.com/step2.png',
        tip: {
          position: 'bottom',
          title: '安全提示',
          type: 'warning',
          message:
            '**危险**：泊车过程中请务必保持对周围环境的观察，特别是注意行人或突然出现的障碍物，并随时准备接管车辆。',
          iconSize: 16,
        },
      },
    ],
    tip: {
      position: 'bottom',
      type: 'info',
      message: '请在安全环境下使用自动泊车功能',
      iconSize: 16,
    },
  };

  return <KnowledgeVerticalStepGuide data={guideData} opts={{ width: '100%', maxHeight: 500 }} />;
};
```

## 数据结构说明

### 步骤对象 (IStep)

- `number`: 步骤编号，必填
- `title`: 步骤标题，必填
- `description`: 步骤描述，可选
- `image`: 步骤配图URL，可选
- `tip`: 步骤提示信息，可选

### 提示对象 (ITipData)

- `position`: 提示位置，'top' 或 'bottom'
- `type`: 提示类型，'error'、'success'、'warning' 或 'info'
- `message`: 提示内容，支持 Markdown 格式
- `iconSize`: 提示图标大小

## 提示类型说明

| 类型      | 用途         | 样式特征 |
| --------- | ------------ | -------- |
| `info`    | 一般信息提示 | 蓝色主题 |
| `success` | 成功状态提示 | 绿色主题 |
| `warning` | 警告信息     | 橙色主题 |
| `error`   | 错误信息     | 红色主题 |

## 样式自定义

组件使用 `useFlexUIConfig` 主题系统，支持通过主题配置自定义样式，包括：

- 文字颜色和字体样式
- 间距和布局
- 容器样式等

## 注意事项

1. 所有数据字段都是可选的，组件会进行安全检查
2. 步骤编号建议从1开始递增
3. 图片URL建议使用HTTPS链接
4. 提示信息的message字段支持Markdown格式，可以使用**加粗**等格式
5. 默认尺寸为364x376，可通过`opts`自定义
6. 组件内部使用Stepper组件渲染每个步骤，步骤间距由Stepper组件控制
7. 全局提示默认显示在底部，可通过position属性调整到顶部
