import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'app/en/common.dart' as en_common;
import 'app/en/home.dart' as en_home;
import 'app/ja/common.dart' as ja_common;
import 'app/ja/home.dart' as ja_home;
import 'app/zh/common.dart' as zh_common;
import 'app/zh/home.dart' as zh_home;
import 'contracts/common.dart';
import 'contracts/home.dart';

class AppLocalizations {
  AppLocalizations._(this.common, this.home);

  final CommonStrings common;
  final HomeStrings home;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('zh'),
    Locale('ja'),
  ];

  static AppLocalizations _forLocale(Locale locale) {
    switch (locale.languageCode.toLowerCase()) {
      case 'zh':
        return AppLocalizations._(
          const zh_common.ZhCommonStrings(),
          const zh_home.ZhHomeStrings(),
        );
      case 'ja':
        return AppLocalizations._(
          const ja_common.JaCommonStrings(),
          const ja_home.JaHomeStrings(),
        );
      default:
        return AppLocalizations._(
          const en_common.EnCommonStrings(),
          const en_home.EnHomeStrings(),
        );
    }
  }
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    final code = locale.languageCode.toLowerCase();
    return AppLocalizations.supportedLocales
        .any((l) => l.languageCode.toLowerCase() == code);
  }

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(
      AppLocalizations._forLocale(locale),
    );
  }

  @override
  bool shouldReload(covariant LocalizationsDelegate<AppLocalizations> old) {
    return false;
  }
}
