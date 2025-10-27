import KnowledgeVerticalStepGuide from './KnowledgeVerticalStepGuide';

const App = () => {
  const interviewData = {
    title: '自动泊车指引',
    steps: [
      {
        number: 1,
        title: '寻找可用车位',
        description: '车辆将自动扫描周围环境，并在中控屏上显示识别到的可用车位，请选择一个目标车位。',
        image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_08.png',
      },
      {
        number: 2,
        title: '启动并监控泊车过程',
        description: '确认选择后，点击"开始泊车"并保持警惕。车辆将自动完成转向、加速和制动，直到完全停入车位。',
        image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_06.png',
        tip: {
          position: 'bottom',
          title: '安全提示',
          type: 'warning',
          message:
            '**危险**：泊车过程中请务必保持对周围环境的观察，特别是注意行人或突然出现的障碍物，并随时准备接管车辆。',
          iconSize: 16,
        },
      },
    ],
    tip: {
      position: 'bottom',
      type: 'info',
      message: '请在安全环境下使用自动泊车功能',
      iconSize: 16,
    },
  };

  return <KnowledgeVerticalStepGuide data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
