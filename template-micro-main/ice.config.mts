import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';
import antd from '@ice/plugin-antd';
import { lessVariables } from './src/styles/variables';
console.log('process.env.PUB_ENV', process.env.PUB_ENV);

export default defineConfig(() => ({
  ssr: false,
  ssg: false,
  // codeSplitting: false,
  // splitChunks: false,
  // htmlGenerating: false,
  // hash: process.env.PUB_ENV === 'daily' ? 'contenthash' : false,
  publicPath: `https://website-name${process.env.PUB_ENV === 'daily' ? '-daily' : 'prod'}.oss-cn-shanghai.aliyuncs.com/home-micro-main-layout/`,
  cssModules: {
    localIdentName: 'main_[local][hash:8]',
  },
  routes: {
    defineRoutes: (route) => {
      route('/homepage', 'index.tsx');
    },
  },
  plugins: [
    icestark({
      type: 'framework',
    }),
    antd({
      theme: lessVariables,
    }),
    {
      setup({ onGetConfig }) {
        // Enable option `enableCopyPlugin`, so devserver can access public folder when run test.
        if (process.env.NODE_ENV === 'test') {
          onGetConfig((config) => {
            return {
              ...config,
              enableCopyPlugin: true,
            };
          });
        }
      },
    },
  ],
  proxy: {
    '/mock': {
      target: 'https://daily-www.website-name.com/',
      changeOrigin: true,
      pathRewrite: { '^/mock': '' },
    },
  },
}));
