import 'package:flutter/material.dart';

import 'l10n/app_localizations.dart';
import 'locale/locale_preferences.dart';
import 'main_tabs_page.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final savedLocale = await LocalePreferences.load();
  runApp(MyApp(initialLocaleOverride: savedLocale));
}

class MyApp extends StatefulWidget {
  // ignore: prefer_const_constructors_in_immutables
  MyApp({super.key, required this.initialLocaleOverride});

  /// `null`: follow system (until user picks a language in settings).
  final Locale? initialLocaleOverride;

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Locale? _localeOverride;
  ThemeMode _themeMode = ThemeMode.light;

  @override
  void initState() {
    super.initState();
    _localeOverride = widget.initialLocaleOverride;
  }

  void _toggleTheme() {
    setState(() {
      _themeMode =
          _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  void _setUserLocale(Locale locale) {
    LocalePreferences.save(locale).then((_) {
      if (mounted) setState(() => _localeOverride = locale);
    });
  }

  static Locale _resolveDeviceLocale(
    List<Locale>? locales,
    Iterable<Locale> supported,
  ) {
    if (locales == null || locales.isEmpty) {
      return const Locale('en');
    }
    for (final device in locales) {
      final code = device.languageCode.toLowerCase();
      for (final s in supported) {
        if (s.languageCode.toLowerCase() == code) {
          return s;
        }
      }
    }
    return const Locale('en');
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      onGenerateTitle: (context) =>
          AppLocalizations.of(context)!.common.appTitle,
      theme: AppTheme.systemLight(),
      darkTheme: AppTheme.systemDark(),
      themeMode: _themeMode,
      locale: _localeOverride,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      localeListResolutionCallback: (locales, supported) =>
          _resolveDeviceLocale(locales, supported),
      home: MainTabsPage(
        userLocaleOverride: _localeOverride,
        onUserLocaleSelected: _setUserLocale,
        onToggleTheme: _toggleTheme,
      ),
    );
  }
}
