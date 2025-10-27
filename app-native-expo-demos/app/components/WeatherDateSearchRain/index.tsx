import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherDateSearchRain from './WeatherDateSearchRain';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '东京',
      title: '可能迎来降雨',
      description: '主要降雨集中在 10 月 3 日至 5 日，请提前规划行程。',
      weatherIcon: 'weatherRain',
      list: [
        {
          date: '10/1 周三',
          tempRange: '25°/20°',
          condition: '多云',
          percent: 0,
          weatherIcon: 'weatherCloudy',
          active: false,
        },
        {
          date: '10/2 周四',
          tempRange: '24°/19°',
          condition: '多云',
          percent: 20,
          weatherIcon: 'weatherCloudy',
          active: false,
        },
        {
          date: '10/3 周五',
          tempRange: '22°/18°',
          condition: '中雨',
          percent: 80,
          weatherIcon: 'weatherRain',
          active: true,
        },
        {
          date: '10/4 周六',
          tempRange: '23°/19°',
          condition: '小雨',
          percent: 60,
          weatherIcon: 'weatherRain',
          active: true,
        },
        {
          date: '10/5 周日',
          tempRange: '24°/20°',
          condition: '阵雨',
          percent: 40,
          weatherIcon: 'weatherRain',
          active: true,
        },
        {
          date: '10/6 周一',
          tempRange: '26°/21°',
          condition: '多云',
          percent: 10,
          weatherIcon: 'weatherCloudy',
          active: false,
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
      <WeatherDateSearchRain />
    </TemplateLayoutDevelop>
  );
};

export default App;
