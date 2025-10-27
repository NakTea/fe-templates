import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import GaugePointer from '../basic/GaugePointer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TForecastDay = {
  date?: string;
  weatherIcon?: string;
  label?: string;
  active?: boolean;
};

type TData = {
  location?: string;
  title?: string;
  active?: string;
  aqi?: {
    value?: number;
    label?: string;
  };
  list?: TForecastDay[];
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

const WeatherMultiAirQuality: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight } = opts || {};
  const { location, title, aqi, list, suggestion } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    spaceElementsS,
    spaceElementsXs,
    spaceElementsXxxs,
    spaceElementsM,
    dividerDefault,
    cnHeadlineXsStrong,
    cnBodyM,
    containerPrimaryWeather,
    spaceCardPaddingLeftRightS,
    spaceCardPaddingUpdownS,
    sizeIconM,
    sizeIconXs,
    cnDisplayXsStrong,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsS,
      backgroundColor: containerPrimaryWeather,
      paddingHorizontal: spaceCardPaddingLeftRightS,
      paddingVertical: spaceCardPaddingUpdownS,
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
    gaugeContainer: {
      height: 96,
      alignItems: 'center',
      gap: spaceElementsM,
    },
    divider: {
      height: 1,
      backgroundColor: dividerDefault,
    },
    forecast: {
      flex: 1,
    },
    forecastContainer: {
      minWidth: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spaceElementsXs,
    },
    forecastDay: {
      flex: 1,
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    dayName: {
      ...cnBodyM,
      color: textPrimary,
    },
    activeDayName: {
      color: textTitle,
    },
    weatherIconContainer: {
      width: sizeIconM,
      height: sizeIconM,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayLevel: {
      ...cnBodyM,
      color: textPrimary,
    },
    activeDayLevel: {
      color: textTitle,
    },
    suggestionContainer: {
      gap: spaceElementsXs,
    },
    suggestionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    suggestionText: {
      ...cnBodyM,
      color: textPrimary,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {(location || title) && (
        <AnimationFadeSlide style={styles.titleContainer}>
          <Fragment>
            {location && <IconFont name="systemLocalFill" size={sizeIconXs} color={textTitle} />}
            {location && <Text style={styles.titleText}>{location}</Text>}
            {location && title && <Text style={styles.titleText}>·</Text>}
            {title && <Text style={styles.titleText}>{title}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}
      {/* 空气质量仪表盘 */}
      {aqi?.value && (
        <AnimationFadeSlide style={styles.gaugeContainer}>
          <GaugePointer
            value={aqi?.value}
            size={88}
            label={aqi?.label}
            valueFontStyle={cnDisplayXsStrong}
            labelFontStyle={cnHeadlineXsStrong}
            pointerStyle={{
              transform: [{ translateX: -4 }],
              borderLeftWidth: 4,
              borderRightWidth: 4,
              borderBottomWidth: 6,
              top: 4,
            }}
          />
        </AnimationFadeSlide>
      )}

      {/* 分割线 */}
      {aqi?.value ? (
        <AnimationFadeSlide enableSlide={false}>
          <View style={styles.divider} />
        </AnimationFadeSlide>
      ) : (
        <View style={{ height: 0 }} />
      )}

      {/* 未来五日预报 */}
      {list && list?.length > 0 && (
        <ScrollView
          nestedScrollEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.forecast}
          contentContainerStyle={styles.forecastContainer}>
          {list.map((day, index) => (
            <AnimationFadeSlide key={index} style={styles.forecastDay}>
              <Fragment>
                {day?.date && <Text style={[styles.dayName, day?.active && styles.activeDayName]}>{day.date}</Text>}
                {day?.weatherIcon && (
                  <View style={styles.weatherIconContainer}>
                    <IconFont name={day.weatherIcon} size={sizeIconM} />
                  </View>
                )}
                {day?.label && <Text style={[styles.dayLevel, day?.active && styles.activeDayLevel]}>{day.label}</Text>}
              </Fragment>
            </AnimationFadeSlide>
          ))}
        </ScrollView>
      )}

      {/* 健康建议 */}
      {suggestion && (
        <View style={styles.suggestionContainer}>
          {suggestion?.description && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionText}>
                {suggestion.title}: {suggestion.description}
              </Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}
    </CardContainer>
  );
};

export default WeatherMultiAirQuality;
