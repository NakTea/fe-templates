import 'package:flutter/material.dart';

import 'system_light_layout.dart';
import 'system_palette.dart';
import 'system_light_typography.dart';

/// 与 React `systemLight` / `systemDark` 对齐的设计令牌（圆角、间距、尺寸共用；颜色随 [palette] 变化）。
@immutable
class SystemTokens extends ThemeExtension<SystemTokens> {
  const SystemTokens({
    required this.radii,
    required this.spacing,
    required this.measures,
    required this.palette,
    required this.typography,
    required this.containerLinearGradient,
    required this.backgroundBlurGradient,
  });

  final SystemLightRadii radii;
  final SystemLightSpacing spacing;
  final SystemLightMeasures measures;
  final SystemPalette palette;
  final SystemLightTypography typography;

  /// `linear-gradient(0deg, #ECECEC 0%, rgba(236,236,236,0) 50%)`（明暗主题与 React 配置相同）
  final LinearGradient containerLinearGradient;

  /// `linear-gradient(45deg, #91F9ED 0%, #F0FFDF 100%)`
  final LinearGradient backgroundBlurGradient;

  static const SystemLightRadii _radii = SystemLightRadii(
    radiusImageS: 4,
    radiusImageM: 8,
    radiusInCard: 10,
    radiusCard: 16,
    radiusChat: 16,
    radiusSheet: 36,
    radiusComp0: 8,
    radiusComp1: 10,
    radiusComp2: 4,
  );

  static const SystemLightSpacing _spacing = SystemLightSpacing(
    spaceElementsMin: 0,
    spaceElementsXxxs: 2,
    spaceElementsXxs: 4,
    spaceElementsXs: 8,
    spaceElementsS: 12,
    spaceElementsM: 16,
    spaceElementsL: 20,
    spaceElementsXl: 24,
    spaceCardPaddingUpdownS: 20,
    spaceCardPaddingLeftRightS: 20,
    spaceCardPaddingUpdownXs: 12,
    spaceCardPaddingLeftRightXs: 16,
    spaceCardPaddingXms: 12,
    spaceCardPaddingLeftRightXxs: 8,
    spaceCardPaddingLeftRightXxxs: 4,
  );

  static const SystemLightMeasures _measures = SystemLightMeasures(
    sizeIconXs: 16,
    sizeIconM: 24,
    sizeIconXl: 36,
    sizeIconXxl: 48,
    sizeIconTab: 36,
    sizeCompXxxs: 16,
    sizeComphXxs: 20,
    sizeComphXs: 28,
    sizeComphS: 44,
    sizeComphM: 52,
    sizeSwitch: 22,
    sizeComphMin: 4,
    sizeComphWM: 40,
    sizeComphWXl: 88,
    sizeComphWXxl: 104,
    sizeAvatarL: 100,
    sizeAvatarM: 64,
    sizeAvatarS: 44,
    sizeAvatarXs: 32,
    sizeAvatarXxs: 18,
    sizeButtonXs: 34,
  );

  static const LinearGradient _containerLinearGradient = LinearGradient(
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
    colors: [
      Color(0xFFECECEC),
      Color(0x00ECECEC),
    ],
    stops: [0, 0.5],
  );

  static const LinearGradient _backgroundBlurGradient = LinearGradient(
    begin: Alignment(-1, 1),
    end: Alignment(1, -1),
    colors: [Color(0xFF91F9ED), Color(0xFFF0FFDF)],
  );

  factory SystemTokens.withTypography(
    SystemLightTypography typography, {
    SystemPalette? palette,
  }) {
    return SystemTokens(
      radii: _radii,
      spacing: _spacing,
      measures: _measures,
      palette: palette ?? SystemPalette.light,
      typography: typography,
      containerLinearGradient: _containerLinearGradient,
      backgroundBlurGradient: _backgroundBlurGradient,
    );
  }

  @override
  SystemTokens copyWith({
    SystemLightRadii? radii,
    SystemLightSpacing? spacing,
    SystemLightMeasures? measures,
    SystemPalette? palette,
    SystemLightTypography? typography,
    LinearGradient? containerLinearGradient,
    LinearGradient? backgroundBlurGradient,
  }) {
    return SystemTokens(
      radii: radii ?? this.radii,
      spacing: spacing ?? this.spacing,
      measures: measures ?? this.measures,
      palette: palette ?? this.palette,
      typography: typography ?? this.typography,
      containerLinearGradient: containerLinearGradient ?? this.containerLinearGradient,
      backgroundBlurGradient: backgroundBlurGradient ?? this.backgroundBlurGradient,
    );
  }

  @override
  SystemTokens lerp(ThemeExtension<SystemTokens>? other, double t) {
    if (other is! SystemTokens) return this;
    return SystemTokens(
      radii: SystemLightRadii.lerp(radii, other.radii, t),
      spacing: SystemLightSpacing.lerp(spacing, other.spacing, t),
      measures: SystemLightMeasures.lerp(measures, other.measures, t),
      palette: SystemPalette.lerp(palette, other.palette, t),
      typography: SystemLightTypography.lerp(typography, other.typography, t),
      containerLinearGradient:
          LinearGradient.lerp(containerLinearGradient, other.containerLinearGradient, t)!,
      backgroundBlurGradient:
          LinearGradient.lerp(backgroundBlurGradient, other.backgroundBlurGradient, t)!,
    );
  }
}

extension SystemTokensContext on BuildContext {
  SystemTokens? get systemTokens => Theme.of(this).extension<SystemTokens>();

  /// 兼容旧命名；明暗主题下均为当前 [SystemTokens]。
  SystemTokens? get systemLightTokens => systemTokens;
}

/// 兼容旧类型名。
typedef SystemLightTokens = SystemTokens;
