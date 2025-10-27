import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import KnowledgeFeatureList from './KnowledgeFeatureList';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '车辆说明图文',
      items: [
        {
          id: '1',
          title: '引擎关键维护',
          description: '定期检查机油、冷却液和滤清器是保持发动机最佳性能和延长其使用寿命的核心。请参照手册进行操作。',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_01.png',
        },
        {
          id: '2',
          title: '轮胎压力监控',
          description: '务必保持标准胎压，这不仅关系到行车安全，也直接影响车辆的燃油经济性与操控表现。',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_02.png',
        },
        {
          id: '3',
          title: '智能信息娱乐系统',
          description: '通过蓝牙或USB连接您的移动设备，即可访问导航、音乐和通话功能，享受无缝的数字驾驶体验。',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_03.png',
        },
        {
          id: '4',
          title: '主动安全功能',
          description: '熟悉前方碰撞预警、自动紧急制动和车道偏离辅助等系统的功能与局限，以确保行车安全。',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/drivesafe_04.png',
        },
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
      <KnowledgeFeatureList />
    </TemplateLayoutDevelop>
  );
};

export default App;
