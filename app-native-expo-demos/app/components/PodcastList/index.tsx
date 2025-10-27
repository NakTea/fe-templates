import dayjs from 'dayjs';
import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import PodcastList from './PodcastList';

const App = () => {
  const isDevelopStreaming = false;

  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '为您推荐以下播客',
      buttons: [
        {
          id: '1',
          event: {
            set: [
              {
                name: 'setPlayingPodcast',
                trigger: 'native',
                type: 'set',
                input: {
                  episodeId: '$id',
                },
                fieldMapping: {
                  data: {
                    currentId: '$data.currentSong.id',
                  },
                },
                hotwords: {
                  scenes: 'audio',
                  names: [
                    {
                      name: '播放播客',
                      synonyms: ['播放'],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      list: [
        {
          id: '1',
          title: '012大龄单身独居趋势解析|在人生的孤岛上,光着脚种花还是阴天里写诗',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/podcast/image.cover_7.png',
          date: '今天',
          duration: '58分钟',
          album: '专辑1',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第1个播客',
                synonyms: ['012大龄单身独居趋势解析|在人生的孤岛上,光着脚种花还是阴天里写诗'],
              },
            ],
          },
        },
        {
          id: '2',
          title: 'E193和汪天凡一起畅想:未来会出现1人独角兽公司吗?',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/podcast/image.cover_8.png',
          date: dayjs().subtract(5, 'minute').valueOf(),
          duration: '130',
          album: '专辑2',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第2个播客',
                synonyms: ['E193和汪天凡一起畅想:未来会出现1人独角兽公司吗?'],
              },
            ],
          },
        },
        {
          id: '3',
          title: 'Vol.58|罗永浩「归来」:Al时代创业,要怎么「撒点野」?',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/podcast/image.cover_9.png',
          date: '1天前',
          duration: 32 * 60,
          album: '专辑3',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第3个播客',
                synonyms: ['Vol.58|罗永浩「归来」:Al时代创业,要怎么「撒点野」?'],
              },
            ],
          },
        },
        {
          id: '4',
          title: 'Vol.59|罗永浩「归来」:Al时代创业,要怎么「撒点野」?',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/podcast/image.cover_9.png',
          date: '2024-01-01T10:00:00Z',
          duration: 150 * 60,
          album: '专辑4',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第4个播客',
                synonyms: ['Vol.59|罗永浩「归来」:Al时代创业,要怎么「撒点野」?'],
              },
            ],
          },
        },
      ],
    },
  };
  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '111testTraceId111',
    bundleData: JSON.stringify(propsData),
  };

  return (
    <TemplateLayoutDevelop templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <PodcastList />
    </TemplateLayoutDevelop>
  );
};

export default App;
