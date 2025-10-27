import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import GaugePointer from '../basic/GaugePointer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  location?: string;
  date?: string;
  aqi?: {
    value?: number;
    label?: string;
  };
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

const WeatherDailyAirQuality: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 300, maxHeight } = opts || {};
  const { location, date, aqi, suggestion } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    spaceElementsXs,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnBodyM,
    iconPrimary,
    containerPrimaryWeather,
    sizeIconXs,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: spaceElementsM,
      backgroundColor: containerPrimaryWeather,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
      alignSelf: 'flex-start',
    },
    titleText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    suggestionContainer: {
      gap: spaceElementsXs,
      alignSelf: 'stretch',
    },
    suggestionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    suggestionText: {
      ...cnBodyM,
      color: textPrimary,
      lineHeight: 20,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {(location || date) && (
        <AnimationFadeSlide style={styles.titleContainer}>
          <Fragment>
            <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />
            <Text style={styles.titleText}>
              {location ? location : ''}
              {location && date ? ' · ' : ''}
              {date ? date : ''}
            </Text>
          </Fragment>
        </AnimationFadeSlide>
      )}

      {aqi?.value && (
        <AnimationFadeSlide>
          <GaugePointer
            value={aqi?.value}
            label={aqi?.label}
            size={150}
            labelFontStyle={{ ...cnHeadlineXsStrong, textAlign: "flex-end" }} />
        </AnimationFadeSlide>
      )}
      {/* 建议 */}
      {suggestion && (
        <View style={styles.suggestionContainer}>
          {suggestion?.title && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionTitle}>{suggestion?.title}:</Text>
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

export default WeatherDailyAirQuality;
