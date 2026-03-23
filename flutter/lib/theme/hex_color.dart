import 'package:flutter/material.dart';

/// 解析 `#RRGGBB` / `#RRGGBBAA`（与 Web CSS 一致：末尾两位为 alpha）。
Color colorFromHex(String hex) {
  var s = hex.replaceFirst('#', '');
  if (s.length == 6) {
    return Color(0xFF000000 | int.parse(s, radix: 16));
  }
  if (s.length == 8) {
    final v = int.parse(s, radix: 16);
    final r = (v >> 24) & 0xFF;
    final g = (v >> 16) & 0xFF;
    final b = (v >> 8) & 0xFF;
    final a = v & 0xFF;
    return Color.fromARGB(a, r, g, b);
  }
  throw ArgumentError.value(hex, 'hex', 'Expected #RRGGBB or #RRGGBBAA');
}
