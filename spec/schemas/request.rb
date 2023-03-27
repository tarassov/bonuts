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
          attributes: SpecSchemas::Request.request_attributes
        }
      }
    end

    def self.request_attributes
      {
        "type": 'object',
        "properties": {
          id: { "type": 'number' },
          name: { "type": 'string' },
          public_uid: { "type": 'string' },
          donut_name: { "type": 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          status: { type: 'number' },
          date_used: { "anyOf": [
            { type: :string, nullable: true },
            { type: 'null' }
          ] },
          deleted: { type: 'boolean' },
          donut: SpecSchemas::Donut.donut_attributes,
          profile: SpecSchemas::Profile.profile_attributes,
          enabled: { "anyOf": [
            { type: :boolean, nullable: true },
            { type: 'null' }
          ] }

        },
        required: %w[
          id
          name
          donut_name
          created_at
          updated_at
          status
          profile
          donut
        ]
      }
    end
  end
end
# frozen_string_literal: true
