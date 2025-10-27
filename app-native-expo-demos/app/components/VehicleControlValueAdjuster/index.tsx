import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import VehicleControlValueAdjuster from './VehicleControlValueAdjuster';

const App = () => {
  const isDevelopStreaming = false;

  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '111testTraceId111',
    bundleData: JSON.stringify({
      opts: { width: 316, maxHeight: 344 },
      data: {
        title: '空调调节',
        value: 75,
        config: {
          min: 0,
          max: 100,
          step: 5,
          unit: '%',
          icon: 'iconWindFill',
        },
        buttons: [
          {
            id: 'adjust',
            deeplink: '',
            event: {
              set: [
                {
                  type: 'vehicleControl',
                  action: 'adjustValue',
                  input: 'value: {value}',
                },
              ],
            },
          },
        ],
      },
    }),
  };

  return (
    <TemplateLayoutDevelop chunkSize={50} templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <VehicleControlValueAdjuster />
    </TemplateLayoutDevelop>
  );
};

export default App;

