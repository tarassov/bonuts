# frozen_string_literal: true

module SpecSchemas
  class Error
    def self.schema
      {
        "type": 'object',
        "required": %w[
          error
          errorText
        ],
        "properties": {
          "error": { "type": 'boolean' },
          "errorText": { "type": 'string' }
        }
      }
    end
  end
end
