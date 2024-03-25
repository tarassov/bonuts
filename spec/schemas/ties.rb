# frozen_string_literal: true

module SpecSchemas
  class Ties
    def self.schema
      {
        "type": 'array',
        "items": {
          "type": 'object',

          "properties": {
            "from_id": { "type": 'integer' },
            "to_id": { "type": 'integer' },
            "id":{type: "null"}
          }
        }
      }
    end
  end
end
