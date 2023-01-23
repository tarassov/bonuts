# frozen_string_literal: true

module SpecSchemas
  class Comment
    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          content
          likes
          public
          user_avatar
          user_name
          date_string
        ],
        "properties": {
          "id": { "type": 'number' },
          "content": { "type": 'string' },
          "liked": { "type": 'boolean' },
          "likes": { "type": 'integer' },
          "public": { "type": 'boolean' },
          "user_avatar": SpecSchemas::User.avatar,
          "user_name": { "type": 'string' },
          "date_string": { "type": 'string' }
        }
      }
    end
  end
end