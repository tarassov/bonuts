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

    def self.response
      {
        "type": 'object',

        "properties": {
          "data": SpecSchemas::Circle.schema
        }
      }
    end

    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          type
          attributes
        ],
        "properties": {
          "id": {
            "type": 'string'
          },
          "type": {
            "type": 'string'
          },
          "attributes": {
            "type": 'object',
            "required": %w[
              name
              caption
              closed
              activated
              declined
            ],
            "properties": {
              name: { type: :string },
              caption: { type: :string },
              activated: { type: :boolean },
              closed: { type: :boolean },
              declined: { type: :boolean, "nullable": true },
              "logo": {
                "type": 'object',
                "required": %w[
                  url
                  thumb
                ],
                "properties": {
                  "url": {
                    "type": 'string'
                  },
                  "thumb": {
                    "type": 'object',
                    "required": [
                      'url'
                    ],
                    "properties": {
                      "url": {
                        "type": 'string'
                      }
                    }
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
