import type { MenuProps } from 'antd';
import i18next from '@/i18n/i18next-config';

type MenuItem = Required<MenuProps>['items'][number];

const headerMenuConfig = [];

type Ichildren = null | IItem;
type IItem = {
  key: string;
  label: JSX.Element;
  children: Ichildren;
};

// const getItem = (routerLink, labelName, children: Ichildren = null) => {
//   return {
//     key: routerLink,
//     label: (<AppLink to={routerLink}>{labelName}</AppLink>),
//     children,
//   }
// }

type IMenuItem = MenuItem & {
  showType?: string;
  children?: IMenuItem[];
};

const asideMenuConfig: IMenuItem[] = [
  {
    key: '/studio/homepage',
    label: i18next.t('menu.home'),
    type: 'item',
    showType: 'link',
  },
  {
    key: '/studio/agent/',
    label: i18next.t('menu.agent.index'),
    children: [
      {
        key: '/studio/agent/bot',
        label: i18next.t('menu.agent.bot'),
        showType: 'link',
      },
      {
        key: '/studio/agent/ui',
        label: i18next.t('menu.agent.ui'),
        showType: 'link',
      },
    ],
  },
];

// const asideMenuConfig: MenuItem[] = [
//   getItem('/studio/', 'Home'),
//   {
//     key: '/admin/taskflow/',
//     label: 'Agent Flow',
//     children: [
//       getItem('/admin/taskflowaction/type', '动作类型'),
//       getItem('/admin/taskflowaction/cache', '动作缓存'),
//       getItem('/admin/taskflowaction/record', '动作记录'),
//     ],
//   },
// ];

export { headerMenuConfig, asideMenuConfig };
