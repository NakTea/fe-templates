import React from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MarkdownRendererProps {
  content?: string;
  style?: object;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content = '', style = {} }) => {
  // 处理Markdown内容，确保双换行符被正确解析
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

  const defaultStyles = {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: '#333',
    },
    paragraph: {
      marginVertical: 8, // 段落间距
    },
    // 确保空行被正确渲染
    hr: {
      marginVertical: 8,
    },
  };

  const markdownStyles = {
    ...defaultStyles,
    ...style,
  };

  return (
    <View>
      <Markdown style={markdownStyles}>{processContent(content)}</Markdown>
    </View>
  );
};

export default function Demo() {
  // 使用示例：

  // 1. 使用双反斜杠换行
  const Example1 = () => <MarkdownRenderer content="第一段\n\n第二段\n\n第三段" />;

  // 2. 使用模板字符串和真实换行符
  const Example2 = () => (
    <MarkdownRenderer
      content={`第一段

第二段

第三段`}
    />
  );

  // 3. 混合内容示例
  const Example3 = () => (
    <MarkdownRenderer
      content={`# 标题

这是第一段内容。
这是同一段的第二行。

这是第二段内容。

## 子标题

- 列表项1
- 列表项2

最后一段。`}
    />
  );

  // 4. 带样式的示例
  const Example4 = () => (
    <MarkdownRenderer
      content={`# 大标题

第一段文本内容。

## 二级标题

第二段文本内容。`}
      style={{
        body: {
          fontSize: 18,
          lineHeight: 26,
        },
        paragraph: {
          marginVertical: 12,
        },
        heading1: {
          fontSize: 24,
          marginBottom: 16,
        },
        heading2: {
          fontSize: 20,
          marginBottom: 12,
        },
      }}
    />
  );

  // 5. 表格示例
  const Example5 = () => (
    <MarkdownRenderer
      content={`### 表格

| 列1 | 列2 |
|-----|-----|
| 内容1 | 内容2 |

表格下方的说明文字。

更多内容...`}
    />
  );
  return (
    <View>
      <Example1 />
      <Example2 />
      <Example3 />
      <Example4 />
      <Example5 />
    </View>
  );
}
