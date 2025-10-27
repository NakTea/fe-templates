import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tag from './../../components/basic/Tag';

const TagExample = () => {
  return (
    <View style={styles.container}>
      {/* 不同尺寸 - 展示不同字体大小 */}
      <Tag size="large" text="大标签 14px" />
      <Tag size="medium" text="中标签 12px" />
      <Tag size="small" text="小标签 12px" />

      {/* 基础用法 */}
      <Tag text="默认标签" />

      {/* 自定义颜色 */}
      <Tag size="large" text="自定义大标签" backgroundColor="#FF6B6B" textColor="#FFFFFF" />

      {/* 使用 children */}
      <Tag size="medium">
        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>自定义内容</Text>
      </Tag>

      {/* 自定义样式 */}
      <Tag
        size="large"
        text="边框标签"
        style={{
          borderWidth: 1,
          borderColor: '#317AF7',
          backgroundColor: 'transparent',
        }}
        textStyle={{
          color: '#317AF7',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
});

export default TagExample;
