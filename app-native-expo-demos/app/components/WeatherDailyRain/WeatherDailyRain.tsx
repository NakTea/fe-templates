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
  location?: string;
  date?: string;
  percent?: number;
  condition?: string;
  chartData?: {
    x?: string[];
    y?: number[];
    highlight?: string[];
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

const WeatherDailyRain: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};
  const chartRef = useRef<any>(null);

  // 安全解构
  const { width, maxHeight } = opts || {};
  const screenWidth = typeof width === 'number' ? width : Dimensions.get('window').width;
  const chartWidth = Math.max(280, screenWidth - 80);

  const { location, date, percent, condition, chartData, suggestion } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    containerPrimaryWeather,
    iconPrimary,
    chartBorderRain,
    chartBgRain,
    dividerDefault,
    spaceElementsXs,
    spaceElementsS,
    cnHeadlineXsStrong,
    cnBodyS,
    cnBodyM,
    cnDisplayMStrong,
    cnDisplayXxsStrong,
    spaceCardPaddingUpdownS,
    spaceCardPaddingLeftRightS,
    sizeIconXs,
  } = system || {};

  // 根据highlight获取强调时间索引
  const getActiveTimeIndexes = () => {
    if (!chartData?.highlight || !chartData?.x) return [];

    const activeIndexes: number[] = [];

    chartData.highlight.forEach(highlightTime => {
      const currentHour = parseInt(highlightTime.split(':')[0]);
      const currentMinute = parseInt(highlightTime.split(':')[1]);

      for (let i = 0; i < (chartData.x?.length || 0); i++) {
        const timeStr = chartData.x?.[i];
        if (!timeStr) continue;
        const timeHour = parseInt(timeStr.split(':')[0]);
        const timeMinute = parseInt(timeStr.split(':')[1]);

        if (timeHour === currentHour) {
          if (i === 0 || i === (chartData.x?.length || 0) - 1) {
            if (!activeIndexes.includes(i)) activeIndexes.push(i);
            break;
          }
          if (currentMinute >= timeMinute) {
            if (!activeIndexes.includes(i)) activeIndexes.push(i);
            break;
          } else {
            if (!activeIndexes.includes(i - 1)) activeIndexes.push(i - 1);
            break;
          }
        }
      }
    });

    return activeIndexes;
  };

  const activeTimeIndexes = getActiveTimeIndexes();

  // 准备图表数据
  const times = chartData?.x;
  const probabilities = chartData?.y;

  // 创建高亮数组
  const pointRadiuses = times?.map((_, index) => (activeTimeIndexes.includes(index) ? 7 : 0));
  const pointBackgroundColors = times?.map((_, index) =>
    activeTimeIndexes.includes(index) ? textTitle : chartBorderRain,
  );
  const xTickColors = times?.map((_, index) => (activeTimeIndexes.includes(index) ? textTitle : textSecondary));

  // ECharts 配置
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
        data: times,
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
          data: probabilities?.map((value: number, index: number) => ({
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
      times,
      textTitle,
      textSecondary,
      dividerDefault,
      probabilities,
      pointRadiuses,
      pointBackgroundColors,
      chartBorderRain,
      chartBgRain,
      cnBodyS,
      xTickColors,
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
      gap: spaceElementsS,
      backgroundColor: containerPrimaryWeather,
      paddingVertical: spaceCardPaddingUpdownS,
      paddingHorizontal: spaceCardPaddingLeftRightS,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    titleText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    centerContent: {
      alignItems: 'center',
    },
    probabilityText: {
      ...cnDisplayMStrong,
      color: textTitle,
    },
    weatherDescText: {
      ...cnDisplayXxsStrong,
      color: textPrimary,
    },
    chartContainer: {
      height: 80,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    suggestionContainer: {
      gap: spaceElementsXs,
    },
    suggestionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    suggestionContent: {
      ...cnBodyM,
      color: textPrimary,
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
    },
    noDataText: {
      ...cnBodyM,
      color: textPrimary,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标题区域 */}
      {(location || date) && (
        <AnimationFadeSlide style={styles.titleRow}>
          <Fragment>
            {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />}
            {location && <Text style={styles.titleText}>{location}</Text>}
            {location && date && <Text style={styles.titleText}>·</Text>}
            {date && <Text style={styles.titleText}>{date}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 中心内容 */}
      {(percent !== undefined || condition) && (
        <View style={styles.centerContent}>
          {percent !== undefined && (
            <AnimationFadeSlide>
              <Text style={styles.probabilityText}>{percent}%</Text>
            </AnimationFadeSlide>
          )}
          {condition && (
            <AnimationFadeSlide>
              <Text style={styles.weatherDescText}>{condition}</Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}

      {/* 图表区域 */}
      <View style={styles.chartContainer}>
        {chartData?.x && chartData?.y && chartData.x.length > 0 && chartData.y.length > 0 ? (
          <SvgChart ref={chartRef} style={{ width: '100%', height: 80 }} />
        ) :
          null
        }
      </View>

      {/* 建议区域 */}
      {suggestion && (
        <View style={styles.suggestionContainer}>
          {suggestion?.title && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionTitle}>{suggestion?.title}</Text>
            </AnimationFadeSlide>
          )}
          {suggestion?.description && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionContent}>{suggestion?.description}</Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}
    </CardContainer>
  );
};

export default WeatherDailyRain;
