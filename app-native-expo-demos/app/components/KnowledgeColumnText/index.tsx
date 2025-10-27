import KnowledgeColumnText from './KnowledgeColumnText';

const App = () => {
  const interviewData = {
    title: '车辆功能详解',
    description: '深入了解您车辆的各项核心功能，包含具体的操作指南和注意事项。',
    image:
      'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/screenshot-20250701-154528.png',
    items: [
      {
        number: '1',
        title: '遥控泊车辅助',
        subItems: [
          {
            content: '长按泊车按键开启遥控泊车功能，具体操作方式请参阅遥控泊车辅助章节。',
          },
        ],
      },
      {
        number: '2',
        title: '智能巡航控制',
        subItems: [
          {
            content: '可设定目标速度与前车距离，车辆将自动跟随。',
          },
        ],
      },
      {
        number: '3',
        title: '主动车道保持',
        subItems: [
          {
            content: '系统会主动修正方向，帮助车辆保持在车道中央行驶。',
          },
        ],
      },
      {
        number: '4',
        title: '前向碰撞预警',
        subItems: [
          {
            content: '在有碰撞风险时，系统会通过声音和图像发出警告。',
          },
        ],
      },
      {
        number: '5',
        title: '智能空气净化',
        subItems: [
          {
            content: '自动监测车内空气质量，并启动净化功能。',
          },
        ],
      },
      {
        number: '6',
        title: '座椅记忆',
        subItems: [
          {
            content: '可储存多组驾驶员的座椅和后视镜位置。',
          },
        ],
      },
      {
        number: '7',
        title: '行车记录仪',
        subItems: [
          {
            content: '自动录制行车影像，支持紧急事件锁定。',
          },
        ],
      },
      {
        number: '8',
        title: '自动雨刷',
        subItems: [
          {
            content: '根据雨量传感器自动调节雨刷速度。',
          },
        ],
      },
    ],
  };

  return <KnowledgeColumnText data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
