# MovieActorWorks 组件说明文档

## 组件概述

MovieActorWorks 是一个用于展示演员作品的电影列表组件，支持显示演员信息和相关电影作品列表，提供播放功能和热词语音交互能力。

## 组件特性

- 📱 响应式布局，支持自定义宽高
- 🎭 演员信息展示区域
- 🎬 电影作品列表展示
- 🎵 支持播放控制功能
- 🗣️ 热词语音交互支持
- 🎨 主题系统集成
- 📱 原生交互能力

## 使用示例

```typescript
import MovieActorWorks from './MovieActorWorks';

const App = () => {
  const propsData = {
    opts: {
      width: '100%',
      maxHeight: 376,
    },
    data: {
      buttons: [
        {
          id: 'movie1',
          deeplink: 'https://movie.douban.com/subject/26721705/',
          index: 1,
          knowledge_base: [{
            id: 'movie1',
            deeplink: 'https://movie.douban.com/subject/26721705/'
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
        { name: '大鹏' },
        { name: '白客' }
      ],
      list: [
        {
          id: 'movie1',
          title: '年会不能停！',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image35_1272-495.png',
          category: '剧情 / 喜剧',
          releaseDate: '2023.12.29 中国大陆上映',
          source: [
            {
              name: '豆瓣',
              icon: 'mediaDouban',
            },
          ],
          active: false,
        },
      ],
    },
  };

  return (
    <MovieActorWorks
      data={propsData.data}
      opts={propsData.opts}
      sendMsgToNative={(msg) => console.log(msg)}
      isEnded={true}
      messageData={{}}
    />
  );
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
// 演员信息类型
type TActorInfo = {
  name?: string; // 演员姓名
};

// 来源信息类型
type TSource = {
  name?: string; // 来源平台名称
  icon?: string; // 来源平台图标
};

// 知识库条目类型
type TKnowledgeBaseItem = {
  id?: string; // 知识库条目ID
  deeplink?: string; // 深度链接
};

// 电影项目类型
type TMovieItem = {
  id?: string; // 电影唯一标识
  title?: string; // 电影标题
  image?: string; // 电影海报图片URL
  category?: string; // 电影分类
  releaseDate?: string; // 上映日期
  source?: TSource[]; // 来源平台列表
  active?: boolean; // 是否为当前播放状态
  hotwords?: Record<string, any>; // 热词专用配置
};

// 按钮配置类型
type TButtonConfig = {
  id?: string; // 按钮唯一标识
  deeplink?: string; // 深度链接
  index: 1; // 固定值，按钮索引
  knowledge_base?: TKnowledgeBaseItem[]; // 知识库对象数组
  event?: Record<string, any>; // 原子能力event专用配置
};

// 主数据类型
type TData = {
  items?: TActorInfo[]; // 演员信息列表
  list?: TMovieItem[]; // 电影列表
  buttons?: TButtonConfig[]; // 按钮配置列表
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "MovieActorWorks Data Schema",
  "description": "电影演员作品组件数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "items": {
          "type": "array",
          "description": "演员信息列表",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "演员姓名"
              }
            }
          }
        },
        "list": {
          "type": "array",
          "description": "电影列表",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "电影唯一标识"
              },
              "title": {
                "type": "string",
                "description": "电影标题"
              },
              "image": {
                "type": "string",
                "description": "电影海报图片URL"
              },
              "category": {
                "type": "string",
                "description": "电影分类"
              },
              "releaseDate": {
                "type": "string",
                "description": "上映日期"
              },
              "source": {
                "type": "array",
                "description": "来源平台列表",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "来源平台名称"
                    },
                    "icon": {
                      "type": "string",
                      "description": "来源平台图标"
                    }
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
                "description": "深度链接"
              },
              "index": {
                "type": "number",
                "const": 1,
                "description": "固定值，按钮索引"
              },
              "knowledge_base": {
                "type": "array",
                "description": "知识库对象数组",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "知识库条目ID"
                    },
                    "deeplink": {
                      "type": "string",
                      "description": "深度链接"
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

### 播放事件

- **触发方式**：点击播放按钮或电影项
- **处理逻辑**：通过 `sendMsgToNative` 发送原子能力事件到原生端
- **数据转换**：使用 `fillTemplateByData` 进行模板数据填充，支持 `$index` 和 `$knowledge_base` 变量替换

### 热词注册

- **注册时机**：组件数据传输完毕后（`isEnded` 为 true 时）
- **热词来源**：buttons 配置和 list 项中的 hotwords 配置
- **回调处理**：支持原生事件调用和 RN 方法调用两种方式

### RN 方法调用

- **方法名**：`handleItemButtonPress`
- **触发条件**：接收到 `invokeRNMethod` 类型的消息
- **参数传递**：通过 messageData 传递调用参数

## 样式定制

组件使用 FlexUI 主题系统，支持以下样式定制：

- **颜色系统**：textPrimary, textTitle, textSecondary, containerSecondary, iconPrimary
- **间距系统**：spaceElementsXxs, spaceElementsXs, spaceElementsS, spaceElementsM
- **字体系统**：cnHeadlineXsStrong, cnBodyS
- **图标尺寸**：sizelconXs, sizeIconXl
- **容器样式**：spaceCardPaddingLeftRightXxxs, radiusImage

## 注意事项

1. **固定索引值**：buttons 配置中的 index 字段必须为固定值 1
2. **知识库配置**：knowledge_base 为对象数组，每个对象包含 id 和 deeplink 字段
3. **模板变量**：event 配置的 input 字段支持 `$index` 和 `$knowledge_base` 模板变量替换
4. **热词配置**：支持场景化热词识别，需要配置 scenes 和 names 字段
5. **原生交互**：组件依赖原生端的消息传递机制，确保 sendMsgToNative 方法正确实现