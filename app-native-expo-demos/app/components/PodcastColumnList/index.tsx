import PodcastColumnList from './PodcastColumnList';

const App = () => {
  const interviewData = {
    title: '播客列表',
    list: [
      {
        id: '1',
        name: 'AI 行业速报',
        description: '聚焦全球AI行业动态解析',
        image: 'https://picsum.photos/80/80?random=1',
        meta: [
          { label: '集数：', value: '30集' },
          { label: '更新：', value: '每周一' },
        ],
      },
      {
        id: '2',
        name: '五分钟读论文',
        description: '快速解读AI顶会核心论文',
        image: 'https://picsum.photos/80/80?random=2',
        meta: [
          { label: '集数：', value: '25集' },
          { label: '更新：', value: '每周三' },
        ],
      },
      {
        id: '3',
        name: '商业碰撞思想',
        description: '深度对话商业与科技前沿',
        image: 'https://picsum.photos/80/80?random=3',
        meta: [
          { label: '集数：', value: '42集' },
          { label: '更新：', value: '每周五' },
        ],
      },
      {
        id: '4',
        name: '天真不天真',
        description: '一档由史炎主理的脱口秀播客',
        image: 'https://picsum.photos/80/80?random=4',
        meta: [
          { label: '集数：', value: '18集' },
          { label: '更新：', value: '每周一' },
        ],
      },
    ],
  };

  return <PodcastColumnList data={interviewData} opts={{ width: '100%', maxHeight: 376 }} />;
};

export default App;
