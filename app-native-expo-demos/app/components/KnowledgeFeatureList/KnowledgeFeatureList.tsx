import React, { Fragment } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TFeatureItem = {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
};

type TData = {
  title?: string;
  items?: TFeatureItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeFeatureList: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 440, maxHeight = 376 } = opts || {};
  const { title, items } = data || {};

  // Token解构
  const {
    textPrimary,
    textTitle,
    spaceElementsXxxs,
    spaceElementsM,
    spaceElementsL,
    radiusImageS,
    cnHeadlineXsStrong,
    cnHeadlineXxsStrong,
    cnBodyS,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    header: {
      marginBottom: 0,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    scrollContainer: {
      flex: 1,
    },
    list: {
      gap: spaceElementsL,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spaceElementsM,
    },
    image: {
      width: 80,
      height: 60, // 4:3比例 (80 * 3 / 4 = 60)
      borderRadius: radiusImageS,
      flexShrink: 0,
    },
    content: {
      flex: 1,
      gap: spaceElementsXxxs,
    },
    itemTitle: {
      ...cnHeadlineXxsStrong,
      color: textTitle,
      margin: 0,
    },
    description: {
      ...cnBodyS,
      color: textPrimary,
      margin: 0,
      lineHeight: cnBodyS?.lineHeight || 20,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {title && (
        <AnimationFadeSlide style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </AnimationFadeSlide>
      )}

      {items?.length > 0 &&
        items?.map((item, index) => (
          <AnimationFadeSlide key={item?.id || index} style={styles.listItem}>
            <Fragment>
              {item?.image && <Image source={{ uri: item?.image }} style={styles.image} resizeMode="cover" />}

              <View style={styles.content}>
                {item?.title && (
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item?.title}
                  </Text>
                )}

                {item?.description && (
                  <Text style={styles.description} numberOfLines={2}>
                    {item?.description}
                  </Text>
                )}
              </View>
            </Fragment>
          </AnimationFadeSlide>
        ))}
    </CardContainer>
  );
};

export default KnowledgeFeatureList;
