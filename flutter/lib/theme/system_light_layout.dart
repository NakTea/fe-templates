import 'package:flutter/material.dart';

/// 圆角（对应 React `systemLight` 的 Radius 段）。
@immutable
class SystemLightRadii {
  const SystemLightRadii({
    required this.radiusImageS,
    required this.radiusImageM,
    required this.radiusInCard,
    required this.radiusCard,
    required this.radiusChat,
    required this.radiusSheet,
    required this.radiusComp0,
    required this.radiusComp1,
    required this.radiusComp2,
  });

  final double radiusImageS;
  final double radiusImageM;
  final double radiusInCard;
  final double radiusCard;
  final double radiusChat;
  final double radiusSheet;
  final double radiusComp0;
  final double radiusComp1;
  final double radiusComp2;

  static SystemLightRadii lerp(SystemLightRadii a, SystemLightRadii b, double t) {
    double l(double x, double y) => x + (y - x) * t;
    return SystemLightRadii(
      radiusImageS: l(a.radiusImageS, b.radiusImageS),
      radiusImageM: l(a.radiusImageM, b.radiusImageM),
      radiusInCard: l(a.radiusInCard, b.radiusInCard),
      radiusCard: l(a.radiusCard, b.radiusCard),
      radiusChat: l(a.radiusChat, b.radiusChat),
      radiusSheet: l(a.radiusSheet, b.radiusSheet),
      radiusComp0: l(a.radiusComp0, b.radiusComp0),
      radiusComp1: l(a.radiusComp1, b.radiusComp1),
      radiusComp2: l(a.radiusComp2, b.radiusComp2),
    );
  }
}

/// 间距与卡片内边距（Spacing 段）。
@immutable
class SystemLightSpacing {
  const SystemLightSpacing({
    required this.spaceElementsMin,
    required this.spaceElementsXxxs,
    required this.spaceElementsXxs,
    required this.spaceElementsXs,
    required this.spaceElementsS,
    required this.spaceElementsM,
    required this.spaceElementsL,
    required this.spaceElementsXl,
    required this.spaceCardPaddingUpdownS,
    required this.spaceCardPaddingLeftRightS,
    required this.spaceCardPaddingUpdownXs,
    required this.spaceCardPaddingLeftRightXs,
    required this.spaceCardPaddingXms,
    required this.spaceCardPaddingLeftRightXxs,
    required this.spaceCardPaddingLeftRightXxxs,
  });

  final double spaceElementsMin;
  final double spaceElementsXxxs;
  final double spaceElementsXxs;
  final double spaceElementsXs;
  final double spaceElementsS;
  final double spaceElementsM;
  final double spaceElementsL;
  final double spaceElementsXl;
  final double spaceCardPaddingUpdownS;
  final double spaceCardPaddingLeftRightS;
  final double spaceCardPaddingUpdownXs;
  final double spaceCardPaddingLeftRightXs;
  final double spaceCardPaddingXms;
  final double spaceCardPaddingLeftRightXxs;
  final double spaceCardPaddingLeftRightXxxs;

  static SystemLightSpacing lerp(SystemLightSpacing a, SystemLightSpacing b, double t) {
    double l(double x, double y) => x + (y - x) * t;
    return SystemLightSpacing(
      spaceElementsMin: l(a.spaceElementsMin, b.spaceElementsMin),
      spaceElementsXxxs: l(a.spaceElementsXxxs, b.spaceElementsXxxs),
      spaceElementsXxs: l(a.spaceElementsXxs, b.spaceElementsXxs),
      spaceElementsXs: l(a.spaceElementsXs, b.spaceElementsXs),
      spaceElementsS: l(a.spaceElementsS, b.spaceElementsS),
      spaceElementsM: l(a.spaceElementsM, b.spaceElementsM),
      spaceElementsL: l(a.spaceElementsL, b.spaceElementsL),
      spaceElementsXl: l(a.spaceElementsXl, b.spaceElementsXl),
      spaceCardPaddingUpdownS: l(a.spaceCardPaddingUpdownS, b.spaceCardPaddingUpdownS),
      spaceCardPaddingLeftRightS: l(a.spaceCardPaddingLeftRightS, b.spaceCardPaddingLeftRightS),
      spaceCardPaddingUpdownXs: l(a.spaceCardPaddingUpdownXs, b.spaceCardPaddingUpdownXs),
      spaceCardPaddingLeftRightXs: l(a.spaceCardPaddingLeftRightXs, b.spaceCardPaddingLeftRightXs),
      spaceCardPaddingXms: l(a.spaceCardPaddingXms, b.spaceCardPaddingXms),
      spaceCardPaddingLeftRightXxs: l(a.spaceCardPaddingLeftRightXxs, b.spaceCardPaddingLeftRightXxs),
      spaceCardPaddingLeftRightXxxs: l(a.spaceCardPaddingLeftRightXxxs, b.spaceCardPaddingLeftRightXxxs),
    );
  }
}

/// 图标、组件高度、头像、按钮等尺寸（Sizes 段）。
@immutable
class SystemLightMeasures {
  const SystemLightMeasures({
    required this.sizeIconXs,
    required this.sizeIconM,
    required this.sizeIconXl,
    required this.sizeIconXxl,
    required this.sizeIconTab,
    required this.sizeCompXxxs,
    required this.sizeComphXxs,
    required this.sizeComphXs,
    required this.sizeComphS,
    required this.sizeComphM,
    required this.sizeSwitch,
    required this.sizeComphMin,
    required this.sizeComphWM,
    required this.sizeComphWXl,
    required this.sizeComphWXxl,
    required this.sizeAvatarL,
    required this.sizeAvatarM,
    required this.sizeAvatarS,
    required this.sizeAvatarXs,
    required this.sizeAvatarXxs,
    required this.sizeButtonXs,
  });

  final double sizeIconXs;
  final double sizeIconM;
  final double sizeIconXl;
  final double sizeIconXxl;
  final double sizeIconTab;
  final double sizeCompXxxs;
  final double sizeComphXxs;
  final double sizeComphXs;
  final double sizeComphS;
  final double sizeComphM;
  final double sizeSwitch;
  final double sizeComphMin;
  final double sizeComphWM;
  final double sizeComphWXl;
  final double sizeComphWXxl;
  final double sizeAvatarL;
  final double sizeAvatarM;
  final double sizeAvatarS;
  final double sizeAvatarXs;
  final double sizeAvatarXxs;
  final double sizeButtonXs;

  static SystemLightMeasures lerp(SystemLightMeasures a, SystemLightMeasures b, double t) {
    double l(double x, double y) => x + (y - x) * t;
    return SystemLightMeasures(
      sizeIconXs: l(a.sizeIconXs, b.sizeIconXs),
      sizeIconM: l(a.sizeIconM, b.sizeIconM),
      sizeIconXl: l(a.sizeIconXl, b.sizeIconXl),
      sizeIconXxl: l(a.sizeIconXxl, b.sizeIconXxl),
      sizeIconTab: l(a.sizeIconTab, b.sizeIconTab),
      sizeCompXxxs: l(a.sizeCompXxxs, b.sizeCompXxxs),
      sizeComphXxs: l(a.sizeComphXxs, b.sizeComphXxs),
      sizeComphXs: l(a.sizeComphXs, b.sizeComphXs),
      sizeComphS: l(a.sizeComphS, b.sizeComphS),
      sizeComphM: l(a.sizeComphM, b.sizeComphM),
      sizeSwitch: l(a.sizeSwitch, b.sizeSwitch),
      sizeComphMin: l(a.sizeComphMin, b.sizeComphMin),
      sizeComphWM: l(a.sizeComphWM, b.sizeComphWM),
      sizeComphWXl: l(a.sizeComphWXl, b.sizeComphWXl),
      sizeComphWXxl: l(a.sizeComphWXxl, b.sizeComphWXxl),
      sizeAvatarL: l(a.sizeAvatarL, b.sizeAvatarL),
      sizeAvatarM: l(a.sizeAvatarM, b.sizeAvatarM),
      sizeAvatarS: l(a.sizeAvatarS, b.sizeAvatarS),
      sizeAvatarXs: l(a.sizeAvatarXs, b.sizeAvatarXs),
      sizeAvatarXxs: l(a.sizeAvatarXxs, b.sizeAvatarXxs),
      sizeButtonXs: l(a.sizeButtonXs, b.sizeButtonXs),
    );
  }
}
