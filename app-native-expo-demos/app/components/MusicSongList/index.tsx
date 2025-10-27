import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MusicSongList from './MusicSongList';

const App = () => {
  const isDevelopStreaming = false;

  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '历史播放记录',
      subtitle: '共10首歌曲',
      buttons: [
        {
          id: '1',
          deeplink: 'https://music.163.com/#/song?id=1389070',
          index: 1,
          knowledge_base: [
            {
              id: '1',
              deeplink: 'https://music.163.com/#/song?id=1389070',
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
          deeplink: 'https://music.163.com/#/song?id=1389070',
          title: '长安的荔枝 原声带',
          artist: '周深摩登兄弟刘宇宁',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_01.png',
          duration: '04:32',
          source: {
            icon: 'sourceAppleFill', // 根据原始数据中的icon-source class进行推断
            name: 'Apple Music',
          },
          active: false,
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第1首音乐',
                synonyms: ['播放周深的歌曲', '播放长安的荔枝'],
              },
            ],
          },
        },
        {
          id: '2',
          title: 'Make Yourself At Home',
          artist: 'JP Saxe',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_02.png',
          duration: '05:22',
          source: {
            icon: 'sourceSpotifyFill', // 根据原始数据中的icon-source class进行推断
            name: 'Spotify',
          },
          active: false,
          deeplink: '第2个的deeplink',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第2首音乐',
                synonyms: ['Make Yourself At Home', '播放JP Saxe'],
              },
            ],
          },
        },
        {
          id: '3',
          title: "Short n' Sweet",
          artist: 'Sabrina Carpenter',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_03.png',
          duration: '03:42',
          source: {
            icon: 'sourceYoutubeFill', // 根据原始数据中的icon-source class进行推断
            name: 'YouTube Music',
          },
          active: false,
          deeplink: '第3个的deeplink',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第3首音乐',
                synonyms: ["Short n' Sweet"],
              },
            ],
          },
        },
        {
          id: '4',
          title: 'Play',
          artist: 'Ed Sheeran',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_04.png',
          duration: '03:56',
          source: {
            icon: 'sourceMusicFill',
            name: '本地文件',
          },
          active: false,
          deeplink: '第4个的deeplink',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第4首音乐',
                synonyms: ['Play'],
              },
            ],
          },
        },
        {
          id: '5',
          title: 'The Hours: Morning',
          artist: 'Cautious Clay',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_05.png',
          duration: '03:56',
          source: {
            icon: 'sourceYoutubeFill', // 根据原始数据中的icon-source class进行推断
            name: 'YouTube Music',
          },
          active: false,
          deeplink: '第5个的deeplink',
          hotwords: {
            scenes: 'audio',
            names: [
              {
                name: '播放第5首音乐',
                synonyms: ['The Hours: Morning'],
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
      <MusicSongList />
    </TemplateLayoutDevelop>
  );
};

export default App;
