# frozen_string_literal: true

module SpecSchemas
  class Invitation
    def self.array_response
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Invitation.schema
          }
        }
      }
    end

    def self.schema
      {
        "type": 'object',

        "properties": {
          "id": {
            "type": 'string'
          },
          "type": {
            "type": 'string'
          },
          "attributes": {
          }
        }
      }
    end
  end
end
