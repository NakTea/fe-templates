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

  @override
  String get shellRoutesPageTitle => 'Routes';

  @override
  String get tabRoutesLabel => 'Routes';

  @override
  String get tabDemoLabel => 'Demo';

  @override
  String get routeDartLearning => 'Dart playground';

  @override
  String get routeDartLearningSubtitle => 'Run and inspect Dart code';

  @override
  String get routeBusinessCard => 'Business card';

  @override
  String get routeBusinessCardSubtitle => 'Practice Flutter layout';

  @override
  String get dartLearningPageTitle => 'Dart playground';

  @override
  String get dartLearningRunSample => 'Run sample';

  @override
  String get dartLearningOutputHeading => 'Output';

  @override
  String get businessCardPageTitle => 'Business card';

  @override
  String get businessCardPlaceholder =>
      'Empty canvas — try building a name card with Row, Column, and Card.';
}
