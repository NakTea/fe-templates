# MusicSongList 组件说明文档

## 组件概述

MusicSongList 是一个音乐歌曲列表组件，用于展示音乐播放列表，包含歌曲信息、专辑封面、播放控制和多平台音乐来源标识。支持热词语音控制和原子能力事件处理。

## 组件特性

- 📱 响应式布局，支持自定义宽高
- 🎵 完整的音乐信息展示（标题、艺术家、时长、封面）
- 🎨 多平台音乐来源标识（Apple Music、Spotify、YouTube Music等）
- 🔊 语音热词控制支持
- ⚡ 原子能力事件处理
- 📜 可滚动的歌曲列表
- 🎯 点击区域优化（左侧信息区域和右侧播放按钮）
- 🎪 流畅的动画效果

## 使用示例

```typescript
import MusicSongList from './MusicSongList';

const App = () => {
  const templateData = {
    opts: {
      width: '100%',
      maxHeight: 400,
    },
    data: {
      title: '历史播放记录',
      subtitle: '共10首歌曲',
      buttons: [
        {
          id: '1',
          deeplink: 'https://music.163.com/#/song?id=1389070',
          index: 1,
          knowledge_base: [{
            id: '1',
            deeplink: 'https://music.163.com/#/song?id=1389070'
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
                      synonyms: ['播放'],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      list: [
        {
          id: '1',
          title: '长安的荔枝 原声带',
          artist: '周深摩登兄弟刘宇宁',
          image: 'https://example.com/cover1.png',
          duration: '04:32',
          source: {
            icon: 'sourceAppleFill',
            name: 'Apple Music',
          },
          active: false,
          deeplink: 'https://music.163.com/#/song?id=1389070',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第1首音乐',
                synonyms: ['播放周深的歌曲', '播放长安的荔枝'],
              },
            ],
          },
        },
      ],
    },
  };

  return <MusicSongList {...templateData} />;
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
  atomicEvents: any;
  nativeData: object;
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

// 按钮数据类型
type TButtonConfig = {
  id: string; // 按钮唯一标识
  deeplink: string; // 按钮深链接
  index: 1; // 固定值1，表示按钮索引
  knowledge_base: TKnowledgeBaseItem[]; // 知识库对象数组
  event?: Record<string, any>; // 原子能力event专用配置
};

// 歌曲数据类型
type TSongItem = {
  id?: string; // 歌曲唯一标识
  deeplink?: string; // 歌曲深链接
  title?: string; // 歌曲标题
  artist?: string; // 艺术家名称
  image?: string; // 专辑封面图片URL
  duration?: string; // 歌曲时长
  source?: {
    icon?: string; // 音乐来源图标
    name?: string; // 音乐来源名称
  };
  active?: boolean; // 是否为当前播放状态
  hotwords?: {
    scenes: string; // 热词专用配置 - 场景
    names: Array<{
      name: string; // 热词名称
      synonyms: string[]; // 同义词列表
    }>;
  };
};

// 组件数据类型
type TData = {
  title?: string; // 列表标题
  subtitle?: string; // 列表副标题
  buttons?: TButtonConfig[]; // 按钮配置，用于定义每个item的按钮样式和事件
  list?: TSongItem[]; // 歌曲列表
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MusicSongList Data Schema",
  "description": "音乐歌曲列表组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "列表标题"
        },
        "subtitle": {
          "type": "string",
          "description": "列表副标题",
          "pattern": "^共\\d+首歌曲$"
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
                "description": "按钮深链接"
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
        "list": {
          "type": "array",
          "description": "歌曲列表",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "歌曲唯一标识"
              },
              "deeplink": {
                "type": "string",
                "description": "歌曲深链接"
              },
              "title": {
                "type": "string",
                "description": "歌曲标题"
              },
              "artist": {
                "type": "string",
                "description": "艺术家名称"
              },
              "image": {
                "type": "string",
                "description": "专辑封面图片URL"
              },
              "duration": {
                "type": "string",
                "description": "歌曲时长"
              },
              "source": {
                "type": "object",
                "description": "音乐来源信息",
                "properties": {
                  "icon": {
                    "type": "string",
                    "description": "音乐来源图标"
                  },
                  "name": {
                    "type": "string",
                    "description": "音乐来源名称"
                  }
                }
              },
              "active": {
                "type": "boolean",
                "description": "是否为当前播放状态"
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

组件支持以下事件处理机制：

1. **播放按钮点击**：触发原子能力事件，执行播放控制
2. **左侧区域点击**：点击专辑封面和歌曲信息区域，与播放按钮效果相同
3. **热词语音控制**：支持语音指令控制播放
4. **原子能力事件**：通过 `sendMsgToNative` 与原生层通信
5. **知识库数据传递**：
   - 通过 `index` 和 `knowledge_base` 字段传递结构化数据
   - `index` 固定为1，标识按钮位置
   - `knowledge_base` 为对象数组，包含相关歌曲信息

### 事件流程

```typescript
// 点击事件处理
handleItemButtonPress(song) -> fillTemplateByData -> sendMsgToNative

// 热词事件处理
toRegistHotwords() -> 注册热词 -> 语音触发 -> callRnMethod
```

## 样式定制

组件使用主题系统进行样式定制，支持以下主题令牌：

- `textTitle`：标题文字颜色
- `textPrimary`：主要文字颜色
- `textSecondary`：次要文字颜色
- `dividerList`：列表分割线颜色
- `spaceElementsXxs/S/M`：间距规范
- `sizeIconXl`：图标大小
- `radiusImageS`：图片圆角
- `cnHeadlineXsStrong`：标题字体样式
- `cnBodyS`：正文字体样式

## 注意事项

1. **数据安全性**：组件对所有数据进行了安全解构，避免空值错误
2. **热词注册**：需要在数据传输完毕后（`isEnded=true`）才进行热词注册
3. **图标支持**：音乐来源图标需要在图标库中预定义
4. **性能优化**：长列表使用了 ScrollView 并关闭了垂直滚动指示器
5. **事件处理**：左侧点击区域和播放按钮具有相同的事件处理逻辑
6. **动画效果**：使用 AnimationFadeSlide 组件提供流畅的进入动画
7. **原子能力**：事件配置中的 `hotwords` 和 `fieldMapping` 字段在实际执行时会被删除
8. **知识库数组**：`knowledge_base` 必须为数组格式，即使只有一个项目也需要包装在数组中
9. **索引值限制**：`index` 字段固定为1，不支持其他数值
10. **数据关联**：`knowledge_base` 中的项目应与 `list` 中的歌曲数据相对应
