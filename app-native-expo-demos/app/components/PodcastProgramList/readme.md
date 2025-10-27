# PodcastProgramList 组件说明文档

## 组件概述

`PodcastProgramList` 是一个播客节目列表组件，支持多标签页切换，展示播客节目信息，包括封面图片、标题、时长、来源等信息，并提供播放功能。

## 功能特性

- ✅ 多标签页切换展示不同分类的播客节目
- ✅ 播客节目信息展示（封面、标题、时长、来源）
- ✅ 播放按钮交互
- ✅ 响应式布局设计
- ✅ 支持多种播客来源（Apple、Spotify、YouTube、网易云音乐等）
- ✅ 自适应容器尺寸

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  onPlayPress?: (item: TList) => void;
}
```

### 参数说明

| 参数        | 类型             | 必填 | 默认值 | 说明             |
| ----------- | ---------------- | ---- | ------ | ---------------- |
| data        | TData            | 否   | -      | 播客数据         |
| opts        | object           | 否   | -      | 组件配置选项     |
| opts.width  | string \| number | 否   | 440    | 组件宽度         |
| opts.height | string \| number | 否   | 376    | 组件高度         |
| onPlayPress | function         | 否   | -      | 播放按钮点击回调 |

## 数据类型定义

```typescript
// 播客来源类型
type TPodcastSource = 'apple' | 'spotify' | 'youtube' | 'netease' | 'music';

// 播客项数据类型
type TList = {
  id?: string;
  title?: string;
  duration?: string;
  source?: TPodcastSource;
  image?: string;
};

// 标签页数据类型
type TTabItem = {
  key: string;
  label: string;
  list?: TList[];
};

// 组件数据类型
type TData = {
  tabs?: TTabItem[];
  defaultTabKey?: string;
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "tabs": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "key": {
                "type": "string",
                "description": "标签页唯一标识"
              },
              "label": {
                "type": "string",
                "description": "标签页显示名称"
              },
              "list": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "播客节目唯一标识"
                    },
                    "title": {
                      "type": "string",
                      "description": "播客节目标题"
                    },
                    "duration": {
                      "type": "string",
                      "description": "播客时长，如：'45:30'"
                    },
                    "source": {
                      "type": "string",
                      "description": "播客来源平台"
                    },
                    "image": {
                      "type": "string",
                      "format": "uri",
                      "description": "播客封面图片URL"
                    }
                  }
                }
              }
            },
            "required": ["key", "label"]
          }
        },
        "defaultTabKey": {
          "type": "string",
          "description": "默认激活的标签页key"
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

## Mock Data 示例

```json
{
  "data": {
    "tabs": [
      {
        "key": "recent",
        "label": "最近播放",
        "list": [
          {
            "id": "podcast_001",
            "title": "科技前沿：人工智能的未来发展趋势与挑战",
            "duration": "45:30",
            "source": "apple",
            "image": "https://picsum.photos/200/200?random=1"
          },
          {
            "id": "podcast_002",
            "title": "商业洞察：创业公司如何在竞争激烈的市场中脱颖而出",
            "duration": "32:15",
            "source": "spotify",
            "image": "https://picsum.photos/200/200?random=2"
          },
          {
            "id": "podcast_003",
            "title": "健康生活：现代人的压力管理与心理健康维护",
            "duration": "28:45",
            "source": "youtube",
            "image": "https://picsum.photos/200/200?random=3"
          }
        ]
      },
      {
        "key": "popular",
        "label": "热门推荐",
        "list": [
          {
            "id": "podcast_004",
            "title": "文化探索：传统文化在现代社会中的传承与创新",
            "duration": "52:20",
            "source": "netease",
            "image": "https://picsum.photos/200/200?random=4"
          },
          {
            "id": "podcast_005",
            "title": "投资理财：普通人的财富管理策略与风险控制",
            "duration": "38:10",
            "source": "music",
            "image": "https://picsum.photos/200/200?random=5"
          },
          {
            "id": "podcast_006",
            "title": "教育思考：数字化时代的学习方式变革",
            "duration": "41:55",
            "source": "apple",
            "image": "https://picsum.photos/200/200?random=6"
          }
        ]
      },
      {
        "key": "subscribed",
        "label": "我的订阅",
        "list": [
          {
            "id": "podcast_007",
            "title": "旅行见闻：探索世界各地的独特文化与风景",
            "duration": "35:40",
            "source": "spotify",
            "image": "https://picsum.photos/200/200?random=7"
          },
          {
            "id": "podcast_008",
            "title": "美食文化：从街头小吃到米其林餐厅的美食之旅",
            "duration": "29:25",
            "source": "youtube",
            "image": "https://picsum.photos/200/200?random=8"
          }
        ]
      }
    ],
    "defaultTabKey": "recent"
  },
  "opts": {
    "width": 440,
    "maxHeight": 376
  }
}
```

## 使用示例

```tsx
import PodcastProgramList from './PodcastProgramList';

const App = () => {
  const handlePlayPress = (item: TList) => {
    console.log('播放播客:', item);
    // 处理播放逻辑
  };

  return <PodcastProgramList data={mockData.data} opts={mockData.opts} onPlayPress={handlePlayPress} />;
};
```

## 设计规范

### 布局结构

- 顶部：标签页按钮组
- 主体：播客节目列表
- 每个节目项：左侧封面图 + 中间信息区 + 右侧播放按钮

### 视觉规范

- 封面图片：64x64px，圆角
- 标题：最多显示2行，超出省略
- 来源信息：时长 + 平台图标 + 平台名称
- 播放按钮：40px圆形图标按钮

### 交互规范

- 标签页切换：点击按钮切换内容
- 播放操作：点击播放按钮触发回调
- 按钮反馈：0.7透明度点击效果

## 支持的播客来源

| 来源           | 枚举值    | 图标              | 说明           |
| -------------- | --------- | ----------------- | -------------- |
| Apple Podcasts | `apple`   | sourceAppleFill   | 苹果播客       |
| Spotify        | `spotify` | sourceSpotifyFill | Spotify播客    |
| YouTube        | `youtube` | sourceYoutubeFill | YouTube播客    |
| 网易云音乐     | `netease` | sourceMusicFill   | 网易云音乐播客 |
| 音乐平台       | `music`   | sourceMusicFill   | 通用音乐平台   |

## 注意事项

1. **数据安全**：所有数据访问都使用可选链操作符，确保组件不会因数据缺失而崩溃
2. **性能优化**：使用key属性优化列表渲染性能
3. **响应式设计**：支持自定义宽高，适配不同屏幕尺寸
4. **无障碍访问**：提供合适的点击区域和视觉反馈
5. **图片加载**：建议使用合适尺寸的图片以优化加载性能
6. **标签页状态**：组件内部维护当前激活的标签页状态
7. **空数据处理**：当标签页或列表数据为空时，组件会优雅降级

## 样式定制

组件使用Design Token系统，主要使用的token包括：

- `textPrimary` / `textSecondary`：文字颜色
- `iconPrimary`：图标颜色
- `dividerList`：分割线颜色
- `spaceElements*`：间距规范
- `radiusImageS`：图片圆角
- `cnHeadlineXsStrong` / `cnBodyS`：字体样式
