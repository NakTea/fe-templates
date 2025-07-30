import { useEffect, useState, useRef, useCallback } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { RNConfigModule } = NativeModules;

export function useNativeListener(id, initMsg = false) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 使用 ref 来跟踪组件是否已卸载
  const isMountedRef = useRef(true);
  const eventEmitterRef = useRef<NativeEventEmitter | null>(null);
  const subscriptionRef = useRef<any>(null);

  // 使用 useCallback 避免函数重复创建
  const sendMsg = useCallback((msgData: object, callback?: Function) => {
    if (!isMountedRef.current || !RNConfigModule?.bridgeToNative) {
      console.warn('Component unmounted or module not available');
      return;
    }

    RNConfigModule.bridgeToNative(msgData, (info: any) => {
      // 检查组件是否仍然挂载
      if (isMountedRef.current) {
        callback?.(info);
        console.log(`Created a new event with id ${info}`);
      }
    });
  }, []);

  useEffect(() => {
    // 检查原生模块是否可用
    if (!RNConfigModule) {
      console.warn('RNConfigModule is not available');
      return;
    }

    // 创建事件发射器
    eventEmitterRef.current = new NativeEventEmitter(RNConfigModule);

    // 设置监听器
    const subscription = eventEmitterRef.current.addListener(`updatedata${id}`, event => {
      // 只有在组件仍然挂载时才更新状态
      if (isMountedRef.current) {
        console.log('event - addListener', event);
        setData(event);
      }
    });
    subscriptionRef.current = subscription;

    if (id && RNConfigModule?.onListenerReady) {
      console.log('page onListenerReady');
      try {
        RNConfigModule.onListenerReady(id);
      } catch (err) {
        console.error('Error calling onListenerReady:', err);
      }
    }

    // 通知页面已经渲染
    if (initMsg && RNConfigModule?.onRNFinish) {
      console.log('page init send msg');
      try {
        RNConfigModule.onRNFinish();
      } catch (err) {
        console.error('Error calling onRNFinish:', err);
      }
    }

    // 初始化原生模块
    if (RNConfigModule?.initialize) {
      RNConfigModule.initialize()
        .then(() => {
          if (isMountedRef.current) {
            console.log('初始化成功');
          }
        })
        .catch((err: any) => {
          console.log('初始化失败', err);
        });
    }

    // 清理函数
    return () => {
      console.log('Cleaning up useNativeListener');

      // 标记组件已卸载
      isMountedRef.current = false;

      // 移除事件监听器
      if (subscriptionRef.current?.remove) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }

      // 清理事件发射器引用
      eventEmitterRef.current = null;

      // 调用原生模块的清理方法（如果存在）
      if (RNConfigModule?.cleanup) {
        try {
          RNConfigModule.cleanup();
        } catch (err) {
          console.error('Error during cleanup:', err);
        }
      }
      if (RNConfigModule?.removeListener) {
        try {
          RNConfigModule.removeListener(`updatedata${id}`);
        } catch (err) {
          console.error('Error during removeListeners:', err);
        }
      }
    };
  }, [initMsg]);

  // 组件卸载时的清理
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    data,
    error,
    sendMsg,
    eventName: `updatedata${id}`,
    RNConfigModule: RNConfigModule || null,
  };
}
