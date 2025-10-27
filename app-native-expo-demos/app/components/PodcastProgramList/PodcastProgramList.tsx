import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 播客来源类型
type TPodcastSource = 'apple' | 'spotify' | 'youtube' | 'netease' | 'music';

// 播客项数据类型
type TList = {
  id?: string;
  title?: string;
  duration?: string;
  source?: TPodcastSource;
  image?: string;
};

// 标签页数据类型
type TTabItem = {
  key: string;
  label: string;
  list?: TList[];
};

// 组件数据类型
type TData = {
  tabs?: TTabItem[];
  defaultTabKey?: string;
};

// 组件Props类型
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
  onPlayPress?: (item: TList) => void;
}

const PodcastProgramList: React.FC<IProps> = ({ data, opts, onPlayPress }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 440, maxHeight = 376 } = opts || {};
  const { tabs = [], defaultTabKey } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    iconPrimary,
    dividerList,
    spaceElementsXxs,
    spaceElementsS,
    spaceElementsM,
    spaceElementsL,
    spaceElementsXl,
    radiusImageS,
    cnHeadlineXsStrong,
    cnBodyS,
  } = system || {};

  // 状态管理
  const [activeTab, setActiveTab] = useState(defaultTabKey || tabs?.[0]?.key || '');

  // 获取播客来源图标名称
  const getSourceIconName = (source?: TPodcastSource): string => {
    const iconMap: Record<TPodcastSource, string> = {
      apple: 'sourceAppleFill',
      spotify: 'sourceSpotifyFill',
      youtube: 'sourceYoutubeFill',
      netease: 'sourceMusicFill',
      music: 'sourceMusicFill',
    };
    return iconMap[source || 'music'] || 'sourceMusicFill';
  };

  // 处理播放按钮点击
  const handlePlayPress = (item: TList) => {
    onPlayPress?.(item);
  };

  // 处理标签页切换
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  // 获取当前激活标签页的数据
  const activeTabData = tabs?.find?.(tab => tab?.key === activeTab);
  const currentItems = activeTabData?.list || [];

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsL,
    },
    tabContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spaceElementsS,
      flexShrink: 0,
    },
    contentContainer: {
      flex: 1,
      minHeight: 0,
    },
    itemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spaceElementsM,
      borderBottomWidth: 1,
      borderBottomColor: dividerList,
    },
    firstItem: {
      paddingTop: 0,
    },
    lastItem: {
      paddingBottom: 0,
      borderBottomWidth: 0,
    },
    cardLeftPanel: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flex: 1,
      gap: spaceElementsS,
    },
    image: {
      width: 64,
      height: 64,
      borderRadius: radiusImageS,
    },
    cardContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: spaceElementsXxs,
      flex: 1,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      marginRight: spaceElementsXl,
    },
    sourceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsXxs,
    },
    sourceText: {
      ...cnBodyS,
      color: textSecondary,
    },
    playButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIconContainer: {
      marginLeft: 2,
    },
  });

  // 渲染播客项
  const renderPodcastItem = (item: TList, index: number) => {
    const isFirst = index === 0;
    const isLast = index === (currentItems?.length || 0) - 1;

    return (
      <View key={item?.id || index} style={[styles.itemCard, isFirst && styles.firstItem, isLast && styles.lastItem]}>
        <View style={styles.cardLeftPanel}>
          {item?.image && <Image source={{ uri: item?.image }} style={styles.image} resizeMode="cover" />}
          <View style={styles.cardContent}>
            {item?.title && (
              <Text style={styles.title} numberOfLines={2}>
                {item?.title}
              </Text>
            )}
            <View style={styles.sourceInfo}>
              {item?.duration && <Text style={styles.sourceText}>{item?.duration}</Text>}
              {item?.source && <IconFont name={getSourceIconName(item?.source)} size={12} color={textSecondary} />}
              {item?.source && <Text style={styles.sourceText}>{item?.source}</Text>}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={() => handlePlayPress(item)} activeOpacity={0.7}>
          <View style={styles.playIconContainer}>
            <IconFont name="systemPlayCircle" size={40} color={iconPrimary} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标签页按钮 */}
      {tabs?.length > 0 && (
        <View style={styles.tabContainer}>
          {tabs?.map?.(tab => (
            <Button
              key={tab?.key}
              title={tab?.label || ''}
              type={activeTab === tab?.key ? 'primary' : 'secondary'}
              size="small"
              onPress={() => handleTabPress(tab?.key || '')}
            />
          ))}
        </View>
      )}

      {/* 内容区域 */}
      <View style={styles.contentContainer}>
        {currentItems?.map?.((item, index) => renderPodcastItem(item, index))}
      </View>
    </CardContainer>
  );
};

export default PodcastProgramList;
