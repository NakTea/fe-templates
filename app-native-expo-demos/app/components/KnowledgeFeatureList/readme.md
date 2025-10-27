# KnowledgeFeatureList 组件说明文档

## 概述

KnowledgeFeatureList 是一个知识功能列表组件，用于展示带有缩略图、标题和描述的功能项列表。组件采用卡片容器布局，支持垂直滚动，适用于展示车辆说明、功能介绍等场景。

## 功能特性

- ✅ 支持自定义标题
- ✅ 支持图文列表展示
- ✅ 支持垂直滚动
- ✅ 响应式布局
- ✅ 自动图片裁剪（4:3比例）
- ✅ 文本截断（标题和描述均支持2行显示）
- ✅ 空数据安全处理
- ❌ 不支持 Markdown 格式

## API 参数

### Props

| 参数 | 类型  | 必填 | 默认值 | 说明         |
| ---- | ----- | ---- | ------ | ------------ |
| data | TData | 否   | -      | 组件数据     |
| opts | TOpts | 否   | -      | 组件配置选项 |

### TData 类型定义

| 字段  | 类型           | 必填 | 说明       |
| ----- | -------------- | ---- | ---------- |
| title | string         | 否   | 列表标题   |
| items | TFeatureItem[] | 否   | 功能项列表 |

### TFeatureItem 类型定义

| 字段        | 类型   | 必填 | 说明                       |
| ----------- | ------ | ---- | -------------------------- |
| id          | string | 否   | 唯一标识符，用于 React key |
| title       | string | 否   | 功能项标题                 |
| description | string | 否   | 功能项描述                 |
| image       | string | 否   | 缩略图 URL                 |

### TOpts 类型定义

| 字段   | 类型             | 必填 | 默认值 | 说明     |
| ------ | ---------------- | ---- | ------ | -------- |
| width  | string \| number | 否   | 440    | 组件宽度 |
| height | string \| number | 否   | 376    | 组件高度 |

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
          "description": "列表标题"
        },
        "items": {
          "type": "array",
          "description": "功能项列表",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "唯一标识符"
              },
              "title": {
                "type": "string",
                "description": "功能项标题"
              },
              "description": {
                "type": "string",
                "description": "功能项描述"
              },
              "image": {
                "type": "string",
                "format": "uri",
                "description": "缩略图URL"
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

## 使用示例

### 基础用法

```tsx
import KnowledgeFeatureList from './KnowledgeFeatureList';

const basicData = {
  title: '车辆说明图文',
  items: [
    {
      id: '1',
      title: '引擎关键维护',
      description: '定期检查机油、冷却液和滤清器是保持发动机最佳性能和延长其使用寿命的核心。',
      image: 'https://picsum.photos/320/240',
    },
    {
      id: '2',
      title: '轮胎压力监控',
      description: '务必保持标准胎压，这不仅关系到行车安全，也直接影响车辆的燃油经济性与操控表现。',
      image: 'https://picsum.photos/320/241',
    },
  ],
};

<KnowledgeFeatureList data={basicData} />;
```

### 自定义尺寸

```tsx
<KnowledgeFeatureList
  data={basicData}
  opts={{
    width: 500,
    height: 400,
  }}
/>
```

### 响应式布局

```tsx
<KnowledgeFeatureList
  data={basicData}
  opts={{
    width: '100%',
    height: 350,
  }}
/>
```

### 紧凑模式

```tsx
<KnowledgeFeatureList
  data={basicData}
  opts={{
    width: 300,
    height: 300,
  }}
/>
```

### 空数据处理

```tsx
// 空数据 - 组件会安全处理
<KnowledgeFeatureList data={{}} />

// 无数据 - 组件会安全处理
<KnowledgeFeatureList />

// 部分数据缺失 - 组件会安全处理
<KnowledgeFeatureList
  data={{
    title: "标题",
    items: [
      {
        // 只有标题，没有描述和图片
        title: "只有标题的项目"
      }
    ]
  }}
/>
```

## 样式规范

### 尺寸规范

- **缩略图**: 80px × 60px (4:3比例)
- **默认容器**: 440px × 376px
- **最小宽度**: 228px
- **图片圆角**: 4px

### 间距规范

- **容器内边距**: 24px
- **标题与列表间距**: 16px
- **列表项间距**: 24px
- **图片与文字间距**: 16px
- **标题与描述间距**: 4px

### 文字规范

- **列表标题**: 14px Bold (cnHeadlineXsStrong)
- **项目标题**: 12px Bold (cnHeadlineXxsStrong)
- **项目描述**: 12px Regular (cnBodyS)

### 颜色规范

- **标题颜色**: textTitle (主题色)
- **描述颜色**: textPrimary (主题色)

## 注意事项

1. **图片处理**: 组件使用 `resizeMode="cover"` 确保图片填充，建议使用 4:3 比例的图片以获得最佳显示效果

2. **文本截断**: 标题和描述都限制为最多 2 行显示，超出部分会被截断

3. **数据安全**: 所有字段都是可选的，组件会安全处理空数据情况

4. **滚动性能**: 当列表项较多时，组件支持垂直滚动，滚动指示器已隐藏

5. **响应式**: 支持百分比宽度，可适配不同屏幕尺寸

6. **主题适配**: 组件完全基于设计系统 token，会自动适配不同主题

## 更新日志

### v1.0.0

- ✅ 初始版本发布
- ✅ 支持基础列表展示
- ✅ 支持自定义尺寸
- ✅ 支持空数据安全处理
