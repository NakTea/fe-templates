import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import AutoHeightImage from '../basic/AutoHeightImage';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TPartItem = {
  number?: string;
  title?: string;
};

type TData = {
  title?: string;
  description?: string;
  image?: string;
  items?: TPartItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeDoubleColumnText: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width, maxHeight } = opts || {};
  const { title, description, image, items } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    containerSecondary,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    radiusComp1,
    cnHeadlineXsStrong,
    cnBodyM,
    cnBodyS,
    radiusImageM,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    header: {
      gap: spaceElementsXs,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    description: {
      ...cnBodyM,
      color: textSecondary,
      margin: 0,
    },
    image: {
      width: '100%',
      borderRadius: radiusImageM,
    },
    directoryList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    directoryItem: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spaceElementsXs,
      marginBottom: spaceElementsS,
    },
    itemNumber: {
      width: 20,
      height: 20,
      backgroundColor: containerSecondary,
      borderRadius: radiusComp1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemNumberText: {
      ...cnBodyS,
      color: textPrimary,
    },
    itemTitle: {
      ...cnBodyM,
      color: textPrimary,
      flex: 1,
      numberOfLines: 2,
      ellipsizeMode: 'tail',
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 头部信息 */}
      <View style={styles.header}>
        {title && (
          <AnimationFadeSlide>
            <Text style={styles.title}>{title}</Text>
          </AnimationFadeSlide>
        )}
        {description && (
          <AnimationFadeSlide>
            <Text style={styles.description}>{description}</Text>
          </AnimationFadeSlide>
        )}
      </View>

      {/* 主图 */}
      {image && (
        <AnimationFadeSlide enableSlide={false}>
          <AutoHeightImage source={{ uri: image }} style={styles.image} />
        </AnimationFadeSlide>
      )}

      {/* 部件列表 */}
      {items && items?.length > 0 && (
        <View style={styles.directoryList}>
          {items?.map(
            (item, index) =>
              (item?.title || item?.number) && (
                <AnimationFadeSlide key={index} style={styles.directoryItem}>
                  <Fragment>
                    {item?.number && (
                      <View style={styles.itemNumber}>
                        <Text style={styles.itemNumberText}>{item?.number}</Text>
                      </View>
                    )}
                    {item?.title && (
                      <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
                        {item?.title}
                      </Text>
                    )}
                  </Fragment>
                </AnimationFadeSlide>
              ),
          )}
        </View>
      )}
    </CardContainer>
  );
};

export default KnowledgeDoubleColumnText;
