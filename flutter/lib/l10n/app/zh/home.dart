import 'package:study_app/l10n/contracts/home.dart';

final class ZhHomeStrings implements HomeStrings {
  const ZhHomeStrings();

  @override
  String get pageTitle => 'Flutter 演示首页';

  @override
  String get counterLabel => '你已经按下按钮这么多次：';

  @override
  String get incrementTooltip => '增加';

  @override
  String get themeTooltipToLight => '切换为浅色';

  @override
  String get themeTooltipToDark => '切换为深色';

  @override
  String get shellRoutesPageTitle => '学习路由';

  @override
  String get tabRoutesLabel => '路由';

  @override
  String get tabDemoLabel => '演示';

  @override
  String get routeDartLearning => 'Dart 语言学习';

  @override
  String get routeDartLearningSubtitle => '运行与调试 Dart 代码';

  @override
  String get routeBusinessCard => '个人名片';

  @override
  String get routeBusinessCardSubtitle => '练习 Flutter 布局';

  @override
  String get dartLearningPageTitle => 'Dart 语言学习';

  @override
  String get dartLearningRunSample => '运行示例';

  @override
  String get dartLearningOutputHeading => '输出';

  @override
  String get businessCardPageTitle => '个人名片';

  @override
  String get businessCardPlaceholder => '空白画布，可在此用 Row、Column、Card 等练习名片布局。';
}
