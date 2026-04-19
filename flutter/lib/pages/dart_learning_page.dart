import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../l10n/app_localizations.dart';

/// Runs a small Dart snippet and returns a string for display (debug / learning).
String runDartLearningSample() {
  final numbers = <int>[2, 4, 6];
  final doubled = [for (final n in numbers) n * 2];
  final sum = doubled.fold<int>(0, (a, b) => a + b);
  final buffer = StringBuffer()
    ..writeln('numbers = $numbers')
    ..writeln('doubled = $doubled')
    ..writeln('sum(doubled) = $sum')
    ..writeln('kDebugMode = $kDebugMode');
  return buffer.toString();
}

class DartLearningPage extends StatefulWidget {
  const DartLearningPage({super.key});

  @override
  State<DartLearningPage> createState() => _DartLearningPageState();
}

class _DartLearningPageState extends State<DartLearningPage> {
  String _output = '';

  void _run() {
    setState(() {
      _output = runDartLearningSample();
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final h = l10n.home;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(title: Text(h.dartLearningPageTitle)),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'void main() {\n'
                '  final numbers = <int>[2, 4, 6];\n'
                '  final doubled = [for (final n in numbers) n * 2];\n'
                '  // ...\n'
                '}',
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontFamily: 'monospace',
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 16),
              FilledButton.icon(
                onPressed: _run,
                icon: const Icon(Icons.play_arrow_outlined),
                label: Text(h.dartLearningRunSample),
              ),
              const SizedBox(height: 24),
              Text(
                h.dartLearningOutputHeading,
                style: theme.textTheme.titleSmall,
              ),
              const SizedBox(height: 8),
              Expanded(
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surfaceContainerHighest,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(12),
                    child: SelectableText(
                      _output.isEmpty ? '—' : _output,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontFamily: 'monospace',
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
