import React from 'react';
import { View } from 'react-native';
import StepperHorizontal from '../../components/basic/StepperHorizontal';

const App = () => {
  const props = {
    steps: [
      {
        number: 1,
        title: '步骤1标题',
        content: [
          { type: 'text', text: '步骤1的详细说明文字1' },
          { type: 'image', text: 'https://picsum.photos/400/225' },
          { type: 'text', text: '步骤1的详细说明文字2' },
          { type: 'text', text: '步骤1的详细说明文字1' },
          { type: 'image', text: 'https://picsum.photos/400/225' },
          { type: 'text', text: '步骤1的详细说明文字2' },
          { type: 'text', text: '步骤1的详细说明文字1' },
          { type: 'image', text: 'https://picsum.photos/400/225' },
          { type: 'text', text: '步骤1的详细说明文字2' },
        ],
      },
      {
        number: 2,
        title: '步骤2标题',
        content: [
          { type: 'text', text: '步骤2的详细说明文字1' },
          { type: 'image', text: 'https://picsum.photos/400/225' },
          { type: 'text', text: '步骤2的详细说明文字2' },
        ],
      },
      {
        number: 3,
        title: '步骤3标题',
        content: [
          { type: 'text', text: '步骤3的详细说明文字1' },
          { type: 'image', text: 'https://picsum.photos/400/225' },
          { type: 'text', text: '步骤3的详细说明文字2' },
          { type: 'image', text: 'https://picsum.photos/400/200' },
          { type: 'text', text: '步骤3的详细说明文字3' },
          { type: 'image', text: 'https://picsum.photos/400/400' },
        ],
      },
    ],
    activeStep: 1,
  };

  return (
    <View style={{ padding: 16 }}>
      <StepperHorizontal {...props} />
    </View>
  );
};

export default App;
