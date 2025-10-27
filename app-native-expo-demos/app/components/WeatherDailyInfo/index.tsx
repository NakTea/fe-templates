import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherDailyInfo from './WeatherDailyInfo';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/weather/weather.jpg',
      location: '日本',
      title: '实时天气',
      temp: 31,
      tempRange: '24°~16°',
      condition: '多云',
      weatherIcon: 'weatherCloudy',
      list: [
        {
          icon: 'iconWindFill',
          label: '风力',
          value: '8 mph 西南风',
        },
        {
          icon: 'iconHumidityFill',
          label: '湿度',
          value: '47%',
        },
        {
          icon: 'iconUvFill',
          label: '紫外线指数',
          value: '1 (低)',
        },
        {
          icon: 'iconTshirtFill',
          label: '穿衣建议',
          value: '短袖',
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
      <WeatherDailyInfo />
    </TemplateLayoutDevelop>
  );
};

export default App;
