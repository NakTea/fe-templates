import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import MarkdownRenderer from './MarkdownRenderer';
import Tips from './Tips';

interface StepItem {
  number: number;
  title: string;
  description?: string;
  image?: string;
}

export interface IStepperProps {
  style?: ViewStyle;
  step: StepItem;
  stepperSerialNumberFontStyle?: any;
  stepperSerialNumberColor?: string;
  stepperSerialNumberRightPadding?: number;
  stepperSerialNumberBgColor?: string;
  stepperCardTitleFontStyle?: any;
  stepperCardTitleColor?: string;
  stepperCardDescFontStyle?: any;
  stepperCardDescColor?: string;
  stepperCardPictureWidth?: number;
  stepperCardPictureRadius?: number;
  stepperCardMarginBottom?: number;
  stepperElementsPadding?: number;
  stepperVerticalLineColor?: string;
  stepperVerticalLineWidth?: number;
  tip?: {
    position: 'top' | 'bottom';
    title: string;
    type: 'error' | 'success' | 'warning' | 'info' | undefined;
    message: string;
    iconSize: number;
  };
}
const Stepper = ({
  style,
  step,
  stepperSerialNumberFontStyle,
  stepperSerialNumberColor,
  stepperSerialNumberRightPadding,
  stepperSerialNumberBgColor,
  stepperCardTitleFontStyle,
  stepperCardTitleColor,
  stepperCardDescFontStyle,
  stepperCardDescColor,
  stepperCardPictureWidth,
  stepperCardPictureRadius,
  stepperCardMarginBottom,
  stepperElementsPadding,
  stepperVerticalLineColor,
  stepperVerticalLineWidth,
  tip,
}: IStepperProps) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { stepper } = components;

  const tipPosition = tip?.position || 'bottom';

  const styles = StyleSheet.create({
    stepNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: stepperSerialNumberBgColor || stepper.stepperSerialNumberBgColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepNumberText: {
      color: stepperSerialNumberColor || stepper.stepperSerialNumberColor,
      fontSize: stepperSerialNumberFontStyle?.fontSize || stepper.stepperSerialNumberFontStyle.fontSize,
      fontWeight: stepperSerialNumberFontStyle?.fontWeight || stepper.stepperSerialNumberFontStyle.fontWeight,
      lineHeight: stepperSerialNumberFontStyle?.lineHeight || stepper.stepperSerialNumberFontStyle.lineHeight,
    },
    stepInfo: {
      flex: 1,
      marginBottom: stepperCardMarginBottom || stepper.stepperCardMarginBottom,
    },
    stepDescription: {
      color: stepperCardDescColor || stepper.stepperCardDescColor,
      fontSize: stepperCardDescFontStyle?.fontSize || stepper.stepperCardDescFontStyle.fontSize,
      fontWeight: stepperCardDescFontStyle?.fontWeight || stepper.stepperCardDescFontStyle.fontWeight,
      lineHeight: stepperCardDescFontStyle?.lineHeight || stepper.stepperCardDescFontStyle.lineHeight,
      paddingBottom: stepperElementsPadding || stepper.stepperElementsPadding,
    },
    stepImage: {
      width: stepperCardPictureWidth || stepper.stepperCardPictureWidth,
      height: stepperCardPictureWidth ? stepperCardPictureWidth / 2 : stepper.stepperCardPictureWidth / 2,
      borderRadius: stepperCardPictureRadius || stepper.stepperCardPictureRadius,
      maxWidth: '100%',
    },
    container: {
      width: '100%',
    },
    stepItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      position: 'relative',
    },
    stepNumberContainer: {
      alignItems: 'center',
      height: '100%',
      position: 'relative',
      marginRight: stepperSerialNumberRightPadding || stepper.stepperSerialNumberRightPadding,
    },
    verticalLine: {
      backgroundColor: stepperVerticalLineColor || stepper.stepperVerticalLineColor,
      width: stepperVerticalLineWidth || stepper.stepperVerticalLineWidth,
      position: 'absolute',
      left: 11,
      top: 24,
      bottom: 0,
    },
    stepTitle: {
      color: stepperCardTitleColor || stepper.stepperCardTitleColor,
      fontSize: stepperCardTitleFontStyle?.fontSize || stepper.stepperCardTitleFontStyle.fontSize,
      fontWeight: stepperCardTitleFontStyle?.fontWeight || stepper.stepperCardTitleFontStyle.fontWeight,
      lineHeight: 24,
      paddingBottom: stepperElementsPadding || stepper.stepperElementsPadding,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {tip && tipPosition === 'top' && (
        <View style={{ marginBottom: 10 }}>
          <Tips style={{ marginBottom: 0 }} {...tip} />
        </View>
      )}
      <View style={styles.stepItem}>
        <View style={styles.stepNumberContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{step.number}</Text>
          </View>
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          {/* {step.description && <Text style={styles.stepDescription}>{step.description}</Text>} */}
          {step.description && (
            <MarkdownRenderer noParagraphMargin style={styles.stepDescription} content={step.description} />
          )}
          {step.image && <Image source={{ uri: step.image }} style={styles.stepImage} />}
          {tip && tipPosition === 'bottom' && (
            <Tips
              {...tip}
              style={{ marginTop: stepperCardMarginBottom || stepper.stepperCardMarginBottom, marginBottom: 0 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Stepper;
