# AutoHeightImage 组件文档

## 组件描述

AutoHeightImage 是一个自适应高度的图片组件，基于 React Native 的 Image 组件封装。该组件会根据容器宽度自动计算并设置图片的高度，保持图片原始宽高比。

## 特性

- 自动计算图片高度
- 保持图片原始宽高比
- 支持图片加载错误处理
- 支持获取图片尺寸信息

## Props 说明

| 属性   | 类型                | 必填 | 默认值 | 描述                             |
| ------ | ------------------- | ---- | ------ | -------------------------------- |
| source | ImageSourcePropType | 是   | -      | 图片源，支持本地图片和网络图片   |
| style  | ImageStyle          | 否   | {}     | 图片样式，除高度外的其他样式属性 |

注：组件还支持 React Native Image 组件的其他所有属性（除 source 外）

## 继承自 React Native Image Props

组件继承了 React Native Image 组件的所有属性

## Props JSON Schema

```
{
  "type": "object",
  "properties": {
    "source": {
      "type": "object",
      "required": true,
      "properties": {
        "uri": {
          "type": "string",
          "description": "图片URL地址"
        }
      }
    },
    "style": {
      "type": "object",
      "properties": {
        "width": {
          "type": "number",
          "description": "图片宽度"
        },
        "backgroundColor": {
          "type": "string",
          "description": "背景颜色"
        }
      }
    }
  },
  "required": ["source"]
}

```

## 使用示例

```
import AutoHeightImage from '../basic/AutoHeightImage';

const MyComponent = () => {
  return (
    <AutoHeightImage
      source={{ uri: 'https://example.com/image.jpg' }}
      style={{ width: '100%' }}
    />
  );
};

```

## 注意事项

1. 组件需要一个确定的宽度才能正确计算高度
2. 当图片加载失败时，会将高度设置为与宽度相等
3. 组件会保持图片原始宽高比例
4. 支持网络图片和本地图片资源
