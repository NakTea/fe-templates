import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 类型定义
type TScrollItem = {
  title?: string;
  description?: string;
  image?: string;
};

type TData = {
  title?: string;
  description?: string;
  items?: TScrollItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeHorizontalOverview: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 440, maxHeight = 376 } = opts || {};
  const { title, description, items } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    containerSecondary,
    spaceElementsXxs,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    radiusInCard,
    cnHeadlineXsStrong,
    cnHeadlineXxsStrong,
    cnBodyM,
    cnBodyS,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    staticHeader: {
      gap: spaceElementsXs,
    },
    headerTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    headerDescription: {
      ...cnBodyM,
      color: textSecondary,
      margin: 0,
    },
    scrollContainer: {
      paddingBottom: spaceElementsXxs,
    },
    scrollContent: {
      gap: spaceElementsM,
      paddingHorizontal: 0,
    },
    scrollItem: {
      width: 168,
      backgroundColor: containerSecondary,
      borderRadius: radiusInCard,
      overflow: 'hidden',
      gap: spaceElementsS,
    },
    imageContainer: {
      position: 'relative',
    },
    itemImage: {
      width: '100%',
      aspectRatio: 4 / 3, // 4:3 aspect ratio
      resizeMode: 'cover',
    },
    textContent: {
      paddingHorizontal: spaceElementsS,
      paddingBottom: spaceElementsS,
      gap: spaceElementsXxs,
    },
    itemTitle: {
      ...cnHeadlineXxsStrong,
      color: textPrimary,
      margin: 0,
    },
    itemDescription: {
      ...cnBodyS,
      color: textSecondary,
      margin: 0,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container} hasScrollView={false}>
      {/* 静态头部 */}
      <View style={styles.staticHeader}>
        {title && <Text style={styles.headerTitle}>{title}</Text>}
        {description && (
          <Text style={styles.headerDescription} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      {/* 横向滚动容器 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        {items?.map((item, index) => (
          <View key={index} style={styles.scrollItem}>
            {/* 图片容器 */}
            {item?.image && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
            )}

            {/* 文本内容 */}
            <View style={styles.textContent}>
              {item?.title && (
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              )}
              {item?.description && (
                <Text style={styles.itemDescription} numberOfLines={3}>
                  {item.description}
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </CardContainer>
  );
};

export default KnowledgeHorizontalOverview;
