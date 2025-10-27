// https://www.npmjs.com/package/@react-native-community/blur
import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

export default function Menu() {
  return (
    <View style={styles.container}>
      {/* <Image
        key={'blurryImage'}
        source={{
          uri: 'https://hojo-website-prod.oss-cn-shanghai.aliyuncs.com/hojo-static/assets/img/homepage/about-2.png',
        }}
        style={{
          ...styles.absolute,
          width: 750,
          height: 500,
        }}
      /> */}
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      <Text>Hi, I am some blurred text</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView style={styles.absolute} blurType="dark" blurAmount={2} reducedTransparencyFallbackColor="dark" />
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
