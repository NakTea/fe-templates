import React, { Fragment, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

// 按钮数据类型
type TButtonConfig = {
  id: string;
  deeplink: string;
  event?: Record<string, any>; // 自定义原子能力
  index: number;
  knowledge_base: object[];
};

// 歌曲数据类型
type TSongItem = {
  id?: string;
  deeplink?: string;
  hotwords?: Record<string, any>;
  title?: string;
  artist?: string;
  image?: string;
  duration?: string;
  source?: {
    icon?: string;
    name?: string;
  };
  active?: boolean;
};

// 组件数据类型
type TData = {
  title?: string;
  subtitle?: string;
  buttons?: TButtonConfig[]; // 按钮配置，用于定义每个item的按钮样式和事件
  list?: TSongItem[];
};

// 组件Props类型
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  atomicEvents: any;
  nativeData: object;
  sendMsgToNative: (msg: any) => void;
  isEnded: boolean;
  messageData: object;
}

const MusicSongList: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构opts
  const { width = 360, maxHeight = 376 } = opts || {};

  // 安全解构data
  const { title, subtitle, buttons, list } = data || {};

  // 获取第一个按钮配置作为默认配置
  const buttonConfig = buttons?.[0];

  // Token解构
  const {
    textTitle,
    textPrimary,
    textSecondary,
    spaceElementsXxs,
    spaceElementsS,
    spaceElementsM,
    sizeIconXl,
    radiusImageS,
    dividerList,
    cnHeadlineXsStrong,
    cnBodyS,
  } = system || {};

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spaceElementsM,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
    subtitle: {
      ...cnBodyS,
      color: textSecondary,
    },
    scrollContainer: {
      flex: 1,
    },
    songList: {
      gap: spaceElementsM,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 0,
    },
    listItemWithBorder: {
      borderBottomWidth: 1,
      borderBottomColor: dividerList,
      paddingBottom: spaceElementsM,
    },
    // 新增：可点击区域样式
    clickableArea: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
      borderRadius: radiusImageS,
    },
    albumCover: {
      width: 64,
      height: 64,
      borderRadius: radiusImageS,
    },
    songInfo: {
      flex: 1,
      minWidth: 0,
    },
    songTitle: {
      ...cnHeadlineXsStrong,
    },
    artistText: {
      ...cnBodyS,
    },
    sourceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXxs,
    },
    sourceText: {
      ...cnBodyS,
    },
    playbackInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 0,
    },
    durationText: {
      ...cnBodyS,
    },
    playButton: {
      width: sizeIconXl,
      height: sizeIconXl,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // 处理item按钮点击
  const handleItemButtonPress = (song: TSongItem, index: any) => {
    console.log('按钮点击:', {
      song,
      buttonConfig,
    });
    if (buttonConfig?.event?.set) {
      try {
        buttonConfig?.event?.set?.forEach(item => {
          // 复制原子能力，并删除hotword和fieldMapping
          const itemInfo = JSON.parse(JSON.stringify(item));
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

  // 处理左侧区域点击（与按钮点击效果相同）
  const handleLeftAreaPress = (song: TSongItem, index: number) => {
    // 调用相同的处理函数，保持行为一致
    handleItemButtonPress(song, index + 1);
  };

  // 渲染音乐来源信息
  const renderSourceInfo = (source?: { icon?: string; name?: string }) => {
    if (!source?.icon || !source?.name) {
      return null;
    }

    return (
      <View style={styles.sourceInfo}>
        <IconFont name={source.icon} size={12} color={textPrimary} />
        <Text style={[styles.sourceText, { color: textPrimary }]}>{source.name}</Text>
      </View>
    );
  };

  // 渲染播放按钮
  const renderPlayButton = (song: TSongItem, index: number, active?: boolean) => {
    if (!buttonConfig) {
      return null;
    }

    const currentIcon = active ? 'systemPauseFill' : 'systemPlayCircle';

    return (
      <Button
        type="secondary"
        size="small"
        style={styles.playButton}
        icon={currentIcon ? <IconFont name={currentIcon} size={sizeIconXl} /> : undefined}
        onPress={() => handleItemButtonPress(song, index + 1)}
      />
    );
  };

  // 渲染歌曲列表项
  const renderSongItem = (song: TSongItem, index: number) => {
    song.active = false;

    const { id, title: songTitle, artist, image, duration, source, active } = song || {};

    return (
      <AnimationFadeSlide
        key={id || index}
        style={[styles.listItem, index < (list?.length || 0) - 1 && styles.listItemWithBorder]}>
        <Fragment>
          {/* 可点击的左侧区域：专辑封面 + 歌曲信息 */}
          <TouchableOpacity
            style={styles.clickableArea}
            onPress={() => handleLeftAreaPress(song, index)}
            activeOpacity={0.7}>
            {/* 专辑封面 */}
            {image && <Image source={{ uri: image }} style={styles.albumCover} />}

            {/* 歌曲信息 */}
            <View style={[styles.songInfo, { gap: spaceElementsXxs }]}>
              {songTitle && (
                <Text style={[styles.songTitle, { color: textTitle }]} numberOfLines={1}>
                  {songTitle}
                </Text>
              )}
              {artist && (
                <Text style={[styles.artistText, { color: textPrimary }]} numberOfLines={1}>
                  {artist}
                </Text>
              )}
              {renderSourceInfo(source)}
            </View>
          </TouchableOpacity>

          {/* 右侧播放信息区域 */}
          <View style={[styles.playbackInfo, { gap: spaceElementsS }]}>
            {/* {duration && <Text style={[styles.durationText, { color: textSecondary }]}>{duration}</Text>} */}
            {renderPlayButton(song, index, active)}
          </View>
        </Fragment>
      </AnimationFadeSlide>
    );
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
                    // id: item?.id, // 要播放的歌曲ID
                    // deeplink: item?.deeplink, // play, stop
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
      handleItemButtonPress(params, params.index);
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
    <CardContainer width={width} maxHeight={maxHeight}>
      {/* 头部标题区域 */}
      {(title || subtitle) && (
        <AnimationFadeSlide style={styles.header}>
          <Fragment>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </Fragment>
        </AnimationFadeSlide>
      )}

      {/* 歌曲列表 */}
      {list && list?.length > 0 && (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.songList}
          showsVerticalScrollIndicator={false}>
          {list.map((song, index) => renderSongItem(song, index))}
        </ScrollView>
      )}
    </CardContainer>
  );
};

export default MusicSongList;
