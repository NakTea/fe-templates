import { defineAppConfig } from 'ice';
import { setLibraryName } from '@ice/stark-app';
import { defineChildConfig } from '@ice/plugin-icestark/types';

setLibraryName('ice-antd-child');

export const icestark = defineChildConfig(() => {
  return {
    mount: (props) => {
      console.log('mount', props);
    },
    unmount: () => {
      console.log('unmount');
    },
  };
});

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
  router: {
    type: 'browser',
  },
}));
