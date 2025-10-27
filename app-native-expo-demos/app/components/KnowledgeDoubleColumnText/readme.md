# KnowledgeDoubleColumnText 组件说明文档

## 组件概述

KnowledgeDoubleColumnText 是一个知识库双列文本展示组件，专门用于展示结构化的知识内容。组件采用双列网格布局，包含标题、描述、主图和带编号的项目列表，适用于知识库文档、教程说明、功能介绍等场景。组件支持长文本自动截断显示省略号，确保布局整齐美观。

## 组件特性

- ✅ 双列网格布局，内容展示清晰有序
- ✅ 圆形编号标识，视觉层次分明
- ✅ 自适应图片展示，保持原始比例
- ✅ 支持内容滚动查看
- ✅ 文本超过两行自动显示省略号
- ✅ 完整的条件渲染和数据安全处理
- ✅ 使用 Design Token 确保视觉一致性
- ✅ TypeScript 类型安全
- ✅ 通用知识库场景适配

## 类型定义

```typescript
type TPartItem = {
  number?: string; // 项目编号
  title?: string; // 项目标题（支持长文本，超过2行自动截断）
};

type TData = {
  title?: string; // 知识库标题
  description?: string; // 知识库描述
  image?: string; // 配图URL
  items?: TPartItem[]; // 项目列表
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number; // 组件宽度
    height?: string | number; // 组件高度
  };
}
```

## 使用示例

```tsx
import KnowledgeDoubleColumnText from './KnowledgeDoubleColumnText';

const ExampleUsage = () => {
  const knowledgeData = {
    title: 'React Native 开发指南',
    description: '掌握React Native开发的核心概念和最佳实践，快速构建高质量的移动应用。',
    image: 'https://picsum.photos/400/200',
    items: [
      { number: '1', title: '环境搭建' },
      { number: '2', title: '组件开发与状态管理的最佳实践方案' }, // 长文本会自动截断
      { number: '3', title: '导航系统' },
      { number: '4', title: '网络请求与数据处理包括API调用、缓存策略等' }, // 长文本示例
      { number: '5', title: '性能优化' },
      { number: '6', title: '调试与测试' },
      { number: '7', title: '发布部署' },
      { number: '8', title: '持续集成与自动化部署流程的完整配置' }, // 长文本示例
    ],
  };

  return <KnowledgeDoubleColumnText data={knowledgeData} opts={{ width: 364, height: 400 }} />;
};
```

## Mock Data JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeDoubleColumnText Mock Data Schema",
  "description": "知识库双列文本组件的数据结构定义",
  "properties": {
    "data": {
      "type": "object",
      "description": "组件主要数据",
      "properties": {
        "title": {
          "type": "string",
          "description": "知识库标题",
          "maxLength": 60,
          "example": "React Native 开发指南"
        },
        "description": {
          "type": "string",
          "description": "知识库描述文本",
          "maxLength": 300,
          "example": "掌握React Native开发的核心概念和最佳实践，快速构建高质量的移动应用。"
        },
        "image": {
          "type": "string",
          "format": "uri",
          "description": "配图URL",
          "example": "https://picsum.photos/400/200"
        },
        "items": {
          "type": "array",
          "description": "知识点列表",
          "maxItems": 30,
          "items": {
            "type": "object",
            "description": "单个知识点信息",
            "properties": {
              "number": {
                "type": "string",
                "description": "项目编号（支持数字、字母、符号）",
                "maxLength": 5,
                "pattern": "^[0-9A-Za-z\\-\\.]+$",
                "example": "1"
              },
              "title": {
                "type": "string",
                "description": "项目标题（支持长文本，超过2行自动显示省略号）",
                "maxLength": 150,
                "example": "组件开发与状态管理的最佳实践方案"
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

## Mock Data 示例

### 技术开发指南示例

```json
{
  "data": {
    "title": "React Native 开发指南",
    "description": "掌握React Native开发的核心概念和最佳实践，快速构建高质量的移动应用。",
    "image": "https://picsum.photos/400/200",
    "items": [
      { "number": "1", "title": "环境搭建与配置" },
      { "number": "2", "title": "组件开发与状态管理的最佳实践方案包括Redux和Context使用" },
      { "number": "3", "title": "导航系统集成" },
      { "number": "4", "title": "网络请求与数据处理包括API调用、缓存策略、错误处理等" },
      { "number": "5", "title": "性能优化技巧" },
      { "number": "6", "title": "调试与测试方法" },
      { "number": "7", "title": "应用发布部署" },
      { "number": "8", "title": "持续集成与自动化部署流程的完整配置和实施方案" }
    ]
  },
  "opts": {
    "width": 364,
    "maxHeight": 400
  }
}
```

### 学习教程示例

```json
{
  "data": {
    "title": "JavaScript 进阶教程",
    "description": "深入理解JavaScript的高级特性，提升编程技能和代码质量。",
    "image": "https://picsum.photos/400/250",
    "items": [
      { "number": "01", "title": "闭包与作用域" },
      { "number": "02", "title": "异步编程模式包括Promise、async/await的深入理解" },
      { "number": "03", "title": "原型链机制" },
      { "number": "04", "title": "函数式编程思想与实践应用在现代JavaScript开发中" },
      { "number": "05", "title": "模块化开发" },
      { "number": "06", "title": "设计模式应用" },
      { "number": "07", "title": "性能优化策略" },
      { "number": "08", "title": "TypeScript集成开发的完整工作流程和最佳实践" }
    ]
  },
  "opts": {
    "width": 350,
    "maxHeight": 450
  }
}
```

### 产品功能介绍示例

```json
{
  "data": {
    "title": "智能办公系统功能",
    "description": "全面了解智能办公系统的各项功能模块，提升工作效率。",
    "image": "https://picsum.photos/400/180",
    "items": [
      { "number": "A", "title": "文档管理系统" },
      { "number": "B", "title": "团队协作工具包括实时聊天、视频会议、文件共享等功能" },
      { "number": "C", "title": "项目管理模块" },
      { "number": "D", "title": "时间追踪与考勤管理系统的完整解决方案和使用指南" },
      { "number": "E", "title": "报表分析工具" },
      { "number": "F", "title": "权限管理系统" }
    ]
  },
  "opts": {
    "width": 320,
    "maxHeight": 380
  }
}
```

### 操作指南示例

```json
{
  "data": {
    "title": "移动应用使用指南",
    "description": "快速掌握移动应用的各项功能和操作技巧。",
    "image": "https://picsum.photos/400/220",
    "items": [
      { "number": "Step1", "title": "账户注册登录" },
      { "number": "Step2", "title": "个人信息设置与隐私保护配置的详细操作流程" },
      { "number": "Step3", "title": "核心功能使用" },
      { "number": "Step4", "title": "高级功能探索包括自定义设置、插件安装、数据同步等" },
      { "number": "Step5", "title": "问题排查解决" },
      { "number": "Step6", "title": "数据备份恢复" }
    ]
  },
  "opts": {
    "width": 340,
    "maxHeight": 360
  }
}
```

### 最小化示例

```json
{
  "data": {
    "title": "基础知识点",
    "items": [
      { "number": "1", "title": "概念介绍" },
      { "number": "2", "title": "实践应用" }
    ]
  }
}
```

### 极端长文本测试示例

```json
{
  "data": {
    "title": "长文本处理测试",
    "description": "测试组件对超长文本内容的处理能力。",
    "items": [
      {
        "number": "1",
        "title": "这是一个非常长的标题文本用来测试组件的文本截断功能是否能够正常工作当文本内容超过两行显示限制时应该自动显示省略号来保持布局的整齐美观"
      },
      {
        "number": "2",
        "title": "正常长度文本"
      },
      {
        "number": "3",
        "title": "另一个超长文本示例用于验证双列布局中不同长度文本的显示效果和对齐方式"
      },
      {
        "number": "4",
        "title": "短文本"
      }
    ]
  }
}
```

## 设计规范

### 布局规范

- **双列布局**：每列占48%宽度，列间距2%
- **项目间距**：横向使用 spaceElementsM (16px)，纵向使用 spaceElementsS (12px)
- **编号尺寸**：20x20px 圆形容器
- **编号与标题间距**：spaceElementsXs (8px)
- **整体间距**：各区块间使用 spaceElementsM (16px)

### 文本处理规范

- **标题截断**：最多显示2行，超出部分显示省略号
- **截断模式**：使用 `ellipsizeMode="tail"` 在末尾显示省略号
- **行数控制**：使用 `numberOfLines={2}` 限制最大行数
- **文本对齐**：标题文本左对齐，支持自动换行

### 视觉规范

- **主标题样式**：cnHeadlineXsStrong，颜色 textTitle
- **描述样式**：cnBodyM，颜色 textSecondary
- **项目标题**：cnBodyM，颜色 textPrimary，最多2行显示
- **编号文本**：cnBodyS，颜色 textPrimary
- **编号背景**：containerSecondary
- **图片圆角**：radiusImageM
- **编号圆角**：radiusComp1 (完全圆形)

### 交互规范

- **滚动支持**：内容超出容器时支持垂直滚动
- **响应式设计**：支持自定义宽高适配不同屏幕尺寸
- **图片自适应**：使用 AutoHeightImage 保持图片原始比例
- **文本适配**：长文本自动截断，确保布局稳定性

## 适用场景

1. **技术文档**：开发指南、API文档、技术教程
2. **产品说明**：功能介绍、使用手册、操作指南
3. **学习资料**：课程大纲、知识点总结、学习路径
4. **培训材料**：企业培训、技能提升、认证考试
5. **项目文档**：需求说明、设计规范、开发流程
6. **帮助中心**：FAQ、问题解答、使用技巧
7. **知识库**：经验分享、最佳实践、案例分析

## 注意事项

1. **数据安全**：所有字段都是可选的，组件内部做了完整的条件渲染处理
2. **性能优化**：使用 StyleSheet.create 创建样式，避免重复计算
3. **类型安全**：完整的 TypeScript 类型定义，确保开发时的类型检查
4. **主题一致性**：使用 Design Token 确保与整体设计系统的一致性
5. **图片处理**：使用 AutoHeightImage 组件确保图片按比例显示
6. **编号灵活性**：支持数字、字母、符号等多种编号格式
7. **文本长度**：支持长文本内容，超过2行自动截断显示省略号
8. **布局稳定性**：文本截断机制确保双列布局的整齐和美观
9. **内容组织**：建议按逻辑顺序组织项目列表，便于用户理解
10. **可访问性**：长文本被截断时，建议提供查看完整内容的交互方式
