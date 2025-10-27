import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { hexToRgba } from '../utils';

type TBarData = {
  value?: string; // 数值（如 "175km"）
  height?: number; // 柱子高度（px）
  title?: string; // 主标题（如 "21寸"）
  labels?: string[]; // 标签数组（如 ["SKE6520S", "SHEVAS"]）
};

type TData = {
  title?: string; // 图表标题
  description?: string; // 图表描述
  bars?: TBarData[]; // 柱状图数据
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeBarChartComparison: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight } = opts || {};
  const { title, description, bars } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    textSecondary,
    containerBpDefault,
    cnHeadlineXsStrong,
    cnBodyS,
    cnDisplayXxxsStrong,
    spaceElementsXxs,
    spaceElementsS,
    spaceElementsM,
    radiusComp1,
  } = system || {};

  // 计算最大高度用于柱子高度比例
  const maxBarHeight = Math.max(...(bars?.map(bar => bar.height || 0) || [0]));
  const baseHeight = 140; // 基础高度

  const getBarHeight = (height: number) => {
    if (maxBarHeight === 0) return baseHeight;
    return (height / maxBarHeight) * baseHeight;
  };

  const styles = StyleSheet.create({
    header: {
      marginBottom: spaceElementsM,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginBottom: 0,
    },
    description: {
      ...cnBodyS,
      color: textSecondary,
      marginTop: spaceElementsS,
    },
    chartScrollWrapper: {
      flex: 1,
    },
    chart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: spaceElementsM,
      minWidth: 310,
    },
    bar: {
      flex: 1,
      alignItems: 'center',
      gap: spaceElementsS,
      minWidth: 70,
    },
    topLabel: {
      ...cnDisplayXxxsStrong,
      color: textPrimary,
      textAlign: 'center',
    },
    lineContainer: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    line: {
      width: 12,
      borderRadius: radiusComp1,
    },
    bottomLabel: {
      alignItems: 'center',
      gap: spaceElementsXxs,
    },
    bottomTitle: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      textAlign: 'center',
      marginBottom: spaceElementsXxs,
    },
    labelText: {
      ...cnBodyS,
      color: textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight}>
      {/* 标题部分 */}
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}

      {/* 图表部分 */}
      {bars && bars.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chartScrollWrapper}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.chart}>
            {bars.map((bar, index) => {
              const barHeight = getBarHeight(bar.height || 0);

              return (
                <View key={index} style={styles.bar}>
                  {/* 顶部数值 */}
                  {bar.value && <Text style={styles.topLabel}>{bar.value}</Text>}

                  {/* 柱子 */}
                  <View style={[styles.lineContainer, { height: barHeight }]}>
                    <LinearGradient
                      colors={[
                        hexToRgba(containerBpDefault, 0.8), // 80%透明度
                        hexToRgba(containerBpDefault, 0), // 0%透明度
                      ]}
                      start={{ x: 0, y: 1 }} // 从底部开始
                      end={{ x: 0, y: 0 }} // 到顶部结束
                      style={[styles.line, { height: barHeight }]}
                    />
                  </View>

                  {/* 底部标签 */}
                  <View style={styles.bottomLabel}>
                    {bar.title && <Text style={styles.bottomTitle}>{bar.title}</Text>}
                    {bar.labels?.map((label, labelIndex) => (
                      <Text key={labelIndex} style={styles.labelText}>
                        {label}
                      </Text>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </CardContainer>
  );
};

export default KnowledgeBarChartComparison;
