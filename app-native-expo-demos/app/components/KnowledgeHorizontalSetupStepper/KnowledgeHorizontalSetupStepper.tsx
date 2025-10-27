import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CardContainer from '../basic/CardContainer';
import StepperHorizontal, { StepItem } from '../basic/StepperHorizontal';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  title?: string;
  steps?: StepItem[];
  activeStep?: number;
  activeBtnTextPrefix?: string;
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeHorizontalSetupStepper: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, steps = [], activeStep = 1, activeBtnTextPrefix = '步骤' } = data || {};

  // Token解构
  const { cnHeadlineXsStrong, textTitle, spaceElementsM } = system || {};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginBottom: spaceElementsM,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} hasScrollView={false} style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      {steps?.length > 0 && (
        <StepperHorizontal steps={steps} activeStep={activeStep} activeBtnTextPreix={activeBtnTextPrefix} />
      )}
    </CardContainer>
  );
};

export default KnowledgeHorizontalSetupStepper;
