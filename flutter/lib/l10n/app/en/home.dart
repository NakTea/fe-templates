import 'package:study_app/l10n/contracts/home.dart';

final class EnHomeStrings implements HomeStrings {
  const EnHomeStrings();

  @override
  String get pageTitle => 'Flutter Demo Home Page';

  @override
  String get counterLabel =>
      'You have pushed the button this many times:';

  @override
  String get incrementTooltip => 'Increment';

  @override
  String get themeTooltipToLight => 'Switch to light mode';

  @override
  String get themeTooltipToDark => 'Switch to dark mode';
}
