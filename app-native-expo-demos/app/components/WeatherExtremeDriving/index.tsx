import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import WeatherExtremeDriving from './WeatherExtremeDriving';

const App = () => {
  const isDevelopStreaming = false;
  const interviewData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      location: '上海',
      title: '台风红色预警',
      weatherIcon: 'weatherExtremeTyphoonRed',
      description: '影响时段: 10日19时 - 11日04时',
      tips: {
        type: 'error',
        message: '有强风区段在导航路径上，请尽量选择规避或绕行。',
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
      <WeatherExtremeDriving />
    </TemplateLayoutDevelop>
  );
};

export default App;
