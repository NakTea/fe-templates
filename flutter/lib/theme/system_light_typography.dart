import 'package:flutter/material.dart';

/// 与 React `systemLight` 字体段对应；`cnAi*` 的 `fontFamily` 需在 pubspec 配置字体后自行设置扩展。
@immutable
class SystemLightTypography {
  const SystemLightTypography({
    required this.cnHeadlineXxsStrong,
    required this.cnHeadlineXsStrong,
    required this.cnHeadlineSStrong,
    required this.cnHeadlineMStrong,
    required this.cnHeadlineMs,
    required this.cnHeadlineMsStrong,
    required this.cnBodyXs,
    required this.cnBodyS,
    required this.cnBodyM,
    required this.cnBodyL,
    required this.cnBodyXl,
    required this.cnBodyMTight,
    required this.cnDisplayLStrong,
    required this.cnDisplayMStrong,
    required this.cnDisplayXsStrong,
    required this.cnDisplayXxsStrong,
    required this.cnDisplayXxs,
    required this.cnDisplayXxxsStrong,
    required this.cnHeadlineCustom,
    required this.cnAiHeadlineXsStrong,
    required this.cnAiHeadlineXxs,
    required this.enHeadlineMStrong,
    required this.enHeadlineMsStrong,
    required this.enBodyL,
    required this.enBodyS,
  });

  final TextStyle cnHeadlineXxsStrong;
  final TextStyle cnHeadlineXsStrong;
  final TextStyle cnHeadlineSStrong;
  final TextStyle cnHeadlineMStrong;
  final TextStyle cnHeadlineMs;
  final TextStyle cnHeadlineMsStrong;
  final TextStyle cnBodyXs;
  final TextStyle cnBodyS;
  final TextStyle cnBodyM;
  final TextStyle cnBodyL;
  final TextStyle cnBodyXl;
  final TextStyle cnBodyMTight;
  final TextStyle cnDisplayLStrong;
  final TextStyle cnDisplayMStrong;
  final TextStyle cnDisplayXsStrong;
  final TextStyle cnDisplayXxsStrong;
  final TextStyle cnDisplayXxs;
  final TextStyle cnDisplayXxxsStrong;
  final TextStyle cnHeadlineCustom;
  final TextStyle cnAiHeadlineXsStrong;
  final TextStyle cnAiHeadlineXxs;
  final TextStyle enHeadlineMStrong;
  final TextStyle enHeadlineMsStrong;
  final TextStyle enBodyL;
  final TextStyle enBodyS;

  static TextStyle _ts({
    required double fontSize,
    FontWeight fontWeight = FontWeight.w400,
    double height = 1.3,
    double? letterSpacing,
    List<String>? fontFamilyFallback,
  }) {
    return TextStyle(
      fontSize: fontSize,
      fontWeight: fontWeight,
      height: height,
      letterSpacing: letterSpacing,
      fontFamilyFallback: fontFamilyFallback,
    );
  }

  /// [baseStyle] 用于继承 `ThemeData.textTheme` 的 `bodyMedium` 等（如 fontFamily）。
  static SystemLightTypography standard({TextStyle? baseStyle}) {
    final b = baseStyle ?? const TextStyle();
    TextStyle merge(TextStyle s) => b.merge(s);

    const monoFallback = ['Montserrat', 'Noto Sans SC'];

    return SystemLightTypography(
      cnHeadlineXxsStrong: merge(_ts(fontSize: 12, fontWeight: FontWeight.w600)),
      cnHeadlineXsStrong: merge(_ts(fontSize: 14, fontWeight: FontWeight.w600)),
      cnHeadlineSStrong: merge(_ts(fontSize: 24, fontWeight: FontWeight.w600)),
      cnHeadlineMStrong: merge(_ts(fontSize: 28, fontWeight: FontWeight.w600)),
      cnHeadlineMs: merge(_ts(fontSize: 16, fontWeight: FontWeight.w400)),
      cnHeadlineMsStrong: merge(_ts(fontSize: 16, fontWeight: FontWeight.w600)),
      cnBodyXs: merge(_ts(fontSize: 10)),
      cnBodyS: merge(_ts(fontSize: 12)),
      cnBodyM: merge(_ts(fontSize: 14, height: 1.6)),
      cnBodyL: merge(_ts(fontSize: 16, height: 1.6)),
      cnBodyXl: merge(_ts(fontSize: 20)),
      cnBodyMTight: merge(_ts(fontSize: 14)),
      cnDisplayLStrong: merge(_ts(fontSize: 60, fontWeight: FontWeight.w600)),
      cnDisplayMStrong: merge(_ts(fontSize: 48, fontWeight: FontWeight.w600)),
      cnDisplayXsStrong: merge(_ts(fontSize: 28, fontWeight: FontWeight.w600)),
      cnDisplayXxsStrong: merge(_ts(fontSize: 20, fontWeight: FontWeight.w600)),
      cnDisplayXxs: merge(_ts(fontSize: 20)),
      cnDisplayXxxsStrong: merge(_ts(fontSize: 16, fontWeight: FontWeight.w600)),
      cnHeadlineCustom: merge(_ts(fontSize: 20, fontWeight: FontWeight.w600)),
      cnAiHeadlineXsStrong: merge(
        _ts(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: -0.03 * 14,
          fontFamilyFallback: monoFallback,
        ),
      ),
      cnAiHeadlineXxs: merge(
        _ts(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          letterSpacing: -0.03 * 12,
          fontFamilyFallback: monoFallback,
        ),
      ),
      enHeadlineMStrong: merge(_ts(fontSize: 28, fontWeight: FontWeight.w600)),
      enHeadlineMsStrong: merge(_ts(fontSize: 16, fontWeight: FontWeight.w600)),
      enBodyL: merge(_ts(fontSize: 16, height: 1.6)),
      enBodyS: merge(_ts(fontSize: 12)),
    );
  }

  static SystemLightTypography lerp(SystemLightTypography a, SystemLightTypography b, double t) {
    TextStyle l(TextStyle x, TextStyle y) => TextStyle.lerp(x, y, t)!;
    return SystemLightTypography(
      cnHeadlineXxsStrong: l(a.cnHeadlineXxsStrong, b.cnHeadlineXxsStrong),
      cnHeadlineXsStrong: l(a.cnHeadlineXsStrong, b.cnHeadlineXsStrong),
      cnHeadlineSStrong: l(a.cnHeadlineSStrong, b.cnHeadlineSStrong),
      cnHeadlineMStrong: l(a.cnHeadlineMStrong, b.cnHeadlineMStrong),
      cnHeadlineMs: l(a.cnHeadlineMs, b.cnHeadlineMs),
      cnHeadlineMsStrong: l(a.cnHeadlineMsStrong, b.cnHeadlineMsStrong),
      cnBodyXs: l(a.cnBodyXs, b.cnBodyXs),
      cnBodyS: l(a.cnBodyS, b.cnBodyS),
      cnBodyM: l(a.cnBodyM, b.cnBodyM),
      cnBodyL: l(a.cnBodyL, b.cnBodyL),
      cnBodyXl: l(a.cnBodyXl, b.cnBodyXl),
      cnBodyMTight: l(a.cnBodyMTight, b.cnBodyMTight),
      cnDisplayLStrong: l(a.cnDisplayLStrong, b.cnDisplayLStrong),
      cnDisplayMStrong: l(a.cnDisplayMStrong, b.cnDisplayMStrong),
      cnDisplayXsStrong: l(a.cnDisplayXsStrong, b.cnDisplayXsStrong),
      cnDisplayXxsStrong: l(a.cnDisplayXxsStrong, b.cnDisplayXxsStrong),
      cnDisplayXxs: l(a.cnDisplayXxs, b.cnDisplayXxs),
      cnDisplayXxxsStrong: l(a.cnDisplayXxxsStrong, b.cnDisplayXxxsStrong),
      cnHeadlineCustom: l(a.cnHeadlineCustom, b.cnHeadlineCustom),
      cnAiHeadlineXsStrong: l(a.cnAiHeadlineXsStrong, b.cnAiHeadlineXsStrong),
      cnAiHeadlineXxs: l(a.cnAiHeadlineXxs, b.cnAiHeadlineXxs),
      enHeadlineMStrong: l(a.enHeadlineMStrong, b.enHeadlineMStrong),
      enHeadlineMsStrong: l(a.enHeadlineMsStrong, b.enHeadlineMsStrong),
      enBodyL: l(a.enBodyL, b.enBodyL),
      enBodyS: l(a.enBodyS, b.enBodyS),
    );
  }
}
