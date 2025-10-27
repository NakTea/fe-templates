import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { isNotEmpty } from '../utils';

export interface ICardContainerProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  width?: number | string | undefined;
  height?: number | string | undefined;
  maxHeight?: number | string | undefined;
  borderRadius?: number;
  backgroundColor?: string;
  opacity?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  onLayout?: (event: any) => void;
  hasScrollView?: boolean;
}

const CardContainer = ({
  style,
  children,
  width,
  height,
  maxHeight,
  borderRadius,
  backgroundColor,
  paddingVertical,
  paddingHorizontal,
  hasScrollView = true,
  onLayout,
}: ICardContainerProps) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const {
    cardContainerWidth,
    cardContainerHeight,
    cardContainerMaxHeight,
    cardContainerRadius,
    cardContainerBgColor,
    cardContainerUpAndDownPadding,
    cardContainerLeftAndRightPadding,
  } = components?.cardContainer || {};

  const containerWidth = width || cardContainerWidth;
  const containerHeight = height || cardContainerHeight;
  const containerMaxHeight = maxHeight || cardContainerMaxHeight;
  const containerRadius = borderRadius || cardContainerRadius;
  const containerBgColor = backgroundColor || cardContainerBgColor;
  const verticalPadding = isNotEmpty(paddingVertical) ? paddingVertical : cardContainerUpAndDownPadding;
  const horizontalPadding = isNotEmpty(paddingHorizontal) ? paddingHorizontal : cardContainerLeftAndRightPadding;

  const styles = StyleSheet.create({
    outContainer: {
      width: containerWidth,
      height: containerHeight,
    },
    scrollView: {
      width: containerWidth,
      height: containerHeight,
      maxHeight: containerMaxHeight,
      borderRadius: containerRadius,
    },
    container: {
      width: containerWidth,
      height: containerHeight,
      borderRadius: containerRadius,
      backgroundColor: containerBgColor,
      overflow: 'hidden',
      paddingVertical: verticalPadding,
      paddingHorizontal: horizontalPadding,
    },
    containerNoWrapper: {
      width: containerWidth,
      height: containerHeight,
      maxHeight: containerMaxHeight,
      borderRadius: containerRadius,
      backgroundColor: containerBgColor,
      overflow: 'hidden',
      alignSelf: 'flex-start',
      paddingVertical: verticalPadding,
      paddingHorizontal: horizontalPadding,
    },
  });

  if (hasScrollView) {
    return (
      <View style={styles.outContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={[styles.container, style]} onLayout={onLayout}>
            {children}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.containerNoWrapper, style]} onLayout={onLayout}>
      {children}
    </View>
  );
};

export default CardContainer;
