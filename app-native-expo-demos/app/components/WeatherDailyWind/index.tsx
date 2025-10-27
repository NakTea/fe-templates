import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherDailyWind from './WeatherDailyWind';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '上海',
      date: '明天',
      details: [
        {
          label: '风向',
          value: '西北',
        },
        {
          label: '风速',
          value: '8.8m/s',
        },
        {
          label: '空气质量',
          value: '优',
        },
      ],
      wind: {
        direction: '西北',
        level: 5,
        unit: '级',
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
      <WeatherDailyWind />
    </TemplateLayoutDevelop>
  );
};

export default App;
