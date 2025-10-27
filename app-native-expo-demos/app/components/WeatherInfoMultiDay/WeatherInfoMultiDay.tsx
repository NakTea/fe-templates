import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TDailyWeather = {
  day?: string;
  weatherIcon?: string; // 天气类型：cloudy, rain, thunder
  minTemp?: number;
  maxTemp?: number;
};

type TData = {
  location?: string;
  temp?: number;
  title?: string;
  list?: TDailyWeather[];
  suggestion?: {
    title?: string;
    description?: string;
  };
};

interface IProps {
  isEnded?: boolean;
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherInfoMultiDay: React.FC<IProps> = ({ data, opts, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width, maxHeight } = opts || {};
  const { location, temp, title, list, suggestion } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    textCautionDefault,
    iconPrimary,
    containerPrimaryWeather,
    containerSecondary,
    dividerList,
    spaceElementsS,
    spaceElementsXs,
    cnDisplayMStrong,
    cnHeadlineXsStrong,
    cnBodyM,
    cnBodyS,
    sizeIconXs,
  } = system || {};

  // 计算温度条的显示参数
  const calculateTempBarParams = () => {
    if (!list?.length) return { globalMin: 0, globalMax: 0, totalRange: 0 };

    // 找出所有天气中的最低和最高温度
    let allTemps: number[] = [];
    list.forEach(item => {
      if (item.minTemp !== undefined) allTemps.push(item.minTemp);
      if (item.maxTemp !== undefined) allTemps.push(item.maxTemp);
    });

    if (allTemps.length === 0) return { globalMin: 0, globalMax: 0, totalRange: 0 };

    const actualMin = Math.min(...allTemps);
    const actualMax = Math.max(...allTemps);

    // 温度条范围：最小值-5，最大值+5
    const globalMin = actualMin;
    const globalMax = actualMax;
    const totalRange = globalMax - globalMin;

    return { globalMin, globalMax, totalRange };
  };

  // 计算单个温度条的显示参数
  const getTempBarStyle = (item: TDailyWeather, globalMin: number, totalRange: number) => {
    const { minTemp: itemMinTemp, maxTemp: itemMaxTemp } = item;

    if (itemMinTemp === undefined || itemMaxTemp === undefined || totalRange === 0) {
      return { marginLeft: '0%', width: '0%' };
    }

    // 计算起始位置（最低温度相对于全局最小值的位置）
    const startPosition = ((itemMinTemp - globalMin) / totalRange) * 100;

    // 计算宽度（当天温度范围占总范围的比例）
    const tempRange = itemMaxTemp - itemMinTemp;
    const barWidth = (tempRange / totalRange) * 100;

    return {
      marginLeft: `${Math.max(0, startPosition)}%`,
      width: `${Math.max(0, barWidth)}%`,
    };
  };

  const { globalMin, globalMax, totalRange } = calculateTempBarParams();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerPrimaryWeather,
      gap: spaceElementsS,
    },
    // 卡片标题容器
    cardTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    locationText: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    tempRangeText: {
      ...cnBodyS,
      color: textSecondary,
      textAlign: 'center',
    },
    currentWeather: {
      alignItems: 'center',
    },
    temperatureText: {
      ...cnDisplayMStrong,
      color: textTitle,
    },
    divider: {
      height: 1,
      backgroundColor: dividerList,
      marginVertical: 0,
    },
    forecastTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    forecastTitle: {
      ...cnBodyM,
      color: textSecondary,
    },
    dailyList: {
      gap: spaceElementsXs,
    },
    dailyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    dayText: {
      ...cnBodyM,
      color: textPrimary,
      width: 60,
      textAlign: 'left',
    },
    weatherIconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    minTempText: {
      ...cnBodyM,
      color: textPrimary,
      width: 30,
      textAlign: 'right',
    },
    tempBarWrapper: {
      flex: 1,
      height: 4,
      backgroundColor: containerSecondary,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
    },
    tempBar: {
      height: '100%',
      display: isEnded ? 'flex' : 'none',
      backgroundColor: textCautionDefault,
      borderRadius: 2,
      position: 'absolute',
    },
    maxTempText: {
      ...cnBodyM,
      color: textPrimary,
      width: 30,
      textAlign: 'left',
    },
    suggestionContainer: {
      gap: spaceElementsXs,
    },
    suggestionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    suggestionDescription: {
      ...cnBodyM,
      color: textPrimary,
    },
  });

  // 渲染每日天气项
  const renderDailyWeatherItem = (item: TDailyWeather, index: number) => {
    const { day, weatherIcon, minTemp: itemMinTemp, maxTemp: itemMaxTemp } = item;
    const tempBarStyle = getTempBarStyle(item, globalMin, totalRange);

    return (
      <AnimationFadeSlide key={index} style={styles.dailyItem}>
        <Fragment>
          {day && <Text style={styles.dayText}>{day}</Text>}

          {weatherIcon && (
            <View style={styles.weatherIconContainer}>
              <IconFont name={weatherIcon} size={24} />
            </View>
          )}

          {itemMinTemp !== undefined && <Text style={styles.minTempText}>{itemMinTemp}°</Text>}

          <View style={styles.tempBarWrapper}>
            <View
              style={[
                styles.tempBar,
                {
                  marginLeft: tempBarStyle.marginLeft,
                  width: tempBarStyle.width,
                },
              ]}
            />
          </View>

          {itemMaxTemp !== undefined && <Text style={styles.maxTempText}>{itemMaxTemp}°</Text>}
        </Fragment>
      </AnimationFadeSlide>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 卡片标题 */}
      {location && (
        <AnimationFadeSlide style={styles.cardTitleContainer}>
          <Fragment>
            <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />
            <Text style={styles.locationText}>{location}</Text>
          </Fragment>
        </AnimationFadeSlide>
      )}

      <View>
        {/* 当前温度 */}
        {temp && (
          <AnimationFadeSlide style={styles.currentWeather}>
            <Text style={styles.temperatureText}>{temp}°</Text>
          </AnimationFadeSlide>
        )}
        {title && (
          <AnimationFadeSlide style={styles.forecastTitleContainer}>
            <Text style={styles.forecastTitle}>{title}</Text>
          </AnimationFadeSlide>
        )}
      </View>
      {/* 多日天气预报 */}
      {list && list?.length > 0 && (
        <View style={styles.dailyList}>
          {list.map((item, index) => renderDailyWeatherItem(item, index))}
        </View>
      )}

      {/* 健康建议 */}
      {suggestion && (
        <View style={styles.suggestionContainer}>
          {suggestion?.title && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            </AnimationFadeSlide>
          )}
          {suggestion?.description && (
            <AnimationFadeSlide>
              <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
            </AnimationFadeSlide>
          )}
        </View>
      )}
    </CardContainer>
  );
};

export default WeatherInfoMultiDay;
