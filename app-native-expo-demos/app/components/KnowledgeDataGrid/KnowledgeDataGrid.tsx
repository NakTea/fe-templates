import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import Tips from '../basic/Tips';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TItem = {
  title?: string;
  description?: string;
  value?: string | number;
  unit?: string;
};

type TData = {
  title?: string;
  items?: TItem[];
  tips?: {
    type: 'error' | 'success' | 'warning' | 'info';
    message: string;
  };
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeDataGrid: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 376, maxHeight } = opts || {};
  const { title, items, tips } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    spaceElementsXs,
    spaceElementsS,
    radiusInCard,
    cnHeadlineXsStrong,
    cnHeadlineXxsStrong,
    cnBodyS,
    cnBodyL,
    cnDisplayXxsStrong,
  } = system || {};

  const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      gap: spaceElementsS,
    },
    cardTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginBottom: 0,
    },
    dataGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spaceElementsXs,
      justifyContent: 'space-between',
    },
    dataBlock: {
      width: '48%',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      padding: spaceElementsS,
      borderRadius: radiusInCard,
      gap: 0,
    },
    valueTitle: {
      ...cnHeadlineXxsStrong,
      color: textTitle,
      marginBottom: 0,
    },
    valueDescription: {
      ...cnBodyS,
      color: textPrimary,
      marginBottom: 0,
    },
    dataValue: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spaceElementsXs,
      marginTop: 'auto',
    },
    number: {
      ...cnDisplayXxsStrong,
      color: textPrimary,
    },
    unit: {
      ...cnBodyL,
      color: textPrimary,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.scrollContainer}>
      {title && (
        <AnimationFadeSlide>
          <Text style={styles.cardTitle}>{title}</Text>
        </AnimationFadeSlide>
      )}

      {items && items?.length > 0 && (
        <View style={styles.dataGrid}>
          {items.map((item, index) => (
            <AnimationFadeSlide key={index} style={styles.dataBlock}>
              <View>
                {item?.title && <Text style={styles.valueTitle}>{item?.title}</Text>}
                {item?.description && <Text style={styles.valueDescription}>{item?.description}</Text>}
                <View style={styles.dataValue}>
                  {item?.value && <Text style={styles.number}>{item?.value}</Text>}
                  {item?.unit && <Text style={styles.unit}>{item?.unit}</Text>}
                </View>
              </View>
            </AnimationFadeSlide>
          ))}
        </View>
      )}

      {tips && (
        <AnimationFadeSlide>
          <Tips type={tips?.type} message={tips?.message} />
        </AnimationFadeSlide>
      )}
    </CardContainer>
  );
};

export default KnowledgeDataGrid;
