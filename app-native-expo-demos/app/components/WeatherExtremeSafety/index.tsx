import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherExtremeSafety from './WeatherExtremeSafety';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '上海',
      weatherIcon: 'weatherExtremeLightingRed',
      title: '雷电红色预警',
      chartData: {
        x: ['19:00', '21:00', '23:00', '01:00', '03:00'],
        y: [15, 25, 40, 35, 20],
        unit: 'mm',
        highlight: ['23:00'],
      },
      tips: {
        type: 'error',
        message: '将有强降雨和雷电，请避免在低洼、树下或广告牌下停车。',
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
      <WeatherExtremeSafety />
    </TemplateLayoutDevelop>
  );
};

export default App;
