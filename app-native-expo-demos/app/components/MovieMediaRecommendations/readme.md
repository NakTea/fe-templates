# MovieMediaRecommendations 组件说明文档

## 组件概述

MovieMediaRecommendations 是一个电影媒体推荐组件，用于展示热门电影推荐列表。组件支持网格布局展示电影海报、标题和评分，并提供点击交互和语音热词功能。

## 组件特性

- 🎬 电影网格布局展示
- 🖼️ 电影海报图片显示
- ⭐ 评分展示功能
- 🎯 点击交互支持
- 🗣️ 语音热词识别
- 📱 响应式布局设计
- ✨ 淡入滑动动画效果
- 🎨 主题系统集成

## 使用示例

```typescript
import MovieMediaRecommendations from './MovieMediaRecommendations';

const App = () => {
  const propsData = {
    opts: {
      width: '100%',
      maxHeight: 376,
    },
    data: {
      title: '热门电影推荐',
      buttons: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          index: 1,
          knowledge_base: [
            {
              id: '1',
              deeplink: 'https://www.douban.com/movie/subject/26311808/',
            },
            {
              id: '2',
              deeplink: 'https://www.douban.com/movie/subject/26380405/',
            },
          ],
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
      items: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          image: 'https://example.com/movie1.jpg',
          title: '奇幻漂流',
          rating: 9.1,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第1个',
                synonyms: ['奇幻漂流'],
              },
            ],
          },
        },
      ],
    },
  };

  return <MovieMediaRecommendations {...propsData} />;
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
// 电影项目数据类型
type TMovieItem = {
  id?: string; // 电影唯一标识
  deeplink?: string; // 跳转链接
  image?: string; // 电影海报图片URL
  title?: string; // 电影标题
  rating?: number; // 电影评分
  hotwords?: object; // 热词专用配置
};

// 知识库项目类型
type TKnowledgeBaseItem = {
  id?: string; // 项目唯一标识
  deeplink?: string; // 项目深链地址
};

// 按钮配置数据类型
type TButtonConfig = {
  id?: string; // 按钮唯一标识
  deeplink?: string; // 跳转链接
  index: 1; // 固定值1，表示按钮索引
  knowledge_base: TKnowledgeBaseItem[]; // 知识库对象数组
  event?: Record<string, any>; // 原子能力event专用配置
};

// 组件主数据类型
type TData = {
  title?: string; // 推荐列表标题
  items?: TMovieItem[]; // 电影列表数据
  buttons?: TButtonConfig[]; // 按钮配置列表
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MovieMediaRecommendations Data Schema",
  "description": "电影媒体推荐组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "推荐列表标题"
        },
        "items": {
          "type": "array",
          "description": "电影列表数据",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "电影唯一标识"
              },
              "deeplink": {
                "type": "string",
                "description": "跳转链接"
              },
              "image": {
                "type": "string",
                "format": "uri",
                "description": "电影海报图片URL"
              },
              "title": {
                "type": "string",
                "description": "电影标题"
              },
              "rating": {
                "type": "number",
                "minimum": 0,
                "maximum": 10,
                "description": "电影评分"
              },
              "hotwords": {
                "type": "object",
                "description": "热词专用配置",
                "additionalProperties": true
              }
            }
          }
        },
        "buttons": {
          "type": "array",
          "description": "按钮配置列表",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "按钮唯一标识"
              },
              "deeplink": {
                "type": "string",
                "description": "跳转链接"
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

## 事件处理

组件支持以下事件处理机制：

1. **点击事件处理**：
   - 电影项目点击触发 `onItemPress` 方法
   - 执行按钮配置中的原子能力事件
   - 通过 `sendMsgToNative` 与原生通信

2. **热词识别**：
   - 组件加载完成后自动注册热词
   - 支持语音指令触发电影播放
   - 热词配置支持同义词映射

3. **原生方法调用**：
   - 支持通过 `messageData` 接收原生调用
   - 实现 `handleItemButtonPress` 方法处理热词触发

4. **知识库数据传递**：
   - 通过 `index` 和 `knowledge_base` 字段传递结构化数据
   - `index` 固定为1，标识按钮位置
   - `knowledge_base` 为对象数组，包含多个相关电影信息

## 样式定制

组件使用 FlexUI 主题系统，支持以下样式定制：

- **文字样式**：标题、副标题、正文等不同层级的文字样式
- **颜色系统**：主色调、次要色调、警告色调等
- **间距系统**：统一的间距规范
- **圆角系统**：图片圆角等视觉元素

## 注意事项

1. **数据安全**：组件对所有 props 进行安全解构，避免空值错误
2. **性能优化**：使用 `useEffect` 合理控制副作用执行时机
3. **热词注册**：需要在 `isEnded` 为 true 时才进行热词注册
4. **图片处理**：电影海报支持网络图片，建议使用 CDN 加速
5. **交互反馈**：点击时使用 `activeOpacity` 提供视觉反馈
6. **文本截断**：电影标题过长时自动截断并显示省略号
7. **知识库数组**：`knowledge_base` 必须为数组格式，支持包含多个电影项目
8. **索引值限制**：`index` 字段固定为1，不支持其他数值
9. **数据关联**：`knowledge_base` 中的项目应与 `items` 列表中的电影数据相对应