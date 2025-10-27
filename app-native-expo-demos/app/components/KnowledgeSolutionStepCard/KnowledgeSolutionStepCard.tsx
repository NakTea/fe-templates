import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import Stepper from '../basic/Stepper';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TStepItem = {
  number: number;
  title: string;
  description?: string;
  image?: string;
};

type TList = {
  title?: string;
  steps?: TStepItem[];
};

type TData = {
  title?: string;
  list?: TList[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeSolutionStepCard: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight } = opts || {};
  const { title, list } = data || {};

  // Token解构
  const { textTitle, containerTertiary, spaceElementsM, spaceElementsL, radiusInCard, cnHeadlineXsStrong } =
    system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    contentContainer: {
      gap: spaceElementsL,
    },
    list: {
      backgroundColor: containerTertiary,
      borderRadius: radiusInCard,
      padding: spaceElementsM,
      gap: spaceElementsM,
    },
    listTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    stepsContainer: {
      gap: 0, // Stepper组件自带marginBottom
    },
    lastStepContainer: {
      marginBottom: 0, // 最后一个步骤不需要底部间距
    },
  });

  const renderList = (list: TList, index: number) => (
    <View key={index} style={styles.list}>
      {list?.title && <Text style={styles.listTitle}>{list?.title}</Text>}
      {list?.steps && list?.steps?.length > 0 && (
        <View style={styles.stepsContainer}>
          {list?.steps?.map((step, stepIndex) => {
            return <Stepper key={stepIndex} step={step} />;
          })}
        </View>
      )}
    </View>
  );

  return (
    <CardContainer width={width} maxHeight={maxHeight} hasScrollView={false} style={styles.container}>
      {title && (
        <AnimationFadeSlide enableSlide={false}>
          <Text style={styles.title}>{title}</Text>
        </AnimationFadeSlide>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {list && list?.length > 0 && (
          <AnimationFadeSlide>
            <View style={styles.contentContainer}>{list?.map((item, index) => renderList(item, index))}</View>
          </AnimationFadeSlide>
        )}
      </ScrollView>
    </CardContainer>
  );
};

export default KnowledgeSolutionStepCard;
