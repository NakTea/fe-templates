import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

Animated.addWhitelistedNativeProps({ text: true });

export interface ISliderProps {
  style?: object;
  disabled?: boolean; // 是否可点击
  minimumValue?: number; // 最小值
  maximumValue?: number; // 最大值
  value?: number; // 当前的值
  onSlidingComplete(arg0: number): void; // 滑动结束后的操作
  minimumTrackTintColor?: string; // 小滑块颜色
  maximumTrackTintColor?: string; // 大滑块颜色
  thumbTintColor?: string; // 手柄颜色
  minimumTrackStyle?: object; // 小滑块的样式
  maximumTrackTintStyle?: object; // 小滑块的样式
  thumbTintStyle?: object; // 手柄的样式
  thumbTintWidth?: number; // 手柄的宽度
  minimumTrackPadding?: number; // 小滑块的padding
  maximumTrackHeight?: number; // 滑块的高度
  thumbTintPadding?: number; // 滑块的padding
  leftIcon?: React.ReactNode; // 左边自定icon
}

const Slider = ({
  style,
  minimumValue = 0,
  maximumValue = 100,
  value = 0,
  onSlidingComplete,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  minimumTrackStyle = {},
  maximumTrackTintStyle = {},
  thumbTintStyle = {},
  thumbTintWidth = 32,
  maximumTrackHeight = 32,
  minimumTrackPadding = 4,
  thumbTintPadding = 2,
  leftIcon,
  disabled = false,
}: ISliderProps) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme;
  const { containerSecondary, textInverse } = system;

  const [width, setWidth] = useState(0);
  const [maxValue, setMaxValue] = useState(width - thumbTintWidth);
  const [nowValue, setNowValue] = useState(value);
  const offset = useSharedValue(0);
  const boxWidth = useSharedValue(thumbTintWidth);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // overflow: 'hidden',
    },
    sliderTrack: {
      width: width,
      height: maximumTrackHeight,
      backgroundColor: maximumTrackTintColor || containerSecondary,
      borderRadius: thumbTintWidth / 2,
      justifyContent: 'center',
      padding: minimumTrackPadding,
      ...maximumTrackTintStyle,
    },
    sliderHandle: {
      width: thumbTintWidth - minimumTrackPadding * 2,
      height: maximumTrackHeight - minimumTrackPadding * 2,
      backgroundColor: thumbTintColor || minimumTrackTintColor || textInverse,
      borderRadius: thumbTintWidth / 2,
      position: 'absolute',
      left: minimumTrackPadding,
      ...thumbTintStyle,
    },
    miniTrack: {
      height: maximumTrackHeight - minimumTrackPadding,
      backgroundColor: minimumTrackTintColor || textInverse,
      borderRadius: thumbTintWidth / 2,
      position: 'absolute',
      left: thumbTintPadding,
      ...minimumTrackStyle,
    },
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    // console.log('width', width);
    setWidth(width);
  };

  const getChangeValueNum = (num: number): number => {
    'worklet';
    // console.log('getChangeValueNum', num, maximumValue, minimumValue, maxValue);
    const nowNum = Math.round(((maximumValue - minimumValue) * 100 * num) / maxValue) / 100;
    // console.log('nowNum', nowNum);
    runOnJS(setNowValue)(nowNum);
    return nowNum;
  };

  const setChangeWidth = (changeX: number, tag: boolean) => {
    'worklet';
    if (disabled) {
      return;
    }
    // console.log('setChangeWidth', changeX, maximumValue, minimumValue, maxValue);
    offset.value =
      Math.abs(offset.value) <= maxValue
        ? offset.value + changeX <= 0
          ? 0
          : offset.value + changeX >= maxValue
            ? maxValue
            : offset.value + changeX
        : offset.value;

    const newWidth = thumbTintWidth + offset.value;
    boxWidth.value = newWidth;
    if (tag && onSlidingComplete) {
      runOnJS(onSlidingComplete)(getChangeValueNum(offset.value));
    }
  };

  const setEndWidth = (x: number) => {
    'worklet';
    if (disabled) {
      return;
    }
    let newWidth = x;
    if (newWidth > maxValue) {
      newWidth = maxValue;
    } else {
      newWidth = newWidth - thumbTintWidth / 2;
    }
    if (newWidth < 0) {
      newWidth = 0;
    }
    offset.value = withTiming(newWidth);
    boxWidth.value = withTiming(newWidth);
    // console.log('----', x, maxValue);
    onSlidingComplete && runOnJS(onSlidingComplete)(getChangeValueNum(newWidth));
  };

  const panChange = Gesture.Pan()
    .onChange(event => {
      'worklet';
      // console.log('onChange pan!', event);
      setChangeWidth(event.changeX, false);
    })
    .onEnd(() => {
      'worklet';
      setChangeWidth(0, true);
      // console.log('onChange end!', event);
    });
  const panTap = Gesture.Tap()
    .onStart(e => {
      // console.log('Single tap!', e);
    })
    .onEnd(event => {
      'worklet';
      // console.log('Single tap end!', event);
      setEndWidth(event.x);
    });

  const boxStyle = useAnimatedStyle(() => {
    return {
      width: thumbTintWidth - minimumTrackPadding + offset.value,
    };
  });

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  useEffect(() => {
    setNowValue(value);
  }, [value]);

  useEffect(() => {
    if (width === 0 || maximumValue - minimumValue === 0) {
      return;
    }
    const nowWidth = (nowValue * (width - thumbTintWidth)) / (maximumValue - minimumValue);
    console.log('nowValue', nowValue, nowWidth, width, thumbTintWidth, maximumValue, minimumValue);
    offset.value = withTiming(nowWidth);
    boxWidth.value = withTiming(nowWidth);
    setMaxValue(width - thumbTintWidth);
  }, [width, nowValue]);

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayout}>
      {width !== 0 && (
        <GestureDetector gesture={panTap}>
          <View style={styles.sliderTrack}>
            <Animated.View style={[styles.miniTrack, boxStyle]} />
            <GestureDetector gesture={panChange}>
              <Animated.View style={[styles.sliderHandle, sliderStyle]} />
            </GestureDetector>
            {leftIcon && <View style={{ position: 'absolute' }}>{leftIcon}</View>}
          </View>
        </GestureDetector>
      )}
    </GestureHandlerRootView>
  );
};

export default Slider;
