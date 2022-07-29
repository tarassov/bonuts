# frozen_string_literal: true

module SpecSchemas
  class Like
    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          profile_id
        ],
        "properties": {
          "id": { "type": 'number' },
          "profile_id": { "type": 'number' },
          "created_at": { "type": 'string' },
          "likeable_type": { "type": 'string' },
          "likeable_id": { "type": 'number' }
        }
      }
    end
  end
end
