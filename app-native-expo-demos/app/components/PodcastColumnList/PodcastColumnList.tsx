import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TDetailItem = {
  label?: string;
  value?: string;
};

type TPodcastItem = {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  meta?: TDetailItem[];
};

type TData = {
  title?: string;
  list?: TPodcastItem[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  onPlayPress?: (podcast: TPodcastItem) => void;
}

const PodcastColumnList: React.FC<IProps> = ({ data, opts, onPlayPress }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 300, maxHeight = 376 } = opts || {};
  const { title = '播客列表', list } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    textTitle,
    dividerList,
    iconPrimary,
    spaceElementsXXS,
    spaceElementsM,
    radiusImageS,
    cnHeadlineXsStrong,
    cnBodyM,
    cnBodyS,
  } = system || {};

  const handlePlayPress = (podcast: TPodcastItem) => {
    onPlayPress?.(podcast);
  };

  const renderPodcastItem = (podcast: TPodcastItem, index: number) => {
    const { name, description, image, meta } = podcast || {};
    const isLastItem = index === (list?.length || 0) - 1;

    return (
      <View key={podcast?.id || index} style={[styles.podcastItem, isLastItem && styles.lastItem]}>
        {image && (
          <Image
            source={{ uri: image }}
            style={[styles.podcastCover, { borderRadius: radiusImageS }]}
            resizeMode="cover"
          />
        )}

        <View style={[styles.podcastInfo, { gap: spaceElementsXXS }]}>
          {name && (
            <Text style={[styles.podcastName, { color: textPrimary }]} numberOfLines={1}>
              {name}
            </Text>
          )}

          {description && (
            <Text style={[styles.podcastDescription, { color: textSecondary }]} numberOfLines={1}>
              {description}
            </Text>
          )}

          {meta && meta.length > 0 && (
            <View style={[styles.podcastMeta, { gap: spaceElementsM }]}>
              {meta.map((detail, detailIndex) => (
                <Text key={detailIndex} style={[styles.metaItem, { color: textSecondary }]}>
                  {detail.label}
                  {detail.value}
                </Text>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => handlePlayPress(podcast)}
          accessibilityLabel={`播放 ${name || '播客'}`}>
          <IconFont name="systemPlayCircle" size={40} color={iconPrimary} />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
      marginBottom: spaceElementsM,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    scrollContainer: {
      flex: 1,
    },
    podcastItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spaceElementsM,
      marginBottom: spaceElementsM,
      borderBottomWidth: 1,
      borderBottomColor: dividerList,
    },
    lastItem: {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottomWidth: 0,
    },
    podcastCover: {
      width: 80,
      height: 80,
      marginRight: spaceElementsM,
    },
    podcastInfo: {
      flex: 1,
      minWidth: 0,
    },
    podcastName: {
      ...cnHeadlineXsStrong,
    },
    podcastDescription: {
      ...cnBodyM,
    },
    podcastMeta: {
      flexDirection: 'row',
    },
    metaItem: {
      ...cnBodyS,
    },
    playButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight}>
      <View style={styles.header}>{title && <Text style={styles.title}>{title}</Text>}</View>

      {list?.map((podcast, index) => renderPodcastItem(podcast, index))}
    </CardContainer>
  );
};

export default PodcastColumnList;
