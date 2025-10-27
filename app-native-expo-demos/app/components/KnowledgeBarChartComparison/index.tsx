import KnowledgeBarChartComparison from './KnowledgeBarChartComparison';

const App = () => {
  const interviewData = {
    title: '能耗参数-纯电动模式下续航里程',
    bars: [
      {
        value: '175km',
        height: 109,
        title: '21寸',
        labels: ['SKE6520S', 'SHEVAS'],
      },
      {
        value: '167km',
        height: 104,
        title: '22寸',
        labels: ['SKE6520S', 'SHEVA1S'],
      },
      {
        value: '225km',
        height: 140,
        title: '21寸',
        labels: ['SKE6520S', 'SHEVA2S'],
      },
      {
        value: '215km',
        height: 134,
        title: '22寸',
        labels: ['SKE6520S', 'SHEVA2S'],
      },
    ],
  };

  return <KnowledgeBarChartComparison data={interviewData} opts={{ width: 360, maxHeight: 363 }} />;
};

export default App;
