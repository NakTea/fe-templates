# PodcastEpisodeInfo 播客单集信息组件

## 组件描述

播客单集信息展示组件，用于显示播客封面图片、标题、描述和操作按钮。组件采用卡片式布局，支持封面图片展示、多行文本显示和灵活的按钮配置，适用于播客详情页、推荐列表等场景。

### 功能特性

- **封面展示**：支持播客封面图片自适应显示
- **信息展示**：标题支持2行显示，描述支持3行显示，超出自动截断
- **按钮操作**：支持多个操作按钮，按钮类型可配置（主要/次要）
- **响应式布局**：支持自定义宽高，按钮自动平分宽度
- **主题适配**：集成设计系统，自动适配主题色彩和字体
- **安全渲染**：完整的数据安全处理和条件渲染

## 组件API

### Props

| 参数 | 说明         | 类型    | 默认值 |
| ---- | ------------ | ------- | ------ |
| data | 播客数据对象 | `TData` | -      |
| opts | 组件配置选项 | `TOpts` | -      |

### TData 数据类型

| 参数        | 说明             | 类型        | 是否必填 |
| ----------- | ---------------- | ----------- | -------- |
| image       | 播客封面图片URL  | `string`    | 否       |
| title       | 播客标题         | `string`    | 否       |
| description | 播客描述         | `string`    | 否       |
| buttons     | 操作按钮配置数组 | `TButton[]` | 否       |

### TButton 按钮类型

| 参数  | 说明         | 类型                       | 默认值      |
| ----- | ------------ | -------------------------- | ----------- |
| text  | 按钮文字     | `string`                   | -           |
| type  | 按钮类型     | `'primary' \| 'secondary'` | `'primary'` |
| event | 按钮事件数据 | `any`                      | -           |

### TOpts 配置选项

| 参数   | 说明     | 类型               | 默认值 |
| ------ | -------- | ------------------ | ------ |
| width  | 组件宽度 | `string \| number` | `300`  |
| height | 组件高度 | `string \| number` | `376`  |

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "image": {
          "type": "string",
          "description": "播客封面图片URL",
          "format": "uri"
        },
        "title": {
          "type": "string",
          "description": "播客标题",
          "maxLength": 100
        },
        "description": {
          "type": "string",
          "description": "播客描述",
          "maxLength": 500
        },
        "buttons": {
          "type": "array",
          "description": "操作按钮配置数组",
          "items": {
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "description": "按钮文字",
                "maxLength": 20
              },
              "type": {
                "type": "string",
                "enum": ["primary", "secondary", "text"],
                "description": "按钮类型",
                "default": "primary"
              },
              "event": {
                "type": "object",
                "description": "按钮事件数据",
                "additionalProperties": true
              }
            }
          },
          "maxItems": 5
        }
      },
      "additionalProperties": false
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "additionalProperties": true
    }
  },
  "additionalProperties": false
}
```

## 使用示例

### 基础用法

```tsx
import PodcastEpisodeInfo from './PodcastEpisodeInfo';

const basicData = {
  image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/podcast/image-7.jpg',
  title: '探索时间的本质：从爱因斯坦到黑洞',
  description:
    '在本期节目中，我们邀请了物理学家李博士，一起深入浅出地探讨相对论如何改变我们对宇宙的认知，以及黑洞背后那些引人入胜的谜团。',
  buttons: [
    {
      text: '分享',
      type: 'secondary',
      event: { action: 'share', id: '123' },
    },
    {
      text: '播放',
      type: 'primary',
      event: { action: 'play', id: '123' },
    },
  ],
};

<PodcastEpisodeInfo data={basicData} />;
```

### 自定义尺寸

```tsx
const customSizeData = {
  image: 'https://example.com/podcast-cover.jpg',
  title: '科技前沿探索',
  description: '深度解析最新科技趋势',
  buttons: [
    {
      text: '播放',
      type: 'primary',
      event: { action: 'play' },
    },
  ],
};

<PodcastEpisodeInfo data={customSizeData} opts={{ width: 400, height: 450 }} />;
```

### 多按钮配置

```tsx
const multiButtonData = {
  image: 'https://example.com/podcast-cover.jpg',
  title: '商业洞察',
  description: '分享商业思维和创业经验',
  buttons: [
    {
      text: '收藏',
      type: 'secondary',
      event: { action: 'favorite' },
    },
    {
      text: '分享',
      type: 'secondary',
      event: { action: 'share' },
    },
    {
      text: '播放',
      type: 'primary',
      event: { action: 'play' },
    },
  ],
};

<PodcastEpisodeInfo data={multiButtonData} />;
```

### 响应式布局

```tsx
const responsiveData = {
  image: 'https://example.com/podcast-cover.jpg',
  title: '响应式播客',
  description: '适配不同屏幕尺寸',
  buttons: [
    {
      text: '播放',
      type: 'primary',
      event: {},
    },
  ],
};

<PodcastEpisodeInfo data={responsiveData} opts={{ width: '90%', height: 'auto' }} />;
```

### 最小配置

```tsx
const minimalData = {
  title: '简单播客',
};

<PodcastEpisodeInfo data={minimalData} />;
```

## 布局规范

### 组件结构

```
CardContainer (主容器)
├── AutoHeightImage (封面图片，高度180px)
└── View (内容区域)
    ├── View (文本内容区域)
    │   ├── Text (标题，最多2行)
    │   └── Text (描述，最多3行)
    └── View (按钮组，水平排列)
        ├── Button (按钮1)
        ├── Button (按钮2)
        └── ...
```

### 尺寸规范

- **默认尺寸**：宽度300px，高度376px
- **封面高度**：固定180px
- **内容间距**：8px (spaceElementsXs)
- **按钮间距**：24px (spaceElementsXl)
- **内容内边距**：底部20px (spaceElementsL)

### 文本规范

- **标题样式**：cnHeadlineXsStrong，颜色textTitle
- **描述样式**：cnBodyM，颜色textPrimary，行高20px
- **标题行数**：最多2行，超出显示省略号
- **描述行数**：最多3行，超出显示省略号

## 设计规范

### 颜色使用

- **标题颜色**：`textTitle` - 主标题色
- **描述颜色**：`textPrimary` - 主文字色
- **按钮颜色**：根据Button组件规范自动应用

### 圆角规范

- **封面圆角**：顶部左右圆角16px
- **容器圆角**：使用CardContainer默认圆角
- **按钮圆角**：使用Button组件默认圆角20px

### 间距规范

- **元素间距**：8px (spaceElementsXs)
- **按钮间距**：24px (spaceElementsXl)
- **底部间距**：20px (spaceElementsL)

## 注意事项

1. **数据安全**
   - 所有数据字段都是可选的，组件会安全处理空数据
   - 图片加载失败不会影响其他内容的显示
   - 按钮数组为空时不会显示按钮区域

2. **性能优化**
   - 使用AutoHeightImage组件优化图片加载
   - 文本截断避免布局溢出
   - 按钮使用标准Button组件确保性能

3. **交互体验**
   - 按钮支持完整的点击反馈
   - 事件数据通过console.log输出，实际使用时需要自定义处理
   - 支持无障碍访问

4. **扩展性**
   - 支持任意数量的按钮，自动平分宽度
   - 支持自定义组件尺寸
   - 事件数据结构灵活，支持各种业务需求

5. **兼容性**
   - 兼容React Native所有主流版本
   - 依赖标准的基础组件，无特殊兼容性问题

## 依赖说明

- **AutoHeightImage**: 自适应高度图片组件
- **Button**: 标准按钮组件
- **CardContainer**: 卡片容器组件
- **useFlexUIConfig**: 主题配置Hook

适用于播客应用、音频应用、内容推荐等场景，是展示媒体内容信息的核心组件。
