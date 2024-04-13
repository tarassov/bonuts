# frozen_string_literal: true

module SpecSchemas
  class Ties
    class << self
      def schema
        {
          "type": "array",
          "items": {
            "type": "object",

            "properties": {
              "from_id": { "type": "integer" },
              "to_id": { "type": "integer" },
              "id": { type: "null" },
            },
          },
        }
      end
    end
  end
end
