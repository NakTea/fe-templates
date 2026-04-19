import 'package:flutter/material.dart';

import 'l10n/app_localizations.dart';
import 'pages/demo_home_page.dart';
import 'pages/learning_route_list_page.dart';

/// Root shell: tab 1 = route list, tab 2 = original counter demo.
class MainTabsPage extends StatefulWidget {
  // ignore: prefer_const_constructors_in_immutables
  MainTabsPage({
    super.key,
    required this.userLocaleOverride,
    required this.onUserLocaleSelected,
    required this.onToggleTheme,
  });

  final Locale? userLocaleOverride;
  final void Function(Locale locale) onUserLocaleSelected;
  final VoidCallback onToggleTheme;

  @override
  State<MainTabsPage> createState() => _MainTabsPageState();
}

class _MainTabsPageState extends State<MainTabsPage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final h = l10n.home;

    return Scaffold(
      body: IndexedStack(
        index: _index,
        children: [
          const LearningRouteListPage(),
          MyHomePage(
            userLocaleOverride: widget.userLocaleOverride,
            onUserLocaleSelected: widget.onUserLocaleSelected,
            onToggleTheme: widget.onToggleTheme,
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.route_outlined),
            selectedIcon: const Icon(Icons.route),
            label: h.tabRoutesLabel,
          ),
          NavigationDestination(
            icon: const Icon(Icons.home_outlined),
            selectedIcon: const Icon(Icons.home),
            label: h.tabDemoLabel,
          ),
        ],
      ),
    );
  }
}
