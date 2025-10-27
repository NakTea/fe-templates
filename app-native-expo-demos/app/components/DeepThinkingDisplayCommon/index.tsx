import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import DeepThinkingDisplayCommon from './DeepThinkingDisplayCommon';

const App = () => {
  const isDevelopStreaming = false;

  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '111testTraceId111',
    bundleData: JSON.stringify({
      opts: {
        width: 288,
        maxHeight: 120,
      },
      data: {
        steps: [
          {
            type: 'analysis',
            text: '我已经收到用户的需求，正在锁定相关的相似风格信息。',
          },
          {
            type: 'categorization',
            text: '我会提取当前歌曲的核心标签。',
          },
          {
            type: 'integration',
            text: '然后在资料库中寻找相近的候选曲目。',
          },
          {
            type: 'filtering',
            text: '数量过多时，我会做一次筛选和聚类。',
          },
          {
            type: 'calibration',
            text: '保留相似的同时，也加入一些差异曲。',
          },
          {
            type: 'confirmation',
            text: '最终整理为横滑卡片，供用户浏览。',
          },
        ],
      },
    }),
  };

  return (
    <TemplateLayoutDevelop templateData={templateData} chunkSize={100} isDevelopStreaming={isDevelopStreaming}>
      <DeepThinkingDisplayCommon />
    </TemplateLayoutDevelop>
  );
};

export default App;
