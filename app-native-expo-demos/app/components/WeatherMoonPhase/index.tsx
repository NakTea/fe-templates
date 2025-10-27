import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherMoonPhase from './WeatherMoonPhase';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '东京',
      date: '明天',
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/weather/moon.png',
      details: [
        {
          label: '月出',
          value: '16:47',
          active: true,
        },
        {
          label: '月落',
          value: '01:09',
          active: false,
        },
        {
          label: '下一次满月',
          value: '4天',
          active: false,
        },
      ],
      suggestion: {
        title: '观赏建议:',
        description: '月出时是观赏和拍摄月亮最佳时机，尤其是天气晴朗的夜晚。',
      },
    },
  };

  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(interviewData),
  };
  return (
    <TemplateLayoutDevelop templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <WeatherMoonPhase />
    </TemplateLayoutDevelop>
  );
};

export default App;