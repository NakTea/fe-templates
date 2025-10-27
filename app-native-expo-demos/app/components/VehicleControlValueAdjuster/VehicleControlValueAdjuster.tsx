import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import Slider from '../basic/Slider';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

type TButtonConfig = {
  id: string;
  deeplink: string;
  event?: Record<string, any>;
  hotwords?: Record<string, any>;
};

type TSliderConfig = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
  icon?: string;
};

type TData = {
  title?: string;
  value?: number;
  config?: TSliderConfig;
  buttons?: TButtonConfig[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
  };
  sendMsgToNative: (msg: any) => void;
  isEnded: boolean;
  messageData: object;
}

const VehicleControlValueAdjuster: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 200 } = opts || {};
  const { title, value: initialValue, config, buttons } = data || {};
  const buttonConfig = buttons?.[0];

  // 滑块配置
  const { min = 0, max = 100, step = 1, defaultValue = 50, unit = '%', icon = 'systemSettingsFill' } = config || {};

  // Token 解构
  const {
    textPrimary,
    textTitle,
    iconPrimary,
    containerSecondary,
    containerBsWeakSecondary,
    textInverse,
    spaceElementsS,
    spaceElementsM,
    cnHeadlineXsStrong,
    cnDisplayXxxsStrong,
    radiusImageM,
    sizeIconS,
  } = system || {};

  // 状态管理
  const [currentValue, setCurrentValue] = useState(initialValue || defaultValue);

  const styles = StyleSheet.create({
    contentContainer: {
      gap: spaceElementsM,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    sectionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    valueDisplay: {
      ...cnDisplayXxxsStrong,
      color: textTitle,
    },
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    leftIcon: {
      opacity: 0.6,
    },
  });

  // 根据步长调整数值
  const adjustValueByStep = (value: number) => {
    return Math.round(value / step) * step;
  };

  // 处理滑块值变化
  const handleSliderChange = (value: number) => {
    const adjustedValue = adjustValueByStep(value);
    setCurrentValue(adjustedValue);

    // 发送数值变化事件
    if (buttonConfig?.event?.set) {
      buttonConfig.event.set.forEach(item => {
        const itemInfo = JSON.parse(JSON.stringify(item));
        delete itemInfo.hotwords;
        delete itemInfo.fieldMapping;
        itemInfo.input = fillTemplateByData(itemInfo.input, { value: adjustedValue });
        sendMsgToNative(itemInfo);
      });
    }

    // 发送通用的数值变化消息
    sendMsgToNative({
      type: 'valueChange',
      data: {
        component: 'VehicleControlValueAdjuster',
        value: adjustedValue,
        title,
        unit,
      },
    });
  };

  // 热词注册
  const toRegistHotwords = () => {
    const regHotwords: any[] = [];

    if (buttonConfig?.hotwords) {
      regHotwords.push(...buttonConfig.hotwords);
    }

    sendMsgToNative({
      type: 'hotwords',
      data: { hotwords: regHotwords },
    });
  };

  // 生命周期管理
  useEffect(() => {
    if (!isEnded) return;
    if (messageData?.type === 'invokeRNMethod') {
      const { methodName, input } = messageData?.data || {};
      if (methodName === 'setValue' && typeof input?.value === 'number') {
        const clampedValue = Math.max(min, Math.min(max, input.value));
        setCurrentValue(clampedValue);
      }
    }
  }, [messageData]);

  useEffect(() => {
    if (isEnded) {
      toRegistHotwords();
    }
  }, [isEnded]);

  // 创建左侧图标
  const leftIcon = <IconFont name={icon} size={sizeIconS} color="#000" style={styles.leftIcon} />;

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.contentContainer}>
      <AnimationFadeSlide>
        <View style={styles.header}>
          <View style={styles.titleSection}>{title && <Text style={styles.sectionTitle}>{title}</Text>}</View>
          {currentValue && unit && (
            <Text style={styles.valueDisplay}>
              {currentValue}
              {unit}
            </Text>
          )}
        </View>
      </AnimationFadeSlide>

      <AnimationFadeSlide delay={100}>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={min}
            maximumValue={max}
            value={currentValue}
            onSlidingComplete={handleSliderChange}
            minimumTrackTintColor={textInverse}
            maximumTrackTintColor={containerBsWeakSecondary}
            thumbTintColor={textInverse}
            thumbTintWidth={44}
            maximumTrackHeight={44}
            minimumTrackPadding={0}
            thumbTintPadding={2}
            leftIcon={leftIcon}
            style={{
              flex: 1,
            }}
          />
        </View>
      </AnimationFadeSlide>
    </CardContainer>
  );
};

export default VehicleControlValueAdjuster;

