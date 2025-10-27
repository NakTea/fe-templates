import React, { Fragment } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type THourlyForecast = {
  time?: string;
  temp?: number;
  weatherIcon?: string;
  condition?: string;
};

type TData = {
  image?: string;
  location?: string;
  temp?: number;
  tempRange?: string;
  weatherIcon?: string;
  list?: THourlyForecast[];
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

const WeatherDailyFallback: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight } = opts || {};
  const { image, location, temp, tempRange, list, suggestion } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    iconPrimary,
    containerPrimaryWeather,
    spaceElementsXxs,
    spaceElementsXs,
    spaceElementsM,
    cnDisplayLStrong,
    cnHeadlineXsStrong,
    cnBodyM,
    sizeIconXs,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      // gap: 0,
      backgroundColor: containerPrimaryWeather,
      // position: 'relative',
      // overflow: 'hidden',
      // flex: 1,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
    content: {
      // flex: 1,
      // zIndex: 1,
    },
    headerInfo: {
      // alignItems: 'center',
      marginBottom: spaceElementsXs,
    },
    cityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      gap: spaceElementsXs,
    },
    city: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    tempRange: {
      ...cnBodyM,
      color: textSecondary,
      marginTop: spaceElementsXxs,
    },
    currentWeather: {
      alignItems: 'center',
    },
    temp: {
      ...cnDisplayLStrong,
      color: textTitle,
    },
    forecast: {
      marginBottom: spaceElementsM,
    },
    forecastContainer: {
      minWidth: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    forecastDay: {
      flex: 1,
      minWidth: 40,
      alignItems: 'center',
      paddingHorizontal: spaceElementsXxs,
    },
    hourName: {
      ...cnBodyM,
      color: textPrimary,
    },
    hourTemp: {
      ...cnBodyM,
      color: textPrimary,
    },
    suggestion: {
      paddingTop: spaceElementsXs,
      marginTop: 'auto',
    },
    suggestionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginBottom: spaceElementsXs,
    },
    suggestionText: {
      ...cnBodyM,
      color: textPrimary,
    },
    weatherIcon: {
      marginVertical: spaceElementsXs,
    },
  });

  const renderForecastItem = (item: THourlyForecast, index: number) => {
    return (
      <AnimationFadeSlide key={index} style={styles.forecastDay}>
        <Fragment>
          {item.time && <Text style={styles.hourName}>{item.time} </Text>}
          {item.weatherIcon && (
            <View style={styles.weatherIcon}>
              <IconFont name={item.weatherIcon} size={32} />
            </View>
          )}
          {item.temp !== undefined && <Text style={styles.hourTemp}>{item.temp}°</Text>}
        </Fragment>
      </AnimationFadeSlide>
    );
  };

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

      <View style={styles.content}>
        {/* 头部信息 */}
        {(location || tempRange) && (
          <View style={styles.headerInfo}>
            <View style={styles.cityContainer}>
              {location && (
                <AnimationFadeSlide>
                  <IconFont name="systemLocalFill" size={sizeIconXs} color={textTitle || iconPrimary} />
                </AnimationFadeSlide>
              )}
              {location && (
                <AnimationFadeSlide>
                  <Text style={styles.city}>{location}</Text>
                </AnimationFadeSlide>
              )}
            </View>
          </View>
        )}

        {/* 当前温度 */}
        {temp !== undefined && (
          <AnimationFadeSlide style={styles.currentWeather}>
            <Text style={styles.temp}>{temp}°</Text>
          </AnimationFadeSlide>
        )}

        {/* 小时预报 */}
        {list && list.length > 0 && (
          <ScrollView
            nestedScrollEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.forecast}
            contentContainerStyle={styles.forecastContainer}>
            {list.map((item, index) => renderForecastItem(item, index))}
          </ScrollView>
        )}

        {/* 穿衣建议 */}
        {suggestion && (
          <View style={styles.suggestion}>
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
      </View>
    </CardContainer>
  );
};

export default WeatherDailyFallback;
