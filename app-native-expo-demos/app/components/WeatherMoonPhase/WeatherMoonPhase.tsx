import React, { Fragment, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  location?: string;
  date?: string;
  details?: {
    label?: string;
    value?: string;
    active?: boolean;
  }[];
  image?: string;
  suggestion?: {
    title?: string;
    description?: string;
  };
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherMoonPhase: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  const [containerWidth, setContainerWidth] = useState(0);

  // 容器布局监听
  const onContainerLayout = (event: any) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setContainerWidth(measuredWidth);
  };
  // 安全解构
  const { width = 360, maxHeight } = opts || {};
  const { location, date, details, image, suggestion } = data || {};

  // Token解构
  const {
    textTitle,
    textSecondary,
    dividerDefault,
    spaceElementsXs,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnBodyM,
    cnDisplayXxsStrong,
    sizeIconXs,
    spaceElementsS,
    containerPrimaryWeather,
    iconPrimary,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerPrimaryWeather,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    headerText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spaceElementsM,
      marginTop: spaceElementsM,
    },
    dataContainer: {
      flex: 1,
    },
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: spaceElementsS,
      borderBottomWidth: 1,
      borderBottomColor: dividerDefault,
    },
    lastDataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: spaceElementsS,
      borderBottomWidth: 0,
    },
    dataLabel: {
      ...cnBodyM,
      color: textSecondary,
    },
    dataValueActive: {
      ...cnDisplayXxsStrong,
      color: textTitle,
    },
    dataValue: {
      ...cnDisplayXxsStrong,
      color: textSecondary,
    },
    dataValueSecondary: {
      ...cnDisplayXxsStrong,
      color: textSecondary,
    },
    moonImageContainer: {
      flexShrink: 0,
    },
    moonImage: {
      width: 130,
      height: 130,
    },
    suggestionContainer: {
      marginTop: spaceElementsS,
      gap: spaceElementsXs,
    },
    suggestionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    suggestionText: {
      ...cnBodyM,
      color: textSecondary,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container} onLayout={onContainerLayout}>
      {/* 标题区域 */}
      {(location || date) && (
        <AnimationFadeSlide style={styles.header}>
          <Fragment>
            {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />}
            {location && <Text style={styles.headerText}>{location}</Text>}
            {location && date && <Text style={styles.headerText}>·</Text>}
            {date && <Text style={styles.headerText}>{date}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 主要内容区域 */}
      <View style={styles.contentContainer}>
        {/* 数据列表 */}

        <View style={styles.dataContainer}>
          {details &&
            details?.map((item, index) => (
              <AnimationFadeSlide
                style={[styles.dataRow, index === details?.length - 1 && styles.lastDataRow]}
                key={index}>
                <Fragment>
                  <Text style={styles.dataLabel}>{item?.label}</Text>
                  <Text style={[styles.dataValue, item?.active && styles.dataValueActive]}>{item?.value}</Text>
                </Fragment>
              </AnimationFadeSlide>
            ))}
        </View>

        {/* 月相图片 */}
        {containerWidth > 300 && image ? (
          <AnimationFadeSlide enableSlide={false} style={styles.moonImageContainer}>
            <Image source={{ uri: image }} style={styles.moonImage} resizeMode="cover" />
          </AnimationFadeSlide>
        ) : (
          <View style={styles.moonImageContainer} />
        )}
      </View>

      {/* 建议区域 */}
      {suggestion && (
        <View style={styles.suggestionContainer}>
          {suggestion?.title && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionTitle}>{suggestion?.title}</Text>
            </AnimationFadeSlide>
          )}
          {suggestion?.description && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionText}>{suggestion?.description}</Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}
    </CardContainer>
  );
};

export default WeatherMoonPhase;
