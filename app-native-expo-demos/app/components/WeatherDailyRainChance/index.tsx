import WeatherDailyRainChance from './WeatherDailyRainChance';

const App = () => {
  const data = {
    data: {
      location: '北京市朝阳区',
      description: '周四的降水概率：50%',
      chartData: {
        x: ['上午12时', '上午6时', '下午12时', '下午6时'],
        y: [5, 8, 12, 20],
      },
      message: '每日的降水概率往往比每小时的概率更高',
    },
    opts: {
      width: 400,
      maxHeight: 350,
    },
  };

  return <WeatherDailyRainChance {...data} />;
};

export default App;
