import 'package:flutter/material.dart';
import 'package:flutter_app/contentful/models/content_model.dart';
import 'contentful/services/contentful_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  List<ContentModel> _entries = [];
  
  final _contentfulService = ContentfulService();

  @override
  void initState() {
    super.initState();
    _fetchEntries();
  }

  Future<void> _fetchEntries() async {
    try {
      final entries = await _contentfulService.getEntries();
      print('Fetched entries: ${entries.map((entry) => 'ID: ${entry.id}, Title: ${entry.title}, Description: ${entry.description}').toList()}');
      setState(() {
        _entries = entries;
      });
      print('Fetched entries: $_entries'); // Debug print
    } catch (e) {
      print('Error fetching entries: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Column(
        children: [
          Expanded(
            child: _entries.isEmpty 
              ? const Center(child: CircularProgressIndicator())
              : ListView.builder(
                  itemCount: _entries.length,
                  itemBuilder: (context, index) {
                    final item = _entries[index];
                    return ListTile(
                      title: Text(item.title),
                      subtitle: Text(item.description),
                    );
                  },
                ),
          ),
        ],
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: _fetchEntries,
            tooltip: 'Refresh Entries',
            child: const Icon(Icons.refresh),
          ),
          // const SizedBox(width: 16),
          // FloatingActionButton(
          //   onPressed: _incrementCounter,
          //   tooltip: 'Increment',
          //   child: const Icon(Icons.add),
          // ),
        ],
      ),
    );
  }
} 