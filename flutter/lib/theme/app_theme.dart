import 'package:flutter/material.dart';

import 'system_palette.dart';
import 'system_tokens.dart';
import 'system_light_typography.dart';

/// 应用主题入口：将 React `systemLight` / `systemDark` 映射到 [ThemeData] + [SystemTokens]。
abstract final class AppTheme {
  /// Material 3 浅色主题（`systemLight`）。
  static ThemeData systemLight() => _build(SystemPalette.light, Brightness.light);

  /// Material 3 深色主题（`systemDark`）。
  static ThemeData systemDark() => _build(SystemPalette.dark, Brightness.dark);

  static ThemeData _build(SystemPalette p, Brightness brightness) {
    final isLight = brightness == Brightness.light;
    final colorScheme = isLight
        ? ColorScheme.light(
            brightness: Brightness.light,
            primary: p.containerBpDefault,
            onPrimary: p.textInverse,
            secondary: p.containerTertiary,
            onSecondary: p.textPrimary,
            surface: p.containerPrimary,
            onSurface: p.textPrimary,
            error: p.textErrorDefault,
            onError: p.textInverse,
            outline: p.borderWeakDefault,
            outlineVariant: p.dividerList,
          )
        : ColorScheme.dark(
            brightness: Brightness.dark,
            primary: p.containerBpDefault,
            onPrimary: p.textInverse,
            secondary: p.containerTertiary,
            onSecondary: p.textPrimary,
            surface: p.background,
            onSurface: p.textPrimary,
            error: p.textErrorDefault,
            onError: p.textInverse,
            outline: p.borderWeakDefault,
            outlineVariant: p.dividerList,
          );

    final typoBase = SystemLightTypography.standard();
    final textTheme = TextTheme(
      displayLarge: typoBase.cnDisplayLStrong.copyWith(color: p.textPrimary),
      displayMedium: typoBase.cnDisplayMStrong.copyWith(color: p.textPrimary),
      displaySmall: typoBase.cnDisplayXsStrong.copyWith(color: p.textPrimary),
      headlineLarge: typoBase.cnHeadlineMStrong.copyWith(color: p.textTitle),
      headlineMedium: typoBase.cnHeadlineSStrong.copyWith(color: p.textTitle),
      headlineSmall: typoBase.cnHeadlineMsStrong.copyWith(color: p.textTitle),
      titleLarge: typoBase.cnHeadlineMsStrong.copyWith(color: p.textTitle),
      titleMedium: typoBase.cnHeadlineXsStrong.copyWith(color: p.textTitle),
      titleSmall: typoBase.cnHeadlineXxsStrong.copyWith(color: p.textTitle),
      bodyLarge: typoBase.cnBodyL.copyWith(color: p.textPrimary),
      bodyMedium: typoBase.cnBodyM.copyWith(color: p.textPrimary),
      bodySmall: typoBase.cnBodyS.copyWith(color: p.textSecondary),
      labelLarge: typoBase.cnHeadlineMsStrong.copyWith(color: p.textInverse),
      labelMedium: typoBase.cnBodyM.copyWith(color: p.textSecondary),
      labelSmall: typoBase.cnBodyXs.copyWith(color: p.textSecondary),
    );

    final typography = SystemLightTypography.standard(
      baseStyle: textTheme.bodyMedium,
    );

    final paletteForTokens = isLight ? SystemPalette.light : SystemPalette.dark;

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: p.background,
      dividerColor: p.dividerList,
      textTheme: textTheme,
      appBarTheme: AppBarTheme(
        backgroundColor: p.background,
        foregroundColor: p.textPrimary,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      cardTheme: CardThemeData(
        color: p.containerPrimary,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: p.borderWeakDefault),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: p.containerBpDefault,
          foregroundColor: p.textInverse,
          disabledBackgroundColor: p.containerBpDisabled,
          disabledForegroundColor: p.textInverse.withValues(alpha: 0.38),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: p.textPrimary,
          side: BorderSide(color: p.borderWeakDefault),
        ),
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: p.containerBpDefault,
        foregroundColor: p.textInverse,
      ),
      extensions: <ThemeExtension<dynamic>>[
        SystemTokens.withTypography(
          typography,
          palette: paletteForTokens,
        ),
      ],
    );
  }
}
