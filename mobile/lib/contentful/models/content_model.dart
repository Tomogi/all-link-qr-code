import 'package:json_annotation/json_annotation.dart';

part 'content_model.g.dart';

@JsonSerializable()
class ContentModel {
  final String id;
  final String title;
  final String description;
  
  ContentModel({
    required this.id,
    required this.title,
    required this.description,
  });

  factory ContentModel.fromJson(Map<String, dynamic> json) => _$ContentModelFromJson(json);
  Map<String, dynamic> toJson() => _$ContentModelToJson(this);
} 