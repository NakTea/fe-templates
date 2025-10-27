import React from 'react';
import { View } from 'react-native';
import Tips from '../../components/basic/Tips';

const TipsDemo = () => {
  return (
    <View style={{ padding: 16, gap: 8 }}>
      {/* 基础用法示例 */}
      <Tips
        type="info"
        message="这是一条信息提示，用于展示普通信息。这是一条信息提示，用于展示普通信息。这是一条信息提示，用于展示普通信息。这是一条信息提示，用于展示普通信息。这是一条信息提示，用于展示普通信息。这是一条信息提示，用于展示普通信息。"
      />

      {/* 成功提示示例 */}
      <Tips type="success" message="操作成功！这是一条成功提示信息。" iconSize={20} />

      {/* 警告提示示例 */}
      <Tips
        type="warning"
        message="请注意！这是一条警告提示信息。"
        iconColor="#FF9500"
        style={{ backgroundColor: '#FFF5E6' }}
      />

      {/* 错误提示示例 */}
      <Tips type="error" message="出错了！这是一条错误提示信息。" style={{ padding: 12, borderRadius: 8 }} />

      {/* 富文本提示示例 */}
      <Tips
        type="error"
        message="- 列表一**粗体**\n- 列表二\n- 列表三\n ### hello this is a test.**粗体**"
        style={{ padding: 12, borderRadius: 8 }}
      />

      {/* 自定义样式示例 */}
      <Tips
        type="info"
        message="这是一条自定义样式的提示信息，展示了如何自定义图标、文本和背景样式。"
        iconSize={24}
        iconColor="#007AFF"
        style={{ backgroundColor: '#E5F1FF', padding: 16, borderRadius: 12 }}
      />
    </View>
  );
};

export default TipsDemo;
