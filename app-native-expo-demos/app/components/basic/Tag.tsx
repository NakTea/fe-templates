import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

export interface ITagProps {
  // 基础属性 - 组件核心功能
  size?: 'large' | 'medium' | 'small';

  // 内容属性 - 显示内容相关
  children?: React.ReactNode;
  text?: string;

  // 样式属性 - 自定义样式
  style?: object;
  textStyle?: object;

  // 覆盖属性 - 特殊需求覆盖
  backgroundColor?: string;
  textColor?: string;
}

const Tag = ({
  // 设置默认值
  size = 'medium',
  children,
  text,
  style,
  textStyle,
  backgroundColor,
  textColor,
}: ITagProps) => {
  // 1. 获取主题配置
  const { theme } = useFlexUIConfig();
  const { tag } = theme.components;

  // 使用结构赋值获取 tag token
  const {
    heightL,
    heightM,
    heightS,
    paddingL,
    paddingM,
    paddingS,
    tagBgDefault,
    radius,
    fontStyleL,
    fontStyleM,
    fontStyleS,
    tagTextColor,
  } = tag;

  // 2. 定义计算函数（按功能分组）
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    return tagBgDefault;
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    return tagTextColor;
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'large':
        return {
          height: heightL,
          paddingHorizontal: paddingL,
        };
      case 'medium':
        return {
          height: heightM,
          paddingHorizontal: paddingM,
        };
      case 'small':
        return {
          height: heightS,
          paddingHorizontal: paddingS,
        };
      default:
        return {
          height: heightM,
          paddingHorizontal: paddingM,
        };
    }
  };

  const getFontStyle = () => {
    switch (size) {
      case 'large':
        return fontStyleL;
      case 'medium':
        return fontStyleM;
      case 'small':
        return fontStyleS;
      default:
        return fontStyleM;
    }
  };

  // 3. 创建样式对象
  const styles = StyleSheet.create({
    container: {
      ...getSizeStyle(),
      backgroundColor: getBackgroundColor(),
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      ...style, // 自定义样式覆盖
    },
    text: {
      ...getFontStyle(),
      color: getTextColor(),
      ...textStyle, // 自定义文字样式覆盖
    },
  });

  // 4. 渲染函数（复杂内容拆分）
  const renderContent = () => {
    if (children) {
      return children;
    }

    if (text) {
      return (
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      );
    }

    return null;
  };

  // 5. 主渲染
  return <View style={styles.container}>{renderContent()}</View>;
};

export default Tag;
