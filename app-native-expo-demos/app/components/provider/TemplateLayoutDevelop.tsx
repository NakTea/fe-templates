import deepmerge from 'deepmerge';
import React, { ReactNode, useEffect, useState } from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { getDesignToken } from '../../design/default';
import { getLocalLanguage } from '../../local/default';
import Button from '../basic/Button';
import { useNativeListener } from '../hooks/useNativeListener';
import { FlexUIConfigProvider } from '../provider/FlexUIConfigProvider';
import { getJsonData, parseJsonString } from '../utils';

// 定义 bundleData 的接口
interface IBundleData {
  [key: string]: any; // 允许任意属性
}

// 定义 data 的接口
interface ITemplateData {
  bundleData?: IBundleData;
  [key: string]: any; // 允许其他属性
}

// 定义 TemplateLayout 组件的 Props 接口
interface ITemplateLayoutProps {
  data?: ITemplateData;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // 允许其他任意 props
}

interface ITheme {
  system?: object;
  components?: object;
}

type TConfigProvider = {
  direction?: 'ltr' | 'rtl'; // 默认为ltr，预留字段，为以后RTL兼容做准备
  locale?: object; // 语言包配置json
  localeName?: string; // 当前语言包名称，如果有locale以locale为主
  theme?: ITheme; // 设置主题JSON
  themeName?: string; // 主题包名称，如果有theme以theme为主，themeName为辅，themeName主要用于内置主题切换
};

const TemplateLayoutDevelop: React.FC<ITemplateLayoutProps> = ({
  templateData,
  getDevelopEventMessage,
  getDevelopRNMessage,
  isDevelopStreaming = false,
  chunkSize = 200,
  children,
  ...props
}) => {
  const defaultThemeName = 'dark';
  const defaultConfig: TConfigProvider = {
    direction: 'ltr',
    locale: {},
    localeName: 'zh-CN',
    theme: getDesignToken(defaultThemeName),
    themeName: defaultThemeName,
  };
  const { bundleData = '{}', traceId, isEnded, nativeData = '' } = templateData || {};
  const { messageData, setMessageData, sendMessage, removeNativeListener, RNConfigModule } = useNativeListener(traceId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataIsEnded, setDataIsEnded] = useState(isEnded);
  const [parsedData, setParsedData] = useState(isDevelopStreaming ? {} : getJsonData(bundleData));

  const [providerConfig, setProviderConfig] = useState<TConfigProvider>(defaultConfig);

  // 每次流式传输的字符数量
  const fullJsonString = bundleData;
  const handleStreamNext = () => {
    if (currentIndex < fullJsonString.length) {
      const nextIndex = Math.min(currentIndex + chunkSize, fullJsonString.length);
      const newStreamedData = fullJsonString.slice(0, nextIndex);

      setCurrentIndex(nextIndex);

      // 尝试使用 jsonrepair 解析不完整的 JSON
      try {
        const parsed = getJsonData(newStreamedData);
        setParsedData(parsed);
      } catch (error) {
        console.log('JSON 解析失败，等待更多数据...', error.message);
        // 如果解析失败，保持之前的数据
      }
    }
  };

  const isDevelopStreamComplete = currentIndex >= fullJsonString.length;
  const progress = Math.round((currentIndex / fullJsonString.length) * 100);

  // 将 data 和其他 props 透传给所有子组件
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // ...(data?.bundleData || {}),
        ...(parsedData || {}),
        ...props,
        nativeData: parseJsonString(nativeData),
        messageData,
        traceId,
        RNConfigModule,
        sendMsgToNative: sendMessage,
        removeNativeListener: removeNativeListener,
        isEnded: isDevelopStreaming && isDevelopStreamComplete ? true : dataIsEnded,
        // 保留子组件原有的 props，避免覆盖
        ...(child?.props || {}),
      });
    }
    return child;
  });

  const developBtns = (
    <View style={{ display: 'flex', gap: 10, flexDirection: 'column', paddingVertical: 10 }}>
      {isDevelopStreaming && (
        <Button
          size="small"
          style={[styles.button, isDevelopStreamComplete ? styles.buttonComplete : styles.buttonActive]}
          onPress={handleStreamNext}
          disabled={isDevelopStreamComplete}>
          {isDevelopStreamComplete ? '✓ 完成' : `接收 (${progress}%)`}
        </Button>
      )}
      {getDevelopEventMessage && (
        <Button
          size="small"
          title="触发原子能力"
          // style={{ flex: 1 }}
          onPress={() => {
            setMessageData(getDevelopEventMessage());
          }}
        />
      )}
      {getDevelopRNMessage && (
        <Button
          size="small"
          title="方法调用"
          // style={{ flex: 1 }}
          onPress={() => {
            setMessageData(getDevelopRNMessage());
          }}
        />
      )}
    </View>
  );

  useEffect(() => {
    console.log('模板数据变更-parsedData', parsedData);
    const { opts = {} } = parsedData || {};
    if (opts) {
      const {
        theme = defaultConfig?.theme,
        themeName = defaultConfig?.themeName,
        locale = defaultConfig?.locale,
        localeName = defaultConfig?.localeName,
        direction = defaultConfig?.direction,
      } = opts || {};
      const themeNameTemp = [defaultThemeName, 'light'].includes(themeName) ? themeName : defaultThemeName;
      const defaultTheme = deepmerge(getDesignToken(themeNameTemp), theme || {});
      const defaultLocale: object = deepmerge(getLocalLanguage(localeName), locale || {});
      setProviderConfig({
        direction,
        locale: defaultLocale,
        localeName,
        theme: defaultTheme,
        themeName,
      });

      if (direction === 'rtl') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
    }
  }, [parsedData]);

  useEffect(() => {
    console.log('layout-有数据更新', messageData);
    // 如果有数据更新，则更新bundleData数据
    if (messageData?.type === 'updateData') {
      setParsedData(getJsonData(messageData?.data?.bundleData));
      if (messageData?.data?.isEnded) {
        console.log('---数据加载结束', new Date());
        setDataIsEnded(true);
      }
    }
  }, [messageData]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        flexDirection: 'column',
      }}>
      <FlexUIConfigProvider {...providerConfig}>
        {childrenWithProps}
        {(getDevelopEventMessage || getDevelopRNMessage || isDevelopStreaming) && developBtns}
      </FlexUIConfigProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonActive: {
    backgroundColor: '#007bff',
  },
  buttonComplete: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TemplateLayoutDevelop;
