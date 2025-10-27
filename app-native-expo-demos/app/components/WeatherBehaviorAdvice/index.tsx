import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherBehaviorAdvice from './WeatherBehaviorAdvice';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: {
      width: 316,
      maxHeight: 344,
    },
    data: {
      location: '上海市',
      title: '洗车建议',
      weatherIcon: 'weatherCloudy',
      suggestion: {
        title: '非常适宜洗车',
        description: '今明两天天气晴好，无降雨，空气质量优。',
      },
      items: [
        {
          icon: 'iconHumidityFill',
          title: '降雨概率',
          description: '0%（无降雨）',
        },
        {
          icon: 'iconWindFill',
          title: '空气质量',
          description: 'AQI：5（优）',
        },
      ],
    },
  };
  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(interviewData),
  };

  return (
    <TemplateLayoutDevelop templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <WeatherBehaviorAdvice />
    </TemplateLayoutDevelop>
  );
};

export default App;
