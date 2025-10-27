import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

export interface ITabItem {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface ITabProps {
  // 基础属性 - 组件核心功能
  items: ITabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  type?: 'default' | 'card';
  size?: 'small' | 'medium';

  // 内容属性 - 显示内容相关
  scrollable?: boolean;
  centered?: boolean;

  // 事件属性 - 交互行为
  onChange?: (key: string) => void;

  // 样式属性 - 自定义样式
  style?: object;
  tabStyle?: object;
  activeTabStyle?: object;
  textStyle?: object;
  activeTextStyle?: object;

  // 覆盖属性 - 特殊需求覆盖
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
}

const Tab = ({
  // 设置默认值
  items = [],
  activeKey,
  defaultActiveKey,
  type = 'default',
  size = 'medium',
  scrollable = false,
  centered = false,

  // 事件属性
  onChange,

  // 样式属性
  style,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,

  // 覆盖属性
  activeBackgroundColor,
  inactiveBackgroundColor,
  activeTextColor,
  inactiveTextColor,
}: ITabProps) => {
  // 1. 获取主题配置
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { tab } = components;

  // 2. 状态管理
  const [currentActiveKey, setCurrentActiveKey] = React.useState(
    activeKey || defaultActiveKey || (items.length > 0 ? items[0].key : ''),
  );

  // 使用外部控制的 activeKey，否则使用内部状态
  const finalActiveKey = activeKey !== undefined ? activeKey : currentActiveKey;

  // 3. 计算函数定义
  const getTabBackgroundColor = (isActive: boolean) => {
    if (activeBackgroundColor && isActive) return activeBackgroundColor;
    if (inactiveBackgroundColor && !isActive) return inactiveBackgroundColor;

    return isActive ? tab.activeBackground : tab.inactiveBackground;
  };

  const getTabTextColor = (isActive: boolean) => {
    if (activeTextColor && isActive) return activeTextColor;
    if (inactiveTextColor && !isActive) return inactiveTextColor;

    return isActive ? tab.activeTextColor : tab.inactiveTextColor;
  };

  const getTabHeight = () => {
    return size === 'small' ? tab.heightS : tab.height;
  };

  // 4. 事件处理函数
  const handleTabPress = (key: string, disabled?: boolean) => {
    if (disabled) return;

    if (activeKey === undefined) {
      setCurrentActiveKey(key);
    }

    if (onChange) {
      onChange(key);
    }
  };

  // 5. 渲染单个页签
  const renderTab = (item: ITabItem) => {
    const isActive = item.key === finalActiveKey;
    const isDisabled = item.disabled;

    const tabStyles = StyleSheet.create({
      tab: {
        height: getTabHeight(),
        paddingHorizontal: tab.paddingHorizontal,
        backgroundColor: getTabBackgroundColor(isActive),
        borderRadius: tab.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: tab.spacing,
        opacity: isDisabled ? 0.4 : 1,
        ...tabStyle,
        ...(isActive ? activeTabStyle : {}),
      },
      text: {
        ...tab.textStyle,
        color: getTabTextColor(isActive),
        ...textStyle,
        ...(isActive ? activeTextStyle : {}),
      },
    });

    return (
      <TouchableOpacity
        key={item.key}
        style={tabStyles.tab}
        onPress={() => handleTabPress(item.key, item.disabled)}
        disabled={isDisabled}
        activeOpacity={0.8}>
        <Text style={tabStyles.text}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  // 6. 创建容器样式
  const containerStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      ...(centered && { justifyContent: 'center' }),
      ...style,
    },
    scrollContainer: {
      flexGrow: 1,
      ...(centered && { justifyContent: 'center' }),
    },
  });

  // 7. 主渲染
  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={containerStyles.scrollContainer}
        style={style}>
        <View style={containerStyles.container}>{items.map(renderTab)}</View>
      </ScrollView>
    );
  }

  return <View style={containerStyles.container}>{items.map(renderTab)}</View>;
};

export default Tab;
