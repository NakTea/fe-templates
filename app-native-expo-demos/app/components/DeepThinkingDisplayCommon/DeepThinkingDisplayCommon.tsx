import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect, useRef } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  steps?: {
    type: 'analysis' | 'categorization' | 'integration' | 'filtering' | 'calibration' | 'confirmation';
    text?: string;
  }[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const DeepThinkingDisplayCommon: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};
  const scrollViewRef = useRef<ScrollView>(null);

  const { width = 288, maxHeight = 120 } = opts || {};
  const { steps } = data || {};

  const { textPrimary, textSecondary, cnBodyS, spaceElementsS, spaceElementsXs, sizeIconS } = system || {};

  // 数据更新时滚动到底部
  useEffect(() => {
    if (!!steps?.length && scrollViewRef.current) {
      // 浮窗模式settimeout不执行
      // setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      // }, 100);
    }
  }, [steps, scrollViewRef]);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: spaceElementsS,
      flexDirection: 'row',
    },
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spaceElementsXs,
      marginBottom: spaceElementsXs,
      position: 'relative',
    },
    lastStep: {
      marginBottom: 0,
    },
    iconContainer: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      zIndex: 2,
    },
    textContainer: {
      flex: 1,
      paddingTop: 0,
    },
    stepText: {
      ...cnBodyS,
      color: textPrimary,
    },
    verticalLine: {
      position: 'absolute',
      left: 9,
      top: 20,
      width: 1,
      backgroundColor: textSecondary,
      opacity: 0.3,
      bottom: -spaceElementsXs,
      zIndex: 1,
    },
    chartIcon: {
      flexDirection: 'row',
      gap: 1,
      alignItems: 'flex-end',
    },
    chartBar: {
      width: 2,
      borderRadius: 1,
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 10,
      pointerEvents: 'none',
    },
    maskedContainer: {
      width: '100%',
      height: '100%',
      // Web 特定的遮罩效果
      ...(Platform.OS === 'web' && {
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 59.9%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 59.9%, rgba(0,0,0,0) 100%)',
      }),
    },
  });

  function convertStepType(stepType: string): string {
    return stepType.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }

  const renderVerticalLine = (index: number, totalSteps: number, stepType: string) => {
    // 如果是最后一个步骤或者当前步骤是finish类型，不显示连接线
    if (index >= totalSteps - 1 || stepType === 'finish') {
      return null;
    }

    return <View style={styles.verticalLine} />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spaceElementsXs }}>
        {steps?.map((step, index) => (
          <View key={index} style={[styles.stepContainer, index === steps.length - 1 && styles.lastStep]}>
            <View style={styles.iconContainer}>
              <IconFont name={convertStepType(`step-${step?.type}`)} size={sizeIconS} />
            </View>
            <View style={styles.textContainer}>{step.text && <Text style={styles.stepText}>{step.text}</Text>}</View>
            {renderVerticalLine(index, steps.length, step.type)}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container} hasScrollView={false}>
      {Platform.OS === 'web' ? (
        <View style={styles.maskedContainer}>{renderContent()}</View>
      ) : (
        <MaskedView
          style={{ width: '100%', height: '100%' }}
          maskElement={
            <LinearGradient
              colors={['rgba(217, 217, 217, 1)', 'rgba(255, 255, 255, 0)']}
              locations={[0.599, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientOverlay}
            />
          }>
          {renderContent()}
        </MaskedView>
      )}
    </CardContainer>
  );
};

export default DeepThinkingDisplayCommon;
