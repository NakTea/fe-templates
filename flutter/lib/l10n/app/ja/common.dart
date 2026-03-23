import 'package:study_app/l10n/contracts/common.dart';

final class JaCommonStrings implements CommonStrings {
  const JaCommonStrings();

  @override
  String get appTitle => 'Flutter デモ';

  @override
  String get languageMenuTooltip => '言語';

  @override
  String get languageEnglish => 'English';

  @override
  String get languageChinese => '中国語';

  @override
  String get languageJapanese => '日本語';
}
