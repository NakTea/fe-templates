# MusicSimilarStyles 组件说明文档

## 组件概述

MusicSimilarStyles 是一个音乐相似风格推荐组件，用于展示音乐详情信息和推荐相似风格的音乐列表。组件支持音乐封面展示、基本信息显示、标签展示以及横向滚动的推荐列表，并集成了语音热词识别和原子能力调用功能。

## 组件特性

- 🎵 **音乐信息展示** - 展示音乐封面、标题、艺术家、发布日期等详细信息
- 🏷️ **标签系统** - 支持音乐风格标签的展示，如电子流行、未来贝斯等
- 📱 **横向推荐列表** - 提供相似风格音乐的横向滚动推荐
- 🗣️ **语音热词支持** - 集成语音识别，支持热词唤起音乐播放
- ⚡ **原子能力集成** - 支持原生事件调用和数据传递
- 🎨 **主题适配** - 完全适配 FlexUI 主题系统
- ✨ **动画效果** - 内置渐入滑动动画效果

## 使用示例

```typescript
import MusicSimilarStyles from './MusicSimilarStyles';

const App = () => {
  const propsData = {
    opts: {
      width: '100%',
    },
    data: {
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/image.cover_20.png',
      title: 'In the Name of Love',
      artist: 'Martin Garrix',
      date: '2019年11月29日',
      description: '© 2019 The Weeknd XO, Inc., marketed by Republic Records, a division of UMG Recordings, Inc.',
      tags: ['电子流行', '未来贝斯', '活力', '旅游', '放松'],
      index: 1,
      knowledge_base: [{
        id: '1',
        deeplink: 'https://www.douban.com/movie/subject/26311808/'
      }],
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
                  index: '$index',
                  knowledge_base: '$knowledge_base'
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
                      name: '播放音乐',
                      synonyms: ['In the Name of Love'],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      itemsTitle: '相似风格推荐',
      items: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_10.png',
          title: 'Save Your Tears',
          artist: 'The Weeknd',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: 'Save Your Tears',
                synonyms: ['The Weeknd'],
              },
            ],
          },
        }
      ]
    }
  };

  return <MusicSimilarStyles {...propsData} />;
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
// 知识库项目类型
type TKnowledgeBaseItem = {
  id?: string; // 项目唯一标识
  deeplink?: string; // 项目深链地址
};

// 按钮配置类型
type TButtonConfig = {
  id?: string; // 按钮ID
  deeplink?: string; // 深链接地址
  index: 1; // 固定值1，表示按钮索引
  knowledge_base: TKnowledgeBaseItem[]; // 知识库对象数组
  event?: Record<string, any>; // 原子能力event专用配置
};

// 相似歌曲类型
type TSimilarSong = {
  id?: string; // 歌曲ID
  deeplink?: string; // 深链接地址
  image?: string; // 歌曲封面图片URL
  title?: string; // 歌曲标题
  artist?: string; // 艺术家名称
  hotwords?: object; // 热词专用配置
};

// 主数据类型
type TData = {
  image?: string; // 主歌曲封面图片URL
  title?: string; // 主歌曲标题
  artist?: string; // 主歌曲艺术家
  date?: string; // 发布日期
  description?: string; // 描述信息
  tags?: string[]; // 音乐风格标签数组
  index: 1; // 固定值1，表示索引
  knowledge_base: TKnowledgeBaseItem[]; // 知识库对象数组
  itemsTitle?: string; // 推荐列表标题
  items?: TSimilarSong[]; // 推荐歌曲列表
  buttons?: TButtonConfig[]; // 按钮配置数组
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MusicSimilarStyles Data Schema",
  "description": "音乐相似风格推荐组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "image": {
          "type": "string",
          "description": "主歌曲封面图片URL"
        },
        "title": {
          "type": "string",
          "description": "主歌曲标题"
        },
        "artist": {
          "type": "string",
          "description": "主歌曲艺术家"
        },
        "date": {
          "type": "string",
          "description": "发布日期"
        },
        "description": {
          "type": "string",
          "description": "描述信息"
        },
        "tags": {
          "type": "array",
          "description": "音乐风格标签数组",
          "items": {
            "type": "string"
          }
        },
        "index": {
          "type": "number",
          "enum": [1],
          "description": "固定值1，表示索引"
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
        "itemsTitle": {
          "type": "string",
          "description": "推荐列表标题"
        },
        "items": {
          "type": "array",
          "description": "推荐歌曲列表",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "歌曲ID"
              },
              "deeplink": {
                "type": "string",
                "description": "深链接地址"
              },
              "image": {
                "type": "string",
                "description": "歌曲封面图片URL"
              },
              "title": {
                "type": "string",
                "description": "歌曲标题"
              },
              "artist": {
                "type": "string",
                "description": "艺术家名称"
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
          "description": "按钮配置数组",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "按钮ID"
              },
              "deeplink": {
                "type": "string",
                "description": "深链接地址"
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

1. **推荐歌曲点击事件**：点击推荐列表中的歌曲时，会触发 `onAlbumPress` 方法，执行配置的原子能力
2. **热词识别事件**：组件会自动注册热词，支持语音唤起音乐播放功能
3. **原生方法调用**：通过 `sendMsgToNative` 与原生端进行通信
4. **数据流转换**：使用 `fillTemplateByData` 进行数据模板填充
5. **知识库数据传递**：
   - 通过 `index` 和 `knowledge_base` 字段传递结构化数据
   - `index` 固定为1，标识索引位置
   - `knowledge_base` 为对象数组，包含相关音乐信息

热词注册流程：

- 主歌曲的热词通过 `buttons[0].event.set[0].hotwords` 配置
- 推荐歌曲的热词通过各个 `items[].hotwords` 配置
- 热词注册在 `isEnded` 为 true 时自动触发

## 样式定制

组件完全基于 FlexUI 主题系统，使用以下设计令牌：

- **颜色**：`textPrimary`、`textTitle`、`containerSecondary`
- **间距**：`spaceCardPadding`、`spaceElementsXXS`、`spaceElementsXs`、`spaceElementsS`、`spaceElementsM`
- **圆角**：`radiusImageS`、`spaceElementsXs`
- **字体**：`cnDisplayXxsStrong`、`cnBodyL`、`cnBodyS`、`cnHeadlineXsStrong`、`cnBodyM`

## 注意事项

1. **数据安全性**：组件对所有 props 进行了安全解构，避免空值错误
2. **文本溢出处理**：所有文本都设置了 `numberOfLines` 和 `ellipsizeMode` 来处理溢出
3. **热词注册时机**：热词注册在 `isEnded` 为 true 时触发，确保数据传输完毕
4. **原子能力配置**：`event`、`hotwords` 字段为专用配置，需要按照规范格式提供
5. **图片加载**：所有图片都设置了 `resizeMode="cover"` 确保显示效果
6. **横向滚动优化**：推荐列表使用 `ScrollView` 实现横向滚动，隐藏了滚动指示器
7. **按钮配置**：buttons 数组中的第一个按钮配置会被应用到推荐歌曲的点击事件中
8. **模板变量**：input 中的 `$index`、`$knowledge_base` 等变量会在运行时被实际数据替换
9. **知识库数组**：`knowledge_base` 必须为数组格式，即使只有一个项目也需要包装在数组中
10. **索引值限制**：`index` 字段固定为1，不支持其他数值
11. **数据关联**：`knowledge_base` 中的项目应与相关音乐数据相对应