import KnowledgeHorizontalSetupStepper from './KnowledgeHorizontalSetupStepper';

const App = () => {
  const interviewData = {
    title: '抬头显示系统 (HUD)',
    activeBtnTextPrefix: '步骤',
    activeStep: 1,
    steps: [
      {
        number: 1,
        title: '调节显示亮度和高度',
        contents: [
          {
            type: 'text',
            text: '在中央触摸屏上，选择"控制" > "显示"。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_08.png',
          },
          {
            type: 'text',
            text: '使用"抬头显示"设置，拖动滑块来调整亮度，并选择三种预设高度之一以获得最佳视角。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_06.png',
          },
        ],
      },
      {
        number: 2,
        title: '设置显示信息',
        contents: [
          {
            type: 'text',
            text: '选择要在抬头显示中显示的信息类型。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_08.png',
          },
        ],
      },
      {
        number: 3,
        title: '完成配置',
        contents: [
          {
            type: 'text',
            text: '确认所有设置后，系统将自动保存配置。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_06.png',
          },
        ],
      },
      {
        number: 4,
        title: '测试功能',
        contents: [
          {
            type: 'text',
            text: '启动车辆，测试抬头显示功能是否正常工作。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_08.png',
          },
        ],
      },
      {
        number: 5,
        title: '调整优化',
        contents: [
          {
            type: 'text',
            text: '根据实际使用情况，进一步调整显示设置以获得最佳体验。',
          },
          {
            type: 'image',
            text: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_06.png',
          },
        ],
      },
    ],
  };

  return <KnowledgeHorizontalSetupStepper data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
