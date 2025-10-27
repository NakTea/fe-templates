import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Button from '../basic/Button';
import { useNativeListener } from '../hooks/useNativeListener';
import { IEventItem } from '../index.d';
import { extractValuesByKey, fillTemplateByData } from '../utils/dataTransformer';
import MusicSongList from './MusicSongList';

const App = () => {
  const traceId = 123456;
  const { data, error, eventName, sendMsg, RNConfigModule } = useNativeListener(traceId);
  const [atomicEvents, setAtomicEvents] = useState({});
  const [eventMessage, setEventMessage] = useState<any>(null);
  const [rnMethodMessage, setRnMethodMessage] = useState<any>(null);

  const interviewData = {
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
                      name: '播放第一首音乐', // 热词
                      synonyms: ['播放周深的歌曲', '播放长安的荔枝'],
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

  const nativeData = [
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
  ];

  useEffect(() => {
    // 获取当前播放的歌单ID
    const hotwords = extractValuesByKey(interviewData, 'hotwords');
    const event = extractValuesByKey(interviewData, 'event');
    console.log(hotwords, event);

    const events = {
      get: {},
      set: {},
      listen: {},
      destroy: {},
    };
    event.forEach(item => {
      Object.keys(item).forEach(key => {
        console.log('event', key, item[key]);

        item[key] &&
          item[key].forEach((eventItem: IEventItem) => {
            if (events?.[key]) {
              events[key][eventItem.name] = eventItem;
            }
          });
      });
      console.log('events', events);
    });

    setAtomicEvents(events);

    // // 触发set事件
    // Object.values(events.set).forEach(item => {
    //   if (item.trigger === 'native') sendMsg(item);
    // });
    // Object.values(events.listen).forEach(item => {
    //   if (item.trigger === 'native') sendMsg(item);
    // });

    // return () => {
    //   // 触发destroy事件
    //   Object.values(events.destroy).forEach(item => {
    //     if (item?.trigger === 'native') sendMsg(item);
    //   });
    // };
  }, []);

  const fillDataTest = () => {
    console.log('fillTemplateByData', fillTemplateByData({ a: '$' }, 2000));
    console.log('fillTemplateByData', fillTemplateByData({ a: '$' }, { hello: 'world' }));
    console.log('fillTemplateByData', fillTemplateByData({ a: '$hello' }, { hello: 'world' }));
    console.log('fillTemplateByData', fillTemplateByData({ a: '$hello.[1]' }, { hello: ['hello', 'world'] }));
    console.log('fillTemplateByData', fillTemplateByData({ a2: '$hello.[2]' }, { hello: ['hello', 'world'] }));
    console.log('fillTemplateByData', fillTemplateByData({ a: { b: '$hello.[0]' } }, { hello: ['hello', 'world'] }));
    console.log('fillTemplateByData', fillTemplateByData([{ a: '$hello' }], { hello: 'world' }));
    console.log(
      'fillTemplateByData',
      fillTemplateByData(
        {
          data: {
            temp: '$temperature', // 当前需要动态获取的温度
          },
          success: ['$code', 200],
          error: '$message',
        },
        {
          temperature: 26,
          code: 200,
          message: '请求成功',
        },
      ),
    );
  };

  useEffect(() => {
    // fillDataTest();
  }, []);

  return (
    <div>
      <MusicSongList
        {...interviewData}
        nativeData={nativeData}
        eventMessage={eventMessage}
        rnMethodMessage={rnMethodMessage}
        traceId={traceId}
        atomicEvents={atomicEvents}
        sendMsgToNative={sendMsg}
        isEnded={true}
      />
      <View style={{ display: 'flex', gap: 10, flexDirection: 'row', paddingVertical: 10 }}>
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            setEventMessage({
              name: 'listenPlayingSongChange',
              response: {
                data: {
                  currentSong: {
                    id: String(Math.floor(Math.random() * 4) + 1),
                  },
                },
              },
            });
          }}>
          更新event
        </Button>
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            setRnMethodMessage({
              // 热词对应的事件-发消息调用RN方法
              type: 'invokeRNMethod',
              data: {
                methodName: 'handleItemButtonPress', // RN内部定义的方法。
                input: {
                  id: '123456', // 要播放的歌曲ID
                  index: 1,
                  deeplink: 'play', // play, stop
                },
              },
            });
          }}>
          调用RN方法
        </Button>
      </View>
    </div>
  );
};

export default App;
