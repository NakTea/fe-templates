import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import KnowledgeGuide from './KnowledgeGuide';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '设置 360°全景环视参数',
      description: '通过下方的切换按钮，您可以查看不同设置项的图文说明。',
      contents: [
        {
          image:
            'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/2025-07-01%2017.53.28.png',
          title: '启动方式',
          description: `在你好，这是 ![icon](https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/assets/img/favicon.png?x-oss-process=image/resize,w_20) 一个图片链接中控屏进入华为智驾 > 辅助驾驶 > 全景环视，可设置 360°全景环视参数。`,
        },
        {
          image:
            'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/2025-07-01%2017.53.39.png',
          title: '视图模式',
          description: '在中控屏进入华为智驾 > 辅助驾驶 > 全景环视，可设置 360°全景环视参数。',
        },
        {
          image:
            'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/car-instruction/2025-07-01%2017.53.46.png',
          title: '辅助线设置',
          description: '在中控屏进入华为智驾 > 辅助驾驶 > 全景环视，可设置 360°全景环视参数。',
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
      <KnowledgeGuide />
    </TemplateLayoutDevelop>
  );
};

export default App;
