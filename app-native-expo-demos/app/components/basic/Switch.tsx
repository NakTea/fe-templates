import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

export interface ISwitchProps {
  // 基础属性
  value: boolean;
  disabled?: boolean;

  // 事件属性
  onValueChange: (value: boolean) => void;

  // 样式属性
  style?: object;

  // 覆盖属性
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: string;
}

const Switch: React.FC<ISwitchProps> = ({ value, onValueChange, disabled = false, style, trackColor, thumbColor }) => {
  // 1. 获取主题配置
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { switch: switchToken } = components;

  // 2. 定义计算函数
  const getTrackBackgroundColor = (isOn: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return isOn ? switchToken.onBackgroundDisabled : switchToken.offBackgroundDisabled;
    }
    return isOn ? switchToken.onBackgroundDefault : switchToken.offBackgroundDefault;
  };

  const getThumbColor = () => {
    return thumbColor || switchToken.thumbColor;
  };

  const getSwitchDimensions = () => {
    const trackWidth = switchToken.width;
    const trackHeight = switchToken.height;
    const thumbSize = trackHeight - 4; // 留2px边距
    const thumbRadius = thumbSize / 2;
    const trackRadius = switchToken.radius;

    return {
      trackWidth,
      trackHeight,
      thumbSize,
      thumbRadius,
      trackRadius,
      thumbTravel: trackWidth - thumbSize - 4, // 滑块移动距离
    };
  };

  // 3. 获取尺寸信息
  const dimensions = getSwitchDimensions();

  // 4. 动画进度值
  const progress = useDerivedValue(() => {
    return withSpring(value ? 1 : 0, {
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });
  });

  // 5. 轨道动画样式
  const trackAnimatedStyle = useAnimatedStyle(() => {
    const offColor = trackColor?.false || getTrackBackgroundColor(false, disabled);
    const onColor = trackColor?.true || getTrackBackgroundColor(true, disabled);

    const backgroundColor = interpolateColor(progress.value, [0, 1], [offColor, onColor]);

    return {
      backgroundColor,
    };
  });

  // 6. 滑块动画样式
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withSpring(progress.value * dimensions.thumbTravel, {
      mass: 1,
      damping: 15,
      stiffness: 120,
    });

    return {
      transform: [{ translateX }],
    };
  });

  // 7. 创建样式对象
  const styles = StyleSheet.create({
    container: {
      ...style,
    },
    track: {
      width: dimensions.trackWidth,
      height: dimensions.trackHeight,
      borderRadius: dimensions.trackRadius,
      justifyContent: 'center',
      padding: 2,
      opacity: disabled ? 0.5 : 1,
    },
    thumb: {
      width: dimensions.thumbSize,
      height: dimensions.thumbSize,
      borderRadius: dimensions.thumbRadius,
      backgroundColor: getThumbColor(),
      // 添加阴影效果
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  // 8. 事件处理函数
  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  };

  // 9. 主渲染
  return (
    <Pressable style={styles.container} onPress={handlePress} disabled={disabled}>
      <Animated.View style={[styles.track, trackAnimatedStyle]}>
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;
