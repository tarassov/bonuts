# frozen_string_literal: true

module SpecSchemas
  class Donut
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
          "attributes": {
            "type": 'object',
            "required": %w[
              name
              price
              id
              active
              logo
              description
              likes
              has_remains
              on_stock
              supply_days
              expiration_date
              created_at
              liked
              comments
            ],
            "properties": {
              "name": { "type": 'string' },
              "price": { "type": 'number' },
              "id": { "type": 'number' },
              "active": { "type": 'boolean' },
              "logo": {
                "type": 'object',
                "required": [],
                "properties": {
                  "url": {
                    "type": 'string', "nullable": 'true'
                  },
                  "thumb": {
                    "type": 'object',
                    "required": [],
                    "properties": {
                      "url": {
                        "type": 'string', "nullable": 'true'
                      },
                    }
                  }
                }
              },
              "description": { "type": 'string' },
              "liked": { "type": 'boolean' },
              "likes": {
                "type": 'array',
                "items": SpecSchemas::Like.schema
              },
              "has_remains": { "type": 'boolean' },
              "on_stock": { "type": 'number' },
              "supply_days": { "type": 'number' },
              "expiration_date": { "type": 'string' },
              "created_at": { "type": 'string' },
              "comments": {
                "type": 'array',
                "items": SpecSchemas::Comment.schema
              }
            }
          }
        }
      }
    end

    def self.response
      {
        "type": 'object',
        "required": [
          'data'
        ],
        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Donut.schema
          }
        }
      }
    end
  end
end
