# frozen_string_literal: true

module SpecSchemas
  class Account
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
          "attributes": SpecSchemas::Account.attributes
        }
      }
    end

    def self.attributes
      {
        "type": 'object',
        "required": %w[
          id
          balance
        ],
        "properties": {
          "id": { "type": 'number' },
          "balance": { "type": 'number' },
          "last_operation": {
            "type": 'object',
            "properties": {
              "amount": { "type": 'number' },
              "date": { "type": 'string' },
              "date_utc": { "type": 'string' },
              "direction": { "type": 'string', enum: %w[+ -] }
            }
          }
        }
      }
    end

    def self.object
      {
        "type": 'object',

        "properties": {
          "data": SpecSchemas::Account.schema
        }
      }
    end

    def self.array
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Account.schema
          }
        }
      }
    end
  end
end
