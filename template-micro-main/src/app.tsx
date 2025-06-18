import { defineAppConfig } from 'ice';
import { defineFrameworkConfig } from '@ice/plugin-icestark/types';
import FrameworkLayout from '@/layouts/FrameworkLayout';
import { getMicoChid } from '@/config/index';

export const icestark = defineFrameworkConfig(() => ({
  layout: FrameworkLayout,
  appRouter: {
    NotFoundComponent: <div> page 404</div>,
    // LoadingComponent: <div> this is a loading</div>,
    LoadingComponent: <div />,
    ErrorComponent: (error) => {
      const err = error?.err;
      const errStr = typeof err === 'string' ? err : err?.message;
      return <div> {errStr}</div>;
    },
    onError: (error) => {
      console.log('onError', error);
    },
  },
  getApps: () => getMicoChid(),
}));

export function pageConfig() {
  return {
    title: '工作台',
  };
}

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
  router: {
    type: 'browser',
    basename: '',
  },
}));
