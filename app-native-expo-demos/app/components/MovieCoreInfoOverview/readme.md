# MovieCoreInfoOverview 组件说明文档

## 组件概述

MovieCoreInfoOverview 是一个电影核心信息展示组件，用于显示电影的基本信息，包括标题、海报、评分、导演主演等标签信息。组件支持点击交互、热词语音控制，并具有优雅的动画效果。

## 组件特性

- 🎬 电影信息展示：标题、海报、评分、标签等完整信息
- ⭐ 星级评分：支持5星制评分显示
- 🎵 热词语音控制：支持语音指令交互
- 🎨 主题适配：完全适配设计系统主题
- 📱 响应式布局：左右分栏布局，适配不同屏幕
- ✨ 动画效果：渐入滑动动画增强用户体验
- 🔗 深链跳转：支持点击跳转和事件触发

## 使用示例

```typescript
import MovieCoreInfoOverview from './MovieCoreInfoOverview';

const App = () => {
  const propsData = {
    opts: { width: '100%' },
    data: {
      id: '1',
      deeplink: 'https://www.douban.com/movie/subject/26311808/',
      title: '星际远航评分',
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/v2-3.jpg',
      rating: 9.6,
      labels: [
        {
          label: '导演',
          value: '克里斯托弗·诺兰',
        },
        {
          label: '主演',
          value: '马修·麦康纳 / 安妮·海瑟薇 / 杰西卡·查斯坦 / 迈克尔·凯恩',
        },
      ],
      buttons: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          index: 1,
          knowledge_base: [{
            id: '1',
            deeplink: 'https://www.douban.com/movie/subject/26311808/',
          }],
          event: {
            set: [
              {
                name: 'setPlayingVideo',
                trigger: 'native',
                type: 'set',
                input: {
                  index: '$index',
                  knowledge_base: '$knowledge_base'
                },
                fieldMapping: {
                  data: {
                    currentId: '$data.currentSong.id',
                  },
                },
                hotwords: {
                  scenes: 'video',
                  names: [
                    {
                      name: '播放',
                      synonyms: ['播放电影'],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      hotwords: {
        scenes: 'video',
        names: [
          {
            name: '播放星际远航',
            synonyms: ['星际远航', '克里斯托弗·诺兰'],
          },
        ],
      },
    },
  };

  return <MovieCoreInfoOverview {...propsData} />;
};
```

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  sendMsgToNative: (msg: any) => void;
  isEnded: boolean;
  messageData: object;
}
```

## 数据类型定义

```typescript
// 标签信息类型
type TLabel = {
  label?: string; // 标签名称，如"导演"、"主演"
  value?: string; // 标签值，如具体的导演名、演员名
};

// 知识库项目类型
type TKnowledgeBaseItem = {
  id?: string; // 项目唯一标识
  deeplink?: string; // 项目深链地址
};

// 按钮配置类型
type TButtonConfig = {
  id?: string; // 按钮唯一标识
  deeplink?: string; // 深链跳转地址
  index: 1; // 固定值1，表示按钮索引
  knowledge_base: TKnowledgeBaseItem[]; // 知识库对象数组
  event?: Record<string, any>; // 原子能力event专用配置
};

// 组件数据类型
type TData = {
  title?: string; // 电影标题
  image?: string; // 电影海报图片URL
  rating?: number; // 电影评分（0-10分制）
  labels?: TLabel[]; // 电影标签信息数组
  buttons?: TButtonConfig[]; // 按钮配置数组
  hotwords?: object; // 热词专用配置
  id?: string; // 电影唯一标识
  deeplink?: string; // 电影详情页深链
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MovieCoreInfoOverview Data Schema",
  "description": "电影核心信息展示组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "电影标题"
        },
        "image": {
          "type": "string",
          "format": "uri",
          "description": "电影海报图片URL"
        },
        "rating": {
          "type": "number",
          "minimum": 0,
          "maximum": 10,
          "description": "电影评分（0-10分制）"
        },
        "labels": {
          "type": "array",
          "description": "电影标签信息数组",
          "items": {
            "type": "object",
            "properties": {
              "label": {
                "type": "string",
                "description": "标签名称，如'导演'、'主演'"
              },
              "value": {
                "type": "string",
                "description": "标签值，如具体的导演名、演员名"
              }
            }
          }
        },
        "buttons": {
          "type": "array",
          "description": "按钮配置数组",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "按钮唯一标识"
              },
              "deeplink": {
                "type": "string",
                "format": "uri",
                "description": "深链跳转地址"
              },
              "index": {
                "type": "number",
                "enum": [1],
                "description": "固定值1，表示按钮索引"
              },
              "knowledge_base": {
                "type": "array",
                "description": "知识库对象数组",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "知识库项目唯一标识"
                    },
                    "deeplink": {
                      "type": "string",
                      "format": "uri",
                      "description": "知识库项目深链地址"
                    }
                  }
                }
              },
              "event": {
                "type": "object",
                "description": "原子能力event专用配置",
                "additionalProperties": true
              }
            }
          }
        },
        "hotwords": {
          "type": "object",
          "description": "热词专用配置",
          "additionalProperties": true
        },
        "id": {
          "type": "string",
          "description": "电影唯一标识"
        },
        "deeplink": {
          "type": "string",
          "format": "uri",
          "description": "电影详情页深链"
        }
      }
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "properties": {
        "width": {
          "oneOf": [{ "type": "string" }, { "type": "number" }],
          "description": "组件宽度"
        },
        "maxHeight": {
          "oneOf": [{ "type": "string" }, { "type": "number" }],
          "description": "组件最大高度"
        }
      },
      "additionalProperties": true
    }
  }
}
```

## 事件处理

组件支持以下事件处理机制：

1. **点击事件**：
   - 点击海报图片触发 `onItemPress` 方法
   - 执行按钮配置中的原子能力事件
   - 支持深链跳转

2. **热词语音控制**：
   - 组件加载完成后自动注册热词
   - 支持语音指令触发播放等操作
   - 热词配置支持同义词匹配

3. **原子能力集成**：
   - 通过 `sendMsgToNative` 与原生能力通信
   - 支持数据模板填充和字段映射
   - 支持多种触发方式（native、RN方法调用）

4. **知识库数据传递**：
   - 通过 `index` 和 `knowledge_base` 字段传递结构化数据
   - `index` 固定为1，标识按钮位置
   - `knowledge_base` 为对象数组，包含相关电影信息

## 样式定制

组件完全基于设计系统主题进行样式定制：

- **颜色系统**：使用主题中的 `textTitle`、`textPrimary`、`textSecondary` 等语义化颜色
- **字体系统**：使用 `cnHeadlineXsStrong`、`cnDisplayLStrong`、`cnBodyM` 等标准字体样式
- **间距系统**：使用 `spaceElementsS`、`spaceElementsM`、`spaceElementsL` 等标准间距
- **圆角系统**：使用 `radiusImageS` 等标准圆角值

## 注意事项

1. **图片资源**：确保海报图片URL有效且支持跨域访问
2. **评分范围**：评分值建议在0-10之间，组件会显示5星制视觉效果
3. **热词配置**：热词注册需要在组件数据传输完毕后进行，依赖 `isEnded` 状态
4. **按钮事件**：按钮配置中的event字段支持复杂的原子能力配置，需要正确配置input和fieldMapping
5. **标签显示**：标签信息最多显示2行，超出部分会被截断
6. **动画性能**：组件使用了多个动画效果，在低端设备上可能需要考虑性能优化
7. **知识库数组**：`knowledge_base` 必须为数组格式，即使只有一个项目也需要包装在数组中
8. **索引值限制**：`index` 字段固定为1，不支持其他数值