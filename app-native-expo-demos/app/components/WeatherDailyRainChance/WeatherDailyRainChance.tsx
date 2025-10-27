import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 注册 ECharts 组件
echarts.use([SVGRenderer, LineChart, GridComponent, TooltipComponent]);

type TData = {
  location?: string; // 地区名称
  description?: string; // 标题内容（如"周四的降水概率：50%"）
  chartData?: {
    x: string[]; // X轴时间标签
    y: number[]; // Y轴降水概率数据
  };
  message?: string; // 底部说明文字
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherDailyRainChance: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};
  const chartRef = useRef<any>(null);

  // 安全解构
  const { width = 360, maxHeight = 300 } = opts || {};
  const { location, description, chartData, message } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    spaceElementsXxs,
    spaceElementsXs,
    spaceElementsM,
    chartBorderRain,
    chartBgRain,
    cnBodyM,
    cnBodyS,
    cnHeadlineXxsStrong,
    dividerList,
  } = system || {};

  const screenWidth = typeof width === 'number' ? width : Dimensions.get('window').width;
  const chartWidth = Math.max(280, screenWidth - 80);

  useEffect(() => {
    if (!chartData?.x || !chartData?.y || chartData.x.length === 0 || chartData.y.length === 0) {
      return;
    }

    const option = {
      backgroundColor: 'transparent',
      animation: false,
      grid: {
        left: 30,
        right: 22,
        top: 20,
        bottom: 20,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: chartData.x,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#ffffff', // 设置为白色
          fontSize: 12,
          margin: 8,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        interval: 25,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#ffffff', // 设置为白色
          fontSize: 12,
          formatter: '{value} %',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: dividerList || '#FFD700',
            width: 1,
            type: 'solid',
          },
        },
      },
      series: [
        {
          type: 'line',
          data: chartData.y,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: chartBorderRain || '#317AF7',
            width: 2,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: chartBgRain || 'rgba(49, 122, 247, 0.8)',
                },
                {
                  offset: 1,
                  color: chartBgRain
                    ? chartBgRain.includes('rgba')
                      ? chartBgRain.replace(/[\d\.]+\)$/g, '0.2)')
                      : `${chartBgRain}33`
                    : 'rgba(49, 122, 247, 0.2)',
                },
              ],
            },
          },
        },
      ],
      // tooltip: {
      //   trigger: 'axis',
      //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
      //   borderColor: chartBorderRain || '#317AF7',
      //   borderWidth: 1,
      //   textStyle: {
      //     color: '#ffffff',
      //     fontSize: 12,
      //   },
      //   formatter: (params: any) => {
      //     const data = params[0];
      //     return `${data.name}<br/>${data.value}%`;
      //   },
      // },
    };

    let chart: any;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: chartWidth,
        height: 200,
      });
      chart.setOption(option);
    }

    return () => chart?.dispose();
  }, [chartData, chartWidth, chartBorderRain, chartBgRain, dividerList]);

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsXxs,
    },
    headerSection: {
      marginTop: 0,
    },
    location: {
      ...cnBodyM,
      color: textPrimary,
      marginTop: spaceElementsXxs,
      marginBottom: spaceElementsXxs,
    },
    title: {
      ...cnHeadlineXxsStrong,
      color: textTitle,
      marginTop: spaceElementsXxs,
      marginBottom: spaceElementsXxs,
    },
    chartContainer: {
      height: 200,
      marginTop: spaceElementsM,
      marginBottom: spaceElementsXxs,
      backgroundColor: 'transparent',
    },
    footerSection: {
      marginBottom: 0,
    },
    message: {
      ...cnBodyS,
      color: textPrimary,
      textAlign: 'center',
      marginTop: spaceElementsXs,
      marginBottom: spaceElementsXs,
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
    },
    noDataText: {
      color: textPrimary,
      fontSize: 14,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 头部信息 */}
      <View style={styles.headerSection}>
        {location && <Text style={styles.location}>{location}</Text>}
        {description && <Text style={styles.title}>{description}</Text>}
      </View>

      {/* 图表区域 */}
      <View style={styles.chartContainer}>
        {chartData?.x && chartData?.y && chartData.x.length > 0 && chartData.y.length > 0 ? (
          <SvgChart ref={chartRef} />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>暂无图表数据</Text>
          </View>
        )}
      </View>

      {/* 底部说明 */}
      <View style={styles.footerSection}>{message && <Text style={styles.message}>{message}</Text>}</View>
    </CardContainer>
  );
};

export default WeatherDailyRainChance;
