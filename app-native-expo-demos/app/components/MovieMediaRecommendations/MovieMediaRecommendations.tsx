import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { fillTemplateByData } from '../utils/dataTransformer';

type TMovieItem = {
  id?: string;
  deeplink?: string;
  hotwords?: object;
  image?: string;
  title?: string;
  rating?: number;
};

// 按钮数据类型
type TButtonConfig = {
  id?: string;
  deeplink?: string;
  event?: Record<string, any>; // 自定义原子能力
  index: number;
  knowledge_base: object[];
};

type TData = {
  title?: string;
  items?: TMovieItem[];
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

const MovieMediaRecommendations: React.FC<IProps> = ({ data, opts, sendMsgToNative, messageData, isEnded }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, items, buttons } = data || {};

  // Token解构
  const {
    textTitle,
    textSecondary,
    textCautionDefault,
    spaceElementsS,
    spaceElementsXs,
    spaceElementsXxxs,
    radiusImageS,
    cnHeadlineXsStrong,
    cnHeadlineXxsStrong,
    cnBodyS,
  } = system || {};

  const styles = StyleSheet.create({
    contentWrapper: {
      flex: 1,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      textAlign: 'left',
      marginBottom: spaceElementsS,
    },
    movieGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 14,
      rowGap: 8,
    },
    movieItem: {
      width: 56,
    },
    moviePoster: {
      width: '100%',
      aspectRatio: 2 / 3,
      borderRadius: radiusImageS,
      marginBottom: spaceElementsXs,
    },
    movieTitle: {
      ...cnHeadlineXxsStrong,
      color: textTitle,
      marginTop: spaceElementsXxxs,
      marginBottom: spaceElementsXxxs,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      ...cnBodyS,
      color: textSecondary,
      marginLeft: spaceElementsXxxs,
    },
  });

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
          itemInfo.input = fillTemplateByData(itemInfo.input, { index, knowledge_base: buttonConfig?.knowledge_base });
          sendMsgToNative({ type: 'invokeNativeEvent', data: itemInfo });
        });
      } catch (error) {
        console.error('事件配置错误:', error);
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
      console.error('按钮热词注册错误:', error);
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
      console.error('列表热词注册错误:', error);
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

  const renderMovieItem = (movie: TMovieItem, index: number) => (
    <AnimationFadeSlide direction="left" key={index}>
      <TouchableOpacity style={styles.movieItem} onPress={() => onItemPress?.(movie, index + 1)} activeOpacity={0.7}>
        {movie.image && <Image source={{ uri: movie.image }} style={styles.moviePoster} resizeMode="cover" />}
        {movie.title && (
          <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">
            {movie.title}
          </Text>
        )}
        {movie.rating && (
          <View style={styles.ratingContainer}>
            <IconFont name="systemStarFill" size={12} color={textCautionDefault} />
            <Text style={styles.ratingText}>{movie.rating}</Text>
          </View>
        )}
      </TouchableOpacity>
    </AnimationFadeSlide>
  );

  return (
    <CardContainer width={width} maxHeight={maxHeight}>
      {title && (
        <AnimationFadeSlide>
          <Text style={styles.title}>{title}</Text>
        </AnimationFadeSlide>
      )}

      {items && items.length > 0 && (
        <View style={styles.movieGrid}>{items.map((movie, index) => renderMovieItem(movie, index))}</View>
      )}
    </CardContainer>
  );
};

export default MovieMediaRecommendations;
