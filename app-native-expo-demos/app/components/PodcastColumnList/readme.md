# PodcastColumnList 播客列表组件

## 组件说明

PodcastColumnList 是一个垂直排列的播客列表组件，支持显示播客封面、标题、描述和元信息，并提供播放按钮交互。

## 组件特性

- 垂直列表布局，每个播客项包含封面、信息和播放按钮
- 支持自定义宽高
- 自动处理最后一项的分割线显示
- 支持播放按钮点击回调
- 使用 Design Token 确保样式一致性
- 支持无障碍访问

## Props 接口

```tsx
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  onPlayPress?: (podcast: TPodcastItem) => void;
}
```

## 数据类型定义

```tsx
type TMetaItem = {
  label?: string; // 标签文本，如 "集数："
  value?: string; // 值文本，如 "30集"
};

type TPodcastItem = {
  id?: string; // 播客唯一标识
  name?: string; // 播客名称
  description?: string; // 播客描述
  image?: string; // 播客封面图片URL
  meta?: TMetaItem[]; // 元信息列表（集数、更新频率等）
};

type TData = {
  title?: string; // 列表标题
  list?: TPodcastItem[]; // 播客列表数据
};
```

## 使用示例

```tsx
import PodcastColumnList from './PodcastColumnList';

const handlePlayPress = (podcast: TPodcastItem) => {
  console.log('播放播客:', podcast.name);
};

<PodcastColumnList data={podcastData} opts={{ width: 300, height: 376 }} onPlayPress={handlePlayPress} />;
```

## Mock Data JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "播客列表标题"
    },
    "list": {
      "type": "array",
      "description": "播客列表数据",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "播客唯一标识"
          },
          "name": {
            "type": "string",
            "description": "播客名称"
          },
          "description": {
            "type": "string",
            "description": "播客描述"
          },
          "image": {
            "type": "string",
            "format": "uri",
            "description": "播客封面图片URL"
          },
          "meta": {
            "type": "array",
            "description": "播客元信息列表",
            "items": {
              "type": "object",
              "properties": {
                "label": {
                  "type": "string",
                  "description": "元信息标签"
                },
                "value": {
                  "type": "string",
                  "description": "元信息值"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Mock Data 示例

```tsx
const podcastData = {
  title: '播客列表',
  list: [
    {
      id: '1',
      name: 'AI 行业速报',
      description: '聚焦全球AI行业动态解析',
      image: 'https://picsum.photos/80/80?random=1',
      meta: [
        { label: '集数：', value: '30集' },
        { label: '更新：', value: '每周一' },
      ],
    },
    {
      id: '2',
      name: '五分钟读论文',
      description: '快速解读AI顶会核心论文',
      image: 'https://picsum.photos/80/80?random=2',
      meta: [
        { label: '集数：', value: '25集' },
        { label: '更新：', value: '每周三' },
        { label: '时长：', value: '5-10分钟' },
      ],
    },
    {
      id: '3',
      name: '商业碰撞思想',
      description: '深度对话商业与科技前沿',
      image: 'https://picsum.photos/80/80?random=3',
      meta: [
        { label: '集数：', value: '42集' },
        { label: '更新：', value: '每周五' },
      ],
    },
    {
      id: '4',
      name: '天真不天真',
      description: '一档由史炎主理的脱口秀播客',
      image: 'https://picsum.photos/80/80?random=4',
      meta: [
        { label: '集数：', value: '18集' },
        { label: '更新：', value: '每周一' },
        { label: '主播：', value: '史炎' },
      ],
    },
  ],
};
```

## 组件配置选项

| 属性        | 类型             | 默认值     | 说明             |
| ----------- | ---------------- | ---------- | ---------------- |
| data.title  | string           | '播客列表' | 列表标题         |
| data.list   | TPodcastItem[]   | -          | 播客数据列表     |
| opts.width  | string \| number | 300        | 组件宽度         |
| opts.height | string \| number | 376        | 组件高度         |
| onPlayPress | function         | -          | 播放按钮点击回调 |

## 样式特性

- 使用 CardContainer 作为外层容器
- 播客封面尺寸：80x80px，支持圆角
- 自动处理文本溢出（单行显示）
- 最后一项自动隐藏分割线
- 播放按钮使用 40px 的圆形图标
- 支持响应式布局

## 无障碍支持

- 播放按钮包含 `accessibilityLabel`
- 支持屏幕阅读器
- 合理的焦点顺序

## 注意事项

1. 所有数据字段都是可选的，组件会自动处理空值情况
2. 图片建议使用 80x80px 的正方形尺寸以获得最佳显示效果
3. meta 数组支持任意数量的元信息项
4. 组件高度会根据内容自动调整，建议设置合适的容器高度
