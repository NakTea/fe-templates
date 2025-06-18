import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';
import { name } from './package.json';

export default defineConfig(() => ({
  ssr: false,
  ssg: false,
  // codeSplitting: 'page',
  devPublicPath: 'http://localhost:7020/',
  publicPath: `https://website-name-${process.env.PUB_ENV === 'daily' ? '-daily' : 'prod'}.oss-cn-shanghai.aliyuncs.com/${name}/`,
  hash: process.env.PUB_ENV === 'daily' ? 'contenthash' : false,
  cssModules: {
    localIdentName: 'agent_[path][local][hash:8]',
  },
  plugins: [
    icestark({
      type: 'child',
    }),
  ],
  routes: {
    ignoreFiles: ['**/models/**', '**/components/**'],
  },
  proxy: {
    '/mock': {
      target: 'https://daily-www.website-name.com/',
      changeOrigin: true,
      pathRewrite: { '^/mock': '' },
    },
  },
}));
