class ContentfulConfig {
  static const String spaceId = 'z68ov00izx50';
  static const String accessToken = 'P3JvHUkwwhPJACspVUeo9scfoNiQDVIDq3qS5xXtzOk';
  static const String environment = 'master'; // or your custom environment
  
  // Contentful API endpoints
  static const String baseUrl = 'https://cdn.contentful.com';
  static const String contentTypesEndpoint = '/spaces/$spaceId/environments/$environment/content_types';
  static const String entriesEndpoint = '/spaces/$spaceId/environments/$environment/entries';
} 