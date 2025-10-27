import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherInfoMultiDay from './WeatherInfoMultiDay';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '首尔特别市',
      temp: 10,
      title: '未来三天·最低温度',
      list: [
        {
          day: '今天',
          weatherIcon: 'weatherCloudy',
          minTemp: 20,
          maxTemp: 28,
        },
        {
          day: '周三',
          weatherIcon: 'weatherRain',
          minTemp: 17,
          maxTemp: 29,
        },
        {
          day: '周四',
          weatherIcon: 'weatherThunder',
          minTemp: 20,
          maxTemp: 32,
        },
      ],
      suggestion: {
        title: '健康建议',
        description: '空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。',
      },
    },
  };

  const TemplateData = {
    isEnded: !isDevelopStreaming,
    template: '1756372567996',
    bundleData: JSON.stringify(interviewData),
  };

  return (
    <TemplateLayoutDevelop templateData={TemplateData} isDevelopStreaming={isDevelopStreaming}>
      <WeatherInfoMultiDay />
    </TemplateLayoutDevelop>
  );
};

export default App;
