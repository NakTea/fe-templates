import TemplateLayoutDevelop from '../provider/TemplateLayoutDevelop';
import KnowledgeSolutionStepCard from './KnowledgeSolutionStepCard';

const App = () => {
  const isDevelopStreaming = false;
  const propsData = {
    opts: { width: 316, maxHeight: 344 },
    data: {
      title: '设置全景环视',
      list: [
        {
          title: '进入设置界面',
          steps: [
            {
              number: 1,
              title: '打开菜单',
              description:
                '在 **中控** 屏  ![Icon](http://fs.avatr.com/handbook/E15EV/%E9%98%BF%E7%BB%B4%E5%A1%9407-%E7%BA%AF%E7%94%B5%E7%89%88/PC-HMOS/13/app/2024/06/25/081176c5-e846-4fc1-9c98-1fc24146430e.png) > 辅助',
            },
            {
              number: 2,
              title: '或泊车界面',
              description:
                '打开倒车辅助影像的360°全景环视界面，点击右上角 ![Icon](http://fs.avatr.com/handbook/E15EV/%E9%98%BF%E7%BB%B4%E5%A1%9407-%E7%BA%AF%E7%94%B5%E7%89%88/PC-HMOS/13/app/2024/06/25/081176c5-e846-4fc1-9c98-1fc24146430e.png)，进入泊车影像设置',
            },
          ],
        },
        {
          title: '配置参数',
          steps: [
            {
              number: 1,
              title: '窄道激活影像',
              description:
                '设置灵敏度：较近、适中（默认）、较远。离开窄道后自动退出，也可手动关闭，关闭后3分钟内不再自动弹出',
            },
            {
              number: 2,
              title: '转向灯激活影像',
              description: '默认关闭，不支持智驾场景。开启后，拨动转向灯拨杆时会自动显示侧后方影像',
            },
            {
              number: 3,
              title: '车身透明度',
              description: '设置为 **低** 或 **高** 时，才可显示透明底盘信息，辅助观察路况',
            },
          ],
        },
      ],
    },
    // data: {
    //   title: '设置全景环视',
    //   list: [
    //     {
    //       title: '进入设置界面',
    //       steps: [
    //         {
    //           number: 1,
    //           title: '打开菜单',
    //           description:
    //             '在中控屏![Icon](http://fs.avatr.com/handbook/E15EV/%E9%98%BF%E7%BB%B4%E5%A1%9407-%E7%BA%AF%E7%94%B5%E7%89%88/PC-HMOS/13/app/2024/06/25/081176c5-e846-4fc1-9c98-1fc24146430e.png)辅助驾驶、全景环视',
    //         },
    //         {
    //           number: 2,
    //           title: '或泊车界面',
    //           description:
    //             '打开倒车辅助影像的360°全景环视界面，点击右上角 ![Icon](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/2807743371/p879948.png)，进入泊车影像设置',
    //         },
    //       ],
    //     },
    //     {
    //       title: '配置参数',
    //       steps: [
    //         {
    //           number: 1,
    //           title: '窄道激活影像',
    //           description:
    //             '设置灵敏度：较近、适中（默认）、较远。离开窄道后自动退出，也可手动关闭，关闭后3分钟内不再自动弹出',
    //         },
    //         {
    //           number: 2,
    //           title: '转向灯激活影像',
    //           description: '默认关闭，不支持智驾场景。开启后，拨动转向灯拨杆时会自动显示侧后方影像',
    //         },
    //         {
    //           number: 3,
    //           title: '车身透明度',
    //           description: '设置为 **低** 或 **高** 时，才可显示透明底盘信息，辅助观察路况',
    //         },
    //       ],
    //     },
    //   ],
    // },
  };
  const templateData = {
    isEnded: !isDevelopStreaming,
    traceId: '1756372567996',
    bundleData: JSON.stringify(propsData),
  };

  return (
    <TemplateLayoutDevelop chunkSize={100} templateData={templateData} isDevelopStreaming={isDevelopStreaming}>
      <KnowledgeSolutionStepCard />
    </TemplateLayoutDevelop>
  );
};

export default App;
