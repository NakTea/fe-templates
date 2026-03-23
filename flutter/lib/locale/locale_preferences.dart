import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalePreferences {
  LocalePreferences._();

  /// Persists user-chosen UI language (`en` / `zh` / `ja`).
  /// Absent or legacy `system` means follow device locale.
  static const _key = 'app_locale_mode';

  static Future<Locale?> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_key);
    if (raw == null || raw == 'system') {
      return null;
    }
    switch (raw) {
      case 'en':
        return const Locale('en');
      case 'zh':
        return const Locale('zh');
      case 'ja':
        return const Locale('ja');
      default:
        return null;
    }
  }

  static Future<void> save(Locale locale) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, locale.languageCode);
  }
}
