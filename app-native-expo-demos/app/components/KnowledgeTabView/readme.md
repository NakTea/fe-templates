# KnowledgeTabView 组件说明文档

## 组件概述

`KnowledgeTabView` 是一个知识库标签页视图组件，用于展示具有多个标签页的知识内容。每个标签页可以包含独立的图片、描述、章节列表和 Markdown 内容。组件支持标签页切换，内容会根据选中的标签页动态显示。

## 功能特性

- ✅ 支持多标签页切换
- ✅ 每个标签页独立的内容展示
- ✅ 自适应高度图片显示
- ✅ 章节列表展示，支持标题和内容项
- ✅ **支持 Markdown 格式内容渲染**
- ✅ 响应式布局设计
- ✅ 主题色彩系统集成

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

## 数据类型定义

```typescript
type TTabItem = {
  key: string; // 标签页唯一标识
  label: string; // 标签页显示文本
  image?: string; // 图片URL
  description?: string; // 描述文本
  sections?: {
    // 章节列表
    title?: string; // 章节标题
    items?: {
      // 章节项目列表
      title?: string; // 项目标题（加粗显示）
      content?: string; // 项目内容
    }[];
  }[];
  content?: string; // Markdown内容（支持Markdown语法）
};

type TData = {
  title?: string; // 主标题
  titleIcon?: string; // 标题图标名称
  tabs?: TTabItem[]; // 标签页数组
  defaultTabKey?: string; // 默认激活的标签页key
};
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
        "title": {
          "type": "string",
          "description": "主标题"
        },
        "titleIcon": {
          "type": "string",
          "description": "标题图标名称（IconFont组件支持的图标名称）"
        },
        "tabs": {
          "type": "array",
          "description": "标签页数组",
          "items": {
            "type": "object",
            "required": ["key", "label"],
            "properties": {
              "key": {
                "type": "string",
                "description": "标签页唯一标识符"
              },
              "label": {
                "type": "string",
                "description": "标签页显示文本"
              },
              "image": {
                "type": "string",
                "format": "uri",
                "description": "图片URL地址"
              },
              "description": {
                "type": "string",
                "description": "该标签页的描述文本"
              },
              "sections": {
                "type": "array",
                "description": "章节列表",
                "items": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "description": "章节标题"
                    },
                    "items": {
                      "type": "array",
                      "description": "章节项目列表",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string",
                            "description": "项目标题（将以加粗样式显示）"
                          },
                          "content": {
                            "type": "string",
                            "description": "项目内容文本"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "content": {
                "type": "string",
                "description": "Markdown格式的内容，支持标准Markdown语法"
              }
            }
          }
        },
        "defaultTabKey": {
          "type": "string",
          "description": "默认激活的标签页key，如不指定则默认为第一个标签页"
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
import KnowledgeTabView from './KnowledgeTabView';

const knowledgeData = {
  title: "智能车外灯照明",
  titleIcon: "systemLightbulbFill",
  tabs: [
    {
      key: "near",
      label: "近光灯",
      image: "https://picsum.photos/400/200",
      description: "近光灯智能调节功能，会跟随方向盘的转动自动改变前照灯的照射角度。",
      sections: [
        {
          title: "操作方法",
          items: [
            {
              content: "在中控屏进入灯光设置"
            },
            {
              title: "自动模式",
              content: "车辆会根据环境光线自动开启或关闭。"
            }
          ]
        }
      ],
      content: `
## 注意事项

使用近光灯时请注意：

- **夜间驾驶**：确保灯光正常工作
- **恶劣天气**：及时开启相应灯光

### 维护建议

定期检查灯泡是否正常工作。
      `
    },
    {
      key: "far",
      label: "远光灯",
      image: "https://picsum.photos/400/250",
      description: "远光灯提供更强的照明距离，适用于开阔道路的夜间驾驶。",
      sections: [
        {
          title: "使用方法",
          items: [
            {
              content: "向前推动灯光控制杆开启远光灯"
            },
            {
              title: "使用场景",
              content: "适用于高速公路、乡村道路等开阔路段。"
            }
          ]
        }
      ]
    }
  ],
  defaultTabKey: "near"
};

// 基础使用
<KnowledgeTabView data={knowledgeData} />

// 自定义尺寸
<KnowledgeTabView
  data={knowledgeData}
  opts={{ width: 400, height: 500 }}
/>
```

## Markdown 支持说明

组件通过 `MarkdownRenderer` 组件支持标准 Markdown 语法，包括：

### 支持的 Markdown 语法

- **标题**：`# ## ###` 等级标题
- **加粗文本**：`**文本**` 或 `__文本__`
- **斜体文本**：`*文本*` 或 `_文本_`
- **列表**：
  - 无序列表：`- 项目` 或 `* 项目`
  - 有序列表：`1. 项目`
- **链接**：`[链接文本](URL)`
- **代码**：`` `行内代码` `` 和 `代码块`
- **引用**：`> 引用内容`
- **分隔线**：`---` 或 `***`

### Markdown 使用示例

```tsx
const tabWithMarkdown = {
  key: 'example',
  label: '示例',
  content: `
# 主标题

这是一段普通文本，支持 **加粗** 和 *斜体*。

## 二级标题

### 功能列表

- 支持无序列表
- 支持 **加粗文本**
- 支持 \`行内代码\`

### 有序列表

1. 第一步操作
2. 第二步操作
3. 第三步操作

> 这是一个引用块，用于重要提示信息。

---

更多信息请访问 [官方文档](https://example.com)
  `,
};
```

## 样式定制

组件使用 Design Token 系统，自动适配主题样式：

- `textPrimary`：主要文本颜色
- `textSecondary`：次要文本颜色
- `spaceElementsS/M`：元素间距
- `radiusInCard`：图片圆角
- `cnHeadlineXsStrong`：标题字体样式
- `cnBodyM`：正文字体样式

## 注意事项

1. **数据安全**：所有数据访问都有安全兜底处理
2. **图片加载**：使用 `AutoHeightImage` 组件自动调整图片高度
3. **滚动性能**：内容区域支持垂直滚动，隐藏滚动条
4. **响应式**：支持自定义宽高，适配不同屏幕尺寸
5. **无障碍**：遵循无障碍设计规范
