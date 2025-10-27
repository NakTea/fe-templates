# MusicFeaturedAlbums 组件说明文档

## 组件概述

MusicFeaturedAlbums 是一个音乐艺术家专辑展示组件，用于展示艺术家的基本信息和代表专辑列表。组件支持横向滚动浏览专辑，并集成了语音交互功能，用户可以通过热词语音指令播放指定专辑。

## 组件特性

- 📱 响应式布局，支持自定义宽高
- 🎵 艺术家信息展示（头像、姓名、简介）
- 🎨 专辑横向滚动展示
- 🗣️ 语音热词交互支持
- ⚡ 原子能力事件系统集成
- 🎭 流畅的动画过渡效果
- 🎯 主题系统适配

## 使用示例

```typescript
import MusicFeaturedAlbums from './MusicFeaturedAlbums';

const App = () => {
  const propsData = {
    opts: {
      width: '100%',
      maxHeight: 376,
    },
    data: {
      title: 'Lorde',
      description: '艾拉·玛莉亚',
      image: 'https://example.com/artist-avatar.jpg',
      itemsTitle: '代表专辑',
      buttons: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          index: 1,
          knowledge_base: [{
            id: '1',
            deeplink: 'https://www.douban.com/movie/subject/26311808/'
          }],
          event: {
            set: [
              {
                name: 'setPlayingSong',
                trigger: 'native',
                type: 'set',
                input: {
                  knowledge_base: '$knowledge_base',
                  index: '$index'
                },
                fieldMapping: {
                  data: {
                    currentId: '$data.currentSong.id',
                  },
                },
                hotwords: {
                  scenes: 'audio',
                  names: [
                    {
                      name: '播放专辑',
                      synonyms: ['Virgin'],
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
          deeplink: 'https://example.com/album/1',
          image: 'https://example.com/album-cover.jpg',
          title: 'Virgin',
          labels: ['10首', '2023年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第1张专辑',
                synonyms: ['Virgin'],
              },
            ],
          },
        },
      ],
    },
  };

  return <MusicFeaturedAlbums {...propsData} />;
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
// 专辑/歌曲项目数据类型
type TItem = {
  id?: string; // 项目唯一标识
  deeplink?: string; // 跳转链接
  image?: string; // 封面图片URL
  title?: string; // 标题
  labels?: string[]; // 标签信息（如歌曲数量、发行年份）
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
  title?: string; // 艺术家名称
  description?: string; // 艺术家描述/简介
  image?: string; // 艺术家头像URL
  buttons?: TButtonConfig[]; // 按钮配置列表
  itemsTitle?: string; // 专辑列表标题
  items?: TItem[]; // 专辑列表数据
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MusicFeaturedAlbums Data Schema",
  "description": "音乐艺术家专辑展示组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "艺术家名称"
        },
        "description": {
          "type": "string",
          "description": "艺术家描述/简介"
        },
        "image": {
          "type": "string",
          "description": "艺术家头像URL"
        },
        "itemsTitle": {
          "type": "string",
          "description": "专辑列表标题",
          "default": "代表专辑"
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
        },
        "items": {
          "type": "array",
          "description": "专辑列表数据",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "专辑唯一标识"
              },
              "deeplink": {
                "type": "string",
                "description": "专辑跳转链接"
              },
              "image": {
                "type": "string",
                "description": "专辑封面图片URL"
              },
              "title": {
                "type": "string",
                "description": "专辑标题"
              },
              "labels": {
                "type": "array",
                "description": "专辑标签信息（如歌曲数量、发行年份）",
                "items": {
                  "type": "string"
                }
              },
              "hotwords": {
                "type": "object",
                "description": "热词专用配置",
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

### 专辑点击事件

- **触发方式**: 点击专辑项目或语音热词指令
- **处理逻辑**:
  1. 解析按钮配置中的原子能力事件
  2. 使用专辑数据填充模板变量
  3. 通过 `sendMsgToNative` 发送事件到原生层

### 热词注册

- **注册时机**: 组件数据传输完毕后（`isEnded` 为 true）
- **热词类型**:
  - 专辑播放热词（如"播放第1张专辑"）
  - 艺术家相关热词（如"播放专辑"）
- **回调处理**: 支持原生事件调用和RN方法调用两种模式

### 原子能力集成

- **事件系统**: 基于 `event.set` 配置的原子能力
- **数据映射**: 支持模板变量替换（如 `$knowledge_base`、`$index`）
- **字段映射**: 支持 `fieldMapping` 数据字段映射

### 知识库数据传递

- **数据结构**: 通过 `index` 和 `knowledge_base` 字段传递结构化数据
- **索引标识**: `index` 固定为1，标识按钮位置
- **知识库内容**: `knowledge_base` 为对象数组，包含相关专辑信息

## 样式定制

组件使用主题系统进行样式定制，主要包括：

- **颜色系统**: `textTitle`、`textPrimary`、`containerSecondary` 等
- **间距系统**: `spaceElementsS`、`spaceCardPadding` 等
- **尺寸系统**: `sizeAvatarL`、`sizeComphM` 等
- **圆角系统**: `radiusImageS` 等
- **字体系统**: `cnDisplayXxsStrong`、`cnHeadlineXsStrong` 等

## 注意事项

1. **数据安全**: 组件对所有数据进行安全解构，避免空值错误
2. **热词配置**: `hotwords` 字段为专用配置，需要符合语音交互规范
3. **事件配置**: `event` 字段为原子能力专用配置，需要正确配置事件结构
4. **图片加载**: 确保提供的图片URL可访问，组件不处理加载失败情况
5. **横向滚动**: 专辑列表支持横向滚动，建议控制专辑数量以保证性能
6. **动画性能**: 组件使用了多个动画效果，在低端设备上可能影响性能
7. **原生通信**: 依赖 `sendMsgToNative` 方法与原生层通信，确保该方法正确实现
8. **知识库数组**: `knowledge_base` 必须为数组格式，即使只有一个项目也需要包装在数组中
9. **索引值限制**: `index` 字段固定为1，不支持其他数值
10. **数据关联**: `knowledge_base` 中的项目应与 `items` 列表中的专辑数据相对应