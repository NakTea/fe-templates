# PodcastList 组件说明文档

## 组件概述

PodcastList 是一个用于展示播客列表的 React Native 组件，支持播客的展示、播放控制和语音热词交互功能。组件提供了丰富的播客信息展示，包括封面图片、标题、时长、发布时间和来源平台等。

## 组件特性

- 📱 响应式布局，支持自定义宽度和高度
- 🎵 播客播放控制，支持点击播放
- 🎨 主题化样式系统，自动适配设计规范
- 🔊 语音热词支持，可通过语音指令控制播放
- 📋 列表滚动展示，支持多个播客项目
- 🖼️ 播客封面图片展示
- 🏷️ 播客来源平台标识（YouTube、Spotify、Apple Podcasts等）
- ⚡ 动画效果支持，提升用户体验

## 使用示例

```typescript
import PodcastList from './PodcastList';

const data = {
  title: '为您推荐以下播客',
  buttons: [
    {
      id: '1',
      event: {
        set: [
          {
            name: 'setPlayingPodcast',
            trigger: 'native',
            type: 'set',
            input: {
              episodeId: '$id',
            },
            hotwords: {
              scenes: 'audio',
              names: [
                {
                  name: '播放播客',
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
      title: '播客标题',
      image: 'https://example.com/cover.png',
      date: '今天',
      duration: '58分钟',
      album: '专辑名称',
      hotwords: {
        scenes: 'audio',
        names: [
          {
            name: '播放第1个播客',
            synonyms: ['播客标题'],
          },
        ],
      },
    },
  ],
};

<PodcastList
  data={data}
  opts={{ width: '100%', maxHeight: 376 }}
  sendMsgToNative={handleNativeMessage}
  isEnded={true}
  messageData={{}}
/>
```

## 数据映射关系

```typescript
const data = {
  title: '为您推荐以下播客',
  buttons: [
    {
      id: '{{episodeId}}', // 单集播客ID
      event: {
        set: [
          {
            name: 'setPlayingPodcast',
            trigger: 'native',
            type: 'set',
            input: {
              episodeId: '$id',
            },
            hotwords: {
              scenes: 'audio',
              names: [
                {
                  name: '播放播客',
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
      id: '{{episodeId}}',
      title: '{{episodeName}}',
      image: 'https://example.com/cover.png',
      date: '{{updateTime}}', // 今天
      duration: '{{episodeDuration}}', // 58分钟
      album: '{{albumName}}',
      hotwords: {
        scenes: 'audio',
        names: [
          {
            name: '播放第1个播客',
            synonyms: ['播客标题'],
          },
        ],
      },
    },
  ],
};
```

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
  };
  sendMsgToNative: (msg: any) => void;
  isEnded: boolean;
  messageData: object;
}
```

## 数据类型定义

```typescript
// 按钮配置类型
type TButtonConfig = {
  id: string; // 按钮唯一标识
  event?: Record<string, any>; // 原子能力event专用配置
};

// 播客项目类型
type TPodcastItem = {
  id?: string; // 播客唯一标识
  title?: string; // 播客标题
  hotwords?: Record<string, any>; // 热词专用配置
  image?: string; // 封面图片URL
  duration?: string; // 播放时长
  date?: string; // 发布日期
  album?: string; // 播客来源专辑
};

// 组件数据类型
type TData = {
  title?: string; // 列表标题
  list?: TPodcastItem[]; // 播客列表数据
  buttons?: TButtonConfig[]; // 按钮配置列表
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "PodcastList Data Schema",
  "description": "播客列表组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "列表标题"
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
              "title": {
                "type": "string",
                "description": "播客标题"
              },
              "image": {
                "type": "string",
                "description": "封面图片URL"
              },
              "duration": {
                "type": "string",
                "description": "播放时长"
              },
              "date": {
                "type": "string",
                "description": "发布日期"
              },
              "album": {
                "type": "string",
                "description": "专辑名称"
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
              "event": {
                "type": "object",
                "description": "原子能力event专用配置",
                "additionalProperties": true
              }
            },
            "required": ["id"]
          }
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
        "height": {
          "oneOf": [{ "type": "string" }, { "type": "number" }],
          "description": "组件高度"
        },
        "maxHeight": {
          "oneOf": [{ "type": "string" }, { "type": "number" }],
          "description": "组件最大高度"
        }
      }
    }
  }
}
```

## 事件处理

组件支持以下事件处理机制：

1. **播客点击播放**：用户点击播客项目时触发 `handleItemButtonPress` 方法
2. **原子能力调用**：通过 `sendMsgToNative` 向原生端发送消息
3. **热词注册**：组件完成渲染后自动注册语音热词
4. **语音指令响应**：接收到语音指令时执行对应的播放操作

### 热词交互流程

1. 组件渲染完成后调用 `toRegistHotwords()` 注册热词
2. 用户通过语音说出热词（如"播放第1个播客"）
3. 系统识别热词并回调对应的处理方法
4. 执行播客播放操作

## 样式定制

组件使用主题化样式系统，通过 `useFlexUIConfig` 获取主题配置：

- **颜色系统**：`textPrimary`、`textSecondary`、`textTitle`、`iconPrimary` 等
- **间距系统**：`spaceElementsXxs`、`spaceElementsS`、`spaceElementsM`、`spaceElementsL`
- **字体系统**：`cnHeadlineXsStrong`、`cnBodyS`
- **圆角系统**：`radiusImageS`

## 注意事项

1. **数据传输完成标识**：组件依赖 `isEnded` 属性判断数据是否传输完成，只有在数据传输完成后才会注册热词
2. **热词配置格式**：热词配置需要符合特定的数据结构，包含 `scenes`、`names` 等字段
3. **原子能力调用**：原子能力的调用需要通过 `sendMsgToNative` 方法，确保与原生端的正确通信
4. **图片资源**：封面图片需要提供有效的 URL 地址
