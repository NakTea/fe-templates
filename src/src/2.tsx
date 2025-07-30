import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, AppRegistry } from 'react-native';
import { useNativeListener } from '../components/hooks/useNativeListener';
import { getJsonData } from '../components/utils/index';

interface BridgeToNativeProps {
  // 初始化props数据
  data?: {
    title?: string;
    rating?: number;
    content?: Array<{ label: string; value: string }>;
    posterUrl?: string;
  };
  opts?: {
    imageWidth?: number;
    imageHeight?: number;
  };
  // Native通信相关
  RNConfigModule?: any;
  sendMsg?: (data: any) => void;
}

const BridgeToNativeNew: React.FC<BridgeToNativeProps> = (props: any) => {
  console.log('BridgeToNativeNew props:', props);
  const [propsData, setPropsData] = useState(getJsonData(props?.bundleData));
  const { data, error, eventName, sendMsg, RNConfigModule } = useNativeListener(props?.id);

  const [bridgeName, setBridgeName] = useState('');
  const [bridgeMsg, setBridgeMsg] = useState('');
  const [customMsg, setCustomMsg] = useState('');

  useEffect(() => {
    // 通知Native RN初始化完毕
    if (RNConfigModule) {
      RNConfigModule.onRNFinish();
    }
  }, [RNConfigModule]);

  useEffect(() => {
    if (props?.bundleData) {
      setPropsData(getJsonData(props?.bundleData));
    }
  }, [props]);

  useEffect(() => {
    console.log('data变更了:', data);
  }, [data]);

  // 发送消息给Native (bridgeToNative)
  const sendBridgeMessage = () => {
    if (!RNConfigModule) {
      Alert.alert('错误', 'RNConfigModule 未初始化');
      return;
    }

    if (!bridgeName.trim()) {
      Alert.alert('提示', '请输入消息名称');
      return;
    }

    const messageData = {
      type: 'bridgeToNative',
      name: bridgeName,
      timestamp: new Date().toISOString(),
    };

    setBridgeMsg(JSON.stringify(messageData));

    RNConfigModule?.bridgeToNative(messageData, (response: string) => {
      console.log('Bridge Response:', response);
      Alert.alert('Bridge响应', `Native返回: ${response}`);
      setBridgeName('');
    });
  };

  // 使用sendMsg发送消息（如果有的话）
  const sendCustomMessage = () => {
    if (sendMsg) {
      const customData = {
        type: 'custom',
        message: '自定义消息',
        timestamp: new Date().toISOString(),
      };
      setCustomMsg(JSON.stringify(customData));
      sendMsg(customData, (response: string) => {
        console.log('Bridge Response:', response);
        Alert.alert('Bridge响应', `Native返回: ${response}`);
      });
      Alert.alert('消息已发送', '自定义消息已通过sendMsg发送');
    } else {
      Alert.alert('提示', 'sendMsg方法不可用');
    }
  };

  // 发送消息给Native (createCalendarEvent)
  const sendCalendarEvent = () => {
    if (!RNConfigModule) {
      Alert.alert('错误', 'RNConfigModule 未初始化');
      return;
    }

    RNConfigModule?.createCalendarEvent('image', '上海', (response: any) => {
      console.log('Calendar Event Response:', response);
      Alert.alert('成功', `Native返回: ${response}`);
    });
  };

  useEffect(() => {
    console.log('eventName:3', eventName);
    return () => {
      if (eventName && RNConfigModule) {
        RNConfigModule?.removeListener(eventName);
      }
    };
  }, [eventName]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>BridgeToNative 组件</Text>

      {/* 显示初始化props数据 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>初始化数据 (Props)</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{JSON.stringify(props)}</Text>
        </View>
      </View>

      {/* 显示初始化props数据解析结果 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>初始化数据解析结果 (Props)</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{JSON.stringify(propsData, null, 2)}</Text>
        </View>
      </View>

      {/* 显示Native发送的消息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>接收到的Native消息</Text>
        <View style={styles.messagesContainer}>
          <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>调用createCalendarEvent</Text>
        <TouchableOpacity style={styles.button} onPress={sendCalendarEvent}>
          <Text style={styles.buttonText}>验证接收消息</Text>
        </TouchableOpacity>
      </View>

      {/* 发送Bridge消息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>发送Bridge消息</Text>
        <Text style={styles.dataText}>{bridgeMsg}</Text>
        <TextInput style={styles.input} placeholder="输入消息信息" value={bridgeName} onChangeText={setBridgeName} />
        <TouchableOpacity style={styles.button} onPress={sendBridgeMessage}>
          <Text style={styles.buttonText}>发送Bridge消息 (sendMsg)</Text>
        </TouchableOpacity>
      </View>

      {/* 发送自定义消息 */}
      <View style={styles.section}>
        <Text style={styles.dataText}>{cust
