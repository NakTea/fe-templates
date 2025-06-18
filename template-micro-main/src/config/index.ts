import type { CompatibleAppConfig } from '@ice/stark/lib/AppRoute';

export const getMaxToken = (modelId: string) => {
  return modelId === 'gpt-4' || modelId === 'gpt-3.5-turbo-16k' ? 8000 : 4000;
};

export const LOCALE_COOKIE_NAME = 'locale';

export const getEnv = (): string => {
  // return 'daily';
  if (
    location.host.startsWith('dev.') ||
    location.host.startsWith('dev-') ||
    location.host.startsWith('daily-') ||
    location.host.startsWith('daily.')
  ) {
    return 'daily';
  }
  if (location.host.startsWith('localhost')) {
    return 'local';
  }
  return 'prod';
};

export const getOssUriPrefix = (): string => {
  const env = getEnv();
  if (env === 'local') return 'http://localhost:3333';
  if (env === 'daily') return 'https://website-name-daily.oss-cn-shanghai.aliyuncs.com/website-name-static';
  return 'https://website-name.oss-cn-shanghai.aliyuncs.com/website-name-static';
};

export const getMicoChid = (): CompatibleAppConfig[] => {
  const env = getEnv();
  // console.log('---', env);
  let uriPrefix = 'https://website-name.oss-cn-shanghai.aliyuncs.com';
  if (env === 'daily') uriPrefix = 'https://website-name-daily.oss-cn-shanghai.aliyuncs.com';
  if (env === 'local') uriPrefix = 'http://localhost';
  let config = [
    {
      path: '/user',
      loadScriptMode: 'fetch',
      entry: `${uriPrefix}${env === 'local' ? ':7020' : '/admin-micro-child-user/index.html'}`,
    },
  ];
  return config;
};
