import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Switch from './../../components/basic/Switch';

const SwitchExample = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={styles.container}>
      {/* 基础使用 */}
      <Switch value={isOn} onValueChange={setIsOn} />
      {/* 禁用状态 */}
      <Switch value={isOn} onValueChange={setIsOn} disabled={true} />
      {/* 自定义颜色 */}
      <Switch
        value={isOn}
        onValueChange={setIsOn}
        trackColor={{
          false: '#767577',
          true: '#81b0ff',
        }}
        thumbColor="#f5dd4b"
      />
      {/* 自定义样式 */}
      <Switch value={isOn} onValueChange={setIsOn} style={{ marginVertical: 10 }} />
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

export default SwitchExample;
