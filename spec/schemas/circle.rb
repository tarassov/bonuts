# frozen_string_literal: true

module SpecSchemas
  class Circle
    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          type
          attributes
        ],
        "properties": {
          "id": { "type": 'string' },
          "type": { "type": 'string' },
          "attributes": SpecSchemas::Circle.circle_attributes
        }
      }
    end

    def self.circle
      {
        "type": 'object',

        "properties": {
          "data": SpecSchemas::Circle.schema
        }
      }
    end

    def self.circle_attributes
      {
        "type": 'object',
        "required": %w[
          id
          name
          active
        ],
        "properties": {
          "name": { "type": 'string' },
          "id": { "type": 'number' },
          "active": { "type": 'boolean' }
        }
      }
    end

    def self.array
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Circle.schema
          }
        }
      }
    end
  end
end
