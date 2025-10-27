import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { CustomChart } from 'echarts/charts';
import * as echarts from 'echarts/core';

import { PolarComponent, RadarComponent, SingleAxisComponent } from 'echarts/components';

import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

echarts.use([PolarComponent, RadarComponent, SingleAxisComponent, CustomChart, SVGRenderer]);

type TData = {
  location?: string;
  date?: string;
  details?: {
    label?: string;
    value?: string;
  }[];
  wind?: {
    direction?: string;
    level?: number;
    unit?: string;
  };
  suggestion?: {
    title?: string;
    description?: string;
  };
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherDailyWind: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};
  const echartsRef = useRef<any>(null);

  const { width, maxHeight } = opts || {};
  const { location, date, details, wind, suggestion } = data || {};

  // 风向指针旋转动画
  const pointerRotation = useSharedValue(0);

  const {
    textTitle,
    textPrimary,
    textSecondary,
    dividerDefault,
    spaceElementsXs,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnBodyL,
    cnBodyS,
    cnBodyM,
    containerPrimaryWeather,
    sizeIconXs,
  } = system || {};

  // 风向角度映射
  const directionAngles: { [key: string]: number } = {
    北: 180,
    东北: 225,
    东: 270,
    东南: 315,
    南: 0,
    西南: 45,
    西: 90,
    西北: 135,
  };

  // 获取风向角度
  const getWindAngle = () => {
    return directionAngles[wind?.direction || ''] || 0;
  };

  // 风向指针动画样式
  const pointerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${pointerRotation.value}deg` }],
    };
  });

  // ECharts配置
  const getEchartsOption = useCallback(() => {
    return {
      backgroundColor: 'transparent',
      polar: {
        center: ['50%', '50%'],
        radius: '85%',
      },
      animation: false,
      angleAxis: {
        type: 'value',
        min: 0,
        max: 360,
        startAngle: 0, // 0° 在正上方
        clockwise: true, // 顺时针
        axisLine: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        axisTick: {
          show: true,
          length: 8, // 刻度长度
          lineStyle: {
            color: dividerDefault,
            width: 1,
          },
        },
        splitNumber: 120,
      },
      radiusAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLine: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
      },
    };
  }, [dividerDefault]);

  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: containerPrimaryWeather,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
      marginBottom: spaceElementsM,
    },
    titleText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    cardLayout: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spaceElementsM,
      marginBottom: spaceElementsM,
    },
    contentLeft: {
      flex: 1,
    },
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: spaceElementsM,
      borderBottomWidth: 1,
      borderBottomColor: dividerDefault,
    },
    dataRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    dataLabel: {
      ...cnBodyS,
      color: textSecondary,
    },
    dataValue: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
    },
    dialContainer: {
      width: 150,
      height: 150,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialContainer2: {
      width: 150,
      height: 1,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    direction: {
      ...cnBodyS,
      position: 'absolute',
      color: textSecondary,
    },
    north: { top: 3, left: '50%', transform: [{ translateX: -6 }] },
    south: { bottom: 3, left: '50%', transform: [{ translateX: -6 }] },
    east: { right: 3, top: '50%', transform: [{ translateY: -6 }] },
    west: { left: 3, top: '50%', transform: [{ translateY: -6 }] },
    pointerContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialCenterText: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    windLevel: {
      fontSize: 48,
      fontWeight: '800',
      color: textTitle,
    },
    windUnit: {
      ...cnBodyL,
      color: textPrimary,
    },
    clothingSuggestionContainer: {
      gap: spaceElementsXs,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    description: {
      ...cnBodyM,
      color: textPrimary,
    },
  });

  useEffect(() => {
    if (echartsRef.current) {
      const chart = echarts.init(echartsRef.current, 'light', {
        renderer: 'svg',
        width: 150,
        height: 150,
      });
      chart.setOption(getEchartsOption());
    }
  }, [getEchartsOption, wind?.direction]);

  // 风向指针旋转动画效果
  useEffect(() => {
    const targetAngle = getWindAngle();
    pointerRotation.value = withTiming(targetAngle, {
      duration: 800,
    });
  }, [wind?.direction, pointerRotation]);

  const [containerWidth, setContainerWidth] = useState(0);

  // 容器布局监听
  const onContainerLayout = (event: any) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setContainerWidth(measuredWidth);
  };

  return (
    <CardContainer style={styles.cardContainer} width={width} maxHeight={maxHeight} onLayout={onContainerLayout}>
      {/* 头部 */}
      {(location || date) && (
        <AnimationFadeSlide style={styles.header}>
          <Fragment>
            {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={textTitle} />}
            {location && <Text style={styles.titleText}>{location}</Text>}
            {location && date && <Text style={styles.titleText}>·</Text>}
            {date && <Text style={styles.titleText}>{date}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}
      {/* 主要内容 */}
      <View style={styles.cardLayout}>
        {/* 左侧数据 */}
        {containerWidth > 300 && details ? (
          <View style={styles.contentLeft}>
            {details?.map((item, index) => (
              <AnimationFadeSlide key={index} style={styles.dataRow}>
                <Fragment>
                  <Text style={styles.dataLabel}>{item.label}</Text>
                  <Text style={styles.dataValue}>{item.value}</Text>
                </Fragment>
              </AnimationFadeSlide>
            ))}
          </View>
        ) : (
          <View style={styles.contentLeft} />
        )}

        {wind?.direction ? (
          <AnimationFadeSlide enableSlide={false} style={styles.dialContainer}>
            <Fragment>
              {/* ECharts 圆环（刻度） */}
              <SvgChart ref={echartsRef} />

              {/* 四个方向文字 */}
              <Text style={[styles.direction, styles.north]}>北</Text>
              <Text style={[styles.direction, styles.south]}>南</Text>
              <Text style={[styles.direction, styles.east]}>东</Text>
              <Text style={[styles.direction, styles.west]}>西</Text>

              {/* 指针 */}
              <Animated.View style={[styles.pointerContainer, pointerAnimatedStyle]}>
                <IconFont name="chartWindIndicator" size={120} color={textPrimary} />
              </Animated.View>
              {/* 中心风级显示 */}
              <View style={styles.dialCenterText}>
                {wind?.level !== undefined && (
                  <Fragment>
                    <Text style={styles.windLevel}>{wind?.level}</Text>
                    <Text style={styles.windUnit}>{wind?.unit}</Text>
                  </Fragment>
                )}
              </View>
            </Fragment>
          </AnimationFadeSlide>
        ) : (
          <View style={styles.dialContainer2} />
        )}
      </View>

      {/* 穿衣建议 */}
      {suggestion && (
        <AnimationFadeSlide style={styles.clothingSuggestionContainer}>
          <Fragment>
            {suggestion?.title && (
              <AnimationFadeSlide>
                <Text style={styles.title}>{suggestion.title}</Text>
              </AnimationFadeSlide>
            )}
            {suggestion?.description && (
              <AnimationFadeSlide>
                <Text style={styles.description}>{suggestion.description}</Text>
              </AnimationFadeSlide>
            )}
          </Fragment>
        </AnimationFadeSlide>
      )}
    </CardContainer>
  );
};

export default WeatherDailyWind;
