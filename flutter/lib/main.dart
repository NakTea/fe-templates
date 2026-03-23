import 'package:flutter/material.dart';

import 'l10n/app_localizations.dart';
import 'locale/locale_preferences.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final savedLocale = await LocalePreferences.load();
  runApp(MyApp(initialLocaleOverride: savedLocale));
}

PopupMenuItem<Locale> _localePopupItem({
  required Locale value,
  required bool selected,
  required String label,
}) {
  return PopupMenuItem<Locale>(
    value: value,
    child: Row(
      children: [
        SizedBox(
          width: 24,
          child: selected
              ? const Icon(Icons.check, size: 20)
              : const SizedBox.shrink(),
        ),
        Expanded(child: Text(label)),
      ],
    ),
  );
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
      home: MyHomePage(
        userLocaleOverride: _localeOverride,
        onUserLocaleSelected: _setUserLocale,
        onToggleTheme: _toggleTheme,
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  // ignore: prefer_const_constructors_in_immutables
  MyHomePage({
    super.key,
    required this.userLocaleOverride,
    required this.onUserLocaleSelected,
    required this.onToggleTheme,
  });

  /// `null` if the app follows system language (no saved preference).
  final Locale? userLocaleOverride;
  final void Function(Locale locale) onUserLocaleSelected;
  final VoidCallback onToggleTheme;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  static const _en = Locale('en');
  static const _zh = Locale('zh');
  static const _ja = Locale('ja');

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final o = widget.userLocaleOverride;

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.home.pageTitle),
        actions: [
          PopupMenuButton<Locale>(
            tooltip: l10n.common.languageMenuTooltip,
            icon: const Icon(Icons.language_outlined),
            initialValue: o,
            onSelected: widget.onUserLocaleSelected,
            itemBuilder: (context) => [
              _localePopupItem(
                value: _en,
                selected: o == _en,
                label: l10n.common.languageEnglish,
              ),
              _localePopupItem(
                value: _zh,
                selected: o == _zh,
                label: l10n.common.languageChinese,
              ),
              _localePopupItem(
                value: _ja,
                selected: o == _ja,
                label: l10n.common.languageJapanese,
              ),
            ],
          ),
          IconButton(
            tooltip: isDark
                ? l10n.home.themeTooltipToLight
                : l10n.home.themeTooltipToDark,
            onPressed: widget.onToggleTheme,
            icon: Icon(
              isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
            ),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(l10n.home.counterLabel),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: l10n.home.incrementTooltip,
        child: const Icon(Icons.add),
      ),
    );
  }
}
