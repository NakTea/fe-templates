# VerticalDataCompare 垂直数据对比组件

用于展示数据的垂直柱状对比图，支持显示数值、单位、标签，柱体顶部可选显示圆点。

## 功能特性

- 支持自动计算数据比例
- 支持显示数值和单位
- 支持自定义最大值和最大高度
- 柱体顶部可配置圆点显示
- 样式完全可自定义
- 支持主题定制

## API

### Props

| 参数      | 说明                           | 类型         | 默认值                              |
| --------- | ------------------------------ | ------------ | ----------------------------------- |
| data      | 数据项数组                     | `DataItem[]` | 必填                                |
| maxValue  | 最大值，不设置则取数据中最大值 | `number`     | -                                   |
| maxHeight | 最大展示高度                   | `number`     | 180                                 |
| unit      | 数值单位                       | `string`     | ''                                  |
| lineColor | 柱体颜色                       | `string`     | theme.verticalDataCompare.lineColor |
| lineWidth | 柱体宽度                       | `number`     | theme.verticalDataCompare.lineWidth |
| dotSize   | 圆点大小                       | `number`     | theme.verticalDataCompare.dotSize   |
| dotColor  | 圆点颜色                       | `string`     | theme.verticalDataCompare.dotColor  |
| showDot   | 是否显示顶部圆点               | `boolean`    | true                                |
| style     | 容器样式                       | `ViewStyle`  | {}                                  |

### DataItem

```
interface DataItem {
  label: string;  // 标签文本
  value: number;  // 数值
}
```

## 主题定制

组件样式可通过主题配置文件的 `verticalDataCompare` 进行定制：

```
verticalDataCompare: {
  dotSize: basic.size.size2,
  dotColor: basic.colorC1.C150,
  lineWidth: system.space.spaceElementsXxxs,
  lineColor: basic.colorC1.C150,
  showDot: true,
  unit: '',
  maxHeight: basic.size.size40,
  valueStyle: {
    ...system.cnBody.cnBodyM,
    color: system.textColor.textPrimary,
    marginBottom: system.space.spaceElementsXs,
  },
  unitStyle: {
    ...system.cnCaption.cnCaptionS,
    paddingLeft: system.space.spaceElementsXxxs,
    color: system.textColor.textPrimary,
    marginBottom: system.space.spaceElementsXs,
  },
  labelStyle: {
    ...system.cnBody.cnBodyM,
    color: system.textColor.textPrimary,
  },
}
```

## 代码示例

### 基础用法

```
const Example = () => {
  const data = [
    { label: 'A', value: 100 },
    { label: 'B', value: 200 },
    { label: 'C', value: 300 },
  ];

  return <VerticalDataCompare data={data} />;
};
```

### 自定义样式

```
const Example = () => {
  const data = [
    { label: 'A', value: 100 },
    { label: 'B', value: 200 },
    { label: 'C', value: 300 },
  ];

  return (
    <VerticalDataCompare
      data={data}
      unit="%"
      maxHeight={200}
      lineColor="#4080FF"
      lineWidth={4}
      dotSize={10}
      dotColor="#4080FF"
      showDot={true}
      style={{ height: 300 }}
    />
  );
};
```

### 设置最大值

```
const Example = () => {
  const data = [
    { label: 'A', value: 100 },
    { label: 'B', value: 200 },
    { label: 'C', value: 300 },
  ];

  return (
    <VerticalDataCompare
      data={data}
      maxValue={500}
      unit="分"
    />
  );
};
```

## 注意事项

1. 数据项的 value 必须为数值类型
2. 建议设置合适的 maxHeight 以确保良好的展示效果
3. style 中的高度会影响整个组件的布局
4. 设置 maxValue 时需要大于等于数据中的最大值
5. 主题配置优先级低于 props 传入的值
