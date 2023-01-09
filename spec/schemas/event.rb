# frozen_string_literal: true

module SpecSchemas
  class Event
    def self.response
      {
        "type": 'object',
        
        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Event.schema
          }
        }
      }
    end

    def self.schema
      {
        "type": 'object',
        "required": %w[id type attributes],
        "properties": {
          "id": { "type": 'string' },
          "type": { "type": 'string' },
          "attributes": {
            "type": 'object',
            "required": %w[
              date_string
              id
              public
              likes
              content
              user_name
              user_id
              user_avatar
              event_name
              liked
              comments
              comments_count
              position
            ],
            "properties": {
              "content": { type: 'string' },
              "extra_content": { "type": 'string', "nullable": true },
              "id": { type: 'integer' },
              "date_string": { type: 'string' },
              "user_id": { type: 'integer' },
              "user_name": { type: 'string' },
              "comments": { type: 'array', "items": SpecSchemas::Comment.schema },
              "comments_count": { type: 'integer' },
              "user_avatar": SpecSchemas::User.avatar,
              "liked": { "type": 'boolean' },
              "likes": {
                "type": 'array',
                "items": SpecSchemas::Like.schema
              },
              "public": { "type": 'boolean' },
              "position": {type:'string'}
            }
          }
        }
      }
    end
  end
end
