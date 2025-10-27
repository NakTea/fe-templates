import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

type TLabel = {
  label?: string;
  value?: string;
};

type TButtonConfig = {
  id?: string;
  deeplink?: string;
  event?: Record<string, any>; // 自定义原子能力
  index: number;
  knowledge_base: object[];
};

type TData = {
  title?: string;
  image?: string;
  rating?: number;
  labels?: TLabel[];
  buttons?: TButtonConfig[];
  hotwords?: object;
  id?: string;
  deeplink?: string;
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  sendMsgToNative: (msg: any) => void;
  isEnded: boolean;
  messageData: object;
}

const MovieCoreInfoOverview: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 440, maxHeight = 303 } = opts || {};
  const { title, image, rating, labels, buttons = [], hotwords } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    textSecondary,
    textCautionDefault,
    dividerList,
    spaceElementsS,
    spaceElementsM,
    spaceElementsXs,
    spaceElementsL,
    radiusImageS,
    cnHeadlineXsStrong,
    cnDisplayXsStrong,
    cnBodyM,
  } = system || {};

  // 生成星星评分
  const renderStars = () => {
    const stars = [];
    const starCount = 5;
    for (let i = 0; i < starCount; i++) {
      stars.push(<IconFont key={i} name="systemStarFill" size={16} color={textCautionDefault} />);
    }
    return stars;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: spaceElementsS,
    },
    header: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    content: {
      flexDirection: 'row',
      flex: 1,
    },
    posterSection: {
      width: 110,
      height: 196,
      borderRadius: radiusImageS,
      marginRight: spaceElementsL,
    },
    infoSection: {
      flex: 1,
      flexDirection: 'column',
      gap: spaceElementsS,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
      borderBottomWidth: 1,
      borderBottomColor: dividerList,
      paddingBottom: spaceElementsXs,
    },
    ratingScore: {
      alignItems: 'center',
    },
    ratingValue: {
      ...cnDisplayXsStrong,
      color: textTitle,
    },
    starsWrapper: {
      flexDirection: 'row',
      gap: 2,
      marginTop: spaceElementsXs,
    },
    // 标签行样式
    labelRow: {
      flexDirection: 'column',
      paddingBottom: spaceElementsXs,
      borderBottomWidth: 1,
      borderBottomColor: dividerList,
    },
    lastLabelRow: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    label: {
      ...cnBodyM,
      color: textSecondary,
      fontSize: 12,
      marginBottom: 4,
    },
    value: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      lineHeight: 20,
    },
  });

  const onItemPress = () => {
    // 跳转到专辑详情页面
    const buttonConfig = buttons?.[0];
    console.log('按钮点击:', buttonConfig);

    if (buttonConfig?.event?.set) {
      try {
        buttonConfig?.event?.set?.forEach(info => {
          // 复制原子能力，并删除hotword和fieldMapping
          const itemInfo = JSON.parse(JSON.stringify(info));
          delete itemInfo.hotwords;
          delete itemInfo.fieldMapping;
          itemInfo.input = fillTemplateByData(itemInfo.input, {
            index: 1,
            knowledge_base: buttonConfig?.knowledge_base,
          });
          sendMsgToNative({ type: 'invokeNativeEvent', data: itemInfo });
        });
      } catch (error) {
        console.error('按钮点击失败:', error);
      }
    }
  };

  const toRegistHotwords = () => {
    // 热词注册
    const regHotwords = [];
    const buttonConfig = buttons?.[0];
    try {
      buttons?.forEach(item => {
        const eventSet = JSON.parse(JSON.stringify(buttonConfig?.event?.set));
        eventSet.forEach(itemSet => {
          console.log('==itemSet==', itemSet);
          if (itemSet?.hotwords) {
            const setHotwords = JSON.parse(JSON.stringify(itemSet?.hotwords));

            delete itemSet.hotwords;
            delete itemSet.fieldMapping;

            setHotwords?.names?.forEach(hotwordName => {
              if (hotwordName) {
                hotwordName.callbackAction = {
                  // 热词对应的事件-原子能力
                  type: 'invokeNativeEvent',
                  data: fillTemplateByData([itemSet], buttonConfig),
                };
              }
            });
            regHotwords.push(setHotwords);
          }
        });
      });
    } catch (error) {
      console.error('按钮热词注册失败:', error);
    }

    try {
      if (hotwords) {
        const itemHotwords = JSON.parse(JSON.stringify(hotwords));
        itemHotwords?.names?.forEach(hotwordName => {
          if (hotwordName) {
            hotwordName.callbackAction = {
              type: 'invokeRNMethod',
              data: {
                methodName: 'handleItemButtonPress', // RN内部定义的方法。
                input: {
                  // id: data?.id, // 要播放的歌曲ID
                  // deeplink: data?.deeplink, // play, stop
                  index: 1,
                  knowledge_base: buttonConfig?.knowledge_base,
                },
              },
            };
          }
        });
        regHotwords.push(itemHotwords);
      }
    } catch (error) {
      console.log('热词注册失败:', error);
    }

    console.log('热词注册toRegistHotwords:', regHotwords);
    sendMsgToNative({
      type: 'hotwords',
      data: {
        hotwords: regHotwords,
      },
    });
  };

  const callRnMethod = {
    handleItemButtonPress: (params: any) => {
      onItemPress();
    },
  };

  useEffect(() => {
    if (!isEnded) {
      return;
    }
    if (messageData?.type === 'invokeRNMethod') {
      callRnMethod?.[messageData?.data?.methodName]?.(messageData?.data?.input);
    }
  }, [messageData]);

  useEffect(() => {
    if (isEnded) {
      console.log('数据传输完毕', +new Date());
      toRegistHotwords();
    }
  }, [isEnded]);

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {title && (
        <AnimationFadeSlide>
          <Text style={styles.header}>{title}</Text>
        </AnimationFadeSlide>
      )}

      <View style={styles.content}>
        {/* 左侧海报 */}
        {image && (
          <AnimationFadeSlide enableSlide={false}>
            <TouchableOpacity onPress={() => onItemPress?.()} activeOpacity={0.7}>
              <Image source={{ uri: image }} style={styles.posterSection} resizeMode="cover" />
            </TouchableOpacity>
          </AnimationFadeSlide>
        )}

        {/* 右侧信息 - 三行结构 */}
        <View style={styles.infoSection}>
          {/* 第一行：评分区域 */}
          {rating && (
            <AnimationFadeSlide>
              <View style={styles.ratingRow}>
                <View style={styles.ratingScore}>
                  <Text style={styles.ratingValue}>{rating}</Text>
                </View>
                <View style={styles.starsWrapper}>{renderStars()}</View>
              </View>
            </AnimationFadeSlide>
          )}

          {/* 第二行和第三行：标签信息 */}
          {labels?.map((item, index) => (
            <AnimationFadeSlide key={index}>
              <View style={[styles.labelRow, index === labels.length - 1 ? styles.lastLabelRow : {}]}>
                {item.label && <Text style={styles.label}>{item.label}</Text>}
                {item.value && (
                  <Text style={styles.value} numberOfLines={2}>
                    {item.value}
                  </Text>
                )}
              </View>
            </AnimationFadeSlide>
          ))}
        </View>
      </View>
    </CardContainer>
  );
};

export default MovieCoreInfoOverview;
