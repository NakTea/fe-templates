import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from '../basic/AutoHeightImage';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import MarkdownRenderer from '../basic/MarkdownRenderer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TTabItem = {
  key: string;
  label: string;
  image?: string;
  description?: string;
  sections?: {
    title?: string;
    items?: {
      title?: string;
      content?: string;
    }[];
  }[];
  content?: string; // Markdown内容，展示在最下面
};

type TData = {
  title?: string;
  titleIcon?: string; // 标题前的图标名称
  tabs?: TTabItem[];
  defaultTabKey?: string;
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeTabView: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, titleIcon, tabs = [], defaultTabKey } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    spaceElementsS,
    spaceElementsM,
    radiusInCard,
    cnHeadlineXsStrong,
    cnDisplayXxxsStrong,
    cnBodyM,
    sizeIconS,
  } = system || {};

  // Tab状态管理
  const [activeTabKey, setActiveTabKey] = useState(defaultTabKey || tabs[0]?.key || '');

  // 获取当前激活tab的数据
  const getCurrentTabData = () => {
    return tabs?.find(tab => tab.key === activeTabKey);
  };

  const styles = StyleSheet.create({
    contentContainer: {
      gap: spaceElementsM,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      gap: spaceElementsS,
    },
    tabButton: {
      flex: 1,
    },
    image: {
      width: '100%',
      borderRadius: radiusInCard,
    },
    description: {
      ...cnBodyM,
      color: textSecondary,
    },
    sectionTitle: {
      ...cnDisplayXxxsStrong,
      color: textPrimary,
      marginBottom: spaceElementsS,
    },
    featureList: {
      gap: spaceElementsS,
      paddingLeft: spaceElementsM,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    bulletPoint: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: textSecondary,
      marginTop: 8,
      marginRight: spaceElementsS,
      marginLeft: -spaceElementsM,
    },
    featureText: {
      ...cnBodyM,
      color: textSecondary,
      flex: 1,
    },
    strongText: {
      color: textPrimary,
      fontWeight: '800',
    },
    markdownContainer: {
      color: textPrimary,
      marginTop: spaceElementsM,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: spaceElementsS,
      paddingTop: spaceElementsM,
    },
    buttonWrapper: {
      flex: 1,
    },
  });

  // 渲染特性列表项
  const renderFeatureItem = (item: { title?: string; content?: string }, index: number) => {
    if (!item.content) {
      return null;
    }

    return (
      <View key={index} style={styles.featureItem}>
        <View style={styles.bulletPoint} />
        <Text style={styles.featureText}>
          {item.title && <Text style={styles.strongText}>{item.title}：</Text>}
          {item.content}
        </Text>
      </View>
    );
  };

  // 渲染章节
  const renderSection = (
    section: { title?: string; items?: { title?: string; content?: string }[] },
    index: number,
  ) => {
    if (!section.title && !section.items?.length) {
      return null;
    }

    return (
      <View key={index}>
        {section?.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
        {section?.items && section?.items?.length > 0 && (
          <View style={styles.featureList}>
            {section?.items?.map((item, itemIndex) => renderFeatureItem(item, itemIndex))}
          </View>
        )}
      </View>
    );
  };

  const handleTabPress = (tabKey: string) => {
    setActiveTabKey(tabKey);
  };

  // 获取当前tab的数据
  const currentTabData = getCurrentTabData();

  return (
    <CardContainer hasScrollView={false} width={width} maxHeight={maxHeight}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* 标题区域 */}
        {(title || titleIcon) && (
          <View style={styles.header}>
            {titleIcon && <IconFont name={titleIcon} size={sizeIconS} color={textPrimary} />}
            {title && <Text style={styles.title}>{title}</Text>}
          </View>
        )}

        {/* Tab按钮组 */}
        {tabs?.length > 0 && (
          <View style={styles.tabContainer}>
            {tabs.map(tab => (
              <View key={tab.key} style={styles.tabButton}>
                <Button
                  title={tab.label}
                  type={activeTabKey === tab.key ? 'primary' : 'secondary'}
                  size="small"
                  onPress={() => handleTabPress(tab.key)}
                />
              </View>
            ))}
          </View>
        )}

        {/* 主图片 - 根据当前tab显示 */}
        {currentTabData?.image && <AutoHeightImage source={{ uri: currentTabData.image }} style={styles.image} />}

        {/* 描述文本 - 根据当前tab显示 */}
        {currentTabData?.description && <Text style={styles.description}>{currentTabData.description}</Text>}

        {/* 章节列表 - 根据当前tab显示 */}
        {currentTabData?.sections?.map((section, index) => renderSection(section, index))}

        {/* Markdown内容 - 展示在最下面，全局内容不随tab切换 */}
        {currentTabData?.content && (
          <MarkdownRenderer noParagraphMargin style={styles.markdownContainer} content={currentTabData?.content} />
        )}
      </ScrollView>
    </CardContainer>
  );
};

export default KnowledgeTabView;
