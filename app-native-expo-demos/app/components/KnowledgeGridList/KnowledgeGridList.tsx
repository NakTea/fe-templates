import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TKnowledgeItem = {
  image?: string;
  description?: string;
};

type TData = {
  title?: string;
  items?: TKnowledgeItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeGridList: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // 安全解构
  const { width, maxHeight = 376 } = opts || {};
  const { title, items } = data || {};

  // Token解构
  const { cnHeadlineXsStrong, cnBodyM, textTitle, textPrimary, spaceElementsXs, spaceElementsL, radiusImageS } =
    system || {};

  // 判断列数逻辑 - 扩展到4列
  const getColumns = () => {
    let actualWidth = containerWidth;

    // 如果是百分比宽度，使用实际测量的宽度
    if (typeof width === 'string' && width.includes('%')) {
      actualWidth = containerWidth;
    }
    // 如果是数字宽度
    else if (typeof width === 'number') {
      actualWidth = width;
    }
    // 如果是px字符串
    else if (typeof width === 'string' && width.includes('px')) {
      actualWidth = parseInt(width.replace('px', ''));
    }

    // 根据宽度决定列数
    if (actualWidth <= 300) {
      return 1;
    } // 1列: ≤300px
    if (actualWidth <= 480) {
      return 2;
    } // 2列: 301-480px
    if (actualWidth <= 720) {
      return 3;
    } // 3列: 481-720px
    return 4; // 4列: >720px
  };

  const columns = getColumns();

  // 容器布局监听
  const onContainerLayout = (event: any) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setContainerWidth(measuredWidth);
  };

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsL,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    // 通用网格容器
    gridContainer: {
      flexDirection: 'column',
      gap: spaceElementsL,
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spaceElementsL,
    },
    gridItem: {
      flex: 1,
      flexDirection: 'column',
      gap: spaceElementsXs,
    },
    // 一列特殊样式
    oneColumnGrid: {
      flexDirection: 'column',
      gap: spaceElementsL,
    },
    oneColumnItem: {
      width: '100%',
      flexDirection: 'column',
      gap: spaceElementsXs,
    },
    thumbnail: {
      width: '100%',
      aspectRatio: 16 / 9,
      borderRadius: radiusImageS,
    },
    descriptionText: {
      ...cnBodyM,
      color: textPrimary,
      margin: 0,
    },
  });

  // 一列布局渲染
  const renderOneColumn = () => (
    <View style={styles.oneColumnGrid}>
      {items?.map((item, index) => (
        <View key={index} style={styles.oneColumnItem}>
          {item?.image && <Image source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />}
          {item?.description && (
            <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
              {item.description}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  // 多列布局渲染（2、3、4列通用）
  const renderMultiColumns = () => {
    const rows = [];
    if (items) {
      for (let i = 0; i < items.length; i += columns) {
        const rowItems = [];

        // 填充当前行的items
        for (let j = 0; j < columns; j++) {
          const item = items[i + j];
          rowItems.push(
            <View key={j} style={styles.gridItem}>
              {item ? (
                <>
                  {item?.image && <Image source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />}
                  {item?.description && (
                    <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
                      {item.description}
                    </Text>
                  )}
                </>
              ) : null}
            </View>,
          );
        }

        rows.push(
          <View key={i} style={styles.gridRow}>
            {rowItems}
          </View>,
        );
      }
    }
    return <View style={styles.gridContainer}>{rows}</View>;
  };

  return (
    <View style={{ flex: 1 }} onLayout={onContainerLayout}>
      <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}

        {items && items?.length > 0 && (columns === 1 ? renderOneColumn() : renderMultiColumns())}
      </CardContainer>
    </View>
  );
};

export default KnowledgeGridList;
