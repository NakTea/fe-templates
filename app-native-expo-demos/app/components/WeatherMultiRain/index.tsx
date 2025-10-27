import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherMultiRain from './WeatherMultiRain';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '东京',
      weatherIcon: 'weatherRain',
      title: '有小雨',
      chartData: {
        x: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        y: [10, 5, 20, 60, 80, 40, 10],
        highlight: ['周四', '周五'],
      },
      message: '分析：本周大部分时间天气晴好，但周四、周五受短波槽影响，降水概率显著增高，请注意携带雨具。',
    },
  };

  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(interviewData),
  };
  return (
    <TemplateLayoutDevelop templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <WeatherMultiRain />
    </TemplateLayoutDevelop>
  );
};

export default App;
