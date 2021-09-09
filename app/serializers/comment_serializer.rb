# frozen_string_literal: true

class CommentSerializer
  include JSONAPI::Serializer
  set_type :comment
  attributes :id, :profile, :text, :created_at, :updated_at
  # cache_options enabled: true, cache_length: 2.hours
end
