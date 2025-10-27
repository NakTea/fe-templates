import KnowledgeImageTextTable from './KnowledgeImageTextTable';

const App = () => {
  const interviewData = {
    title: 'NCA 图标含义',
    tableKey: 'icon',
    columns: [
      {
        title: '图标',
        dataIndex: 'icon',
        type: 'image',
        width: 60,
        imageStyle: { width: 32, height: 32 },
      },
      { title: '状态', dataIndex: 'status' },
      { title: '含义', dataIndex: 'meaning' },
      { title: '说明', dataIndex: 'description' },
    ],
    dataSource: [
      {
        id: 1,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_01.png',
        status: '点亮',
        meaning: 'NCA 可用',
        description: '满足 NCA条件时显示',
      },
      {
        id: 2,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_02.png',
        status: '闪烁',
        meaning: 'NCA 已暂停',
        description: '人工干预或接管',
      },
      {
        id: 3,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_03.png',
        status: '点亮',
        meaning: 'NCA 已激活',
        description: '—',
      },
      {
        id: 4,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_04.png',
        status: '闪烁',
        meaning: '智能限速开启',
        description: '智能限速',
      },
      {
        id: 5,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_01.png',
        status: '点亮',
        meaning: 'NCA 可用',
        description: '满足 NCA条件时显示',
      },
      {
        id: 6,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_02.png',
        status: '闪烁',
        meaning: 'NCA 已暂停',
        description: '人工干预或接管',
      },
      {
        id: 7,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_03.png',
        status: '点亮',
        meaning: 'NCA 已激活',
        description: '—',
      },
      {
        id: 8,
        icon: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/icons/Icon_NCA_04.png',
        status: '闪烁',
        meaning: '智能限速开启',
        description: '智能限速',
      },
    ],
  };

  return <KnowledgeImageTextTable data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
