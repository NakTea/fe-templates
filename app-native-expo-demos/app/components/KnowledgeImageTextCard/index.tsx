import KnowledgeImageTextCard from './KnowledgeImageTextCard';

const App = () => {
  const interviewData = {
    title: '车外打开机械车门',
    titleIcon: 'iconWarningSWarning', // 可选的标题图标
    image: 'https://picsum.photos/400/200',
    description:
      '车辆解锁时，您的车辆若配备电动车门，您可以使用以下方式打开或关闭电动车门功能。该功能旨在提升便利性，但在特定情况下需要您手动操作以确保安全。',
    sections: [
      {
        title: '方法',
        items: [
          {
            // title: '电动车门',
            content: '轻触门把手上的感应区域即可解锁并自动打开车门。',
          },
          {
            title: '中控屏幕',
            content: '通过中控屏幕上的"车辆"->"车门"菜单，可以独立控制每个车门的开启与关闭。',
          },
          {
            title: '手机APP',
            content: '使用官方手机应用，您可以远程遥控车门，方便您在接近车辆时提前开门。',
          },
        ],
      },
      {
        title: '注意事项',
        items: [
          {
            title: '障碍物检测',
            content: '车门在开启或关闭过程中若检测到障碍物会自动停止，请确保周围空间充足。',
          },
          {
            title: '低电量模式',
            content: '当车辆电量过低时，电动开启功能可能会被限制，届时需要使用机械钥匙手动开门。',
          },
        ],
      },
    ],
    content: `## 额外说明
这里是 **Markdown** 格式的内容，支持：
    - 列表项目 1
    - 列表项目 2
    - 列表项目 3
### 子标题
hello city`,
    buttons: [
      {
        text: '稍后再试',
        type: 'secondary',
        action: 'later',
      },
      {
        text: '立即打开',
        type: 'primary',
        action: 'open',
      },
    ],
  };

  return <KnowledgeImageTextCard data={interviewData} opts={{ width: 364, height: 376 }} />;
};

export default App;
