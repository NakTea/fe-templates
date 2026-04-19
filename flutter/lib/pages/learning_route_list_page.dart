import 'package:flutter/material.dart';

import '../l10n/app_localizations.dart';
import 'business_card_page.dart';
import 'dart_learning_page.dart';

/// First tab: list of learning routes.
class LearningRouteListPage extends StatelessWidget {
  const LearningRouteListPage({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final h = l10n.home;

    return Scaffold(
      appBar: AppBar(title: Text(h.shellRoutesPageTitle)),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: [
          ListTile(
            leading: const Icon(Icons.code_outlined),
            title: Text(h.routeDartLearning),
            subtitle: Text(h.routeDartLearningSubtitle),
            onTap: () {
              Navigator.of(context).push<void>(
                MaterialPageRoute<void>(
                  builder: (_) => const DartLearningPage(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.badge_outlined),
            title: Text(h.routeBusinessCard),
            subtitle: Text(h.routeBusinessCardSubtitle),
            onTap: () {
              Navigator.of(context).push<void>(
                MaterialPageRoute<void>(
                  builder: (_) => const BusinessCardPage(),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
