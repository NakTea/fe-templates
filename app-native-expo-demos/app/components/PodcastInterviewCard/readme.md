# PodcastInterviewCard 播客访谈卡片组件

## 组件描述

PodcastInterviewCard 是一个播客访谈展示卡片组件，用于展示播客访谈的基本信息，包括标题、主播和嘉宾信息、访谈描述以及操作按钮。组件支持多用户展示，并在用户间显示声波图标以突出播客主题。

## Props 说明

| 属性 | 类型        | 必填 | 默认值 | 描述         |
| ---- | ----------- | ---- | ------ | ------------ |
| data | TData       | 否   | -      | 播客访谈数据 |
| opts | CardOptions | 否   | {}     | 卡片配置选项 |

### 类型定义

```typescript
interface TUser {
  name?: string; // 用户姓名
  role?: string; // 用户角色（如：主播、嘉宾）
  avatar?: string; // 用户头像URL
}

interface TButton {
  title?: string; // 按钮文本
  action?: string; // 按钮操作标识
  type?: 'primary' | 'secondary' | 'text'; // 按钮类型
  size?: 'large' | 'medium' | 'small'; // 按钮尺寸
  disabled?: boolean; // 是否禁用
  loading?: boolean; // 是否加载中
  icon?: React.ReactNode; // 按钮图标
  iconPosition?: 'left' | 'right'; // 图标位置
}

interface TData {
  title?: string; // 播客标题
  users?: TUser[]; // 参与用户列表
  desc?: string; // 播客描述
  buttons?: TButton[]; // 操作按钮列表
}

interface CardOptions {
  width?: string | number; // 卡片宽度
  height?: string | number; // 卡片高度
}
```

## Mock 数据示例

```typescript
const mockData = {
  data: {
    title: '本期《增长黑客笔记》嘉宾访谈',
    users: [
      {
        name: '李智',
        role: '主播：',
        avatar: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/profiles/person_cover_04.png',
      },
      {
        name: '王浩',
        role: '嘉宾：',
        avatar: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/profiles/person_cover_02.jpg',
      },
    ],
    desc: '创业最关键的不是你拥有什么资源，而是你如何利用现有资源去撬动一个更大的可能性。增长的本质就是不断寻找这种杠杆。',
    buttons: [
      {
        title: '开始收听',
        action: 'podcastPlay',
        type: 'primary',
        size: 'medium',
      },
      {
        title: '分享播客',
        action: 'share',
        type: 'secondary',
        size: 'medium',
        icon: 'systemShare',
        iconPosition: 'left',
      },
    ],
  },
  opts: {
    width: '100%',
    maxHeight: 400,
  },
};
```

## Props JSON Schema

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "播客标题"
        },
        "users": {
          "type": "array",
          "description": "参与用户列表",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "用户姓名"
              },
              "role": {
                "type": "string",
                "description": "用户角色"
              },
              "avatar": {
                "type": "string",
                "format": "uri",
                "description": "用户头像URL"
              }
            }
          }
        },
        "desc": {
          "type": "string",
          "description": "播客描述"
        },
        "buttons": {
          "type": "array",
          "description": "操作按钮列表",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "按钮文本"
              },
              "action": {
                "type": "string",
                "description": "按钮操作标识"
              },
              "type": {
                "type": "string",
                "enum": ["primary", "secondary", "text"],
                "description": "按钮类型",
                "default": "primary"
              },
              "size": {
                "type": "string",
                "enum": ["large", "medium", "small"],
                "description": "按钮尺寸",
                "default": "medium"
              },
              "disabled": {
                "type": "boolean",
                "description": "是否禁用",
                "default": false
              },
              "loading": {
                "type": "boolean",
                "description": "是否加载中",
                "default": false
              },
              "iconPosition": {
                "type": "string",
                "enum": ["left", "right"],
                "description": "图标位置",
                "default": "left"
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

## 使用示例

```typescript
import React from 'react';
import PodcastInterviewCard from './PodcastInterviewCard';

const App = () => {
  // 基础用法
  const basicData = {
    title: '技术分享播客',
    users: [
      {
        name: '张三',
        role: '主持人：',
        avatar: 'https://example.com/avatar1.jpg',
      },
    ],
    desc: '本期节目我们将讨论前端技术的发展趋势。',
    buttons: [
      {
        title: '开始收听',
        action: 'podcastPlay',
        type: 'primary',
        size: 'medium',
      },
    ],
  };

  // 多用户访谈
  const interviewData = {
    title: '创业者对话',
    users: [
      {
        name: '李四',
        role: '主播：',
        avatar: 'https://example.com/host.jpg',
      },
      {
        name: '王五',
        role: '嘉宾：',
        avatar: 'https://example.com/guest.jpg',
      },
    ],
    desc: '两位创业者分享他们的创业经验和心得体会。',
    buttons: [
      {
        title: '立即收听',
        action: 'podcastPlay',
        type: 'primary',
        size: 'large',
      },
      {
        title: '分享',
        action: 'share',
        type: 'secondary',
        size: 'medium',
        icon: 'systemShare',
        iconPosition: 'left',
      },
    ],
  };

  return (
    <View>
      {/* 基础播客卡片 */}
      <PodcastInterviewCard
        data={basicData}
        opts={{ width: '100%' }}
      />

      {/* 访谈播客卡片 */}
      <PodcastInterviewCard
        data={interviewData}
        opts={{ width: 350, height: 400 }}
      />
    </View>
  );
};

export default App;
```

## 注意事项

1. 组件依赖于 `CardContainer`、`Button` 和 `IconFont` 组件
2. 用户头像会自动显示为圆形样式
3. 多个用户之间会自动显示声波图标作为分隔
4. 描述文本最多显示3行，超出部分会被截断
5. 按钮点击事件通过控制台输出，需要根据实际需求实现具体逻辑
6. 组件使用 FlexUI 主题系统，样式会根据主题配置自动调整
7. 所有数据字段都是可选的，组件会自动处理空数据的情况
8. 用户信息和按钮会自动过滤掉无效数据（如缺少必要字段的项）
