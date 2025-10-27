import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MovieCoreInfoOverview from './MovieCoreInfoOverview';

const App = () => {
  const isDevelopStreaming = false;

  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      id: '1',
      deeplink: 'https://www.douban.com/movie/subject/26311808/',
      title: '星际远航评分',
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/v2-3.jpg',
      rating: 9.6,
      labels: [
        {
          label: '导演',
          value: '克里斯托弗·诺兰',
        },
        {
          label: '主演',
          value: '马修·麦康纳 / 安妮·海瑟薇 / 杰西卡·查斯坦 / 迈克尔·凯恩',
        },
      ],
      hotwords: {
        scenes: 'video', // 场景
        names: [
          {
            name: '播放星际远航', // 热词
            synonyms: ['星际远航', '克里斯托弗·诺兰'],
          },
        ],
      },
      buttons: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          index: 1,
          knowledge_base: [
            {
              id: '1',
              deeplink: 'https://www.douban.com/movie/subject/26311808/',
            },
          ],
          event: {
            set: [
              {
                name: 'setPlayingVideo',
                trigger: 'native',
                type: 'set',
                input: {
                  // id: '$id', // 要播放的歌曲ID
                  // deeplink: '$deeplink', // play, stop
                  index: '$index',
                  knowledge_base: '$knowledge_base',
                },
                fieldMapping: {
                  data: {
                    currentId: '$data.currentSong.id',
                  },
                },
                hotwords: {
                  scenes: 'video', // 场景
                  names: [
                    {
                      name: '播放', // 热词
                      synonyms: ['播放电影'],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(propsData),
  };

  return (
    <TemplateLayoutDevelop templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <MovieCoreInfoOverview />
    </TemplateLayoutDevelop>
  );
};

export default App;
