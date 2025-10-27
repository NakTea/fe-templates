import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import IconFont from './Icon';

interface Props {
  content: string;
  imageStyle?: object;
  iconSetting?: {
    size?: number;
    fill: string;
  };
  textStyle?: object;
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\/.+/.test(url);
}

const RichTextRenderer: React.FC<Props> = ({ content, imageStyle, iconSetting, textStyle }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    image: {
      width: 20,
      height: 20,
      marginHorizontal: 4,
    },
  });

  const regex = /\[\s*(ICON|IMAGE)\s*:\s*([^\]]+)\s*\]/gi;

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  let matchIndex = 0;

  while ((match = regex.exec(content)) !== null) {
    const [fullMatch, type, url] = match;
    const start = match.index;

    // 添加前面的文本
    if (start > lastIndex) {
      const text = content.slice(lastIndex, start);
      parts.push(
        <Text key={`text-${matchIndex}`} style={textStyle}>
          {text}
        </Text>,
      );
    }

    // 添加对应的元素
    if (type.toUpperCase() === 'IMAGE') {
      parts.push(
        <Image
          key={`img-${matchIndex}`}
          resizeMode="contain"
          source={{ uri: url }}
          style={[styles.image, imageStyle]}
        />,
      );
    } else if (type.toUpperCase() === 'ICON') {
      if (isHttpUrl(url)) {
        parts.push(<IconFont key={`icon-${matchIndex}`} size={16} url={url} {...iconSetting} />);
      } else {
        parts.push(<IconFont key={`icon-${matchIndex}`} name={url} size={24} {...iconSetting} />);
      }
    }

    lastIndex = regex.lastIndex;
    matchIndex++;
  }

  // 添加末尾的文本
  if (lastIndex < content.length) {
    parts.push(
      <Text key={`text-end`} style={textStyle}>
        {content.slice(lastIndex)}
      </Text>,
    );
  }

  return <View style={styles.container}>{parts}</View>;
};
export default RichTextRenderer;
