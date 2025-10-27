import React from 'react';
import { View, ScrollView } from 'react-native';
import MessageSendCard from './MessageSendCard';

const props = {
  data: {
    header: '发送给',
    // message: '路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。',
    message:
      '路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。',
    statusSendingText: '正在发送...',
    statusSentText: '已发送',
    statusCancelText: '已取消发送',
    recipientIcon: 'wechat',
    recipientName: '王先生很ok',
    cardStatus: 0, // 卡片状态： 0: 正常展示 1: 发送中 2： 发送成功 3: 取消发送
    buttonSend: {
      label: '确认发送',
      event: {
        name: 'card.event.native',
        description: '调用端侧api',
        info: {
          name: 'card.event.native.tap',
          description: '卡片点击事件的native方法',
          info: {
            input: {
              text: '确认发送',
            },
            triggerTarget: ['cloud'],
            output: {},
          },
        },
      },
    },
    buttonCancel: {
      label: '取消',
      event: {
        name: 'card.event.native',
        description: '调用端侧api',
        info: {
          name: 'card.event.native.tap',
          description: '卡片点击事件的native方法',
          info: {
            input: {
              text: '取消发送',
            },
            triggerTarget: ['cloud'],
            output: {},
          },
        },
      },
    },
  },
  designToken: {},
  opts: {
    streaming: false,
    ownCard: false,
  },
  nativeWakeupWords: ['确认发送', '取消'],
};

const props2 = {
  data: {
    header: '发送给',
    message: '路上有点儿堵车，我大概 20 分钟以后到达，你们先开始不用等我。',
    statusSendingText: '正在发送...',
    statusSentText: '已发送',
    statusCancelText: '已取消发送',
    recipientIcon: 'wechat',
    recipientName: '王先生很ok',
    cardStatus: 0, // 卡片状态： 0: 正常展示 1: 发送中 2： 发送成功 3: 取消发送
    buttonSend: {
      label: '确认发送',
      event: {
        name: 'card.event.native',
        description: '调用端侧api',
        info: {
          name: 'card.event.native.tap',
          description: '卡片点击事件的native方法',
          info: {
            input: {
              text: '确认发送',
            },
            triggerTarget: ['cloud'],
            output: {},
          },
        },
      },
    },
    buttonCancel: {
      label: '取消',
      event: {
        name: 'card.event.native',
        description: '调用端侧api',
        info: {
          name: 'card.event.native.tap',
          description: '卡片点击事件的native方法',
          info: {
            input: {
              text: '取消发送',
            },
            triggerTarget: ['cloud'],
            output: {},
          },
        },
      },
    },
  },
  designToken: {},
  opts: {
    streaming: false,
    ownCard: true,
  },
  nativeWakeupWords: ['确认发送', '取消'],
};

export default function App() {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <MessageSendCard {...props} />
      <View style={{ height: 180, width: '100%', margin: 20 }} />
      <MessageSendCard {...props2} />
    </ScrollView>
  );
}
