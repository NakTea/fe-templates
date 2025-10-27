import React from 'react';
import { View } from 'react-native';
import Stepper from '../../components/basic/Stepper';

const StepperDemo = () => {
  const steps = [
    {
      number: 1,
      title: '基础步骤示例',
      description: '这是一个基础的步骤示例，只包含序号、标题和描述文本。',
    },
    {
      number: 2,
      title: '带图片的步骤示例',
      description: '这个步骤展示了如何添加图片，图片会自动适应容器宽度。',
      imageUrl: 'https://picsum.photos/400/200',
    },
    {
      number: 3,
      title: '自定义样式示例',
      description: '这个步骤展示了如何自定义序号、文本和图片的样式。',
      imageUrl: 'https://picsum.photos/400/200',
    },
  ];

  return (
    <View style={{ padding: 16, gap: 8 }}>
      {/* 基础用法示例 */}
      <Stepper
        step={steps[0]}
        stepperSerialNumberColor="#FFFFFF"
        stepperSerialNumberBgColor="#007AFF"
        tip={{
          position: 'bottom',
          type: 'warning',
          message: '操作成功！这是一条成功提示信息。',
        }}
      />

      {/* 带图片的步骤示例 */}
      <Stepper
        step={steps[1]}
        stepperSerialNumberColor="#FFFFFF"
        stepperSerialNumberBgColor="#34C759"
        stepperCardPictureWidth={300}
        stepperCardPictureRadius={8}
        tip={{
          position: 'top',
          type: 'success',
          message: '操作成功！这是一条成功提示信息。',
          iconSize: 18,
        }}
      />

      {/* 自定义样式示例 */}
      <Stepper
        step={steps[2]}
        stepperSerialNumberColor="#FFFFFF"
        stepperSerialNumberBgColor="#FF9500"
        stepperCardTitleColor="#333333"
        stepperCardDescColor="#666666"
        stepperCardPictureWidth={350}
        stepperCardPictureRadius={12}
        stepperElementsPadding={12}
        stepperCardPaddingBottom={24}
      />
    </View>
  );
};

export default StepperDemo;
