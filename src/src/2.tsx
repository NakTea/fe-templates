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
        <Text style={styles.dataText}>{customMsg}</Text>
        <TouchableOpacity style={styles.button} onPress={sendCustomMessage}>
          <Text style={styles.buttonText}>发送自定义消息</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {/* 调试信息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>调试信息</Text>
        <Text style={styles.debugText}>RNConfigModule: {RNConfigModule ? '✅ 可用' : '❌ 不可用'}</Text>
        <Text style={styles.debugText}>sendMsg: {sendMsg ? '✅ 可用' : '❌ 不可用'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  dataContainer: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dataText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#666',
  },
  messagesContainer: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 60,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  error: {
    fontSize: 14,
    marginBottom: 4,
    color: 'red',
  },
});

export default BridgeToNativeNew;

AppRegistry.registerComponent('BridgeToNativeNew', () => BridgeToNativeNew);
