import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MovieActorWorks from './MovieActorWorks';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      buttons: [
        {
          id: 'movie1',
          deeplink: 'https://movie.douban.com/subject/26721705/',
          index: 1,
          knowledge_base: [
            {
              id: 'movie1',
              deeplink: 'https://movie.douban.com/subject/26721705/',
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
      items: [{ name: '大鹏' }, { name: '白客' }],
      list: [
        {
          id: 'movie1',
          deeplink: 'https://movie.douban.com/subject/26721705/',
          title: '年会不能停！',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image35_1272-495.png',
          category: '剧情 / 喜剧',
          releaseDate: '2023.12.29 中国大陆上映',
          source: [
            {
              name: '豆瓣',
              icon: 'mediaDouban',
            },
          ],
          active: false,
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
          id: 'movie2',
          title: '热辣滚烫',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image489.png',
          category: '剧情 / 喜剧',
          releaseDate: '2024.2.10 中国大陆上映',
          source: [
            {
              name: '优酷',
              icon: 'mediaYouku',
            },
          ],
          active: true,
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
          id: 'movie3',
          title: '飞驰人生2',
          deeplink: 'https://www.youku.com/v/MzE5MjQyMzYyNg',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/movie/image475.png',
          category: '剧情 / 喜剧 / 运动',
          releaseDate: '2024.2.10 中国大陆上映',
          source: [
            {
              name: '豆瓣',
              icon: 'mediaDouban',
            },
            {
              name: '爱奇艺',
              icon: 'mediaIqiyi',
            },
            {
              name: '优酷',
              icon: 'mediaYouku',
            },
          ],
          active: false,
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
      ],
    },
  };
  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(propsData),
  };

  return (
    <TemplateLayoutDevelop chunkSize={100} templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <MovieActorWorks />
    </TemplateLayoutDevelop>
  );
};

export default App;
