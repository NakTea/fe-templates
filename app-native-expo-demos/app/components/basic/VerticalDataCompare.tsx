import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

interface DataItem {
  label: string;
  value: number;
}

interface VerticalDataCompareProps {
  data: DataItem[];
  maxValue?: number;
  maxHeight?: number;
  unit?: string;
  lineColor?: string;
  lineWidth?: number;
  dotSize?: number;
  dotColor?: string;
  style?: ViewStyle;
  showDot?: boolean;
}

const VerticalDataCompare: React.FC<VerticalDataCompareProps> = ({
  data,
  maxValue,
  maxHeight = 180,
  lineColor = '#4080FF',
  dotColor = '4080FF',
  lineWidth = 2,
  dotSize = 8,
  showDot = true,
  unit = '',
  style = {},
}) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { verticalDataCompare } = components;
  const {
    dotSize: dataDotSize,
    dotColor: dataDotColor,
    lineWidth: dataLineWidth,
    lineColor: dataLineColor,
    labelStyle,
    unitStyle,
    valueStyle,
  } = verticalDataCompare;

  const actualMaxValue = maxValue || Math.max(...data.map(item => item.value));
  const dotSizeTemp = dotSize || dataDotSize;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
    },
    itemContainer: {
      alignItems: 'center',
    },
    lineContainer: {
      alignItems: 'center',
    },
    line: {
      width: lineWidth || dataLineWidth,
      backgroundColor: lineColor || dataLineColor,
    },
    dot: {
      width: dotSizeTemp,
      height: dotSizeTemp,
      borderRadius: dotSizeTemp / 2,
      backgroundColor: dotColor || dataDotColor,
      position: 'absolute',
      top: -dotSize / 2,
      left: ((lineWidth || dataLineWidth) - dotSizeTemp) / 2,
    },
    valueContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    value: {
      ...valueStyle,
    },
    unit: {
      ...unitStyle,
    },
    label: {
      ...labelStyle,
    },
  });

  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}>
      {data.map((item, index) => {
        const height = (item.value / actualMaxValue) * maxHeight;
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.unit}>{unit}</Text>
            </View>
            <View style={styles.lineContainer}>
              <View style={[styles.line, { height }]}>{showDot && <View style={styles.dot} />}</View>
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default VerticalDataCompare;
