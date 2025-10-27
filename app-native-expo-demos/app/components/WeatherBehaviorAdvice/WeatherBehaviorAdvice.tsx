import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TReasonItem = {
  icon?: string;
  title?: string;
  description?: string;
};

type TData = {
  location?: string;
  title?: string;
  weatherIcon?: string;
  suggestion?: {
    title?: string;
    description?: string;
  };
  items?: TReasonItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherBehaviorAdvice: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // 安全解构
  const { width, maxHeight } = opts || {};
  const { location, title, weatherIcon, suggestion, items } = data || {};

  // Token解构
  const {
    textTitle,
    textSecondary,
    containerTertiary,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnDisplayXsStrong,
    cnBodyM,
    cnBodyS,
    cnBodyL,
    sizeIconXs,
    sizeIconM,
    sizeAvatarL,
    containerPrimaryWeather,
    spaceElementsXxs,
    iconPrimary,
    radiusInCard,
  } = system || {};

  // 判断列数逻辑
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
      gap: spaceElementsM,
      backgroundColor: containerPrimaryWeather,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    titleText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    answerSection: {
      alignItems: 'center',
    },
    weatherIcon: {
      width: sizeAvatarL,
      height: sizeAvatarL,
    },
    adviceText: {
      ...cnDisplayXsStrong,
      color: textTitle,
      textAlign: 'center',
    },
    reasonText: {
      ...cnBodyM,
      color: textSecondary,
      textAlign: 'center',
      marginTop: spaceElementsXs,
    },
    itemsContainer: {
      gap: spaceElementsS,
    },
    itemsRow: {
      flexDirection: 'row',
      gap: spaceElementsS,
    },
    item: {
      flex: 1,
      backgroundColor: containerTertiary,
      padding: spaceElementsS,
      borderRadius: radiusInCard,
      gap: spaceElementsXxs,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    itemTitle: {
      ...cnBodyS,
      color: textSecondary,
      flex: 1, // 让标题占据剩余空间
    },
    itemContent: {
      ...cnBodyL,
      color: textTitle,
    },
    // 一列布局特殊样式
    oneColumnItem: {
      backgroundColor: containerTertiary,
      padding: spaceElementsS,
      borderRadius: radiusInCard,
      gap: spaceElementsXxs,
      marginBottom: spaceElementsS,
    },
    // 空占位item样式
    emptyItem: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });

  // 渲染单个item
  const renderItem = (item: TReasonItem | null, index: number, isOneColumn: boolean = false) => {
    if (!item || (!item.icon && !item.title && !item.description)) {
      return <AnimationFadeSlide key={index} style={styles.emptyItem} />;
    }

    const itemStyle = isOneColumn ? styles.oneColumnItem : styles.item;

    return (
      <AnimationFadeSlide key={index} style={itemStyle}>
        <Fragment>
          <View style={styles.itemHeader}>
            {item.icon && <IconFont name={item.icon} size={sizeIconM} color={iconPrimary} />}
            {item.title && (
              <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
            )}
          </View>
          {item.description && (
            <Text style={styles.itemContent} numberOfLines={3} ellipsizeMode="tail">
              {item.description}
            </Text>
          )}
        </Fragment>
      </AnimationFadeSlide>
    );
  };

  // 一列布局渲染
  const renderOneColumn = () => (
    <View style={styles.itemsContainer}>{items?.map((item, index) => renderItem(item, index, true))}</View>
  );

  // 多列布局渲染（2、3、4列通用）
  const renderMultiColumns = () => {
    if (!items || items.length === 0) return null;

    const rows = [];

    for (let i = 0; i < items.length; i += columns) {
      const rowItems = [];

      // 填充当前行的items
      for (let j = 0; j < columns; j++) {
        const itemIndex = i + j;
        const item = itemIndex < items.length ? items[itemIndex] : null;
        rowItems.push(renderItem(item, itemIndex));
      }

      rows.push(
        <View key={i} style={styles.itemsRow}>
          {rowItems}
        </View>,
      );
    }

    return <View style={styles.itemsContainer}>{rows}</View>;
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container} onLayout={onContainerLayout}>
      {/* 标题区域 */}
      {location && title && (
        <AnimationFadeSlide style={styles.titleContainer}>
          <Fragment>
            {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />}
            {location && <Text style={styles.titleText}>{location}</Text>}
            {location && title && <Text style={styles.titleText}>·</Text>}
            {title && <Text style={styles.titleText}>{title}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 建议内容区域 */}
      {(weatherIcon || suggestion) && (
        <View style={styles.answerSection}>
          {weatherIcon && (
            <AnimationFadeSlide>
              <IconFont name={weatherIcon} size={64} />
            </AnimationFadeSlide>
          )}
          {suggestion?.title && (
            <AnimationFadeSlide>
              <Text style={styles.adviceText}>{suggestion.title}</Text>
            </AnimationFadeSlide>
          )}
          {suggestion?.description && (
            <AnimationFadeSlide>
              <Text style={styles.reasonText}>{suggestion.description}</Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}

      {/* 详情网格 */}
      {items && items.length > 0 && (columns === 1 ? renderOneColumn() : renderMultiColumns())}
    </CardContainer>
  );
};

export default WeatherBehaviorAdvice;
