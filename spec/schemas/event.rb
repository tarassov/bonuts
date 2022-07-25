# frozen_string_literal: true

module SpecSchemas
  class Event
    def self.response
      {
        "type": 'object',
        "required": [],
        "properties": {
          "data": {
            "type": 'array',
            "items": {
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
                  ],
                  "properties": {
                    "content": { type: 'string' },
                    "extra_content": { type: 'string' },
                    "id": { type: 'integer' },
                    "date_string": { type: 'string' },
                    "user_id": { type: 'integer' },
                    "user_name": { type: 'string' },
                    "comments": { type: 'null' },
                    "comment_count": { type: 'integer' },
                    "user_avatar": SpecSchemas::User.avatar,
                    "liked": { "type": 'boolean' },
                    "likes": { type: 'integer' },
                    "public": { "type": 'boolean' }
                  }
                }
              }
            }
          }
        }
      }
    end
  end
end
