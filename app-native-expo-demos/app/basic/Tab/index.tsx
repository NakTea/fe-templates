import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Tab from './../../components/basic/Tab';

// 基础用法
const BasicTabExample = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const tabItems = [
    { key: 'tab1', label: '页签一' },
    { key: 'tab2', label: '页签二' },
    { key: 'tab3', label: '页签三' },
  ];

  return (
    <View style={{ padding: 16 }}>
      <Tab items={tabItems} activeKey={activeKey} onChange={setActiveKey} />
    </View>
  );
};

// 默认选中
const DefaultActiveExample = () => {
  const tabItems = [
    { key: 'home', label: '首页' },
    { key: 'discover', label: '发现' },
    { key: 'profile', label: '我的' },
  ];

  return <Tab items={tabItems} defaultActiveKey="discover" onChange={key => console.log('Tab changed:', key)} />;
};

// 禁用状态
const DisabledExample = () => {
  const tabItems = [
    { key: 'enabled1', label: '可用页签' },
    { key: 'disabled', label: '禁用页签', disabled: true },
    { key: 'enabled2', label: '可用页签' },
  ];

  return <Tab items={tabItems} />;
};

// 可滚动页签
const ScrollableExample = () => {
  const tabItems = Array.from({ length: 10 }, (_, i) => ({
    key: `tab${i + 1}`,
    label: `页签${i + 1}`,
  }));

  return <Tab items={tabItems} scrollable onChange={key => console.log('Selected:', key)} />;
};

// 居中对齐
const CenteredExample = () => {
  const tabItems = [
    { key: 'left', label: '左侧' },
    { key: 'center', label: '中间' },
    { key: 'right', label: '右侧' },
  ];

  return <Tab items={tabItems} centered />;
};

// 小尺寸页签
const SmallSizeExample = () => {
  const tabItems = [
    { key: 'small1', label: '小页签' },
    { key: 'small2', label: '小页签' },
  ];

  return <Tab items={tabItems} size="small" />;
};

// 自定义样式
const CustomStyleExample = () => {
  const tabItems = [
    { key: 'custom1', label: '自定义' },
    { key: 'custom2', label: '样式' },
  ];

  return (
    <Tab
      items={tabItems}
      activeBackgroundColor="#FF6B6B"
      activeTextColor="#FFFFFF"
      inactiveBackgroundColor="#F0F0F0"
      inactiveTextColor="#666666"
      tabStyle={{ marginRight: 12 }}
      activeTabStyle={{ transform: [{ scale: 1.05 }] }}
    />
  );
};

// 组合示例
const ComprehensiveExample = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const tabItems = [
    { key: 'tab1', label: '首页' },
    { key: 'tab2', label: '分类' },
    { key: 'tab3', label: '搜索' },
    { key: 'tab4', label: '设置', disabled: true },
    { key: 'tab5', label: '关于' },
  ];

  return (
    <View style={{ padding: 16 }}>
      <Tab items={tabItems} activeKey={activeKey} onChange={setActiveKey} scrollable style={{ marginBottom: 20 }} />

      {/* 内容区域 */}
      <View style={{ padding: 20, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <Text>当前选中: {activeKey}</Text>
      </View>
    </View>
  );
};

export default function TabExample() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <BasicTabExample />
      <DefaultActiveExample />
      <DisabledExample />
      <ScrollableExample />
      <CenteredExample />
      <SmallSizeExample />
      <CustomStyleExample />
      <ComprehensiveExample />
    </View>
  );
}
