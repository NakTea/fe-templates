import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MusicFeaturedAlbums from './MusicFeaturedAlbums';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: 'Lorde',
      description: '艾拉·玛莉亚',
      image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/profiles/person_cover_02.jpg',
      itemsTitle: '代表专辑',
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
                  knowledge_base: '$knowledge_base',
                  index: '$index',
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
                      name: '播放专辑', // 热词
                      synonyms: ['Virgin'],
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
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_07.png',
          title: 'Virgin',
          labels: ['10首', '2023年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第1张专辑',
                synonyms: ['Virgin'],
              },
            ],
          },
        },
        {
          id: '2',
          deeplink: 'https://www.hojomusic.com/album/2',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_08.png',
          title: 'Solar Power',
          labels: ['12首', '2021年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第2张专辑',
                synonyms: ['Solar Power'],
              },
            ],
          },
        },
        {
          id: '3',
          deeplink: 'https://www.hojomusic.com/album/solar-power',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_09.png',
          title: 'Melodrama',
          labels: ['11首', '2017年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第3张专辑',
                synonyms: ['Melodrama'],
              },
            ],
          },
        },
        {
          id: '4',
          deeplink: 'https://www.hojomusic.com/album/4',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_10.png',
          title: 'Pure Heroine',
          labels: ['10首', '2013年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第4张专辑',
                synonyms: ['Pure Heroine'],
              },
            ],
          },
        },
        {
          id: '5',
          deeplink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_06.png',
          title: 'Tennis Court',
          labels: ['4首', '2013年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第5张专辑',
                synonyms: ['Tennis Court'],
              },
            ],
          },
        },
        {
          id: '6',
          deeplink: 'https://music.163.com/#/album?id=6',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_07.png',
          title: 'Glory and Gore',
          labels: ['1首', '2013年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第6张专辑',
                synonyms: ['Glory and Gore'],
              },
            ],
          },
        },
        {
          id: '7',
          deeplink: 'https://music.163.com/#/album?id=7',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_08.png',
          title: 'Ribs',
          labels: ['1首', '2013年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第7张专辑',
                synonyms: ['Ribs'],
              },
            ],
          },
        },
        {
          id: '8',
          deeplink: 'https://www.hojomusic.com/album/a-world-alone',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_09.png',
          title: 'A World Alone',
          labels: ['1首', '2013年'],
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第8张专辑',
                synonyms: ['A World Alone'],
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
      <MusicFeaturedAlbums />
    </TemplateLayoutDevelop>
  );
};

export default App;
