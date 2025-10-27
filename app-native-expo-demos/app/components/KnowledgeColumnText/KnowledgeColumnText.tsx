import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from '../basic/AutoHeightImage';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TSubItem = {
  content?: string;
};

type TPartItem = {
  number?: string;
  title?: string;
  subItems?: TSubItem[];
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

const KnowledgeColumnText: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, description, image, items } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    containerSecondary,
    spaceElementsXxxs,
    spaceElementsXs,
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
      gap: spaceElementsM,
    },
    directoryItem: {
      gap: spaceElementsXs,
    },
    itemMain: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
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
      ...cnHeadlineXsStrong,
      color: textPrimary,
      flex: 1,
    },
    subList: {
      paddingLeft: 28, // 20px (number width) + 8px (gap)
      gap: spaceElementsXxxs,
    },
    subItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spaceElementsXxxs,
    },
    bullet: {
      ...cnBodyM,
      color: textSecondary,
      width: 8,
      textAlign: 'center',
    },
    subItemText: {
      ...cnBodyM,
      color: textSecondary,
      flex: 1,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container} hasScrollView={true}>
      {/* 头部信息 */}
      {(title || description) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}

      {/* 主图 */}
      {image && <AutoHeightImage source={{ uri: image }} style={styles.image} />}

      {/* 功能列表 */}
      {items && items?.length > 0 && (
        <View style={styles.directoryList}>
          {items?.map((item, index) => (
            <View key={index} style={styles.directoryItem}>
              {/* 主条目 */}
              <View style={styles.itemMain}>
                {item?.number && (
                  <View style={styles.itemNumber}>
                    <Text style={styles.itemNumberText}>{item?.number}</Text>
                  </View>
                )}
                {item?.title && <Text style={styles.itemTitle}>{item?.title}</Text>}
              </View>

              {/* 子条目列表 */}
              {item?.subItems && item?.subItems?.length > 0 && (
                <View style={styles.subList}>
                  {item?.subItems?.map((subItem, subIndex) => (
                    <View key={subIndex} style={styles.subItem}>
                      <Text style={styles.bullet}>•</Text>
                      {subItem?.content && <Text style={styles.subItemText}>{subItem?.content}</Text>}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </CardContainer>
  );
};

export default KnowledgeColumnText;
