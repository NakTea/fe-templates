import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { RNConfigModule } = NativeModules;

export interface IMessageData {
  type: string;
  data: object;
}

export function useNativeListener(id: string | number, initMsg = false) {
  const [messageData, setMessageData] = useState<IMessageData>();
  const [bridgeError, setBridgeError] = useState(null);

  // 使用 ref 来跟踪组件是否已卸载
  const isMountedRef = useRef(true);
  const eventEmitterRef = useRef<NativeEventEmitter | null>(null);
  const subscriptionRef = useRef<any>(null);

  // 使用 useCallback 避免函数重复创建
  const sendMessage = useCallback((msgData: object, callback?: Function) => {
    const newMsg = { traceId: id, ...msgData };
    console.log('RN交互-sendMessage', newMsg);
    if (!isMountedRef.current || !RNConfigModule?.bridgeToNative) {
      console.warn('RNConfigModule不存在');
      return;
    }

    RNConfigModule.bridgeToNative(newMsg, (info: any) => {
      // 检查组件是否仍然挂载
      if (isMountedRef.current) {
        callback?.(info);
        console.log(`RN交互-bridgeToNative id: ${id},info: ${info}`);
      }
    });
  }, []);

  // 卸载时使用方清理
  const removeNativeListener = () => {
    console.log('清理监听-Cleaning up useNativeListener');

    // 调用原生模块的清理方法（如果存在）
    if (RNConfigModule?.removeListener) {
      try {
        RNConfigModule.removeListener(`${id}`);
      } catch (err) {
        console.error('调用失败removeListeners:', err);
      }
    }

    // 标记组件已卸载
    isMountedRef.current = false;
    // 清理事件发射器引用
    eventEmitterRef.current = null;
  };

  useEffect(() => {
    // 检查原生模块是否可用
    if (!RNConfigModule) {
      console.warn('RNConfigModule不可用');
      return;
    }

    // 创建事件发射器
    eventEmitterRef.current = new NativeEventEmitter(RNConfigModule);

    // 设置监听器
    const subscription = eventEmitterRef.current.addListener(`updateData${id}`, newData => {
      // 只有在组件仍然挂载时才更新状态
      if (isMountedRef.current) {
        console.log('RN交互-addListener', newData);
        setMessageData(newData);
      }
    });
    subscriptionRef.current = subscription;

    if (id && RNConfigModule?.onListenerReady) {
      console.log('RN交互-page onListenerReady');
      try {
        RNConfigModule.onListenerReady(id);
      } catch (err) {
        console.error('调用失败onListenerReady:', err);
      }
    }

    // 通知Native监听完毕
    if (initMsg && RNConfigModule?.onRNFinish) {
      console.log('通知Native监听完毕-page init send msg');
      try {
        RNConfigModule.onRNFinish();
      } catch (err) {
        console.error('调用失败onRNFinish:', err);
      }
    }

    // 初始化原生模块
    if (RNConfigModule?.initialize) {
      RNConfigModule.initialize()
        .then(() => {
          if (isMountedRef.current) {
            console.log('Native Bridge 初始化成功');
          }
        })
        .catch((err: any) => {
          setBridgeError(err);
          console.log('Native Bridge 初始化失败', err);
        });
    }

    // 清理函数，不在这里清理了，谁使用谁清理
    // return () => {
    //   console.log('Cleaning up useNativeListener');

    //   // 调用原生模块的清理方法（如果存在）
    //   if (RNConfigModule?.removeListener) {
    //     try {
    //       RNConfigModule.removeListener(`${id}`);
    //     } catch (err) {
    //       console.error('调用失败removeListeners:', err);
    //     }
    //   }

    //   // 标记组件已卸载
    //   isMountedRef.current = false;
    //   // 清理事件发射器引用
    //   eventEmitterRef.current = null;
    // };
  }, [initMsg, id]);

  // 组件卸载时的清理
  useEffect(() => {
    // return () => {
    //   isMountedRef.current = false;
    // };
  }, []);

  return {
    messageData,
    bridgeError,
    sendMessage,
    setMessageData,
    removeNativeListener,
    eventName: `updateData${id}`,
    RNConfigModule: RNConfigModule || null,
  };
}
