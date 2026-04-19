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

  @override
  String get shellRoutesPageTitle => 'ルート';

  @override
  String get tabRoutesLabel => 'ルート';

  @override
  String get tabDemoLabel => 'デモ';

  @override
  String get routeDartLearning => 'Dart 学習';

  @override
  String get routeDartLearningSubtitle => 'Dart コードの実行と確認';

  @override
  String get routeBusinessCard => '名刺';

  @override
  String get routeBusinessCardSubtitle => 'Flutter レイアウトの練習';

  @override
  String get dartLearningPageTitle => 'Dart 学習';

  @override
  String get dartLearningRunSample => 'サンプルを実行';

  @override
  String get dartLearningOutputHeading => '出力';

  @override
  String get businessCardPageTitle => '名刺';

  @override
  String get businessCardPlaceholder =>
      '空のキャンバスです。Row・Column・Card などで名刺レイアウトを試してください。';
}
