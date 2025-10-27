import React from 'react';
import { View } from 'react-native';
import VerticalDataCompare from '../../components/basic/VerticalDataCompare';

const App = () => {
  const props = {
    unit: '(u)',
    data: [
      { label: '文本1', value: 100 },
      { label: '文本2', value: 200 },
      { label: '文本3', value: 260 },
      { label: '文本4', value: 400 },
      { label: '文本5', value: 500 },
      { label: '文本6', value: 500 },
    ],
  };

  return (
    <View style={{ padding: 16 }}>
      <VerticalDataCompare {...props} />
    </View>
  );
};

export default App;
