import PodcastEpisodeInfo from './PodcastEpisodeInfo';

const App = () => {
  const interviewData = {
    image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/podcast/image-7.jpg',
    title: '探索时间的本质：从爱因斯坦到黑洞',
    description:
      '在本期节目中，我们邀请了物理学家李博士，一起深入浅出地探讨相对论如何改变我们对宇宙的认知，以及黑洞背后那些引人入胜的谜团。',
    buttons: [
      {
        text: '分享',
        type: 'secondary',
        event: {},
      },
      {
        text: '播放',
        type: 'primary',
        event: {},
      },
    ],
  };

  return <PodcastEpisodeInfo data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
