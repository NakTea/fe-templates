import 'package:study_app/l10n/contracts/home.dart';

final class JaHomeStrings implements HomeStrings {
  const JaHomeStrings();

  @override
  String get pageTitle => 'Flutter デモ ホーム';

  @override
  String get counterLabel => 'ボタンを押した回数：';

  @override
  String get incrementTooltip => '増やす';

  @override
  String get themeTooltipToLight => 'ライトモードに切り替え';

  @override
  String get themeTooltipToDark => 'ダークモードに切り替え';
}
