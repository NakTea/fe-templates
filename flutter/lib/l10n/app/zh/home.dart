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
}
