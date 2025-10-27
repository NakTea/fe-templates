# DeepThinkingDisplayCommon 组件说明文档

## 组件概述

DeepThinkingDisplayCommon 是一个用于展示深度思考步骤的可视化组件，以时间线的形式展示AI思考过程中的各个步骤。组件支持实时滚动到最新步骤，并提供渐变遮罩效果来增强视觉体验。

## 组件特性

- 📋 **步骤可视化**：以时间线形式展示思考步骤
- 🔄 **自动滚动**：数据更新时自动滚动到最新步骤
- 🎨 **渐变遮罩**：底部渐变遮罩效果，提升视觉体验
- 📱 **跨平台兼容**：支持 React Native 和 Web 平台
- 🎯 **图标映射**：不同步骤类型对应不同图标
- 📏 **尺寸可定制**：支持自定义宽度和最大高度

## 使用示例

```typescript
import DeepThinkingDisplayCommon from './DeepThinkingDisplayCommon';

const App = () => {
  const data = {
    steps: [
      {
        type: 'analysis',
        text: '我已经收到用户的需求，正在锁定相关的相似风格信息。',
      },
      {
        type: 'categorization',
        text: '我会提取当前歌曲的核心标签。',
      },
      {
        type: 'integration',
        text: '然后在资料库中寻找相近的候选曲目。',
      },
    ],
  };

  const opts = {
    width: 288,
    maxHeight: 120,
  };

  return <DeepThinkingDisplayCommon data={data} opts={opts} />;
};
```

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number; // 组件宽度，默认 288
    maxHeight?: string | number; // 最大高度，默认 120
  };
}
```

## 数据类型定义

```typescript
type TData = {
  steps?: {
    type: 'analysis' | 'categorization' | 'integration' | 'filtering' | 'calibration' | 'confirmation'; // 步骤类型，对应不同图标
    text?: string; // 步骤描述文本
  }[];
};
```

步骤和type的枚举：

| type           | 步骤名称 |
| -------------- | -------- |
| analysis       | 分析     |
| categorization | 归类     |
| integration    | 整合     |
| filtering      | 筛选     |
| calibration    | 校正     |
| confirmation   | 确认     |

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "DeepThinkingDisplayCommon Data Schema",
  "description": "深度思考步骤展示组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "steps": {
          "type": "array",
          "description": "思考步骤列表",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": ["analysis", "categorization", "integration", "filtering", "calibration", "confirmation"],
                "description": "步骤类型，对应不同的图标显示"
              },
              "text": {
                "type": "string",
                "description": "步骤描述文本"
              }
            },
            "required": ["type"]
          }
        }
      }
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "properties": {
        "width": {
          "oneOf": [{ "type": "string" }, { "type": "number" }],
          "description": "组件宽度，默认 288"
        },
        "maxHeight": {
          "oneOf": [{ "type": "string" }, { "type": "number" }],
          "description": "最大高度，默认 120"
        }
      },
      "additionalProperties": true
    }
  }
}
```

## 事件处理

- **自动滚动**：当 `steps` 数据更新时，组件会自动滚动到最新的步骤
- **延迟滚动**：使用 100ms 延迟确保内容渲染完成后再执行滚动

## 样式定制

组件使用 FlexUI 主题系统，支持以下样式定制：

- `textPrimary`：主要文本颜色
- `textSecondary`：次要文本颜色（连接线颜色）
- `cnBodyS`：正文小号字体样式
- `spaceElementsS`：标准间距
- `spaceElementsXs`：小间距
- `sizeIconS`：小号图标尺寸

## 平台特性

### React Native

- 使用 `MaskedView` 和 `LinearGradient` 实现渐变遮罩效果

### Web

- 使用 CSS `maskImage` 属性实现渐变遮罩效果
- 兼容 WebKit 浏览器的 `-webkit-mask-image` 属性

## 注意事项

1. **图标依赖**：组件依赖 `IconFont` 组件，需要确保相关图标资源已正确配置
2. **步骤类型映射**：步骤类型会自动转换为对应的图标名称（如 `analysis` → `step-analysis`）
3. **连接线逻辑**：最后一个步骤或 `finish` 类型步骤不会显示连接线
4. **滚动性能**：大量步骤时建议控制数据量，避免性能问题
5. **主题依赖**：组件需要在 FlexUI 主题提供者中使用
