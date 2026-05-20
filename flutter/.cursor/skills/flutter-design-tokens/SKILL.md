---
name: flutter-design-tokens
description: >-
  Applies study_app theme and design tokens (AppTheme, SystemTokens, SystemPalette)
  aligned with React systemLight/systemDark. Use when styling widgets, adding colors,
  spacing, typography, radii, theme switching, or editing lib/theme/.
---

# Flutter 主题与设计令牌

## 何时使用

- 新建/修改页面样式、按钮、卡片、列表分隔线
- 切换或扩展明暗主题
- 与 React `systemLight` / `systemDark` 对齐的字段

延伸阅读：`document/system-light-theme.md`。

## 架构速览

| 文件 | 职责 |
|------|------|
| `lib/theme/app_theme.dart` | `AppTheme.systemLight()` / `systemDark()` → `ThemeData` |
| `lib/theme/system_palette.dart` | 颜色令牌（随明暗切换） |
| `lib/theme/system_light_layout.dart` | 圆角、间距、尺寸（明暗共用） |
| `lib/theme/system_light_typography.dart` | 字体样式（明暗共用） |
| `lib/theme/system_tokens.dart` | `ThemeExtension` + `context.systemTokens` |
| `lib/theme/hex_color.dart` | `#RRGGBB` / `#RRGGBBAA` 解析 |

## 应用主题

```dart
MaterialApp(
  theme: AppTheme.systemLight(),
  darkTheme: AppTheme.systemDark(),
  themeMode: themeMode, // ThemeMode.light | dark | system
  ...
);
```

`ThemeData` 已映射：`scaffoldBackgroundColor` → `palette.background`；`colorScheme.primary` → `containerBpDefault`；`textTheme` ← `SystemLightTypography`。

## 在 Widget 中读取

```dart
final t = context.systemTokens!;
if (t == null) return; // 未注册扩展（不应发生在已配置 AppTheme 时）

BorderRadius.circular(t.radii.radiusCard);
SizedBox(height: t.spacing.spaceElementsM);
Icon(Icons.home, color: t.palette.iconPrimary, size: t.measures.sizeIconM);
Text('标题', style: t.typography.cnHeadlineMsStrong.copyWith(color: t.palette.textTitle));
DecoratedBox(decoration: BoxDecoration(gradient: t.containerLinearGradient));
```

等价：`Theme.of(context).extension<SystemTokens>()`；`context.systemLightTokens` 为兼容别名。

## 命名与 React 对照

Dart 字段与 React **同名 camelCase**。颜色在 `t.palette`（随当前 `themeMode`）；圆角 `t.radii.*`；间距 `t.spacing.*`；尺寸 `t.measures.*`；字体 `t.typography.cnBodyM`、`enBodyL` 等。

渐变：`containerLinearGradient`、`backgroundBlurGradient`（Flutter 为 `LinearGradient`，非 CSS 字符串）。

## 组件模式

**卡片**

```dart
Card(
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(t.radii.radiusCard),
    side: BorderSide(color: t.palette.borderWeakDefault),
  ),
  child: Padding(
    padding: EdgeInsets.symmetric(
      vertical: t.spacing.spaceCardPaddingUpdownS,
      horizontal: t.spacing.spaceCardPaddingLeftRightS,
    ),
    child: Text('内容', style: t.typography.cnBodyM.copyWith(color: t.palette.textPrimary)),
  ),
);
```

**主按钮**：优先 `FilledButton`（主题已接近 Bp），或 `FilledButton.styleFrom` 配合 `t.measures.sizeComphS`、`t.radii.radiusComp0`。

## 修改令牌

1. **新颜色**：在 `SystemPalette` 构造参数、`light`/`dark` 静态值、`lerp` 中同步添加
2. **新间距/圆角**：改 `SystemLightSpacing` / `SystemLightRadii` 及 `system_tokens.dart` 内 `_spacing` / `_radii`
3. **新字体样式**：改 `SystemLightTypography.standard`
4. **Material 组件默认态**：改 `app_theme.dart` 中 `cardTheme`、`filledButtonTheme` 等

## 动画与局部覆盖

`SystemTokens` 支持 `copyWith` / `lerp`，配合 `AnimatedTheme` 可在明暗间插值。

```dart
Theme(
  data: Theme.of(context).copyWith(
    extensions: [
      Theme.of(context).extension<SystemTokens>()!.copyWith(
        // palette: ...
      ),
    ],
  ),
  child: child,
);
```

## 注意事项

- Alpha 在 hex 末尾：`#2B2D281A` = RRGGBBAA
- 浅色下 `containerBpDefault` / `Press` / `Disabled` 同色时，禁用态用 `Opacity` 或组件层处理
- `cnAiHeadline*` 使用 `fontFamilyFallback`；与 Web 完全一致需在 `pubspec.yaml` 注册字体
- 勿在业务代码重复定义与令牌相同的常量
