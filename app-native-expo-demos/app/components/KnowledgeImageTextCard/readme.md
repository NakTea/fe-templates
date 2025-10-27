# KnowledgeImageTextCard 组件文档

## 概述

`KnowledgeImageTextCard` 是一个知识库图文卡片组件，用于展示结构化的知识内容，包含标题、图片、描述、分段内容和操作按钮。组件支持Markdown渲染，按钮固定在底部。

## 特性

- ✅ 支持标题前图标展示
- ✅ 自适应高度图片展示
- ✅ 结构化分段内容展示
- ✅ Markdown内容渲染支持
- ✅ 底部固定按钮布局
- ✅ 滚动内容区域
- ✅ 按钮动作回调处理
- ✅ 完整的类型安全支持

## 类型定义

```typescript
type TData = {
  title?: string; // 卡片标题
  titleIcon?: string; // 标题前的图标名称
  image?: string; // 主图片URL
  description?: string; // 描述文本
  sections?: {
    // 分段内容
    title?: string; // 分段标题
    items?: {
      // 分段项目列表
      title?: string; // 项目标题（可选，会加粗显示）
      content?: string; // 项目内容
    }[];
  }[];
  content?: string; // Markdown内容（展示在最下面）
  buttons?: {
    // 底部按钮配置
    text?: string; // 按钮文本
    type?: 'primary' | 'secondary'; // 按钮类型
    action?: string; // 按钮动作标识
  }[];
};

interface IProps {
  data?: TData; // 数据对象
  opts?: {
    width?: string | number; // 卡片宽度
    height?: string | number; // 卡片高度
  };
  onPress?: (action?: string) => void; // 按钮点击回调
}
```

## Mock Data JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "卡片标题"
    },
    "titleIcon": {
      "type": "string",
      "description": "标题前的图标名称，使用IconFont组件支持的图标"
    },
    "image": {
      "type": "string",
      "format": "uri",
      "description": "主图片URL地址"
    },
    "description": {
      "type": "string",
      "description": "卡片描述文本"
    },
    "sections": {
      "type": "array",
      "description": "分段内容数组",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "分段标题"
          },
          "items": {
            "type": "array",
            "description": "分段项目列表",
            "items": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "项目标题（可选，会加粗显示）"
                },
                "content": {
                  "type": "string",
                  "description": "项目内容"
                }
              }
            }
          }
        }
      }
    },
    "content": {
      "type": "string",
      "description": "Markdown格式的额外内容，展示在最下面"
    },
    "buttons": {
      "type": "array",
      "description": "底部按钮配置数组",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string",
            "description": "按钮显示文本"
          },
          "type": {
            "type": "string",
            "enum": ["primary", "secondary", "text"],
            "description": "按钮类型"
          },
          "action": {
            "type": "string",
            "description": "按钮动作标识，用于区分不同按钮的点击行为"
          }
        }
      }
    }
  }
}
```

## 组件接口

```typescript
// 组件需要实现handleOnPress方法
const KnowledgeImageTextCard: React.FC<IProps> = ({ data, opts, onPress }) => {
  const handleOnPress = (action?: string) => {
    onPress?.(action);
  };

  // ... 组件实现
};
```

## 使用示例

### 基础用法

```tsx
import KnowledgeImageTextCard from './KnowledgeImageTextCard';

const App = () => {
  const mockData = {
    title: '车外打开机械车门',
    titleIcon: 'iconWarningSWarning',
    image: 'https://picsum.photos/400/200',
    description: '车辆解锁时，您的车辆若配备电动车门，您可以使用以下方式打开或关闭电动车门功能。',
    sections: [
      {
        title: '方法',
        items: [
          {
            content: '轻触门把手上的感应区域即可解锁并自动打开车门。',
          },
          {
            title: '中控屏幕',
            content: '通过中控屏幕上的"车辆"->"车门"菜单，可以独立控制每个车门的开启与关闭。',
          },
        ],
      },
    ],
    content: `## 额外说明\n这里是 **Markdown** 格式的内容。`,
    buttons: [
      {
        text: '稍后再试',
        type: 'secondary',
        action: 'later',
      },
      {
        text: '立即打开',
        type: 'primary',
        action: 'open',
      },
    ],
  };

  const handleButtonPress = (action?: string) => {
    switch (action) {
      case 'later':
        console.log('用户选择稍后再试');
        // 处理稍后再试逻辑
        break;
      case 'open':
        console.log('用户选择立即打开');
        // 处理立即打开逻辑
        break;
      default:
        console.log('未知动作:', action);
    }
  };

  return <KnowledgeImageTextCard data={mockData} opts={{ width: 364, height: 376 }} onPress={handleButtonPress} />;
};
```

### 完整Mock数据示例

```typescript
const fullMockData = {
  title: '智能车辆操作指南',
  titleIcon: 'systemCarFill',
  image: 'https://picsum.photos/400/200',
  description: '本指南将帮助您了解智能车辆的各项功能操作方法，确保您能够安全、便捷地使用车辆的所有功能。',
  sections: [
    {
      title: '基础操作',
      items: [
        {
          title: '解锁车辆',
          content: '使用智能钥匙或手机APP即可远程解锁车辆，支持感应式开锁。',
        },
        {
          title: '启动引擎',
          content: '按下启动按钮，系统会自动检测钥匙并启动引擎。',
        },
        {
          content: '调整座椅和后视镜到舒适位置。',
        },
      ],
    },
    {
      title: '高级功能',
      items: [
        {
          title: '自动泊车',
          content: '启用自动泊车功能，系统将协助您完成停车操作。',
        },
        {
          title: '语音控制',
          content: '通过语音指令控制车内设备，如空调、导航、音响等。',
        },
      ],
    },
  ],
  content: `## 维护建议

定期维护是确保车辆安全运行的关键：

### 日常检查
- **轮胎气压**：每月检查一次
- **机油液位**：每两周检查一次  
- **冷却液**：每月检查一次

> 💡 **小贴士**：建议下载官方APP，可以实时监控车辆状态。`,
  buttons: [
    {
      text: '稍后查看',
      type: 'secondary',
      action: 'later',
    },
    {
      text: '立即使用',
      type: 'primary',
      action: 'start',
    },
    {
      text: '收藏指南',
      type: 'secondary',
      action: 'bookmark',
    },
  ],
};

// 处理按钮点击
const handleAction = (action?: string) => {
  const actionMap = {
    later: () => {
      console.log('稍后查看');
      // 可以保存用户状态，稍后提醒
    },
    start: () => {
      console.log('立即使用');
      // 跳转到功能页面或开始引导
    },
    bookmark: () => {
      console.log('收藏指南');
      // 添加到收藏夹
    },
  };

  const handler = actionMap[action as keyof typeof actionMap];
  if (handler) {
    handler();
  } else {
    console.warn('未处理的动作:', action);
  }
};
```

## 按钮动作处理最佳实践

### 1. 动作标识命名规范

```typescript
// ✅ 推荐的动作命名
const commonActions = {
  // 基础动作
  confirm: '确认',
  cancel: '取消',
  close: '关闭',
  save: '保存',

  // 导航动作
  next: '下一步',
  prev: '上一步',
  back: '返回',
  home: '回到首页',

  // 业务动作
  open: '打开',
  start: '开始',
  stop: '停止',
  pause: '暂停',
  later: '稍后',
  skip: '跳过',

  // 交互动作
  share: '分享',
  bookmark: '收藏',
  download: '下载',
  upload: '上传',
};
```

### 2. 按钮配置模式

```typescript
// 单按钮模式
const singleButtonData = {
  buttons: [
    {
      text: '我知道了',
      type: 'primary',
      action: 'confirm',
    },
  ],
};

// 双按钮模式（推荐）
const dualButtonData = {
  buttons: [
    {
      text: '取消',
      type: 'secondary',
      action: 'cancel',
    },
    {
      text: '确认',
      type: 'primary',
      action: 'confirm',
    },
  ],
};

// 多按钮模式（最多3个）
const multiButtonData = {
  buttons: [
    {
      text: '稍后',
      type: 'secondary',
      action: 'later',
    },
    {
      text: '收藏',
      type: 'secondary',
      action: 'bookmark',
    },
    {
      text: '开始',
      type: 'primary',
      action: 'start',
    },
  ],
};
```

## 组件布局结构

```
┌─────────────────────────────────────┐
│ CardContainer                       │
│ ┌─────────────────────────────────┐ │
│ │ ScrollView (可滚动内容区域)        │ │
│ │ ├─ Header (标题 + 图标)           │ │
│ │ ├─ MainImage (主图片)            │ │
│ │ ├─ Description (描述文本)        │ │
│ │ ├─ Sections (分段内容)           │ │
│ │ │  ├─ Section Title             │ │
│ │ │  └─ Items List                │ │
│ │ │     ├─ • Item 1               │ │
│ │ │     └─ • Item 2               │ │
│ │ └─ MarkdownRenderer (MD内容)    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 固定底部按钮区域                  │ │
│ │ [次要按钮] [主要按钮]              │ │
│ │ action='cancel' action='confirm' │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 设计规范

### 尺寸规范

- 默认宽度：364px
- 默认高度：376px
- 支持自定义尺寸

### 间距规范

- 元素间距：使用 `spaceElementsM` (16px)
- 小间距：使用 `spaceElementsS` (12px)
- 列表项缩进：使用 `spaceElementsM` (16px)

### 颜色规范

- 主要文本：`textPrimary`
- 次要文本：`textSecondary`
- 强调文本：`textPrimary` + `fontWeight: '800'`

### 字体规范

- 标题：`cnHeadlineXsStrong`
- 章节标题：`cnDisplayXxxsStrong`
- 正文：`cnBodyM`

## 注意事项

1. **数据安全**：所有字段都是可选的，组件会安全处理空数据
2. **图片加载**：使用AutoHeightImage组件，自动适配高度
3. **按钮布局**：底部按钮固定显示，等宽分布，最多建议3个按钮
4. **滚动性能**：内容区域可滚动，按钮区域固定
5. **Markdown支持**：支持完整的Markdown语法渲染
6. **动作处理**：通过action字段区分按钮行为，便于统一处理
7. **响应式设计**：支持自定义宽高，适配不同场景
8. **类型安全**：使用TypeScript确保类型安全，避免运行时错误
