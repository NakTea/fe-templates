import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { store } from '@ice/stark-data';

interface IUiState {
  userInfo: object;
  setUserInfo: (val: object) => void;
}

const useUserStore = create<IUiState, [['zustand/devtools', never]]>(
  devtools((set, get) => {
    const defaultInfo = {
      id: 1,
      name: 'website-name',
    };
    store.set('userInfo', defaultInfo);
    return {
      userInfo: defaultInfo,
      setUserInfo: (userInfo) => {
        set((state) => {
          const newVal = { ...(state?.userInfo || {}), ...(userInfo || {}) };
          store.set('userInfo', newVal);
          return { userInfo: newVal };
        });
      },
    };
  }),
);

store.on('userInfo', (val) => {
  // 当其他应用更新数据时，同步到本地 store
  useUserStore.setState({ userInfo: val });
});

export default useUserStore;
