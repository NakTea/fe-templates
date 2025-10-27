# KnowledgeSettingsGroupList 组件文档

## 组件概述

KnowledgeSettingsGroupList 是一个用于展示分组设置列表的组件，支持多个设置分组，每个分组包含标题和设置项列表。每个设置项都有对应的操作按钮，适用于车辆功能设置、应用配置等场景。

## 组件特性

- ✅ 分组展示：支持多个设置分组，每个分组有独立的标题
- ✅ 交互按钮：每个设置项都有对应的操作按钮
- ✅ 响应式设计：支持自定义宽度和高度
- ✅ 主题适配：使用design token确保样式一致性
- ✅ 类型安全：完整的TypeScript类型定义
- ✅ 滚动支持：内容超出时自动支持滚动

## 使用示例

```tsx
import KnowledgeSettingsGroupList from './components/KnowledgeSettingsGroupList';

const settingsData = {
  title: '车辆功能归纳',
  groups: [
    {
      title: '舒适性功能',
      items: [
        {
          label: '座椅加热与通风',
          button: {
            text: '设置',
            onPress: () => console.log('设置座椅加热与通风'),
          },
        },
        {
          label: '方向盘加热',
          button: {
            text: '开启',
            onPress: () => console.log('开启方向盘加热'),
          },
        },
      ],
    },
    {
      title: '驾驶辅助',
      items: [
        {
          label: '自动远光灯',
          button: {
            text: '关闭',
            onPress: () => console.log('关闭自动远光灯'),
          },
        },
      ],
    },
  ],
};

<KnowledgeSettingsGroupList
  data={settingsData}
  opts={{
    width: 430,
    maxHeight: 445,
  }}
/>;
```

## Props 接口

```tsx
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
    maxHeight?: string | number;
  };
}
```

## 类型定义

```tsx
type TButton = {
  text?: string; // 按钮文本
  onPress?: () => void; // 按钮点击回调
};

type TSettingItem = {
  label?: string; // 设置项标签
  button?: TButton; // 操作按钮
};

type TSettingGroup = {
  title?: string; // 分组标题
  items?: TSettingItem[]; // 设置项列表
};

type TData = {
  title?: string; // 组件标题
  groups?: TSettingGroup[]; // 设置分组列表
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "KnowledgeSettingsGroupList Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "description": "组件数据",
      "properties": {
        "title": {
          "type": "string",
          "description": "组件主标题",
          "example": "车辆功能归纳"
        },
        "groups": {
          "type": "array",
          "description": "设置分组列表",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "分组标题",
                "example": "舒适性功能"
              },
              "items": {
                "type": "array",
                "description": "设置项列表",
                "items": {
                  "type": "object",
                  "properties": {
                    "label": {
                      "type": "string",
                      "description": "设置项标签",
                      "example": "座椅加热与通风"
                    },
                    "button": {
                      "type": "object",
                      "description": "操作按钮配置",
                      "properties": {
                        "text": {
                          "type": "string",
                          "description": "按钮文本",
                          "example": "设置"
                        },
                        "onPress": {
                          "type": "function",
                          "description": "按钮点击回调函数"
                        }
                      }
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

## 完整示例数据

```json
{
  "data": {
    "title": "车辆功能归纳",
    "groups": [
      {
        "title": "舒适性功能",
        "items": [
          {
            "label": "座椅加热与通风",
            "button": {
              "text": "设置"
            }
          },
          {
            "label": "方向盘加热",
            "button": {
              "text": "开启"
            }
          }
        ]
      },
      {
        "title": "驾驶辅助",
        "items": [
          {
            "label": "自动远光灯",
            "button": {
              "text": "关闭"
            }
          },
          {
            "label": "盲区监测提醒",
            "button": {
              "text": "配置"
            }
          },
          {
            "label": "交通标志识别",
            "button": {
              "text": "查看"
            }
          }
        ]
      },
      {
        "title": "车内环境",
        "items": [
          {
            "label": "氛围灯颜色与亮度",
            "button": {
              "text": "自定义"
            }
          }
        ]
      }
    ]
  },
  "opts": {
    "width": 430,
    "maxHeight": 445
  }
}
```

## 样式说明

### Design Tokens 使用

- `textPrimary`: 主要文本颜色（标题、设置项标签）
- `textSecondary`: 次要文本颜色（分组标题）
- `containerBsDefault`: 设置项背景色
- `spaceElementsS`: 小间距（设置项之间）
- `spaceElementsM`: 中等间距（分组之间、按钮边距）
- `radiusInCard`: 设置项圆角
- `cnDisplayXxxsStrong`: 主标题字体样式
- `cnHeadlineXsStrong`: 分组标题字体样式
- `cnBodyM`: 设置项标签字体样式

### 布局特点

- 使用CardContainer作为外层容器
- 支持垂直滚动，内容超出时自动显示滚动条
- 设置项采用左右布局，标签在左，按钮在右
- 分组之间有明确的视觉分隔

## 注意事项

1. **数据安全**: 所有属性都是可选的，组件内部做了完整的判空处理
2. **回调安全**: 按钮点击回调使用可选链调用，避免未定义函数导致的错误
3. **响应式**: 支持自定义宽度和高度，适配不同屏幕尺寸
4. **可扩展**: button对象结构便于后续添加更多按钮属性（如类型、禁用状态等）
