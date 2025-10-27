import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 注册 ECharts 组件
echarts.use([SVGRenderer, LineChart, GridComponent, TooltipComponent]);

type TData = {
  location?: string; // 地点名称
  weatherIcon?: string; // 天气图标
  title?: string; // 主要结论文本
  chartData?: {
    x?: string[]; // 时间标签
    y?: number[]; // 降水概率数据
    highlight?: (string | number)[]; // 高亮日期索引
  };
  message?: string; // 提示文本
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherMultiRain: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight } = opts || {};
  const { location, title, chartData, weatherIcon, message } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    spaceElementsXs,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnBodyS,
    cnBodyM,
    cnDisplayXxsStrong,
    sizeAvatarL,
    chartBorderRain,
    chartBgRain,
    dividerDefault,
    containerPrimaryWeather,
    sizeIconXs,
    iconPrimary,
  } = system || {};

  const chartRef = useRef<any>(null);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = typeof width === 'number' ? width - 48 : screenWidth - 48;

  // 创建高亮数组
  const pointRadiuses = chartData?.x?.map((value: string, index: number) =>
    chartData?.highlight?.includes(value) || chartData?.highlight?.includes(index) ? 7 : 0,
  );
  const pointBackgroundColors = chartData?.x?.map((value: string, index: number) =>
    chartData?.highlight?.includes(value) || chartData?.highlight?.includes(index) ? textTitle : chartBorderRain,
  );
  const xTickColors = chartData?.x?.map((value: string, index: number) =>
    chartData?.highlight?.includes(value) || chartData?.highlight?.includes(index) ? textTitle : textSecondary,
  );

  const getChartOption = useCallback(
    () => ({
      animation: false,
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chartData?.x,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          ...cnBodyS,
          color: (_: any, index: number) => xTickColors?.[index] || textSecondary,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        interval: 50,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          ...cnBodyS,
          color: textSecondary,
          formatter: '{value}%',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: dividerDefault,
            width: 1,
          },
        },
      },
      series: [
        {
          type: 'line',
          data: chartData?.y?.map((value: number, index: number) => ({
            value,
            symbol: pointRadiuses?.[index] && pointRadiuses?.[index] > 0 ? 'circle' : 'none',
            symbolSize: pointRadiuses?.[index] || 0,
            itemStyle: {
              color: pointBackgroundColors?.[index],
              borderColor: textTitle,
              borderWidth: 2,
            },
          })),
          lineStyle: {
            color: chartBorderRain,
            width: 3,
          },
          smooth: true,
          areaStyle: {
            color: chartBgRain,
          },
        },
      ],
      // tooltip: {
      //   trigger: 'axis',
      //   formatter: (params: any) => {
      //     const data = params[0];
      //     return `降雨概率: ${data.value}%`;
      //   },
      //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
      //   borderColor: 'transparent',
      //   textStyle: {
      //     color: '#FFFFFF',
      //     fontSize: 12,
      //   },
      // },
    }),
    [
      chartData?.x,
      textTitle,
      textSecondary,
      dividerDefault,
      chartData?.y,
      pointRadiuses,
      pointBackgroundColors,
      chartBorderRain,
      chartBgRain,
      xTickColors,
      cnBodyS,
    ],
  );

  // 使用 useEffect 来设置图表配置
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: chartWidth,
        height: 80,
      });
      chart.setOption(getChartOption());
    }
  }, [getChartOption, chartWidth]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerPrimaryWeather,
    },
    locationSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    locationText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    titleSection: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spaceElementsXs,
      marginTop: spaceElementsM,
    },
    titleText: {
      ...cnDisplayXxsStrong,
      color: textTitle,
    },
    chartWrapper: {
      height: 80,
      width: '100%',
      marginTop: spaceElementsM,
      alignItems: 'center',
    },
    messageText: {
      ...cnBodyS,
      color: textSecondary,
      marginTop: spaceElementsM,
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
    noDataText: {
      ...cnBodyM,
      color: textPrimary,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标题区域 */}
      {location && (
        <AnimationFadeSlide style={styles.locationSection}>
          <Fragment>
            {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />}
            {location && <Text style={styles.locationText}>{location}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 标题区域 */}
      {title && (
        <View style={styles.titleSection}>
          {weatherIcon && (
            <AnimationFadeSlide>
              <IconFont name={weatherIcon} size={64} />
            </AnimationFadeSlide>
          )}
          {title && (
            <AnimationFadeSlide>
              <Text style={styles.titleText}>{title}</Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}

      {/* 图表区域 */}
      <View style={styles.chartWrapper}>
        {chartData && chartData?.x && chartData?.x?.length > 0 && chartData.y && chartData.y.length > 0 ? (
          <SvgChart ref={chartRef} style={{ width: chartWidth, height: 80 }} />
        ) : null}
      </View>

      {/* 提示文本 */}
      {message && (
        <AnimationFadeSlide>
          <Text style={styles.messageText}>{message}</Text>
        </AnimationFadeSlide>
      )}
    </CardContainer>
  );
};

export default WeatherMultiRain;
