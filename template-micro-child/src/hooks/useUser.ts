import { useEffect, useState } from 'react';
import { store as microStore } from '@ice/stark-data';

interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: string[];
  [key: string]: any;
}

export const useUser = () => {
  // 从 microStore 获取初始用户信息
  const [userInfo, setLocalUserInfo] = useState<UserInfo>(microStore.get('userInfo') || {});

  // 更新用户信息的方法
  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    const updatedInfo = { ...userInfo, ...newUserInfo };
    setLocalUserInfo(updatedInfo);
    microStore.set('userInfo', updatedInfo);
  };

  // 清除用户信息
  const clearUserInfo = () => {
    setLocalUserInfo({});
    microStore.set('userInfo', {});
  };

  // 监听其他应用对 userInfo 的更新
  useEffect(() => {
    const handleUserInfoChange = (newUserInfo: UserInfo) => {
      setLocalUserInfo(newUserInfo);
    };

    microStore.on('userInfo', handleUserInfoChange);

    return () => {
      microStore.off('userInfo', handleUserInfoChange);
    };
  }, []);

  return {
    userInfo,
    updateUserInfo,
    clearUserInfo,
    isLogin: Object.keys(userInfo).length > 0,
  };
};
