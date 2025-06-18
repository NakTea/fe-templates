# A new ice.js project

## Usage

```bash
$ npm install --global yarn

$ yarn

$ yarn start
```

## Directories

```md
.
├── README.md
├── ice.config.mts # The project config.
├── package.json
├── .browserslistrc # Browsers that support.
├── public # Static files.
├── src # Application source code.
│   ├── app.ts # The app entry.
│   ├── assets # Assets directory.
│   ├── document.tsx # The document entry.
│   ├── components # Components directory.
│   ├── pages # Pages directory.
│   │   ├── index.module.css # Index page style.
│   │   └── index.tsx # Index page component.
│   └── typings.d.ts # The type definition.
└── tsconfig.json
```

> Note: The resources in `public` directory will be completely copied to the `output` directory during the build phase, and the filename will not be changed.

For more detail, please visit [docs](https://v3.ice.work/).

## i18n

使用文档： https://react.i18next.com/
demo：https://github.com/i18next/react-i18next/blob/master/example/react-typescript/simple/src/App.tsx

tsx内使用

```
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
{t('common.welcome')}
```

ts内使用

```
import i18next from '@/i18n/i18next-config';

i18next.t('menu.agent.index');
```

dayjs:
https://dayjs.fenxianglu.cn/category/i18n.html#%E5%9C%A8nodejs%E4%B8%AD%E5%8A%A0%E8%BD%BD%E8%AF%AD%E8%A8%80%E9%85%8D%E7%BD%AE
https://unpkg.com/dayjs@1.11.13/locale.json

antd:
https://ant.design/docs/react/i18n-cn
https://ant.design/components/config-provider-cn#config-provider-demo-locale

## 状态管理

~~ ice store（已经弃用）： https://v3.ice.work/docs/guide/advanced/store#%E5%88%9D%E5%A7%8B%E5%8C%96-store
注意： 目录结构不可变更，页面级store只能在页面文件夹内使用，外部组件不可使用。~~

zustand：https://awesomedevin.github.io/zustand-vue/docs/introduce/start/zustand
