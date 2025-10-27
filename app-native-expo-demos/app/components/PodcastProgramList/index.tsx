import PodcastProgramList from './PodcastProgramList';

const App = () => {
  const interviewData = {
    defaultTabKey: 'podcast',
    tabs: [
      {
        key: 'podcast',
        label: '播客',
        list: [
          {
            id: '1',
            title: '012大龄单身独居趋势解析|在人生的孤岛上,光着脚种花还是阴天里写诗',
            duration: '58分钟',
            source: 'youtube',
            image: 'https://picsum.photos/64/64?random=1',
          },
          {
            id: '2',
            title: 'E193和汪天凡一起畅想:未来会出现1人独角兽公司吗?',
            duration: '45分钟',
            source: 'spotify',
            image: 'https://picsum.photos/64/64?random=2',
          },
          {
            id: '3',
            title: 'Vol.58|罗永浩「归来」:Al时代创业,要怎么「撒点野」?',
            duration: '32分钟',
            source: 'apple',
            image: 'https://picsum.photos/64/64?random=3',
          },
        ],
      },
      {
        key: 'news',
        label: '新闻中心',
        list: [
          {
            id: '4',
            title: 'E193和汪天凡一起畅想:未来会出现1人独角兽公司吗?',
            duration: '45分钟',
            source: 'youtube',
            image: 'https://picsum.photos/64/64?random=4',
          },
          {
            id: '5',
            title: 'Vol.58|罗永浩「归来」:Al时代创业,要怎么「撒点野」?',
            duration: '32分钟',
            source: 'netease',
            image: 'https://picsum.photos/64/64?random=5',
          },
        ],
      },
    ],
  };

  return <PodcastProgramList data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
