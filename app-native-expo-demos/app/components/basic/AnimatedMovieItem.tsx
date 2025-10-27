import { useEffect } from 'react';
import Animated, { useAnimatedStyle, withTiming, withDelay, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
const AnimatedMovieItem = ({
  children,
  index,
  isLast,
}: {
  children: React.ReactNode;
  index: number;
  isLast: boolean;
}) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme;

  const { spaceElementsM } = system;

  const styles = StyleSheet.create({
    movieItem: {
      width: 110,
      marginRight: spaceElementsM, // item之间的间距
    },
    movieItemLast: {
      marginRight: 0,
    },
  });

  // 创建动画值
  const translateX = useSharedValue(50); // 初始偏移值
  const opacity = useSharedValue(0); // 初始透明度

  // 定义动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  // 启动入场动画
  useEffect(() => {
    // 设置延迟时间，错开每个item的动画
    const delay = index * 100;

    // 位移动画
    translateX.value = withDelay(
      delay,
      withSpring(0, {
        damping: 15,
        stiffness: 100,
      }),
    );

    // 透明度动画
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 500,
      }),
    );
  }, []);

  return (
    <Animated.View style={[styles.movieItem, isLast && styles.movieItemLast, animatedStyle]}>{children}</Animated.View>
  );
};

export default AnimatedMovieItem;
