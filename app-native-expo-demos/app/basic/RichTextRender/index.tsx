import React from 'react';
import { View } from 'react-native';
import RichTextRenderer from '../../components/basic/RichTextRenderer';

const StepperDemo = () => {
  return (
    <View style={{ padding: 16, gap: 8 }}>
      {/* 基础用法示例 */}
      <RichTextRenderer content="这是个图标[ICON: https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg]，这是图片[IMAGE: https://picsum.photos/400/200]，结束了。" />
      <RichTextRenderer content="这是个内置图标[ICON: wechat]，这是图片[IMAGE: https://picsum.photos/200/200]，结束了。" />
      <RichTextRenderer content="这是第一个内置图标[ICON: wechat]，这是第二个线上svg加载的警告图标[ICON: https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg]，这是一个不能识别的图标 [ICON:  2222] ，这是图片[IMAGE: https://picsum.photos/180/180]，结束了。" />
      <RichTextRenderer content={`• 列表一\n• 列表二\n• 列表三\n ### hello this is a test. [ICON: wechat]`} />
    </View>
  );
};

export default StepperDemo;
