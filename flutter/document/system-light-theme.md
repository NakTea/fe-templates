# System Light / Dark 设计令牌（Flutter）

本文说明如何在 Flutter 中使用与 React `systemLight`、`systemDark` 对齐的设计令牌：圆角、间距、颜色、尺寸、字体样式与渐变。

## 1. 代码位置

| 文件 | 作用 |
|------|------|
| `lib/theme/hex_color.dart` | `#RRGGBB` / `#RRGGBBAA` 解析（与 CSS 一致，末尾为 alpha） |
| `lib/theme/system_light_layout.dart` | `SystemLightRadii`、`SystemLightSpacing`、`SystemLightMeasures`（明暗共用） |
| `lib/theme/system_palette.dart` | `SystemPalette`：`SystemPalette.light`（`systemLight`）、`SystemPalette.dark`（`systemDark`） |
| `lib/theme/system_light_typography.dart` | `SystemLightTypography`（字号 / 字重 / 行高 / 部分 letterSpacing，明暗共用） |
| `lib/theme/system_tokens.dart` | `SystemTokens`（`ThemeExtension`）+ `context.systemTokens` |
| `lib/theme/app_theme.dart` | `AppTheme.systemLight()` / `AppTheme.systemDark()` → `ThemeData`（Material 3 + 扩展令牌） |

入口 `lib/main.dart` 使用 `theme` + `darkTheme` + `themeMode`，演示页 AppBar 提供主题切换按钮。

## 2. 应用主题

在根组件使用：

```dart
MaterialApp(
  theme: AppTheme.systemLight(),
  darkTheme: AppTheme.systemDark(),
  themeMode: ThemeMode.system, // 或 ThemeMode.light / dark，或由状态切换
  home: ...,
);
```

`ThemeData` 中与业务令牌对应关系（便于使用 Material 组件）：

- `scaffoldBackgroundColor` → `palette.background`（浅色 `#F4F4F4`，深色 `#2B2D28`）
- `colorScheme.primary` → 主按钮底 `containerBpDefault`（浅色近 `#2B2D28`，深色 `#317AF7`）
- `colorScheme.surface` → 浅色为 `containerPrimary`，深色为 `background`
- `colorScheme.error` → `textErrorDefault`
- `textTheme.*` → 由 `SystemLightTypography` 映射并套上主色/次色

细粒度令牌（与 React 对象字段一一对应）通过 **`ThemeExtension`** 读取。

## 3. 读取扩展令牌

在任意 `BuildContext` 下：

```dart
final t = context.systemTokens;
if (t == null) return; // 未注册扩展时

// 圆角
BorderRadius.circular(t.radii.radiusCard);

// 间距
SizedBox(height: t.spacing.spaceElementsM);

// 颜色
Icon(Icons.home, color: t.palette.iconPrimary, size: t.measures.sizeIconM);

// 字体（设计规范名与 React 一致）
Text('标题', style: t.typography.cnHeadlineMsStrong.copyWith(
  color: t.palette.textTitle,
));

// 渐变背景
DecoratedBox(
  decoration: BoxDecoration(gradient: t.containerLinearGradient),
);
```

也可不用扩展写法：

```dart
final t = Theme.of(context).extension<SystemTokens>();
```

`context.systemLightTokens` 仍可用，与 `systemTokens` 等价（兼容旧文档）。

## 4. 与 React 字段对照

Dart 侧命名与 React `systemLight` / `systemDark` **同名同义**（camelCase）；当前主题下的颜色在 `t.palette` 中（随 `themeMode` 切换）。

- **圆角**：`t.radii.radiusImageS` … `radiusComp2`
- **间距**：`t.spacing.spaceElements*`、`spaceCardPadding*`
- **颜色**：`t.palette.textPrimary`、`containerBpDefault`、`dividerList` 等
- **尺寸**：`t.measures.sizeIconXs`、`sizeAvatarM`、`sizeButtonXs` 等
- **字体**：`t.typography.cnBodyM`、`enBodyL` 等

渐变：

- `t.containerLinearGradient` ← `containerLinearGradient`
- `t.backgroundBlurGradient` ← `backgroundBlur`（React 为 CSS 渐变字符串，Flutter 为 `LinearGradient`）

## 5. 组件示例

**卡片（圆角 + 内边距 + 边框色）**

```dart
final t = context.systemLightTokens!;
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

**列表分隔线**

```dart
Divider(color: t.palette.dividerList, height: 1);
```

**主按钮（也可用 `FilledButton`，主题已接近 Bp）**

```dart
FilledButton(
  onPressed: () {},
  style: FilledButton.styleFrom(
    minimumSize: Size(double.infinity, t.measures.sizeComphS),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(t.radii.radiusComp0),
    ),
  ),
  child: Text('确定', style: t.typography.cnHeadlineMsStrong.copyWith(color: t.palette.textInverse)),
);
```

## 6. 字体与 `cnAiHeadline*`

React 里 `cnAiHeadlineXsStrong` / `cnAiHeadlineXxs` 带有自定义 `fontFamily` 链。当前模板未内置 JetBrains Mono 等字体文件，Flutter 侧使用 **`fontFamilyFallback: ['Montserrat', 'Noto Sans SC']`**，并保留 `letterSpacing: -0.03em`（按字号换算为逻辑像素）。

若要与 Web 完全一致：

1. 将字体文件放入 `fonts/` 并在 `pubspec.yaml` 的 `flutter.fonts` 中注册 family。
2. 在 `SystemLightTypography.standard` 中为对应 `TextStyle` 设置 `fontFamily`，或使用 `google_fonts` 包加载 Montserrat / Noto Sans SC。

## 7. 覆盖与动画

`SystemTokens` 实现了 `copyWith` 与 `lerp`，可在 `ThemeData` 的 `extensions` 里放入变体；`AnimatedTheme` 切换主题时，颜色与数值会在两套令牌之间插值（字体样式同样参与 `TextStyle.lerp`）。

局部覆盖示例：

```dart
Theme(
  data: Theme.of(context).copyWith(
    extensions: [
      Theme.of(context).extension<SystemTokens>()!.copyWith(
        // palette: SystemPalette.dark, // 若需整包替换颜色
      ),
    ],
  ),
  child: child,
);
```

## 8. 注意事项

- 颜色字符串含 alpha 时（如 `#2B2D281A`）与 CSS 一致，按 **RRGGBBAA** 解析。
- React 中 `containerBpDefault` / `Press` / `Disabled` 同为 `#2B2D28`，禁用态视觉需在组件层用 `Opacity` 或单独 token 区分（与 Web 侧实现习惯一致）。
- 「背景模糊」在 React 里用渐变表示；Flutter 若需真实模糊，可在该渐变之上再叠 `BackdropFilter`，本文从略。
