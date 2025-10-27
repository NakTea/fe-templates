import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  location?: string;
  description?: string;
  chartData?: {
    x: string[];
    y: number[];
  };
  message?: string;
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
    showVerticalLines?: boolean; // 新增：是否显示竖线
  };
}

const WeatherDailyRainChance: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  const { width = 360, height = 300, showVerticalLines = false } = opts || {};
  const { location, description, chartData, message } = data || {};

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
  const chartWidth = Math.max(280, screenWidth - 40);
  const chartHeight = 200;

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
      height: chartHeight,
      marginTop: spaceElementsM,
      marginBottom: spaceElementsXxs,
      overflow: 'hidden',
      alignItems: 'center',
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
  });

  // 生成SVG路径
  const generatePath = React.useMemo(() => {
    if (!chartData?.x || !chartData?.y) return { linePath: '', areaPath: '', points: [] };

    const padding = 40;
    const rightPadding = 20; // 右边距
    const innerWidth = chartWidth - padding - rightPadding;
    const innerHeight = chartHeight - padding * 2;

    // 修改：让曲线延伸到右边界
    const xStep = innerWidth / Math.max(chartData.x.length - 1, 1);
    const yMax = 100; // 最大值为100%

    // 生成点坐标
    const points = chartData.y.map((value, index) => ({
      x: padding + index * xStep,
      y: padding + innerHeight - (value / yMax) * innerHeight,
    }));

    // 生成平滑曲线路径
    const linePath = points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const prevPoint = points[index - 1];
      const controlPoint1X = prevPoint.x + xStep * 0.3;
      const controlPoint1Y = prevPoint.y;
      const controlPoint2X = point.x - xStep * 0.3;
      const controlPoint2Y = point.y;

      return `${path} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${point.x} ${point.y}`;
    }, '');

    // 生成面积填充路径
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding + innerHeight} L ${padding} ${padding + innerHeight} Z`;

    return { linePath, areaPath, points };
  }, [chartData, chartWidth, chartHeight]);

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 头部信息 */}
      <View style={styles.headerSection}>
        {location && <Text style={styles.location}>{location}</Text>}
        {description && <Text style={styles.title}>{description}</Text>}
      </View>

      {/* 图表区域 */}
      {chartData?.x && chartData?.y && (
        <View style={styles.chartContainer}>
          <Svg width={chartWidth} height={chartHeight}>
            <Defs>
              <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={chartBgRain || '#317AF7'} stopOpacity="0.8" />
                <Stop offset="1" stopColor={chartBgRain || '#317AF7'} stopOpacity="0.1" />
              </LinearGradient>
            </Defs>

            {/* 水平网格线 */}
            {[0, 25, 50, 75, 100].map(value => {
              const y = 40 + (chartHeight - 80) - (value / 100) * (chartHeight - 80);
              return (
                <Line
                  key={value}
                  x1={40}
                  y1={y}
                  x2={chartWidth - 20}
                  y2={y}
                  stroke={dividerList || '#E0E0E0'}
                  strokeWidth="1"
                />
              );
            })}

            {/* 竖直网格线 - 可选显示 */}
            {showVerticalLines &&
              chartData.x.map((_, index) => {
                const padding = 40;
                const rightPadding = 20;
                const innerWidth = chartWidth - padding - rightPadding;
                const x = padding + index * (innerWidth / Math.max(chartData.x.length - 1, 1));

                return (
                  <Line
                    key={`vertical-${index}`}
                    x1={x}
                    y1={40}
                    x2={x}
                    y2={chartHeight - 40}
                    stroke={dividerList || '#E0E0E0'}
                    strokeWidth="1"
                    strokeDasharray="3,3" // 虚线样式
                  />
                );
              })}

            {/* Y轴标签 */}
            {[0, 25, 50, 75, 100].map(value => {
              const y = 40 + (chartHeight - 80) - (value / 100) * (chartHeight - 80);
              return (
                <SvgText key={value} x={35} y={y + 4} fontSize="12" fill={textPrimary || '#666'} textAnchor="end">
                  {value}%
                </SvgText>
              );
            })}

            {/* X轴标签 - 修改为右对齐最后一个标签 */}
            {chartData.x.map((label, index) => {
              const padding = 40;
              const rightPadding = 20;
              const innerWidth = chartWidth - padding - rightPadding;
              const x = padding + index * (innerWidth / Math.max(chartData.x.length - 1, 1));

              // 最后一个标签右对齐
              const isLast = index === chartData.x.length - 1;
              const textAnchor = isLast ? 'end' : 'middle';

              return (
                <SvgText
                  key={index}
                  x={x}
                  y={chartHeight - 10}
                  fontSize="12"
                  fill={textPrimary || '#666'}
                  textAnchor={textAnchor}>
                  {label}
                </SvgText>
              );
            })}

            {/* 面积填充 */}
            <Path d={generatePath.areaPath} fill="url(#areaGradient)" />

            {/* 线条 */}
            <Path d={generatePath.linePath} stroke={chartBorderRain || '#317AF7'} strokeWidth="2" fill="none" />
          </Svg>
        </View>
      )}

      {/* 底部说明 */}
      <View style={styles.footerSection}>{message && <Text style={styles.message}>{message}</Text>}</View>
    </CardContainer>
  );
};

export default WeatherDailyRainChance;
