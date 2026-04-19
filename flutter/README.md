# study_app

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Learn Flutter](https://docs.flutter.dev/get-started/learn-flutter)
- [Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Flutter learning resources](https://docs.flutter.dev/reference/learning-resources)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.


# 工程目录说明（study_app）

包名：`study_app`（见 `pubspec.yaml` 中 `name`）。组织标识：`com.example.study`（创建项目时通过 `--org` 指定）。

## 根目录一览

| 路径 | 作用 |
|------|------|
| `lib/` | **应用 Dart 代码**，学习时主要在这里写 Widget 与逻辑。入口一般为 `main.dart`。 |
| `test/` | 单元测试与 Widget 测试。 |
| `pubspec.yaml` | 依赖、资源、SDK 版本约束。 |
| `analysis_options.yaml` | 静态分析与 lint 规则。 |
| `document/` | 本仓库自建的架构与学习文档（非 Flutter 默认目录）。 |

## 平台宿主目录（一般少改）

Flutter 通过各平台「壳工程」嵌入原生环境：

| 目录 | 平台 |
|------|------|
| `android/` | Android（Gradle、Kotlin `MainActivity` 等） |
| `ios/` | iOS（Xcode 工程、Swift） |
| `web/` | Web（`index.html`、PWA `manifest.json`） |
| `windows/` / `linux/` / `macos/` | 桌面端 CMake / 原生 runner |

日常开发 UI 与逻辑时，多数时间只需关注 `lib/`；发布、权限、图标、签名等才会深入各平台目录。

## 与模板代码的对应关系

- `lib/main.dart`：`MyApp`（根）→ `MaterialApp` → `MyHomePage`（`StatefulWidget` 计数器示例）。
- `test/widget_test.dart`：针对计数器示例的 Widget 测试示例。

## 常用命令

```bash
flutter pub get          # 拉取依赖
flutter analyze          # 静态分析
flutter test             # 运行测试
flutter devices          # 查看可用设备（含 Chrome / Edge 等 Web 目标）
flutter run              # 运行到默认或已选设备 / 模拟器
```

更多说明见 [architecture.md](./architecture.md)。

## Web 端运行与构建

Flutter 已稳定支持 Web；模板中的 `web/` 目录即浏览器宿主（如 `index.html`、PWA `manifest.json`）。业务代码仍在 `lib/`，与移动端共用一套 Dart UI。

**开发调试**（在项目根目录执行）：

```bash
flutter run -d chrome    # 用 Chrome 打开（常用）
flutter run -d edge      # 用 Microsoft Edge 打开
flutter run -d web-server   # 仅启动本地 HTTP，终端会打印 URL，可自行用浏览器访问
```

首次在 Web 上运行可能需额外编译或拉取资源，耗时略长；之后有缓存会快一些。

**查看本机是否识别 Web**：`flutter devices` 列表中应出现 `Chrome (web)`、`Edge (web)` 等。若完全没有 Web 相关项，可执行 `flutter config --enable-web` 后重试（多数新 SDK 默认已启用）。

**发布静态站点**：

```bash
flutter build web        # 产物在 build/web/，可部署到任意静态托管
```

Web 与移动在插件、文件系统、打开链接等能力上可能有差异，复杂功能需查阅 [Flutter Web 文档](https://docs.flutter.dev/platform-integration/web)。

