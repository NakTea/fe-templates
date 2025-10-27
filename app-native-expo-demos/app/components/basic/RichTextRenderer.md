# 📘 RichTextRenderer 组件说明文档

## 📌 组件名称

**RichTextRenderer**

## 🧩 组件功能

RichTextRenderer 是一个用于解析富文本内容的 React Native 组件。它支持将文本中嵌入的特殊标记（如 `[IMAGE: url]`、`[ICON: name|url]`）渲染成对应的图片或图标，实现在一段文字中插入富媒体内容。

## 🎯 使用场景

- 渲染富文本型提示语、引导语、图文混排文案；
- 支持服务端下发内容中的 ICON、IMAGE 插入；
- 实现轻量级富文本展示，无需引入 HTML 渲染库；
- 可用于车机卡片、设置项描述、引导提示等场景。

## 🚀 功能特性

| 功能           | 说明                                           |
| -------------- | ---------------------------------------------- |
| `[IMAGE: url]` | 渲染为本地或网络图片 `<Image />`               |
| `[ICON: url]`  | 若为 http(s)，渲染为网络 SVG 图标              |
| `[ICON: name]` | 否则使用内置图标组件按 name 渲染               |
| 文本混排       | 图片、图标与文本可自动拆分渲染                 |
| 样式可定制     | 支持传入 textStyle、imageStyle、iconSetting 等 |
| 自动识别协议   | 图标 URL 自动判断是否为 http(s) 地址           |
| 正则解析稳定   | 支持前后空格容错、大小写不敏感                 |

## 🧩 Props 参数说明

| Prop        | 类型                                | 说明                                                      | 是否必填 |
| ----------- | ----------------------------------- | --------------------------------------------------------- | -------- |
| content     | string                              | 输入的文本内容，包含 `[ICON: xxx]` 或 `[IMAGE: xxx]` 标记 | ✅ 是    |
| imageStyle  | object                              | 自定义图片样式（应用于 `<Image />`）                      | ❌ 否    |
| iconSetting | `{ size?: number; fill?: string; }` | 图标配置项，适用于内置 IconFont 和网络 SVG 图标           | ❌ 否    |
| textStyle   | object                              | 文本样式，应用于普通文字部分                              | ❌ 否    |

## 🧪 示例

### ✅ 示例 1：基本用法

```
<RichTextRenderer
  content="这是图标[ICON:home]，这是图片[IMAGE: https://example.com/image.png]"
/>
```

### ✅ 示例 2：自定义样式

```
<RichTextRenderer
  content="点击[ICON:arrow-right]跳转，查看示意图[IMAGE: https://example.com/demo.png]"
  textStyle={{ fontSize: 14, color: '#333' }}
  imageStyle={{ width: 30, height: 30 }}
  iconSetting={{ size: 20, fill: 'blue' }}
/>
```

## 🧠 内部逻辑说明

### 1. 正则解析

使用正则匹配格式：

```
/\[\s*(ICON|IMAGE)\s*:\s*([^\]]+)\s*\]/gi
```

提取出：

- 类型（ICON / IMAGE）
- 资源地址 / 内置图标名称

### 2. 图标处理逻辑

```
if (isHttpUrl(url)) {
  // 网络 SVG 图标
  <IconFont url={url} />
} else {
  // 内置图标名称
  <IconFont name={url} />
}
```

## 📦 依赖说明

- `react-native-svg`：用于渲染 SVG 图标；
- `IconFont`（自定义）：你的项目中封装的图标组件，兼容 name 和 url；
- `Image` / `Text` / `View`：React Native 原生组件。

## ⚠️ 注意事项

- 图片或图标地址需合法，建议使用 HTTPS；
- 内置图标 `name` 需提前在 `IconFont` 中注册；
- 网络资源加载失败请添加 fallback 逻辑，避免空白；
- 不支持嵌套标记或复杂富文本语法（如 Markdown）；
- 不建议在长段落中频繁嵌入图片，影响排版体验；

## ✅ 总结

RichTextRenderer 是一个轻量、灵活、可扩展的富文本解析渲染组件，非常适合在 React Native 项目中展示图文混排内容，并支持内置与网络资源图标的结合使用。通过正则解析 + 分段渲染的方式，保持了性能和可维护性，易于与现有 UI 系统集成。
