# KnowledgeSolutionStepCard 组件说明文档

## 概述

KnowledgeSolutionStepCard 是一个用于展示解决方案步骤的卡片组件，支持多个解决方案列表，每个列表包含多个步骤项。组件采用垂直滚动布局，适用于展示详细的操作指南或教程内容。

## Props 接口

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}
```

## 数据结构类型

```typescript
type TStepItem = {
  number: number; // 步骤序号（必填）
  title: string; // 步骤标题（必填）
  description?: string; // 步骤描述
  image?: string; // 步骤图片URL
};

type TList = {
  title?: string; // 解决方案标题
  steps?: TStepItem[]; // 步骤列表
};

type TData = {
  title?: string; // 卡片主标题
  list?: TList[]; // 解决方案列表
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
        "title": {
          "type": "string",
          "description": "卡片主标题"
        },
        "list": {
          "type": "array",
          "description": "解决方案列表",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "解决方案标题"
              },
              "steps": {
                "type": "array",
                "description": "步骤列表",
                "items": {
                  "type": "object",
                  "required": ["number", "title"],
                  "properties": {
                    "number": {
                      "type": "number",
                      "description": "步骤序号（必填）",
                      "minimum": 1
                    },
                    "title": {
                      "type": "string",
                      "description": "步骤标题（必填）",
                      "minLength": 1
                    },
                    "description": {
                      "type": "string",
                      "description": "步骤描述"
                    },
                    "image": {
                      "type": "string",
                      "format": "uri",
                      "description": "步骤图片URL"
                    }
                  }
                }
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

### 基础用法

```jsx
import KnowledgeSolutionStepCard from './KnowledgeSolutionStepCard';

const basicData = {
  title: '基础操作指南',
  list: [
    {
      title: '方法一',
      steps: [
        {
          number: 1,
          title: '第一步',
          description: '这是第一步的描述信息',
          image: 'https://example.com/step1.jpg',
        },
        {
          number: 2,
          title: '第二步',
          description: '这是第二步的描述信息',
        },
      ],
    },
  ],
};

<KnowledgeSolutionStepCard data={basicData} opts={{ width: '100%', maxHeight: 400 }} />;
```

### 完整示例

```jsx
const completeData = {
  title: '使用手机钥匙的方式',
  list: [
    {
      title: '方式一：使用手机蓝牙钥匙',
      steps: [
        {
          number: 1,
          title: '开启手机蓝牙',
          description: '进入手机"设置" > "蓝牙"，确保蓝牙功能已开启。',
          image: 'https://picsum.photos/150/84',
        },
        {
          number: 2,
          title: '在车机上配对',
          description: '在车辆中控屏选择"连接新设备"，找到您的手机并完成配对。',
          image: 'https://picsum.photos/150/84',
        },
        {
          number: 3,
          title: '授权钥匙功能',
          description: '配对成功后，在弹出的授权请求中，允许车辆作为蓝牙钥匙使用。',
          image: 'https://picsum.photos/150/84',
        },
      ],
    },
    {
      title: '方式二：使用手机NFC钥匙',
      steps: [
        {
          number: 1,
          title: '激活NFC钥匙卡片',
          description: '在品牌App中，进入"我的钥匙"，选择并激活NFC数字钥匙。',
        },
        {
          number: 2,
          title: '靠近车门感应区',
          description: '将手机背面顶部靠近主驾驶车门的NFC感应区，即可解锁车辆。',
        },
      ],
    },
  ],
};

<KnowledgeSolutionStepCard data={completeData} opts={{ width: '100%' }} />;
```

### 只有标题的步骤示例

```jsx
const simpleTitleData = {
  title: '快速操作步骤',
  list: [
    {
      title: '简单设置',
      steps: [
        {
          number: 1,
          title: '打开应用',
        },
        {
          number: 2,
          title: '点击设置按钮',
        },
        {
          number: 3,
          title: '保存设置',
        },
      ],
    },
  ],
};

<KnowledgeSolutionStepCard data={simpleTitleData} />;
```

### 带图片的详细步骤示例

```jsx
const detailedStepsData = {
  title: '详细配置指南',
  list: [
    {
      title: '网络配置',
      steps: [
        {
          number: 1,
          title: '连接WiFi',
          description: '在设置中找到WiFi选项，选择要连接的网络',
          image:
            'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_300,h_200',
        },
        {
          number: 2,
          title: '输入密码',
          description: '输入WiFi密码并点击连接',
          image:
            'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_300,h_200',
        },
      ],
    },
  ],
};

<KnowledgeSolutionStepCard data={detailedStepsData} />;
```

## 组件特性

### 1. 布局特性

- 使用 CardContainer 作为外层容器
- 内置 ScrollView 支持垂直滚动
- 采用垂直布局，支持多个解决方案列表

### 2. 样式特性

- 使用 Design Token 确保样式一致性
- 解决方案列表使用三级容器背景色
- 自适应间距和圆角
- 支持响应式宽度设置

### 3. 步骤展示特性

- **必须提供步骤序号**：确保步骤顺序清晰明确
- **必须提供步骤标题**：保证每个步骤都有明确的操作指示
- 支持可选的步骤描述和图片
- 使用 Stepper 组件统一步骤样式

### 4. 交互特性

- 垂直滚动浏览内容
- 隐藏滚动指示器，提供更好的视觉体验

### 5. 数据安全

- 对可选字段进行完善的条件渲染和空值处理
- 支持动态步骤数量
- 必填字段确保组件正常渲染

## 设计原则

1. **内容层次清晰**：主标题 > 解决方案标题 > 步骤内容
2. **视觉分组明显**：不同解决方案使用背景色区分
3. **步骤展示直观**：使用 Stepper 组件展示步骤信息，序号和标题必填确保信息完整
4. **响应式适配**：支持不同屏幕尺寸的宽度设置

## 必填字段说明

### TStepItem 必填字段

- `number`：步骤序号，确保步骤顺序清晰
- `title`：步骤标题，提供明确的操作指示

### 数据验证

在使用组件前，请确保：

1. 每个步骤都有有效的 `number` 值（大于0的整数）
2. 每个步骤都有非空的 `title` 字符串
3. 步骤序号建议按顺序递增（1, 2, 3...）

## 注意事项

1. 组件依赖 Stepper 基础组件，确保已正确导入
2. 图片 URL 建议使用 HTTPS 协议
3. 步骤描述支持较长文本，会自动换行
4. **必须为每个步骤提供序号和标题**，这是组件正常工作的基础要求
5. 建议步骤序号从1开始，按顺序递增
6. 步骤标题应简洁明确，描述具体的操作内容
