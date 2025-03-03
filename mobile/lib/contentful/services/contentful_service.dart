import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/contentful_config.dart';
import '../models/content_model.dart';

class ContentfulService {
  final http.Client _client = http.Client();

  // Helper method to build headers
  Map<String, String> get _headers => {
        'Authorization': 'Bearer ${ContentfulConfig.accessToken}',
        'Content-Type': 'application/json',
      };

  // Helper method to build query parameters
  Map<String, String> _buildQueryParams({
    String? contentType,
    int limit = 10,
    int skip = 0,
  }) {
    return {
      if (contentType != null) 'content_type': contentType,
      'limit': limit.toString(),
      'skip': skip.toString(),
    };
  }

  Future<List<ContentModel>> getEntries({
    String? contentType,
    int limit = 10,
    int skip = 0,
  }) async {
    try {
      final uri = Uri.https(
        'cdn.contentful.com',
        '/spaces/${ContentfulConfig.spaceId}/environments/${ContentfulConfig.environment}/entries',
        _buildQueryParams(contentType: contentType, limit: limit, skip: skip),
      );

      final response = await _client.get(uri, headers: _headers);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final items = data['items'] as List;
        
        return items.map((item) {
          final fields = item['fields'] as Map<String, dynamic>;
          return ContentModel(
            id: item['sys']['id'],
            title: fields['title'] ?? '',
            description: fields['description'] ?? '',
          );
        }).toList();
      } else {
        throw Exception('Failed to load entries: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching entries: $e');
    }
  }

  Future<ContentModel?> getEntryById(String entryId) async {
    try {
      final uri = Uri.https(
        'cdn.contentful.com',
        '/spaces/${ContentfulConfig.spaceId}/environments/${ContentfulConfig.environment}/entries/$entryId',
      );

      final response = await _client.get(uri, headers: _headers);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final fields = data['fields'] as Map<String, dynamic>;
        
        return ContentModel(
          id: data['sys']['id'],
          title: fields['title'] ?? '',
          description: fields['description'] ?? '',
        );
      } else {
        throw Exception('Failed to load entry: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching entry: $e');
    }
  }
} 