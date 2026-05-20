---
name: flutter-l10n
description: >-
  Manages study_app localization via AppLocalizations, contracts, and per-locale
  implementations (en/zh/ja). Use when adding UI strings, new locales, language
  switcher, or editing lib/l10n/.
---

# Flutter 多语言

本项目**不使用** `flutter gen-l10n` / `.arb`，采用 **contract 抽象类 + 各语言实现类**。

## 目录结构

```
lib/l10n/
  app_localizations.dart    # 入口、delegate、supportedLocales
  contracts/                # 抽象 String 契约（按功能模块）
  app/en|zh|ja/             # 各语言实现
lib/locale/locale_preferences.dart  # 用户语言持久化
```

当前模块：`common`、`home`。访问：`AppLocalizations.of(context)!.common.appTitle`。

## 在页面中使用

```dart
import '../l10n/app_localizations.dart';

@override
Widget build(BuildContext context) {
  final l10n = AppLocalizations.of(context)!;
  final h = l10n.home;

  return Scaffold(
    appBar: AppBar(title: Text(h.pageTitle)),
    ...
  );
}
```

`MaterialApp` 必须包含：

```dart
localizationsDelegates: AppLocalizations.localizationsDelegates,
supportedLocales: AppLocalizations.supportedLocales,
locale: userLocaleOverride, // 可选，null 则跟系统
localeListResolutionCallback: (locales, supported) => /* 匹配或 en */,
onGenerateTitle: (context) => AppLocalizations.of(context)!.common.appTitle,
```

## 新增一条文案

以在 `home` 模块增加 `welcomeMessage` 为例：

1. **`contracts/home.dart`** — 在 `HomeStrings` 增加：
   ```dart
   String get welcomeMessage;
   ```

2. **`app/en/home.dart`**、`app/zh/home.dart`、`app/ja/home.dart`** — 各实现类添加 `@override String get welcomeMessage => '...';`

3. 页面使用：`l10n.home.welcomeMessage`

**规则**：三种语言必须同时补齐；英文为 `default` 分支语言。

## 新增功能模块（如 `settings`）

1. 新建 `contracts/settings.dart`（`abstract class SettingsStrings`）
2. 新建 `app/en/settings.dart`、`zh/`、`ja/` 实现类（命名如 `EnSettingsStrings`）
3. 修改 `app_localizations.dart`：
   - `import` 各语言实现与 contract
   - 增加 `final SettingsStrings settings`
   - 构造函数与 `_forLocale` 各分支传入对应实现
4. 使用：`l10n.settings.xxx`

## 新增语言（如 `ko`）

1. `supportedLocales` 增加 `Locale('ko')`
2. 新建 `app/ko/` 下所有模块实现
3. `_forLocale` 增加 `case 'ko':`
4. 语言菜单 UI 增加选项（参考 `demo_home_page.dart` 的 `PopupMenuButton`）

## 语言切换流程

1. 用户选择 `Locale` → `LocalePreferences.save(locale)`
2. `MyApp` 更新 `_localeOverride` → `MaterialApp.locale`
3. `userLocaleOverride == null` 时跟随系统；`_resolveDeviceLocale` 不匹配则回退 `en`

## 测试

`test/widget_test.dart` 需包裹：

```dart
localizationsDelegates: AppLocalizations.localizationsDelegates,
supportedLocales: AppLocalizations.supportedLocales,
```

## 禁止事项

| 不要 | 应做 |
|------|------|
| 页面硬编码用户可见中文/英文 | `l10n.module.key` |
| 只改 `zh` 不改 `en`/`ja` | 三语同步 |
| 引入 `.arb` 代码生成 | 保持手写 contract 模式 |
| 在 contract 里放逻辑或拼接句子 | 各语言完整字符串；复杂复数可后续扩展 getter |

## 与主题配合

主题切换文案示例：`l10n.home.themeTooltipToLight` / `themeTooltipToDark`（见 `demo_home_page.dart`）。样式仍走 `context.systemTokens`，勿混用。
