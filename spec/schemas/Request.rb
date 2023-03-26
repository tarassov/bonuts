# frozen_string_literal: true

module SpecSchemas
  class Request
    def self.array
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Request.schema
          }
        }
      }
    end

    def self.schema
      {
        "type": 'object',

        "properties": {
          "id": { "type": 'string' },
          "type": { "type": 'string' },
          "attributes": SpecSchemas::Request.attributes
        }
      }
    end

    def self.attributes
      {
        "type": 'object',
        "properties": {
          "id": { "type": 'string' },
          "name": { "type": 'string' },
          "public_uuid": { "type": 'string' },
          "donut_name": { "type": 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          status: { type: 'number' },
          date_used: { "anyOf": [
            { type: :string, nullable: true },
            { type: 'null' }
          ] },
          deleted: { type: 'boolean' },
          donut: SpecSchemas::Donut.schema,
          profile: SpecSchemas::Profile.schema,
          enabled: { type: 'null' }

        }
      }
    end
  end
end
# frozen_string_literal: true
