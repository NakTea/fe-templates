# Tips 提示组件

`Tips` 是一个用于展示不同类型提示信息的组件。它支持四种不同的提示类型（信息、成功、警告、错误），每种类型都有对应的图标和背景色。组件支持高度自定义的样式，适合用于展示各种状态的反馈信息。

## 功能特点

- 支持四种提示类型：info、success、warning、error
- 每种类型都有对应的图标和背景色
- 支持自定义图标大小和颜色
- 支持自定义文本样式和颜色
- 支持自定义内边距和圆角
- 高度可定制的样式

## 属性说明

| 属性名            | 类型                                        | 默认值                 | 说明                                   |
| ----------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| type              | 'error' \| 'success' \| 'warning' \| 'info' | 'info'                 | 提示类型                               |
| message           | string                                      | -                      | 提示信息文本, 支持Markdown格式渲染     |
| style             | object                                      | -                      | 容器的自定义样式                       |
| iconSize          | number                                      | tips.iconSize          | 图标大小                               |
| iconColor         | string                                      | -                      | 图标颜色（会根据type自动选择默认颜色） |
| iconRightPadding  | number                                      | tips.iconRightPadding  | 图标右侧内边距                         |
| cardBottomPadding | number                                      | tips.cardBottomPadding | 卡片底部内边距                         |
| cardInnerPadding  | number                                      | tips.cardInnerPadding  | 卡片内部内边距                         |
| cardRadius        | number                                      | tips.cardRadius        | 卡片圆角半径                           |
| tipTextFontStyle  | object                                      | tips.tipTextFontStyle  | 提示文本样式配置                       |
| tipTextColor      | string                                      | tips.tipTextColor      | 提示文本颜色                           |

### tipTextFontStyle 类型定义

```typescript
interface tipTextFontStyle {
  fontSize?: number; // 文本字体大小
  lineHeight?: number; // 文本行高
  fontWeight?: '400' | '500' | '600' | '700' | 'normal' | 'bold'; // 文本字重
}
```

## 使用示例

```tsx
import Tips from '../basic/Tips';

const MyComponent = () => {
  return (
    <>
      {/* 基础用法 */}
      <Tips type="info" message="这是一条信息提示" />

      {/* 自定义样式 */}
      <Tips
        type="success"
        message="操作成功！"
        iconSize={24}
        iconColor="#52c41a"
        cardRadius={8}
        tipTextFontStyle={{
          fontSize: 16,
          fontWeight: '500',
        }}
        tipTextColor="#333"
      />

      {/* 警告提示 */}
      <Tips type="warning" message="请注意这个警告信息" style={{ marginTop: 16 }} />

      {/* 错误提示 */}
      <Tips type="error" message="发生了一个错误" cardInnerPadding={16} />
    </>
  );
};
```

## 注意事项

1. 不同类型的提示会自动使用对应的图标和背景色。
2. 图标颜色如果不指定，会根据提示类型自动选择默认颜色。
3. 所有文本样式（fontSize、fontWeight、lineHeight）都可以通过 tipTextFontStyle 对象进行自定义。
4. 组件会自动处理图标的垂直对齐，确保与文本正确对齐。
5. 组件样式默认值来自 `design/default` 的 `tips` 配置。

```json
tips: {
    key: 'tips',
    name: 'tips',
    desc: '组件tips',
    data: [
      {
        name: 'iconSize',
        value: 16,
        depend: basic.size4,
        fixed: null,
        desc: '组件图标大小',
      },
      {
        name: 'iconRightPadding',
        value: 4,
        depend: basic.spacing1,
        fixed: null,
        desc: '组件图标右侧间距',
      },
      {
        name: 'cardBottomPadding',
        value: 16,
        depend: basic.spacing4,
        fixed: null,
        desc: '组件卡片底部间距',
      },
      {
        name: 'cardInnerPadding',
        value: 8,
        depend: basic.spacing2,
        fixed: null,
        desc: '组件卡片内部间距',
      },
      {
        name: 'cardRadius',
        value: 10,
        depend: basic.radiusS,
        fixed: null,
        desc: '组件卡片圆角',
      },
      {
        name: 'tipTextFontStyle',
        value: { fontSize: 14, fontWeight: '400', lineHeight: 21 },
        depend: system.cnBodyM,
        fixed: null,
        desc: '组件卡片提示的字体样式',
      },
      {
        name: 'tipTextColor',
        value: '#181818',
        depend: system.textPrimary,
        fixed: null,
        desc: '组件卡片提示的颜色',
      },
      {
        name: 'containerErrorColor',
        value: '#FF9E9E',
        depend: basic.E80,
        fixed: null,
        desc: '组件卡片错误背景颜色',
      },
      {
        name: 'iconErrorColor',
        value: '#BE1B1B',
        depend: system.textErrorDefault,
        fixed: null,
        desc: '组件卡片错误图标颜色',
      },
      {
        name:'containerSuccessColor',
        value: '#91F8C4',
        depend: basic.S80,
        fixed: null,
        desc: '组件卡片成功背景颜色',
      },
      {
        name:'iconSuccessColor',
        value: '#EF952F',
        depend: system.textWarningDefault,
        fixed: null,
        desc: '组件卡片成功图标颜色',
      },
      {
        name:'containerWarningColor',
        value: '#FED2A0',
        depend: basic.W80,
        fixed: null,
        desc: '组件卡片警告背景颜色',
      },
      {
        name:'iconWarningColor',
        value: '#EF952F',
        depend: system.textWarningDefault,
        fixed: null,
        desc: '组件卡片警告图标颜色',
      },
      {
        name:'containerInfoColor',
        value: '#BBD6FF',
        depend: basic.I80,
        fixed: null,
        desc: '组件卡片信息背景颜色',
      },
      {
        name:'iconInfoColor',
        value: '#4375C0',
        depend: system.textInfoDefault,
        fixed: null,
        desc: '组件卡片信息图标颜色',
      }
    ]
  }
```
