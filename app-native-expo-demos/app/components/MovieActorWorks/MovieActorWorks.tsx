import React, { Fragment, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

type TActorInfo = {
  name?: string;
};

type TSource = {
  name?: string;
  icon?: string;
};

type TMovieItem = {
  id?: string;
  title?: string;
  image?: string;
  category?: string;
  releaseDate?: string;
  source?: TSource[];
  active?: boolean;
};

type TButtonConfig = {
  id?: string;
  deeplink?: string;
  event?: Record<string, any>; // 自定义原子能力
  index: number;
  knowledge_base?: object[];
};

type TData = {
  items?: TActorInfo[];
  list?: TMovieItem[];
  buttons?: TButtonConfig[];
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
const MovieActorWorks: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构 opts
  const { width = 440, maxHeight = 376 } = opts || {};

  // 安全解构 data
  const { items, list, buttons } = data || {};

  // Token解构
  const {
    textPrimary,
    textTitle,
    textSecondary,
    containerSecondary,
    iconPrimary,
    spaceElementsXxs,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    spaceCardPaddingLeftRightXxxs,
    radiusImageS,
    dividerList,
    cnHeadlineXsStrong,
    cnBodyS,
    sizelconXs,
    sizeIconXl,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    avatarsSection: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spaceElementsXs,
    },
    avatarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: containerSecondary,
      borderRadius: 999,
      paddingVertical: spaceCardPaddingLeftRightXxxs,
      paddingHorizontal: spaceElementsXs,
      gap: spaceCardPaddingLeftRightXxxs,
    },
    avatarName: {
      ...cnBodyS,
      color: textSecondary,
    },
    scrollContainer: {
      // flex: 1,
    },
    movieList: {
      gap: spaceElementsM,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
      paddingBottom: 0,
    },
    listItemLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    listItemWithBorder: {
      borderBottomWidth: 1,
      borderBottomColor: dividerList,
      paddingBottom: spaceElementsM,
    },
    moviePoster: {
      width: 70,
      height: 100,
      borderRadius: radiusImageS,
    },
    movieInfo: {
      flex: 1,
      minWidth: 0,
      gap: spaceElementsXxs,
    },
    movieTitle: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    movieDetails: {
      ...cnBodyS,
      color: textPrimary,
    },
    movieRelease: {
      ...cnBodyS,
      color: textSecondary,
    },
    sourceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    sourceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXxs,
    },
    sourceName: {
      ...cnBodyS,
      color: textPrimary,
    },
    playbackInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 0,
    },
    playButton: {
      width: sizeIconXl,
      height: sizeIconXl,
    },
  });

  // 处理播放按钮点击
  const onItemPress = (itemAlbum: TMovieItem, index: any) => {
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
        console.log('按钮点击报错', error);
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
                  data: fillTemplateByData([itemSet], buttonConfig),
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
      list?.forEach((item, index) => {
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
      console.log('热词注册，列表报错', error);
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
      onItemPress(params, params.index);
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

  // 渲染播放按钮
  const renderPlayButton = (movie: TMovieItem, index: number, active?: boolean) => {
    const iconName = active ? 'systemPlayCircle' : 'systemPlayCircle';

    return (
      <Button
        type="secondary"
        size="small"
        style={styles.playButton}
        icon={<IconFont name={iconName} size={sizeIconXl} color={iconPrimary} />}
        onPress={() => onItemPress(movie, index + 1)}
      />
    );
  };

  // 渲染来源信息
  const renderSourceInfo = (sources?: TSource[]) => {
    if (!sources || sources.length === 0) {
      return null;
    }

    return (
      <View style={styles.sourceContainer}>
        {sources.map(
          (sourceItem, sourceIndex) =>
            sourceItem?.icon &&
            sourceItem?.name && (
              <View key={sourceIndex} style={styles.sourceItem}>
                <IconFont name={sourceItem.icon} size={sizelconXs} />
                <Text style={styles.sourceName}>{sourceItem.name}</Text>
              </View>
            ),
        )}
      </View>
    );
  };

  // 渲染电影列表项
  const renderMovieItem = (movie: TMovieItem, index: number) => {
    const { id, title, image, category, releaseDate, source, active } = movie || {};

    return (
      <AnimationFadeSlide key={id || index}>
        <View style={[styles.listItem, index < (list?.length || 0) - 1 && styles.listItemWithBorder]}>
          <TouchableOpacity
            style={styles.listItemLeft}
            onPress={() => onItemPress?.(movie, index + 1)}
            activeOpacity={0.7}>
            {/* 电影海报 */}
            {image && <Image source={{ uri: image }} style={styles.moviePoster} />}

            {/* 电影信息 */}
            <View style={styles.movieInfo}>
              {title && (
                <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">
                  {title}
                </Text>
              )}
              {category && (
                <Text style={styles.movieDetails} numberOfLines={1}>
                  类型: {category}
                </Text>
              )}
              {releaseDate && <Text style={styles.movieRelease}>{releaseDate}</Text>}
              {renderSourceInfo(source)}
            </View>
          </TouchableOpacity>

          {/* 播放信息 */}
          <View style={styles.playbackInfo}>{renderPlayButton(movie, index, active)}</View>
        </View>
      </AnimationFadeSlide>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} hasScrollView={false} style={styles.container}>
      {/* 演员头像区 */}
      {items && items.length > 0 && (
        <View style={styles.avatarsSection}>
          {items.map(
            (actor, index) =>
              actor?.name && (
                <AnimationFadeSlide direction="left" key={index} style={styles.avatarItem}>
                  <Fragment>
                    <IconFont name="iconUserFill" size={12} color={iconPrimary} />
                    <Text style={styles.avatarName}>{actor.name}</Text>
                  </Fragment>
                </AnimationFadeSlide>
              ),
          )}
        </View>
      )}

      {/* 电影列表 */}
      {list && list.length > 0 && (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.movieList}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          {list.map((movie, index) => renderMovieItem(movie, index))}
        </ScrollView>
      )}
    </CardContainer>
  );
};

export default MovieActorWorks;
