import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import KnowledgeDoubleColumnText from './KnowledgeDoubleColumnText';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '车辆外观简介',
      description: '快速概览您车辆的八大核心系统，点击可跳转至对应功能的详细说明或设置界面。',
      image:
        'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/screenshot-20250701-154528.png',
      items: [
        { number: '1', title: '动力与传动系统' },
        { number: '2', title: '底盘与悬挂' },
        { number: '3', title: '主动安全' },
        { number: '4', title: '被动安全' },
        { number: '5', title: '信息娱乐系统' },
        { number: '6', title: '空调与环境控制' },
        { number: '7', title: '座椅与舒适性' },
        { number: '8', title: '车灯与照明' },
      ],
    },
  };
  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(propsData),
  };

  return (
    <TemplateLayoutDevelop chunkSize={100} templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <KnowledgeDoubleColumnText />
    </TemplateLayoutDevelop>
  );
};

export default App;
