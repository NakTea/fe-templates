import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from '../basic/AutoHeightImage';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TButton = {
  text?: string;
  type?: 'primary' | 'secondary';
  event?: any;
};

type TData = {
  image?: string;
  title?: string;
  description?: string;
  buttons?: TButton[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const PodcastEpisodeInfo: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 300, maxHeight = 376 } = opts || {};
  const { image, title, description, buttons } = data || {};

  // Token解构
  const { textTitle, textPrimary, spaceElementsXs, spaceElementsL, spaceElementsXl, cnHeadlineXsStrong, cnBodyM } =
    system || {};

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    coverImage: {
      width: '100%',
      height: 180,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    contentArea: {
      flex: 1,
    },
    contentPadding: {
      paddingBottom: spaceElementsL,
      gap: spaceElementsXs,
      flex: 1,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      marginTop: spaceElementsXs,
    },
    description: {
      ...cnBodyM,
      color: textPrimary,
      lineHeight: 20,
    },
    buttonGroup: {
      flexDirection: 'row',
      gap: spaceElementsXl,
    },
  });

  const handleButtonPress = (button: TButton) => {
    // 处理按钮事件
    if (button.event) {
      console.log('Button pressed:', button.text, button.event);
    }
  };

  const renderButton = (button: TButton, index: number) => {
    return (
      <Button
        key={index}
        title={button.text}
        type={button.type || 'primary'}
        size="medium"
        style={{ flex: 1 }}
        onPress={() => handleButtonPress(button)}
      />
    );
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 封面图片 */}
      {image && <AutoHeightImage source={{ uri: image }} style={styles.coverImage} />}

      {/* 内容区域 */}
      <View style={styles.contentArea}>
        <View style={styles.contentPadding}>
          {/* 标题 */}
          {title && (
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Text>
          )}

          {/* 描述 */}
          {description && (
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
              {description}
            </Text>
          )}
        </View>

        {/* 按钮组 */}
        {buttons && buttons.length > 0 && (
          <View style={styles.buttonGroup}>{buttons.map((button, index) => renderButton(button, index))}</View>
        )}
      </View>
    </CardContainer>
  );
};

export default PodcastEpisodeInfo;
