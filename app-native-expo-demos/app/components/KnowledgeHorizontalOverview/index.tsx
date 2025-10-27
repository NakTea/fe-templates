import KnowledgeHorizontalOverview from './KnowledgeHorizontalOverview';

const App = () => {
  const interviewData = {
    title: '车辆核心功能',
    description: '快速了解您爱车的核心功能模块，滑动浏览各项功能的详细介绍与设置入口。',
    items: [
      {
        title: '动力系统',
        description: '2.0T涡轮增压发动机，提供强劲的动力输出与多种驾驶模式选择。',
        image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_01.png',
      },
      {
        title: '智能座舱',
        description: '集成12.3英寸中控大屏，支持语音控制与在线娱乐功能。',
        image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_02.png',
      },
      {
        title: '自动空调',
        description: '配备PM2.5过滤系统，自动调节温度与风量，保持车内空气清新。',
        image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_03.png',
      },
      {
        title: '主动安全',
        description: '包含前方碰撞预警、车道保持辅助等多种驾驶辅助功能。',
        image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_04.png',
      },
    ],
  };

  return <KnowledgeHorizontalOverview data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
