import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from '../basic/AutoHeightImage';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import MarkdownRenderer from '../basic/MarkdownRenderer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  title?: string;
  titleIcon?: string; // 标题前的图标名称
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
  buttons?: {
    text?: string;
    type?: 'primary' | 'secondary';
    action?: string;
  }[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeImageTextCard: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, titleIcon, image, description, sections, content, buttons } = data || {};

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

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
    },
    scrollContainer: {
      // flex: 1,
    },
    contentContainer: {
      gap: spaceElementsM,
      paddingBottom: buttons && buttons?.length > 0 ? spaceElementsM : 0, // 为底部按钮留出空间
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spaceElementsS,
    },
    titleIcon: {
      color: textPrimary,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      flex: 1,
    },
    mainImage: {
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

  const handleOnPress = (action: string) => {
    console.log(action);
  };

  return (
    <CardContainer hasScrollView={false} width={width} maxHeight={maxHeight} style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* 标题区域 */}
        {(title || titleIcon) && (
          <View style={styles.header}>
            {titleIcon && <IconFont name={titleIcon} size={sizeIconS} style={styles.titleIcon} />}
            {title && <Text style={styles.title}>{title}</Text>}
          </View>
        )}

        {/* 主图片 */}
        {image && <AutoHeightImage source={{ uri: image }} style={styles.mainImage} />}

        {/* 描述文本 */}
        {description && <Text style={styles.description}>{description}</Text>}

        {/* 章节列表 */}
        {sections?.map((section, index) => renderSection(section, index))}

        {/* Markdown内容 - 展示在最下面 */}
        {content && <MarkdownRenderer noParagraphMargin style={styles.markdownContainer} content={content} />}
      </ScrollView>

      {/* 底部固定按钮 */}
      {buttons && buttons?.length > 0 && (
        <View style={styles.buttonsContainer}>
          {buttons?.map((button, index) => {
            if (!button.text) {
              return null;
            }

            return (
              <View key={index} style={styles.buttonWrapper}>
                <Button
                  title={button.text}
                  type={button.type || 'secondary'}
                  size="medium"
                  onPress={() => {
                    handleOnPress(button?.action);
                  }}
                />
              </View>
            );
          })}
        </View>
      )}
    </CardContainer>
  );
};

export default KnowledgeImageTextCard;
