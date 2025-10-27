import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MusicSimilarStyles from './MusicSimilarStyles';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/image.cover_20.png',
      title: 'In the Name of Love',
      artist: 'Martin Garrix',
      date: '2019年11月29日',
      description: '© 2019 The Weeknd XO, Inc., marketed by Republic Records, a division of UMG Recordings, Inc.',
      tags: ['电子流行', '未来贝斯', '活力', '旅游', '放松'],
      index: 1,
      knowledge_base: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
        },
      ],
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
                name: 'setPlayingSong',
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
                  scenes: 'audio', // 场景
                  names: [
                    {
                      name: '播放音乐', // 热词
                      synonyms: ['In the Name of Love'],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      itemsTitle: '相似风格推荐',
      items: [
        {
          id: '1',
          deeplink: 'https://www.douban.com/movie/subject/26311808/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_10.png',
          title: 'Save Your Tears',
          artist: 'The Weeknd',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: 'Save Your Tears',
                synonyms: ['The Weeknd'],
              },
            ],
          },
        },
        {
          id: '2',
          deeplink: 'https://music.douban.com/subject/26944605/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_08.png',
          title: 'As It Was',
          artist: 'Harry Styles',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: 'As It Was',
                synonyms: ['Harry Styles'],
              },
            ],
          },
        },
        {
          id: '3',
          deeplink: 'https://music.douban.com/subject/26943405/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_09.png',
          title: 'Midnight City',
          artist: 'M83',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: 'Midnight City',
                synonyms: ['M83'],
              },
            ],
          },
        },
        {
          id: '4',
          deeplink: 'https://music.douban.com/subject/26721705/',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_07.png',
          title: 'Less Than Zero',
          artist: 'The Weeknd',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: 'Less Than Zero',
                synonyms: ['The Weeknd'],
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
      <MusicSimilarStyles />
    </TemplateLayoutDevelop>
  );
};

export default App;
