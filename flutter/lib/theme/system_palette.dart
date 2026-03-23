import 'package:flutter/material.dart';

import 'hex_color.dart';

/// 颜色令牌（Text & Icon、Container、Divider、Border、Chart），与 React `systemLight` / `systemDark` 字段一致。
@immutable
class SystemPalette {
  const SystemPalette({
    required this.iconPrimary,
    required this.iconInverseVar,
    required this.iconInverse,
    required this.textPrimary,
    required this.textTitle,
    required this.textPrimaryDisabled,
    required this.textInverse,
    required this.textInverseVar,
    required this.textSecondary,
    required this.textErrorDefault,
    required this.textInfoDefault,
    required this.textWarningDefault,
    required this.textCautionDefault,
    required this.textMethodDefault,
    required this.textSuccessDefault,
    required this.textBtDefault,
    required this.containerPrimary,
    required this.containerPrimaryWeather,
    required this.containerSecondary,
    required this.containerTertiary,
    required this.containerFifth,
    required this.containerPrimaryDisabled,
    required this.containerBpDefault,
    required this.containerBpPress,
    required this.containerBpDisabled,
    required this.containerBsDefault,
    required this.containerBsPress,
    required this.containerBsDisabled,
    required this.containerBpWeakDefault,
    required this.containerErrorWeakDefault,
    required this.containerWarningWeakDefault,
    required this.containerInfoWeakDefault,
    required this.containerCautionWeakDefault,
    required this.containerSwitchOffDisabled,
    required this.containerBtWeakDefault,
    required this.background,
    required this.dividerDefault,
    required this.dividerList,
    required this.dividerBp,
    required this.borderWeakDefault,
    required this.borderBtWeakDefault,
    required this.borderDefault,
    required this.chartBorderRain,
    required this.chartBgRain,
  });

  final Color iconPrimary;
  final Color iconInverseVar;
  final Color iconInverse;
  final Color textPrimary;
  final Color textTitle;
  final Color textPrimaryDisabled;
  final Color textInverse;
  final Color textInverseVar;
  final Color textSecondary;
  final Color textErrorDefault;
  final Color textInfoDefault;
  final Color textWarningDefault;
  final Color textCautionDefault;
  final Color textMethodDefault;
  final Color textSuccessDefault;
  final Color textBtDefault;
  final Color containerPrimary;
  final Color containerPrimaryWeather;
  final Color containerSecondary;
  final Color containerTertiary;
  final Color containerFifth;
  final Color containerPrimaryDisabled;
  final Color containerBpDefault;
  final Color containerBpPress;
  final Color containerBpDisabled;
  final Color containerBsDefault;
  final Color containerBsPress;
  final Color containerBsDisabled;
  final Color containerBpWeakDefault;
  final Color containerErrorWeakDefault;
  final Color containerWarningWeakDefault;
  final Color containerInfoWeakDefault;
  final Color containerCautionWeakDefault;
  final Color containerSwitchOffDisabled;
  final Color containerBtWeakDefault;
  final Color background;
  final Color dividerDefault;
  final Color dividerList;
  final Color dividerBp;
  final Color borderWeakDefault;
  final Color borderBtWeakDefault;
  final Color borderDefault;
  final Color chartBorderRain;
  final Color chartBgRain;

  static SystemPalette lerp(SystemPalette a, SystemPalette b, double t) {
    Color c(Color x, Color y) => Color.lerp(x, y, t)!;
    return SystemPalette(
      iconPrimary: c(a.iconPrimary, b.iconPrimary),
      iconInverseVar: c(a.iconInverseVar, b.iconInverseVar),
      iconInverse: c(a.iconInverse, b.iconInverse),
      textPrimary: c(a.textPrimary, b.textPrimary),
      textTitle: c(a.textTitle, b.textTitle),
      textPrimaryDisabled: c(a.textPrimaryDisabled, b.textPrimaryDisabled),
      textInverse: c(a.textInverse, b.textInverse),
      textInverseVar: c(a.textInverseVar, b.textInverseVar),
      textSecondary: c(a.textSecondary, b.textSecondary),
      textErrorDefault: c(a.textErrorDefault, b.textErrorDefault),
      textInfoDefault: c(a.textInfoDefault, b.textInfoDefault),
      textWarningDefault: c(a.textWarningDefault, b.textWarningDefault),
      textCautionDefault: c(a.textCautionDefault, b.textCautionDefault),
      textMethodDefault: c(a.textMethodDefault, b.textMethodDefault),
      textSuccessDefault: c(a.textSuccessDefault, b.textSuccessDefault),
      textBtDefault: c(a.textBtDefault, b.textBtDefault),
      containerPrimary: c(a.containerPrimary, b.containerPrimary),
      containerPrimaryWeather: c(a.containerPrimaryWeather, b.containerPrimaryWeather),
      containerSecondary: c(a.containerSecondary, b.containerSecondary),
      containerTertiary: c(a.containerTertiary, b.containerTertiary),
      containerFifth: c(a.containerFifth, b.containerFifth),
      containerPrimaryDisabled: c(a.containerPrimaryDisabled, b.containerPrimaryDisabled),
      containerBpDefault: c(a.containerBpDefault, b.containerBpDefault),
      containerBpPress: c(a.containerBpPress, b.containerBpPress),
      containerBpDisabled: c(a.containerBpDisabled, b.containerBpDisabled),
      containerBsDefault: c(a.containerBsDefault, b.containerBsDefault),
      containerBsPress: c(a.containerBsPress, b.containerBsPress),
      containerBsDisabled: c(a.containerBsDisabled, b.containerBsDisabled),
      containerBpWeakDefault: c(a.containerBpWeakDefault, b.containerBpWeakDefault),
      containerErrorWeakDefault: c(a.containerErrorWeakDefault, b.containerErrorWeakDefault),
      containerWarningWeakDefault: c(a.containerWarningWeakDefault, b.containerWarningWeakDefault),
      containerInfoWeakDefault: c(a.containerInfoWeakDefault, b.containerInfoWeakDefault),
      containerCautionWeakDefault: c(a.containerCautionWeakDefault, b.containerCautionWeakDefault),
      containerSwitchOffDisabled: c(a.containerSwitchOffDisabled, b.containerSwitchOffDisabled),
      containerBtWeakDefault: c(a.containerBtWeakDefault, b.containerBtWeakDefault),
      background: c(a.background, b.background),
      dividerDefault: c(a.dividerDefault, b.dividerDefault),
      dividerList: c(a.dividerList, b.dividerList),
      dividerBp: c(a.dividerBp, b.dividerBp),
      borderWeakDefault: c(a.borderWeakDefault, b.borderWeakDefault),
      borderBtWeakDefault: c(a.borderBtWeakDefault, b.borderBtWeakDefault),
      borderDefault: c(a.borderDefault, b.borderDefault),
      chartBorderRain: c(a.chartBorderRain, b.chartBorderRain),
      chartBgRain: c(a.chartBgRain, b.chartBgRain),
    );
  }

  /// React `systemLight`
  static SystemPalette get light => SystemPalette(
        iconPrimary: colorFromHex('#2B2D28'),
        iconInverseVar: colorFromHex('#FFFFFFE6'),
        iconInverse: colorFromHex('#FFFFFF'),
        textPrimary: colorFromHex('#2B2D28'),
        textTitle: colorFromHex('#2B2D28'),
        textPrimaryDisabled: colorFromHex('#2B2D281A'),
        textInverse: colorFromHex('#FFFFFF'),
        textInverseVar: colorFromHex('#FFFFFF'),
        textSecondary: colorFromHex('#2B2D2880'),
        textErrorDefault: colorFromHex('#EF2727'),
        textInfoDefault: colorFromHex('#7280D3'),
        textWarningDefault: colorFromHex('#E08C3A'),
        textCautionDefault: colorFromHex('#F5AA65'),
        textMethodDefault: colorFromHex('#DAF991'),
        textSuccessDefault: colorFromHex('#2A8A5A'),
        textBtDefault: colorFromHex('#997B1B'),
        containerPrimary: colorFromHex('#FFFFFF'),
        containerPrimaryWeather: colorFromHex('#3F71CAB3'),
        containerSecondary: colorFromHex('#2B2D280D'),
        containerTertiary: colorFromHex('#D7E2F9'),
        containerFifth: colorFromHex('#E4F2DD'),
        containerPrimaryDisabled: colorFromHex('#D3D3D3'),
        containerBpDefault: colorFromHex('#2B2D28'),
        containerBpPress: colorFromHex('#2B2D28'),
        containerBpDisabled: colorFromHex('#2B2D28'),
        containerBsDefault: colorFromHex('#0000001A'),
        containerBsPress: colorFromHex('#0000001A'),
        containerBsDisabled: colorFromHex('#FFFFFF66'),
        containerBpWeakDefault: colorFromHex('#D7E2F9'),
        containerErrorWeakDefault: colorFromHex('#D94838'),
        containerWarningWeakDefault: colorFromHex('#F9E291'),
        containerInfoWeakDefault: colorFromHex('#E4F2DD'),
        containerCautionWeakDefault: colorFromHex('#F9E291'),
        containerSwitchOffDisabled: colorFromHex('#FFFFFF66'),
        containerBtWeakDefault: colorFromHex('#EDECE1'),
        background: colorFromHex('#F4F4F4'),
        dividerDefault: colorFromHex('#FFFFFF33'),
        dividerList: colorFromHex('#2B2D281A'),
        dividerBp: colorFromHex('#67A78D'),
        borderWeakDefault: colorFromHex('#2B2D281A'),
        borderBtWeakDefault: colorFromHex('#E6E5D9'),
        borderDefault: colorFromHex('#FFFFFF'),
        chartBorderRain: colorFromHex('#AEE0CC'),
        chartBgRain: colorFromHex('#AEE0CC1A'),
      );

  /// React `systemDark`
  static SystemPalette get dark => SystemPalette(
        iconPrimary: colorFromHex('#FFFFFFE6'),
        iconInverseVar: colorFromHex('#000000'),
        iconInverse: colorFromHex('#FFFFFFCC'),
        textPrimary: colorFromHex('#FFFFFF'),
        textTitle: colorFromHex('#FFFFFF66'),
        textPrimaryDisabled: colorFromHex('#FFFFFF66'),
        textInverse: colorFromHex('#FFFFFF'),
        textInverseVar: colorFromHex('#000000'),
        textSecondary: colorFromHex('#FFFFFF99'),
        textErrorDefault: colorFromHex('#D94838'),
        textInfoDefault: colorFromHex('#4796C4'),
        textWarningDefault: colorFromHex('#E08C3A'),
        textCautionDefault: colorFromHex('#D1A738'),
        textMethodDefault: colorFromHex('#4796C4'),
        textSuccessDefault: colorFromHex('#2A8A5A'),
        textBtDefault: colorFromHex('#997B1B'),
        containerPrimary: colorFromHex('#00000066'),
        containerPrimaryWeather: colorFromHex('#3F71CAB3'),
        containerSecondary: colorFromHex('#FFFFFF26'),
        containerTertiary: colorFromHex('#0000001A'),
        containerFifth: colorFromHex('#FFFFFF19'),
        containerPrimaryDisabled: colorFromHex('#FFFFFF26'),
        containerBpDefault: colorFromHex('#317AF7'),
        containerBpPress: colorFromHex('#407FFF'),
        containerBpDisabled: colorFromHex('#317AF766'),
        containerBsDefault: colorFromHex('#FFFFFF26'),
        containerBsPress: colorFromHex('#FFFFFF4D'),
        containerBsDisabled: colorFromHex('#FFFFFF66'),
        containerBpWeakDefault: colorFromHex('#FFFFFF26'),
        containerErrorWeakDefault: colorFromHex('#D94838'),
        containerWarningWeakDefault: colorFromHex('#E08C3A4D'),
        containerInfoWeakDefault: colorFromHex('#4796C44D'),
        containerCautionWeakDefault: colorFromHex('#E08C3A4D'),
        containerSwitchOffDisabled: colorFromHex('#FFFFFF66'),
        containerBtWeakDefault: colorFromHex('#EDECE1'),
        background: colorFromHex('#2B2D28'),
        dividerDefault: colorFromHex('#FFFFFF33'),
        dividerList: colorFromHex('#FFFFFF19'),
        dividerBp: colorFromHex('#317AF7'),
        borderWeakDefault: colorFromHex('#FFFFFF19'),
        borderBtWeakDefault: colorFromHex('#E6E5D9'),
        borderDefault: colorFromHex('#FFFFFF'),
        chartBorderRain: colorFromHex('#13AEF1'),
        chartBgRain: colorFromHex('#13AEF11A'),
      );

  /// 与 [light] 相同，便于旧文档或代码检索。
  static SystemPalette get standard => light;
}

/// 兼容旧命名，等同于 [SystemPalette]。
typedef SystemLightPalette = SystemPalette;
