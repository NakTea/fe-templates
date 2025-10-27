import React, { Fragment, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import Tag from '../basic/Tag';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

type TButtonConfig = {
  id?: string;
  deeplink?: string;
  event?: Record<string, any>; // 自定义原子能力
  index: number;
  knowledge_base: object[];
};

type TSimilarSong = {
  id?: string;
  deeplink?: string;
  image?: string;
  title?: string;
  artist?: string;
  hotwords?: object;
};

type TData = {
  image?: string;
  title?: string;
  artist?: string;
  date?: string;
  description?: string;
  tags?: string[];
  itemsTitle?: string;
  items?: TSimilarSong[];
  buttons?: TButtonConfig[];
  index?: number;
  knowledge_base: object[];
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

const MusicSimilarStyles: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 440, maxHeight } = opts || {};
  const {
    image,
    title,
    artist,
    date,
    description,
    tags,
    itemsTitle,
    items,
    buttons = [],
    index,
    knowledge_base,
  } = data || {};

  // Token解构
  const {
    textPrimary,
    textTitle,
    containerSecondary,
    radiusImageS,
    spaceCardPadding,
    spaceElementsXXS,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    cnDisplayXxxsStrong,
    cnBodyL,
    cnBodyS,
    cnHeadlineXsStrong,
    cnBodyM,
  } = system || {};

  const styles = StyleSheet.create({
    header: {
      padding: spaceCardPadding,
      paddingBottom: 0,
      gap: spaceElementsM,
    },
    mainInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    headerCover: {
      width: 64,
      height: 64,
      borderRadius: spaceElementsXs,
    },
    songInfoContainer: {
      flex: 1, // 添加flex: 1使文本容器能够正确计算宽度
      minWidth: 0, // 确保flex子元素能够收缩
    },
    songTitle: {
      ...cnDisplayXxxsStrong,
      color: textTitle,
      margin: 0,
    },
    artistName: {
      ...cnBodyL,
      color: textPrimary,
      margin: 0,
    },
    descriptionContainer: {
      gap: spaceElementsXXS,
    },
    date: {
      ...cnBodyS,
      color: textPrimary,
      margin: 0,
    },
    description: {
      ...cnBodyS,
      color: textPrimary,
      margin: 0,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spaceElementsXs,
    },
    panel: {
      flex: 1,
      paddingTop: spaceElementsM,
      paddingBottom: spaceCardPadding,
      paddingLeft: spaceCardPadding,
      gap: spaceElementsXs,
    },
    panelTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
      paddingRight: spaceCardPadding,
    },
    scrollContainer: {
      paddingRight: spaceCardPadding,
    },
    songItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
      padding: spaceElementsXs,
      backgroundColor: containerSecondary,
      borderRadius: spaceElementsXs,
      marginRight: spaceElementsXs,
    },
    songItemCover: {
      width: 48,
      height: 48,
      borderRadius: radiusImageS,
    },
    songItemDetails: {
      minWidth: 0, // 确保文本容器能够正确收缩
      maxWidth: 120, // 限制最大宽度，确保文本能够正确省略
    },
    songItemTitle: {
      ...cnBodyM,
      color: textPrimary,
      margin: 0,
    },
    songItemArtist: {
      ...cnBodyS,
      color: textPrimary,
      margin: 0,
    },
  });

  const onAlbumPress = (itemAlbum: TSimilarSong, index: any) => {
    // 跳转到专辑详情页面
    console.log('按钮点击:', itemAlbum);
    const buttonConfig = buttons?.[0];
    if (buttonConfig?.event?.set) {
      try {
        buttonConfig?.event?.set?.forEach(info => {
          // 复制原子能力，并删除hotword和fieldMapping
          const itemInfo = JSON.parse(JSON.stringify(info));
          delete itemInfo.hotwords;
          delete itemInfo.fieldMapping;
          itemInfo.input = fillTemplateByData(itemInfo.input, { index, knowledge_base: buttonConfig.knowledge_base });
          sendMsgToNative({ type: 'invokeNativeEvent', data: itemInfo });
        });
      } catch (error) {
        console.log('按钮点击:', error);
      }
    }
  };

  const toRegistHotwords = () => {
    // 热词注册
    const regHotwords: any[] = [];
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
                  data: fillTemplateByData([itemSet], { index, knowledge_base }),
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
      items?.forEach((item, index) => {
        if (item?.hotwords) {
          const itemHotwords = JSON.parse(JSON.stringify(item.hotwords));
          itemHotwords?.names?.forEach(hotwordName => {
            if (hotwordName) {
              hotwordName.callbackAction = {
                type: 'invokeRNMethod',
                data: {
                  methodName: 'handleItemButtonPress', // RN内部定义的方法。
                  input: {
                    // id: '123456', // 要播放的歌曲ID
                    // deeplink: 'play', // play, stop
                    index: index + 1,
                    knowledge_base: buttonConfig?.knowledge_base,
                  },
                },
              };
            }
          });
          regHotwords.push(itemHotwords);
        }
      });
    } catch (error) {
      console.log('热词注册，LIST报错', error);
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
      onAlbumPress(params, params.index);
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
    <CardContainer width={width} maxHeight={maxHeight || 376}>
      {/* 头部信息区域 */}
      <View style={styles.header}>
        {/* 主要信息 */}
        <AnimationFadeSlide style={styles.mainInfo}>
          <Fragment>
            {image && <Image source={{ uri: image }} style={styles.headerCover} resizeMode="cover" />}
            <View style={styles.songInfoContainer}>
              {title && (
                <Text style={styles.songTitle} numberOfLines={1} ellipsizeMode="tail">
                  {title}
                </Text>
              )}
              {artist && (
                <Text style={styles.artistName} numberOfLines={1} ellipsizeMode="tail">
                  {artist}
                </Text>
              )}
            </View>
          </Fragment>
        </AnimationFadeSlide>

        {/* 描述信息 */}
        <AnimationFadeSlide style={styles.descriptionContainer}>
          <Fragment>
            {date && <Text style={styles.date}>{date}</Text>}
            {description && (
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
            )}
          </Fragment>
        </AnimationFadeSlide>

        {/* 标签 */}
        {tags && tags.length > 0 && (
          <AnimationFadeSlide style={styles.tagsContainer}>
            <Fragment>
              {tags.map((tag, index) => (
                <Tag key={index} text={tag} size="small" backgroundColor={containerSecondary} textColor={textPrimary} />
              ))}
            </Fragment>
          </AnimationFadeSlide>
        )}
      </View>

      {/* 推荐列表区域 */}
      {(itemsTitle || items) && (
        <View style={styles.panel}>
          {itemsTitle && (
            <AnimationFadeSlide>
              <Text style={styles.panelTitle}>{itemsTitle}</Text>
            </AnimationFadeSlide>
          )}

          {items && items.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              {items.map((item, index) => (
                <AnimationFadeSlide direction="left" key={index}>
                  <TouchableOpacity
                    style={styles.songItem}
                    onPress={() => onAlbumPress?.(item, index + 1)}
                    activeOpacity={0.7}>
                    {item.image && (
                      <Image source={{ uri: item.image }} style={styles.songItemCover} resizeMode="cover" />
                    )}
                    <View style={styles.songItemDetails}>
                      {item.title && (
                        <Text style={styles.songItemTitle} numberOfLines={1} ellipsizeMode="tail">
                          {item.title}
                        </Text>
                      )}
                      {item.artist && (
                        <Text style={styles.songItemArtist} numberOfLines={1} ellipsizeMode="tail">
                          {item.artist}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </AnimationFadeSlide>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </CardContainer>
  );
};

export default MusicSimilarStyles;
