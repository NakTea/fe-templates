import 'package:flutter/material.dart';

import '../l10n/app_localizations.dart';

/// 实验用名片布局页面。
///
/// 关于 Material [Icons]、与 React import 方式的对比、以及如何换图标来源，见项目文档
/// `document/icon.md`。
class BusinessCardPage extends StatelessWidget {
  const BusinessCardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text("我的第一周作业")),
      body: Center(
        child: Container(
          width: 200,
          color: Colors.white,
          padding: const EdgeInsets.all(16),
          // Column 垂直排列；mainAxisSize.min 让高度随子组件收缩，否则在 Center 里会占满整屏高度
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center, // 内容垂直居中
            children: [
              Icon(Icons.star, color: Colors.orange, size: 40),
              Text("张三"),
              Text("13800138000"),
              Text("zhangsan@example.com"),
              Text("上海市浦东新区"),
              Text("2000-01-01"),
              Text("男"),
              Text("本科"),
              Text("2020-01-01"),
            ],
          ),
        ),
      ),
    );
  }
}
