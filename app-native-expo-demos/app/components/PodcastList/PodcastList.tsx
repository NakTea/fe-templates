import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';
import { convertSecondsToMinutes } from '../utils/date';

type TButtonConfig = {
  id: string;
  event?: Record<string, any>; // 自定义原子能力
};

type TPodcastItem = {
  id?: string;
  title?: string;
  hotwords?: Record<string, any>;
  image?: string;
  duration?: string;
  date?: string;
  album?: string;
};

type TData = {
  title?: string;
  list?: TPodcastItem[];
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

const PodcastList: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight = 376 } = opts || {};
  const { title, list = [], buttons } = data || {};
  const buttonConfig = buttons?.[0];

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    iconPrimary,
    dividerList,
    spaceElementsXxs,
    spaceElementsS,
    spaceElementsM,
    spaceElementsL,
    radiusImageS,
    cnHeadlineXsStrong,
    cnBodyS,
  } = system || {};

  const styles = StyleSheet.create({
    contentContainer: {
      gap: spaceElementsL,
    },
    titleSection: {
      justifyContent: 'flex-start',
    },
    sectionTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    itemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spaceElementsM,
      borderBottomColor: dividerList,
      gap: spaceElementsS,
    },
    cardLeftPanel: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flex: 1,
      overflow: 'hidden',
      gap: spaceElementsS,
    },
    coverImage: {
      width: 64,
      height: 64,
      borderRadius: radiusImageS,
    },
    cardContent: {
      flex: 1,
      justifyContent: 'center',
      gap: spaceElementsXxs,
      overflow: 'hidden',
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      margin: 0,
    },
    sourceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXxs,
    },
    metaText: {
      ...cnBodyS,
      color: textSecondary,
    },
    sourceText: {
      ...cnBodyS,
      color: textSecondary,
    },
    playButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto',
    },
  });

  // 处理item按钮点击
  const handleItemButtonPress = (itemObj: TPodcastItem) => {
    console.log('按钮点击:', {
      itemObj,
      buttonConfig,
    });
    if (buttonConfig?.event?.set) {
      try {
        buttonConfig?.event?.set?.forEach(item => {
          // 复制原子能力，并删除hotword和fieldMapping
          const itemInfo = JSON.parse(JSON.stringify(item));
          delete itemInfo.hotwords;
          delete itemInfo.fieldMapping;
          itemInfo.input = fillTemplateByData(itemInfo.input, itemObj);
          sendMsgToNative({ type: 'invokeNativeEvent', data: itemInfo });
        });
      } catch (error) {
        console.log('按钮点击报错', error);
      }
    }
  };

  const toRegistHotwords = () => {
    // 热词注册
    const regHotwords: any[] = [];
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
                  data: fillTemplateByData([itemSet], list[0]),
                };
              }
            });
            regHotwords.push(setHotwords);
          }
        });
      });
    } catch (error) {
      console.log('热词注册，按钮报错', error);
    }

    try {
      list?.forEach(item => {
        if (item?.hotwords) {
          const itemHotwords = JSON.parse(JSON.stringify(item.hotwords));
          itemHotwords?.names?.forEach(hotwordName => {
            if (hotwordName) {
              hotwordName.callbackAction = {
                type: 'invokeRNMethod',
                data: {
                  methodName: 'handleItemButtonPress', // RN内部定义的方法。
                  input: {
                    id: item?.id, // 要播放的歌曲ID
                  },
                },
              };
            }
          });
          regHotwords.push(itemHotwords);
        }
      });
    } catch (error) {
      console.log('热词注册，list报错', error);
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
      handleItemButtonPress(params);
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

  const renderPodcastItem = (item: TPodcastItem, index: number) => {
    const isLastItem = index === (list?.length || 0) - 1;

    return (
      <AnimationFadeSlide key={item?.id || index}>
        <View
          style={[
            styles.itemCard,
            { borderBottomWidth: isLastItem ? 0 : 1 },
            { paddingTop: index === 0 ? 0 : spaceElementsM },
            { paddingBottom: isLastItem ? 0 : spaceElementsM },
          ]}>
          <TouchableOpacity
            style={styles.cardLeftPanel}
            onPress={() => handleItemButtonPress(item)}
            activeOpacity={0.7}>
            {item?.image && <Image source={{ uri: item.image }} style={styles.coverImage} />}
            <View style={styles.cardContent}>
              {item?.title && (
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
              )}
              <View style={styles.sourceInfo}>
                <Text style={styles.metaText}>
                  {/* {item?.date && formatRelativeTime(item.date)} */}
                  {/* {item?.duration && ` · ${convertSecondsToMinutes(item.duration)}`} */}
                  {item?.duration && convertSecondsToMinutes(item.duration)}
                  {item?.album && ` · ${item.album}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={() => handleItemButtonPress(item)} activeOpacity={0.7}>
            <IconFont name="systemPlayCircle" size={40} color={iconPrimary} />
          </TouchableOpacity>
        </View>
      </AnimationFadeSlide>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.contentContainer}>
      {title && (
        <AnimationFadeSlide style={styles.titleSection}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </AnimationFadeSlide>
      )}

      {list && list?.length > 0 && <View>{list?.map?.((item, index) => renderPodcastItem(item, index))}</View>}
    </CardContainer>
  );
};

export default PodcastList;
