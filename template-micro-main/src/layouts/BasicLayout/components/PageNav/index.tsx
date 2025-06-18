import React, { useMemo } from 'react';
import { AppLink } from '@ice/stark-app';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { asideMenuConfig } from '../../menuConfig';

export interface IMenuItem {
  name: string;
  path: string;
  icon?: string;
  children?: IMenuItem[];
}

const getMenuConfig = (menu) => {
  let tempArr = [];
  menu.map((item) => {
    const { showType, children, ...rest } = item;
    const temp = {
      ...rest,
    };
    if (showType === 'link') {
      temp.label = <AppLink to={item.key}>{item.label}</AppLink>;
    }
    if (children) temp.children = getMenuConfig(children);
    tempArr.push(temp);
  });
  return tempArr;
};

const asideMenuConfigData = getMenuConfig(asideMenuConfig);

const Navigation = (props, context) => {
  const { pathname } = props;
  const { isCollapse } = context;

  // 递归函数来查找匹配的菜单项
  const findMenuItemByPath = (items, path, keys = []) => {
    for (const item of items) {
      if (item.key && path.startsWith(item.key)) {
        const currentKeys = [...keys, item.key];
        if (item.children) {
          const result = findMenuItemByPath(item.children, path, currentKeys);
          if (result) return result;
        } else {
          return { selectedKeys: [item.key], openKeys: keys };
        }
      }
    }
    return null;
  };

  // 根据当前路径计算defaultOpenKeys和defaultSelectedKeys
  const { defaultOpenKeys, defaultSelectedKeys } = useMemo(() => {
    const result = findMenuItemByPath(asideMenuConfigData, pathname);
    return {
      defaultOpenKeys: result?.openKeys || [],
      defaultSelectedKeys: result?.selectedKeys || [],
    };
  }, [pathname]);

  // console.log('defaultOpenKeys', pathname, defaultOpenKeys, defaultSelectedKeys);

  return (
    <Menu
      mode="inline"
      // // onClick={onClick}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      style={{ height: '100%' }}
      items={asideMenuConfigData}
    />
  );
};

export default Navigation;
