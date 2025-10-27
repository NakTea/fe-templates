import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import KnowledgeDataGrid from './KnowledgeDataGrid';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '家充桩·单相功率',
      items: [
        {
          title: '用电容量',
          description: '常规数值 (默认)',
          value: '7',
          unit: 'kW',
        },
        {
          title: '输入电流',
          description: '常规数值',
          value: '32',
          unit: 'A',
        },
        {
          title: '最大输出功率',
          description: '常规数值',
          value: '11',
          unit: 'kW',
        },
        {
          title: '输入电压',
          description: '常规数值',
          value: '220',
          unit: 'V',
        },
      ],
      tips: {
        type: 'warning',
        message: '家充桩可根据 AITO 设置的用电容量，限制最大功率',
      },
    },
  };
  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(propsData),
  };

  return (
    <TemplateLayoutDevelop chunkSize={100} templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <KnowledgeDataGrid />
    </TemplateLayoutDevelop>
  );
};

export default App;
