# frozen_string_literal: true

module SpecSchemas
  class ConfirmEmail
    def self.response
      {
        "type": 'object',
        "required": %w[
          auth_token
        ],
        "properties": {
          "auth_token": { "type": 'string' }
        }
      }
    end
  end
end
