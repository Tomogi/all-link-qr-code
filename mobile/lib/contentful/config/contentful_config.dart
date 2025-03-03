class ContentfulConfig {
  static const String spaceId = 'YOUR_SPACE_ID';
  static const String accessToken = 'YOUR_ACCESS_TOKEN';
  static const String environment = 'master'; // or your custom environment
  
  // Contentful API endpoints
  static const String baseUrl = 'https://cdn.contentful.com';
  static const String contentTypesEndpoint = '/spaces/$spaceId/environments/$environment/content_types';
  static const String entriesEndpoint = '/spaces/$spaceId/environments/$environment/entries';
} 