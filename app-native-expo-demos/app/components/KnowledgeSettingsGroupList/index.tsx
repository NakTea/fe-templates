import KnowledgeSettingsGroupList from './KnowledgeSettingsGroupList';

const App = () => {
  const interviewData = {
    title: '车辆功能归纳',
    groups: [
      {
        title: '舒适性功能',
        items: [
          {
            label: '座椅加热与通风',
            button: {
              text: '设置',
              onPress: () => console.log('设置座椅加热与通风'),
            },
          },
          {
            label: '方向盘加热',
            button: {
              text: '开启',
              onPress: () => console.log('开启方向盘加热'),
            },
          },
        ],
      },
      {
        title: '驾驶辅助',
        items: [
          {
            label: '自动远光灯',
            button: {
              text: '关闭',
              onPress: () => console.log('关闭自动远光灯'),
            },
          },
          {
            label: '盲区监测提醒',
            button: {
              text: '配置',
            },
          },
        ],
      },
      {
        title: '舒适性功能',
        items: [
          {
            label: '座椅加热与通风',
            button: {
              text: '设置',
              onPress: () => console.log('设置座椅加热与通风'),
            },
          },
          {
            label: '方向盘加热',
            button: {
              text: '开启',
              onPress: () => console.log('开启方向盘加热'),
            },
          },
        ],
      },
    ],
  };

  return <KnowledgeSettingsGroupList data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
