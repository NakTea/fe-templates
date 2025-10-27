import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { isEmpty } from '../utils';

type TWeatherDay = {
  date?: string;
  tempRange?: string;
  condition?: string;
  percent?: number;
  weatherIcon?: string;
  active?: boolean;
};

type TData = {
  location?: string;
  title?: string;
  description?: string;
  weatherIcon?: string;
  list?: TWeatherDay[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherDateSearchRain: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 440, maxHeight } = opts || {};
  const { location, title, description, weatherIcon, list } = data || {};

  // Token解构
  const {
    textPrimary,
    textTitle,
    textSecondary,
    textInfoDefault,
    dividerDefault,
    spaceElementsXxs,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsL,
    radiusInCard,
    cnHeadlineXsStrong,
    cnBodyM,
    cnDisplayXxsStrong,
    sizeIconM,
    containerPrimaryWeather,
    spaceElementsM,
    iconPrimary,
    sizeIconXs,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerPrimaryWeather,
      gap: spaceElementsM,
    },
    // 地理位置头部
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    locationText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    // 概览内容
    summaryContent: {
      flexDirection: 'row',
      gap: spaceElementsL,
      alignItems: 'center',
    },
    summaryText: {
      flex: 1,
    },
    mainPoint: {
      ...cnDisplayXxsStrong,
      color: textTitle,
    },
    details: {
      ...cnBodyM,
      color: textSecondary,
      marginTop: spaceElementsXxs,
    },
    summaryIcon: {
      width: sizeIconM,
      height: sizeIconM,
    },
    // 分割线
    divider: {
      height: 1,
      backgroundColor: dividerDefault,
    },
    // 降雨信息列表
    forecastListContainer: {
      borderRadius: radiusInCard,
      gap: spaceElementsS,
    },
    dayItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dayName: {
      ...cnBodyM,
      color: textPrimary,
      width: 90,
    },
    weatherInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    weatherIcon: {
      width: sizeIconM,
      height: sizeIconM,
    },
    condition: {
      ...cnBodyM,
      color: textPrimary,
      textAlign: 'left',
    },
    conditionRainy: {
      color: textInfoDefault,
    },
    precipProb: {
      ...cnBodyM,
      color: textPrimary,
      textAlign: 'right',
      minWidth: 40,
    },
    temp: {
      ...cnBodyM,
      color: textPrimary,
      textAlign: 'right',
      minWidth: 60,
    },
    // 高亮样式
    highlightText: {
      color: textTitle,
    },
  });

  const renderDayItem = (dayData: TWeatherDay, index: number) => {
    const { date, tempRange, condition, percent, weatherIcon, active } = dayData;

    return (
      <AnimationFadeSlide key={index} style={styles.dayItem}>
        <Fragment>
          {date && <Text style={[styles.dayName, active && styles.highlightText]}>{date}</Text>}

          {/* <View style={styles.weatherInfo}> */}
          {weatherIcon && (
            <View style={styles.summaryIcon}>
              <IconFont name={weatherIcon} size={sizeIconM} />
            </View>
          )}
          {/* {condition && <Text style={[styles.condition, active && styles.highlightText]}>{condition}</Text>} */}
          {/* </View> */}

          {!isEmpty(percent) && <Text style={[styles.precipProb, active && styles.highlightText]}>{percent}%</Text>}

          {tempRange && <Text style={[styles.temp, active && styles.highlightText]}>{tempRange}</Text>}
        </Fragment>
      </AnimationFadeSlide>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 地理位置头部 */}
      {location && (
        <AnimationFadeSlide style={styles.cardHeader}>
          <Fragment>
            <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />
            <Text style={styles.locationText}>{location}</Text>
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 概览内容 */}
      {(title || description || weatherIcon) && (
        <View style={styles.summaryContent}>
          <View style={styles.summaryText}>
            {title && (
              <AnimationFadeSlide>
                <Text style={styles.mainPoint}>{title}</Text>
              </AnimationFadeSlide>
            )}
            {description && (
              <AnimationFadeSlide>
                <Text style={styles.details}>{description}</Text>
              </AnimationFadeSlide>
            )}
          </View>
          {weatherIcon && (
            <AnimationFadeSlide>
              <IconFont name={weatherIcon} size={64} />
            </AnimationFadeSlide>
          )}
        </View>
      )}

      {/* 降雨信息列表 */}
      {list && list?.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            ...styles.forecastListContainer,
          }}>
          {list.map((dayData, index) => renderDayItem(dayData, index))}
        </ScrollView>
      )}
    </CardContainer>
  );
};

export default WeatherDateSearchRain;
