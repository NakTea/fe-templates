# Table 表格组件

## 描述

基础表格组件，支持文本、图片和图标三种类型的单元格内容展示，可自定义样式和布局。适用于需要展示结构化数据的场景，如列表展示、数据对比、信息展示等。

## 功能特性

- 支持文本、图片、图标三种内容类型
- 可配置表格边框和分割线
- 支持自定义列宽
- 表头和单元格样式可自定义
- 支持主题定制
- 支持内容对齐方式设置

## API

### Props

| 参数                | 说明                 | 类型                                     | 默认值                 |
| ------------------- | -------------------- | ---------------------------------------- | ---------------------- |
| dataSource          | 数据数组             | `object[]`                               | 必填                   |
| columns             | 列配置数组           | `ITableColumn[]`                         | 必填                   |
| tableKey            | 数据项的唯一标识字段 | string                                   | id                     |
| showHorizontalLines | 是否显示水平分割线   | `boolean`                                | true                   |
| showVerticalLines   | 是否显示垂直分割线   | `boolean`                                | true                   |
| containerBorder     | 是否显示表格边框     | `boolean`                                | true                   |
| headerStyle         | 表头样式             | `ViewStyle`                              | {}                     |
| headerTextStyle     | 表头文字样式         | `TextStyle`                              | {}                     |
| cellStyle           | 单元格样式           | `ViewStyle`                              | {}                     |
| cellTextStyle       | 单元格文字样式       | `TextStyle`                              | {}                     |
| borderColor         | 边框颜色             | `string`                                 | theme.tableBorderColor |
| borderWidth         | 边框宽度             | `number`                                 | 1                      |
| textAlign           | 内容对齐方式         | `'flex-start' \| 'flex-end' \| 'center'` | 'flex-start'           |

### ITableColumn

```
interface ITableColumn {
  title: string;           // 列标题
  dataIndex: string;       // 数据字段名
  width?: number | string; // 列宽度
  type?: ColumnType;       // 列类型：'text' | 'image' | 'icon'
  imageStyle?: ImageStyle; // 图片样式
  iconName?: string;       // 图标名称
  iconSize?: number;       // 图标大小
  iconColor?: string;      // 图标颜色
}
```

## 主题定制

组件样式可通过主题配置的 `table` 进行定制：

```
table: {
  // 表格基础样式
  tableRadius: system.radius.radiusInCard,        // 表格圆角
  tableBorderColor: system.borderColor.borderWeakDefault,  // 表格边框颜色
  tableBgColor: '#EEE',                          // 表格背景色

  // 表头样式
  headerBgColor: system.containerColor.containerFifth,  // 表头背景色
  hedaderFont: {                                 // 表头文字样式
    ...system.cnHeadline.cnHeadlineXxsStrong,   // 继承系统标题文字样式
    color: system.textColor.textPrimary,        // 表头文字颜色
  },

  // 单元格样式
  cellImgRadius: system.radius.radiusInCard,    // 单元格图片圆角
  cellPaddingHorizontal: system.space.spaceElementsXs,  // 单元格水平内边距
  cellPaddingVertical: system.space.spaceElementsM,     // 单元格垂直内边距
  cellFont: {                                   // 单元格文字样式
    ...system.cnBody.cnBodyM,                   // 继承系统正文文字样式
    color: system.textColor.textPrimary,        // 单元格文字颜色
  },
}
```

## 代码示例

### 基础用法

```
const Example = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      type: 'image',
      width: 60,
      imageStyle: { width: 40, height: 40 },
    },
  ];

  const dataSource = [
    { name: '张三', age: 25, avatar: 'https://example.com/avatar1.jpg' },
    { name: '李四', age: 30, avatar: 'https://example.com/avatar2.jpg' },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};
```

### 自定义样式

```
const Example = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      showHorizontalLines={false}
      headerStyle={{ backgroundColor: '#f5f5f5' }}
      cellStyle={{ padding: 12 }}
      borderColor="#ddd"
      textAlign="center"
    />
  );
};
```

## 注意事项

1. dataSource 的对象字段需要与 columns 的 dataIndex 对应
2. 使用 image 类型时需要提供有效的图片 URL
3. 使用 icon 类型时需要确保图标名称在图标库中存在
4. 自定义样式会覆盖主题中的默认样式
5. 列宽度可以使用具体数值或百分比
6. 未指定宽度的列会平均分配剩余空间

## 依赖

- IconFont：用于显示图标类型的单元格
- useFlexUIConfig：用于获取主题配置
