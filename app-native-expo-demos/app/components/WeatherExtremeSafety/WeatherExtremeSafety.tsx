import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import Tips from '../basic/Tips';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 注册 ECharts 组件
echarts.use([SVGRenderer, LineChart, GridComponent, TooltipComponent]);
type TData = {
  location?: string; // 位置信息
  weatherIcon?: string; // 天气预警图标URL
  title?: string; // 预警标题
  chartData?: {
    x?: string[]; // 时间标签
    y?: number[]; // 数值数据
    unit?: string; // 单位
    highlight?: string[]; // 高亮时间
  };
  tips?: {
    type: string;
    message: string;
  }; // 预警提示信息
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherExtremeSafety: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight = 'auto' } = opts || {};
  const screenWidth = typeof width === 'number' ? width : Dimensions.get('window').width;
  const chartWidth = Math.max(280, screenWidth - 80);

  const { location, weatherIcon, title, chartData, tips } = data || {};

  // Token解构
  const {
    cnHeadlineXsStrong,
    cnDisplayXxsStrong,
    cnBodyS,
    cnBodyM,
    chartBorderRain,
    chartBgRain,
    dividerDefault,
    containerErrorWeakDefault,
    radiusInCard,
    spaceElementsXs,
    spaceElementsS,
    spaceCardPaddingUpdownXs,
    spaceCardPaddingLeftRightXs,
    textTitle,
    textSecondary,
    textPrimary,
    containerPrimaryWeather,
    sizeIconXs,
    iconPrimary,
  } = system || {};

  const chartRef = useRef<any>(null);

  // ECharts 配置
  const getChartOption = useCallback(
    () => ({
      animation: false,
      grid: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chartData?.x,
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: (value: string) => {
            return chartData?.highlight?.includes(value) ? textTitle : textSecondary;
            // 高亮点用 textTitle，其他用灰色
          },
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
          formatter: `{value}${chartData?.unit || '%'}`,
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
            symbol: chartData?.highlight?.includes(chartData?.x?.[index] || '') ? 'circle' : 'none',
            symbolSize: chartData?.highlight?.includes(chartData?.x?.[index] || '') ? 7 : 0,
            itemStyle: {
              color: chartData?.highlight?.includes(chartData?.x?.[index] || '') ? textTitle : chartBorderRain,
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
      //   trigger: 'item', // 只展示具体的点
      //   position: 'bottom',
      //   formatter: (params: any) => {
      //     return `
      //     <div>
      //       <div>${params.name}</div>
      //       <div>降水概率：${params.value} ${chartData?.unit || '%'}</div>
      //     </div>
      //   `;
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
      chartData?.highlight,
      chartData?.unit,
      chartBorderRain,
      chartBgRain,
      cnBodyS,
    ],
  );

  // 使用 useEffect 来设置图表配置
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        // width: chartWidth,
        width: 266,
        height: 80,
      });
      chart.setOption(getChartOption());
    }
  }, [getChartOption, chartWidth]);

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsS,
      backgroundColor: containerPrimaryWeather,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    titleText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    header: {
      alignItems: 'center',
    },
    weatherIcon: {
      marginBottom: spaceElementsXs,
    },
    warningTitle: {
      ...cnDisplayXxsStrong,
      color: textTitle,
      textAlign: 'center',
    },
    chartContainer: {
      height: 80,
      padding: spaceElementsXs,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBar: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: containerErrorWeakDefault,
      borderRadius: radiusInCard,
      padding: spaceCardPaddingUpdownXs,
      paddingHorizontal: spaceCardPaddingLeftRightXs,
    },
    alertIcon: {
      marginTop: 3,
      marginRight: 4,
    },
    alertText: {
      ...cnBodyM,
      color: textPrimary,
      flex: 1,
    },
    noDataContainer: {
      ...cnBodyM,
      color: textSecondary,
      textAlign: 'center',
    },
    noDataText: {
      ...cnBodyM,
      color: textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标题区域 */}
      {location && (
        <AnimationFadeSlide style={styles.titleContainer}>
          <Fragment>
            <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />
            <Text style={styles.titleText}>{location}</Text>
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 预警图标和类型 */}
      <View style={styles.header}>
        {weatherIcon && (
          <AnimationFadeSlide>
            <IconFont name={weatherIcon} size={64} />
          </AnimationFadeSlide>
        )}
        {title && (
          <AnimationFadeSlide>
            <Text style={styles.warningTitle}>{title}</Text>
          </AnimationFadeSlide>
        )}
      </View>

      {/* 图表区域 */}
      <View style={styles.chartContainer}>
        {chartData?.x && chartData?.y && chartData.x.length > 0 && chartData.y.length > 0 ? (
          <SvgChart ref={chartRef} style={{ width: '100%', height: 80 }} />
        ) : null
        }
      </View>

      {/* 预警提示 */}
      {tips && tips?.message && (
        <AnimationFadeSlide>
          <Tips
            type={tips?.type as 'error' | 'warning' | 'info' | 'success'}
            style={styles.alertBar}
            cardBottomPadding={0}
            tipTextFontStyle={styles.alertText}
            message={tips?.message}
          />
        </AnimationFadeSlide>
      )}
    </CardContainer>
  );
};

export default WeatherExtremeSafety;
