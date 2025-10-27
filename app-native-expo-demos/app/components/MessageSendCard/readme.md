# MessageSendCard 消息发送卡片组件

## 组件描述

MessageSendCard 是一个用于展示和发送消息的卡片组件。支持显示收件人信息、消息内容、发送状态,以及确认发送和取消按钮。组件支持打字机效果和自定义样式。

## 组件 API

### Props 说明

| 属性           | 类型        | 必填 | 默认值 | 描述           |
| -------------- | ----------- | ---- | ------ | -------------- |
| data           | TData       | 是   | -      | 卡片数据       |
| opts           | CardOptions | 否   | {}     | 卡片配置选项   |
| designToken    | object      | 否   | {}     | 自定义主题样式 |
| RNConfigModule | any         | 是   | -      | 原生交互模块   |

### 类型定义

```
interface TData {
  header?: string;           // 卡片标题
  message?: string;          // 消息内容
  recipientIcon?: string;    // 收件人图标
  recipientName?: string;    // 收件人名称
  buttonSend?: IButton;      // 发送按钮配置
  buttonCancel?: IButton;    // 取消按钮配置
  statusSendingText?: string;// 发送中文案
  statusSentText?: string;   // 发送成功文案
  statusCancelText?: string; // 取消发送文案
  cardStatus?: number;       // 卡片状态
}

interface IButton {
  label: string;             // 按钮文案
  event: {
    name: string;            // 事件名称
    info: object;            // 事件信息
  };
}

interface CardOptions {
  ownCard?: boolean;         // 是否为独立卡片
  streaming?: boolean;       // 是否启用打字机效果
}
```

## Mock 数据示例

```
const mockData = {
  data: {
    header: "发送给",
    message: "你好,我是测试消息内容",
    recipientIcon: "wechat",
    recipientName: "张三",
    statusSendingText: "正在发送...",
    statusSentText: "已发送",
    statusCancelText: "已取消发送",
    cardStatus: 0,
    buttonSend: {
      label: "确认发送",
      event: {
        name: "card.event.native",
        info: {
          name: "card.event.native.tap",
          info: {
            input: {
              text: "确认发送"
            }
          }
        }
      }
    },
    buttonCancel: {
      label: "取消",
      event: {
        name: "card.event.native",
        info: {
          name: "card.event.native.tap",
          info: {
            input: {
              text: "取消发送"
            }
          }
        }
      }
    }
  },
  opts: {
    ownCard: true,
    streaming: false
  }
};
```

## Props JSON Schema

```
{
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "header": {
          "type": "string",
          "description": "卡片标题"
        },
        "message": {
          "type": "string",
          "description": "消息内容"
        },
        "recipientIcon": {
          "type": "string",
          "description": "收件人图标"
        },
        "recipientName": {
          "type": "string",
          "description": "收件人名称"
        },
        "statusSendingText": {
          "type": "string",
          "description": "发送中状态文案"
        },
        "statusSentText": {
          "type": "string",
          "description": "发送成功状态文案"
        },
        "statusCancelText": {
          "type": "string",
          "description": "取消发送状态文案"
        },
        "cardStatus": {
          "type": "number",
          "enum": [0, 1, 2, 3],
          "description": "卡片状态:0-未发送,1-发送中,2-发送成功,3-取消发送"
        },
        "buttonSend": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string",
              "description": "发送按钮文案"
            },
            "event": {
              "type": "object",
              "description": "按钮事件配置"
            }
          }
        },
        "buttonCancel": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string",
              "description": "取消按钮文案"
            },
            "event": {
              "type": "object",
              "description": "按钮事件配置"
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
  },
  "required": ["data"]
}
```

## 使用示例

```
import React from 'react';
import MessageSendCard from './MessageSendCard';

const App = () => {
  const cardData = {
    header: "发送给",
    message: "你好,这是一条测试消息",
    recipientIcon: "wechat",
    recipientName: "张三",
    statusSendingText: "正在发送...",
    statusSentText: "已发送",
    statusCancelText: "已取消发送",
    cardStatus: 0,
    buttonSend: {
      label: "确认发送",
      event: {
        name: "card.event.native",
        info: {
          name: "card.event.native.tap",
          info: {
            input: { text: "确认发送" }
          }
        }
      }
    },
    buttonCancel: {
      label: "取消",
      event: {
        name: "card.event.native",
        info: {
          name: "card.event.native.tap",
          info: {
            input: { text: "取消发送" }
          }
        }
      }
    }
  };

  return (
    <MessageSendCard
      data={cardData}
      opts={{
        ownCard: true,
        streaming: false
      }}
      RNConfigModule={RNConfigModule}
    />
  );
};
```

## 注意事项

1. 组件需要传入 RNConfigModule 用于原生交互
2. cardStatus 用于控制卡片状态和展示:
   - 0: 正常展示
   - 1: 发送中
   - 2: 发送成功
   - 3: 取消发送
3. 消息内容区域设置了最大高度限制,超出会显示滚动条
4. streaming 开启后会显示打字机效果
5. ownCard 为 true 时会显示独立卡片样式
6. 按钮事件通过 RNConfigModule 调用原生方法
7. 组件样式支持通过 theme 配置自定义
