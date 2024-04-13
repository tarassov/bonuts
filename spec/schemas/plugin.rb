# frozen_string_literal: true

module SpecSchemas
  class Plugin
    class << self
      def schema
        {
          "type": "object",
          "required": ["id", "type", "attributes"],
          "properties": {
            "id": { "type": "string" },
            "type": { "type": "string" },
            "attributes": {
              "type": "object",
              "required": [
                "active",
                "id",
                "name",
              ],
              "properties": {
                "id": { type: "integer" },
                "active": { "type": "boolean" },
                "name": { type: "string" },

                "settings": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "id",
                      "name",
                    ],
                    "properties": {
                      "id": { "type": "number" },
                      "name": { "type": "string" },
                      "value": {
                        "anyOf": [
                          { type: :string, nullable: true },
                          { type: "null" },
                        ],
                      },
                      "notes": {
                        "anyOf": [
                          { type: :string, nullable: true },
                          { type: "null" },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        }
      end

      def array
        {
          "type": "object",

          "properties": {
            "data": {
              "type": "array",
              "items": SpecSchemas::Plugin.schema,
            },
          },
        }
      end
    end
  end
end
