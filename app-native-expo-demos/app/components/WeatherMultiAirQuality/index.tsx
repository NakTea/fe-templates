import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherMultiAirQuality from './WeatherMultiAirQuality';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '北京',
      title: '未来五日',
      aqi: {
        value: 85,
        label: '良',
      },
      list: [
        { date: '今天', weatherIcon: 'weatherCloudy', label: '良', active: true },
        { date: '周三', weatherIcon: 'weatherRain', label: '优', active: false },
        { date: '周四', weatherIcon: 'weatherRain', label: '轻度', active: false },
        { date: '周五', weatherIcon: 'weatherThunder', label: '中度', active: false },
        { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
        // { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
        // { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
        // { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
        // { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
        // { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
        // { date: '周六', weatherIcon: 'weatherCloudy', label: '良', active: false },
      ],
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
      <WeatherMultiAirQuality />
    </TemplateLayoutDevelop>
  );
};

export default App;
