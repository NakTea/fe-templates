# KnowledgeGuide 组件文档

## 组件概述

`KnowledgeGuide` 是一个知识指南展示组件，支持轮播图片展示和对应的文本内容。组件采用卡片容器布局，包含标题、描述、图片轮播和分页器等功能。

## 主要特性

- ✅ 图片轮播展示，支持手势滑动和分页器点击切换
- ✅ 自适应图片高度，保持图片原始比例
- ✅ 分页器指示当前页面位置
- ✅ 支持 Markdown 格式的描述文本
- ✅ 响应式布局，自动适配容器宽度
- ✅ 空状态处理

## 使用示例

```tsx
import KnowledgeGuide from './KnowledgeGuide';

const data = {
  title: 'React Native 开发指南',
  description: '学习如何构建高质量的移动应用',
  contents: [
    {
      image: 'https://picsum.photos/400/225',
      title: '环境搭建',
      description: '## 安装步骤\n\n1. 安装 Node.js\n2. 配置开发环境\n3. 创建项目',
    },
    {
      image: 'https://picsum.photos/400/226',
      title: '组件开发',
      description: '掌握组件开发的**核心概念**和最佳实践',
    },
    {
      image: 'https://picsum.photos/400/227',
      title: '状态管理',
      description: '使用 Redux 或 Context API 进行状态管理',
    },
  ],
};

<KnowledgeGuide
  data={data}
  opts={{
    width: 360,
    height: 400,
  }}
/>;
```

## Props 接口

```tsx
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

type TData = {
  title?: string;
  description?: string;
  contents?: TContentData[];
};

type TContentData = {
  image?: string;
  title?: string;
  description?: string;
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
          "description": "知识指南的主标题"
        },
        "description": {
          "type": "string",
          "description": "知识指南的描述信息"
        },
        "contents": {
          "type": "array",
          "description": "内容列表，用于轮播展示",
          "items": {
            "type": "object",
            "properties": {
              "image": {
                "type": "string",
                "format": "uri",
                "description": "图片URL地址"
              },
              "title": {
                "type": "string",
                "description": "当前内容的标题"
              },
              "description": {
                "type": "string",
                "description": "当前内容的描述，支持Markdown格式"
              }
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

## 参数说明

### data 数据对象

| 参数        | 类型           | 必填 | 默认值 | 说明                   |
| ----------- | -------------- | ---- | ------ | ---------------------- |
| title       | string         | 否   | -      | 知识指南的主标题       |
| description | string         | 否   | -      | 知识指南的描述信息     |
| contents    | TContentData[] | 否   | []     | 内容列表，用于轮播展示 |

### contents 内容对象

| 参数        | 类型   | 必填 | 默认值 | 说明                                 |
| ----------- | ------ | ---- | ------ | ------------------------------------ |
| image       | string | 否   | -      | 图片URL地址                          |
| title       | string | 否   | -      | 当前内容的标题                       |
| description | string | 否   | -      | 当前内容的描述，**支持Markdown格式** |

### opts 配置选项

| 参数   | 类型             | 必填 | 默认值 | 说明     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 364    | 组件宽度 |
| height | string \| number | 否   | 376    | 组件高度 |

## Markdown 支持

组件的 `description` 字段支持 Markdown 格式，可以使用以下语法：

- **粗体文本**: `**文本**`
- _斜体文本_: `*文本*`
- 标题: `# 一级标题`, `## 二级标题`
- 列表: `1. 有序列表`, `- 无序列表`
- 链接: `[链接文本](URL)`
- 代码: `` `代码` ``

## 设计规范

### 布局结构

- 使用 CardContainer 作为外层容器
- 图片采用 16:9 比例自适应显示
- 分页器居中显示，支持点击切换
- 文本内容区域最小高度 60px

### 视觉样式

- 主标题使用 `cnHeadlineXsStrong` 字体样式
- 描述文本使用 `cnBodyM` 字体样式
- 分页器激活状态放大 1.25 倍
- 图片圆角使用 `radiusInCard` token

### 交互行为

- 支持手势左右滑动切换内容
- 点击分页器圆点可直接跳转到对应页面
- 切换动画时长 300ms
- 不支持循环播放

## 空状态处理

当 `contents` 为空或未提供时，组件会显示空状态：

- 仅显示标题和描述（如果提供）
- 不显示轮播图和分页器
- 不显示底部文本内容区域

## 性能优化

- 使用 `onLayout` 动态获取容器宽度，避免硬编码
- 图片采用 `AutoHeightImage` 组件，自动适配高度
- 分页器仅在多页内容时渲染
- 使用 `useRef` 管理轮播实例，避免重复创建

## 注意事项

1. 图片 URL 需要是有效的网络地址
2. Markdown 渲染依赖 `MarkdownRenderer` 组件
3. 组件会自动处理数据为空的情况
4. 建议为每个内容项提供图片以获得最佳视觉效果
5. 描述文本支持 Markdown 格式，可以包含格式化内容
