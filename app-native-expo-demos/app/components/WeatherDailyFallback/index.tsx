import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherDailyFallback from './WeatherDailyFallback';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/weather/weather.jpg',
      location: '北京市',
      temp: 18,
      tempRange: '最高 24° 最低 16°',
      weatherIcon: 'weatherCloudy',
      list: [
        {
          time: '现在',
          temp: 18,
          weatherIcon: 'weatherCloudy',
          condition: '多云',
        },
        {
          time: '1点',
          temp: 17,
          weatherIcon: 'weatherCloudy',
          condition: '多云',
        },
        {
          time: '2点',
          temp: 17,
          weatherIcon: 'weatherRain',
          condition: '下雨',
        },
        {
          time: '3点',
          temp: 16,
          weatherIcon: 'weatherCloudy',
          condition: '多云',
        },
        {
          time: '4点',
          temp: 16,
          weatherIcon: 'weatherThunder',
          condition: '雷雨',
        },
        // {
        //   time: '4点',
        //   temp: 16,
        //   weatherIcon: 'weatherThunder',
        //   condition: '雷雨',
        // },
        // {
        //   time: '4点',
        //   temp: 16,
        //   weatherIcon: 'weatherThunder',
        //   condition: '雷雨',
        // },
        // {
        //   time: '4点',
        //   temp: 16,
        //   weatherIcon: 'weatherThunder',
        //   condition: '雷雨',
        // },
      ],
      suggestion: {
        title: '穿衣建议:',
        description: '避免穿着紧身衣物：紧身衣物可能会影响血液循环，使身体感到更加闷热。',
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
      <WeatherDailyFallback />
    </TemplateLayoutDevelop>
  );
};

export default App;
