import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TStatsItem = {
  label?: string;
  value?: string | number;
  unit?: string;
};

type TData = {
  title?: string;
  list?: TStatsItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeStatsList: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, list } = data || {};

  // Token解构
  const {
    textPrimary,
    textTitle,
    textSecondary,
    dividerList,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnBodyM,
    cnDisplayXxsStrong,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    statsList: {
      gap: spaceElementsS,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spaceElementsXs,
    },
    label: {
      ...cnBodyM,
      color: textPrimary,
      flex: 1,
      margin: 0,
    },
    numberContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spaceElementsXs,
    },
    number: {
      ...cnDisplayXxsStrong,
      color: textPrimary,
      textAlign: 'right',
    },
    unit: {
      ...cnBodyM,
      color: textSecondary,
    },
    divider: {
      height: 1,
      backgroundColor: dividerList,
      marginTop: spaceElementsS,
    },
  });

  const renderStatsItem = (item: TStatsItem, index: number) => {
    const { label, value, unit } = item || {};
    const isLastItem = index === (list?.length || 0) - 1;

    return (
      <View key={index}>
        <View style={styles.statsRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View style={styles.numberContainer}>
            {value !== undefined && <Text style={styles.number}>{value}</Text>}
            {unit && <Text style={styles.unit}>{unit}</Text>}
          </View>
        </View>
        {!isLastItem && <View style={styles.divider} />}
      </View>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.statsList}>{list?.map((item, index) => renderStatsItem(item, index))}</View>
    </CardContainer>
  );
};

export default KnowledgeStatsList;
