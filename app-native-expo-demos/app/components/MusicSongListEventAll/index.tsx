import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import MusicSongListEventAll from './MusicSongListEventAll';

const App = () => {
  const isDevelopStreaming = false;

  const propsData = {
    opts: {
      width: '100%',
    },
    data: {
      title: '历史播放记录',
      subtitle: '共10首歌曲',
      buttons: [
        {
          icon: 'systemPlayCircle',
          activeIcon: 'systemPauseFill',
          type: 'secondary',
          text: '$currentSongId',
          deeplink: 'deeplink demo 1',
          id: '1',
          event: {
            get: [
              {
                name: 'getCurrentPlayingSong',
                trigger: 'native',
                type: 'get',
                input: {},
                fieldMapping: {
                  data: {
                    currentSongId: '$data.currentSong.id',
                    actionOpts: [
                      {
                        label: '播放',
                        value: 'play',
                      },
                      {
                        label: '停止',
                        value: 'stop',
                      },
                    ],
                  },
                },
              },
            ],
            set: [
              {
                name: 'setPlayingSong',
                trigger: 'native',
                type: 'set',
                input: {
                  songId: '$id', // 要播放的歌曲ID
                  action: '$deeplink', // play, stop
                },
                fieldMapping: {
                  data: {
                    currentSongId: '$response.data.currentSong.id',
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
            listen: [
              {
                name: 'listenPlayingSongChange',
                trigger: 'native',
                type: 'listen',
                input: { action: '$activeIcon' },
                fieldMapping: {
                  data: {
                    currentSongId: '$data.currentSong.id',
                  },
                },
              },
            ],
            destroy: [
              {
                name: 'destroyPlayingSongListener',
                trigger: 'native',
                type: 'destroy',
                input: {},
                fieldMapping: {},
              },
            ],
          },
        },
      ],
      list: [
        {
          id: '1',
          title: '长安的荔枝 原声带',
          artist: '周深摩登兄弟刘宇宁',
          image: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/music/music_cover_list_01.png',
          duration: '04:32',
          source: {
            icon: 'sourceAppleFill', // 根据原始数据中的icon-source class进行推断
            name: 'Apple Music',
          },
          active: false,
          deeplink: '第1个的deeplink',
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
    traceId: '111testTraceId111',
    nativeData: [
      {
        name: 'getCurrentPlayingSong',
        response: {
          data: {
            currentSong: {
              id: '1',
            },
          },
        },
      },
    ],
    bundleData: JSON.stringify(propsData),
  };

  const getDevelopEventMessage = () => {
    return {
      type: 'eventMessage',
      data: {
        name: 'listenPlayingSongChange',
        response: {
          data: {
            currentSong: {
              id: String(Math.floor(Math.random() * 4) + 1),
            },
          },
        },
      },
    };
  };

  const getDevelopRNMessage = () => {
    return {
      type: 'invokeRNMethod',
      data: {
        methodName: 'handleItemButtonPress', // RN内部定义的方法。
        input: {
          id: '123456', // 要播放的歌曲ID
          index: 1,
          deeplink: 'play', // play, stop
        },
      },
    };
  };

  return (
    <TemplateLayoutDevelop
      getDevelopEventMessage={getDevelopEventMessage}
      getDevelopRNMessage={getDevelopRNMessage}
      templateData={templateData}
      chunkSize={100}
      isDevelopStreaming={isDevelopStreaming}>
      <MusicSongListEventAll />
    </TemplateLayoutDevelop>
  );
};

export default App;
