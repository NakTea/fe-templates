import React, { Fragment, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { IEventItem } from '../index.d';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { parseJsonString } from '../utils';
import { fillTemplateByData } from '../utils/dataTransformer';

// 按钮数据类型
type TButtonConfig = {
  icon?: string;
  activeIcon?: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  event?: Record<string, any>; // 自定义原子能力
};

// 歌曲数据类型
type TSongItem = {
  id?: string;
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
  removeNativeListener: () => void;
}

const MusicSongListEventAll: React.FC<IProps> = ({
  data,
  opts,
  atomicEvents,
  sendMsgToNative,
  removeNativeListener,
  messageData,
  nativeData,
  isEnded,
}) => {
  const [fieldMappingData, setFieldMappingData] = useState<Record<string, any>>({});
  const [currentSongId, setCurrentSongId] = useState('');
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  console.log('isEnded', isEnded);

  // 安全解构opts
  const { width = 360, maxHeight = 376 } = opts || {};

  // 如果有初始化的值，则需要实时的根据data的值替换get的信息，并命名为filledData
  const filledData = data || {};
  const infoTemp = filledData?.buttons?.[0]?.event?.get?.[0];
  const eventNativeData = Array.isArray(nativeData) ? nativeData?.find(item => item?.name === infoTemp?.name) : {};
  const mappingDataTemp = fillTemplateByData(infoTemp?.fieldMapping, parseJsonString(eventNativeData?.response));
  filledData.buttons = fillTemplateByData(filledData.buttons, mappingDataTemp?.data);
  // console.log('---filledData---', filledData, eventNativeData, mappingDataTemp);

  // 安全解构 filledData
  const { title, subtitle, buttons, list } = filledData;

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
      width: 72,
      height: 72,
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
  const handleItemButtonPress = (song: TSongItem, index: number) => {
    console.log('按钮点击:', {
      song,
      index,
      buttonConfig,
    });
    if (buttonConfig?.event?.set) {
      buttonConfig?.event?.set?.forEach(item => {
        // 复制原子能力，并删除hotword和fieldMapping
        const itemInfo = JSON.parse(JSON.stringify(item));
        delete itemInfo.hotwords;
        delete itemInfo.fieldMapping;
        itemInfo.input = fillTemplateByData(itemInfo.input, song);
        sendMsgToNative({ type: 'invokeNativeEvent', data: itemInfo });
      });
    }
  };

  // 处理左侧区域点击（与按钮点击效果相同）
  const handleLeftAreaPress = (song: TSongItem, index: number) => {
    // 调用相同的处理函数，保持行为一致
    handleItemButtonPress(song, index);
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

    const { icon, activeIcon, type = 'secondary' } = buttonConfig;
    const currentIcon = active && activeIcon ? activeIcon : icon;

    return (
      <Button
        type={type}
        size="small"
        style={styles.playButton}
        icon={currentIcon ? <IconFont name={currentIcon} size={sizeIconXl} /> : undefined}
        onPress={() => handleItemButtonPress(song, index)}
      />
    );
  };

  // 渲染歌曲列表项
  const renderSongItem = (song: TSongItem, index: number) => {
    song.active = currentSongId === song.id;

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
            {duration && <Text style={[styles.durationText, { color: textSecondary }]}>{duration}</Text>}
            {renderPlayButton(song, index, active)}
          </View>
        </Fragment>
      </AnimationFadeSlide>
    );
  };

  // 热词热词
  const toRegistHotwords = () => {
    // 热词注册
    const regHotwords = [];
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
                  id: '123456', // 要播放的歌曲ID
                  index: 1,
                  deeplink: 'play', // play, stop
                },
              },
            };
          }
        });
        regHotwords.push(itemHotwords);
      }
    });
    console.log('热词注册', regHotwords);
    sendMsgToNative({
      type: 'hotwords',
      data: {
        hotwords: regHotwords,
      },
    });
  };

  const toInvokeListens = () => {
    // 触发listen事件
    buttons?.forEach(item => {
      item?.event?.listen?.forEach((eventItem: IEventItem) => {
        // console.log('eventItem', eventItem);
        const info = JSON.parse(JSON.stringify(eventItem));
        delete info.fieldMapping;
        info.input = fillTemplateByData(info.input, item);
        info.callbackMessage = {
          // response这里需要Nativ填充为具体返回信息
          type: 'eventMessage',
          data: {
            name: info.name,
            response: '{{response}}',
          },
        };
        if (info?.trigger === 'native') {
          sendMsgToNative({
            type: 'invokeNativeEvent',
            data: info,
          });
        }
      });
    });
  };

  const initFieldMappingData = () => {
    // 初始化get数据
    const fieldMappingDataObj = {};
    buttons?.forEach(item => {
      item?.event?.get?.forEach((eventItem: IEventItem) => {
        // console.log('eventItem', eventItem);
        const info = JSON.parse(JSON.stringify(eventItem));
        const eventNativeData = Array.isArray(nativeData) ? nativeData?.find(item => item.name === info.name) : {};
        fieldMappingDataObj[info.name] = fillTemplateByData(
          info.fieldMapping,
          parseJsonString(eventNativeData?.response),
        );
      });
    });
    console.log('fieldMappingDataObj', fieldMappingDataObj);
    setFieldMappingData(fieldMappingDataObj);
  };

  const callRnMethod = {
    handleItemButtonPress: (params: any) => {
      handleItemButtonPress(params, params.index);
    },
  };

  // 初始化get值得到当前songid
  const initGetData = (tag = false) => {
    // tag 为true需要强制触发一次
    // get获取到的信息需要实时的处理，如果流式数据已经完毕则不再触发。
    if (isEnded && !tag) {
      return;
    }
    const eventName = buttonConfig?.event?.get?.[0]?.name;
    const rnEventData = buttonConfig?.event?.get?.[0]?.fieldMapping?.data;
    const eventNativeData = Array.isArray(nativeData) ? nativeData?.find(item => item.name === eventName) : {};
    const newRnEventData = fillTemplateByData(rnEventData, parseJsonString(eventNativeData?.response));
    console.log('初始化get数据-buttonConfig', eventName, buttonConfig);
    console.log('初始化get数据-nativeData', nativeData);
    console.log('初始化get数据-eventNativeData', eventNativeData);
    console.log('初始化get数据-newRnEventData', newRnEventData);
    setCurrentSongId(newRnEventData?.currentSongId);
  };

  useEffect(() => {
    console.log('模板组件-有数据更新', messageData, isEnded);
    if (!isEnded) {
      return;
    }
    if (messageData?.type === 'eventMessage') {
      console.log('接收到eventMessage更新', messageData);
      const fieldMappingListen = JSON.parse(JSON.stringify(buttonConfig?.event?.listen?.[0]?.fieldMapping));
      const listenInfo = fillTemplateByData(fieldMappingListen, parseJsonString(messageData?.data?.response));
      setCurrentSongId(listenInfo?.data?.currentSongId);
      console.log('listenInfo', listenInfo?.data?.currentSongId);
    } else if (messageData?.type === 'invokeRNMethod') {
      console.log('接收到触发RN的消息通知', messageData);
      callRnMethod?.[messageData?.data?.methodName]?.(messageData?.data?.input);
    }
  }, [messageData]);

  useEffect(() => {
    console.log('currentSongId', currentSongId);
  }, [currentSongId]);

  useEffect(() => {
    initGetData(false);
  }, [nativeData, data]);

  useEffect(() => {}, [nativeData]);

  useEffect(() => {
    if (isEnded) {
      toInvokeListens();
      toRegistHotwords();
      initFieldMappingData();
      initGetData(true); // 结束后触发一次
    }
  }, [isEnded]);

  useEffect(() => {
    return () => {
      console.log('注销', buttonConfig, sendMsgToNative);
      if (buttonConfig?.event?.destroy) {
        buttonConfig?.event?.destroy?.forEach((eventItem: IEventItem) => {
          if (eventItem?.trigger === 'native') {
            const info = JSON.parse(JSON.stringify(eventItem));
            delete info.fieldMapping;
            info.input = fillTemplateByData(info.input, buttonConfig);
            console.log('注销-sendMsgToNative', info);
            sendMsgToNative({ type: 'invokeNativeEvent', data: info });
          }
        });
      }
      removeNativeListener?.();
    };
  }, []);

  return (
    <CardContainer width={width} maxHeight={maxHeight}>
      {/* 头部标题区域 */}
      {(title || subtitle) && (
        <AnimationFadeSlide style={styles.header}>
          <Fragment>
            {title && (
              <Text style={styles.title}>
                {title}
                {currentSongId}{' '}
              </Text>
            )}
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

export default MusicSongListEventAll;
