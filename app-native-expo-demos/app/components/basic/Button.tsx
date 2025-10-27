import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

export interface IButtonProps {
  // 基础属性
  type?: 'primary' | 'secondary' | 'text';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;

  // 内容
  children?: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';

  // 事件
  onPress?: () => void;

  // 自定义样式
  style?: object;
  textStyle?: object;

  // 自定义覆盖
  backgroundColor?: string;
  textColor?: string;
  width?: number | string;
}

const Button = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  title,
  icon,
  iconPosition = 'left',
  onPress,
  style,
  textStyle,
  backgroundColor,
  textColor,
  width,
}: IButtonProps) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { button } = components;

  // 添加按压状态
  const [isPressed, setIsPressed] = useState(false);

  // 判断是否为纯icon模式
  const isIconOnly = icon && !title && !children;

  // 获取按钮背景色
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;

    // 纯文字按钮没有背景色
    if (type === 'text') return 'transparent';

    if (disabled) {
      return type === 'primary' ? button.primaryBgDisabled : button.secondaryBgDisabled;
    }

    // 添加按压状态的背景色
    if (isPressed) {
      return type === 'primary' ? button.primaryBgPressed : button.secondaryBgPressed;
    }

    return type === 'primary' ? button.primaryBgDefault : button.secondaryBgDefault;
  };

  // 获取按钮文字颜色
  const getTextColor = () => {
    if (textColor) return textColor;

    if (disabled) {
      return button.textColorDisabled;
    }

    if (type === 'text') {
      return button.secondaryTextColor;
    }

    return type === 'primary' ? button.primaryTextColor : button.secondaryTextColor;
  };

  // 获取按钮尺寸样式
  const getSizeStyle = () => {
    // 纯icon模式时，使用正方形尺寸
    if (isIconOnly) {
      const squareSize = (() => {
        switch (size) {
          case 'large':
            return button.heightL;
          case 'small':
            return button.heightS;
          case 'medium':
          default:
            return button.heightM;
        }
      })();

      return {
        width: squareSize,
        height: squareSize,
        paddingHorizontal: 0,
        minWidth: squareSize,
      };
    }

    // 原有的尺寸逻辑
    switch (size) {
      case 'large':
        return {
          height: button.heightL,
          paddingHorizontal: button.paddingHorizontalL,
          minWidth: button.minWidthL,
        };
      case 'small':
        return {
          height: button.heightS,
          paddingHorizontal: type === 'text' ? button.paddingHorizontalText : button.paddingHorizontalS,
          minWidth: type === 'text' ? 'auto' : button.minWidthS,
        };
      case 'medium':
      default:
        return {
          height: button.heightM,
          paddingHorizontal: type === 'text' ? button.paddingHorizontalText : button.paddingHorizontalM,
          minWidth: type === 'text' ? 'auto' : button.minWidthM,
        };
    }
  };

  // 获取文字样式
  const getTextStyle = () => {
    switch (size) {
      case 'large':
        return button.fontL;
      case 'small':
        return button.fontS;
      case 'medium':
      default:
        return button.fontM;
    }
  };

  // 获取图标间距
  const getIconSpacing = () => {
    return size === 'small' ? button.spacingBetweenButtonsS : button.spacingBetweenButtons;
  };

  const styles = StyleSheet.create({
    container: {
      ...getSizeStyle(),
      backgroundColor: getBackgroundColor(),
      borderRadius: type === 'text' ? 0 : button.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: width || (isIconOnly ? getSizeStyle().width : undefined),
      opacity: disabled ? 0.6 : 1,
      ...style,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...getTextStyle(),
      color: getTextColor(),
      textAlign: 'center',
      ...textStyle,
    },
    loadingIndicator: {
      marginRight: getIconSpacing(),
    },
    iconLeft: {
      marginRight: getIconSpacing(),
    },
    iconRight: {
      marginLeft: getIconSpacing(),
    },
    // 纯icon模式下的图标样式
    iconOnly: {
      margin: 0,
    },
  });

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  // 处理按压状态
  const handlePressIn = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;

    // 纯icon模式下，直接渲染图标，不添加间距
    if (isIconOnly) {
      return <View style={styles.iconOnly}>{icon}</View>;
    }

    return <View style={position === 'left' ? styles.iconLeft : styles.iconRight}>{icon}</View>;
  };

  const renderText = () => {
    if (!title && !children) return null;

    return <Text style={styles.text}>{title || children}</Text>;
  };

  const renderContent = () => {
    if (loading) {
      // 纯icon模式下的loading状态
      if (isIconOnly) {
        return <ActivityIndicator size="small" color={getTextColor()} />;
      }

      return (
        <View style={styles.content}>
          <ActivityIndicator size="small" color={getTextColor()} style={styles.loadingIndicator} />
          {renderText()}
        </View>
      );
    }

    if (children && typeof children !== 'string') {
      return children;
    }

    // 纯icon模式
    if (isIconOnly) {
      return renderIcon(iconPosition);
    }

    return (
      <View style={styles.content}>
        {renderIcon('left')}
        {renderText()}
        {renderIcon('right')}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1} // 设置为1，使用自定义的按压效果
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
