import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherDailyAirQuality from './WeatherDailyAirQuality';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: '316px', maxHeight: '344px' },
    data: {
      location: '北京',
      date: '今天',
      aqi: {
        value: 45,
        label: '良',
      },
      suggestion: {
        title: '健康建议',
        description: '空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。',
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
      <WeatherDailyAirQuality />
    </TemplateLayoutDevelop>
  );
};

export default App;
