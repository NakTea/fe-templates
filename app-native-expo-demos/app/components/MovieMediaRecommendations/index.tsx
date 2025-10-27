import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MovieMediaRecommendations from './MovieMediaRecommendations';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '热门电影推荐',
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
            {
              id: '2',
              deeplink: 'https://www.douban.com/movie/subject/26380405/',
            },
            {
              id: '3',
              deeplink: 'https://www.baidu.com',
            },
            {
              id: '4',
              deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
            {
              id: '5',
              deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
            {
              id: '6',
              deeplink: 'movie/detail/2876555451',
            },
            {
              id: '7',
              deeplink: 'https://www.douban.com/movie/subject/2922512455/',
            },
            {
              id: '8',
              deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
      items: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image35_1272-495.png',
          title: '奇幻漂流',
          rating: 9.1,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第1个',
                synonyms: ['奇幻漂流'],
              },
            ],
          },
        },
        {
          id: '2',
          deeplink: 'https://www.douban.com/movie/subject/26380405/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/IamwhatIam2.jpg',
          title: '雄狮少年2',
          rating: 8.1,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第2个',
                synonyms: ['雄狮少年2'],
              },
            ],
          },
        },
        {
          id: '3',
          deeplink: 'https://www.baidu.com',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image489.png',
          title: '热辣滚烫',
          rating: 7.7,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第3个',
                synonyms: ['热辣滚烫'],
              },
            ],
          },
        },
        {
          id: '4',
          deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image475.png',
          title: '奥本海默',
          rating: 8.6,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第4个',
                synonyms: ['奥本海默'],
              },
            ],
          },
        },
        {
          id: '5',
          deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image491.png',
          title: '破地狱',
          rating: 8.2,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第5个',
                synonyms: ['破地狱'],
              },
            ],
          },
        },
        {
          id: '6',
          deeplink: 'movie/detail/2876555451',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/p2876555451.png',
          title: '纵横宇宙',
          rating: 8.5,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第6个',
                synonyms: ['纵横宇宙'],
              },
            ],
          },
        },
        {
          id: '7',
          deeplink: 'https://www.douban.com/movie/subject/2922512455/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/p2922512455.webp',
          title: '训龙高手3',
          rating: 8.2,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第7个',
                synonyms: ['训龙高手3'],
              },
            ],
          },
        },
        {
          id: '8',
          deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/v2-2.jpg',
          title: '沙丘',
          rating: 7.7,
          hotwords: {
            scenes: 'video',
            names: [
              {
                name: '播放第8个',
                synonyms: ['沙丘'],
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
      <MovieMediaRecommendations />
    </TemplateLayoutDevelop>
  );
};

export default App;
