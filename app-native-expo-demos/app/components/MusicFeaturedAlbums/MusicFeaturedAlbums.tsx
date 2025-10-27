import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

type TItem = {
  id?: string;
  deeplink?: string;
  image?: string;
  title?: string;
  labels?: string[];
  hotwords?: object;
};

// 按钮数据类型
type TButtonConfig = {
  id?: string;
  deeplink?: string;
  event?: Record<string, any>; // 自定义原子能力
  index: number;
  knowledge_base?: object[];
};

type TData = {
  title?: string;
  description?: string;
  image?: string;
  buttons?: TButtonConfig[];
  itemsTitle?: string;
  items?: TItem[];
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

const MusicFeaturedAlbums: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 360, maxHeight = 376 } = opts || {};
  const { title, description, image, itemsTitle = '代表专辑', items, buttons } = data || {};

  // Token解构
  const {
    textTitle,
    textPrimary,
    containerSecondary,
    containerBsDefault,
    borderWeakDefault,
    radiusImageS,
    spaceElementsXs,
    spaceElementsS,
    spaceCardPadding,
    cnDisplayXxsStrong,
    cnHeadlineXsStrong,
    cnBodyM,
    cnBodyS,
    sizeAvatarL,
    sizeComphM,
  } = system || {};

  const styles = StyleSheet.create({
    artistHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    artistAvatar: {
      width: sizeAvatarL,
      height: sizeAvatarL,
      borderRadius: sizeAvatarL / 2,
      borderWidth: 2,
      borderColor: containerSecondary,
    },
    artistDetailsWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    artistTextDetails: {
      flex: 1,
      minWidth: 0,
    },
    artistName: {
      ...cnDisplayXxsStrong,
      color: textTitle,
      marginBottom: 0,
    },
    artistBio: {
      ...cnBodyM,
      color: textPrimary,
      marginTop: 2,
    },
    artistActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    iconButtonWrapper: {
      width: sizeComphM,
      height: sizeComphM,
      borderRadius: sizeComphM / 2,
      backgroundColor: containerBsDefault,
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: borderWeakDefault,
      marginHorizontal: spaceCardPadding,
      marginVertical: 16,
    },
    galleryPanel: {
      flex: 1,
      paddingHorizontal: spaceCardPadding,
      paddingVertical: spaceCardPadding,
    },
    galleryHeader: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginBottom: spaceElementsXs,
    },
    albumsScrollView: {
      flex: 1,
    },
    albumsContainer: {
      flexDirection: 'row',
      gap: spaceElementsS,
      paddingRight: spaceElementsS,
    },
    albumItem: {
      width: 80,
      gap: spaceElementsXs,
    },
    albumCover: {
      width: 80,
      aspectRatio: 1,
      borderRadius: radiusImageS,
    },
    albumDetails: {
      alignItems: 'flex-start',
    },
    albumTitle: {
      width: 80,
      ...cnBodyM,
      color: textTitle,
    },
    albumInfo: {
      width: 80,
      ...cnBodyS,
      color: textPrimary,
      marginTop: 2,
    },
  });

  const onAlbumPress = (itemAlbum: TItem, index: any) => {
    // 跳转到专辑详情页面
    console.log('按钮点击:', itemAlbum, index);
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
        console.log('按钮点击报错:', error);
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
      console.log('按钮热词注册报错:', error);
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
      console.log('LIST热词注册报错:', error);
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

  const renderAlbumItem = (item: TItem, index: number) => {
    const { image: itemImage, title: itemTitle, labels } = item || {};

    return (
      <AnimationFadeSlide direction="left" key={index}>
        <TouchableOpacity style={styles.albumItem} onPress={() => onAlbumPress?.(item, index + 1)} activeOpacity={0.7}>
          {itemImage && <Image source={{ uri: itemImage }} style={styles.albumCover} />}
          <View style={styles.albumDetails}>
            {itemTitle && (
              <Text style={styles.albumTitle} numberOfLines={1}>
                {itemTitle}
              </Text>
            )}
            {labels && labels.length > 0 && (
              <Text style={styles.albumInfo} numberOfLines={1}>
                {labels.join('·')}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </AnimationFadeSlide>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight}>
      {/* 艺术家信息头部 */}
      <View style={styles.artistHeader}>
        {image && (
          <AnimationFadeSlide enableSlide={false}>
            <Image source={{ uri: image }} style={styles.artistAvatar} />
          </AnimationFadeSlide>
        )}
        <AnimationFadeSlide style={styles.artistDetailsWrapper}>
          <View style={styles.artistTextDetails}>
            {title && (
              <Text style={styles.artistName} numberOfLines={1}>
                {title}
              </Text>
            )}
            {description && (
              <Text style={styles.artistBio} numberOfLines={1}>
                {description}
              </Text>
            )}
          </View>
        </AnimationFadeSlide>
      </View>

      {/* 分割线 */}
      <View style={styles.divider} />

      {/* 专辑画廊 */}
      <View style={styles.galleryPanel}>
        {itemsTitle && (
          <AnimationFadeSlide>
            <Text style={styles.galleryHeader}>{itemsTitle}</Text>
          </AnimationFadeSlide>
        )}
        {items && items?.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.albumsScrollView}
            contentContainerStyle={styles.albumsContainer}>
            {items.map((item, index) => renderAlbumItem(item, index))}
          </ScrollView>
        )}
      </View>
    </CardContainer>
  );
};

export default MusicFeaturedAlbums;
