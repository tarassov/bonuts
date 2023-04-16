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
          "error": { "anyOf": [{ "type": 'boolean' }, { "type": 'string' }] },
          "errorText": { "type": 'string' }
        }
      }
    end
  end
end
