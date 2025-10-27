import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

const AnimationFadeSlide = ({
  children = <></>,
  enableOpacity = true,
  enableSlide = true, // 新增：是否启用滑动效果
  direction = 'up', // 'up', 'down', 'left', 'right'
  distance = 30,
  delay = 0,
  style = {},
  ...props
}) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { animationFadeSlide } = components;
  const { duration, easing } = animationFadeSlide;

  // 根据方向计算初始位置
  const getInitialTransform = () => {
    if (!enableSlide) {
      return { x: 0, y: 0 };
    }

    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const initialTransform = getInitialTransform();

  // 创建共享值并直接设置初始值
  const opacity = useSharedValue(enableOpacity ? 0 : 1);
  const translateX = useSharedValue(initialTransform.x);
  const translateY = useSharedValue(initialTransform.y);

  // 组件挂载时开始动画
  useEffect(() => {
    const animationConfig = {
      duration,
      easing,
    };

    const startAnimation = () => {
      if (enableOpacity) {
        opacity.value = withTiming(1, animationConfig);
      }
      if (enableSlide) {
        translateX.value = withTiming(0, animationConfig);
        translateY.value = withTiming(0, animationConfig);
      }
    };

    // 延迟执行动画
    if (delay > 0) {
      const timer = setTimeout(startAnimation, delay);
      return () => clearTimeout(timer);
    } else {
      startAnimation();
    }
  }, [duration, easing, delay, enableOpacity, enableSlide, opacity, translateX, translateY]);

  // 创建动画样式
  const animatedStyle = useAnimatedStyle(() => {
    const style = {
      opacity: opacity.value,
    };

    // 只有在启用滑动效果时才添加 transform
    if (enableSlide) {
      style.transform = [{ translateX: translateX.value }, { translateY: translateY.value }];
    }

    return style;
  });

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimationFadeSlide;
