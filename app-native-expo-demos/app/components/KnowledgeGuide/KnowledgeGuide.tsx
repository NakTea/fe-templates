import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import AnimationFadeSlide from '../basic/AnimationFadeSlide';
import CardContainer from '../basic/CardContainer';
import MarkdownRenderer from '../basic/MarkdownRenderer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TContentData = {
  image?: string;
  title?: string;
  description?: string;
};

type TData = {
  title?: string;
  description?: string;
  contents?: TContentData[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeGuide: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, description, contents } = data || {};

  // Token解构
  const {
    textTitle,
    textSecondary,
    textPrimary,
    containerBpDefault,
    containerSecondary,
    spaceElementsXXS,
    spaceElementsXs,
    spaceElementsS,
    spaceElementsM,
    radiusInCard,
    cnHeadlineXsStrong,
    cnHeadlineXxsStrong,
    cnBodyM,
  } = system || {};

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const [screenWidth, setScreenWidth] = useState(0);

  const imageHeight = Math.round((screenWidth * 9) / 16); // 16:9比例

  // 创建样式对象
  const styles = StyleSheet.create({
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginBottom: spaceElementsXs,
    },
    headerDescription: {
      ...cnBodyM,
      color: textSecondary,
      marginBottom: spaceElementsXs,
    },
    contentBlock: {
      flex: 1,
    },
    carouselItem: {
      flex: 1,
      height: '100%',
      borderRadius: radiusInCard,
      overflow: 'hidden',
    },
    mainImage: {
      width: '100%',
      height: imageHeight,
      borderRadius: radiusInCard,
      overflow: 'hidden',
    },
    paginator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: spaceElementsS,
    },
    paginatorDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: spaceElementsXs / 2,
    },
    paginatorDotActive: {
      backgroundColor: containerBpDefault,
      transform: [{ scale: 1.25 }],
    },
    paginatorDotInactive: {
      backgroundColor: containerSecondary,
      transform: [{ scale: 1 }],
    },
    textContent: {
      justifyContent: 'center',
      minHeight: 60,
    },
    sectionTitle: {
      ...cnHeadlineXxsStrong,
      color: textPrimary,
      marginBottom: spaceElementsXXS,
    },
    description: {
      ...cnBodyM,
      color: textSecondary,
    },
    emptyText: {
      ...cnBodyM,
      color: textSecondary,
      textAlign: 'center',
      marginTop: spaceElementsM,
    },
  });

  const renderCarouselItem = ({ item }: { item: TContentData }) => {
    return (
      <View style={styles.carouselItem}>
        {item.image && <Image source={{ uri: item.image }} style={styles.mainImage} resizeMode="cover" />}
      </View>
    );
  };

  const handleDotPress = (index: number) => {
    setActiveIndex(index);
    carouselRef.current?.scrollTo({ index, animated: true });
  };

  const handleCarouselChange = (index: number) => {
    setActiveIndex(index);
  };

  const renderPaginator = () => {
    if (!contents?.length || contents.length <= 1) return <View style={styles.paginator} />;

    return (
      <AnimationFadeSlide>
        <View style={styles.paginator}>
          {contents.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginatorDot,
                index === activeIndex ? styles.paginatorDotActive : styles.paginatorDotInactive,
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>
      </AnimationFadeSlide>
    );
  };

  const renderTextContent = () => {
    const currentContent = contents?.[activeIndex];
    if (!currentContent) return null;

    return (
      <View style={styles.textContent}>
        {currentContent?.title && (
          <AnimationFadeSlide>
            <Text style={styles.sectionTitle}>{currentContent.title}</Text>
          </AnimationFadeSlide>
        )}
        {currentContent?.description && (
          <AnimationFadeSlide>
            <MarkdownRenderer style={styles.description} content={currentContent.description} />
          </AnimationFadeSlide>
        )}
      </View>
    );
  };

  if (!contents?.length) {
    return (
      <CardContainer width={width} maxHeight={maxHeight}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.headerDescription}>{description}</Text>}
      </CardContainer>
    );
  }

  const handleContainerLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    console.log('width', width);
    setScreenWidth(width);
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight}>
      {title && (
        <AnimationFadeSlide>
          <Text style={styles.title}>{title}</Text>
        </AnimationFadeSlide>
      )}
      {description && (
        <AnimationFadeSlide>
          <Text style={styles.headerDescription}>{description}</Text>
        </AnimationFadeSlide>
      )}

      <View style={styles.contentBlock} onLayout={handleContainerLayout}>
        {!!screenWidth && (
          <AnimationFadeSlide enableSlide={false}>
            <Carousel
              ref={carouselRef}
              width={screenWidth}
              height={imageHeight}
              data={contents}
              renderItem={renderCarouselItem}
              onSnapToItem={handleCarouselChange}
              loop={false}
              // 移除 parallax 模式，使用默认的 horizontal 模式
              pagingEnabled={true}
              snapEnabled={true}
              // 添加这些属性确保轮播正常工作
              autoPlay={false}
              scrollAnimationDuration={300}
            />
          </AnimationFadeSlide>
        )}

        {renderPaginator()}
        {renderTextContent()}
      </View>
    </CardContainer>
  );
};

export default KnowledgeGuide;
