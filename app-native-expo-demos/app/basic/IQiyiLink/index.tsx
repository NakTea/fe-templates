import React from 'react';
import { View, Button, Alert, Linking, Platform } from 'react-native';

const IQiyiLinkComponent: React.FC = () => {
  const iqiyiUrl = 'qips://tvid=4825528929885500;vid=f9dd7cfcf3bd77b7c67f308df689d466;ischarge=true;vtype=0;ht=2;lt=2;';

  const openIQiyi = async (url = iqiyiUrl) => {
    try {
      // 检查是否可以打开该链接（爱奇艺是否已安装）
      // const supported = await Linking.canOpenURL(url);

      // Alert.alert('错误', supported);
      await Linking.openURL(url);

      // if (supported) {
      //   await Linking.openURL(url);
      // } else {
      //   Alert.alert('提示', '未安装爱奇艺应用，是否前往下载？', [
      //     { text: '取消', style: 'cancel' },
      //     {
      //       text: '去下载',
      //       onPress: () => openAppStore(),
      //     },
      //   ]);
      // }
    } catch (error) {
      console.error('打开爱奇艺失败:', error);
      Alert.alert('错误', '无法打开爱奇艺应用');
    }
  };

  const openAppStore = () => {
    const appStoreUrl =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/app/id393765873' // 爱奇艺 iOS App Store 链接
        : 'https://play.google.com/store/apps/details?id=com.qiyi.video'; // 爱奇艺 Google Play 链接

    Linking.openURL(appStoreUrl);
  };

  // adb shell am start -W -a android.intent.action.VIEW -d "qips://tvid=4825528929885500;vid=f9dd7cfcf3bd77b7c67f308df689d466;ischarge=true;vtype=0;ht=2;lt=2;" -c android.intent.category.BROWSABLE -c android.intent.category.DEFAULT

  return (
    <View style={{ padding: 20, gap: 16 }}>
      <Button
        title="打开爱奇艺视频"
        onPress={() => {
          openIQiyi(
            'qips://tvid=4825528929885500;vid=f9dd7cfcf3bd77b7c67f308df689d466;ischarge=true;vtype=0;ht=2;lt=2;',
          );
        }}
      />
      <Button
        title="打开爱奇艺视频2 "
        onPress={() => {
          openIQiyi('iqiyi://');
        }}
      />
      <Button
        title="打开爱奇艺视频3 "
        onPress={() => {
          openIQiyi('qips://');
        }}
      />
      <Button
        title="打开小红书"
        onPress={() => {
          openIQiyi('xhsdiscover://message/center');
        }}
      />
      <Button
        title="打开微信"
        onPress={() => {
          openIQiyi('weixin://');
        }}
      />
      <Button
        title="打开网易云音乐"
        onPress={() => {
          openIQiyi('orpheus://song?id=1413464902');
        }}
      />
      <Button
        title="打开QQ音乐"
        onPress={() => {
          openIQiyi('qqmusic://play?songid=00265Jxe3JzXOJ');
        }}
      />
      <Button
        title="打开酷狗音乐"
        onPress={() => {
          openIQiyi('kugou://play/?hash=0DBB2B56582BE6CB&mid=12345');
        }}
      />
    </View>
  );
};

export default IQiyiLinkComponent;
