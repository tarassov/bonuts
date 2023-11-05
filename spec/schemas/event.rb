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
              profile_id
              user_avatar
              event_name
              liked
              comments
              comments_count
              position
            ],
            "properties": {
              "content": { type: 'string' },
              "event_name": { type: 'string', "nullable": true },
              "extra_content": { "type": 'string', "nullable": true },
              "id": { type: 'integer' },
              "date_string": { type: 'string' },
              "date_string_utc": { type: 'string' },
              "profile_id": { type: 'integer' },
              "user_id": { type: 'integer' },
              "user_name": { type: 'string' },
              "comments": { type: 'array', "items": SpecSchemas::Comment.schema },
              "comments_count": { type: 'integer' },
              "user_avatar": SpecSchemas::User.avatar,
              editable: { type: 'boolean' },
              "liked": { "type": 'boolean' },
              "likes": {
                "type": 'array',
                "items": SpecSchemas::Like.schema
              },
              "public": { "type": 'boolean' },
              "position": { type: 'string' },
              operation: { "anyOf": [{
                "required": %w[
                  created_at
                  id
                ],
                "type": 'object',
                "properties": {
                  id: { type: 'integer' },
                  direction: { type: 'integer' },
                  amount: { type: 'integer' },
                  deal_type: { type: 'string' },
                  created_at: { type: 'string' },
                  created_at_utc: { type: 'string' },
                  to_user_name: { type: 'string' },
                  to_profile: {
                    "type": 'object',
                    "required": %w[
                      name
                      id
                    ],
                    "properties": {
                      id: { type: 'integer' },
                      user_name: { type: 'string' },
                      user_avatar: SpecSchemas::User.avatar,
                      position: { type: 'string' }
                    }
                  }
                }
              }, { type: 'null' }] }
            }
          }
        }
      }
    end
  end
end
