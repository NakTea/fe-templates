import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { PieChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

echarts.use([PieChart, SVGRenderer]);

export interface IGaugePointerProps {
  // 基础属性 - 组件核心功能
  value: number; // 指针指向的数值，范围 0-300
  size?: number; // 仪表盘尺寸

  // 内容属性 - 显示内容相关
  children?: React.ReactNode; // 中心显示的内容
  label?: string; // 标签
  // 样式属性 - 自定义样式
  style?: object; // 容器样式
  pointerStyle?: object; // 指针样式
  centerStyle?: object; // 中心内容样式
  valueFontStyle?: object; // 数值样式
  labelFontStyle?: object; // 标签样式

  // 覆盖属性 - 特殊需求覆盖
  pointerColor?: string; // 指针颜色
}

const GaugePointer = ({
  // 设置默认值
  value = 0,
  size = 180,
  children,
  label,
  style,
  pointerStyle,
  centerStyle,
  pointerColor,
  valueFontStyle,
  labelFontStyle,
}: IGaugePointerProps) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { gaugePointer } = components;
  const echartsRef = useRef<any>(null);

  // 创建渐变色函数
  const getGradientColor = (percentage: number): string => {
    const gradientColors = [
      { stop: 0, color: '#6DD400' }, // 优 0-50
      { stop: 1 / 6, color: '#F7B500' }, // 良 51-100
      { stop: 2 / 6, color: '#F78200' }, // 轻度 101-150
      { stop: 3 / 6, color: '#E54545' }, // 中度 151-200
      { stop: 4 / 6, color: '#9747FF' }, // 重度 201-300
      { stop: 1, color: '#7E0023' }, // 严重 >300
    ];

    for (let i = 0; i < gradientColors.length - 1; i++) {
      const start = gradientColors[i];
      const end = gradientColors[i + 1];
      if (percentage >= start.stop && percentage <= end.stop) {
        const t = (percentage - start.stop) / (end.stop - start.stop);
        const r = Math.round(parseInt(start.color.slice(1, 3), 16) * (1 - t) + parseInt(end.color.slice(1, 3), 16) * t);
        const g = Math.round(parseInt(start.color.slice(3, 5), 16) * (1 - t) + parseInt(end.color.slice(3, 5), 16) * t);
        const b = Math.round(parseInt(start.color.slice(5, 7), 16) * (1 - t) + parseInt(end.color.slice(5, 7), 16) * t);
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
    return gradientColors[gradientColors.length - 1].color;
  };

  // 创建弧形图表配置
  const getArcOption = () => {
    // 创建100个小段的数据，但只显示300度（83.33%的圆）
    const totalSegments = 100;
    const arcSegments = Math.round((totalSegments * 270) / 360); // 270度对应的段数
    const chartData = [];

    // 添加弧形段
    for (let i = 0; i < arcSegments; i++) {
      chartData.push({
        value: 1,
        name: `segment${i}`,
        itemStyle: {
          color: getGradientColor(i / (arcSegments - 1)),
          borderWidth: 0,
        },
      });
    }

    // 添加透明段来完成圆形，但不显示
    chartData.push({
      value: totalSegments - arcSegments,
      name: 'invisible',
      itemStyle: {
        color: 'transparent',
        borderWidth: 0,
      },
    });

    return {
      animation: false,
      series: [
        {
          type: 'pie',
          radius: ['85%', '95%'], // 调整厚度，使其更接近HTML效果
          center: ['50%', '50%'],
          startAngle: 225, // 从225度开始
          data: chartData,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            disabled: true,
          },
          silent: true,
          clockwise: true,
        },
      ],
    };
  };

  // 计算指针旋转角度
  const getPointerRotation = () => {
    const maxValue = 300;
    const percentage = Math.min(value / maxValue, 1);
    return 225 + percentage * 300; // 从225度开始，旋转300度范围
  };

  // 获取指针颜色
  const getPointerBorderColor = () => {
    return gaugePointer.pointerColor;
  };

  // 样式定义
  const styles = StyleSheet.create({
    gaugeContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: size || gaugePointer.size,
      height: size || gaugePointer.size,
      position: 'relative',
      ...style,
    },
    gaugeContent: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
      top: 0,
      width: size || gaugePointer.size,
      height: (size || gaugePointer.size) * 0.9,
      ...centerStyle,
    },
    echartsContainer: {
      width: size || gaugePointer.size,
      height: size || gaugePointer.size,
    },
    pointerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size || gaugePointer.size,
      height: size || gaugePointer.size,
      zIndex: 1,
      transform: [{ rotate: `${getPointerRotation()}deg` }],
    },
    pointer: {
      position: 'absolute',
      top: 6, // 调整指针位置，使其指向弧形轨道
      left: '50%',
      width: 0,
      height: 0,
      transform: [{ translateX: -7 }], // 居中指针
      borderLeftWidth: 7,
      borderRightWidth: 7,
      borderBottomWidth: 12,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: getPointerBorderColor(),
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 2,
      ...pointerStyle,
    },
    value: {
      ...gaugePointer.valueFontStyle,
      color: gaugePointer.valueColor,
      ...valueFontStyle,
    },
    label: {
      ...gaugePointer.labelFontStyle,
      color: gaugePointer.labelColor,
      position: 'absolute',
      bottom: 0,
      ...labelFontStyle,
    },
  });

  // 初始化ECharts
  useEffect(() => {
    if (echartsRef.current) {
      const chart = echarts.init(echartsRef.current, undefined, {
        renderer: 'svg',
        width: size || gaugePointer.size,
        height: size || gaugePointer.size,
      });
      chart.setOption(getArcOption());
    }
  }, [value, size]);

  // 渲染函数（复杂内容拆分）
  const renderGaugeBackground = () => (
    <View style={styles.echartsContainer}>
      <SvgChart ref={echartsRef} />
    </View>
  );

  const renderPointer = () => (
    <View style={styles.pointerContainer}>
      <View style={styles.pointer} />
    </View>
  );

  const renderCenterContent = () => <View style={styles.gaugeContent}>{children}</View>;

  // 主渲染
  return (
    <View style={styles.gaugeContainer}>
      {renderGaugeBackground()}
      {renderPointer()}
      {children ? (
        renderCenterContent()
      ) : (
        <View style={styles.gaugeContent}>
          {value && <Text style={styles.value}>{value}</Text>}
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
    </View>
  );
};

export default GaugePointer;
