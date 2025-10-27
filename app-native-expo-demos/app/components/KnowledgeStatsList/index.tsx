import KnowledgeStatsList from './KnowledgeStatsList';

const App = () => {
  const interviewData = {
    title: '车辆性能参数',
    list: [
      {
        label: '综合续航里程 (CLTC)',
        value: '1200',
        unit: 'km',
      },
      {
        label: '百公里电耗',
        value: '15.5',
        unit: 'kWh',
      },
      {
        label: '最高车速',
        value: '250',
        unit: 'km/h',
      },
      {
        label: '快充时间 (10-80%)',
        value: '25',
        unit: 'min',
      },
      {
        label: '电池容量',
        value: '150',
        unit: 'kWh',
      },
    ],
  };

  return <KnowledgeStatsList data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
