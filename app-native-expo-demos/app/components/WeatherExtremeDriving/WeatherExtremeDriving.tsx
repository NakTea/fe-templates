import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import Tips from '../basic/Tips';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  location?: string; // 地点
  title?: string; // 预警类型
  weatherIcon?: string; // 预警图标URL
  description?: string; // 影响时段
  tips?: {
    type: string;
    message: string;
  }; // 提示信息
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const WeatherExtremeDriving: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width, maxHeight } = opts || {};
  const { location, title, weatherIcon, description, tips } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    iconPrimary,
    containerErrorWeakDefault,
    radiusInCard,
    spaceElementsXs,
    spaceElementsM,
    spaceElementsXxs,
    spaceElementsXxxs,
    cnDisplayXsStrong,
    cnHeadlineXsStrong,
    cnBodyM,
    containerPrimaryWeather,
    sizeIconXs,
    sizeAvatarL,
  } = system || {};

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
    header: {
      alignItems: 'center',
    },
    weatherIcon: {
      marginBottom: spaceElementsXs,
    },
    warningTypeText: {
      ...cnDisplayXsStrong,
      marginTop: spaceElementsXs,
      color: textTitle,
      textAlign: 'center',
    },
    timeInfo: {
      ...cnBodyM,
      color: textSecondary,
      textAlign: 'center',
    },
    alertBar: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: containerErrorWeakDefault,
      borderRadius: radiusInCard,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    alertIcon: {
      marginTop: spaceElementsXxxs,
      marginRight: spaceElementsXxs,
    },
    alertText: {
      ...cnBodyM,
      color: textPrimary,
      flex: 1,
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标题区域 */}
      {location && (
        <AnimationFadeSlide style={styles.titleContainer}>
          <Fragment>
            <IconFont name="systemLocalFill" size={sizeIconXs} color={iconPrimary} />
            <Text style={styles.titleText}>{location}</Text>
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 预警图标和类型 */}
      <View style={styles.header}>
        {weatherIcon && (
          <AnimationFadeSlide>
            <IconFont name={weatherIcon} size={sizeAvatarL} />
          </AnimationFadeSlide>
        )}
        {title && (
          <AnimationFadeSlide>
            <Text style={styles.warningTypeText}>{title}</Text>
          </AnimationFadeSlide>
        )}

        {/* 时间信息 */}
        {description && (
          <AnimationFadeSlide>
            <Text style={styles.timeInfo}>{description}</Text>
          </AnimationFadeSlide>
        )}
      </View>

      {/* 危险提示条 */}
      {tips && tips?.message && (
        <AnimationFadeSlide>
          <Tips
            type={tips?.type as 'error' | 'warning' | 'info' | 'success'}
            style={styles.alertBar}
            cardBottomPadding={0}
            tipTextFontStyle={styles.alertText}
            message={tips?.message}
          />
        </AnimationFadeSlide>
      )}
    </CardContainer>
  );
};

export default WeatherExtremeDriving;
