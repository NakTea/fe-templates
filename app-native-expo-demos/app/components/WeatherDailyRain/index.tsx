import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherDailyRain from './WeatherDailyRain';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '东京',
      date: '明天',
      percent: 90,
      condition: '有强降雨',
      chartData: {
        x: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        y: [30, 50, 80, 90, 85, 70, 60, 40],
        highlight: ['09:00'],
      },
      suggestion: {
        title: '出行建议:',
        description: '明天将有持续降雨，请务必携带雨具，并注意交通安全。',
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
      <WeatherDailyRain />
    </TemplateLayoutDevelop>
  );
};

export default App;
