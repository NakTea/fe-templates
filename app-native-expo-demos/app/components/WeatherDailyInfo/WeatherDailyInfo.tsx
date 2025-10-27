import React, { Fragment } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TWeatherDetail = {
  icon?: string;
  label?: string;
  value?: string;
};

type TData = {
  image?: string;
  location?: string;
  title?: string;
  temp?: number;
  condition?: string;
  tempRange?: string;
  weatherIcon?: string;
  list?: TWeatherDetail[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherDailyInfo: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight = 376 } = opts || {};
  const { image, location, title, temp, condition, tempRange, weatherIcon, list } = data || {};

  // Token解构
  const {
    textSecondary,
    textTitle,
    iconPrimary,
    containerTertiary,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnBodyS,
    cnBodyL,
    cnDisplayMStrong,
    sizeAvatarL,
    containerPrimaryWeather,
    sizeIconXs,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerPrimaryWeather,
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2,
      zIndex: 1,
    },
    contentContainer: {
      position: 'relative',
      zIndex: 2,
      gap: spaceElementsS,
    },
    // 标题部分
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    titleText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    // 温度概览部分
    weatherOverview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    tempDetails: {
      flex: 1,
    },
    tempRange: {
      ...cnDisplayMStrong,
      fontSize: 40,
      color: textTitle,
    },
    condition: {
      ...cnBodyS,
      color: textSecondary,
      marginTop: 4,
    },
    // 详细信息网格
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spaceElementsS,
    },
    detailItem: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: containerTertiary,
      padding: spaceElementsS,
      borderRadius: 12,
    },
    detailItem2: {
      flex: 1,
      minWidth: '45%',
      // backgroundColor: containerTertiary,
      padding: spaceElementsS,
      borderRadius: 12,
      gap: 4,
    },
    detailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    detailLabel: {
      ...cnBodyS,
      color: textSecondary,
    },
    detailValue: {
      ...cnBodyL,
      color: textTitle,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 背景图片 */}
      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      )}

      {/* 内容容器 */}
      <View style={styles.contentContainer}>
        {/* 地理位置标题 */}

        <View style={styles.titleContainer}>
          {(location || title) && (
            <AnimationFadeSlide style={styles.titleContainer}>
              <Fragment>
                {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />}
                {location && <Text style={styles.titleText}>{location}</Text>}
                {title && <Text style={styles.titleText}>·</Text>}
                {title && <Text style={styles.titleText}>{title}</Text>}
              </Fragment>
            </AnimationFadeSlide>
          )}
        </View>

        {/* 温度概览 */}
        {(condition || weatherIcon) && (
          <View style={styles.weatherOverview}>
            {(condition || tempRange) && (
              <View style={styles.tempDetails}>
                {tempRange && (
                  <AnimationFadeSlide>
                    <Text style={styles.tempRange}>{tempRange}</Text>
                  </AnimationFadeSlide>
                )}
                {condition && (
                  <AnimationFadeSlide>
                    <Text style={styles.condition}>{condition}</Text>
                  </AnimationFadeSlide>
                )}
              </View>
            )}

            {weatherIcon && (
              <AnimationFadeSlide>
                <IconFont name={weatherIcon} size={sizeAvatarL} />
              </AnimationFadeSlide>
            )}
          </View>
        )}
        {/* 详细信息网格 */}
        {list && list.length > 0 && (
          <View style={styles.detailsGrid}>
            {list.map((detail, index) => (
              <AnimationFadeSlide key={index} style={styles.detailItem}>
                <Fragment>
                  <View style={styles.detailHeader}>
                    {detail?.icon && <IconFont name={detail?.icon} size={24} color={iconPrimary} />}
                    {detail?.label && <Text style={styles.detailLabel}>{detail?.label}</Text>}
                  </View>
                  {detail?.value && <Text style={styles.detailValue}>{detail?.value}</Text>}
                </Fragment>
              </AnimationFadeSlide>
            ))}
            {list?.length % 2 !== 0 && <View style={styles.detailItem2} />}
          </View>
        )}
      </View>
    </CardContainer>
  );
};

export default WeatherDailyInfo;
