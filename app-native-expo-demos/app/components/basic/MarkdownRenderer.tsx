import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleProp, TextStyle, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

interface MarkdownRendererProps {
  content: string;
  style?: StyleProp<TextStyle>;
  noParagraphMargin?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ style = {}, content, noParagraphMargin = false }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme;

  const { cnHeadlineXxsStrong } = system;
  // console.log('--style--', style);
  const processContent = (text: string) => {
    // 1. 将连续的\n\n转换为真实的双换行
    return (
      text
        .replace(/\\n\\n/g, '\n\n')
        // 2. 处理单个\n
        .replace(/\\n/g, '\n')
        // 3. 确保段落之间有空行
        .replace(/\n\s*\n/g, '\n\n')
    );
  };

  const MarkdownImage = ({ src }) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [width, setWidth] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      Image.getSize(
        src,
        (width, height) => {
          setAspectRatio(width / height);
          setLoading(false);
          setWidth(width);
        },
        error => {
          console.error('Failed to get image size:', error);
          setLoading(false);
        },
      );
    }, [src]);

    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <Image
        source={{ uri: src }}
        style={{
          width,
          maxWidth: '100%',
          aspectRatio: aspectRatio,
          marginHorizontal: 2,
        }}
        resizeMode="contain"
      />
    );
  };

  const rules = {
    paragraph: (node, children, parent, styles) => {
      return (
        <View
          key={node.key}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginVertical: noParagraphMargin ? 0 : 8,
          }}>
          {children}
        </View>
      );
    },
    image: node => {
      return <MarkdownImage key={node.key} src={node.attributes.src} />;
    },
  };

  return (
    <Markdown
      rules={rules}
      // imageRender={imageRender}
      style={{
        // paragraph: { marginVertical: 8 },
        paragraph: noParagraphMargin ? { marginTop: 0, marginBottom: 0 } : { marginVertical: 8 },
        body: style,
        strong: {
          fontWeight: 800,
        },
        hr: {
          marginVertical: 8,
        },
        image: {
          // 关键：移除默认的显示方式，让图片可以内联显示
          alignSelf: 'flex-start',
        },
        // 如果图片在段落中，确保段落使用 flexDirection: row
        textgroup: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        },
      }}>
      {processContent(content)}
    </Markdown>
  );
};

export default MarkdownRenderer;
