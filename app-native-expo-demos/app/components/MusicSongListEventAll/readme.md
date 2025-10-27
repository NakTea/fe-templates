# MusicSongList 组件说明文档

## 组件概述

`MusicSongList` 是一个音乐播放列表组件，用于展示音乐历史播放记录。组件支持显示歌曲封面、标题、艺术家、时长、音乐来源等信息，并提供可配置的播放按钮。

## 组件特性

- 📱 响应式设计，支持自定义宽高
- 🎵 展示音乐专辑封面、歌曲信息
- 🎨 支持主题配置
- 🔘 可配置的播放/暂停按钮
- 📱 滚动列表支持
- 🏷️ 音乐来源标识显示

## 使用示例

```typescript
import MusicSongList from './MusicSongList';

const App = () => {
  const musicData = {
    title: '历史播放记录',
    subtitle: '共10首歌曲',
    buttons: [
      {
        icon: 'systemPlayCircle',
        activeIcon: 'systemPauseCircle',
        type: 'secondary',
        event: {
          action: 'play',
          type: 'music_control'
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
      },
      // ... 更多歌曲
    ],
  };

  return (
    <MusicSongList
      data={musicData}
      opts={{ width: '100%', maxHeight: 400 }}
    />
  );
};
```

## Props 接口

```typescript
interface IProps {
  data?: TData; // 音乐列表数据
  opts?: {
    // 组件配置选项
    width?: string | number; // 组件宽度，默认 360
    height?: string | number; // 组件高度，默认 376
  };
}
```

## 数据类型定义

```typescript
// 按钮配置类型
type TButtonConfig = {
  icon?: string; // 默认图标
  activeIcon?: string; // 激活状态图标
  type?: 'primary' | 'secondary' | 'tertiary'; // 按钮类型
  event?: Record<string, any>; // 自定义原子能力事件
};

// 歌曲数据类型
type TSongItem = {
  id?: string; // 歌曲唯一标识
  title?: string; // 歌曲标题
  artist?: string; // 艺术家名称
  image?: string; // 专辑封面URL
  duration?: string; // 歌曲时长 (MM:SS格式)
  source?: {
    // 音乐来源
    icon?: string; // 来源平台图标
    name?: string; // 来源平台名称
  };
  active?: boolean; // 是否为当前播放歌曲
};

// 组件数据类型
type TData = {
  title?: string; // 列表标题
  subtitle?: string; // 列表副标题
  buttons?: TButtonConfig[]; // 按钮配置数组
  list?: TSongItem[]; // 歌曲列表
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MusicSongList Data Schema",
  "description": "音乐播放列表组件的数据结构定义",
  "required": ["title", "subtitle", "buttons", "list"],
  "properties": {
    "title": {
      "type": "string",
      "description": "列表标题",
      "example": "历史播放记录"
    },
    "subtitle": {
      "type": "string",
      "description": "列表副标题，通常显示歌曲数量等信息",
      "example": "共10首歌曲"
    },
    "buttons": {
      "type": "array",
      "description": "按钮配置数组，用于定义列表项的操作按钮",
      "minItems": 1,
      "maxItems": 1,
      "items": {
        "type": "object",
        "required": ["icon", "type", "event"],
        "properties": {
          "icon": {
            "type": "string",
            "description": "按钮默认状态的图标标识符",
            "examples": ["systemPlayCircle", "systemPauseCircle"]
          },
          "activeIcon": {
            "type": "string",
            "description": "按钮激活状态的图标标识符",
            "examples": ["systemPauseCircle", "systemPlayCircle"]
          },
          "type": {
            "type": "string",
            "enum": ["primary", "secondary", "text"],
            "description": "按钮样式类型",
            "default": "secondary"
          },
          "event": {
            "type": "object",
            "description": "自定义原子能力事件定义，可包含任意属性",
            "additionalProperties": true,
            "examples": [
              {
                "action": "play",
                "type": "music_control"
              }
            ]
          }
        },
        "additionalProperties": false
      }
    },
    "list": {
      "type": "array",
      "description": "歌曲列表数据",
      "items": {
        "type": "object",
        "required": ["id", "title", "artist", "image", "duration", "source", "active"],
        "properties": {
          "id": {
            "type": "string",
            "description": "歌曲的唯一标识符",
            "example": "1"
          },
          "title": {
            "type": "string",
            "description": "歌曲名称",
            "example": "长安的荔枝 原声带"
          },
          "artist": {
            "type": "string",
            "description": "艺术家或演唱者名称",
            "example": "周深摩登兄弟刘宇宁"
          },
          "image": {
            "type": "string",
            "format": "uri",
            "description": "专辑封面图片的URL地址",
            "example": "https://example.com/cover.png"
          },
          "duration": {
            "type": "string",
            "pattern": "^\\d{2}:\\d{2}$",
            "description": "歌曲时长，格式为 MM:SS",
            "example": "04:32"
          },
          "source": {
            "type": "object",
            "description": "音乐来源平台信息",
            "required": ["icon", "name"],
            "properties": {
              "icon": {
                "type": "string",
                "description": "来源平台的图标标识符"
              },
              "name": {
                "type": "string",
                "description": "来源平台的显示名称"
              }
            },
            "additionalProperties": false
          },
          "active": {
            "type": "boolean",
            "description": "是否为当前正在播放的歌曲",
            "default": false
          }
        },
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false
}
```

## 事件处理

组件内部会处理按钮点击事件，当用户点击歌曲项的播放按钮时，会在控制台输出以下信息：

```javascript
{
  song: TSongItem,      // 被点击的歌曲信息
  index: number,        // 歌曲在列表中的索引
  buttonConfig: TButtonConfig  // 按钮配置信息
}
```

## 样式定制

组件使用 `useFlexUIConfig` 主题系统，支持以下样式定制：

- 文本颜色：`textTitle`、`textPrimary`、`textSecondary`
- 间距：`spaceElementsXxs`、`spaceElementsS`、`spaceElementsM`
- 图标尺寸：`sizeIconXl`
- 圆角：`radiusImageS`
- 分割线：`dividerList`
- 字体样式：`cnHeadlineXsStrong`、`cnBodyS`

## 注意事项

1. **图标依赖**：组件依赖 `IconFont` 组件，确保相关图标资源已正确配置
2. **图片加载**：专辑封面图片需要是有效的URL地址
3. **按钮配置**：目前只支持使用 `buttons` 数组的第一个配置作为所有歌曲项的按钮样式
4. **滚动性能**：对于大量歌曲列表，建议考虑虚拟滚动优化
5. **主题系统**：组件需要在 FlexUI 主题提供者包裹下使用
