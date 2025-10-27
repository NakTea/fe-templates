import KnowledgeTabView from './KnowledgeTabView';

const App = () => {
  const interviewData = {
    title: '智能车外灯照明',
    titleIcon: 'systemLightbulbFill',
    defaultTabKey: 'near',
    tabs: [
      {
        key: 'near',
        label: '近光灯',
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/2025-07-01%2017.53.28.png',
        description: '近光灯智能调节功能，会跟随方向盘的转动自动改变前照灯的照射角度，为您提供更好的夜间驾驶视野。',
        sections: [
          {
            title: '近光灯操作方法',
            items: [
              {
                content: '在中控屏进入灯光设置',
              },
              {
                content: '点击开启或关闭近光灯',
              },
              {
                title: '自动模式',
                content: '车辆会根据环境光线自动开启或关闭，无需手动干预。',
              },
              {
                title: '手动调节',
                content: '您也可以通过灯光控制杆进行手动调节。',
              },
            ],
          },
        ],
      },
      {
        key: 'far',
        label: '远光灯',
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/2025-07-01%2017.53.39.png',
        description: '远光灯提供更强的照明距离，适用于高速公路等开阔道路的夜间驾驶，请注意避免对向来车时使用。',
        sections: [
          {
            title: '远光灯使用方法',
            items: [
              {
                content: '向前推动灯光控制杆开启远光灯',
              },
              {
                content: '向后拉动灯光控制杆关闭远光灯',
              },
              {
                title: '自动切换',
                content: '配备智能远光灯的车辆会自动检测对向来车并切换。',
              },
              {
                title: '使用场景',
                content: '适用于高速公路、乡村道路等无对向来车的开阔路段。',
              },
            ],
          },
        ],
      },
      {
        key: 'steering',
        label: '方向盘',
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/2025-07-01%2017.53.46.png',
        description: '方向盘集成了多种灯光控制功能，通过方向盘上的按钮和拨杆可以方便地控制各种车灯。',
        sections: [
          {
            title: '方向盘灯光控制',
            items: [
              {
                content: '左侧拨杆控制转向灯和远近光灯',
              },
              {
                content: '右侧拨杆控制雨刷和后雾灯',
              },
              {
                title: '转向灯',
                content: '上拨开启右转向灯，下拨开启左转向灯。',
              },
              {
                title: '远近光切换',
                content: '前推开启远光灯，后拉关闭远光灯，快速拉动为闪灯功能。',
              },
            ],
          },
        ],
      },
    ],
  };

  return <KnowledgeTabView data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
